# Ali Ce - Orientation & Career Development Platform

## About Ali Ce

Ali Ce is a professional EdTech and Career Development platform focused on orientation, upskilling, employability, and career positioning, primarily for young people and professionals in Africa (Francophone context).

## Features

### 🔐 Authentication System
- JWT-based authentication
- Google OAuth integration
- Email verification
- Password reset functionality
- Protected routes
- Auto-refresh tokens

### 📝 Psychometric Orientation Test
- 23 targeted questions evaluating 6 key dimensions
- Real-time analysis and profiling
- No "right or wrong" answers - authentic self-assessment
- Progress saving and recovery

### 6 Evaluation Dimensions
1. **Cognitive & Working Profile** - How you think, learn, and solve problems
2. **Passion & Motivation** - What gives you energy and engagement
3. **Natural Talents** - Abilities recognized by others
4. **Centers of Interest** - Domains and sectors of attraction
5. **Personal Reality & Constraints** - Time, tools, learning conditions
6. **Career Stage / Positioning** - Current professional situation

### Personalized Results
- Dominant profile identification
- Natural talents assessment
- Motivation drivers analysis
- Primary interests mapping
- Career positioning insights
- Feasibility assessment
- Clear next actions

### Learning Pathways
- Customized learning tracks
- Quick-win modules
- Long-term goals
- Progressive milestones
- Skills-based recommendations

### 👤 User Profile Management
- Avatar upload (JPG, PNG, WebP)
- Profile editing
- Progress tracking
- Personal dashboard

## Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router 6
- **HTTP Client**: Axios 1.6
- **Icons**: Lucide React
- **Design System**: Custom components (Button, Card, Badge, ProgressBar)

### Backend
- **Runtime**: Node.js + Express 4.18
- **Language**: TypeScript 5.3
- **Database**: PostgreSQL 14+ with Prisma ORM 5.9
- **Authentication**: JWT + Passport.js + Google OAuth2
- **Email**: Nodemailer 6.9
- **File Upload**: Multer 1.4
- **Security**: Helmet, CORS, Rate Limiting

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+ (for backend)

### Quick Start

#### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Create .env file (manually on Windows)
# Add: VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Copy env.example to .env and fill in:
# - DATABASE_URL
# - JWT_SECRET
# - EMAIL credentials (optional for dev)
# - GOOGLE_CLIENT_ID/SECRET (optional)

# Run database migrations
npx prisma migrate dev

# Seed database with learning modules
npm run seed

# Start backend server
npm run dev
```

Backend runs on: `http://localhost:5000`

### Full Setup Guide

See [SETUP.md](SETUP.md) for detailed installation instructions.

### Frontend-Backend Integration

See [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md) for:
- Authentication flows
- API services documentation
- Routing structure
- Token management
- Debugging tips

## Project Structure

```
alice/
├── src/                          # Frontend source
│   ├── components/
│   │   ├── auth/                 # Login, Register, ProtectedRoute
│   │   ├── profile/              # AvatarUpload
│   │   ├── ui/                   # Reusable UI components
│   │   ├── test/                 # Test flow components
│   │   ├── results/              # Results dashboard
│   │   ├── pathway/              # Learning pathway views
│   │   └── dashboard/            # User dashboard
│   ├── contexts/
│   │   └── AuthContext.tsx       # Global auth state
│   ├── services/
│   │   ├── api.client.ts         # Axios client with interceptors
│   │   ├── auth.api.ts           # Auth API service
│   │   ├── profile.api.ts        # Profile API service
│   │   └── module.api.ts         # Learning modules API
│   ├── pages/
│   │   ├── VerifyEmail.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── ResetPassword.tsx
│   │   ├── ProfileSettings.tsx
│   │   └── AuthCallback.tsx      # OAuth callback
│   ├── data/
│   │   └── questions.ts          # Test questions database
│   ├── types/
│   │   └── test.ts               # TypeScript interfaces
│   ├── utils/
│   │   ├── testAnalyzer.ts       # Scoring engine
│   │   ├── pathwayEngine.ts      # Pathway recommendations
│   │   └── storageManager.ts     # LocalStorage management
│   ├── App.tsx                   # Main app with routing
│   └── main.tsx                  # Entry point
│
├── backend/                      # Backend API
│   ├── src/
│   │   ├── routes/               # API routes
│   │   ├── services/             # Business logic
│   │   ├── middleware/           # Auth, upload, errors
│   │   ├── config/               # Database, passport
│   │   ├── scripts/              # Seed script
│   │   └── server.ts             # Express server
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   ├── uploads/                  # Uploaded avatars
│   └── README.md                 # Backend documentation
│
├── SETUP.md                      # Installation guide
├── FRONTEND_INTEGRATION.md       # Frontend-backend docs
└── README.md                     # This file
```

## Design Philosophy

- **Trustworthy & Professional**: Modern, clean interface
- **Supportive, Not Judgmental**: Empowering language
- **Action-Oriented**: Clear next steps
- **Realistic & Pragmatic**: No overpromises
- **Culturally Relevant**: Adapted to African Francophone context

## Core Principles

1. **No rigid personality types** - Identify tendencies, not categories
2. **Transparent scoring** - Explainable results
3. **Evolutionary profiles** - Users can grow and change
4. **Feasibility first** - Realistic assessments based on constraints
5. **Employability focus** - Market-relevant recommendations

## License

Proprietary - All rights reserved

## Contact

For more information about Ali Ce, please visit our website or contact our team.
