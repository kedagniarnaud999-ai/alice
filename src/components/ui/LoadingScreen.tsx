import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Analyse de votre profil en cours...' 
}) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-6">
          <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {message}
        </h3>
        <p className="text-gray-600 max-w-md">
          Veuillez patienter quelques instants...
        </p>
      </div>
    </div>
  );
};
