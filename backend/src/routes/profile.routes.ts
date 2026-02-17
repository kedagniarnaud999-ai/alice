import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { prisma } from '../config/database';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.post('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      profileType,
      profileDescription,
      naturalTalents,
      motivationDrivers,
      primaryInterests,
      careerStage,
      feasibilityAssessment,
      nextActions,
    } = req.body;

    const existingProfile = await prisma.profile.findUnique({
      where: { userId: req.user!.id },
    });

    if (existingProfile) {
      const profile = await prisma.profile.update({
        where: { userId: req.user!.id },
        data: {
          profileType,
          profileDescription,
          naturalTalents,
          motivationDrivers,
          primaryInterests,
          careerStage,
          feasibilityAssessment,
          nextActions,
        },
      });

      return res.json({
        status: 'success',
        data: { profile },
      });
    }

    const profile = await prisma.profile.create({
      data: {
        userId: req.user!.id,
        profileType,
        profileDescription,
        naturalTalents,
        motivationDrivers,
        primaryInterests,
        careerStage,
        feasibilityAssessment,
        nextActions,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user!.id },
    });

    if (!profile) {
      throw new AppError('Profile not found', 404);
    }

    res.json({
      status: 'success',
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/responses', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { responses } = req.body;

    await prisma.testResponse.deleteMany({
      where: { userId: req.user!.id },
    });

    const testResponses = await prisma.testResponse.createMany({
      data: responses.map((r: any) => ({
        userId: req.user!.id,
        questionId: r.questionId,
        selectedOptions: r.selectedOptions,
      })),
    });

    res.status(201).json({
      status: 'success',
      data: { count: testResponses.count },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
