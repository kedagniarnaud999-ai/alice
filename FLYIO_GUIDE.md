# 🚀 Guide Déploiement Fly.io - Backend Ali Ce

## ✅ Fichiers Créés

- `backend/fly.toml` - Configuration Fly.io
- `backend/Dockerfile` - Image Docker optimisée
- `backend/.dockerignore` - Exclusions Docker

## 📋 ÉTAPE 3 : Déployer Backend sur Fly.io

### 3A. Installer Fly CLI

**PowerShell en tant qu'ADMINISTRATEUR :**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

**Fermer et rouvrir PowerShell NORMAL**

**Vérifier :**
```powershell
fly version
```

---

### 3B. Se Connecter à Fly.io

```powershell
cd C:\Users\hp\Desktop\alice\backend

fly auth login
```

Cela ouvre le navigateur → Créer compte ou se connecter avec GitHub

---

### 3C. Créer PostgreSQL Database sur Fly.io

```powershell
fly postgres create
```

**Répondre aux questions :**
```
? Choose an app name: ali-ce-db
? Select Organization: [votre org]
? Choose a region: cdg (Paris)
? Select configuration: Development - Single node, 1x shared CPU, 256MB RAM, 1GB disk
```

**IMPORTANT : Copier la DATABASE_URL affichée**
Format : `postgres://postgres:PASSWORD@ali-ce-db.flycast:5432`

---

### 3D. Créer l'Application Backend

```powershell
fly launch --no-deploy
```

**Répondre aux questions :**
```
? Choose an app name: ali-ce-backend
? Choose a region: cdg (Paris)
? Would you like to set up a Postgresql database? No (déjà fait)
? Would you like to set up an Upstash Redis database? No
? Create .dockerignore? No (déjà créé)
```

---

### 3E. Configurer Variables d'Environnement

```powershell
# DATABASE_URL (celle copiée de Render)
fly secrets set DATABASE_URL="postgresql://ali_ce_user:zevlzJoaAPH08HOYPbiSm8TBbwimevfD@dpg-d6abe3a4d50c73btqneg-a/ali_ce_db"

# JWT Secrets
fly secrets set JWT_SECRET="WUfkv2FezGPhQK3pJLVrRl1iu8qXbMOjs9amZtyd7AxNBIS0EwDog5cHYCTn46"

fly secrets set JWT_REFRESH_SECRET="t6m4q9SIZoAd3lUXikDxQ581fzGvCKLJOEwpyWHuYPgrbaehTsN0jRMBn7Vc2F"

# URLs (temporaires)
fly secrets set FRONTEND_URL="https://ali-ce-platform.vercel.app"

fly secrets set CORS_ORIGIN="https://ali-ce-platform.vercel.app"
```

**Vérifier :**
```powershell
fly secrets list
```

---

### 3F. Déployer

```powershell
fly deploy
```

Cela va :
1. Build l'image Docker (~3-5 minutes)
2. Pousser vers Fly.io
3. Exécuter migrations Prisma
4. Démarrer l'app

**Voir logs en temps réel :**
```powershell
fly logs
```

---

### 3G. Obtenir l'URL

```powershell
fly status
```

Ou voir directement :
```powershell
fly open
```

**URL Format :** `https://ali-ce-backend.fly.dev`

---

## 🐛 Dépannage

### Erreur Build
```powershell
fly logs
```

### Erreur Database
```powershell
fly secrets list
# Vérifier DATABASE_URL correct
```

### App ne démarre pas
```powershell
fly status
fly logs --app ali-ce-backend
```

### Redéployer
```powershell
fly deploy --force
```

---

## 💰 Coûts Fly.io

**Plan Gratuit inclus :**
- 3 machines shared-cpu-1x (256MB RAM)
- 3GB volume persistant
- 160GB transfert sortant

**Votre backend utilisera :**
- 1 machine (shared-cpu-1x, 256MB) = GRATUIT ✅
- Trafic ~10GB/mois = GRATUIT ✅

**Coût réel : 0€/mois** (avec carte pour vérification uniquement)

---

## 📊 Commandes Utiles

```powershell
# Voir logs en temps réel
fly logs

# Statut de l'app
fly status

# Ouvrir dans navigateur
fly open

# SSH dans la machine
fly ssh console

# Redémarrer
fly apps restart ali-ce-backend

# Scale (si besoin plus de RAM)
fly scale memory 512

# Voir toutes les apps
fly apps list
```

---

## ✅ Prochaine Étape

Une fois déployé :
1. Copier l'URL : `https://ali-ce-backend.fly.dev`
2. Tester : ouvrir dans navigateur (devrait voir "Cannot GET /")
3. Passer à l'ÉTAPE 4 : Déployer Frontend sur Vercel
