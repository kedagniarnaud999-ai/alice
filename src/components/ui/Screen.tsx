import { ReactNode } from 'react';
import { Suspense } from 'react';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

/**
 * La barrière est posée autour de l'écran, jamais autour de l'écran qui le choisit :
 * pendant qu'un fichier se télécharge, l'état du parcours reste en place.
 */
export const Screen = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LoadingScreen message="Chargement de l'écran..." />}>{children}</Suspense>
);
