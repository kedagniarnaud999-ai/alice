import React from 'react';
import { PersonalizedPathway, LearningModule, LearningTrack } from '@/utils/pathwayEngine';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  CheckCircle2,
  Play,
  Lock,
  Unlock
} from 'lucide-react';

interface PathwayViewProps {
  pathway: PersonalizedPathway;
}

export const PathwayView: React.FC<PathwayViewProps> = ({ pathway }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Votre Parcours Personnalisé
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un chemin d'apprentissage adapté à votre profil {pathway.profileType}
          </p>
        </div>

        <Card padding="lg" className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-green-700" />
              <CardTitle>Quick Wins - Démarrez Maintenant</CardTitle>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Ces modules courts vous permettent de progresser rapidement et de prendre confiance
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {pathway.quickWins.map((module) => (
                <ModuleCard key={module.id} module={module} isQuickWin />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Parcours Recommandés
            </h2>
            <p className="text-gray-600">
              Des parcours structurés pour développer vos compétences progressivement
            </p>
          </div>

          {pathway.recommendedTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>

        <Card padding="lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <CardTitle>Objectifs Long Terme</CardTitle>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Gardez ces objectifs en tête tout au long de votre parcours
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pathway.longTermGoals.map((goal, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-gray-800 font-medium pt-1">{goal}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card padding="lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
              <CardTitle>Jalons de Progression</CardTitle>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Suivez votre avancement avec ces étapes clés
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {pathway.milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative">
                  {index < pathway.milestones.length - 1 && (
                    <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-300"></div>
                  )}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md relative z-10">
                      {index + 1}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-bold text-gray-900">{milestone.title}</h3>
                        <Badge variant="primary" size="sm">
                          {milestone.timeframe}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{milestone.description}</p>
                      <ul className="space-y-1">
                        {milestone.criteria.map((criterion, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            {criterion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface ModuleCardProps {
  module: LearningModule;
  isQuickWin?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, isQuickWin = false }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <Badge variant="primary" size="sm">
          {module.difficulty}
        </Badge>
        {module.isFree ? (
          <Unlock className="w-4 h-4 text-green-600" />
        ) : (
          <Lock className="w-4 h-4 text-gray-400" />
        )}
      </div>
      
      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {module.title}
      </h4>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {module.description}
      </p>
      
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Clock className="w-4 h-4" />
        <span>{module.duration}</span>
      </div>
      
      {isQuickWin && (
        <Button size="sm" className="w-full">
          <Play className="w-4 h-4 mr-1" />
          Commencer
        </Button>
      )}
    </div>
  );
};

interface TrackCardProps {
  track: LearningTrack;
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  return (
    <Card padding="lg">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{track.title}</h3>
            <p className="text-gray-600">{track.description}</p>
          </div>
          <Badge variant="primary" size="lg">
            {track.estimatedWeeks} semaines
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {track.targetSkills.slice(0, 6).map((skill, index) => (
            <Badge key={index} variant="default" size="sm">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Modules du parcours ({track.modules.length})</span>
        </div>
        {track.modules.map((module, index) => (
          <div
            key={module.id}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 mb-1">{module.title}</h4>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {module.duration}
                </span>
                <span>•</span>
                <span>{module.format}</span>
              </div>
            </div>
            {module.isFree ? (
              <Badge variant="success" size="sm">Gratuit</Badge>
            ) : (
              <Badge variant="warning" size="sm">Premium</Badge>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button className="w-full sm:w-auto">
          Commencer ce parcours
        </Button>
      </div>
    </Card>
  );
};
