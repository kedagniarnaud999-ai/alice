/**
 * ESLint n'avait aucun fichier de configuration dans le dépôt : `npm run lint`
 * sortait en erreur avant d'avoir regardé un seul fichier. Cette configuration
 * est volontairement étroite — elle garde ce qui attrape un vrai défaut
 * (règles de base, TypeScript, règles des crochets de React) et laisse de côté
 * le reste, parce qu'une garde qui gémit sous cinquante avertissements ne se lit
 * plus. Le contrôle de types et `npm run verify` restent les deux gardes fortes.
 */
module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@typescript-eslint', 'react-refresh'],
  ignorePatterns: [
    'dist',
    '.verify',
    'node_modules',
    'backend',
    'vite.config.ts.timestamp-*.mjs',
  ],
  rules: {
    // Éteinte au profit de sa variante TypeScript, seule capable de juger une
    // signature typée. La variante TypeScript, elle, est allumée : mesurée à
    // zéro violation sur les 83 fichiers du dépôt, elle ne coûte rien et attrape
    // la variable déclarée et oubliée.
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    // Huit `any` assumés, tous au même endroit : la récupération d'une erreur de
    // connexion dans LoginForm, RegisterForm, AvatarUpload, AuthCallback,
    // ProfileSettings, VerifyEmailSent, et deux dans utils/authErrors.ts. Cette
    // règle ne pourra être rallumée qu'en typant la chaîne d'erreur une fois,
    // écran par écran. En attendant, l'éteindre ici est un dette écrite, pas un
    // angle mort.
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    // Un seul composant-export par fichier n'est pas la règle du dépôt : les
    // écrans exportent leur composant avec leurs types et leurs constantes.
    'react-refresh/only-export-components': 'off',
  },
};
