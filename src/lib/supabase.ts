import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { supabaseConfig } from '@/config/env';

export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super(
      "Supabase n'est pas configure. Renseignez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local."
    );
    this.name = 'SupabaseNotConfiguredError';
  }
}

const createUnavailableClient = (): SupabaseClient =>
  new Proxy({} as SupabaseClient, {
    get(_target, property) {
      if (property === 'then') {
        return undefined;
      }
      throw new SupabaseNotConfiguredError();
    },
  });

export const supabase: SupabaseClient =
  supabaseConfig.status === 'ok'
    ? createClient(supabaseConfig.url, supabaseConfig.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : createUnavailableClient();

export const AVATAR_BUCKET = import.meta.env.VITE_SUPABASE_AVATAR_BUCKET || 'avatars';
