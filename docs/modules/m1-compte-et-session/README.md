# M1 · Compte & session

**Statut : proposition non autorisée — gate 0 non signé.**

## Destination

Un inconnu s'inscrit, reçoit un vrai e-mail, se reconnecte six jours plus tard, et ses données ne se lisent pas
chez le voisin.

Les quatre mots qui comptent : **un inconnu** (pas le fondateur sur sa machine), **un vrai e-mail** (pas un
écran qui dit « envoyé »), **six jours plus tard** (pas le même onglet), **chez le voisin** (la RLS prouvée,
pas supposée).

## Périmètre

| Chemin | Rôle |
|---|---|
| `src/contexts/AuthContext.tsx` | session, restauration avec grâce, exposition de `loginWithGoogle` |
| `src/services/auth.api.ts` | inscription, connexion, reset, magic link, Google |
| `src/services/profile.api.ts` | `profiles.payload`, `test_responses`, effacement du compte |
| `src/components/auth/` | `LoginForm`, `RegisterForm`, `AuthAlert`, `ProtectedRoute` |
| `src/pages/` | `AuthCallback`, `ForgotPassword`, `ResetPassword`, `VerifyEmail`, `VerifyEmailSent` |
| `supabase/001_initial_schema.sql` | tables `profiles`, `test_responses`, politiques RLS |
| `supabase/003_profiles_delete_own.sql` | politique de suppression de son propre compte |

## Acquis (mesuré le 2026-09-23)

- **F-06 — l'engagement pris avant le compte survit au compte.** `/trial` passe par `App.tsx:159-176`, qui met
  le `targeting` dans le profil et envoie sur `/register?from=trial` ; le premier `saveProfile` l'écrit ; la
  reprise se lit côté `App.tsx:354`. **Aucun de ces trois sauts n'a jamais été vu rendu dans un navigateur.**
- **F-10 — partiel.** Inscription, vérification, mot de passe oublié et réinitialisation existent ; l'expiration
  du lien est annoncée à l'écran (`c7b5784`). Ce qui manque n'est pas du code : c'est un vrai destinataire.
- **Le cycle de vie est fermé par le schéma.** `user_id uuid … references auth.users(id) on delete cascade` sur
  les trois tables (`001`, `002`) : supprimer le compte emporte les lignes (T-108, validé).
- **La restauration de session est bornée.** `SESSION_RESTORE_GRACE_MS = 8000` (`AuthContext.tsx:12`, `:54`) :
  au-delà, le candidat est traité comme non connecté. C'est un arbitrage, pas une vérité — sur une connexion 3G
  interrompue, il éjecte du compte quelqu'un qui y était.

## À développer

| Code | Travail | Critère d'acceptation | Dépend de |
|---|---|---|---|
| T-015 | Parcourir réellement le chemin d'e-mail : vérification, reset, seconde demande | Une personne hors équipe reçoit l'e-mail, clique, aboutit ; le comportement du lien expiré et de la seconde demande qui tue la première est **écrit**, pas deviné | une adresse valide |
| F-16 · T-018 | Démontrer la RLS sur les trois tables | Deux comptes distincts : A ne lit aucune ligne de B, **et** `getMyProgress` émet son propre filtre (voir ci-dessous) | accès console Supabase |
| T-025 | Écrire la politique de conservation | Un fichier dans `docs/` dit pendant combien de temps un profil est gardé, ce qui se passe à la demande d'effacement, et comment un mineur sort du produit | T-001 |
| D-01 | `loginWithGoogle` | **Servir** : un bouton l'appelle et aboutit. **Supprimer** : plus de mention nulle part, y compris le README (D-05) | arbitrage produit |
| D-02 | `sendMagicLink` | Idem. Une connexion sans mot de passe est ou n'est pas — elle n'est pas à moitié | arbitrage produit |
| D-03 · BUG-03 | `page /verify-email` | Un seul chemin visible : soit la route est raccordée au flux réel, soit elle et son fichier disparaissent | — |

## Ce que la RLS nous doit encore, et où le lire vraiment

`getMyProgress` (`src/services/module.api.ts:106-119`) **n'émet aucun filtre `user_id`** : il sélectionne sur la
table et compte sur la politique. Le `.eq('user_id', …)` que le backlog cite (`module.api.ts:64-65`) existe,
mais il est ligne 130, dans `clearMyProgress`. Deux conséquences :

1. La citation du backlog est fausse de 66 lignes — à corriger dans `docs/backlog.md` au moment du re-mapping.
2. **F-16 reste entièrement à faire** et ne peut pas se fermer depuis le dépôt : la réponse est dans le projet
   Supabase en ligne. C'est l'un des trois points que le PRD §9.4 déclare non démontrables depuis le code.

## Preuve de fin

Un candidat qui a fini le test, fermé l'onglet, et revient six jours plus tard sur un autre appareil retrouve
son parcours à l'étape atteinte — et un deuxième compte, créé pour l'occasion, ne voit rien de ce premier.

## Hors module

- **Google OAuth comme argument commercial.** Tant que D-01 n'est pas tranché, le README ne doit pas le lister
  (c'est un point D-05), et aucune page publique ne doit le promettre.
- **Une file d'attente d'e-mails, un service de notification.** Non-goal : le produit envoie ce qu'GoTrue
  envoie, rien de plus.
