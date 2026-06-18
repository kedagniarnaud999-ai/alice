# 🚀 Guide Complet : Redéploiement Railway Backend

## 📋 Prérequis

✅ Repository GitHub : `kedagniarnaud999-ai/alice`  
✅ Base de données PostgreSQL Render active  
✅ Frontend Vercel déployé : `https://ali-ce-i6it.vercel.app`  
✅ Fichiers de configuration présents dans le repo :
- `nixpacks.toml` (racine)
- `railway.json` (racine)
- `backend/package.json`
- `backend/prisma/schema.prisma`
- `backend/src/server.ts`

---

## 🔧 Étape 1 : Créer Nouveau Service Railway

### 1.1 Accéder à Railway
```
https://railway.app
```

### 1.2 Créer le Service
1. **Ouvrir** votre projet existant
2. **Cliquer** sur **"+ New"** ou **"New Service"**
3. **Sélectionner** **"GitHub Repo"**
4. **Autoriser** Railway si demandé
5. **Chercher** et **sélectionner** : `kedagniarnaud999-ai/alice`
6. **Cliquer** **"Deploy Now"** ou **"Add Service"**

---

## ⚙️ Étape 2 : Configuration Immédiate

### 2.1 Root Directory

**⚠️ À FAIRE IMMÉDIATEMENT AVANT LE PREMIER BUILD !**

1. **Cliquer** sur le nouveau service
2. **Menu gauche** → **Settings**
3. **Chercher** section **"Source"** ou **"Build"**
4. **Root Directory** :
   ```
   backend
   ```
   👆 Exactement ce mot, minuscules, pas de slash

### 2.2 Builder

**Section "Builder" dans Settings :**

```
Builder : NIXPACKS
```

**⚠️ IMPORTANT :** Ne PAS choisir :
- ❌ Railpack
- ❌ Dockerfile
- ❌ Buildpacks

### 2.3 Vérifier Configuration Automatique

Railway devrait détecter automatiquement :
- `railway.json` à la racine
- `nixpacks.toml` à la racine

Ces fichiers contiennent :
```json
// railway.json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd backend && npm install && npx prisma generate && npm run build"
  },
  "deploy": {
    "startCommand": "cd backend && npx prisma migrate deploy && npm start"
  }
}
```

---

## 📝 Étape 3 : Variables d'Environnement

### 3.1 Accéder aux Variables

1. **Service backend** → **Settings**
2. **Scroll** jusqu'à **"Variables"**
3. **Cliquer** **"Add Variable"** ou **"New Variable"**

### 3.2 Ajouter les 7 Variables (UNE PAR UNE)

#### Variable 1 : NODE_ENV
```
Name  : NODE_ENV
Value : production
```

#### Variable 2 : DATABASE_URL
```
Name  : DATABASE_URL
Value : postgresql://ali_ce_user:zevlzJoaAPH08HOYPbiSm8TBbwimevfD@dpg-d6abe3a4d50c73btqneg-a/ali_ce_db
```

#### Variable 3 : PORT
```
Name  : PORT
Value : 3000
```

#### Variable 4 : JWT_SECRET
```
Name  : JWT_SECRET
Value : WUfkv2FezGPhQK3pJLVrRl1iu8qXbMOjs9amZtyd7AxNBIS0EwDog5cHYCTn46
```

#### Variable 5 : JWT_REFRESH_SECRET
```
Name  : JWT_REFRESH_SECRET
Value : t6m4q9SIZoAd3lUXikDxQ581fzGvCKLJOEwpyWHuYPgrbaehTsN0jRMBn7Vc2F
```

#### Variable 6 : FRONTEND_URL
```
Name  : FRONTEND_URL
Value : https://ali-ce-i6it.vercel.app
```

#### Variable 7 : CORS_ORIGIN
```
Name  : CORS_ORIGIN
Value : https://ali-ce-i6it.vercel.app
```

### 3.3 Sauvegarder

**Cliquer** **"Save"** ou **"Update"**

---

## 🚀 Étape 4 : Déploiement Automatique

### 4.1 Démarrage du Build

Après avoir sauvegardé les variables, Railway **redémarre automatiquement** le service.

**Timeline attendue :**
```
00:00 - Configuration sauvegardée
00:05 - Build démarre automatiquement
00:10 - Git clone du repo
00:30 - cd backend
01:00 - npm install (backend dependencies)
02:00 - npx prisma generate
03:00 - npm run build (TypeScript compilation)
03:30 - Deploy démarre
04:00 - npx prisma migrate deploy
04:30 - npm start
05:00 - Server started on port 3000 ✅
```

**Durée totale : ~5 minutes**

---

## ✅ Étape 5 : Vérification des Logs

### 5.1 Logs BUILD (Onglet [Build])

**Railway → Service backend → Deployments → Dernier déploiement → Onglet [Build]**

**Vous DEVEZ voir :**

