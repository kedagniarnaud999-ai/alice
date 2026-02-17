# 🚀 Guide Déploiement Railway - Backend Ali Ce (SANS Carte)

## ✅ Avantages Railway

- ✅ **5$ de crédit gratuit** (suffit pour ~1 mois)
- ✅ **PAS de carte bancaire** requise au début
- ✅ Variables **illimitées**
- ✅ Déploiement **automatique** depuis GitHub
- ✅ Interface très **simple**
- ✅ **Pas de sleep** après inactivité

---

## 📋 ÉTAPE 3 : Déployer Backend sur Railway

### 3A. Créer Compte Railway

1. Ouvrir : **https://railway.app**
2. Cliquer **"Login"**
3. Choisir **"Login with GitHub"**
4. Autoriser Railway
5. ✅ **5$ de crédit gratuit** automatique !

---

### 3B. Créer Nouveau Projet

1. Dashboard Railway → Cliquer **"New Project"**
2. Choisir **"Deploy from GitHub repo"**
3. Sélectionner le repo **"alice"** (ou kedagniarnaud999-ai/alice)
4. Cliquer sur le repo

---

### 3C. Configurer le Service

Railway détecte automatiquement Node.js !

**Configurer Root Directory :**
1. Cliquer sur le service créé
2. Onglet **"Settings"** (à gauche)
3. Section **"Service Settings"**
4. **Root Directory** : `backend`
5. Cliquer **"Update"**

---

### 3D. Configurer Variables d'Environnement

1. Onglet **"Variables"** (à gauche)
2. Cliquer **"New Variable"** et ajouter **UNE PAR UNE** :

```bash
NODE_ENV=production

DATABASE_URL=postgresql://ali_ce_user:zevlzJoaAPH08HOYPbiSm8TBbwimevfD@dpg-d6abe3a4d50c73btqneg-a/ali_ce_db

PORT=3000

JWT_SECRET=WUfkv2FezGPhQK3pJLVrRl1iu8qXbMOjs9amZtyd7AxNBIS0EwDog5cHYCTn46

JWT_REFRESH_SECRET=t6m4q9SIZoAd3lUXikDxQ581fzGvCKLJOEwpyWHuYPgrbaehTsN0jRMBn7Vc2F

FRONTEND_URL=https://ali-ce-platform.vercel.app

CORS_ORIGIN=https://ali-ce-platform.vercel.app
```

**⚠️ IMPORTANT :** 
- Copiez-collez EXACTEMENT (pas d'espaces)
- DATABASE_URL sur UNE seule ligne

---

### 3E. Déploiement Automatique

Railway démarre automatiquement le build dès que les variables sont ajoutées !

**Suivre le déploiement :**
1. Onglet **"Deployments"**
2. Voir les logs en temps réel
3. Attendre ~3-5 minutes
4. Status devient **"Success"** ✅ (vert)

---

### 3F. Obtenir l'URL Backend

**Générer un domaine public :**
1. Onglet **"Settings"**
2. Section **"Networking"**
3. **"Public Networking"** → Cliquer **"Generate Domain"**
4. Copier l'URL : `https://ali-ce-backend.up.railway.app`

---

### 3G. Tester

Ouvrir dans navigateur :
```
https://ali-ce-backend.up.railway.app
```

Vous devriez voir : **"Cannot GET /"** (c'est normal ✅)

---

## 💰 Crédit Gratuit Railway

**5$ gratuit inclus :**
- Backend (512MB RAM) ≈ $5/mois
- Avec 5$ gratuit = **1 mois complet GRATUIT**

**Après épuisement :**
- Ajouter carte bancaire pour continuer
- Ou migrer vers Render Free (avec sleep)

---

## 🐛 Dépannage

### Erreur de Build

**Voir logs :**
1. Onglet "Deployments"
2. Cliquer sur le dernier déploiement
3. Voir logs détaillés

**Erreurs communes :**
```
"Cannot find module" → Vérifier package.json
"DATABASE_URL not found" → Vérifier variables
"Prisma error" → Vérifier DATABASE_URL format
```

### Backend ne démarre pas

**Vérifier :**
1. Settings → Root Directory = `backend` ✅
2. Variables → Toutes les 7 variables présentes
3. Logs → Chercher erreurs rouges

### Redéployer

```
Settings → Scroll en bas → "Redeploy"
```

---

## 📊 Commandes Utiles

**Dans Railway Dashboard :**
- **Deployments** : Voir historique et logs
- **Variables** : Gérer variables environnement
- **Settings** : Config service, domaine, etc.
- **Metrics** : Voir CPU, RAM, trafic

---

## ✅ Prochaine Étape

Une fois déployé et URL copiée :
1. Tester : `https://votre-backend.up.railway.app`
2. Dites "deployed" + l'URL
3. On passe à l'**ÉTAPE 4 : Déployer Frontend sur Vercel** ! 🎉
