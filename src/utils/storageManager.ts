import { TestResponse, ProfileResult } from '@/types/test';
import { PersonalizedPathway } from './pathwayEngine';
import { UserModuleProgress } from '@/services/module.api';

const STORAGE_KEYS = {
  TEST_RESPONSES: 'alice_test_responses',
  TEST_PROGRESS: 'alice_test_progress',
  PROFILE_RESULT: 'alice_profile_result',
  PATHWAY: 'alice_pathway',
  MODULE_PROGRESS: 'alice_module_progress',
  USER_PROFILE: 'alice_user_profile',
};

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
        savedAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error saving test progress:', error);
    }
  }

  loadTestProgress(): { currentIndex: number; responses: TestResponse[] } | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEST_PROGRESS);
      if (saved) {
        const data = JSON.parse(saved);
        return {
          currentIndex: data.currentIndex,
          responses: data.responses,
        };
      }
    } catch (error) {
      console.error('Error loading test progress:', error);
    }
    return null;
  }

  clearTestProgress() {
    try {
      localStorage.removeItem(STORAGE_KEYS.TEST_PROGRESS);
    } catch (error) {
      console.error('Error clearing test progress:', error);
    }
  }

  saveProfileResult(result: ProfileResult) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE_RESULT, JSON.stringify({
        result,
        savedAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error saving profile result:', error);
    }
  }

  loadProfileResult(): ProfileResult | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE_RESULT);
      if (saved) {
        const data = JSON.parse(saved);
        return data.result;
      }
    } catch (error) {
      console.error('Error loading profile result:', error);
    }
    return null;
  }

  savePathway(pathway: PersonalizedPathway) {
    try {
      localStorage.setItem(STORAGE_KEYS.PATHWAY, JSON.stringify({
        pathway,
        savedAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error saving pathway:', error);
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
      console.error('Error saving module progress:', error);
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
      console.error('Error loading module progress:', error);
    }
    return [];
  }

  loadPathway(): PersonalizedPathway | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PATHWAY);
      if (saved) {
        const data = JSON.parse(saved);
        return data.pathway;
      }
    } catch (error) {
      console.error('Error loading pathway:', error);
    }
    return null;
  }

  saveUserProfile(profile: UserProfile) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }

  loadUserProfile(): UserProfile | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
    return null;
  }

  clearAllData() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }

  hasCompletedTest(): boolean {
    return this.loadProfileResult() !== null;
  }
}

export const storageManager = new StorageManager();
