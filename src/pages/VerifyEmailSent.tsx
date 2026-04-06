import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { authService } from '@/services/auth.api';

export const VerifyEmailSent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const isExistingAccount = searchParams.get('existing') === '1';
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleResend = async () => {
    if (!email) {
      setStatus('error');
      setFeedback("Impossible de renvoyer l'email sans adresse associee.");
      return;
    }

    setStatus('loading');
    setFeedback('');

    try {
      await authService.resendSignupConfirmation(email);
      setStatus('success');
      setFeedback('Un nouveau mail de confirmation a ete envoye.');
    } catch (error: any) {
      setStatus('error');
      setFeedback(error?.message || "Le renvoi du mail n'a pas abouti.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <Mail className="h-8 w-8 text-primary-600" />
          </div>

          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            {isExistingAccount ? 'Compte deja detecte' : 'Verifiez votre email'}
          </h2>

          <p className="mb-6 text-gray-600">
            {isExistingAccount
              ? "Cet email semble deja associe a un compte. Selon la configuration de Supabase, un nouvel email de confirmation n'est pas toujours renvoye automatiquement."
              : "Un lien de confirmation a ete prepare pour finaliser votre inscription. Cliquez dessus pour activer votre compte puis revenez dans l'application."}
          </p>

          {email && (
            <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Adresse concernee : <strong>{email}</strong>
            </div>
          )}

          {feedback && (
            <div
              className={`mb-6 rounded-lg p-4 text-sm ${
                status === 'error'
                  ? 'border border-red-200 bg-red-50 text-red-800'
                  : 'border border-green-200 bg-green-50 text-green-800'
              }`}
            >
              {feedback}
            </div>
          )}

          {isExistingAccount ? (
            <div className="space-y-3 text-left">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                Essayez d'abord la connexion. Si vous ne retrouvez plus votre mot de passe, lancez
                une reinitialisation.
              </div>
              <a
                href={`/login${email ? `?email=${encodeURIComponent(email)}` : ''}`}
                className="block rounded-lg bg-primary-600 px-4 py-3 text-center font-medium text-white transition hover:bg-primary-700"
              >
                Aller a la connexion
              </a>
              <a
                href={`/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ''}`}
                className="block rounded-lg border border-gray-300 px-4 py-3 text-center font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Reinitialiser mon mot de passe
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                <strong>Astuce :</strong> verifiez aussi vos spams et confirmez que l'URL de
                redirection Supabase pointe bien vers <code>/auth/callback</code>.
              </div>
              <button
                type="button"
                onClick={handleResend}
                disabled={status === 'loading'}
                className="w-full rounded-lg bg-primary-600 px-4 py-3 font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? "Renvoi en cours..." : "Renvoyer l'email de confirmation"}
              </button>
              <a
                href={`/login${email ? `?email=${encodeURIComponent(email)}` : ''}`}
                className="block pt-2 font-medium text-primary-600 hover:text-primary-700"
              >
                Retour a la connexion
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
