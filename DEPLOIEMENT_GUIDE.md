# 🚀 Guide de Déploiement Pas-à-Pas

## ✅ Fichiers de Configuration Créés

- ✅ `backend/railway.json` - Configuration Railway
- ✅ `vercel.json` - Configuration Vercel  
- ✅ `.gitignore` - Mis à jour pour exclure fichiers sensibles

## 📋 ÉTAPE 1 : Initialiser Git et Pousser sur GitHub

### 1.1 Vérifier Git
```bash
git --version
# Si erreur, installer Git: https://git-scm.com/download/win
```

### 1.2 Initialiser le Repository (si pas déjà fait)
```bash
cd C:\Users\hp\Desktop\alice

# Initialiser git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "feat: complete fullstack app with auth and test"
```

### 1.3 Créer Repository GitHub
```bash
# Aller sur github.com
# 1. Cliquer "New repository"
# 2. Nom: alice-platform (ou ali-ce)
# 3. Description: Plateforme d'orientation et développement de carrière
# 4. Public ou Private (votre choix)
# 5. NE PAS cocher "Initialize with README" (vous avez déjà des fichiers)
# 6. Cliquer "Create repository"
```

### 1.4 Pousser vers GitHub
```bash
# Remplacer <USERNAME> par votre nom d'utilisateur GitHub
git remote add origin https://github.com/<USERNAME>/alice-platform.git

# Pousser le code
git branch -M main
git push -u origin main
```

**✅ CHECKPOINT 1 : Votre code doit être sur GitHub**

---

## 📋 ÉTAPE 2 : Créer Base de Données sur Railway

### 2.1 Créer Compte Railway
```bash
1. Aller sur https://railway.app
2. Cliquer "Login" → "Login with GitHub"
3. Autoriser Railway à accéder à vos repos
```

### 2.2 Créer Projet PostgreSQL
```bash
1. Dashboard Railway → "New Project"
2. Sélectionner "Provision PostgreSQL"
3. Attendre que la DB se crée (~30 secondes)
```

### 2.3 Copier l'URL de la Base de Données
```bash
1. Cliquer sur la carte "PostgreSQL"
2. Onglet "Connect"
3. Copier "Postgres Connection URL"
   Format: postgresql://postgres:PASSWORD@HOST:PORT/railway
```

**⚠️ IMPORTANT : Gardez cette URL, vous en aurez besoin !**

**✅ CHECKPOINT 2 : Vous avez l'URL PostgreSQL**

---

## 📋 ÉTAPE 3 : Déployer Backend sur Railway

### 3.1 Créer Service Backend
```bash
1. Dans votre projet Railway
2. Cliquer "New" → "GitHub Repo"
3. Sélectionner votre repo "alice-platform"
4. Railway va détecter automatiquement le code
```

### 3.2 Configurer Root Directory
```bash
1. Cliquer sur le service créé
2. Settings → "Root Directory"
3. Entrer: backend
4. Sauvegarder
```

### 3.3 Configurer Variables d'Environnement
```bash
1. Onglet "Variables"
2. Cliquer "New Variable"
3. Ajouter UNE PAR UNE les variables suivantes:
```

**Variables OBLIGATOIRES :**
```bash
NODE_ENV=production
PORT=3000

# Sera rempli automatiquement par Railway si DB dans même projet
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Générer des secrets forts (voir section Secrets ci-dessous)
JWT_SECRET=VOTRE_SECRET_SUPER_LONG_ET_ALEATOIRE
JWT_REFRESH_SECRET=AUTRE_SECRET_SUPER_LONG_ET_ALEATOIRE

# Frontend URL (on mettra l'URL Vercel plus tard)
FRONTEND_URL=https://votre-app.vercel.app
CORS_ORIGIN=https://votre-app.vercel.app
```

**Variables OPTIONNELLES (Email - Gmail) :**
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre.email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_application
```

**Variables OPTIONNELLES (Google OAuth) :**
```bash
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx
GOOGLE_CALLBACK_URL=https://votre-backend.up.railway.app/api/auth/google/callback
```

### 3.4 Générer Secrets Forts

**Sur Windows PowerShell :**
```powershell
# JWT_SECRET
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})

# JWT_REFRESH_SECRET (lancer à nouveau)
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

**Ou en ligne :**
```bash
https://generate-secret.vercel.app/64
```

### 3.5 Déployer
```bash
1. Les variables sont enregistrées → Railway redémarre automatiquement
2. Attendre que "Build" et "Deploy" soient verts (~2-3 minutes)
3. Vérifier logs : onglet "Deployments" → cliquer sur le dernier
```

### 3.6 Obtenir URL Backend
```bash
1. Onglet "Settings"
2. Section "Domains"
3. Cliquer "Generate Domain"
4. Copier l'URL: https://votre-app-production.up.railway.app
```

**✅ CHECKPOINT 3 : Backend déployé et accessible**

**Tester :**
```bash
Ouvrir dans navigateur:
https://votre-app-production.up.railway.app

Vous devriez voir: "Cannot GET /"
(C'est normal, l'API est sur /api/...)
```

---

## 📋 ÉTAPE 4 : Déployer Frontend sur Vercel

### 4.1 Créer Compte Vercel
```bash
1. Aller sur https://vercel.com
2. Cliquer "Sign Up" → "Continue with GitHub"
3. Autoriser Vercel
```

### 4.2 Importer Projet
```bash
1. Dashboard Vercel → "Add New..." → "Project"
2. Trouver votre repo "alice-platform"
3. Cliquer "Import"
```

