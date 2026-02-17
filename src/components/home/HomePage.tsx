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
  Globe
} from 'lucide-react';

interface HomePageProps {
  onStartTest: () => void;
  hasCompletedTest: boolean;
  onViewResults: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onStartTest, 
  hasCompletedTest,
  onViewResults 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Ali Ce</h1>
                <p className="text-xs text-gray-600">Orientation & Career Development</p>
              </div>
            </div>
            {hasCompletedTest && (
              <Button onClick={onViewResults} variant="outline" size="sm">
                Voir mes résultats
              </Button>
            )}
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Trouvez Votre Voie
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Construisez Votre Carrière
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Une plateforme d'orientation professionnelle conçue pour les jeunes et professionnels d'Afrique. 
              Découvrez vos talents, clarifiez vos objectifs, et accédez à un parcours personnalisé.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={onStartTest} size="lg" className="px-8">
                {hasCompletedTest ? 'Refaire le test' : 'Commencer le test gratuit'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                En savoir plus
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <StatCard
              icon={<Users className="w-8 h-8 text-primary-600" />}
              number="10,000+"
              label="Utilisateurs actifs"
            />
            <StatCard
              icon={<Award className="w-8 h-8 text-primary-600" />}
              number="50+"
              label="Parcours de formation"
            />
            <StatCard
              icon={<Globe className="w-8 h-8 text-primary-600" />}
              number="15+"
              label="Pays en Afrique"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un processus simple en 3 étapes pour transformer votre carrière
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ProcessStep
              number="01"
              icon={<Compass className="w-8 h-8 text-primary-600" />}
              title="Test d'Orientation"
              description="23 questions pour identifier votre profil cognitif, vos talents naturels, motivations et centres d'intérêt"
              features={[
                '10-15 minutes',
                'Aucune bonne réponse',
                'Résultats immédiats'
              ]}
            />
            <ProcessStep
              number="02"
              icon={<Target className="w-8 h-8 text-primary-600" />}
              title="Profil Personnalisé"
              description="Découvrez votre profil détaillé avec des recommandations adaptées à votre situation réelle"
              features={[
                'Talents identifiés',
                'Motivations clés',
                'Plan réaliste'
              ]}
            />
            <ProcessStep
              number="03"
              icon={<TrendingUp className="w-8 h-8 text-primary-600" />}
              title="Parcours d'Apprentissage"
              description="Accédez à des modules, formations et ressources adaptés à vos objectifs de carrière"
              features={[
                'Quick Wins gratuits',
                'Parcours structurés',
                'Suivi de progression'
              ]}
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que vous allez découvrir
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<Compass className="w-6 h-6 text-primary-600" />}
              title="Votre Profil Cognitif"
              description="Comprenez comment vous apprenez, travaillez et résolvez des problèmes"
              items={[
                'Style d\'apprentissage',
                'Approche de résolution',
                'Organisation personnelle'
              ]}
            />
            <FeatureCard
              icon={<Target className="w-6 h-6 text-primary-600" />}
              title="Vos Talents Naturels"
              description="Identifiez les compétences pour lesquelles les autres vous sollicitent"
              items={[
                'Compétences reconnues',
                'Points forts naturels',
                'Potentiel de développement'
              ]}
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6 text-primary-600" />}
              title="Vos Motivations"
              description="Découvrez ce qui vous donne de l\'énergie et vous engage vraiment"
              items={[
                'Sources d\'énergie',
                'Valeurs professionnelles',
                'Environnement idéal'
              ]}
            />
            <FeatureCard
              icon={<BookOpen className="w-6 h-6 text-primary-600" />}
              title="Votre Parcours Réaliste"
              description="Un plan adapté à vos contraintes de temps et ressources"
              items={[
                'Objectifs atteignables',
                'Ressources accessibles',
                'Étapes concrètes'
              ]}
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à clarifier votre direction professionnelle ?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez des milliers de jeunes professionnels qui ont déjà trouvé leur voie avec Ali Ce
          </p>
          <Button 
            onClick={onStartTest} 
            size="lg" 
            className="bg-white text-primary-600 hover:bg-gray-100 px-12"
          >
            Commencer Maintenant
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="mt-4 text-sm text-blue-100">
            Gratuit • 10-15 minutes • Résultats immédiats
          </p>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">Ali Ce</span>
              </div>
              <p className="text-sm text-gray-400">
                Plateforme d'orientation et développement de carrière pour l'Afrique francophone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Plateforme</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Test d'orientation</a></li>
                <li><a href="#" className="hover:text-white">Parcours</a></li>
                <li><a href="#" className="hover:text-white">Ressources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">À propos</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white">Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2026 Ali Ce. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, number, label }) => (
  <Card padding="lg" className="text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <div className="text-3xl font-bold text-gray-900 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </Card>
);

interface ProcessStepProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ProcessStep: React.FC<ProcessStepProps> = ({ 
  number, 
  icon, 
  title, 
  description, 
  features 
}) => (
  <div className="relative">
    <div className="absolute -top-4 -left-4 text-6xl font-bold text-gray-100">
      {number}
    </div>
    <Card padding="lg" className="relative z-10 h-full">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
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

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  items 
}) => (
  <Card padding="lg">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Card>
);
