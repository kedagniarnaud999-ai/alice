const PLACEHOLDER_PATTERNS = [
  /your-project-ref/i,
  /your-supabase-anon-key/i,
  /your-anon-key/i,
  /^pk-test/i,
  /changeme/i,
];

const readVar = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : '';

const url = readVar(import.meta.env.VITE_SUPABASE_URL);
const anonKey = readVar(import.meta.env.VITE_SUPABASE_ANON_KEY);

export type SupabaseConfigState =
  | { status: 'ok'; url: string; anonKey: string }
  | { status: 'missing'; vars: string[] }
  | { status: 'invalid'; reason: string };

const resolveConfig = (): SupabaseConfigState => {
  const missing = [
    ...(url ? [] : ['VITE_SUPABASE_URL']),
    ...(anonKey ? [] : ['VITE_SUPABASE_ANON_KEY']),
  ];

  if (missing.length > 0) {
    return { status: 'missing', vars: missing };
  }

  const placeholder = [url, anonKey].find((value) =>
    PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(value))
  );

  if (placeholder) {
    return {
      status: 'invalid',
      reason: 'Les valeurs semblent provenir du gabarit d\'exemple (.env.example) et n\'ont pas été remplacées.',
    };
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') {
      return {
        status: 'invalid',
        reason: `VITE_SUPABASE_URL doit être en HTTPS (valeur reçue : ${parsed.protocol}//…).`,
      };
    }
  } catch {
    return {
      status: 'invalid',
      reason: `VITE_SUPABASE_URL n'est pas une URL valide (valeur reçue : « ${url} »).`,
    };
  }

  return { status: 'ok', url, anonKey };
};

export const supabaseConfig = resolveConfig();

export const isSupabaseConfigured = supabaseConfig.status === 'ok';
