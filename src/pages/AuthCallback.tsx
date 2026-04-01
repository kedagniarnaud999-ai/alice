import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { authService } from '@/services/auth.api';

export const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const completeAuth = async () => {
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');
      const code = searchParams.get('code');

      if (error) {
        navigate(`/login?error=${encodeURIComponent(errorDescription || error)}`, { replace: true });
        return;
      }

      try {
        if (code) {
          await authService.exchangeCodeForSession(code);
        }
        navigate('/dashboard', { replace: true });
      } catch (err: any) {
        navigate(`/login?error=${encodeURIComponent(err?.message || 'auth_callback_failed')}`, {
          replace: true,
        });
      }
    };

    completeAuth();
  }, [navigate, searchParams]);

  return <LoadingScreen message="Connexion sécurisée en cours..." />;
};
