# 🚀 Guide de Démarrage Rapide - Ali Ce

## Installation Complète (Frontend + Backend)

### 1️⃣ Prérequis

Vérifiez que vous avez installé :
- ✅ Node.js 18+ : `node --version`
- ✅ npm : `npm --version`
- ✅ PostgreSQL 14+ : `psql --version`

### 2️⃣ Backend Setup

```bash
# 1. Aller dans le dossier backend
cd backend

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env
# Copier env.example vers .env (manuellement sur Windows)
# Ou via PowerShell :
Copy-Item env.example .env

# 4. Configurer les variables d'environnement dans .env
# OBLIGATOIRE :
#   DATABASE_URL=postgresql://user:password@localhost:5432/alice_db
#   JWT_SECRET=votre_secret_jwt_super_securise
#   JWT_REFRESH_SECRET=autre_secret_pour_refresh_token
#
# OPTIONNEL (pour fonctionnalités complètes) :
#   EMAIL_HOST=smtp.gmail.com
#   EMAIL_PORT=587
#   EMAIL_USER=votre.email@gmail.com
#   EMAIL_PASSWORD=mot_de_passe_application
#   GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
#   GOOGLE_CLIENT_SECRET=GOCSPX-xxx

# 5. Créer la base de données PostgreSQL
# Ouvrir psql et exécuter :
#   CREATE DATABASE alice_db;

# 6. Exécuter les migrations Prisma
npx prisma migrate dev

# 7. (Optionnel) Seed la base avec 15 modules d'apprentissage
npm run seed

# 8. Démarrer le serveur backend
npm run dev
```

**Backend actif sur** : http://localhost:5000

### 3️⃣ Frontend Setup

```bash
# 1. Retourner à la racine du projet
cd ..

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env
# Sur Windows, créer manuellement un fichier .env à la racine
# Ou via PowerShell :
New-Item -Path .env -ItemType File -Force
# Ajouter dedans :
VITE_API_URL=http://localhost:5000/api

# 4. Démarrer le serveur frontend
npm run dev
```

**Frontend actif sur** : http://localhost:5173

### 4️⃣ Premier test

1. Ouvrir http://localhost:5173
2. Cliquer sur "S'inscrire"
3. Créer un compte (email + mot de passe)
4. ✅ Vous êtes connecté !

## 🎯 Fonctionnalités disponibles

### Sans email configuré
- ✅ Inscription / Connexion
- ✅ Test d'orientation
- ✅ Résultats et profil
- ✅ Dashboard
- ✅ Upload avatar
- ❌ Vérification email (skip)
- ❌ Reset password par email

### Avec email configuré (Gmail)
1. Aller sur https://myaccount.google.com/apppasswords
2. Créer un mot de passe d'application
3. Ajouter dans backend `.env` :
   ```
   EMAIL_USER=votre.email@gmail.com
   EMAIL_PASSWORD=mot_de_passe_application_16_caracteres
   ```
4. Redémarrer backend
5. ✅ Toutes fonctionnalités actives

### Avec Google OAuth
1. Aller sur https://console.cloud.google.com
2. Créer un projet → APIs & Services → Credentials
3. Créer OAuth 2.0 Client ID
4. Authorized redirect URIs :
   ```
   http://localhost:5000/api/auth/google/callback
   ```
5. Copier Client ID et Client Secret dans backend `.env`
6. Redémarrer backend
7. ✅ Connexion Google active

## 📊 Structure des données

### Après seed (15 modules)
- 2 modules Employabilité
- 3 modules Technologie
- 3 modules Business & Entrepreneuriat
- 2 modules Créativité & Design
- 3 modules Gestion
- 2 modules Éducation & Pédagogie

### Base de données (6 tables Prisma)
- `users` : Utilisateurs avec auth
- `profiles` : Profils orientation
- `test_responses` : Réponses au test
- `learning_modules` : Modules d'apprentissage
- `user_progression` : Progression utilisateurs
- `refresh_tokens` : Tokens de refresh JWT

## 🐛 Problèmes courants

### Backend ne démarre pas
```bash
# Vérifier PostgreSQL actif
psql -U postgres -c "SELECT 1"

# Vérifier DATABASE_URL correct dans .env
echo $env:DATABASE_URL

# Regénérer Prisma Client
npx prisma generate
```

### Frontend ne se connecte pas au backend
```bash
# Vérifier .env frontend existe
Get-Content .env

# Vérifier VITE_API_URL correct
# Doit être : VITE_API_URL=http://localhost:5000/api

# Vérifier CORS dans backend/src/server.ts
# origin doit inclure 'http://localhost:5173'
```

### Erreur 401 Unauthorized
- Vérifier JWT_SECRET configuré dans backend .env
- Vérifier token stocké : ouvrir DevTools → Application → Local Storage → token
- Tenter logout/login

### Images avatar ne s'affichent pas
```bash
# Vérifier dossier uploads existe
cd backend
Test-Path uploads/avatars

# Créer si nécessaire
New-Item -Path uploads/avatars -ItemType Directory -Force
```

## 📚 Documentation complète

- **Backend API** : `backend/README.md` (15 endpoints)
- **Frontend Integration** : `FRONTEND_INTEGRATION.md`
- **Setup détaillé** : `SETUP.md`
- **Features backend** : `backend/FEATURES.md`

## ✅ Checklist complète

### Backend
- [ ] PostgreSQL installé et actif
- [ ] Database `alice_db` créée
- [ ] `backend/.env` configuré
- [ ] `npm install` exécuté
- [ ] Migrations Prisma effectuées (`npx prisma migrate dev`)
- [ ] Seed effectué (optionnel, `npm run seed`)
- [ ] Backend démarre sans erreur (`npm run dev`)

### Frontend
- [ ] `.env` créé avec `VITE_API_URL`
- [ ] `npm install` exécuté
- [ ] Frontend démarre sans erreur (`npm run dev`)
- [ ] Peut accéder à http://localhost:5173

### Test E2E
- [ ] Inscription fonctionne
- [ ] Login fonctionne
- [ ] Dashboard accessible
- [ ] Test d'orientation fonctionnel
- [ ] Upload avatar fonctionnel

## 🎉 Prêt à développer !

Frontend et backend sont maintenant connectés. Prochaines étapes suggérées :

1. **Connecter le test d'orientation au backend** pour sauvegarder les profils
2. **Connecter les parcours personnalisés** pour récupérer les modules
3. **Ajouter le lien "Profil"** dans le Dashboard
4. **Implémenter les notifications toast** pour meilleure UX
5. **Ajouter tests unitaires** (Jest + React Testing Library)

Bon développement ! 🚀
