import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
// Solution pour contourner la limite de variables sur Render
if (process.env.ENV_CONFIG) {
  try {
    const config = JSON.parse(process.env.ENV_CONFIG);
    Object.keys(config).forEach((key) => {
      process.env[key] = config[key];
    });
    console.log('✅ Variables d\'environnement chargées depuis ENV_CONFIG');
  } catch (error) {
    console.error('❌ Erreur lors du chargement de ENV_CONFIG:', error);
  }
}
// --- FIN DU CONTENU À AJOUTER ---
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import passport from './config/passport';
import { prisma } from './config/database';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import profileRoutes from './routes/profile.routes';
import moduleRoutes from './routes/module.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

const uploadDir = path.join(__dirname, '../uploads/avatars');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Rate limiting plus strict pour les routes d'authentification
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requêtes par fenêtre (login/register)
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());
// --- DÉBUT DU BLOC CORS À REMPLACER ---
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

app.use(cors({
  origin: (origin, callback) => {
    // 1. Autoriser les requêtes sans origin (mobile, postman, etc.)
    if (!origin) return callback(null, true);
    
    // 2. Autoriser explicitement TOUS les sous-domaines Vercel (Production & Preview)
    if (origin.includes('vercel.app')) {
      console.log(`✅ CORS allowed (Vercel): ${origin}`);
      return callback(null, true);
    }
    
    // 3. Autoriser v0.dev si utilisé
    if (origin.includes('v0.dev')) {
      return callback(null, true);
    }

    // 4. Vérifier la liste blanche classique (localhost, etc.)
    const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',');
    if (allowedOrigins.some(o => o.trim() === origin)) {
      return callback(null, true);
    }

    // 5. Refuser les autres
    console.warn(`❌ CORS blocked: ${origin}`);
    callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
// --- FIN DU BLOC CORS ---
