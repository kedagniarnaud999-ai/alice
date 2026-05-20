import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TrendingUp, Target, Clock } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 py-12">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-5 inline-flex rounded-[2rem] bg-white p-3 shadow-xl shadow-blue-100/60">
            <img
              src="/brand/alitche_logo.png"
              alt="Logo AliTché"
              className="h-20 w-auto rounded-2xl object-contain sm:h-24"
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Test d'orientation AliTché
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Decouvrez votre profil professionnel et recevez un parcours personnalise adapte a vos
            talents et objectifs.
          </p>
        </div>

        <Card padding="lg" className="mb-6 border-0 shadow-xl shadow-slate-100">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">Ce test va vous aider a :</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Feature
                  icon={<Target className="h-6 w-6 text-primary-600" />}
                  title="Identifier vos talents naturels"
                  description="Les competences que les autres reconnaissent deja en vous."
                />
                <Feature
                  icon={<TrendingUp className="h-6 w-6 text-primary-600" />}
                  title="Comprendre vos motivations"
                  description="Ce qui vous donne de l'energie et vous engage vraiment."
                />
                <Feature
                  icon={<Target className="h-6 w-6 text-primary-600" />}
                  title="Clarifier votre direction"
                  description="Les domaines et types de parcours qui vous correspondent le mieux."
                />
                <Feature
                  icon={<Clock className="h-6 w-6 text-primary-600" />}
                  title="Obtenir un plan realiste"
                  description="Un demarrage concret, adapte a votre situation et vos contraintes."
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="mb-3 font-semibold text-gray-900">A propos du test</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary-600">•</span>
                  <span>
                    <strong>23 questions</strong> rapides et concretes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary-600">•</span>
                  <span>
                    <strong>10 a 15 minutes</strong> pour completer
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary-600">•</span>
                  <span>
                    <strong>Pas de bonnes ou mauvaises reponses</strong>, soyez authentique
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary-600">•</span>
                  <span>
                    <strong>Resultats immediats</strong> avec votre profil detaille
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Button onClick={onStart} size="lg" className="px-12">
            Commencer le test
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            Vos reponses restent confidentielles et servent uniquement a generer des recommandations
            utiles.
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

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="mb-1 font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};
