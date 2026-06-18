import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ArrowLeft, CheckCircle, LockKeyhole, Sparkles, XCircle } from 'lucide-react';
import { BrandMark } from '@/components/brand/BrandMark';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caracteres'),
    email: z.string().email('Email invalide'),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caracteres')
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
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const prefilledEmail = searchParams.get('email') ?? '';
  const fromTrial = searchParams.get('from') === 'trial';

  const subtitle = useMemo(() => {
    if (fromTrial) {
      return "Votre premier resultat est pret. Creez maintenant votre compte pour le retrouver et poursuivre votre progression.";
    }

    return "Creez votre espace AliTché pour sauvegarder votre profil, vos modules et vos prochaines etapes.";
  }, [fromTrial]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: prefilledEmail,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>
            {result.isExistingAccount
              ? 'Email deja connu. Consultez les options proposees.'
              : 'Compte cree avec succes.'}
          </span>
        </div>
      );

      navigate(
        `/verify-email-sent?email=${encodeURIComponent(data.email)}${
          result.isExistingAccount ? '&existing=1' : ''
        }`
      );
    } catch (err: any) {
      const message = err?.message || "Echec de l'inscription. Veuillez reessayer.";
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

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eff6ff,_#ffffff_45%,_#f8fafc_100%)] px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-primary-800 to-sky-700 p-8 text-white shadow-2xl shadow-slate-900/20 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-3 rounded-3xl bg-white/10 px-4 py-3 backdrop-blur">
                <BrandMark className="h-12 w-12" />
                <div>
                  <p className="text-xl font-semibold">AliTché</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-blue-100/80">
                    Orientation . Formation . Emploi
                  </p>
                </div>
              </div>

              <h1 className="mt-10 text-4xl font-bold leading-tight">
                Donnez une suite a votre elan.
              </h1>
              <p className="mt-4 max-w-md text-lg leading-8 text-blue-50/90">
                Creez votre espace pour conserver vos resultats, reprendre vos modules et ne pas
                repartir de zero a chaque visite.
              </p>
            </div>

            <div className="space-y-4">
              <ValueChip text="Votre profil reste recuperable" />
              <ValueChip text="Vos prochaines etapes sont sauvegardees" />
              <ValueChip text="Votre progression devient suivable dans le temps" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-2xl shadow-slate-200/60 backdrop-blur sm:p-8">
            <button
              type="button"
              onClick={() => navigate(fromTrial ? '/trial' : '/')}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </button>

            <div className="mb-8">
              <div className="mb-4 inline-flex rounded-3xl bg-primary-50 p-3">
                <BrandMark className="h-12 w-12" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Creer mon compte</h2>
              <p className="mt-3 max-w-xl leading-7 text-slate-600">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                  Nom complet
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className={`w-full rounded-2xl border px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-primary-500 ${
                    errors.name ? 'border-red-300' : 'border-slate-200'
                  }`}
                  placeholder="Jean Dupont"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`w-full rounded-2xl border px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-primary-500 ${
                    errors.email ? 'border-red-300' : 'border-slate-200'
                  }`}
                  placeholder="votre.email@exemple.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    type="password"
                    {...register('password')}
                    className={`w-full rounded-2xl border px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-primary-500 ${
                      errors.password ? 'border-red-300' : 'border-slate-200'
                    }`}
                    placeholder="Choisissez un mot de passe"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">
                    Confirmation
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    className={`w-full rounded-2xl border px-4 py-3 transition focus:border-transparent focus:ring-2 focus:ring-primary-500 ${
                      errors.confirmPassword ? 'border-red-300' : 'border-slate-200'
                    }`}
                    placeholder="Retapez le mot de passe"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Minimum 8 caracteres avec au moins une majuscule, une minuscule et un chiffre.
              </div>

              <Button type="submit" disabled={loading} className="w-full rounded-2xl py-3 text-base">
                <LockKeyhole className="mr-2 h-4 w-4" />
                {loading ? 'Creation du compte...' : 'Sauvegarder mon parcours'}
              </Button>
            </form>

            <div className="mt-8 rounded-3xl border border-primary-100 bg-primary-50/70 p-4">
              <p className="text-sm leading-7 text-slate-700">
                Vous avez deja un compte ? La connexion est volontairement separee pour garder ce
                parcours plus simple.
              </p>
              <div className="mt-3">
                <Button onClick={() => navigate('/login')} variant="outline" className="rounded-2xl">
                  Me connecter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ValueChip: React.FC<{ text: string }> = ({ text }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-blue-50">
    <Sparkles className="h-4 w-4" />
    <span>{text}</span>
  </div>
);
