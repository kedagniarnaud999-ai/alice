import { lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HomePage } from '@/components/home/HomePage';
import { WelcomeScreen } from '@/components/test/WelcomeScreen';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Screen } from '@/components/ui/Screen';
import { useAuth } from '@/contexts/AuthContext';
import { pathwayEngine, PersonalizedPathway } from '@/utils/pathwayEngine';
import { CrossOccupation, OCCUPATIONS_BY_ID } from '@/data/occupations';
import { focusFromOccupation, focusFromResult } from '@/utils/domainFocus';
import type { FunctionChoice } from '@/utils/functionFocus';
import { withFunctionChoice } from '@/utils/targetingChoice';
import { resolveFocus } from '@/utils/focusSelection';
import { storageManager } from '@/utils/storageManager';
import { DEFAULT_ADJUSTMENTS } from '@/utils/pathwayEditing';
import { loadStoredProfile } from '@/utils/storedProfile';
import { profileService } from '@/services/profile.api';
import { moduleService, UserModuleProgress } from '@/services/module.api';
import { FunctionalDomainId, PathwayAdjustments, ProfileResult, Targeting, TestResponse } from '@/types/test';

const TestFlow = lazy(() => import('@/components/test/TestFlow').then((m) => ({ default: m.TestFlow })));
const ResultsDashboard = lazy(() =>
  import('@/components/results/ResultsDashboard').then((m) => ({ default: m.ResultsDashboard }))
);
const DomainDetail = lazy(() =>
  import('@/components/results/DomainDetail').then((m) => ({ default: m.DomainDetail }))
);
const FocusFlow = lazy(() => import('@/components/focus/FocusFlow').then((m) => ({ default: m.FocusFlow })));
const PathwayView = lazy(() =>
  import('@/components/pathway/PathwayView').then((m) => ({ default: m.PathwayView }))
);
const Dashboard = lazy(() => import('@/components/dashboard/Dashboard').then((m) => ({ default: m.Dashboard })));
const ProfileSettings = lazy(() =>
  import('@/pages/ProfileSettings').then((m) => ({ default: m.ProfileSettings }))
);

type AppState =
  | 'home'
  | 'welcome'
  | 'test'
  | 'loading'
  | 'results'
  | 'domain'
  | 'focus'
  | 'pathway'
  | 'dashboard'
  | 'profile';

/**
 * L'espace de travail : le test, le profil, la direction choisie et le parcours.
 * Il emporte avec lui les catalogues dont il a besoin — fiches de métiers,
 * modules, spécialités, postes nommés — qui ne chargent donc plus avec la page
 * d'accueil.
 */
