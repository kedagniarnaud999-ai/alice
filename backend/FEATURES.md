# Backend Setup & Features Documentation

## 🚀 Nouvelles Fonctionnalités Ajoutées

### 1. OAuth Google ✅
- Configuration Passport.js avec Google OAuth2
- Routes `/api/auth/google` et `/api/auth/google/callback`
- Auto-création de compte si l'utilisateur n'existe pas
- Redirection automatique vers le frontend avec token

### 2. Email Verification ✅
- Génération de tokens de vérification sécurisés
- Emails HTML professionnels avec Nodemailer
- Endpoint `/api/auth/verify-email`
- Tokens valides pendant 24h

### 3. Password Reset ✅
- Flux complet "Mot de passe oublié"
- Endpoint `/api/auth/forgot-password`
- Endpoint `/api/auth/reset-password`
- Tokens valides pendant 1h
- Invalidation de tous les refresh tokens après reset

### 4. Upload Avatar ✅
- Middleware Multer pour upload d'images
- Validation des types (JPEG, PNG, WebP)
- Limite de 5MB par fichier
- Stockage dans `uploads/avatars/`
- Endpoint `/api/users/avatar` (POST)

### 5. Seed Database ✅
- Script de seed avec 15 modules d'apprentissage
- Catégories : Technologie, Business, Créativité, Gestion, Éducation, Employabilité
- Mix de modules gratuits et premium
- Commande : `npm run seed`

---

## 📝 Nouvelles Variables d'Environnement

Ajoutez ces variables dans votre `.env` :

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Email Service (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Frontend URL (for redirects)
FRONTEND_URL=http://localhost:5173
```

---

## 🔧 Setup OAuth Google

1. **Créer un projet sur Google Cloud Console**
   - https://console.cloud.google.com/
   
2. **Activer Google+ API**
   - APIs & Services → Enable APIs → Google+ API

3. **Créer des credentials OAuth 2.0**
   - APIs & Services → Credentials → Create OAuth Client ID
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`

4. **Copier Client ID et Client Secret** dans `.env`

---

## 📧 Setup Email (Gmail)

1. **Activer l'authentification à deux facteurs** sur votre compte Gmail

2. **Générer un mot de passe d'application**
   - https://myaccount.google.com/apppasswords
   - Sélectionner "Mail" et "Other"
   - Copier le mot de passe généré

3. **Ajouter dans `.env`**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=generated-app-password
   ```

---

## 🗄️ Mise à Jour de la Base de Données

```powershell
cd backend

# Générer la nouvelle migration
npm run prisma:migrate

# Seed la base de données avec les modules
npm run seed
```

---

## 🧪 Tester les Nouvelles Fonctionnalités

### Test OAuth Google
```
1. Naviguer vers: http://localhost:5000/api/auth/google
2. Se connecter avec Google
3. Vérifier la redirection vers le frontend avec le token
```

### Test Email Verification
```bash
# Register un compte
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test"}'

# Vérifier l'email reçu et utiliser le token
curl -X POST http://localhost:5000/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{"token":"TOKEN_FROM_EMAIL"}'
```

### Test Password Reset
```bash
# Demander reset
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Reset avec token
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"TOKEN_FROM_EMAIL","password":"newpassword123"}'
```

### Test Upload Avatar
```bash
curl -X POST http://localhost:5000/api/users/avatar \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "avatar=@/path/to/image.jpg"
```

---

## 📊 Nouveaux Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/auth/google` | Redirection vers Google OAuth | ❌ |
| GET | `/api/auth/google/callback` | Callback Google OAuth | ❌ |
| POST | `/api/auth/verify-email` | Vérifier l'email | ❌ |
| POST | `/api/auth/forgot-password` | Demander reset password | ❌ |
| POST | `/api/auth/reset-password` | Reset password | ❌ |
| POST | `/api/users/avatar` | Upload avatar | ✅ |

---

## 📁 Nouvelle Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   └── passport.ts         # ← NEW: Config Passport
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── errorHandler.ts
│   │   └── upload.middleware.ts # ← NEW: Multer config
│   ├── services/
│   │   ├── auth.service.ts      # ← UPDATED: +4 methods
│   │   └── email.service.ts     # ← NEW: Email service
│   ├── scripts/
│   │   └── seed.ts              # ← NEW: Seed script
│   └── routes/
│       ├── auth.routes.ts       # ← UPDATED: +5 routes
│       └── user.routes.ts       # ← UPDATED: +1 route
├── uploads/
│   └── avatars/                 # ← NEW: Upload directory
└── prisma/
    └── schema.prisma            # ← UPDATED: +4 fields
```

---

## ✨ Prochaines Étapes

Le backend est maintenant complet avec :
- ✅ Authentification JWT
- ✅ OAuth Google
- ✅ Email Verification
- ✅ Password Reset
- ✅ Upload d'images
- ✅ 15 modules de formation

Il reste à faire côté **frontend** :
1. Composants Login/Register
2. Page Email Verification
3. Page Reset Password
4. Intégration OAuth Google
5. Upload d'avatar dans le profil
6. Liste des modules et progression

Voulez-vous que je continue avec le frontend maintenant ? 🎨
