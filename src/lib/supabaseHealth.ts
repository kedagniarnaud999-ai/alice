import { supabaseConfig } from '@/config/env';

export type SupabaseHealthStatus = 'checking' | 'ok' | 'unreachable' | 'not_configured';

export interface SupabaseHealth {
  status: SupabaseHealthStatus;
  httpStatus?: number;
  detail?: string;
  checkedAt: string;
}

const REQUEST_TIMEOUT_MS = 8000;

export const checkSupabaseHealth = async (): Promise<SupabaseHealth> => {
  const checkedAt = new Date().toISOString();

  if (supabaseConfig.status !== 'ok') {
    return {
      status: 'not_configured',
      detail: "Variables d'environnement Supabase absentes ou invalides.",
      checkedAt,
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${supabaseConfig.url}/auth/v1/health`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        apikey: supabaseConfig.anonKey,
        Authorization: `Bearer ${supabaseConfig.anonKey}`,
      },
    });

    const body = response.ok ? '' : (await response.text()).slice(0, 160);

    return {
      status: response.ok ? 'ok' : 'unreachable',
      httpStatus: response.status,
      detail: body || undefined,
      checkedAt,
    };
  } catch (error) {
    return {
      status: 'unreachable',
      detail: error instanceof Error ? error.message : String(error),
      checkedAt,
    };
  } finally {
    clearTimeout(timeout);
  }
};
