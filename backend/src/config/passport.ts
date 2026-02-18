import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../config/database';

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (googleClientId && googleClientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          
          if (!email) {
            return done(new Error('No email found from Google'), undefined);
          }

          let user = await prisma.user.findUnique({
            where: { email },
          });

          if (user) {
            if (user.provider !== 'GOOGLE') {
              await prisma.user.update({
                where: { id: user.id },
                data: {
                  provider: 'GOOGLE',
                  providerId: profile.id,
                },
              });
            }
          } else {
            user = await prisma.user.create({
              data: {
                email,
                name: profile.displayName,
                avatar: profile.photos?.[0]?.value,
                provider: 'GOOGLE',
                providerId: profile.id,
                emailVerified: true,
              },
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }
    )
  );
} else {
  console.warn('Google OAuth credentials not configured. Google login will be unavailable.');
}

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
