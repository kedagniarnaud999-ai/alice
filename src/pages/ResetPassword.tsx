import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [hasSession, setHasSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setStatus('error');
        setMessage(error.message);
        return;
      }

      setHasSession(!!data.session);
    };

    loadSession();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setStatus('error');
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 8) {
      setStatus('error');
      setMessage('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setStatus('loading');

    const { error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      setStatus('error');
      setMessage(error.message || 'Le lien de réinitialisation est invalide ou a expiré');
      return;
    }

    setStatus('success');
    setMessage('Votre mot de passe a été réinitialisé avec succès.');

    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
              <Lock className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Nouveau mot de passe</h1>
            <p className="text-gray-600">Choisissez un nouveau mot de passe sécurisé</p>
          </div>

          {status === 'success' ? (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Mot de passe réinitialisé !</h2>
              <p className="mb-6 text-gray-600">{message}</p>
              <p className="text-sm text-gray-500">Redirection vers la page de connexion...</p>
            </div>
          ) : (
            <>
              {!hasSession && status === 'idle' && (
                <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  Ouvrez cette page depuis le lien reçu par email afin que Supabase restaure la
                  session de réinitialisation.
                </div>
              )}

              {message && status === 'error' && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                    Nouveau mot de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    placeholder="••••••••"
                  />
                  <p className="mt-1 text-xs text-gray-500">Minimum 8 caractères</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                    Confirmer le mot de passe
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    placeholder="••••••••"
                  />
                </div>

                <Button type="submit" disabled={status === 'loading' || !hasSession} className="w-full">
                  {status === 'loading' ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
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
