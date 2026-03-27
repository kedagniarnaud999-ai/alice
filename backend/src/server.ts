import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import passport from './config/passport';
// Note: Prisma doit être instancié correctement pour le serverless
import { prisma } from './config/database'; 

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import profileRoutes from './routes/profile.routes';
import moduleRoutes from './routes/module.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Configuration CORS pour Vercel
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (origin.includes('vercel.app') || origin.includes('v0.dev')) {
      return callback(null, true);
    }
    const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',');
    if (allowedOrigins.some(o => o.trim() === origin)) {
      return callback(null, true);
    }
    callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, 
  message: 'Too many attempts',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/modules', moduleRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Gestion des erreurs
app.use(errorHandler);

// EXPORT POUR VERCEL (C'est ici que la magie opère)
// On n'utilise PAS app.listen(), on exporte l'app directement
export default app;
