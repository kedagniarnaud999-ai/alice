export type AuthErrorKind =
  | 'config'
  | 'service_unreachable'
  | 'credentials'
  | 'email_unconfirmed'
  | 'invalid_email'
  | 'already_registered'
  | 'weak_password'
  | 'rate_limited'
  | 'server'
  | 'unknown';

export interface AuthErrorDescription {
  kind: AuthErrorKind;
  title: string;
  details: string;
  isServiceIssue: boolean;
}

const MESSAGES: Record<AuthErrorKind, AuthErrorDescription> = {
  config: {
    kind: 'config',
    isServiceIssue: true,
    title: "L'application n'est pas connectée à Supabase",
    details:
      "Les variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont absentes ou invalides. Copiez .env.example en .env.local (avec le point devant) et renseignez-les, puis relancez le serveur de développement.",
  },
  service_unreachable: {
    kind: 'service_unreachable',
    isServiceIssue: true,
    title: "Le service d'authentification est injoignable",
    details:
      "La requête vers Supabase n'a pas pu aboutir. Cause la plus fréquente : le projet Supabase est en pause (plan gratuit inactif), supprimé, ou son URL est incorrecte. Vérifiez l'état du projet dans le tableau de bord Supabase, puis l'adresse attendue sous Settings > API. En dernier recours, une extension de navigateur ou un proxy d'entreprise peut bloquer les requêtes vers *.supabase.co.",
  },
  credentials: {
    kind: 'credentials',
    isServiceIssue: false,
    title: 'Email ou mot de passe incorrect',
    details:
      "Vérifiez votre saisie, ou utilisez « Mot de passe oublié » pour réinitialiser votre accès.",
  },
  email_unconfirmed: {
    kind: 'email_unconfirmed',
    isServiceIssue: false,
    title: "Votre adresse email n'est pas encore confirmée",
    details:
      "Consultez votre boîte de réception (et vos spams) pour cliquer sur le lien de confirmation, puis relancez la connexion ou renvoyez l'email.",
  },
  invalid_email: {
    kind: 'invalid_email',
    isServiceIssue: false,
    title: "Cette adresse email n'est pas valide",
    details:
      "Supabase refuse cette adresse. Vérifiez la saisie (domaine complet, sans espace) et utilisez une adresse que vous consultez vraiment : le lien de confirmation y sera envoyé.",
  },
  already_registered: {
    kind: 'already_registered',
    isServiceIssue: false,
    title: 'Un compte existe déjà avec cette adresse',
    details:
      "Connectez-vous avec ce compte, ou utilisez « Mot de passe oublié » si vous ne le retrouvez plus.",
  },
  weak_password: {
    kind: 'weak_password',
    isServiceIssue: false,
    title: 'Mot de passe trop simple',
    details:
      "Supabase refuse ce mot de passe : choisissez au moins 8 caractères avec une majuscule, une minuscule et un chiffre.",
  },
  rate_limited: {
    kind: 'rate_limited',
    isServiceIssue: false,
    title: 'Trop de tentatives, patientez un instant',
    details:
      "Supabase limite temporairement le nombre d'essais. Attendez quelques minutes avant de réessayer.",
  },
  server: {
    kind: 'server',
    isServiceIssue: true,
    title: 'Le service d\'authentification a renvoyé une erreur',
    details:
      "Supabase a répondu une erreur inattendue. Vérifiez que les migrations SQL sont bien appliquées sur le projet et que les politiques RLS autorisent l'opération.",
  },
  unknown: {
    kind: 'unknown',
    isServiceIssue: false,
    title: 'Opération impossible',
    details: 'Une erreur inattendue est survenue. Réessayez dans un instant.',
  },
};

const NETWORK_PATTERNS =
  /failed to fetch|networkerror|network request failed|load failed|err_network|err_name_not_resolved|err_connection|could not resolve|econnrefused|econnreset|timed?e?d? ?out/i;

const PAUSED_PATTERNS = /project is paused|project is suspended|tenant .*not.*(found|active)/i;

const SERVICE_DOWN_PATTERNS = /service unavailable|bad gateway|gateway time-?out|maintenances?/i;

const readStatus = (error: any): number | undefined => {
  const status = error?.status ?? error?.originalResponse?.status;
  return typeof status === 'number' ? status : undefined;
};

const classify = (error: any, rawMessage: string): AuthErrorKind => {
  const name: string = error?.name ?? '';
  const status = readStatus(error);

  if (name === 'SupabaseNotConfiguredError') {
    return 'config';
  }

  const isNetworkFailure =
    name === 'AuthRetryableFetchError' ||
    status === 0 ||
    NETWORK_PATTERNS.test(rawMessage);

  const isServiceDown =
    PAUSED_PATTERNS.test(rawMessage) ||
    SERVICE_DOWN_PATTERNS.test(rawMessage) ||
    status === 502 ||
    status === 503 ||
    status === 504;

  if (isNetworkFailure || isServiceDown) {
    return 'service_unreachable';
  }

  if (status === 429 || /rate limit|too many requests|for security purposes/i.test(rawMessage)) {
    return 'rate_limited';
  }

  if (/email not confirmed|not confirmed|confirm your email|verify your email/i.test(rawMessage)) {
    return 'email_unconfirmed';
  }

  if (
    name === 'AuthInvalidCredentialsError' ||
    /invalid login credentials|invalid email or password|user not found|invalid password/i.test(rawMessage)
  ) {
    return 'credentials';
  }

  if (/already registered|already exists|already been registered/i.test(rawMessage)) {
    return 'already_registered';
  }

  if (/password should be|at least \d+ characters|password is not strong enough|not secure enough/i.test(rawMessage)) {
    return 'weak_password';
  }

  if (/email address .*is invalid|unable to validate email address|must be a valid email/i.test(rawMessage)) {
    return 'invalid_email';
  }

  if (status && status >= 500) {
    return 'server';
  }

  return 'unknown';
};

export const describeAuthError = (error: unknown): AuthErrorDescription => {
  const rawMessage =
    error instanceof Error ? error.message : typeof error === 'string' ? error : '';
  const kind = classify(error, rawMessage);
  const message = MESSAGES[kind];

  return {
    kind,
    title: message.title,
    details: rawMessage && kind === 'unknown' ? `${message.details} (${rawMessage})` : message.details,
    isServiceIssue: message.isServiceIssue,
  };
};

/** Un visiteur non connecté n'est pas une panne : `getUser` lève cette erreur à chaque navigation anonyme. */
export const isMissingSession = (error: unknown): boolean => {
  const candidate = error as { name?: string; code?: string; message?: string } | null;
  return (
    candidate?.name === 'AuthSessionMissingError' ||
    candidate?.code === 'auth_session_missing' ||
    /auth session missing/i.test(candidate?.message ?? '')
  );
};
