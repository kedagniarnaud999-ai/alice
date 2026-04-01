# Migration Vercel + Supabase

Cette première tranche de migration déplace déjà le frontend vers Supabase pour :

- l'authentification email / mot de passe
- Google OAuth
- la réinitialisation de mot de passe
- le stockage des avatars
- la sauvegarde du profil d'orientation et des réponses du test

## 1. Créer le projet Supabase

1. Crée un projet sur Supabase.
2. Dans `Authentication > URL Configuration`, ajoute :
   - `http://localhost:5173`
   - l'URL Vercel de préproduction
   - l'URL de production
3. Ajoute ces redirect URLs :
   - `http://localhost:5173/auth/callback`
   - `http://localhost:5173/reset-password`
   - les équivalents Vercel

## 2. Exécuter le SQL

Dans l'éditeur SQL de Supabase, exécute :

- [supabase/001_initial_schema.sql](/C:/Users/hp/Documents/Playground/alice/supabase/001_initial_schema.sql)

## 3. Créer le bucket avatar

Dans `Storage`, crée un bucket public :

- `avatars`

Si tu choisis un autre nom, mets-le dans `VITE_SUPABASE_AVATAR_BUCKET`.

## 4. Variables d'environnement frontend

Copie [env.example](/C:/Users/hp/Documents/Playground/alice/env.example) vers `.env.local` et renseigne :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_AVATAR_BUCKET`

`VITE_API_URL` reste optionnel pendant la transition si tu gardes une partie du backend Express.

## 5. Ce qui reste à migrer

- les modules d'apprentissage
- la progression utilisateur
- les éventuels endpoints analytics ou admin
- le nettoyage final du backend Express/Prisma

## 6. Stratégie recommandée

Pour aller vite vers une démo stable :

1. finaliser Supabase Auth + profils
2. déployer le frontend sur Vercel
3. laisser temporairement les fonctionnalités non critiques en fallback local
4. migrer ensuite les modules et la progression
