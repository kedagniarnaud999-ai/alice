import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage } from '@/components/home/HomePage';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { storageManager } from '@/utils/storageManager';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Ce que reçoit quelqu'un qui arrive : la page d'accueil, la barre de statut du
 * service et les écrans de compte. Rien d'autre.
 *
 * Le test, le profil et le parcours partent dans `TrialExperience` et
 * `WorkspaceApp`, téléchargés au moment où l'on y entre ; les catalogues —
 * questions, fiches de métier, modules, spécialités, postes nommés — suivent
 * ces écrans et ne pèsent plus sur la première ouverture.
 */
const LoginForm = lazy(() => import('@/components/auth/LoginForm').then((m) => ({ default: m.LoginForm })));
const RegisterForm = lazy(() =>
  import('@/components/auth/RegisterForm').then((m) => ({ default: m.RegisterForm }))
);
const VerifyEmail = lazy(() => import('@/pages/VerifyEmail').then((m) => ({ default: m.VerifyEmail })));
const VerifyEmailSent = lazy(() =>
  import('@/pages/VerifyEmailSent').then((m) => ({ default: m.VerifyEmailSent }))
);
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword').then((m) => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import('@/pages/ResetPassword').then((m) => ({ default: m.ResetPassword })));
const AuthCallback = lazy(() => import('@/pages/AuthCallback').then((m) => ({ default: m.AuthCallback })));
const TrialExperience = lazy(() => import('@/screens/TrialExperience'));
const WorkspaceApp = lazy(() => import('@/screens/WorkspaceApp'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen message="Chargement de l'écran..." />}>
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
    </Suspense>
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

export default App;
