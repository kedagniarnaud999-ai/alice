import React, { useMemo, useState } from 'react';
import { MODULE_CATALOG, PersonalizedPathway, LearningModule, LearningTrack } from '@/utils/pathwayEngine';
import { UserModuleProgress } from '@/services/module.api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Lock,
  Play,
  Target,
  TrendingUp,
  Unlock,
} from 'lucide-react';

interface PathwayViewProps {
  pathway: PersonalizedPathway;
  moduleProgress: UserModuleProgress[];
  onUpdateModuleProgress: (
    moduleId: string,
    progress: number,
    status?: UserModuleProgress['status']
  ) => Promise<void>;
  onBack: () => void;
}

export const PathwayView: React.FC<PathwayViewProps> = ({
  pathway,
  moduleProgress,
  onUpdateModuleProgress,
  onBack,
}) => {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const progressMap = useMemo(
    () => new Map(moduleProgress.map((item) => [item.moduleId, item])),
    [moduleProgress]
  );

  const selectedProgress = selectedModule ? progressMap.get(selectedModule.id) : undefined;

  if (selectedModule) {
    return (
      <ModuleDetailView
        module={selectedModule}
        progress={selectedProgress}
        onBack={() => setSelectedModule(null)}
        onUpdateModuleProgress={onUpdateModuleProgress}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Button variant="ghost" size="sm" onClick={onBack} className="mb-3 w-fit">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Votre parcours personnalise</h1>
            <p className="mt-2 max-w-2xl text-lg text-gray-600">
              Un chemin d'apprentissage adapte a votre profil {pathway.profileType}
            </p>
          </div>
        </div>

        <Card
          padding="lg"
          className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50"
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-green-700" />
              <CardTitle>Quick wins - Demarrez maintenant</CardTitle>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Ces modules courts vous permettent de progresser rapidement et de prendre confiance.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {pathway.quickWins.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  progress={progressMap.get(module.id)}
                  isQuickWin
                  onOpen={() => setSelectedModule(module)}
                  onUpdateModuleProgress={onUpdateModuleProgress}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Parcours recommandes</h2>
            <p className="text-gray-600">
              Des parcours structures pour developper vos competences progressivement.
            </p>
          </div>

          {pathway.recommendedTracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              progressMap={progressMap}
              onOpenModule={setSelectedModule}
              onUpdateModuleProgress={onUpdateModuleProgress}
            />
          ))}
        </div>


        <Card padding="lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary-600" />
              <CardTitle>Catalogue des formations</CardTitle>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Toutes les formations disponibles restent accessibles, meme si elles ne font pas partie du parcours recommande.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {MODULE_CATALOG.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  progress={progressMap.get(module.id)}
                  onOpen={() => setSelectedModule(module)}
                  onUpdateModuleProgress={onUpdateModuleProgress}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card padding="lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <CardTitle>Objectifs long terme</CardTitle>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Gardez ces objectifs en tete tout au long de votre parcours.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pathway.longTermGoals.map((goal, index) => (
                <div
                  key={goal}
                  className="flex items-start gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 font-semibold text-white">
                    {index + 1}
                  </div>
                  <span className="pt-1 font-medium text-gray-800">{goal}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card padding="lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
              <CardTitle>Jalons de progression</CardTitle>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Suivez votre avancement avec ces etapes cles.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {pathway.milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative">
                  {index < pathway.milestones.length - 1 && (
                    <div className="absolute bottom-0 left-5 top-12 w-0.5 bg-gray-300"></div>
                  )}
                  <div className="flex gap-4">
                    <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-md">
                      {index + 1}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="mb-2 flex items-start justify-between gap-4">
                        <h3 className="font-bold text-gray-900">{milestone.title}</h3>
                        <Badge variant="primary" size="sm">
                          {milestone.timeframe}
                        </Badge>
                      </div>
                      <p className="mb-3 text-gray-600">{milestone.description}</p>
                      <ul className="space-y-1">
                        {milestone.criteria.map((criterion) => (
                          <li key={criterion} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
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
  progress?: UserModuleProgress;
  isQuickWin?: boolean;
  onOpen: () => void;
  onUpdateModuleProgress: (
    moduleId: string,
    progress: number,
    status?: UserModuleProgress['status']
  ) => Promise<void>;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  progress,
  isQuickWin = false,
  onOpen,
  onUpdateModuleProgress,
}) => {
  const currentProgress = progress?.progress ?? 0;
  const isCompleted = progress?.status === 'completed';
  const isStarted = (progress?.status ?? 'not_started') !== 'not_started';

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <Badge variant="primary" size="sm">
          {module.difficulty}
        </Badge>
        {module.isFree ? (
          <Unlock className="h-4 w-4 text-green-600" />
        ) : (
          <Lock className="h-4 w-4 text-gray-400" />
        )}
      </div>

      <button onClick={onOpen} className="w-full text-left">
        <h4 className="mb-2 font-semibold text-gray-900">{module.title}</h4>
        <p className="mb-3 text-sm text-gray-600">{module.description}</p>
      </button>

      <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
        <Clock className="h-4 w-4" />
        <span>{module.duration}</span>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{isCompleted ? 'Termine' : isStarted ? 'En cours' : 'Non commence'}</span>
          <span>{currentProgress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-primary-600 transition-all"
            style={{ width: `${currentProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-2">
        {!isStarted ? (
          <Button
            size="sm"
            className="w-full"
            onClick={async () => {
              await onUpdateModuleProgress(module.id, 10, 'in_progress');
              onOpen();
            }}
          >
            <Play className="mr-1 h-4 w-4" />
            {isQuickWin ? 'Commencer' : 'Demarrer ce module'}
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="w-full" onClick={onOpen}>
            Ouvrir les etapes
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

interface TrackCardProps {
  track: LearningTrack;
  progressMap: Map<string, UserModuleProgress>;
  onOpenModule: (module: LearningModule) => void;
  onUpdateModuleProgress: (
    moduleId: string,
    progress: number,
    status?: UserModuleProgress['status']
  ) => Promise<void>;
}

const TrackCard: React.FC<TrackCardProps> = ({
  track,
  progressMap,
  onOpenModule,
  onUpdateModuleProgress,
}) => {
  const completedCount = track.modules.filter(
    (module) => progressMap.get(module.id)?.status === 'completed'
  ).length;

  return (
    <Card padding="lg">
      <div className="mb-6">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-2 text-xl font-bold text-gray-900">{track.title}</h3>
            <p className="text-gray-600">{track.description}</p>
          </div>
          <Badge variant="primary" size="lg">
            {track.estimatedWeeks} semaines
          </Badge>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {track.targetSkills.slice(0, 6).map((skill) => (
            <Badge key={skill} variant="default" size="sm">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <BookOpen className="h-4 w-4" />
          <span>Modules du parcours ({track.modules.length})</span>
        </div>
        <span className="text-gray-500">
          {completedCount}/{track.modules.length} termines
        </span>
      </div>

      <div className="space-y-3">
        {track.modules.map((module, index) => {
          const progress = progressMap.get(module.id);
          const status = progress?.status ?? 'not_started';

          return (
            <div
              key={module.id}
              className="rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <button onClick={() => onOpenModule(module)} className="min-w-0 flex-1 text-left">
                      <h4 className="mb-1 font-medium text-gray-900">{module.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {module.duration}
                        </span>
                        <span>{module.format}</span>
                      </div>
                    </button>
                    {module.isFree ? (
                      <Badge variant="success" size="sm">
                        Gratuit
                      </Badge>
                    ) : (
                      <Badge variant="warning" size="sm">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs text-gray-500">
                      {status === 'completed'
                        ? 'Termine'
                        : status === 'in_progress'
                          ? `En cours - ${progress?.progress ?? 0}%`
                          : 'Non commence'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {status === 'not_started' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            await onUpdateModuleProgress(module.id, 10, 'in_progress');
                            onOpenModule(module);
                          }}
                        >
                          Demarrer
                        </Button>
                      )}
                      <Button size="sm" onClick={() => onOpenModule(module)}>
                        Voir les etapes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

interface ModuleDetailViewProps {
  module: LearningModule;
  progress?: UserModuleProgress;
  onBack: () => void;
  onUpdateModuleProgress: (
    moduleId: string,
    progress: number,
    status?: UserModuleProgress['status']
  ) => Promise<void>;
}

const ModuleDetailView: React.FC<ModuleDetailViewProps> = ({
  module,
  progress,
  onBack,
  onUpdateModuleProgress,
}) => {
  const currentProgress = progress?.progress ?? 0;
  const steps = [
    `Comprendre les objectifs du module "${module.title}"`,
    `Suivre le contenu principal en format ${module.format.toLowerCase()}`,
    `Pratiquer ou appliquer les notions apprises`,
    `Faire un point sur ce que vous avez retenu et les prochaines actions`,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au parcours
        </Button>

        <Card padding="lg" className="border-0 bg-white shadow-xl shadow-slate-100">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge variant="primary" size="sm">
              {module.difficulty}
            </Badge>
            <Badge variant={module.isFree ? 'success' : 'warning'} size="sm">
              {module.isFree ? 'Gratuit' : 'Premium'}
            </Badge>
            <Badge variant="default" size="sm">
              {module.format}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
          <p className="mt-3 text-lg text-gray-600">{module.description}</p>

          <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
              <span>Progression du module</span>
              <span>{currentProgress}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-gray-200">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-primary-600 to-sky-500 transition-all"
                style={{ width: `${currentProgress}%` }}
              ></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {currentProgress === 0 && (
                <Button onClick={() => onUpdateModuleProgress(module.id, 10, 'in_progress')}>
                  <Play className="mr-2 h-4 w-4" />
                  Demarrer le module
                </Button>
              )}
              {currentProgress > 0 && currentProgress < 100 && (
                <>
                  <Button
                    variant="outline"
                    onClick={() =>
                      onUpdateModuleProgress(module.id, Math.min(currentProgress + 25, 90), 'in_progress')
                    }
                  >
                    Marquer une avancee
                  </Button>
                  <Button onClick={() => onUpdateModuleProgress(module.id, 100, 'completed')}>
                    Terminer le module
                  </Button>
                </>
              )}
              {currentProgress >= 100 && (
                <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Module termine
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card padding="lg" className="border-0 bg-white shadow-xl shadow-slate-100">
          <CardHeader>
            <CardTitle>Etapes conseillees</CardTitle>
            <p className="text-sm text-gray-600">
              Voici une facon simple d'aborder ce module et de garder une progression concrete.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Etape {index + 1}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{step}</p>
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
