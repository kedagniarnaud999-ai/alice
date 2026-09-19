import React from 'react';
import { WifiOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const ServiceStatusBanner: React.FC = () => {
  const { serviceHealth } = useAuth();

  if (!serviceHealth || serviceHealth.status !== 'unreachable') {
    return null;
  }

  return (
    <div
      role="alert"
      className="sticky top-0 z-50 border-b border-amber-300 bg-amber-100 px-4 py-3 text-amber-900"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-3">
        <WifiOff className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="text-sm leading-6">
          <p className="font-semibold">
            Le service d&apos;authentification Supabase ne répond pas.
          </p>
          <p className="mt-1">
            Inscription et connexion restent indisponibles tant que le projet n&apos;est pas
            joignable (projet en pause, supprimé ou URL incorrecte).{' '}
            {serviceHealth.httpStatus ? `Le service a renvoyé le code HTTP ${serviceHealth.httpStatus}.` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};
