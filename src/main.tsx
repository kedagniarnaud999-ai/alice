import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext';
import { ConfigErrorScreen } from '@/components/ConfigErrorScreen';
import { ServiceStatusBanner } from '@/components/ServiceStatusBanner';
import { isSupabaseConfigured } from '@/config/env';
import './index.css';

const Root = () => {
  if (!isSupabaseConfigured) {
    return <ConfigErrorScreen />;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <ServiceStatusBanner />
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 8000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
