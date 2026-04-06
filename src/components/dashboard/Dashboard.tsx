import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProfileResult } from '@/types/test';
import { PersonalizedPathway } from '@/utils/pathwayEngine';
import { UserModuleProgress } from '@/services/module.api';
import {
  Home,
  Target,
  BookOpen,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { profileService } from '@/services/profile.api';
import { storageManager } from '@/utils/storageManager';

interface DashboardProps {
  profileResult?: ProfileResult;
  pathway: PersonalizedPathway | null;
  moduleProgress: UserModuleProgress[];
  onNavigate: (page: 'home' | 'profile' | 'pathway') => void;
  onResetData: () => void | Promise<void>;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profileResult: initialProfileResult,
  pathway,
  moduleProgress,
  onNavigate,
  onResetData,
}) => {
  const [profileResult, setProfileResult] = useState<ProfileResult | null>(initialProfileResult || null);
  const [isLoading, setIsLoading] = useState(!initialProfileResult);
  const [isResetting, setIsResetting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (initialProfileResult) {
        setProfileResult(initialProfileResult);
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
  }, [initialProfileResult]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary-600" />
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  if (!profileResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <p className="mb-4 text-gray-600">Aucun profil trouve</p>
          <Button onClick={() => onNavigate('home')}>Commencer le test</Button>
        </div>
      </div>
    );
  }

  const handleReset = async () => {
    if (!showResetConfirm) {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 3000);
      return;
    }

    setIsResetting(true);
    try {
      await onResetData();
      setShowResetConfirm(false);
    } finally {
      setIsResetting(false);
    }
  };

  const uniqueModuleIds = pathway
    ? new Set([
        ...pathway.quickWins.map((item) => item.id),
        ...pathway.recommendedTracks.flatMap((track) => track.modules.map((item) => item.id)),
      ])
    : new Set<string>();
  const totalModules = uniqueModuleIds.size;
  const completedModules = moduleProgress.filter((item) => item.status === 'completed').length;
  const progressPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">Tableau de bord</h1>
          <p className="text-lg text-gray-600">Gerez votre parcours Ali Ce</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <QuickAccessCard
            icon={<User className="h-6 w-6 text-primary-600" />}
            title="Mon profil"
            description="Voir mes resultats detailles"
            onClick={() => onNavigate('profile')}
          />
          <QuickAccessCard
            icon={<BookOpen className="h-6 w-6 text-primary-600" />}
            title="Mon parcours"
            description="Acceder a mes formations"
            onClick={() => onNavigate('pathway')}
            disabled={!pathway}
          />
          <QuickAccessCard
            icon={<Home className="h-6 w-6 text-primary-600" />}
            title="Accueil"
            description="Retour a la page d'accueil"
            onClick={() => onNavigate('home')}
          />
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <Card padding="lg">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                <Target className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="mb-1 font-bold text-gray-900">Votre profil</h3>
                <p className="text-2xl font-bold text-primary-600">{profileResult.profileType}</p>
              </div>
            </div>
            <p className="mb-4 text-sm text-gray-600">{profileResult.profileDescription}</p>
            <Button
              onClick={() => onNavigate('profile')}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Voir les details
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>

          <Card padding="lg">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="mb-1 font-bold text-gray-900">Progression du parcours</h3>
                <p className="text-2xl font-bold text-green-600">
                  {pathway ? `${pathway.recommendedTracks.length} piste(s)` : 'A generer'}
                </p>
              </div>
            </div>
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Modules termines</span>
                <span className="font-semibold text-gray-900">
                  {completedModules}/{totalModules}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-600 transition-all"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Quick wins: {pathway?.quickWins.length ?? 0}</span>
                <span>{progressPercent}% du parcours suivi</span>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('pathway')}
              variant="outline"
              size="sm"
              className="w-full"
              disabled={!pathway}
            >
              Continuer mon parcours
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>

        <Card padding="lg">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-900">
            <Settings className="h-5 w-5" />
            Parametres
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Vos talents</h4>
              <div className="flex flex-wrap gap-2">
                {profileResult.naturalTalents.slice(0, 4).map((talent, index) => (
                  <Badge key={index} variant="primary" size="sm">
                    {talent}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Vos interets</h4>
              <div className="flex flex-wrap gap-2">
                {profileResult.primaryInterests.slice(0, 3).map((interest, index) => (
                  <Badge key={index} variant="accent" size="sm">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="border-t pt-4">
              <Button
                onClick={handleReset}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:bg-red-50"
                disabled={isResetting}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isResetting
                  ? 'Reinitialisation...'
                  : showResetConfirm
                    ? 'Cliquez a nouveau pour confirmer'
                    : 'Reinitialiser mes donnees'}
              </Button>
              {showResetConfirm && (
                <p className="mt-2 text-xs text-red-600">
                  Cette action supprimera vos reponses, votre profil et votre progression sauvegardes.
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

interface QuickAccessCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  icon,
  title,
  description,
  onClick,
  disabled = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      rounded-xl border-2 border-gray-200 bg-white p-6 text-left transition-all duration-200
      ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-primary-300 hover:shadow-md'}
    `}
  >
    <div className="flex items-start gap-3">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {!disabled && <ChevronRight className="mt-3 h-5 w-5 flex-shrink-0 text-gray-400" />}
    </div>
  </button>
);
