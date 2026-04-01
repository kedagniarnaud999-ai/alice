import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setStatus('error');
      setMessage(error.message || "Une erreur s'est produite. Veuillez réessayer.");
      return;
    }

    setStatus('success');
    setMessage('Un email de réinitialisation a été envoyé.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
              <Mail className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Mot de passe oublié ?</h1>
            <p className="text-gray-600">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>

          {status === 'success' ? (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Email envoyé !</h2>
              <p className="mb-6 text-gray-600">{message}</p>
              <p className="mb-8 text-sm text-gray-500">
                Vérifiez votre boîte de réception puis suivez le lien envoyé par Supabase.
              </p>
              <a href="/login" className="font-medium text-primary-600 hover:text-primary-700">
                Retour à la connexion
              </a>
            </div>
          ) : (
            <>
              {message && status === 'error' && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <Button type="submit" disabled={status === 'loading'} className="w-full">
                  {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le lien'}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                <a href="/login" className="font-medium text-primary-600 hover:text-primary-700">
                  Retour à la connexion
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
