import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Compass,
  TrendingUp,
  Target,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle2,
  Globe,
  LogIn,
  Sparkles,
} from 'lucide-react';

interface HomePageProps {
  onStartTest: () => void;
  hasCompletedTest: boolean;
  onViewResults: () => void;
  onLogin: () => void;
  onRegister: () => void;
  isAuthenticated: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartTest,
  hasCompletedTest,
  onViewResults,
  onLogin,
  onRegister,
  isAuthenticated,
}) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_#f8fbff,_#eef5ff_45%,_#fff7ed_100%)]">
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/brand/alitche_logo.png"
              alt="Logo AliTché"
              className="h-12 w-12 rounded-2xl object-cover shadow-lg shadow-primary-200/60 sm:h-14 sm:w-14"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">AliTché</h1>
              <p className="text-xs uppercase tracking-[0.28em] text-primary-700/80">
                Orientation . Formation . Emploi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {hasCompletedTest && (
                  <Button onClick={onViewResults} variant="outline" size="sm">
                    Voir mon tableau de bord
                  </Button>
                )}
                <Button onClick={onStartTest} size="sm">
                  {hasCompletedTest ? 'Refaire le test' : 'Commencer'}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onLogin} variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <LogIn className="mr-2 h-4 w-4" />
                  Connexion
                </Button>
                <Button onClick={onRegister} size="sm">
                  <Sparkles className="mr-2 h-4 w-4" />
                  S'inscrire
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white/80 px-4 py-2 text-sm text-primary-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Une experience plus claire pour trouver sa voie et progresser
            </div>

            <div className="mb-6 flex items-center gap-4">
              <img
                src="/brand/alitche_logo_blue.jpg"
                alt="Signature AliTché"
                className="hidden h-16 rounded-2xl border border-primary-100/60 bg-white object-contain p-2 shadow-md sm:block"
              />
              <div className="rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700">
                Plateforme EdTech d'orientation et de parcours evolutifs
              </div>
            </div>

            <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Orientez mieux votre avenir.
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-sky-500 to-orange-500 bg-clip-text text-transparent">
                Construisez un parcours qui vous ressemble.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
              AliTché aide les etudiants, jeunes diplomes et professionnels a clarifier leur profil,
              visualiser des pistes concretes et suivre leur progression dans le temps.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={isAuthenticated ? onStartTest : onRegister} size="lg" className="sm:px-10">
                {isAuthenticated ? 'Commencer le test' : "S'inscrire et commencer"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={isAuthenticated ? onViewResults : onLogin}
                variant="outline"
                size="lg"
                className="sm:px-10"
              >
                {isAuthenticated ? 'Voir mon espace' : 'Je me connecte'}
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Orientation personnalisee
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Demarrage rapide par magic link
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Suivi de progression
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <Card padding="lg" className="border-0 bg-white/90 shadow-xl shadow-primary-100/40">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-600">Experience recommandee</p>
                  <h3 className="text-2xl font-bold text-gray-900">Parcours accompagne</h3>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-sky-500 p-3 text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-4">
                <FeaturePill text="Test d'orientation structure" />
                <FeaturePill text="Profil interprete et recommandations" />
                <FeaturePill text="Modules suggeres et progression visible" />
              </div>
            </Card>

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard icon={<Users className="h-7 w-7 text-primary-600" />} number="10k+" label="Apprenants vises" />
              <StatCard icon={<Award className="h-7 w-7 text-primary-600" />} number="50+" label="Modules et pistes" />
              <StatCard icon={<Globe className="h-7 w-7 text-primary-600" />} number="Multi" label="Ambition exportable" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/75 px-4 py-16 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">Comment ca marche</h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Une experience simple, rapide et plus actionnable qu'un simple test en ligne.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <ProcessStep
              number="01"
              icon={<Compass className="h-8 w-8 text-primary-600" />}
              title="Clarifiez votre profil"
              description="Un questionnaire guide identifie vos talents, motivations et centres d'interet."
              features={['10 a 15 minutes', 'Questions concretes', 'Resultats exploitables']}
            />
            <ProcessStep
              number="02"
              icon={<Target className="h-8 w-8 text-primary-600" />}
              title="Recevez une lecture utile"
              description="Votre profil est interprete avec des prochaines actions adaptees a votre contexte."
              features={['Profil lisible', 'Priorites claires', 'Plan realiste']}
            />
            <ProcessStep
              number="03"
              icon={<BookOpen className="h-8 w-8 text-primary-600" />}
              title="Progressez dans le temps"
              description="Des quick wins, des modules recommandes et une progression visible au meme endroit."
              features={['Parcours personnalise', 'Progression suivie', 'Evolution continue']}
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">Ce que vous allez decouvrir</h3>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <FeatureCard
              icon={<Compass className="h-6 w-6 text-primary-600" />}
              title="Votre profil d'apprentissage"
              description="Comprenez comment vous apprenez, travaillez et avancez avec le plus d'impact."
              items={["Style d'apprentissage", 'Forces naturelles', 'Mode de progression']}
            />
            <FeatureCard
              icon={<Target className="h-6 w-6 text-primary-600" />}
              title="Vos talents et appuis"
              description="Identifiez les competences et les leviers sur lesquels construire votre progression."
              items={['Talents reconnus', 'Potentiel visible', "Pistes d'evolution"]}
            />
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6 text-primary-600" />}
              title="Vos moteurs"
              description="Mettez au clair ce qui vous engage vraiment et ce qui merite d'etre priorise."
              items={['Motivations cles', 'Valeurs de travail', 'Environnement ideal']}
            />
            <FeatureCard
              icon={<BookOpen className="h-6 w-6 text-primary-600" />}
              title="Un parcours concret"
              description="Passez d'une intuition a un plan plus lisible, plus realiste et plus suivi."
              items={['Actions immediates', 'Modules recommandes', 'Progression suivie']}
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-br from-primary-600 via-sky-600 to-orange-500 px-6 py-12 text-center text-white shadow-2xl shadow-primary-200/40 sm:px-10">
          <h3 className="text-3xl font-bold sm:text-4xl">
            {isAuthenticated
              ? 'Pret a poursuivre votre progression ?'
              : 'Pret a clarifier votre direction professionnelle ?'}
          </h3>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-blue-50">
            {isAuthenticated
              ? 'Retrouvez votre parcours, vos modules et vos prochaines etapes dans un seul espace.'
              : "L'inscription est mise en avant pour les nouveaux arrivants. Les utilisateurs existants peuvent se connecter en un clic."}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              onClick={isAuthenticated ? onStartTest : onRegister}
              size="lg"
              className="bg-white text-primary-700 hover:bg-blue-50"
            >
              {isAuthenticated ? 'Continuer' : "Creer mon compte"}
            </Button>
            <Button
              onClick={isAuthenticated ? onViewResults : onLogin}
              size="lg"
              variant="ghost"
              className="border border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              {isAuthenticated ? 'Voir mon espace' : 'Connexion'}
            </Button>
          </div>
          <p className="mt-4 text-sm text-blue-100">
            Gratuit pour demarrer . Resultats rapides . Experience mobile friendly
          </p>
        </div>
      </section>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, number, label }) => (
  <Card padding="lg" className="border-0 bg-white/90 text-center shadow-lg shadow-primary-100/30">
    <div className="mb-3 flex justify-center">{icon}</div>
    <div className="mb-1 text-2xl font-bold text-gray-900">{number}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </Card>
);

const FeaturePill: React.FC<{ text: string }> = ({ text }) => (
  <div className="inline-flex items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
    <CheckCircle2 className="h-4 w-4 text-green-600" />
    {text}
  </div>
);

interface ProcessStepProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, icon, title, description, features }) => (
  <div className="relative">
    <div className="absolute -left-2 -top-5 text-6xl font-black text-gray-100">{number}</div>
    <Card padding="lg" className="relative z-10 h-full border-0 bg-white shadow-lg shadow-slate-100">
      <div className="mb-4">{icon}</div>
      <h4 className="mb-3 text-xl font-bold text-gray-900">{title}</h4>
      <p className="mb-4 text-gray-600">{description}</p>
      <ul className="space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600" />
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  </div>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, items }) => (
  <Card padding="lg" className="border-0 bg-white shadow-lg shadow-slate-100">
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-50">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="mb-2 text-lg font-bold text-gray-900">{title}</h4>
        <p className="mb-4 text-gray-600">{description}</p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Card>
);
