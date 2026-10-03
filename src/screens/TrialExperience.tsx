import { useEffect, useState } from 'react';
import { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeScreen } from '@/components/test/WelcomeScreen';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Screen } from '@/components/ui/Screen';
import { useAuth } from '@/contexts/AuthContext';
import { storageManager } from '@/utils/storageManager';
import { loadStoredProfile } from '@/utils/storedProfile';
import { focusFromOccupation, focusFromResult } from '@/utils/domainFocus';
import { withFunctionChoice } from '@/utils/targetingChoice';
import { FunctionalDomainId, ProfileResult, Targeting, TestResponse } from '@/types/test';

const TestFlow = lazy(() => import('@/components/test/TestFlow').then((m) => ({ default: m.TestFlow })));
const ResultsDashboard = lazy(() =>
  import('@/components/results/ResultsDashboard').then((m) => ({ default: m.ResultsDashboard }))
);
const DomainDetail = lazy(() =>
  import('@/components/results/DomainDetail').then((m) => ({ default: m.DomainDetail }))
);
const FocusFlow = lazy(() => import('@/components/focus/FocusFlow').then((m) => ({ default: m.FocusFlow })));

type TrialState = 'welcome' | 'test' | 'loading' | 'results' | 'domain' | 'focus';

/**
 * Le parcours d'essai, sans compte. Il part dans son propre fichier pour que
 * quelqu'un qui lit seulement la page d'accueil ne reçoive ni le questionnaire,
 * ni les fiches de métier, ni le moteur de parcours.
 */
const TrialExperience = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [trialState, setTrialState] = useState<TrialState>('welcome');
  const [profileResult, setProfileResult] = useState<ProfileResult | null>(loadStoredProfile());
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
    return (
      <Screen>
        <TestFlow onComplete={handleComplete} />
      </Screen>
    );
  }

  if (trialState === 'loading') {
    return <LoadingScreen message="Analyse de votre profil en cours..." />;
  }

  if (trialState === 'domain' && profileResult && openDomainId) {
    return (
      <Screen>
        <DomainDetail
          result={profileResult}
          domainId={openDomainId}
          onBack={() => setTrialState('results')}
          onChoose={(domainId, choice) => {
            const draft = focusFromResult(profileResult, domainId);
            setFocusDraft(draft ? withFunctionChoice(draft, choice) : null);
            setTrialState('focus');
          }}
          onChooseOccupation={(occupationId, choice) => {
            const draft =
              focusFromOccupation(profileResult, occupationId, openDomainId) ??
              focusFromResult(profileResult, openDomainId);
            setFocusDraft(draft ? withFunctionChoice(draft, choice) : null);
            setTrialState('focus');
          }}
        />
      </Screen>
    );
  }

  if (trialState === 'focus' && profileResult && focusDraft) {
    return (
      <Screen>
        <FocusFlow
          result={profileResult}
          draft={focusDraft}
          onChange={setFocusDraft}
          onBack={() => setTrialState('domain')}
          confirmLabel="Créer mon compte pour démarrer ce parcours"
          onConfirm={(draft) => {
            // L'engagement pris avant le compte doit passer la création : le profil
            // local part tel quel dans le premier saveProfile après l'inscription.
            const chosen = { ...profileResult, targeting: draft };
            setProfileResult(chosen);
            storageManager.saveProfileResult(chosen);
            navigate('/register?from=trial');
          }}
          onBuildOnDomains={() => navigate('/register?from=trial')}
        />
      </Screen>
    );
  }

  return (
    <Screen>
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
    </Screen>
  );
};

export default TrialExperience;
