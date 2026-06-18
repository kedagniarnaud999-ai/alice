# 🔧 Fix Railway : Build Frontend au lieu de Backend

## ❌ Symptôme

Railway build le **frontend Vite** au lieu du **backend Node.js** :

```
INFO No package manager inferred, using npm default
↳ Deploying as vite static site
↳ Output directory: dist
```

**Résultat :**
- Build réussit (frontend Vite)
- Déploiement "Active" 🟢
- Mais backend API ne répond pas
- Frontend login 404 NOT_FOUND

---

## 🔍 Cause

Railway détecte automatiquement le type d'app en cherchant `package.json` **à la racine du repo**.

**Structure du projet :**
```
alice/                    ← Railway cherche ICI
├── package.json          ← FRONTEND (Vite détecté !)
├── backend/
│   ├── package.json      ← BACKEND (ignoré)
│   ├── src/
│   └── prisma/
└── src/                  (frontend React)
```

**Erreur :**
- `Root Directory = backend` configuré ✓
- **MAIS** Railway a déjà choisi le builder "Vite Static Site" avant d'appliquer Root Directory
- Les Build/Start commands ne contiennent pas `cd backend`

---

## ✅ Solution : Custom Build Commands avec `cd backend`

### Étape 1 : Ouvrir Settings

1. **Railway Dashboard** : https://railway.app
2. Ouvrir votre projet
3. **Cliquer** sur service **backend**
4. **Menu gauche** → **Settings**

---

### Étape 2 : Trouver Build Configuration

**Scroller** jusqu'à section :
```
⚙️ Build
   Builder: NIXPACKS ou RAILPACK
```

Plus bas, trouver :
```
Custom Build Command
Custom Start Command
```

---

### Étape 3 : Configurer les Commandes

#### Build Command

**Remplacer** (ou ajouter si vide) :

```bash
cd backend && npm install && npx prisma generate && npm run build
```

**Explication :**
- `cd backend` : Entre dans le dossier backend AVANT toute commande
- `npm install` : Installe les dépendances du backend
- `npx prisma generate` : Génère le client Prisma
- `npm run build` : Compile TypeScript → JavaScript

---

#### Start Command

**Remplacer** (ou ajouter si vide) :

```bash
cd backend && npx prisma migrate deploy && npm start
```

**Explication :**
- `cd backend` : Entre dans le dossier backend
- `npx prisma migrate deploy` : Applique les migrations DB en production
- `npm start` : Lance le serveur Node.js (`node dist/server.js`)

---

### Étape 4 : Sauvegarder

1. **Cliquer** sur **"Update"** ou **"Save"**
2. Railway **redémarre automatiquement**
3. **Attendre 3-5 minutes**

---

### Étape 5 : Vérifier les Nouveaux Logs BUILD

**Railway → Deployments → Dernier déploiement → Onglet [Build]**

Les nouveaux logs doivent montrer :

```
✓ cd backend
✓ npm install
✓ npx prisma generate
✓ Prisma Client generated
✓ npm run build
✓ TypeScript compiled successfully
✓ Build completed
```

**Onglet [Deploy] doit montrer :**

```
✓ cd backend
✓ npx prisma migrate deploy
✓ Prisma Migrations applied
✓ Server started on port 3000
✓ Connected to database
```

---

## 📊 Timeline Attendue

```
00:00 - Update Build/Start commands
00:10 - Railway trigger redeploy automatique
00:30 - Build démarre (cd backend)
01:00 - npm install (backend dependencies)
02:00 - Prisma generate
03:00 - TypeScript compile (backend)
03:30 - Deploy démarre
04:00 - Prisma migrate deploy
04:30 - Server starts
05:00 - Status = Active ✅
```

**Total : ~5 minutes**

---

## ✅ Test de Validation

### Test 1 : URL Backend

Ouvrir dans navigateur :
```
https://alice-production-8a87.up.railway.app
```

**Attendu :** `Cannot GET /` (texte simple)

✅ Si vous voyez ce message = Backend fonctionne !

❌ Si "Application Failed to Respond" = Problème persiste

---

### Test 2 : Health Check API

```
https://alice-production-8a87.up.railway.app/api/health
```

**Attendu :** `{ "status": "ok" }` ou erreur 404 (si route non définie)

---

### Test 3 : Frontend Login

```
https://ali-ce-i6it.vercel.app
```

1. Ouvrir Console (F12)
2. Tester login avec credentials quelconques
3. Vérifier requête HTTP dans Network tab

