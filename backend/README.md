# Ali Ce Backend API

## Installation

### Prérequis
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Setup

1. **Installer les dépendances**
```bash
cd backend
npm install
```

2. **Configuration de l'environnement**
```bash
cp env.example .env
```

Modifiez le fichier `.env` avec vos configurations :
```
DATABASE_URL=postgresql://username:password@localhost:5432/alice_db
JWT_SECRET=your-secret-key
```

3. **Setup de la base de données**
```bash
# Générer le client Prisma
npm run prisma:generate

# Créer la base de données et lancer les migrations
npm run prisma:migrate

# (Optionnel) Ouvrir Prisma Studio
npm run prisma:studio
```

4. **Lancer le serveur**
```bash
# Mode développement
npm run dev

# Mode production
npm run build
npm start
```

Le serveur sera accessible sur `http://localhost:5000`

## Architecture

```
backend/
├── prisma/
│   └── schema.prisma          # Schéma de base de données
├── src/
│   ├── config/
│   │   └── database.ts        # Configuration Prisma
│   ├── middleware/
│   │   ├── auth.middleware.ts # Authentification JWT
│   │   └── errorHandler.ts   # Gestion d'erreurs
│   ├── routes/
│   │   ├── auth.routes.ts     # Routes d'authentification
│   │   ├── user.routes.ts     # Routes utilisateur
│   │   ├── profile.routes.ts  # Routes profil
│   │   └── module.routes.ts   # Routes modules
│   ├── services/
│   │   └── auth.service.ts    # Logique d'authentification
│   └── server.ts              # Point d'entrée
└── package.json
```

## API Endpoints

### Authentification

#### POST /api/auth/register
Inscription d'un nouvel utilisateur
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### POST /api/auth/login
Connexion utilisateur
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST /api/auth/refresh
Rafraîchir le token JWT

#### POST /api/auth/logout
Déconnexion

### Utilisateur

#### GET /api/users/me
Récupérer le profil de l'utilisateur connecté (authentifié)

#### PATCH /api/users/me
Mettre à jour le profil (authentifié)

### Profil

#### POST /api/profiles
Créer ou mettre à jour le profil de carrière (authentifié)

#### GET /api/profiles/me
Récupérer le profil de carrière (authentifié)

#### POST /api/profiles/responses
Sauvegarder les réponses du test (authentifié)

### Modules

#### GET /api/modules
Récupérer tous les modules d'apprentissage
Query params: `category`, `difficulty`, `isFree`

#### GET /api/modules/:id
Récupérer un module spécifique

#### POST /api/modules/:id/progress
Mettre à jour la progression (authentifié)

#### GET /api/modules/progress/me
Récupérer toute la progression de l'utilisateur (authentifié)

## Sécurité

- **JWT Authentication** : Tokens avec expiration
- **Bcrypt** : Hashage des mots de passe
- **Helmet** : Protection headers HTTP
- **CORS** : Configuration stricte
- **Rate Limiting** : 100 requêtes / 15 minutes
- **Validation** : express-validator pour les inputs

## Base de Données

### Modèles Prisma

- **User** : Utilisateurs avec auth locale ou OAuth
- **Profile** : Profil de carrière détaillé
- **TestResponse** : Réponses au test d'orientation
- **LearningModule** : Modules de formation
- **UserProgression** : Suivi de progression
- **RefreshToken** : Tokens de rafraîchissement

## Scripts Utiles

```bash
# Générer le client Prisma après modification du schéma
npm run prisma:generate

# Créer une nouvelle migration
npm run prisma:migrate

# Ouvrir Prisma Studio (GUI pour la DB)
npm run prisma:studio

# Lancer en dev avec hot-reload
npm run dev
```

## Variables d'Environnement

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environnement | development |
| `PORT` | Port du serveur | 5000 |
| `DATABASE_URL` | URL PostgreSQL | - |
| `JWT_SECRET` | Secret pour JWT | - |
| `JWT_EXPIRES_IN` | Durée validité token | 7d |
| `JWT_REFRESH_SECRET` | Secret refresh token | - |
| `JWT_REFRESH_EXPIRES_IN` | Durée refresh token | 30d |
| `CORS_ORIGIN` | Origine CORS | http://localhost:5173 |

## Prochaines Étapes

- [ ] Intégrer OAuth Google
- [ ] Ajouter upload d'images (avatar)
- [ ] Implémenter email verification
- [ ] Ajouter système de recommandations
- [ ] Créer endpoints analytics
