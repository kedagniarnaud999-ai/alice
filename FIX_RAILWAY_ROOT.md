# 🔧 Fix Railway : "Aucun gestionnaire de paquets détecté"

## ❌ Erreur

```
INFO Aucun gestionnaire de paquets détecté, utilisation de npm par défaut
```

Backend ne démarre pas, affiche "Application Failed to Respond"

---

## 🔍 Cause

Railway cherche `package.json` à la **racine du repo** au lieu du dossier `backend/`

**Structure du projet :**
```
alice/                    ← Railway est ICI
├── backend/              ← Mais devrait être ICI
│   ├── package.json      ← Le fichier est ici !
│   ├── src/
│   └── prisma/
├── src/                  (frontend)
└── package.json          (frontend)
```

---

## ✅ Solution : Configurer Root Directory

### Étape 1 : Ouvrir Settings

1. **Railway Dashboard** : https://railway.app
2. Ouvrir votre projet
3. **Cliquer** sur le service **backend**
4. **Menu gauche** → **"Settings"**

---

### Étape 2 : Trouver Root Directory

**Scroller** vers le bas jusqu'à trouver section :

```
📁 Source
   └─ Root Directory
```

ou

```
⚙️ Build Configuration
   └─ Root Directory
```

---

### Étape 3 : Configurer

**Valeur actuelle :** (vide) ou `.` ou `/` ou autre

**Valeur correcte :**
```
backend
```

👆 **Exactement ce mot**, minuscules, pas de `/` avant ou après

---

### Étape 4 : Sauvegarder

1. Entrer `backend` dans le champ
2. Cliquer **"Update"** ou **"Save"**
3. Railway redémarre **automatiquement**
4. Attendre 2-3 minutes

---

### Étape 5 : Vérifier

**Nouveau déploiement démarre :**
- Onglet **"Deployments"**
- Nouveau build apparaît en haut
- Logs montrent maintenant :
  ```
  ✓ npm install
  ✓ Prisma generate
  ✓ Build TypeScript
  ✓ Prisma migrate deploy
  ✓ Server started on port 3000
  ```

**Tester :**
```
https://alice-production-8a87.up.railway.app
```

Devrait maintenant afficher : **"Cannot GET /"** ✅

---

## 🐛 Si Ça Ne Marche Toujours Pas

### Vérification Alternative : Watch Paths

Certaines interfaces Railway ont **"Watch Paths"** au lieu de Root Directory

**Si vous voyez "Watch Paths" :**
```
Watch Paths: /backend/**
```

---

### Vérification : Build Command

Dans **Settings**, section **Build** :

**Build Command :**
```
npm install && npx prisma generate && npm run build
```

**Start Command :**
```
npx prisma migrate deploy && npm start
```

Si différent, corriger et Update.

---

### Vérification : Variables Environment

Railway → **Variables**

Vérifier présence de **7 variables** :
```
✓ NODE_ENV=production
✓ DATABASE_URL=postgresql://...
✓ PORT=3000
✓ JWT_SECRET=...
✓ JWT_REFRESH_SECRET=...
✓ FRONTEND_URL=https://ali-ce-i6it.vercel.app
✓ CORS_ORIGIN=https://ali-ce-i6it.vercel.app
```

---

## 📊 Timeline Attendue

```
00:00 - Update Root Directory = backend
00:05 - Railway redémarre automatiquement
00:10 - Build démarre (npm install)
01:00 - Prisma generate
02:00 - TypeScript compile
02:30 - Prisma migrate deploy
03:00 - Server starts
03:30 - Status = Active ✅
```

**Total : ~3-4 minutes**

---

## ✅ Succès

**Quand c'est bon :**
- Status Railway = **Active** (vert)
- URL backend affiche **"Cannot GET /"**
- Frontend peut se connecter
- Login fonctionne ✅

---

## 💬 Si Toujours Bloqué

**Donnez-moi :**
1. Valeur actuelle de Root Directory
2. Nouveaux logs après changement (Deployments → dernier)
3. Status du déploiement (Success/Failed)

Je vous aide à débugger ! 🚀
