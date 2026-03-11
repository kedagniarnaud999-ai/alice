import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, difficulty, isFree } = req.query;

    const modules = await prisma.learningModule.findMany({
      where: {
        ...(category && { category: String(category) }),
        ...(difficulty && { difficulty: String(difficulty) }),
        ...(isFree !== undefined && { isFree: isFree === 'true' }),
      },
      orderBy: { order: 'asc' },
    });

    res.json({
      status: 'success',
      data: { modules },
    });
  } catch (error) {
    next(error);
  }
});

// IMPORTANT: Cette route DOIT être déclarée AVANT /:id pour éviter qu'Express
// l'intercepte en pensant que "progress" est un ID de module.
router.get('/progress/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const progress = await prisma.userProgression.findMany({
      where: { userId: req.user!.id },
      include: { module: true },
    });

    res.json({
      status: 'success',
      data: { progress },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const module = await prisma.learningModule.findUnique({
      where: { id: req.params.id },
    });

    if (!module) {
      return res.status(404).json({
        status: 'error',
        message: 'Module not found',
      });
    }

    res.json({
      status: 'success',
      data: { module },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/progress', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { progress, status } = req.body;

    const userProgress = await prisma.userProgression.upsert({
      where: {
        userId_moduleId: {
          userId: req.user!.id,
          moduleId: req.params.id,
        },
      },
      update: {
        progress,
        status,
        ...(status === 'completed' && { completedAt: new Date() }),
      },
      create: {
        userId: req.user!.id,
        moduleId: req.params.id,
        progress,
        status,
      },
    });

    res.json({
      status: 'success',
      data: { userProgress },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
