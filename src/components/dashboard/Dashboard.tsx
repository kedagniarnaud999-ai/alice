import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProfileResult } from '@/types/test';
import { PersonalizedPathway } from '@/utils/pathwayEngine';
import { 
  Home, 
  Target, 
  BookOpen, 
  User, 
  Settings, 
  LogOut,
  ChevronRight 
} from 'lucide-react';

interface DashboardProps {
  profileResult: ProfileResult;
  pathway: PersonalizedPathway | null;
  onNavigate: (page: 'home' | 'profile' | 'pathway') => void;
  onResetData: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  profileResult, 
  pathway,
  onNavigate,
  onResetData
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    if (showResetConfirm) {
      onResetData();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Tableau de Bord
          </h1>
          <p className="text-lg text-gray-600">
            Gérez votre parcours Ali Ce
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <QuickAccessCard
            icon={<User className="w-6 h-6 text-primary-600" />}
            title="Mon Profil"
            description="Voir mes résultats détaillés"
            onClick={() => onNavigate('profile')}
          />
          <QuickAccessCard
            icon={<BookOpen className="w-6 h-6 text-primary-600" />}
            title="Mon Parcours"
            description="Accéder à mes formations"
            onClick={() => onNavigate('pathway')}
            disabled={!pathway}
          />
          <QuickAccessCard
            icon={<Home className="w-6 h-6 text-primary-600" />}
            title="Accueil"
            description="Retour à la page d'accueil"
            onClick={() => onNavigate('home')}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card padding="lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Votre Profil</h3>
                <p className="text-2xl font-bold text-primary-600">
                  {profileResult.profileType}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {profileResult.profileDescription}
            </p>
            <Button 
              onClick={() => onNavigate('profile')} 
              variant="outline" 
              size="sm"
              className="w-full"
            >
              Voir les détails
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          <Card padding="lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Progression</h3>
                <p className="text-2xl font-bold text-green-600">
                  Débutant
                </p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Parcours complétés</span>
                <span className="font-semibold text-gray-900">0 / 3</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '0%' }}></div>
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
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </div>

        <Card padding="lg">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Paramètres
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Vos Talents</h4>
              <div className="flex flex-wrap gap-2">
                {profileResult.naturalTalents.slice(0, 4).map((talent, index) => (
                  <Badge key={index} variant="primary" size="sm">
                    {talent}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Vos Intérêts</h4>
              <div className="flex flex-wrap gap-2">
                {profileResult.primaryInterests.slice(0, 3).map((interest, index) => (
                  <Badge key={index} variant="accent" size="sm">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button
                onClick={handleReset}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {showResetConfirm ? 'Cliquez à nouveau pour confirmer' : 'Réinitialiser mes données'}
              </Button>
              {showResetConfirm && (
                <p className="text-xs text-red-600 mt-2">
                  Cette action supprimera toutes vos données sauvegardées.
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
  disabled = false
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      text-left p-6 bg-white rounded-xl border-2 border-gray-200 
      transition-all duration-200
      ${disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:border-primary-300 hover:shadow-md cursor-pointer'
      }
    `}
  >
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {!disabled && (
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-3" />
      )}
    </div>
  </button>
);
