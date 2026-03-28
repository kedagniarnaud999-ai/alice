# 🚀 Déploiement Vercel - Guide Rapide

## ✅ Code Pushé !

Votre code est maintenant sur GitHub :
- **Repository** : https://github.com/kedagniarnaud999-ai/alice
- **Dernier commit** : Corrections backend + notifications + validation

---

## 📋 Déployer sur Vercel (5 minutes)

### Étape 1 : Aller sur Vercel
1. Ouvrez https://vercel.com
2. Cliquez **"Sign Up"** ou **"Log In"**
3. Choisissez **"Continue with GitHub"**

### Étape 2 : Importer le projet
1. Dashboard Vercel → **"Add New..."** → **"Project"**
2. Dans **"Import Git Repository"**, trouvez **"alice"**
3. Cliquez **"Import"**

### Étape 3 : Configurer le projet

**Framework Preset** : Vite ✅ (auto-détecté)

**Root Directory** : `./` (laisser vide)

**Build Command** : `npm run build` (auto)

**Output Directory** : `dist` (auto)

### Étape 4 : Variables d'environnement

Cliquez **"Environment Variables"** → **"Add"** :

```
Key: VITE_API_URL
Value: https://alice-production-8a87.up.railway.app/api
```

✅ Cochez : Production, Preview, Development

### Étape 5 : Déployer !

1. Cliquez **"Deploy"** (bouton bleu)
2. Attendez 2-3 minutes ⏳
3. ✅ **"Congratulations!"** s'affiche

### Étape 6 : Copier l'URL

Votre frontend est en ligne !
```
https://alice-xxx.vercel.app
```

---

## 🔧 Mettre à jour CORS sur Railway

1. Allez sur https://railway.app
2. Ouvrez votre projet `alice`
3. Cliquez sur le service **backend**
4. Onglet **"Variables"**

**Mettez à jour :**

```
FRONTEND_URL = https://alice-xxx.vercel.app
CORS_ORIGIN = https://alice-xxx.vercel.app
```

⚠️ **Sans le `/` à la fin !**

---

## 🧪 Tester l'application

### 1. Ouvrez le frontend
```
https://alice-xxx.vercel.app
```

### 2. Checklist de test

#### ✅ Page d'accueil
- [ ] La page se charge
- [ ] Design responsive
- [ ] Pas d'erreurs dans la console (F12)

#### ✅ Inscription
- [ ] Cliquez "S'inscrire"
- [ ] Remplissez le formulaire
- [ ] Validation inline fonctionne (erreurs rouges)
- [ ] Toast de succès apparaît
- [ ] Redirection vers `/verify-email-sent`

#### ✅ Connexion
- [ ] Email et mot de passe valides
- [ ] Toast de succès
- [ ] Redirection vers Dashboard

#### ✅ Test d'orientation
- [ ] Navigation dans les questions
- [ ] Sauvegarde automatique (message "Sauvegardé")
- [ ] Résultats s'affichent
- [ ] Dashboard accessible

#### ✅ Dashboard
- [ ] Profil affiché
- [ ] Bouton "Mon Profil" fonctionne
- [ ] Navigation fluide

---

## 🐛 Résolution de problèmes

### Erreur CORS
```
Access to XMLHttpRequest blocked by CORS
```

**Solution :**
1. Railway → Variables
2. Vérifiez `CORS_ORIGIN` = URL Vercel EXACTE
3. Pas de `/` à la fin
4. Attendre le redéploiement (1-2 min)

---

### Erreur 404 API
```
404 Not Found sur /api/...
```

**Solution :**
1. Vercel → Settings → Environment Variables
2. Vérifiez `VITE_API_URL`
3. Doit finir par `/api`
4. Redéployer : Deployments → ... → Redeploy

---

### Page blanche
```
Rien ne s'affiche
```

**Solution :**
1. F12 → Console
2. Cherchez les erreurs
3. Souvent : `VITE_API_URL` manquante
4. Ajouter variable → Redéployer

---

## 🎉 Succès !

Votre application est **EN LIGNE** !

**URLs :**
- 🎨 Frontend : `https://alice-xxx.vercel.app`
- 🔧 Backend : `https://alice-production-8a87.up.railway.app`
- 💾 Code : `https://github.com/kedagniarnaud999-ai/alice`

**Coût : 0€** (plans gratuits)

---

## 🔄 Mises à jour futures

Quand vous modifiez le code :

```powershell
cd C:\Users\hp\Desktop\alice

git add .
git commit -m "feat: votre modification"
git push origin master
```

**Dé dé dé dé ploiement automatique !** 🎉
- Vercel : 2-3 minutes
- Railway : 3-5 minutes

---

## 📊 Monitoring

### Vercel
- Analytics : visiteurs, performance
- Deployments : historique
- Logs : erreurs frontend

### Railway
- Metrics : CPU, RAM
- Logs : backend en temps réel
- Usage : crédit restant

---

## 💡 Besoin d'aide ?

Copiez :
1. Le message d'erreur exact
2. Les logs de la console (F12)
3. L'étape où vous êtes bloqué

Je vous aide en temps réel ! 🚀
