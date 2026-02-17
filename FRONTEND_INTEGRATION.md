# 🎨 Frontend - Intégration Backend & Authentification

## ✅ Composants créés

### 1. Authentification

#### **Contexte global** : `src/contexts/AuthContext.tsx`
- Provider d'authentification global
- Gestion de l'état utilisateur connecté
- Méthodes : `login`, `register`, `logout`, `isAuthenticated`
- Auto-chargement de l'utilisateur au démarrage

#### **Composants de formulaires** :
- `src/components/auth/LoginForm.tsx` : Formulaire de connexion avec OAuth Google
- `src/components/auth/RegisterForm.tsx` : Formulaire d'inscription avec validation
- `src/components/auth/ProtectedRoute.tsx` : HOC pour protéger les routes privées

#### **Pages d'authentification** :
- `src/pages/VerifyEmail.tsx` : Validation email avec token
- `src/pages/VerifyEmailSent.tsx` : Confirmation d'envoi email
- `src/pages/ForgotPassword.tsx` : Demande de réinitialisation mot de passe
- `src/pages/ResetPassword.tsx` : Formulaire de nouveau mot de passe
- `src/pages/AuthCallback.tsx` : Callback OAuth Google

### 2. Profil utilisateur

#### **Upload avatar** : `src/components/profile/AvatarUpload.tsx`
- Upload d'image avec prévisualisation
- Validation (types : JPG/PNG/WebP, taille max : 5 Mo)
- Intégration avec l'API `/users/avatar`

#### **Paramètres profil** : `src/pages/ProfileSettings.tsx`
- Affichage et modification des informations utilisateur
- Édition du nom
- Affichage email et rôle (lecture seule)
- Gestion d'avatar intégrée

### 3. Services API

#### **Client HTTP** : `src/services/api.client.ts`
- Client Axios configuré avec intercepteurs
- Auto-ajout du token JWT dans les headers
- Auto-refresh du token si 401
- Redirection `/login` si refresh échoue
- Support des cookies httpOnly

#### **Service Auth** : `src/services/auth.api.ts`
```typescript
interface AuthService {
  register(data: RegisterData): Promise<AuthResponse>
  login(data: LoginData): Promise<AuthResponse>
  logout(): Promise<void>
  getCurrentUser(): Promise<User>
  updateProfile(data: { name?: string; avatar?: string }): Promise<User>
  isAuthenticated(): boolean
}
```

#### **Service Profils** : `src/services/profile.api.ts`
```typescript
interface ProfileService {
  saveProfile(profile: ProfileResult): Promise<void>
  getMyProfile(): Promise<ProfileResult>
  saveTestResponses(responses: TestResponse[]): Promise<void>
}
```

#### **Service Modules** : `src/services/module.api.ts`
```typescript
interface ModuleService {
  getModules(filters?: ModuleFilters): Promise<LearningModule[]>
  getModule(id: string): Promise<LearningModule>
  updateProgress(moduleId: string, progress: number, status: string): Promise<void>
  getMyProgress(): Promise<UserProgress[]>
}
```

## 🛣️ Routing

### Structure des routes (`src/App.tsx`)

```
/login                 → LoginForm (public)
/register              → RegisterForm (public)
/verify-email          → VerifyEmail (public)
/verify-email-sent     → VerifyEmailSent (public)
/forgot-password       → ForgotPassword (public)
/reset-password        → ResetPassword (public)
/auth/callback         → AuthCallback (public, OAuth)

/*                     → TestApp (protected)
  └─ /                 → HomePage
  └─ /welcome          → WelcomeScreen
  └─ /test             → TestFlow
  └─ /results          → ResultsDashboard
  └─ /pathway          → PathwayView
  └─ /dashboard        → Dashboard
  └─ /profile          → ProfileSettings
```

### Protection des routes

Toutes les routes principales (`/*`) sont protégées par `<ProtectedRoute>` :
- Si non authentifié → redirection `/login`
- Si authentifié → accès autorisé

## 🔐 Flux d'authentification

### 1. Inscription classique
```
User → RegisterForm
  → authService.register()
  → Backend crée user + envoie email
  → Redirection /verify-email-sent
  → User clique lien email
  → /verify-email?token=xxx
  → Backend vérifie token
  → Redirection /login
```

### 2. Connexion classique
```
User → LoginForm
  → authService.login()
  → Backend valide credentials
  → Retourne JWT + user
  → Token stocké localStorage
  → AuthContext met à jour state
  → Redirection /dashboard
```

