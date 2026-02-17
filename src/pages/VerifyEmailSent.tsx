import React from 'react';
import { Mail } from 'lucide-react';

export const VerifyEmailSent: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <Mail className="w-8 h-8 text-primary-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vérifiez votre email</h2>
          <p className="text-gray-600 mb-6">
            Nous avons envoyé un email de vérification à votre adresse. Cliquez sur le lien dans l'email pour activer votre compte.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Astuce :</strong> Si vous ne voyez pas l'email, vérifiez votre dossier spam ou courrier indésirable.
            </p>
          </div>

          <p className="text-sm text-gray-600">
            Vous n'avez pas reçu d'email ?{' '}
            <a href="/resend-verification" className="text-primary-600 hover:text-primary-700 font-medium">
              Renvoyer
            </a>
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <a href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Retour à la connexion
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
