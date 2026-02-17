import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TestResponse, ProfileResult } from '@/types/test';
import { HomePage } from '@/components/home/HomePage';
import { WelcomeScreen } from '@/components/test/WelcomeScreen';
import { TestFlow } from '@/components/test/TestFlow';
import { ResultsDashboard } from '@/components/results/ResultsDashboard';
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
import { TestAnalyzer } from '@/utils/testAnalyzer';
import { pathwayEngine, PersonalizedPathway } from '@/utils/pathwayEngine';
import { storageManager } from '@/utils/storageManager';

type AppState = 'home' | 'welcome' | 'test' | 'loading' | 'results' | 'pathway' | 'dashboard';

function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [profileResult, setProfileResult] = useState<ProfileResult | null>(null);
  const [pathway, setPathway] = useState<PersonalizedPathway | null>(null);

  useEffect(() => {
    const savedResult = storageManager.loadProfileResult();
    const savedPathway = storageManager.loadPathway();
    
    if (savedResult) {
      setProfileResult(savedResult);
    }
    if (savedPathway) {
      setPathway(savedPathway);
    }
  }, []);

  const handleStartTest = () => {
    setAppState('welcome');
  };

  const handleBeginTest = () => {
    setAppState('test');
  };

  const handleTestComplete = (responses: TestResponse[]) => {
    setAppState('loading');
    
    setTimeout(() => {
      const analyzer = new TestAnalyzer(responses);
      const result = analyzer.analyze();
      setProfileResult(result);
      storageManager.saveProfileResult(result);
      setAppState('results');
    }, 1500);
  };

  const handleStartPathway = () => {
    if (profileResult) {
      const generatedPathway = pathwayEngine.generatePathway(profileResult);
      setPathway(generatedPathway);
      storageManager.savePathway(generatedPathway);
      setAppState('pathway');
    }
  };

  const handleViewResults = () => {
    if (profileResult) {
      setAppState('results');
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
      setAppState('results');
    } else if (page === 'pathway' && pathway) {
      setAppState('pathway');
    }
  };

  const handleResetData = () => {
    storageManager.clearAllData();
    setProfileResult(null);
    setPathway(null);
    setAppState('home');
  };

  const hasCompletedTest = storageManager.hasCompletedTest();

  const TestApp = () => (
    <div className="min-h-screen">
      {appState === 'home' && (
        <HomePage 
          onStartTest={handleStartTest}
          hasCompletedTest={hasCompletedTest}
          onViewResults={hasCompletedTest ? handleViewDashboard : handleViewResults}
        />
      )}

      {appState === 'welcome' && (
        <WelcomeScreen onStart={handleBeginTest} />
      )}
      
      {appState === 'test' && (
        <TestFlow onComplete={handleTestComplete} />
      )}

      {appState === 'loading' && (
        <LoadingScreen message="Analyse de votre profil en cours..." />
      )}
      
      {appState === 'results' && profileResult && (
        <ResultsDashboard 
          result={profileResult} 
          onStartPathway={handleStartPathway}
        />
      )}

      {appState === 'dashboard' && profileResult && (
        <Dashboard
          profileResult={profileResult}
          pathway={pathway}
          onNavigate={handleDashboardNavigate}
          onResetData={handleResetData}
        />
      )}
      
      {appState === 'pathway' && pathway && (
        <PathwayView pathway={pathway} />
      )}
    </div>
  );

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-email-sent" element={<VerifyEmailSent />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <TestApp />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
