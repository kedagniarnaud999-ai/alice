import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Lien traité</h2>
          <p className="mb-8 text-gray-600">
            La confirmation d'email est maintenant gérée par Supabase. Vous pouvez vous reconnecter
            pour continuer si la redirection automatique ne s'est pas déclenchée.
          </p>
          <Button onClick={() => navigate('/login')} className="w-full">
            Aller à la connexion
          </Button>
        </div>
      </div>
    </div>
  );
};
