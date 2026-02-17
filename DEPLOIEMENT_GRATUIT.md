# 🎯 Guide de Déploiement GRATUIT - Ali Ce

## Configuration 100% Gratuite

- ✅ Frontend sur **Vercel** (Gratuit)
- ✅ Backend sur **Render** (Gratuit)
- ✅ Base de données **PostgreSQL Render** (Gratuit - 1GB)

**Coût total : 0€** ⚠️ Limitation : Backend dort après 15 min d'inactivité

---

## ÉTAPE 1 : Préparer Git et GitHub (10 min)

### 1.1 Vérifier Git
```bash
git --version
```

Si erreur, installer Git : https://git-scm.com/download/win

### 1.2 Initialiser Repository
```bash
cd C:\Users\hp\Desktop\alice

# Initialiser git
git init

# Configurer git (première fois seulement)
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@exemple.com"

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "feat: complete fullstack app with authentication"
```

### 1.3 Créer Repository GitHub

**A. Aller sur GitHub :**
1. https://github.com
2. Cliquer bouton vert "New" (ou + en haut à droite)

**B. Configurer le repo :**
- Repository name : `ali-ce-platform`
- Description : `Plateforme d'orientation et développement de carrière pour l'Afrique francophone`
- **Public** ✅ (pour déploiement gratuit)
- ❌ NE PAS cocher "Add README" (vous avez déjà des fichiers)
- Cliquer **"Create repository"**

### 1.4 Pousser vers GitHub
```bash
# Remplacer YOUR_USERNAME par votre nom d'utilisateur GitHub
git remote add origin https://github.com/YOUR_USERNAME/ali-ce-platform.git
git branch -M main
git push -u origin main
```

**✅ CHECKPOINT : Votre code est sur GitHub**

---

## ÉTAPE 2 : Créer Base de Données sur Render (10 min)

### 2.1 Créer Compte Render
1. Aller sur https://render.com
2. Cliquer **"Get Started"**
3. **"Sign up with GitHub"** ✅ (recommandé)
4. Autoriser Render

### 2.2 Créer PostgreSQL Database

**A. Dans Dashboard Render :**
1. Cliquer **"New +"** en haut à droite
2. Sélectionner **"PostgreSQL"**

**B. Configuration :**
```
Name: ali-ce-database
Database: ali_ce_db (ou laisser auto)
User: ali_ce_user (ou laisser auto)
Region: Frankfurt (ou plus proche de vous)
PostgreSQL Version: 15 (ou dernière)

Instance Type: Free ✅
```

3. Cliquer **"Create Database"**
4. Attendre ~2 minutes (création)

### 2.3 Copier l'URL de Connexion