```bash
✓ Using Nixpacks
✓ Detected Node.js
✓ cd backend
✓ npm install
✓ Installing dependencies...
✓ Added XX packages

Dependencies installées (exemples) :
  express@4.18.2
  @prisma/client@5.9.1
  bcryptjs@2.4.3
  jsonwebtoken@9.0.2
  cors@2.8.5
  helmet@7.1.0

✓ npx prisma generate
✓ Prisma Client generated for backend

✓ npm run build
✓ Compiling TypeScript...
✓ src/server.ts
✓ src/routes/auth.ts
✓ src/middleware/auth.ts
✓ Successfully compiled XX files

✓ Build completed
```

**❌ Vous NE DEVEZ PAS voir :**
```
✗ Railpack
✗ Vite static site
✗ tsc && vite build  (frontend)
```

---

### 5.2 Logs DEPLOY (Onglet [Deploy])

**Vous DEVEZ voir :**

```bash
✓ Starting deployment
✓ cd backend
✓ npx prisma migrate deploy
✓ 1 migration found
✓ Applying migration: 20240115_init
✓ Migration applied successfully

✓ npm start
✓ > alice-backend@1.0.0 start
✓ > node dist/server.js

✓ Server started on port 3000
✓ Connected to PostgreSQL database
✓ Prisma Client initialized
✓ CORS enabled for: https://ali-ce-i6it.vercel.app
✓ Listening at http://localhost:3000
```

---

### 5.3 Status du Service

**Railway → Service backend**

**Icône/Status attendu :**
```
🟢 Active
```

**Autres status possibles :**
- 🔴 **Crashed** : Voir logs pour erreur
- 🔴 **Failed** : Build échoué, vérifier logs BUILD
- 🟠 **Building** : En cours, attendre

---

## 🌐 Étape 6 : Récupérer l'URL du Backend

### 6.1 Trouver l'URL

1. **Service backend** → **Settings**
2. **Scroll** jusqu'à section **"Domains"** ou **"Networking"**
3. Railway génère automatiquement une URL publique :

```
https://backend-production-XXXX.up.railway.app
```

ou

```
https://alice-production-YYYY.up.railway.app
```

### 6.2 Copier l'URL Complète

**⚠️ COPIER L'URL EXACTE** (incluant `https://`)

Exemple :
```
https://alice-production-8a87.up.railway.app
```

---

## 🔗 Étape 7 : Mettre à Jour Frontend Vercel

### 7.1 Accéder aux Variables Vercel

1. **Vercel Dashboard** : https://vercel.com
2. **Projet** : `ali-ce`
3. **Settings** → **Environment Variables**

### 7.2 Modifier VITE_API_URL

**Si la variable existe déjà :**

1. **Cliquer** sur **"Edit"** à côté de `VITE_API_URL`
2. **Remplacer** la valeur par la **nouvelle URL Railway**
3. **Cliquer** **"Save"**

**Si la variable n'existe pas :**

1. **Cliquer** **"Add New"**
2. **Name** :
   ```
   VITE_API_URL
   ```
3. **Value** :
   ```
   https://[VOTRE-URL-RAILWAY].up.railway.app
   ```
4. **Environment** : Cocher **Production**, **Preview**, **Development**
5. **Cliquer** **"Save"**

### 7.3 Redéployer Frontend

1. **Vercel** → **Deployments**
2. **Dernier déploiement** → **Bouton "..."** (trois points)
3. **Cliquer** **"Redeploy"**
4. **Attendre 1-2 minutes**

---

## 🎉 Étape 8 : Tests Finaux

### Test 1 : Backend URL Directe

**Ouvrir dans navigateur :**
```
https://[VOTRE-URL-RAILWAY].up.railway.app
```

**Résultat attendu :**
```
Cannot GET /
```

ou page blanche avec status `404` dans Developer Tools.

**✅ Signification :** Backend fonctionne, aucune route définie pour `/`

**❌ Si vous voyez :**
- "Application Failed to Respond" → Voir logs Deploy
- Timeout → Vérifier variables d'environnement

---

### Test 2 : Backend API Health (Optionnel)

Si une route `/health` ou `/api/health` existe :

```
https://[VOTRE-URL-RAILWAY].up.railway.app/api/health
```

**Résultat attendu :**
```json
{ "status": "ok" }
```

---

### Test 3 : Frontend Login End-to-End

#### 3.1 Ouvrir Frontend
```
https://ali-ce-i6it.vercel.app
```

#### 3.2 Ouvrir Developer Tools
**Navigateur** → **F12** ou **Right-click → Inspect**

#### 3.3 Onglet Network
**Developer Tools** → **Network** tab

#### 3.4 Tester Login

1. **Entrer** credentials quelconques (test@example.com / password123)
2. **Cliquer** **"Login"**
3. **Observer** la requête dans Network tab

#### 3.5 Vérifier la Requête

