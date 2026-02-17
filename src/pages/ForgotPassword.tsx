import React, { useState } from 'react';
import { apiClient } from '@/services/api.client';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Mail } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      setStatus('success');
      setMessage(response.data.message || 'Un email de réinitialisation a été envoyé');
    } catch (error: any) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Mail className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mot de passe oublié ?</h1>
            <p className="text-gray-600">Entrez votre email pour recevoir un lien de réinitialisation</p>
          </div>

          {status === 'success' ? (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Email envoyé !</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <p className="text-sm text-gray-500 mb-8">
                Vérifiez votre boîte de réception et suivez les instructions pour réinitialiser votre mot de passe.
              </p>
              <a
                href="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Retour à la connexion
              </a>
            </div>
          ) : (
            <>
              {message && status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full"
                >
                  {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le lien'}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                <a href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
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
