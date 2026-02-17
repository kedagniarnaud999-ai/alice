import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Compass, TrendingUp, Target, Clock } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Compass className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Test d'Orientation Ali Ce
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez votre profil professionnel et recevez un parcours personnalisé adapté à vos talents et objectifs
          </p>
        </div>

        <Card padding="lg" className="mb-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Ce test va vous aider à :
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Feature
                  icon={<Target className="w-6 h-6 text-primary-600" />}
                  title="Identifier vos talents naturels"
                  description="Les compétences que les autres reconnaissent en vous"
                />
                <Feature
                  icon={<TrendingUp className="w-6 h-6 text-primary-600" />}
                  title="Comprendre vos motivations"
                  description="Ce qui vous donne de l'énergie et de l'engagement"
                />
                <Feature
                  icon={<Compass className="w-6 h-6 text-primary-600" />}
                  title="Clarifier votre direction"
                  description="Les domaines et secteurs qui vous correspondent"
                />
                <Feature
                  icon={<Clock className="w-6 h-6 text-primary-600" />}
                  title="Obtenir un plan réaliste"
                  description="Adapté à votre situation et vos contraintes"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                À propos du test
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span><strong>23 questions</strong> rapides et concrètes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span><strong>10-15 minutes</strong> pour compléter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span><strong>Pas de bonnes ou mauvaises réponses</strong>, soyez authentique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span><strong>Résultats immédiats</strong> avec votre profil détaillé</span>
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
            Vos réponses restent confidentielles et sont utilisées uniquement pour générer vos recommandations
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
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};