**Attendu :**
```
POST https://alice-production-8a87.up.railway.app/api/auth/login
Status: 400 Bad Request (credentials invalides)
ou 401 Unauthorized
```

✅ Si vous recevez 400/401 = Backend répond !

❌ Si 404 NOT_FOUND = Backend ne route pas correctement

---

## 🐛 Troubleshooting

### Problème : Build échoue avec "npm: not found"

**Cause :** Railway n'a pas installé Node.js dans le container

**Fix :**

Railway → Settings → Add Variable :
```
NIXPACKS_NODE_VERSION=22
```

Update et redéployer.

---

### Problème : "prisma: command not found"

**Cause :** Prisma pas installé en production

**Fix :**

Vérifier `backend/package.json` :
```json
"dependencies": {
  "@prisma/client": "^5.9.1"
},
"devDependencies": {
  "prisma": "^5.9.1"
}
```

Si `prisma` est en `devDependencies`, Railway avec `NODE_ENV=production` ne l'installe pas.

**Solution A :** Déplacer `prisma` vers `dependencies`

**Solution B :** Build command :
```bash
cd backend && npm ci --include=dev && npx prisma generate && npm run build
```

---

### Problème : TypeScript compile errors

**Cause :** Erreurs de type dans le code

**Voir les erreurs exactes dans logs BUILD**

Example fix déjà appliqué dans commit `b7dca66` :
- Suppression imports React inutilisés
- Type assertions pour Axios responses
- Préfixe `_` pour variables inutilisées

---

### Problème : "Application Failed to Respond" après build réussi

**Causes possibles :**

1. **Port incorrect**
   - Railway → Variables
   - Vérifier `PORT=3000` existe
   - Backend doit écouter sur `process.env.PORT`

2. **Database URL manquante**
   - Vérifier `DATABASE_URL` dans Variables
   - Format PostgreSQL correct

3. **Server crash au démarrage**
   - Voir logs Deploy pour stack trace

---

## 📋 Checklist Complète

Avant de déclarer le problème résolu :

- [ ] Root Directory = `backend`
- [ ] Build Command = `cd backend && npm install && npx prisma generate && npm run build`
- [ ] Start Command = `cd backend && npx prisma migrate deploy && npm start`
- [ ] 7 variables d'environnement présentes (DATABASE_URL, JWT_SECRET, etc.)
- [ ] Logs BUILD montrent `cd backend` en première ligne
- [ ] Logs BUILD montrent installation du **backend** (pas frontend Vite)
- [ ] Logs DEPLOY montrent `Server started on port 3000`
- [ ] URL backend affiche `Cannot GET /`
- [ ] Frontend login envoie requête à backend (Network tab)
- [ ] Backend répond avec 400/401 (pas 404)

---

## 🎯 Résumé Visual

**AVANT (incorrect) :**
```
Railway
  └─ Détecte package.json racine
     └─ Builder = Vite Static Site
        └─ Build frontend React ❌
           └─ Deploy Caddy seulement
              └─ Backend inexistant
```

**APRÈS (correct) :**
```
Railway
  └─ Custom commands : cd backend
     └─ Entre dans backend/
        └─ Détecte backend/package.json
           └─ Build backend Node.js ✅
              └─ Deploy avec Prisma + Node
                 └─ Server API fonctionnel
```

---

## 💡 Prévention Future

Si vous recréez un service Railway :

1. **Séparer les repos** (recommandé) :
   - Repo A : `ali-ce-frontend` (Vercel)
   - Repo B : `ali-ce-backend` (Railway)

2. **OU** Configurer dès le début :
   - Railway → New Service
   - Immédiatement ajouter Root Directory = `backend`
   - Immédiatement ajouter Custom Build/Start commands avec `cd backend`

---

## ✅ Succès Attendu

**Backend Railway logs :**
```
✓ Server started on port 3000
✓ Connected to PostgreSQL database
✓ Listening at https://alice-production-8a87.up.railway.app
```

**Frontend Vercel :**
```
✓ Login form sends POST to Railway backend
✓ Backend returns 401 Unauthorized (credentials invalid)
✓ No more 404 errors
```

**Status Railway :**
- 🟢 **Active**
- Uptime : 100%
- Memory : ~150MB

---

## 📞 Si Toujours Bloqué

Fournir :
1. Logs BUILD complets (onglet [Build])
2. Logs DEPLOY complets (onglet [Deploy])
3. Valeur exacte des Build/Start commands
4. Screenshot de Settings → Build Configuration

🚀 **Bonne chance !**
