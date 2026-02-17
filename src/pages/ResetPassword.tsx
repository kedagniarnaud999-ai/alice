import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiClient } from '@/services/api.client';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Lock } from 'lucide-react';

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Token de réinitialisation manquant');
      return;
    }

    setStatus('loading');

    try {
      const response = await apiClient.post('/auth/reset-password', {
        token,
        newPassword: formData.password,
      });
      setStatus('success');
      setMessage((response.data as any).message || 'Votre mot de passe a été réinitialisé avec succès');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Le lien de réinitialisation est invalide ou a expiré');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nouveau mot de passe</h1>
            <p className="text-gray-600">Choisissez un nouveau mot de passe sécurisé</p>
          </div>

          {status === 'success' ? (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Mot de passe réinitialisé !</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <p className="text-sm text-gray-500">Redirection vers la page de connexion...</p>
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
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    placeholder="••••••••"
                  />
                  <p className="mt-1 text-xs text-gray-500">Minimum 8 caractères</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                    placeholder="••••••••"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full"
                >
                  {status === 'loading' ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
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