### 4.3 Configurer Projet
```bash
Framework Preset: Vite
Root Directory: ./ (laisser vide = racine)
Build Command: npm run build
Output Directory: dist (devrait être auto-détecté)
Install Command: npm install
```

### 4.4 Ajouter Variables d'Environnement
```bash
1. Section "Environment Variables"
2. Ajouter:

   Key: VITE_API_URL
   Value: https://votre-backend.up.railway.app/api
   (Remplacer par VOTRE URL Railway)

3. Appliquer à: Production, Preview, Development
```

### 4.5 Déployer
```bash
1. Cliquer "Deploy"
2. Attendre ~2-3 minutes
3. ✅ "Congratulations!"
```

### 4.6 Obtenir URL Frontend
```bash
Copier l'URL affichée:
https://alice-platform-xxx.vercel.app
```

**✅ CHECKPOINT 4 : Frontend déployé**

---

## 📋 ÉTAPE 5 : Mettre à Jour Backend avec URL Frontend

### 5.1 Retourner sur Railway
```bash
1. Ouvrir Railway
2. Cliquer sur service Backend
3. Onglet "Variables"
```

### 5.2 Modifier Variables
```bash
FRONTEND_URL=https://alice-platform-xxx.vercel.app
CORS_ORIGIN=https://alice-platform-xxx.vercel.app

(Remplacer par VOTRE URL Vercel)
```

### 5.3 Redéployer
```bash
Railway redémarre automatiquement
Attendre ~1 minute
```

**✅ CHECKPOINT 5 : CORS configuré correctement**

---

## 📋 ÉTAPE 6 : Tester l'Application

### 6.1 Ouvrir Application
```bash
Navigateur: https://votre-app.vercel.app
```

### 6.2 Checklist de Test
```bash
✓ Page charge sans erreur
✓ Pas d'erreurs dans Console (F12)
✓ Cliquer "S'inscrire"
✓ Créer un compte (email + password)
✓ Connexion réussie
✓ Redirection vers Dashboard
✓ Test d'orientation fonctionne
✓ Upload avatar fonctionne
```

### 6.3 Si Erreurs

**Erreur CORS :**
```bash
→ Vérifier CORS_ORIGIN dans Railway = URL Vercel exacte
→ Pas de / à la fin
```

**Erreur 401 :**
```bash
→ Vérifier JWT_SECRET configuré dans Railway
→ Vérifier VITE_API_URL dans Vercel
```

**Erreur de connexion :**
```bash
→ Vérifier backend répond: https://backend.railway.app
→ Ouvrir logs Railway pour voir erreurs
```

**✅ CHECKPOINT 6 : Application 100% fonctionnelle !**

---

## 📋 ÉTAPE 7 (OPTIONNEL) : Configurer Google OAuth

### 7.1 Google Cloud Console
```bash
1. Aller sur https://console.cloud.google.com
2. Sélectionner votre projet (ou en créer un)
3. Menu → "APIs & Services" → "Credentials"
4. Trouver votre OAuth 2.0 Client ID
5. Cliquer pour éditer
```

### 7.2 Ajouter URLs de Production
```bash
Authorized JavaScript origins:
  + https://votre-app.vercel.app

Authorized redirect URIs:
  + https://votre-backend.railway.app/api/auth/google/callback

Sauvegarder
```

### 7.3 Ajouter Variables Railway
```bash
Dans Railway → Variables:

GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx
GOOGLE_CALLBACK_URL=https://votre-backend.railway.app/api/auth/google/callback
```

**✅ OAuth Google fonctionne en production !**

---

## 📋 ÉTAPE 8 (OPTIONNEL) : Configurer Email

### 8.1 Créer Mot de Passe Application Gmail
```bash
1. Aller sur https://myaccount.google.com/apppasswords
2. Nom: "Ali Ce Production"
3. Générer
4. Copier le mot de passe (16 caractères)
```

### 8.2 Ajouter Variables Railway
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre.email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx (le mot de passe app)
```

**✅ Emails de vérification envoyés !**

---

## 🎉 TERMINÉ !

### Votre Application est en Ligne !

**URLs :**
- Frontend: https://votre-app.vercel.app
- Backend: https://votre-backend.railway.app
- Base de données: Railway PostgreSQL

**Coûts :**
- Vercel: GRATUIT
- Railway: ~$5/mois (starter plan)

---

## 🔄 Mettre à Jour l'Application

### Quand vous modifiez le code :

```bash
# Commit les changements
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push

# Vercel et Railway redéploient AUTOMATIQUEMENT ! 🎉
```

---

## 🐛 Problèmes Courants

### Backend ne démarre pas
```bash
1. Ouvrir Railway → Service → Deployments
2. Cliquer sur le dernier
3. Onglet "Logs"
4. Chercher erreurs rouges
```

**Erreurs fréquentes :**
- `DATABASE_URL not found` → Vérifier variable configurée
- `JWT_SECRET is required` → Ajouter JWT_SECRET
- `Prisma error` → Vérifier migrations appliquées

### Frontend ne se connecte pas
```bash
1. Ouvrir F12 → Console
2. Chercher erreurs réseau (onglet Network)
```

**Solutions :**
- Erreur CORS → Vérifier CORS_ORIGIN = URL Vercel
- 404 API → Vérifier VITE_API_URL correct
- Redéployer Vercel si variable changée

---

## 📞 Aide

Si vous êtes bloqué à une étape, dites-moi :
- Le numéro de l'étape
- Le message d'erreur exact
- Capture d'écran si possible

Je vous aiderai à débugger ! 🚀