**A. Une fois créée :**
1. Vous êtes sur la page de la DB
2. Scroll vers **"Connections"**
3. Copier **"Internal Database URL"** (commence par postgresql://)

**Format :**
```
postgresql://ali_ce_user:PASSWORD@dpg-xxx.frankfurt-postgres.render.com/ali_ce_db
```

⚠️ **GARDEZ CETTE URL PRÉCIEUSEMENT** (elle contient le password)

**✅ CHECKPOINT : PostgreSQL gratuit créé**

---

## ÉTAPE 3 : Déployer Backend sur Render (15 min)

### 3.1 Créer Web Service

**A. Dashboard Render :**
1. Cliquer **"New +"**
2. Sélectionner **"Web Service"**

**B. Connecter GitHub :**
1. **"Connect GitHub"** (si première fois)
2. Autoriser Render
3. Dans la liste, trouver **"ali-ce-platform"**
4. Cliquer **"Connect"**

### 3.2 Configuration du Service

**Settings :**
```
Name: ali-ce-backend

Region: Frankfurt (même que DB)

Branch: main

Root Directory: backend ✅ (IMPORTANT)

Runtime: Node

Build Command: npm install && npx prisma generate && npm run build

Start Command: npx prisma migrate deploy && npm start

Instance Type: Free ✅
```

### 3.3 Variables d'Environnement

**Scroll vers "Environment Variables"**

Cliquer **"Add Environment Variable"** et ajouter UNE PAR UNE :

```bash
NODE_ENV=production

DATABASE_URL=
👆 Collez l'Internal Database URL de l'étape 2.3

PORT=10000

JWT_SECRET=
👆 On va générer (voir ci-dessous)

JWT_REFRESH_SECRET=
👆 On va générer (voir ci-dessous)

FRONTEND_URL=https://ali-ce-platform.vercel.app
👆 On mettra la vraie URL Vercel après

CORS_ORIGIN=https://ali-ce-platform.vercel.app
👆 On mettra la vraie URL Vercel après
```

### 3.4 Générer JWT Secrets

**Dans PowerShell :**
```powershell
# Pour JWT_SECRET
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})

# Copier le résultat et coller dans JWT_SECRET
# Relancer la commande pour JWT_REFRESH_SECRET
```

**Ou utiliser en ligne :**
```
https://generate-secret.vercel.app/64
```

### 3.5 Déployer

1. Cliquer **"Create Web Service"** en bas
2. Render commence le build (~3-5 minutes)
3. Attendre que le status devienne **"Live"** ✅ (vert)

**Vérifier logs :**
- Onglet "Logs" pour voir le build en temps réel

### 3.6 Copier l'URL Backend

**Une fois "Live" :**
1. En haut de la page, vous voyez l'URL
2. Format : `https://ali-ce-backend.onrender.com`
3. **COPIER CETTE URL**

**Tester :**
Ouvrir dans navigateur : `https://ali-ce-backend.onrender.com`

Vous devriez voir : `Cannot GET /` (c'est normal ✅)

**✅ CHECKPOINT : Backend déployé et base de données migrée**

---

## ÉTAPE 4 : Déployer Frontend sur Vercel (10 min)

### 4.1 Créer Compte Vercel
1. Aller sur https://vercel.com
2. Cliquer **"Sign Up"**
3. **"Continue with GitHub"** ✅
4. Autoriser Vercel

### 4.2 Importer Projet

**A. Dashboard Vercel :**
1. Cliquer **"Add New..."** → **"Project"**
2. Dans la liste, trouver **"ali-ce-platform"**
3. Cliquer **"Import"**

### 4.3 Configuration

**Configure Project :**
```
Framework Preset: Vite ✅ (auto-détecté normalement)

Root Directory: ./ (laisser vide)

Build Command: npm run build (auto)

Output Directory: dist (auto)

Install Command: npm install (auto)
```

### 4.4 Variables d'Environnement

**Environment Variables section :**

Cliquer **"Add"** et entrer :

```
Key: VITE_API_URL
Value: https://ali-ce-backend.onrender.com/api
👆 Remplacer par VOTRE URL Render + /api

Environments: Production, Preview, Development (cocher les 3)
```

### 4.5 Déployer

1. Cliquer **"Deploy"** en bas
2. Attendre ~2-3 minutes
3. 🎉 **"Congratulations!"**

### 4.6 Copier URL Frontend

L'URL s'affiche en gros :
```
https://ali-ce-platform.vercel.app
(ou avec un suffixe random)
```

**COPIER CETTE URL**

**✅ CHECKPOINT : Frontend déployé**

---

## ÉTAPE 5 : Mettre à Jour CORS Backend (5 min)

### 5.1 Retourner sur Render

1. Dashboard Render
2. Cliquer sur **"ali-ce-backend"** (votre web service)
3. Menu de gauche → **"Environment"**

### 5.2 Modifier Variables

Trouver et modifier :

```bash
FRONTEND_URL=https://ali-ce-platform-xxx.vercel.app
👆 Remplacer par VOTRE URL Vercel exacte

CORS_ORIGIN=https://ali-ce-platform-xxx.vercel.app
👆 Même URL (SANS / à la fin)
```

Cliquer **"Save Changes"**

### 5.3 Attendre Redéploiement

Render redémarre automatiquement (~2 minutes)

Attendre que status redevienne **"Live"** ✅

**✅ CHECKPOINT : Frontend ↔ Backend connectés**

---

## ÉTAPE 6 : TESTER L'APPLICATION ! 🎉

### 6.1 Ouvrir l'Application

```
https://votre-app.vercel.app
```

### 6.2 Checklist Complète

```
✅ Page charge sans erreur
✅ Ouvrir F12 → Console (pas d'erreurs rouges)
✅ Cliquer "S'inscrire"
✅ Remplir formulaire :
   - Nom : Test User
   - Email : test@exemple.com
   - Mot de passe : Test1234
✅ Compte créé → Redirection Dashboard
✅ Cliquer "Commencer le test"
✅ Répondre à quelques questions
✅ Test fonctionne
✅ Voir résultats
✅ Aller dans Dashboard
✅ Tout fonctionne !
```

### 6.3 Tester Upload Avatar

```
1. Dans Dashboard → Paramètres (si route ajoutée)
2. Ou créer un autre compte
3. Upload une image
4. ✅ Fonctionne
```

**🎉 FÉLICITATIONS ! Votre application est EN LIGNE et 100% GRATUITE !**

---

## 🐛 Problèmes Courants

### ❌ Erreur CORS lors de la connexion

**Symptôme :** Erreur dans Console F12
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution :**
1. Vérifier CORS_ORIGIN dans Render = URL Vercel EXACTE
2. Pas de / à la fin
3. Save Changes → Attendre redéploiement

### ❌ Backend répond "Service Unavailable" après 15 min

**C'est normal avec Render Free :** Le backend dort après 15 min d'inactivité

**Solution :**
- Premier chargement prend 30-60 secondes (réveil)
- Puis redevient rapide
- C'est la limitation du plan gratuit

**Alternative payante ($7/mois) :**
- Render Starter Plan = Pas de sleep

### ❌ Erreur "Cannot connect to database"

**Solution :**
1. Render → Backend → Environment
2. Vérifier DATABASE_URL correct
3. Format : postgresql://user:pass@host/db
4. Doit être "Internal Database URL" de Render

### ❌ Frontend ne charge pas / page blanche

**Solutions :**
1. F12 → Console → chercher erreurs
2. Vercel → Project → Settings → Environment Variables
3. Vérifier VITE_API_URL correct (avec /api à la fin)
4. Redéployer : Settings → Deployments → ... → Redeploy

---

## 📊 Monitoring Gratuit

### Render Logs
```
Dashboard Render → Backend → Logs (menu gauche)
Voir en temps réel ce qui se passe
```

### Vercel Analytics
```
Dashboard Vercel → Project → Analytics
Voir visiteurs, performance (gratuit)
```

---

## 🔄 Mettre à Jour l'Application

### Quand vous modifiez le code :

```bash
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push
```

**Render et Vercel redéploient AUTOMATIQUEMENT** 🎉

---

## 💰 Résumé Coûts

```
Frontend Vercel     : 0€
Backend Render      : 0€
Database PostgreSQL : 0€
Total              : 0€/mois

⚠️ Limitation :
- Backend dort après 15 min inactivité
- 1GB stockage PostgreSQL
- 750h/mois backend (largement suffisant)
```

---

## 📞 Si Vous Êtes Bloqué

**Dites-moi :**
- Numéro de l'étape
- Message d'erreur exact (copier-coller)
- Capture d'écran si possible

Je vous aide en temps réel ! 🚀
