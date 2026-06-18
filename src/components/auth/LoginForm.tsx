import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ArrowLeft, CheckCircle, KeyRound, ShieldCheck, XCircle } from 'lucide-react';
import { BrandMark } from '@/components/brand/BrandMark';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const callbackError = searchParams.get('error');
  const prefilledEmail = searchParams.get('email') ?? '';
  const fromTrial = searchParams.get('from') === 'trial';

  const helperCopy = useMemo(() => {
    if (fromTrial) {
      return 'Connectez-vous pour retrouver votre profil, vos résultats et la suite de votre progression.';
    }

    return 'Accédez à votre espace pour retrouver votre profil, vos résultats et votre progression.';
  }, [fromTrial]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: prefilledEmail,
      password: '',
    },
  });

  useEffect(() => {
    if (!callbackError) {
      return;
    }

    toast.error(
      <div className="flex items-center gap-2">
        <XCircle className="h-4 w-4" />
        <span>{callbackError}</span>
      </div>
    );
  }, [callbackError]);

  const currentEmail = watch('email');

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      await login(data);
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>Connexion reussie.</span>
        </div>
      );
      navigate('/app');
    } catch (err: any) {
      const message = err?.message || 'Echec de la connexion. Verifiez vos identifiants.';
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
        <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-900/20 lg:flex lg:flex-col lg:justify-between">
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
                Ravi de vous revoir.
              </h1>
              <p className="mt-4 max-w-md text-lg leading-8 text-slate-300">
                Reprenez simplement votre progression, vos modules et les prochaines étapes déjà
                préparées pour vous.
              </p>
            </div>

            <div className="space-y-4">
              <SideNote
                title="Connexion uniquement pour les retours"
                text="Les nouveaux visiteurs commencent d'abord par un essai rapide, sans friction inutile."
              />
              <SideNote
                title="Mot de passe oublie ?"
                text="Vous pouvez reinitialiser votre acces sans refaire tout votre parcours."
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-2xl shadow-slate-200/60 backdrop-blur sm:p-8">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour a l'accueil
            </button>

            <div className="mb-8">
              <div className="mb-4 inline-flex rounded-3xl bg-primary-50 p-3">
                <BrandMark className="h-12 w-12" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Connexion</h2>
              <p className="mt-3 max-w-lg leading-7 text-slate-600">{helperCopy}</p>
            </div>

            {callbackError && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {callbackError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  placeholder="Votre mot de passe"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-primary-600" />
                  Accès sécurisé
                </div>
                <a
                  href={`/forgot-password${currentEmail ? `?email=${encodeURIComponent(currentEmail)}` : ''}`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Mot de passe oublie ?
                </a>
              </div>

              <Button type="submit" disabled={loading} className="w-full rounded-2xl py-3 text-base">
                <KeyRound className="mr-2 h-4 w-4" />
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            <div className="mt-8 rounded-3xl border border-primary-100 bg-primary-50/70 p-4">
              <p className="text-sm leading-7 text-slate-700">
                Première visite ? Commencez par découvrir votre profil, puis créez votre compte si
                vous souhaitez conserver vos résultats.
              </p>
              <div className="mt-3">
                <Button onClick={() => navigate('/trial')} variant="outline" className="rounded-2xl">
                  Découvrir mon profil
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SideNote: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
    <p className="font-medium text-white">{title}</p>
    <p className="mt-2 text-sm leading-7 text-slate-300">{text}</p>
  </div>
);
