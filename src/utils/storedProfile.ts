import { ProfileResult } from '@/types/test';
import { normalizeProfileResult } from './profileResult';
import { storageManager } from './storageManager';

/**
 * Un profil gardé sur l'appareil n'est utilisable qu'après relecture sous le
 * barème en cours : les identifiants de domaine, de fiche et d'axe qu'il cite
 * ont pu changer depuis. Cette relecture lit les catalogues, elle appartient
 * donc aux écrans de travail — l'accueil public, lui, reste léger et se
 * contente de `storageManager.hasCompletedTest()`.
 */
export function loadStoredProfile(): ProfileResult | null {
  return normalizeProfileResult(storageManager.readStoredProfileResult());
}
