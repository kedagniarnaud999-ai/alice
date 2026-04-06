import React, { useEffect, useState } from 'react';
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
  TrendingUp,
  Loader2,
} from 'lucide-react';
import { profileService } from '@/services/profile.api';
import { storageManager } from '@/utils/storageManager';

interface ResultsDashboardProps {
  result?: ProfileResult;
  onStartPathway: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result: initialResult,
  onStartPathway,
}) => {
  const [profileResult, setProfileResult] = useState<ProfileResult | null>(initialResult || null);
  const [isLoading, setIsLoading] = useState(!initialResult);

  useEffect(() => {
    const loadProfile = async () => {
      if (initialResult) {
        setProfileResult(initialResult);
        setIsLoading(false);
        return;
      }

      try {
        const remoteProfile = await profileService.getMyProfile();
        setProfileResult(remoteProfile);
        storageManager.saveProfileResult(remoteProfile);
      } catch (error) {
        console.error('Erreur chargement profil distant, fallback local:', error);
        const localProfile = storageManager.loadProfileResult();
        if (localProfile) {
          setProfileResult(localProfile);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [initialResult]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary-600" />
          <p className="text-gray-600">Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  if (!profileResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <p className="mb-4 text-gray-600">Aucun profil trouvé</p>
          <Button onClick={onStartPathway}>Commencer le test</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-purple-600 shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">Votre Profil Ali Ce</h1>
          <p className="mb-4 text-lg text-gray-600">
            Découvrez qui vous êtes et comment avancer concrètement
          </p>
          <ExportMenu result={profileResult} />
        </div>

        <Card padding="lg" className="border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-purple-50">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">{profileResult.profileType}</h2>
              <p className="leading-relaxed text-gray-700">{profileResult.profileDescription}</p>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card padding="lg">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-600" />
                <CardTitle>Vos Talents Naturels</CardTitle>
              </div>
              <p className="text-sm text-gray-600">Ce que les autres reconnaissent en vous</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profileResult.naturalTalents.map((talent, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-gray-800">{talent}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card padding="lg">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-600" />
                <CardTitle>Ce Qui Vous Motive</CardTitle>
              </div>
              <p className="text-sm text-gray-600">Vos sources d'énergie et d'engagement</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileResult.motivationDrivers.map((driver, index) => (
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
            <div className="mb-2 flex items-center gap-2">
              <Compass className="h-5 w-5 text-blue-600" />
              <CardTitle>Vos Centres d'Intérêt Principaux</CardTitle>
            </div>
            <p className="text-sm text-gray-600">Les domaines qui vous attirent naturellement</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {profileResult.primaryInterests.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3"
                >
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  <span className="font-medium text-gray-900">{interest}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card padding="lg">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <CardTitle>Votre Position Actuelle</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="inline-flex items-center gap-2 rounded-lg border border-purple-300 bg-purple-100 px-4 py-2">
                <TrendingUp className="h-5 w-5 text-purple-700" />
                <span className="font-semibold text-purple-900">{profileResult.careerStage}</span>
              </div>
            </CardContent>
          </Card>

          <Card padding="lg">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <CardTitle>Faisabilité</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-gray-700">{profileResult.feasibilityAssessment}</p>
            </CardContent>
          </Card>
        </div>

        <Card padding="lg" className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-xl">Vos Prochaines Actions</CardTitle>
            <p className="mt-1 text-sm text-gray-600">Par où commencer concrètement</p>
          </CardHeader>
          <CardContent>
            <div className="mb-6 space-y-3">
              {profileResult.nextActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-green-200 bg-white p-3"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-800">{action}</span>
                </div>
              ))}
            </div>

            <Button onClick={onStartPathway} size="lg" className="group w-full sm:w-auto">
              Démarrer Mon Parcours Personnalisé
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>

        <div className="py-6 text-center">
          <p className="text-sm text-gray-500">
            Ce profil est un point de départ. Vos talents et intérêts peuvent évoluer avec le temps.
          </p>
        </div>
      </div>
    </div>
  );
};
