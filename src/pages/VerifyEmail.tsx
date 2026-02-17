import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiClient } from '@/services/api.client';
import { Button } from '@/components/ui/Button';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Token de vérification manquant');
        return;
      }

      try {
        const response = await apiClient.post('/auth/verify-email', { token });
        setStatus('success');
        setMessage((response.data as any).message || 'Votre email a été vérifié avec succès !');
        
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error: any) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Le lien de vérification est invalide ou a expiré');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="flex justify-center mb-6">
                <Loader className="w-16 h-16 text-primary-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Vérification en cours...</h2>
              <p className="text-gray-600">Veuillez patienter pendant que nous vérifions votre email</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email vérifié !</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <p className="text-sm text-gray-500">Redirection vers la page de connexion...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="flex justify-center mb-6">
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Vérification échouée</h2>
              <p className="text-gray-600 mb-8">{message}</p>
              <Button
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Retour à la connexion
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
