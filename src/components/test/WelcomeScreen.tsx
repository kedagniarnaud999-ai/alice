import React from 'react';
import { Clock, Lock, Sparkles, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BrandMark } from '@/components/brand/BrandMark';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#edf6ff,_#ffffff_40%,_#f8fafc_100%)] px-4 py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex rounded-[2rem] bg-slate-950 p-3 shadow-xl shadow-slate-900/10">
            <BrandMark className="h-16 w-16" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Découvrez votre profil avec AliTché
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl leading-8 text-slate-600">
            Quelques minutes suffisent pour faire émerger vos talents, vos moteurs et les pistes
            qui vous correspondent le mieux.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card padding="lg" className="border-0 bg-white shadow-xl shadow-slate-200/40">
            <h2 className="mb-5 text-2xl font-semibold text-slate-900">Ce parcours va vous aider à :</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Feature
                icon={<Target className="h-6 w-6 text-primary-700" />}
                title="Repérer vos appuis"
                description="Les talents et les appuis sur lesquels vous pouvez deja construire."
              />
              <Feature
                icon={<TrendingUp className="h-6 w-6 text-primary-700" />}
                title="Mieux lire vos moteurs"
                description="Ce qui vous donne de l'energie et rend un parcours durable."
              />
              <Feature
                icon={<Sparkles className="h-6 w-6 text-primary-700" />}
                title="Clarifier la prochaine étape"
                description="Une lecture plus concrète que de simples impressions sur soi."
              />
              <Feature
                icon={<Clock className="h-6 w-6 text-primary-700" />}
                title="Obtenir un résultat rapide"
                description="Environ 10 à 15 minutes, avec un rendu immédiat à la fin."
              />
            </div>
          </Card>

          <Card padding="lg" className="border border-primary-100 bg-gradient-to-br from-primary-50 to-sky-50 shadow-xl shadow-slate-200/40">
            <h3 className="text-xl font-semibold text-slate-900">Avant de commencer</h3>
            <ul className="mt-5 space-y-4 text-slate-700">
              <Checklist text="23 questions rapides et concrètes" />
              <Checklist text="Aucune bonne ou mauvaise réponse, restez simplement honnête" />
              <Checklist text="Un résultat personnalisé à la fin du parcours" />
              <Checklist text="La possibilité de poursuivre ensuite avec votre espace personnel" />
            </ul>

            <div className="mt-8 rounded-3xl border border-white/70 bg-white/80 p-4 text-sm leading-7 text-slate-600">
              <div className="mb-2 inline-flex items-center gap-2 font-medium text-slate-900">
                <Lock className="h-4 w-4 text-primary-700" />
                Ce que vous allez en retirer
              </div>
              <p>
                Un point de départ plus clair pour comprendre votre profil et engager la suite avec
                davantage de cohérence.
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <Button onClick={onStart} size="lg" className="px-12">
            Commencer le parcours
          </Button>
          <p className="mt-4 text-sm text-slate-500">
            À l’issue du parcours, vous pourrez sauvegarder vos résultats et poursuivre votre
            progression.
          </p>
        </div>
      </div>
    </div>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="mb-1 font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-6 text-slate-600">{description}</p>
    </div>
  </div>
);

const Checklist: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-3">
    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-600" />
    <span>{text}</span>
  </li>
);
