import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage } from '@/components/home/HomePage';
import { WelcomeScreen } from '@/components/test/WelcomeScreen';
import { TestFlow } from '@/components/test/TestFlow';
import { ResultsDashboard } from '@/components/results/ResultsDashboard';
import { DomainDetail } from '@/components/results/DomainDetail';
import { FocusFlow } from '@/components/focus/FocusFlow';
import { PathwayView } from '@/components/pathway/PathwayView';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { VerifyEmail } from '@/pages/VerifyEmail';
import { VerifyEmailSent } from '@/pages/VerifyEmailSent';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { ResetPassword } from '@/pages/ResetPassword';
import { AuthCallback } from '@/pages/AuthCallback';
import { ProfileSettings } from '@/pages/ProfileSettings';
import { pathwayEngine, PersonalizedPathway } from '@/utils/pathwayEngine';
import { OCCUPATIONS_BY_ID } from '@/data/occupations';
import { focusFromResult } from '@/utils/domainFocus';
import { resolveFocus } from '@/utils/focusSelection';
import { storageManager } from '@/utils/storageManager';
import { profileService } from '@/services/profile.api';
import { moduleService, UserModuleProgress } from '@/services/module.api';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileResult, Targeting, TestResponse, FunctionalDomainId } from '@/types/test';

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
type TrialState = 'welcome' | 'test' | 'loading' | 'results' | 'domain' | 'focus';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicHome />} />
      <Route path="/trial" element={<TrialExperience />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-email-sent" element={<VerifyEmailSent />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <WorkspaceApp />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Volontairement sans écran de chargement : LoadingScreen est un plein écran z-50, et attendre
// la résolution de la session rendait tout le site public inutilisable dès que Supabase traînait.
const PublicHome = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <HomePage
      isAuthenticated={isAuthenticated}
      hasCompletedTest={storageManager.hasCompletedTest()}
      onStartTest={() => navigate(isAuthenticated ? '/app' : '/trial')}
      onViewResults={() => navigate('/app')}
      onLogin={() => navigate('/login')}
      onRegister={() => navigate('/register')}
    />
  );
};

const TrialExperience = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [trialState, setTrialState] = useState<TrialState>('welcome');
  const [profileResult, setProfileResult] = useState<ProfileResult | null>(storageManager.loadProfileResult());
  const [openDomainId, setOpenDomainId] = useState<FunctionalDomainId | null>(null);
  const [focusDraft, setFocusDraft] = useState<Targeting | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleComplete = (_responses: TestResponse[], result?: ProfileResult) => {
    setTrialState('loading');

    setTimeout(() => {
      if (!result) {
        setTrialState('welcome');
        return;
      }

      setProfileResult(result);
      storageManager.saveProfileResult(result);
      setTrialState('results');
    }, 900);
  };

  if (trialState === 'welcome') {
    return (
      <WelcomeScreen
        onStart={() => setTrialState('test')}
        onLogin={() => navigate('/login')}
        onHome={() => navigate('/')}
      />
    );
  }

  if (trialState === 'test') {
    return <TestFlow onComplete={handleComplete} />;
  }

  if (trialState === 'loading') {
    return <LoadingScreen message="Analyse de votre profil en cours..." />;
  }

  if (trialState === 'domain' && profileResult && openDomainId) {
    return (
      <DomainDetail
        result={profileResult}
        domainId={openDomainId}
        onBack={() => setTrialState('results')}
        onChoose={(domainId) => {
          setFocusDraft(focusFromResult(profileResult, domainId));
          setTrialState('focus');
        }}
      />
    );
  }

  if (trialState === 'focus' && profileResult && focusDraft) {
    return (
      <FocusFlow
        result={profileResult}
        draft={focusDraft}
        onChange={setFocusDraft}
        onBack={() => setTrialState('domain')}
        confirmLabel="Créer mon compte pour démarrer ce parcours"
        onConfirm={() => navigate('/register?from=trial')}
        onBuildOnDomains={() => navigate('/register?from=trial')}
      />
    );
  }

  return (
      <ResultsDashboard
        result={profileResult ?? undefined}
        guestMode
        hideExportMenu={false}
        primaryActionLabel="Créer mon compte pour poursuivre"
        helperText="Retrouvez ce profil, vos recommandations et la suite de votre parcours dans un espace personnel."
        onStartPathway={() => navigate('/register?from=trial')}
        onOpenDomain={(domainId) => {
          setOpenDomainId(domainId);
          setTrialState('domain');
        }}
      />
  );
};

const WorkspaceApp = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [appState, setAppState] = useState<AppState>('home');
  const [profileResult, setProfileResult] = useState<ProfileResult | null>(null);
  const [openDomainId, setOpenDomainId] = useState<FunctionalDomainId | null>(null);
  const [focusDraft, setFocusDraft] = useState<Targeting | null>(null);
  const [pathway, setPathway] = useState<PersonalizedPathway | null>(null);
  const [moduleProgress, setModuleProgress] = useState<UserModuleProgress[]>([]);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const hydrateApp = async () => {
      const savedResult = storageManager.loadProfileResult();
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

  const handleStartPathway = (occupationId?: string) => {
    if (!profileResult) return;

    const occupation = occupationId ? OCCUPATIONS_BY_ID[occupationId] : undefined;
    const chosen = occupation ? { ...profileResult, selectedOccupationId: occupation.id } : profileResult;
    const generatedPathway = pathwayEngine.generatePathway(chosen, occupation);

    setProfileResult(chosen);
    setPathway(generatedPathway);
    storageManager.saveProfileResult(chosen);
    storageManager.savePathway(generatedPathway);
    setAppState('pathway');
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

  const handleChooseDomain = (domainId: FunctionalDomainId) => {
    if (!profileResult) return;
    setFocusDraft(focusFromResult(profileResult, domainId));
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

    setPathway(targetedPathway);
    storageManager.savePathway(targetedPathway);
    setAppState('pathway');
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
    try {
      if (isAuthenticated) {
        await profileService.clearMyData();
        await moduleService.clearMyProgress().catch(() => undefined);
      }
    } catch (error) {
      console.error('Unable to clear remote data, continuing with local reset.', error);
    } finally {
      storageManager.clearAllData();
      setProfileResult(null);
      setPathway(null);
      setModuleProgress([]);
      setAppState('home');
    }
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

  return (
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
        />
      )}

      {appState === 'focus' && profileResult && focusDraft && (
        <FocusFlow
          result={profileResult}
          draft={focusDraft}
          onChange={setFocusDraft}
          onBack={() => setAppState('domain')}
          onConfirm={handleConfirmFocus}
          onBuildOnDomains={() => handleStartPathway()}
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
          moduleProgress={moduleProgress}
          onUpdateModuleProgress={handleModuleProgressChange}
          onBack={() => setAppState('dashboard')}
        />
      )}

      {appState === 'profile' && <ProfileSettings />}
    </div>
  );
};

export default App;
