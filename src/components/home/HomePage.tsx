import React from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  Flag,
  GraduationCap,
  Hub,
  Lightbulb,
  LogIn,
  Rocket,
  Share2,
  Sparkles,
  TrendingUp,
  UserSearch,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BrandMark } from '@/components/brand/BrandMark';

interface HomePageProps {
  onStartTest: () => void;
  hasCompletedTest: boolean;
  onViewResults: () => void;
  onLogin: () => void;
  onRegister: () => void;
  isAuthenticated: boolean;
}

const heroImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDXqg6UpKNqnoxQKXilU_arF5PeiOJV5ojJGacWIXTJ_6kzi7Xmwj33JryAEahNmrDRlhW66-JbDlorKgXroGCaghwGg-rAXmHgRraTXn1bq-yAsCLpOTAQ22ZxyqLuLp2SSIO0_bKHPjtVXtw93j8yVoe8O6MBLauTt0lHqw23EtKu1vhxhJ0QScjOQ-g0SHQoxwa-H_LNYbUvp-Ldu5bVbr6AV_Wqh2XEwLemynCfZ0-vgE1BWIaCwPkFi_ChN3IVZlcqslXCQ2Y';

export const HomePage: React.FC<HomePageProps> = ({
  onStartTest,
  hasCompletedTest,
  onViewResults,
  onLogin,
  onRegister,
  isAuthenticated,
}) => {
  const primaryAction = isAuthenticated && hasCompletedTest ? onViewResults : onStartTest;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f9fb] text-[#191c1e]">
      <header className="fixed top-0 z-50 h-20 w-full bg-[#f7f9fb]/75 shadow-sm shadow-primary-900/5 backdrop-blur-md">
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-12">
          <button type="button" onClick={onStartTest} className="flex items-center gap-4 text-left">
            <BrandMark className="h-12 w-12" />
            <span className="hidden text-2xl font-bold text-[#004494] md:block">AliTché</span>
          </button>

          <div className="hidden items-center gap-6 md:flex">
            <button type="button" className="border-b-2 border-[#40c2fd] px-2 py-1 font-semibold text-[#004494]">
              Orientation
            </button>
            <button type="button" className="text-[#424752] transition-colors hover:text-[#004494]">
              Métiers
            </button>
            <button type="button" className="text-[#424752] transition-colors hover:text-[#004494]">
              Écoles
            </button>
            <button type="button" className="text-[#424752] transition-colors hover:text-[#004494]">
              Mentors
            </button>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {hasCompletedTest && (
                  <Button onClick={onViewResults} variant="outline" size="sm" className="hidden rounded-full sm:inline-flex">
                    Mon espace
                  </Button>
                )}
                <Button onClick={onStartTest} size="sm" className="rounded-full px-6">
                  {hasCompletedTest ? 'Continuer' : 'Commencer'}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onLogin} variant="ghost" size="sm" className="hidden rounded-full text-[#004494] sm:inline-flex">
                  <LogIn className="mr-2 h-4 w-4" />
                  Connexion
                </Button>
                <Button onClick={onRegister} size="sm" className="rounded-full bg-[#004494] px-6 hover:bg-[#003879]">
                  Inscription
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="pt-20">
        <section className="bg-[linear-gradient(135deg,#f7f9fb_0%,rgba(216,226,255,0.45)_100%)]">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 sm:px-6 lg:grid-cols-2 lg:px-12 lg:py-24">
            <div className="text-center lg:text-left">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#e0e3e5] px-4 py-2 text-sm font-semibold text-[#004494]">
                <Compass className="h-4 w-4" />
                Une expérience claire pour mieux vous situer
              </div>

              <h1 className="mb-5 text-4xl font-bold leading-tight text-[#004494] sm:text-5xl lg:text-[48px] lg:leading-[56px]">
                Donnez une direction <span className="text-[#40c2fd]">plus nette</span> à votre parcours.
              </h1>

              <p className="mx-auto mb-8 max-w-xl text-lg leading-8 text-[#424752] lg:mx-0">
                AliTché aide les étudiants, jeunes diplômés et professionnels à mieux comprendre leur profil, à clarifier leurs points d'appui et à identifier des prochaines étapes réalistes.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Button onClick={primaryAction} size="lg" className="rounded-full bg-[#004494] px-8 shadow-lg shadow-primary-900/20 hover:bg-[#003879]">
                  {isAuthenticated && hasCompletedTest ? 'Ouvrir mon espace' : 'Découvrir mon profil'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button onClick={isAuthenticated ? onViewResults : onLogin} variant="outline" size="lg" className="rounded-full border-[#004494] px-8 text-[#004494] hover:bg-[#f5f8fc]">
                  Accéder à mon espace
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[#424752] lg:justify-start">
                <TrustPill text="Parcours guidé" />
                <TrustPill text="Résultats utiles" />
                <TrustPill text="Progression visible" />
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-xl border-4 border-white/70 shadow-2xl">
                <img src={heroImage} alt="Groupe d'étudiants" className="aspect-[4/3] h-auto w-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 hidden max-w-[240px] rounded-xl border border-[#c2c6d4] bg-white p-4 shadow-xl md:block">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#40c2fd]/20">
                    <TrendingUp className="h-5 w-5 text-[#00668a]" />
                  </div>
                  <span className="font-semibold text-slate-900">Progression</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#eceef0]">
                  <div className="h-full w-3/4 bg-[#40c2fd]" />
                </div>
                <p className="mt-2 text-sm text-[#424752]">Votre lecture de profil est prête à 75%.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f9fb] py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[#004494]">Une approche centrée sur l'humain</h2>
              <div className="mx-auto h-1 w-20 rounded-full bg-[#40c2fd]" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <FeatureCard
                icon={<UserSearch className="h-8 w-8" />}
                title="Une lecture plus humaine"
                text="Des formulations simples, concrètes et professionnelles pour mieux comprendre votre situation actuelle et vos besoins."
              />
              <FeatureCard
                icon={<GraduationCap className="h-8 w-8" />}
                title="Une orientation utile"
                text="Le parcours relie votre profil, vos motivations et vos prochaines étapes au lieu de rester dans des concepts purement théoriques."
              />
              <FeatureCard
                icon={<BriefcaseBusiness className="h-8 w-8" />}
                title="Une perspective durable"
                text="Vous pouvez ensuite retrouver vos modules, vos résultats et votre progression dans un même espace personnel sécurisé."
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00668a]">Comment ça se passe</p>
              <h2 className="mb-8 mt-2 text-3xl font-bold text-[#004494]">Un parcours simple, lisible et progressif</h2>
              <p className="mb-8 text-lg leading-8 text-[#424752]">
                Commencez par un diagnostic guidé, obtenez une lecture claire de votre profil puis poursuivez avec des recommandations et des modules adaptés.
              </p>
              <Button onClick={onStartTest} size="lg" className="rounded-full bg-[#004494] px-8 hover:bg-[#003879]">
                Lancer le parcours
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative space-y-8">
              <div className="absolute bottom-10 left-8 top-10 w-0.5 bg-[#004494]/10" />
              <JourneyStep
                icon={<Lightbulb className="h-6 w-6 text-[#004494]" />}
                number="01"
                title="Vous répondez à un parcours guidé"
                description="Quelques minutes pour mieux faire ressortir vos talents, vos intérêts et vos moteurs."
              />
              <JourneyStep
                icon={<Sparkles className="h-6 w-6 text-[#004494]" />}
                number="02"
                title="Vous recevez une lecture de votre profil"
                description="Un rendu clair qui vous aide à mieux comprendre ce qui vous correspond vraiment."
              />
              <JourneyStep
                icon={<Flag className="h-6 w-6 text-[#004494]" />}
                number="03"
                title="Vous poursuivez avec des repères concrets"
                description="Des pistes, des actions et une progression que vous pouvez retrouver ensuite dans votre espace."
              />
            </div>
          </div>
        </section>

        {!isAuthenticated && (
          <section className="bg-[#004494] py-24 text-white">
            <div className="mx-auto max-w-7xl px-5 text-center sm:px-6 lg:px-12">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#40c2fd]">Déjà inscrit ?</p>
              <h2 className="mb-8 mt-2 text-4xl font-bold sm:text-5xl">Retrouvez simplement votre espace personnel</h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-[#c9d9ff]">
                Accédez à votre profil, à vos résultats et à votre progression pour reprendre là où vous en étiez.
              </p>
              <Button onClick={onLogin} variant="secondary" size="lg" className="rounded-full bg-white px-12 text-[#004494] hover:bg-[#d8e2ff]">
                Me connecter
              </Button>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-[#c2c6d4]/30 bg-[#f2f4f6] pb-8 pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
          <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <BrandMark className="h-12 w-12" />
                <span className="text-2xl font-bold text-[#004494]">AliTché</span>
              </div>
              <p className="text-[#424752]">Donnez une direction plus nette à votre parcours.</p>
              <div className="flex gap-4">
                <FooterIcon label="Communauté" icon={<Hub className="h-5 w-5" />} />
                <FooterIcon label="Partager" icon={<Share2 className="h-5 w-5" />} />
              </div>
            </div>

            <FooterLinks title="Plateforme" links={['Orientation', 'Métiers', 'Écoles', 'Mentors']} />
            <FooterLinks title="Support" links={["Centre d'aide", 'Contact', 'FAQ']} />
            <FooterLinks title="Légal" links={['Mentions légales', 'Confidentialité', 'CGU']} />
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-[#c2c6d4]/30 pt-8 text-sm text-[#424752] md:flex-row">
            <p className="opacity-70">© 2026 AliTché. Tous droits réservés.</p>
            <span>Français</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const TrustPill: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-flex items-center gap-1">
    <CheckCircle2 className="h-5 w-5 fill-emerald-500 text-emerald-500" />
    {text}
  </span>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <article className="rounded-xl border border-[#c2c6d4] bg-white p-8 transition duration-200 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-900/10">
    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-xl bg-[#1f5cb6]/10 text-[#004494]">
      {icon}
    </div>
    <h3 className="mb-4 text-2xl font-semibold text-[#004494]">{title}</h3>
    <p className="leading-7 text-[#424752]">{text}</p>
  </article>
);

const JourneyStep: React.FC<{
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
}> = ({ icon, number, title, description }) => (
  <div className="relative z-10 flex gap-8">
    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-[#c2c6d4] bg-white shadow-lg">
      {icon}
    </div>
    <div className="pt-2">
      <span className="rounded-full bg-[#1f5cb6]/10 px-3 py-1 text-xs font-bold text-[#004494]">ÉTAPE {number}</span>
      <h3 className="mt-2 text-2xl font-semibold text-[#004494]">{title}</h3>
      <p className="mt-2 leading-7 text-[#424752]">{description}</p>
    </div>
  </div>
);

const FooterIcon: React.FC<{ label: string; icon: React.ReactNode }> = ({ label, icon }) => (
  <button
    type="button"
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c2c6d4]/40 bg-white text-[#004494] shadow-sm transition hover:bg-[#004494] hover:text-white"
  >
    {icon}
  </button>
);

const FooterLinks: React.FC<{ title: string; links: string[] }> = ({ title, links }) => (
  <div>
    <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-[#004494]">{title}</h2>
    <ul className="space-y-4 text-[#424752]">
      {links.map((link) => (
        <li key={link}>
          <button type="button" className="transition-colors hover:text-[#004494]">
            {link}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
