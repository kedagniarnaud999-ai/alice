import React from 'react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Compass,
  GraduationCap,
  LogIn,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BrandMark } from '@/components/brand/BrandMark';

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
    <div className="min-h-screen overflow-x-hidden bg-[#f5f8fc] text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-slate-950 p-2 shadow-lg shadow-slate-900/10">
              <BrandMark className="h-11 w-11" />
            </div>
            <div>
              <p className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">AliTché</p>
              <p className="text-xs uppercase tracking-[0.24em] text-primary-700/85">
                Orientation . Formation . Emploi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {hasCompletedTest && (
                  <Button onClick={onViewResults} variant="outline" size="sm">
                    Mon espace
                  </Button>
                )}
                <Button onClick={onStartTest} size="sm">
                  {hasCompletedTest ? 'Continuer' : 'Commencer'}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onLogin} variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <LogIn className="mr-2 h-4 w-4" />
                  Connexion
                </Button>
                <Button onClick={onStartTest} size="sm">
                  Découvrir mon profil
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <section className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-4 py-2 text-sm text-primary-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Une expérience claire pour mieux vous situer et mieux avancer
            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Donnez une direction
              <br />
              <span className="bg-gradient-to-r from-primary-700 via-sky-600 to-primary-500 bg-clip-text text-transparent">
                plus nette à votre parcours.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              AliTché aide les étudiants, jeunes diplômés et professionnels à mieux comprendre leur
              profil, à clarifier leurs points d’appui et à identifier des prochaines étapes
              réalistes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={isAuthenticated ? onViewResults : onStartTest} size="lg" className="sm:px-10">
                {isAuthenticated ? 'Ouvrir mon espace' : 'Découvrir mon profil'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {!isAuthenticated && (
                <Button onClick={onLogin} variant="outline" size="lg" className="sm:px-10">
                  Accéder à mon espace
                </Button>
              )}
            </div>

            {!isAuthenticated && (
              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <TrustPill text="Parcours guidé" />
                <TrustPill text="Résultats utiles" />
                <TrustPill text="Progression visible" />
              </div>
            )}
          </div>

          <div className="relative">
            <div className="relative rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-2xl shadow-slate-200/60">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-primary-50 p-2.5">
                    <BrandMark className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-700">Votre point de départ</p>
                    <h2 className="text-xl font-semibold text-slate-900">Un profil lisible, des pistes concrètes</h2>
                  </div>
                </div>
                <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-right text-xs text-slate-500 sm:block">
                  Orientation
                  <br />
                  progression
                  <br />
                  perspective
                </div>
              </div>

              <div className="mb-4 overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-slate-950">
                <img
                  src="/brand/alitche_logo_blue.jpg"
                  alt="Univers visuel AliTché"
                  loading="lazy"
                  className="h-36 w-full object-cover object-center opacity-95 sm:h-40"
                />
              </div>

              <Card padding="md" className="border-0 bg-gradient-to-br from-slate-950 to-primary-700 text-white shadow-lg shadow-slate-900/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-blue-100">Exemple de lecture</p>
                    <h3 className="mt-1 text-2xl font-semibold">Explorateur pragmatique</h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-blue-50/90">
                      Vous avancez mieux quand une idée devient concrète, utile et applicable dans
                      votre réalité.
                    </p>
                  </div>
                  <Target className="mt-1 h-6 w-6 text-sky-300" />
                </div>
              </Card>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <InsightCard
                  icon={<Compass className="h-5 w-5 text-primary-700" />}
                  title="Ce que vous obtenez"
                  lines={[
                    'une lecture plus claire de votre profil',
                    'des repères sur vos talents et vos moteurs',
                    'des pistes adaptées à votre contexte',
                  ]}
                />
                <InsightCard
                  icon={<TrendingUp className="h-5 w-5 text-primary-700" />}
                  title="Ce qui change pour vous"
                  lines={[
                    'moins de flou sur la suite à donner',
                    'plus de cohérence dans vos choix',
                    'un parcours que vous pouvez suivre dans le temps',
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 py-16 md:grid-cols-3">
          <MetricCard
            icon={<Users className="h-5 w-5 text-primary-700" />}
            title="Une lecture plus humaine"
            text="Des formulations simples, concrètes et professionnelles pour mieux comprendre votre situation."
          />
          <MetricCard
            icon={<GraduationCap className="h-5 w-5 text-primary-700" />}
            title="Une orientation utile"
            text="Le parcours relie votre profil, vos motivations et vos prochaines étapes au lieu de rester théorique."
          />
          <MetricCard
            icon={<Briefcase className="h-5 w-5 text-primary-700" />}
            title="Une perspective durable"
            text="Vous pouvez ensuite retrouver vos modules, vos résultats et votre progression dans un même espace."
          />
        </section>

        <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-700">
                Comment ça se passe
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Un parcours simple, lisible et progressif
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Commencez par un diagnostic guidé, obtenez une lecture claire de votre profil puis
                poursuivez avec des recommandations et des modules adaptés.
              </p>
              {!isAuthenticated && (
                <div className="mt-6">
                  <Button onClick={onStartTest} size="lg">
                    Lancer le parcours
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}

              <div className="mt-8 hidden overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100 shadow-sm lg:block">
                <img
                  src="/brand/alitche_logo_blue.jpg"
                  alt="Signature visuelle AliTché"
                  loading="lazy"
                  className="h-40 w-full object-cover object-center"
                />
              </div>
            </div>

            <div className="grid gap-4">
              <JourneyStep
                number="01"
                title="Vous répondez à un parcours guidé"
                description="Quelques minutes pour mieux faire ressortir vos talents, vos intérêts et vos moteurs."
              />
              <JourneyStep
                number="02"
                title="Vous recevez une lecture de votre profil"
                description="Un rendu clair qui vous aide à mieux comprendre ce qui vous correspond vraiment."
              />
              <JourneyStep
                number="03"
                title="Vous poursuivez avec des repères concrets"
                description="Des pistes, des actions et une progression que vous pouvez retrouver ensuite dans votre espace."
              />
            </div>
          </div>
        </section>

        {!isAuthenticated && (
          <section className="pt-12 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary-700">Déjà inscrit</p>
            <h3 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Retrouvez simplement votre espace personnel
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Accédez à votre profil, à vos résultats et à votre progression pour reprendre là où
              vous en étiez.
            </p>
            <div className="mt-6 flex justify-center">
              <Button onClick={onLogin} variant="outline" size="lg">
                Me connecter
              </Button>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white/90">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr_0.85fr] lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-3xl bg-slate-950 p-2">
                <BrandMark className="h-10 w-10" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">AliTché</p>
                <p className="text-xs uppercase tracking-[0.22em] text-primary-700/85">
                  Orientation . Formation . Emploi
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600">
              Une plateforme pensée pour aider chacun à mieux comprendre son profil, orienter ses
              choix et construire un parcours plus cohérent.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Parcours</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Découverte du profil</li>
              <li>Résultats personnalisés</li>
              <li>Modules recommandés</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Accès</h4>
            <div className="mt-4 flex flex-col gap-3">
              {!isAuthenticated ? (
                <>
                  <Button onClick={onStartTest} size="sm">
                    Découvrir mon profil
                  </Button>
                  <Button onClick={onLogin} variant="outline" size="sm">
                    Connexion
                  </Button>
                  <Button onClick={onRegister} variant="outline" size="sm">
                    Créer un compte
                  </Button>
                </>
              ) : (
                <Button onClick={hasCompletedTest ? onViewResults : onStartTest} size="sm">
                  Ouvrir mon espace
                </Button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const TrustPill: React.FC<{ text: string }> = ({ text }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
    <CheckCircle2 className="h-4 w-4 text-primary-600" />
    <span>{text}</span>
  </div>
);

const InsightCard: React.FC<{ icon: React.ReactNode; title: string; lines: string[] }> = ({
  icon,
  title,
  lines,
}) => (
  <Card padding="md" className="border border-slate-200 bg-slate-50/80">
    <div className="mb-3 flex items-center gap-2">
      <div className="rounded-xl bg-primary-50 p-2">{icon}</div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
    </div>
    <ul className="space-y-2 text-sm leading-6 text-slate-600">
      {lines.map((line) => (
        <li key={line} className="flex gap-2">
          <span className="mt-[0.45rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-600" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  </Card>
);

const MetricCard: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <Card padding="lg" className="border-0 bg-white shadow-lg shadow-slate-200/50">
    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
  </Card>
);

const JourneyStep: React.FC<{ number: string; title: string; description: string }> = ({
  number,
  title,
  description,
}) => (
  <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-5">
    <div className="mb-3 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    </div>
    <p className="text-sm leading-7 text-slate-600">{description}</p>
  </div>
);