const WorkspaceApp = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [appState, setAppState] = useState<AppState>('home');
  const [profileResult, setProfileResult] = useState<ProfileResult | null>(null);
  const [openDomainId, setOpenDomainId] = useState<FunctionalDomainId | null>(null);
  const [focusDraft, setFocusDraft] = useState<Targeting | null>(null);
  /** L'étape d'engagement s'ouvre depuis deux écrans : le retour doit rendre l'autre. */
  const [focusReturn, setFocusReturn] = useState<AppState>('domain');
  const [pathway, setPathway] = useState<PersonalizedPathway | null>(null);
  const [moduleProgress, setModuleProgress] = useState<UserModuleProgress[]>([]);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const hydrateApp = async () => {
      const savedResult = loadStoredProfile();
      const savedPathway = storageManager.loadPathway();
      const savedProgress = storageManager.loadModuleProgress();

      if (savedResult && isMounted) {
        setProfileResult(savedResult);
      }

      if (savedPathway && isMounted) {
        setPathway(savedPathway);
      }

      if (savedProgress.length > 0 && isMounted) {
        setModuleProgress(savedProgress);
      }

      if (!isAuthenticated) {
        if (isMounted) {
          setInitializing(false);
        }
        return;
      }

      try {
        const remoteProfile = await profileService.getMyProfile();
        const remoteProgress = await moduleService.getMyProgress().catch(() => savedProgress);
        if (!isMounted) {
          return;
        }

        setProfileResult(remoteProfile);
        storageManager.saveProfileResult(remoteProfile);

        const nextPathway = savedPathway ?? pathwayEngine.generatePathway(remoteProfile);
        setPathway(nextPathway);
        storageManager.savePathway(nextPathway);
        setModuleProgress(remoteProgress);
        storageManager.saveModuleProgress(remoteProgress);
      } catch (error) {
        console.warn('No remote profile available yet, trying local continuity.', error);

        if (savedResult) {
          try {
            await profileService.saveProfile(savedResult);
            if (!isMounted) {
              return;
            }

            const nextPathway = savedPathway ?? pathwayEngine.generatePathway(savedResult);
            setProfileResult(savedResult);
            setPathway(nextPathway);
            storageManager.savePathway(nextPathway);
          } catch (syncError) {
            console.warn('Unable to sync the local trial profile yet.', syncError);
          }
        }
      } finally {
        if (isMounted) {
          setInitializing(false);
        }
      }
    };

    hydrateApp();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const handleStartTest = () => {
    setAppState('welcome');
  };

  const handleBeginTest = () => {
    setAppState('test');
  };

  const handleTestComplete = (_responses: TestResponse[], result?: ProfileResult) => {
    setAppState('loading');

    setTimeout(() => {
      if (!result) {
        setAppState('home');
        return;
      }

      const nextPathway = pathwayEngine.generatePathway(result);
      setProfileResult(result);
      setPathway(nextPathway);
      storageManager.saveProfileResult(result);
      storageManager.savePathway(nextPathway);
      setModuleProgress([]);
      storageManager.saveModuleProgress([]);
      setAppState('results');
    }, 1200);
  };

  const applyPathway = (source: ProfileResult, occupation?: CrossOccupation) => {
    // Un parcours qui se reconstruit repart de ce que le moteur propose : les retouches
    // d'avant portaient sur des séances qui ne sont plus forcément devant le candidat.
    const starting = { ...source, pathwayAdjustments: undefined };
    const generatedPathway = pathwayEngine.generatePathway(starting, occupation);

    setProfileResult(starting);
    setPathway(generatedPathway);
    storageManager.saveProfileResult(starting);
    storageManager.savePathway(generatedPathway);
    setAppState('pathway');
  };

  /** L'étape d'engagement, pré-remplie par une fiche : `false` quand rien n'est préparable. */
  const openFocusFromOccupation = (
    occupationId: string,
    from: AppState,
    via?: FunctionalDomainId,
    choice?: FunctionChoice
  ): boolean => {
    if (!profileResult) return false;
    const draft = focusFromOccupation(profileResult, occupationId, via);
    if (!draft) return false;
    setFocusDraft(withFunctionChoice(draft, choice));
    setFocusReturn(from);
    setAppState('focus');
    return true;
  };

  const handleStartPathway = (occupationId?: string) => {
    if (!profileResult) return;

    const occupation = occupationId ? OCCUPATIONS_BY_ID[occupationId] : undefined;
    // Valider une fiche ouvre d'abord l'étape où elle se serre : domaine phare, débouchés,
    // axe. Un parcours bâti sans axe resterait une liste de modules.
    if (occupation && openFocusFromOccupation(occupation.id, 'results')) return;

    // Une fiche choisie dans les résultats remplace l'engagement pris dans l'entonnoir :
    // c'est la dernière intention du candidat, et le rechargement doit la montrer.
    applyPathway(
      occupation
        ? { ...profileResult, selectedOccupationId: occupation.id, targeting: undefined }
        : profileResult,
      occupation
    );
  };

  /** « Construire sur mes domaines » : renoncer, c'est aussi effacer le ciblage gardé. */
  const handleBuildOnDomains = () => {
    if (!profileResult) return;
    applyPathway({ ...profileResult, targeting: undefined });
  };

  const handleViewResults = () => {
    if (profileResult) {
      setAppState('results');
    }
  };

  const handleOpenDomain = (domainId: FunctionalDomainId) => {
    setOpenDomainId(domainId);
    setAppState('domain');
  };

  const handleChooseDomain = (domainId: FunctionalDomainId, choice?: FunctionChoice) => {
    if (!profileResult) return;
    setFocusDraft(withFunctionChoice(focusFromResult(profileResult, domainId), choice));
    setFocusReturn('domain');
    setAppState('focus');
  };

  /** Un métier visé depuis la fiche du domaine : l'engagement part de cette fiche, pas du domaine entier. */
  const handleChooseOpening = (
    domainId: FunctionalDomainId,
    occupationId: string,
    choice?: FunctionChoice
  ) => {
    if (openFocusFromOccupation(occupationId, 'domain', domainId, choice)) return;
    if (!profileResult) return;
    setFocusDraft(withFunctionChoice(focusFromResult(profileResult, domainId), choice));
    setFocusReturn('domain');
    setAppState('focus');
  };

  const handleConfirmFocus = (draft: Targeting) => {
    if (!profileResult) return;

    const { occupations, modules } = resolveFocus(draft);
    const targetedPathway = pathwayEngine.generateTargetedPathway(profileResult, {
      flagshipDomainId: draft.flagshipDomainId,
      occupations,
      seededModules: modules,
    });
    const chosen = { ...profileResult, targeting: draft, pathwayAdjustments: undefined };

    setProfileResult(chosen);
    setPathway(targetedPathway);
    storageManager.saveProfileResult(chosen);
    storageManager.savePathway(targetedPathway);
    if (isAuthenticated) {
      // Le ciblage fait partie du profil, pas seulement du parcours enregistré :
      // sans cet envoi, un autre appareil rejouerait les pistes par domaine.
      profileService.saveProfile(chosen).catch((error) => {
        console.warn('Ciblage gardé en local, la synchronisation à distance a échoué.', error);
        toast.error(
          "Votre choix de direction est gardé sur cet appareil, mais il n'a pas pu partir sur votre compte. Un autre appareil ne le verra pas. Refaites ce choix depuis l'écran de direction dès que votre connexion sera rétablie.",
          { id: 'sync-ciblage' }
        );
      });
    }
    setAppState('pathway');
  };

  /**
   * La retouche du parcours est une décision du candidat, pas un état d'écran : elle
   * part dans le profil, donc elle survit à une reconnexion et à un autre appareil.
   */
  const handleAdjustmentsChange = (next: PathwayAdjustments) => {
    if (!profileResult) return;

    const retouched = { ...profileResult, pathwayAdjustments: next };
    setProfileResult(retouched);
    storageManager.saveProfileResult(retouched);
    if (isAuthenticated) {
      profileService.saveProfile(retouched).catch((error) => {
        console.warn('Retouches gardées en local, la synchronisation à distance a échoué.', error);
        toast.error(
          'Vos retouches du parcours restent sur cet appareil, mais elles ne sont pas parties sur votre compte. Un autre appareil afficherait le parcours sans vos modifications.',
          { id: 'sync-modulation' }
        );
      });
    }
  };

  const handleViewDashboard = () => {
    if (profileResult) {
      setAppState('dashboard');
    }
  };

  const handleDashboardNavigate = (page: 'home' | 'profile' | 'pathway') => {
    if (page === 'home') {
      setAppState('home');
    } else if (page === 'profile') {
      setAppState('profile');
    } else if (page === 'pathway' && pathway) {
      setAppState('pathway');
    }
  };

  const handleResetData = async () => {
    if (!isAuthenticated) {
      storageManager.clearAllData();
      setProfileResult(null);
      setPathway(null);
      setModuleProgress([]);
      setAppState('home');
      toast.success('Vos réponses ont été effacées sur cet appareil.');
      return;
    }

    const failed: string[] = [];

    try {
      await profileService.clearMyData();
    } catch (error) {
      console.error('Remote profile deletion failed.', error);
      failed.push('votre profil et vos réponses');
    }

    try {
      await moduleService.clearMyProgress();
    } catch (error) {
      console.error('Remote module progress deletion failed.', error);
      failed.push('votre progression dans les modules');
    }

    if (failed.length > 0) {
      // Rien n'est supprimé sur cet appareil : le bouton reste à portée,
      // et personne ne se croit effacé alors que le serveur n'a rien reçu.
      toast.error(
        `Effacement impossible : le serveur n'a pas supprimé ${failed.join(' ni ')}. Vérifiez votre connexion, puis relancez l'effacement avec ce même bouton.`
      );
      return;
    }

    storageManager.clearAllData();
    setProfileResult(null);
    setPathway(null);
    setModuleProgress([]);
    setAppState('home');
    toast.success('Effacement terminé : votre compte est vide, et cet appareil aussi.');
  };

  const handleModuleProgressChange = async (
    moduleId: string,
    progress: number,
    status?: UserModuleProgress['status']
  ) => {
    try {
      if (isAuthenticated) {
        await moduleService.updateProgress(moduleId, progress, status);
      }
    } catch (error) {
      console.error('Unable to persist module progress remotely, keeping local state.', error);
      toast.error(
        "Votre progression dans ce module n'a pas pu partir sur votre compte, elle reste sur cet appareil. Remettez-la à jour depuis votre parcours quand votre connexion sera rétablie.",
        { id: 'sync-progression' }
      );
    } finally {
      setModuleProgress((current) => {
        if (!pathway) {
          return current;
        }

        const existing = current.find((item) => item.moduleId === moduleId);
        const module =
          pathway.quickWins.find((item) => item.id === moduleId) ??
          pathway.recommendedTracks.flatMap((track) => track.modules).find((item) => item.id === moduleId);

        if (!module) {
          return current;
        }

        const nextStatus =
          status ?? (progress >= 100 ? 'completed' : progress > 0 ? 'in_progress' : 'not_started');
        const nextEntry: UserModuleProgress = {
          moduleId,
          status: nextStatus,
          progress,
          completedAt: nextStatus === 'completed' ? new Date().toISOString() : undefined,
          updatedAt: new Date().toISOString(),
          module,
        };

        const nextProgress = existing
          ? current.map((item) => (item.moduleId === moduleId ? { ...item, ...nextEntry } : item))
          : [...current, nextEntry];

        storageManager.saveModuleProgress(nextProgress);
        return nextProgress;
      });
    }
  };

  const hasCompletedTest = !!profileResult;

  if (initializing) {
    return <LoadingScreen message="Chargement de votre profil..." />;
  }

  const screens = (
    <div className="min-h-screen">
      {appState === 'home' && (
        <HomePage
          isAuthenticated
          onStartTest={handleStartTest}
          hasCompletedTest={hasCompletedTest}
          onViewResults={hasCompletedTest ? handleViewDashboard : handleViewResults}
          onLogin={() => navigate('/login')}
          onRegister={() => navigate('/register')}
        />
      )}

      {appState === 'welcome' && <WelcomeScreen onStart={handleBeginTest} />}

      {appState === 'test' && <TestFlow onComplete={handleTestComplete} />}

      {appState === 'loading' && <LoadingScreen message="Analyse de votre profil en cours..." />}

      {appState === 'results' && profileResult && (
        <ResultsDashboard
          result={profileResult}
          onStartPathway={handleStartPathway}
          onOpenDomain={handleOpenDomain}
        />
      )}

      {appState === 'domain' && profileResult && openDomainId && (
        <DomainDetail
          result={profileResult}
          domainId={openDomainId}
          onBack={() => setAppState('results')}
          onChoose={handleChooseDomain}
          onChooseOccupation={(occupationId, choice) =>
            handleChooseOpening(openDomainId, occupationId, choice)
          }
        />
      )}

      {appState === 'focus' && profileResult && focusDraft && (
        <FocusFlow
          result={profileResult}
          draft={focusDraft}
          onChange={setFocusDraft}
          onBack={() => setAppState(focusReturn)}
          onConfirm={handleConfirmFocus}
          onBuildOnDomains={handleBuildOnDomains}
        />
      )}

      {appState === 'dashboard' && profileResult && (
        <Dashboard
          profileResult={profileResult}
          pathway={pathway}
          moduleProgress={moduleProgress}
          onNavigate={handleDashboardNavigate}
          onResetData={handleResetData}
        />
      )}

      {appState === 'pathway' && pathway && (
        <PathwayView
          pathway={pathway}
          adjustments={profileResult?.pathwayAdjustments ?? DEFAULT_ADJUSTMENTS}
          onAdjustmentsChange={handleAdjustmentsChange}
          moduleProgress={moduleProgress}
          onUpdateModuleProgress={handleModuleProgressChange}
          onBack={() => setAppState('dashboard')}
        />
      )}

      {appState === 'profile' && <ProfileSettings />}
    </div>
  );

  return <Screen>{screens}</Screen>;
};

export default WorkspaceApp;
