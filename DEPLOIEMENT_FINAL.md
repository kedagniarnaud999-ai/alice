# 🎉 Déploiement Final - Frontend Vercel & Tests

## ✅ État Actuel

- ✅ Backend déployé : https://alice-production-8a87.up.railway.app
- ✅ Base de données PostgreSQL Render connectée
- ⏳ Frontend à déployer sur Vercel

---

## 📋 ÉTAPE 4 : Déployer Frontend sur Vercel

### 4A. Créer Compte Vercel (2 min)

1. **https://vercel.com**
2. **"Sign Up"** → **"Continue with GitHub"**
3. Autoriser Vercel
4. Dashboard Vercel s'affiche

---

### 4B. Importer Projet (3 min)

1. Dashboard Vercel → **"Add New..."** → **"Project"**
2. Section **"Import Git Repository"**
3. Trouver **"alice"** dans la liste
4. Cliquer **"Import"**

---

### 4C. Configurer Projet (2 min)

**Configure Project :**

```
Framework Preset: Vite ✅ (auto-détecté)

Root Directory: ./ (laisser vide = racine)

Build Command: npm run build (auto)

Output Directory: dist (auto)

Install Command: npm install (auto)
```

**Ne pas cliquer Deploy encore !**

---

### 4D. Variables d'Environnement (1 min)

**Section "Environment Variables"**

Cliquer **"Add"** et entrer :

```
Key: VITE_API_URL

Value: https://alice-production-8a87.up.railway.app/api

Environments: ✅ Production, ✅ Preview, ✅ Development
```

⚠️ **IMPORTANT** : 
- L'URL doit se terminer par `/api`
- Pas d'espace
- Utiliser VOTRE URL Railway

---

### 4E. Déployer (2-3 min)

1. Cliquer **"Deploy"** (bouton bleu en bas)
2. Build démarre (~2-3 minutes)
3. ✅ **"Congratulations!"** s'affiche
4. URL du frontend s'affiche

**Format URL :** `https://alice-xxx.vercel.app`

---

### 4F. Copier URL Frontend

Copier l'URL complète affichée, par exemple :
```
https://alice-kedagniarnaud999ai.vercel.app
```

---

## 📋 ÉTAPE 5 : Mettre à Jour CORS sur Railway

### 5A. Retourner sur Railway

1. **https://railway.app**
2. Ouvrir votre projet
3. Cliquer sur le service **backend**
4. Onglet **"Variables"** (menu gauche)

---

### 5B. Modifier Variables

Trouver et **modifier** ces 2 variables :

```
FRONTEND_URL=https://alice-kedagniarnaud999ai.vercel.app
👆 Remplacer par VOTRE URL Vercel (SANS / à la fin)

CORS_ORIGIN=https://alice-kedagniarnaud999ai.vercel.app
👆 MÊME URL (SANS / à la fin)
```

**Cliquer "Update"** sur chaque variable

---

### 5C. Attendre Redéploiement (1-2 min)

Railway redémarre automatiquement le backend

Attendre que le status redevienne **"Active"** ✅

---

## 📋 ÉTAPE 6 : TESTER L'APPLICATION ! 🎉

### 6A. Ouvrir Frontend

```
https://votre-app.vercel.app
```

---

### 6B. Checklist Complète

#### Test 1 : Page Charge
```
✅ Page d'accueil s'affiche
✅ Design responsive
✅ Pas d'erreurs dans Console (F12)
```

#### Test 2 : Inscription
```
1. Cliquer "S'inscrire"
2. Remplir :
   - Nom : Test User
   - Email : test@exemple.com
   - Mot de passe : Test1234
   - Confirmer : Test1234
3. Cliquer "Créer mon compte"
4. ✅ Redirection vers /verify-email-sent
   (email pas envoyé car pas de SMTP configuré - normal)
```

#### Test 3 : Connexion
```
1. Aller sur /login
2. Email : test@exemple.com
3. Mot de passe : Test1234
4. Cliquer "Se connecter"
5. ✅ Redirection vers Dashboard
```

#### Test 4 : Test d'Orientation
```
1. Dans Dashboard → "Commencer le test"
2. Répondre à quelques questions
3. ✅ Navigation fonctionne
4. Terminer le test
5. ✅ Voir résultats
```

#### Test 5 : Dashboard
```
✅ Profil s'affiche
✅ Statistiques visibles
✅ Navigation fluide
```

---

## 🐛 Problèmes Courants

### ❌ Erreur CORS
```
Console : "Access to XMLHttpRequest blocked by CORS"
```

**Solution :**
1. Railway → Variables
2. Vérifier CORS_ORIGIN = URL Vercel EXACTE
3. Pas de / à la fin
4. Update et attendre redémarrage

---

### ❌ Erreur 404 API
```
Console : "404 Not Found" sur /api/...
```

**Solution :**
1. Vercel → Settings → Environment Variables
2. Vérifier VITE_API_URL
3. Doit finir par /api
4. Format : https://backend.railway.app/api
5. Redéployer : Deployments → ... → Redeploy

---

### ❌ Page Blanche
```
Frontend charge mais rien ne s'affiche
```

**Solution :**
1. F12 → Console
2. Chercher erreurs
3. Souvent : VITE_API_URL manquante
4. Ajouter variable → Redéployer

---

## 🎉 SUCCÈS !

### Votre Application est EN LIGNE ! 🚀

**URLs :**
- 🎨 Frontend : https://votre-app.vercel.app
- 🔧 Backend : https://alice-production-8a87.up.railway.app
- 💾 Database : PostgreSQL Render

**Coûts :**
- Vercel : **0€** (gratuit)
- Railway : **5$ gratuit** pour 1 mois
- Render DB : **0€** (gratuit)
- **Total : 0€ pour le premier mois**

---

## 🔄 Mettre à Jour l'Application

### Quand vous modifiez le code :

```powershell
cd C:\Users\hp\Desktop\alice

# Commiter et pousser
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin master
```

**Railway et Vercel redéploient AUTOMATIQUEMENT** 🎉

- Railway : 3-5 minutes
- Vercel : 2-3 minutes

---

## 📊 Monitoring

### Vercel Dashboard
- Analytics (visiteurs, performance)
- Deployments (historique)
- Logs (erreurs frontend)

### Railway Dashboard
- Metrics (CPU, RAM)
- Logs (backend en temps réel)
- Usage (crédit restant)

---

## 🎯 Prochaines Étapes (Optionnel)

Après déploiement réussi, vous pouvez :

1. **Connecter test au backend** (ROADMAP.md Phase 1.1)
2. **Connecter parcours** (Phase 1.2)
3. **Configurer Email Gmail** (pour vérification email)
4. **Configurer OAuth Google** (connexion Google)
5. **Ajouter domaine custom** (ali-ce.com)

---

## 💡 Besoin d'Aide ?

Si problème :
1. Copier message d'erreur exact
2. Copier console logs (F12)
3. Me dire l'étape où vous êtes bloqué

Je vous aide en temps réel ! 🚀
