import { TestResponse, ProfileResult } from '@/types/test';
import type { PersonalizedPathway } from './pathwayEngine';
import type { UserModuleProgress } from '@/services/module.api';
import { ASSESSMENT_VERSION } from '@/data/assessmentVersion';
import toast from 'react-hot-toast';

const STORAGE_KEYS = {
  TEST_RESPONSES: 'alice_test_responses',
  TEST_PROGRESS: 'alice_test_progress',
  PROFILE_RESULT: 'alice_profile_result',
  PATHWAY: 'alice_pathway',
  MODULE_PROGRESS: 'alice_module_progress',
  USER_PROFILE: 'alice_user_profile',
};

const NOTICES = {
  save: "Rien n'a été enregistré sur cet appareil : le stockage du navigateur est plein ou interdit. Rechargez la page et refaites votre dernière réponse ; connectez-vous pour que vos réponses partent sur votre compte.",
  load: "Les réponses déjà enregistrées sur cet appareil n'ont pas pu être relues. Rechargez la page ; si le message revient, recommencez le questionnaire.",
  clear: "Impossible d'effacer les données de cet appareil. Videz le stockage du site AliTché dans les réglages de votre navigateur.",
} as const;

// Un navigateur sans stockage déclenche la panne sur chaque lecture au chargement :
// le même `id` évite que cinq bandeaux identiques s'empilent à l'écran.
function notifyStorage(kind: keyof typeof NOTICES, detail: unknown) {
  console.error(`Local storage ${kind} failed:`, detail);
  toast.error(NOTICES[kind], { id: `local-${kind}` });
}

export interface UserProfile {
  name?: string;
  email?: string;
  completedAt?: string;
}

class StorageManager {
  saveTestProgress(currentIndex: number, responses: TestResponse[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.TEST_PROGRESS, JSON.stringify({
        currentIndex,
        responses,
        assessmentVersion: ASSESSMENT_VERSION,
        savedAt: new Date().toISOString(),
      }));
    } catch (error) {
      notifyStorage('save', error);
    }
  }

  loadTestProgress(): { currentIndex: number; responses: TestResponse[] } | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEST_PROGRESS);
      if (saved) {
        const data = JSON.parse(saved);

        if (data.assessmentVersion !== ASSESSMENT_VERSION) {
          this.clearTestProgress();
          return null;
        }

        return {
          currentIndex: Number.isFinite(data.currentIndex) ? data.currentIndex : 0,
          responses: Array.isArray(data.responses) ? data.responses : [],
        };
      }
    } catch (error) {
      notifyStorage('load', error);
    }
    return null;
  }

  clearTestProgress() {
    try {
      localStorage.removeItem(STORAGE_KEYS.TEST_PROGRESS);
    } catch (error) {
      notifyStorage('clear', error);
    }
  }

  saveProfileResult(result: ProfileResult) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE_RESULT, JSON.stringify({
        result,
        savedAt: new Date().toISOString(),
      }));
    } catch (error) {
      notifyStorage('save', error);
    }
  }

  /**
   * Le contenu brut gardé sous la clé de profil, sans décision sur sa validité :
   * le valider demande les catalogues, et l'écran d'accueil n'a pas à les payer.
   * Un appelant qui veut s'en servir passe par `loadStoredProfile`.
   */
  readStoredProfileResult(): unknown {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE_RESULT);
      if (saved) {
        const data = JSON.parse(saved);
        return data.result;
      }
    } catch (error) {
      notifyStorage('load', error);
    }
    return null;
  }

  savePathway(pathway: PersonalizedPathway) {
    try {
      localStorage.setItem(STORAGE_KEYS.PATHWAY, JSON.stringify({
        pathway,
        assessmentVersion: ASSESSMENT_VERSION,
        savedAt: new Date().toISOString(),
      }));
    } catch (error) {
      notifyStorage('save', error);
    }
  }

  saveModuleProgress(progress: UserModuleProgress[]) {
    try {
      localStorage.setItem(
        STORAGE_KEYS.MODULE_PROGRESS,
        JSON.stringify({
          progress,
          savedAt: new Date().toISOString(),
        })
      );
    } catch (error) {
      notifyStorage('save', error);
    }
  }

  loadModuleProgress(): UserModuleProgress[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MODULE_PROGRESS);
      if (saved) {
        const data = JSON.parse(saved);
        return data.progress ?? [];
      }
    } catch (error) {
      notifyStorage('load', error);
    }
    return [];
  }

  loadPathway(): PersonalizedPathway | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PATHWAY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.assessmentVersion !== ASSESSMENT_VERSION) {
          return null;
        }
        return data.pathway;
      }
    } catch (error) {
      notifyStorage('load', error);
    }
    return null;
  }

  saveUserProfile(profile: UserProfile) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      notifyStorage('save', error);
    }
  }

  loadUserProfile(): UserProfile | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      notifyStorage('load', error);
    }
    return null;
  }

  clearAllData() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      notifyStorage('clear', error);
    }
  }

  /**
   * Un parcours est-il déjà engagé sur cet appareil ? La réponse se prend sur
   * l'enveloppe : un profil calculé sous un autre barème ne se rejoue pas. Le
   * détail — domaine encore connu, fiches encore ouvertes — se vérifie à
   * l'écran qui s'en sert, dans `loadStoredProfile`.
   */
  hasCompletedTest(): boolean {
    const stored = this.readStoredProfileResult() as { assessmentVersion?: number } | null;
    return !!stored && stored.assessmentVersion === ASSESSMENT_VERSION;
  }
}

export const storageManager = new StorageManager();
