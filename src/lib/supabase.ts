import { createClient } from '@supabase/supabase-js';

const fallbackSupabaseUrl = 'https://placeholder.supabase.co';
const fallbackSupabaseAnonKey = 'placeholder-anon-key';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project-ref') &&
    !supabaseAnonKey.includes('your-supabase-anon-key')
);

export const getSupabaseConfigurationError = () =>
  "La connexion est temporairement indisponible : les variables Supabase ne sont pas configurees. Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans l'environnement de deploiement.";

export const ensureSupabaseConfigured = () => {
  if (!isSupabaseConfigured) {
    throw new Error(getSupabaseConfigurationError());
  }
};

export const supabase = createClient(
  supabaseUrl || fallbackSupabaseUrl,
  supabaseAnonKey || fallbackSupabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export const AVATAR_BUCKET = import.meta.env.VITE_SUPABASE_AVATAR_BUCKET || 'avatars';
