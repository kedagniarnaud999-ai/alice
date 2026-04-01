import React from 'react';
import { Mail } from 'lucide-react';

export const VerifyEmailSent: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <Mail className="h-8 w-8 text-primary-600" />
          </div>

          <h2 className="mb-2 text-2xl font-bold text-gray-900">Vérifiez votre email</h2>
          <p className="mb-6 text-gray-600">
            Supabase vient d'envoyer un lien de confirmation à votre adresse. Cliquez dessus pour
            activer votre compte puis revenez dans l'application.
          </p>

          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              <strong>Astuce :</strong> vérifiez aussi vos spams et assurez-vous que l'URL de
              redirection configurée dans Supabase pointe vers <code>/auth/callback</code>.
            </p>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <a href="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Retour à la connexion
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
