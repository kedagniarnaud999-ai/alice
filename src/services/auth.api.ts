import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { ensureSupabaseConfigured, getSupabaseConfigurationError, supabase } from '@/lib/supabase';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: string;
  emailVerified?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
  message?: string;
}

export interface RegisterResponse extends AuthResponse {
  requiresEmailVerification: boolean;
  isExistingAccount: boolean;
}

const mapSupabaseUser = (user: SupabaseUser): User => ({
  id: user.id,
  email: user.email ?? '',
  name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? '',
  avatar: user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? '',
  role: user.user_metadata?.role ?? 'USER',
  emailVerified: !!user.email_confirmed_at,
});

const normalizeAuthError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error ?? '');

  if (message.toLowerCase().includes('failed to fetch') || message.toLowerCase().includes('networkerror')) {
    return new Error(
      `${getSupabaseConfigurationError()} Si les variables sont deja renseignees, verifiez que l'URL Supabase est correcte et autorisee par le navigateur.`
    );
  }

  return error instanceof Error ? error : new Error('Une erreur de connexion est survenue.');
};

export class AuthService {
  async register(data: RegisterData): Promise<RegisterResponse> {
    ensureSupabaseConfigured();

    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { data: result, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            full_name: data.name,
            role: 'USER',
          },
        },
      });

      if (error) {
        throw normalizeAuthError(error);
      }

      const isExistingAccount =
        !!result.user && Array.isArray(result.user.identities) && result.user.identities.length === 0;

      return {
        user: result.user ? mapSupabaseUser(result.user) : this.buildPendingUser(data),
        requiresEmailVerification: true,
        isExistingAccount,
        message: isExistingAccount
          ? 'Cet email semble deja associe a un compte. Connectez-vous ou reinitialisez votre mot de passe si besoin.'
          : 'Registration successful. Please check your email to verify your account.',
      };
    } catch (error) {
      throw normalizeAuthError(error);
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    ensureSupabaseConfigured();

    try {
      const { data: result, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error || !result.user || !result.session) {
        throw normalizeAuthError(error ?? new Error('Unable to create a Supabase session.'));
      }

      return {
        user: mapSupabaseUser(result.user),
        token: result.session.access_token,
      };
    } catch (error) {
      throw normalizeAuthError(error);
    }
  }

  async loginWithGoogle(): Promise<void> {
    ensureSupabaseConfigured();

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw normalizeAuthError(error);
      }
    } catch (error) {
      throw normalizeAuthError(error);
    }
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    ensureSupabaseConfigured();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }

    return data.user ? mapSupabaseUser(data.user) : null;
  }

  async updateProfile(data: { name?: string; avatar?: string }): Promise<User> {
    ensureSupabaseConfigured();
    const { data: currentUserData, error: getUserError } = await supabase.auth.getUser();
    if (getUserError || !currentUserData.user) {
      throw getUserError ?? new Error('No authenticated user found.');
    }

    const nextMetadata = {
      ...currentUserData.user.user_metadata,
      ...(data.name !== undefined ? { full_name: data.name } : {}),
      ...(data.avatar !== undefined ? { avatar_url: data.avatar } : {}),
    };

    const { data: updated, error } = await supabase.auth.updateUser({
      data: nextMetadata,
    });

    if (error || !updated.user) {
      throw error ?? new Error('Unable to update the user profile.');
    }

    return mapSupabaseUser(updated.user);
  }

  async getSession(): Promise<Session | null> {
    ensureSupabaseConfigured();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw error;
    }
    return data.session;
  }

  async resendSignupConfirmation(email: string): Promise<void> {
    ensureSupabaseConfigured();
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    ensureSupabaseConfigured();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      throw error;
    }
  }

  async sendMagicLink(email: string): Promise<void> {
    ensureSupabaseConfigured();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }
  }

  async exchangeCodeForSession(code: string): Promise<User | null> {
    ensureSupabaseConfigured();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      throw error;
    }
    return data.user ? mapSupabaseUser(data.user) : null;
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ? mapSupabaseUser(session.user) : null);
    });

    return () => subscription.unsubscribe();
  }

  isAuthenticated(): boolean {
    return false;
  }

  private buildPendingUser(data: RegisterData): User {
    return {
      id: '',
      email: data.email,
      name: data.name,
      role: 'USER',
      emailVerified: false,
    };
  }
}

export const authService = new AuthService();