**Requête attendue :**
```
Request URL: https://[VOTRE-URL-RAILWAY].up.railway.app/api/auth/login
Request Method: POST
Status Code: 400 Bad Request  (credentials invalides)
ou
Status Code: 401 Unauthorized
```

**✅ Status 400/401 = Backend répond correctement !**

**❌ Status 404 = Backend ne route pas correctement → Voir logs**

**❌ Network Error / CORS Error :**
- Vérifier `CORS_ORIGIN` dans Railway Variables
- Doit être exactement : `https://ali-ce-i6it.vercel.app`
- Pas de `/` à la fin

---

## 🐛 Troubleshooting

### Problème 1 : Build échoue avec "npm: not found"

**Cause :** Node.js non installé

**Solution :**

Railway → Variables → Add :
```
NIXPACKS_NODE_VERSION=22
```

---

### Problème 2 : "prisma: command not found"

**Cause :** Prisma en devDependencies, pas installé en production

**Solution :**

Vérifier `backend/package.json` :
```json
"dependencies": {
  "@prisma/client": "^5.9.1"
},
"devDependencies": {
  "prisma": "^5.9.1"
}
```

Si problème persiste, déplacer `prisma` vers `dependencies`.

---

### Problème 3 : "Database connection failed"

**Cause :** `DATABASE_URL` incorrecte ou DB Render suspendue

**Solution :**

1. Vérifier Railway Variables → `DATABASE_URL`
2. Tester connexion depuis Render Dashboard :
   - Render → Database → Connect → Test connection
3. Si DB suspendue (inactivité 90 jours), attendre réveil automatique

---

### Problème 4 : Backend répond 404 pour toutes les routes

**Cause :** Routes API mal configurées

**Solution :**

Vérifier `backend/src/server.ts` :
```typescript
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
```

Les routes doivent commencer par `/api/`.

---

### Problème 5 : CORS Error dans Frontend

**Erreur dans Console :**
```
Access to XMLHttpRequest at 'https://...' from origin 'https://ali-ce-i6it.vercel.app' 
has been blocked by CORS policy
```

**Solution :**

1. Railway → Variables → Vérifier :
   ```
   CORS_ORIGIN=https://ali-ce-i6it.vercel.app
   ```
   (PAS de `/` final)

2. Vérifier `backend/src/server.ts` :
   ```typescript
   app.use(cors({
     origin: process.env.CORS_ORIGIN,
     credentials: true
   }));
   ```

---

## 📊 Checklist Complète

Avant de déclarer le déploiement réussi :

### Configuration Railway
- [ ] Root Directory = `backend`
- [ ] Builder = `NIXPACKS`
- [ ] 7 variables d'environnement présentes
- [ ] `railway.json` à la racine du repo
- [ ] `nixpacks.toml` à la racine du repo

### Logs Railway
- [ ] Logs BUILD montrent `cd backend`
- [ ] Logs BUILD montrent installation du backend (Express, Prisma, etc.)
- [ ] Logs BUILD montrent `Prisma Client generated`
- [ ] Logs BUILD montrent `Successfully compiled`
- [ ] Logs DEPLOY montrent `Server started on port 3000`
- [ ] Status service = 🟢 Active

### Tests
- [ ] URL backend affiche `Cannot GET /`
- [ ] Frontend login envoie requête à backend Railway
- [ ] Backend répond avec 400/401 (pas 404)
- [ ] Pas de CORS error dans Console

---

## ✅ Succès Final

**Quand tout fonctionne :**

**Railway Backend :**
```
🟢 Active
📊 Memory: ~150MB
🔗 URL: https://alice-production-8a87.up.railway.app
✓ Server started on port 3000
✓ Connected to database
```

**Frontend Vercel :**
```
✓ Login form sends POST to Railway
✓ Backend responds with 401 (invalid credentials)
✓ No 404 errors
✓ No CORS errors
```

**Test Login Réel :**

Si vous avez un compte test dans la DB :
```
Email: test@example.com
Password: Test1234!
```

Login devrait retourner :
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "xxx",
    "email": "test@example.com"
  }
}
```

Et rediriger vers le dashboard ! 🎉

---

## 💡 Prochaines Étapes

Une fois le déploiement réussi :

1. **Créer un compte test** via API ou Prisma Studio
2. **Tester le flow complet** : Register → Email Verification → Login → Dashboard
3. **Monitorer Railway** : Dashboard → Service → Metrics (CPU, RAM, Requests)
4. **Budget Railway** : 5$ gratuit, puis ~5$/mois

---

## 📞 Support

Si problème persiste, fournir :

1. **URL Railway** générée
2. **Logs BUILD complets** (onglet [Build])
3. **Logs DEPLOY complets** (onglet [Deploy])
4. **Screenshot** de la liste des Variables
5. **Screenshot** de Settings → Root Directory & Builder
6. **Erreur Console Frontend** (F12 → Console)

🚀 **Bon déploiement !**
