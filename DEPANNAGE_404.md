# 🔧 Guide de Dépannage - Erreur 404 Backend

## ❌ Symptôme

```
404 : INTROUVABLE
Code: NOT_FOUND
```

La page de connexion s'affiche mais ne fonctionne pas.

---

## 🔍 Diagnostic en 5 Étapes

### Étape 1 : Vérifier Backend Railway Actif

**Ouvrir dans navigateur :**
```
https://alice-production-8a87.up.railway.app
```

**Résultats possibles :**

✅ **Affiche "Cannot GET /"** = Backend fonctionne (normal)
❌ **Application Failed to Respond** = Backend crashé
❌ **Timeout** = Backend ne répond pas
❌ **Page d'erreur Railway** = Service arrêté

---

### Étape 2 : Vérifier Status Railway

1. **https://railway.app**
2. Ouvrir votre projet
3. Cliquer sur le service backend
4. Regarder le status en haut :

✅ **Active** (vert) = OK
❌ **Failed** (rouge) = Crashé
❌ **Deploying** (jaune) = En cours
❌ **Removed** (gris) = Supprimé

**Si Failed ou Crashed :**
- Onglet **"Deployments"**
- Cliquer sur le dernier
- **Logs** → Chercher erreurs rouges
- Me copier les dernières lignes d'erreur

---

### Étape 3 : Vérifier URL Railway Générée

Railway peut avoir changé l'URL !

1. Railway → Service backend
2. **Settings** → **Networking**
3. Section **"Public Networking"**
4. **URL affichée** (exemple : `alice-production-8a87.up.railway.app`)

**Si différente de celle configurée :**
- Noter la nouvelle URL
- Il faut mettre à jour Vercel

---

### Étape 4 : Vérifier VITE_API_URL dans Vercel

1. **https://vercel.com**
2. Ouvrir projet **"alice"**
3. **Settings** → **Environment Variables**
4. Chercher **VITE_API_URL**

**Valeur correcte :**
```
https://alice-production-8a87.up.railway.app/api
```

⚠️ **Points critiques :**
- Doit finir par `/api`
- Pas d'espace
- Pas de `/` à la fin après `/api`
- URL exacte de Railway

**Si absente ou incorrecte :**
1. Modifier ou ajouter
2. **Deployments** → **...** → **Redeploy**

---

### Étape 5 : Vérifier Requête dans Browser

**Sur la page de login :**

1. **F12** → DevTools
2. Onglet **"Network"** (Réseau)
3. Essayer de se connecter
4. Chercher requête vers `/auth/login`
5. Cliquer dessus
6. Regarder **Request URL**

**URL appelée devrait être :**
```
https://alice-production-8a87.up.railway.app/api/auth/login
```

**Si différent :**
- Me copier l'URL exacte vue
- Problème de configuration Vercel

---

## 🛠️ Solutions Rapides

### Solution A : Backend Crashé

**Si Railway status = Failed :**

```powershell
# Forcer redéploiement
cd C:\Users\hp\Desktop\alice\backend
```

Railway → Service → Settings → **Redeploy**

Ou ajuster code si erreur dans logs.

---

### Solution B : URL Railway Changée

**Si Railway a généré nouvelle URL :**

1. Copier nouvelle URL Railway
2. Vercel → Settings → Environment Variables
3. Modifier **VITE_API_URL** :
   ```
   https://NOUVELLE-URL.up.railway.app/api
   ```
4. Vercel → Deployments → Redeploy

---

### Solution C : VITE_API_URL Manquante

**Si variable absente dans Vercel :**

1. Vercel → Settings → Environment Variables
2. **Add** :
   ```
   Key: VITE_API_URL
   Value: https://alice-production-8a87.up.railway.app/api
   Environments: Production, Preview, Development
   ```
3. Deployments → Redeploy

---

### Solution D : CORS Non Configuré

**Si backend actif mais erreur CORS :**

1. Railway → Service → Variables
2. Vérifier :
   ```
   FRONTEND_URL=https://ali-ce-i6it.vercel.app
   CORS_ORIGIN=https://ali-ce-i6it.vercel.app
   ```
3. Update → Attendre redémarrage

---

## 🔍 Checklist Complète

Cochez au fur et à mesure :

```
☐ Backend Railway répond (Cannot GET /)
☐ Railway status = Active (vert)
☐ URL Railway correcte (Settings → Networking)
☐ VITE_API_URL dans Vercel correcte
☐ VITE_API_URL finit par /api
☐ CORS_ORIGIN dans Railway = URL Vercel
☐ FRONTEND_URL dans Railway = URL Vercel
☐ Backend logs sans erreurs
☐ Vercel redéployé après changement variable
```

---

## 💬 Informations à Me Fournir

Si toujours bloqué, donnez-moi :

1. **Status Railway** (Active/Failed/Deploying)
2. **URL Railway** (Settings → Networking)
3. **Valeur VITE_API_URL** dans Vercel
4. **Dernières lignes des logs** Railway (si Failed)
5. **Request URL** vue dans DevTools Network
6. **Erreur console** (F12 → Console, copier messages rouges)

Avec ces infos, je peux identifier le problème exact ! 🎯

---

## 📞 Contact Rapide

**Format de réponse rapide :**

```
Status Railway: [Active/Failed/Autre]
URL Railway: [copier URL]
VITE_API_URL: [copier valeur Vercel]
Erreur console: [copier message]
```

Cela m'aidera à vous débloquer rapidement ! 🚀
