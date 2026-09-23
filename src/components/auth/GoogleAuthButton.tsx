import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { describeAuthError, type AuthErrorDescription } from '@/utils/authErrors';

interface GoogleAuthButtonProps {
  label: string;
  onError: (error: AuthErrorDescription | null) => void;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ label, onError }) => {
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    onError(null);
    setLoading(true);
    try {
      // Le navigateur part chez Google : l'état chargé tient jusqu'au retour sur /auth/callback.
      await loginWithGoogle();
    } catch (error) {
      setLoading(false);
      onError(describeAuthError(error));
    }
  };

  return (
    <div className="mb-6">
      <Button
        type="button"
        variant="outline"
        onClick={handleClick}
        disabled={loading}
        className="w-full rounded-2xl py-3 text-base"
      >
        {loading ? 'Ouverture de Google...' : label}
      </Button>
      <div className="my-6 flex items-center gap-4 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        ou
        <span className="h-px flex-1 bg-slate-200" />
      </div>
    </div>
  );
};