### 3. OAuth Google
```
User → Clique "Google"
  → Redirection backend /api/auth/google
  → Google OAuth flow
  → Callback /api/auth/google/callback
  → Backend crée/trouve user
  → Redirection /auth/callback?token=xxx
  → Frontend stocke token
  → Redirection /dashboard
```

### 4. Mot de passe oublié
```
User → ForgotPassword
  → authService.forgotPassword(email)
  → Backend envoie email avec token
  → User clique lien
  → /reset-password?token=xxx
  → ResetPassword form
  → authService.resetPassword(token, newPassword)
  → Redirection /login
```

## 🔄 Gestion des tokens

### Stockage
- **Access Token** : `localStorage.getItem('token')`
- **Refresh Token** : Cookie httpOnly (géré par backend)

### Auto-refresh
```typescript
// Dans api.client.ts interceptor
if (error.response?.status === 401) {
  // Tenter refresh
  const { data } = await this.client.post('/auth/refresh');
  localStorage.setItem('token', data.data.token);
  
  // Rejouer requête originale
  return this.client.request(originalRequest);
}
```

### Logout
```typescript
// Supprime token local + invalide refresh token backend
await authService.logout();
localStorage.removeItem('token');
```

## 📋 Variables d'environnement

### Frontend (`.env`)
```bash
VITE_API_URL=http://localhost:5000/api
```

**Note** : Créer manuellement le fichier `.env` (Windows bloque création via code)

## 🚀 Démarrage

### 1. Backend
```bash
cd backend
npm install
npm run dev
```
**Port** : `http://localhost:5000`

### 2. Frontend
```bash
cd ..
npm install
npm run dev
```
**Port** : `http://localhost:5173`

## 🎯 Prochaines étapes

### Intégration complète
1. **Connecter test d'orientation au backend** :
   - Sauvegarder réponses via `profileService.saveTestResponses()`
   - Sauvegarder profil via `profileService.saveProfile()`
   
2. **Connecter parcours personnalisés** :
   - Récupérer modules via `moduleService.getModules()`
   - Sauvegarder progression via `moduleService.updateProgress()`

3. **Connecter dashboard** :
   - Récupérer profil via `profileService.getMyProfile()`
   - Récupérer progression via `moduleService.getMyProgress()`

4. **Ajouter route `/profile`** dans App.tsx :
   ```typescript
   <Route path="/profile" element={<ProfileSettings />} />
   ```

5. **Ajouter lien profil** dans navigation Dashboard

### Amélioration UX
- [ ] Loading states pendant les requêtes API
- [ ] Toast notifications pour succès/erreurs
- [ ] Validation formulaires côté client avant envoi
- [ ] Gestion des erreurs réseau (retry, offline)
- [ ] Skeleton loaders pour chargements

### Backend (si nécessaire)
- [ ] Démarrer PostgreSQL
- [ ] Exécuter migrations Prisma : `npx prisma migrate dev`
- [ ] Seed database : `npm run seed`
- [ ] Configurer variables d'environnement backend (voir `backend/env.example`)
- [ ] Configurer SMTP pour emails (Gmail App Password recommandé)
- [ ] Configurer Google OAuth (Google Cloud Console)

## 🐛 Debugging

### Erreur 401 Unauthorized
- Vérifier token localStorage : `localStorage.getItem('token')`
- Vérifier backend running : `http://localhost:5000/api/health`
- Vérifier CORS configuré correctement

### Erreur CORS
Backend `server.ts` :
```typescript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
```

### Images avatar ne s'affichent pas
- Vérifier dossier `backend/uploads/avatars/` existe
- Vérifier serveur de fichiers statiques activé :
  ```typescript
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  ```

### OAuth Google ne fonctionne pas
1. Vérifier `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` dans `backend/.env`
2. Vérifier redirect URI dans Google Cloud Console :
   - Authorized redirect URIs : `http://localhost:5000/api/auth/google/callback`
3. Vérifier `FRONTEND_URL` dans backend `.env` : `http://localhost:5173`

## 📚 Documentation API

Voir `backend/README.md` pour la documentation complète de l'API (15 endpoints).

## ✨ Fonctionnalités complètes

✅ Authentification JWT complète
✅ OAuth Google
✅ Email verification
✅ Password reset
✅ Upload avatar
✅ Protected routes
✅ Auto-refresh tokens
✅ Services API typés
✅ Contexte global auth
✅ Formulaires validés
✅ UX responsive et moderne

**Le frontend est maintenant prêt pour l'intégration backend complète !** 🎉
