import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle } from 'lucide-react';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
      .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
      .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const { register: registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>Compte créé avec succès !</span>
        </div>
      );
      navigate('/verify-email-sent');
    } catch (err: any) {
      const message = err?.message || "Échec de l'inscription. Veuillez réessayer.";
      toast.error(
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4" />
          <span>{message}</span>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
    } catch (err: any) {
      toast.error(
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4" />
          <span>{err?.message || 'Inscription Google indisponible.'}</span>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Rejoignez <span className="text-primary-600">Ali Ce</span>
            </h1>
            <p className="text-gray-600">Créez votre compte pour commencer</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`w-full rounded-lg border px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-primary-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Jean Dupont"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full rounded-lg border px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-primary-500 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="votre.email@exemple.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className={`w-full rounded-lg border px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-primary-500 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={`w-full rounded-lg border px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-primary-500 ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Création du compte...' : 'Créer mon compte'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">Ou s'inscrire avec</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 transition hover:bg-gray-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium text-gray-700">Google</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Vous avez déjà un compte ?{' '}
            <a href="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Connectez-vous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
