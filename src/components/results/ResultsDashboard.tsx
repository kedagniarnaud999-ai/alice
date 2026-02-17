import React from 'react';
import { ProfileResult } from '@/types/test';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ExportMenu } from './ExportMenu';
import { 
  Sparkles, 
  Target, 
  Heart, 
  Compass, 
  MapPin, 
  CheckCircle2,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface ResultsDashboardProps {
  result: ProfileResult;
  onStartPathway: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  onStartPathway,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Votre Profil Ali Ce
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Découvrez qui vous êtes et comment avancer concrètement
          </p>
          <ExportMenu result={result} />
        </div>

        <Card padding="lg" className="bg-gradient-to-br from-primary-50 to-purple-50 border-2 border-primary-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {result.profileType}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {result.profileDescription}
              </p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card padding="lg">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <CardTitle>Vos Talents Naturels</CardTitle>
              </div>
              <p className="text-sm text-gray-600">
                Ce que les autres reconnaissent en vous
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.naturalTalents.map((talent, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800">{talent}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card padding="lg">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-rose-600" />
                <CardTitle>Ce Qui Vous Motive</CardTitle>
              </div>
              <p className="text-sm text-gray-600">
                Vos sources d'énergie et d'engagement
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.motivationDrivers.map((driver, index) => (
                  <Badge key={index} variant="accent" size="md">
                    {driver}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card padding="lg">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-5 h-5 text-blue-600" />
              <CardTitle>Vos Centres d'Intérêt Principaux</CardTitle>
            </div>
            <p className="text-sm text-gray-600">
              Les domaines qui vous attirent naturellement
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {result.primaryInterests.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="font-medium text-gray-900">{interest}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card padding="lg">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <CardTitle>Votre Position Actuelle</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-700" />
                <span className="font-semibold text-purple-900">{result.careerStage}</span>
              </div>
            </CardContent>
          </Card>

          <Card padding="lg">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <CardTitle>Faisabilité</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {result.feasibilityAssessment}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card padding="lg" className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-xl">
              Vos Prochaines Actions
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Par où commencer concrètement
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              {result.nextActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-gray-800 font-medium">{action}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={onStartPathway}
              size="lg"
              className="w-full sm:w-auto group"
            >
              Démarrer Mon Parcours Personnalisé
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>

        <div className="text-center py-6">
          <p className="text-sm text-gray-500">
            Ce profil est un point de départ. Vos talents et intérêts peuvent évoluer avec le temps.
          </p>
        </div>
      </div>
    </div>
  );
};
