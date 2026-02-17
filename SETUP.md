# Ali Ce - Full Stack Setup Guide

## 🎯 Architecture

```
ali-ce/
├── frontend/                # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── services/       # API Services
│   │   ├── types/          # TypeScript Types
│   │   └── utils/          # Utilities
│   └── package.json
│
└── backend/                # Node.js + Express + Prisma
    ├── src/
    │   ├── routes/         # API Routes
    │   ├── services/       # Business Logic
    │   ├── middleware/     # Auth & Error Handling
    │   └── config/         # Configuration
    ├── prisma/
    │   └── schema.prisma   # Database Schema
    └── package.json
```

---

## 📦 Installation

### Prérequis
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **npm** ou **yarn**

---

## 🚀 Setup Backend

### 1. Installation des dépendances
```powershell
cd backend
npm install
```

### 2. Configuration de PostgreSQL

**Option A : Installation locale Windows**
1. Télécharger PostgreSQL depuis https://www.postgresql.org/download/windows/
2. Installer avec le mot de passe de votre choix
3. Créer la base de données :
```sql
CREATE DATABASE alice_db;
```

**Option B : Docker (recommandé)**
```powershell
docker run --name alice-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=alice_db -p 5432:5432 -d postgres:14
```

### 3. Configuration de l'environnement

Copier `env.example` vers `.env` :
```powershell
cp env.example .env
```

Modifier `.env` avec vos paramètres :
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/alice_db
JWT_SECRET=changez-ceci-par-une-clé-secrète-forte
JWT_REFRESH_SECRET=changez-ceci-aussi
```

### 4. Initialisation de la base de données

```powershell
# Générer le client Prisma
npm run prisma:generate

# Créer les tables
npm run prisma:migrate

# (Optionnel) Ouvrir l'interface Prisma Studio
npm run prisma:studio
```

### 5. Lancer le serveur backend

```powershell
npm run dev
```

✅ Backend accessible sur **http://localhost:5000**

---

## 🎨 Setup Frontend

### 1. Installation des dépendances
```powershell
cd ..
npm install
```

### 2. Configuration de l'environnement

Créer un fichier `.env` à la racine :
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Lancer le serveur frontend

```powershell
npm run dev
```

✅ Frontend accessible sur **http://localhost:5173**

---

## 🔐 API Endpoints Disponibles

### **Authentification**
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Inscription | ❌ |
| POST | `/api/auth/login` | Connexion | ❌ |
| POST | `/api/auth/refresh` | Refresh token | ❌ |
| POST | `/api/auth/logout` | Déconnexion | ✅ |

### **Utilisateur**
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/me` | Profil utilisateur | ✅ |
| PATCH | `/api/users/me` | Mise à jour profil | ✅ |

### **Profil de Carrière**
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/profiles` | Créer/Mettre à jour profil | ✅ |
| GET | `/api/profiles/me` | Récupérer profil | ✅ |
| POST | `/api/profiles/responses` | Sauvegarder réponses test | ✅ |

### **Modules d'Apprentissage**
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/modules` | Liste des modules | ❌ |
| GET | `/api/modules/:id` | Détails d'un module | ❌ |
| POST | `/api/modules/:id/progress` | Mettre à jour progression | ✅ |
| GET | `/api/modules/progress/me` | Ma progression | ✅ |

---

## 🧪 Tester l'API

### Exemple avec cURL

**Inscription**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

**Connexion**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Récupérer profil (avec token)**
```bash
curl http://localhost:5000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📊 Base de Données

### Modèles principaux

**User**
- Authentification locale ou OAuth
- Rôles : USER, ADMIN, MENTOR
- Relations : Profile, TestResponses, Progression

**Profile**
- Type de profil
- Talents naturels
- Motivations
- Centres d'intérêt
- Position carrière

**LearningModule**
- Titre, description
- Durée, difficulté
- Catégorie, compétences
- Gratuit/Premium

**UserProgression**
- Suivi par module
- Statut, progression %
- Date de complétion

---

## 🔧 Scripts Utiles

### Backend
```powershell
npm run dev              # Lancer en dev avec hot-reload
npm run build            # Build pour production
npm start                # Lancer en production
npm run prisma:generate  # Générer client Prisma
npm run prisma:migrate   # Créer migrations
npm run prisma:studio    # Ouvrir Prisma Studio
```

### Frontend
```powershell
npm run dev      # Lancer en dev
npm run build    # Build pour production
npm run preview  # Preview du build
```

---

## 🐛 Dépannage

### Problème : Base de données ne se connecte pas
- Vérifier que PostgreSQL est lancé
- Vérifier le `DATABASE_URL` dans `.env`
- Tester la connexion : `psql -U postgres -d alice_db`

### Problème : CORS errors
- Vérifier `CORS_ORIGIN` dans backend `.env`
- Vérifier `VITE_API_URL` dans frontend `.env`

### Problème : Token invalide
- Vérifier que `JWT_SECRET` est défini
- Clear localStorage dans le navigateur
- Se reconnecter

---

## 🚀 Prochaines Étapes

1. **Tester le flow complet**
   - Inscription → Test → Profil → Modules
   
2. **Seed la base de données**
   - Ajouter des modules d'apprentissage
   
3. **Implémenter OAuth Google**
   - Configurer Google Cloud Console
   - Ajouter routes OAuth
   
4. **Déploiement**
   - Backend : Render, Railway, ou DigitalOcean
   - Frontend : Vercel, Netlify
   - Database : Supabase, Neon, ou AWS RDS

---

## 📞 Support

Pour toute question, consulter :
- Backend README : `backend/README.md`
- Frontend documentation dans le code
- Issues GitHub du projet
