import { supabase } from '@/lib/supabase';
import { storageManager } from '@/utils/storageManager';
import type { ProfileResult, TestResponse } from '@/types/test';

const getCurrentUserId = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw error ?? new Error('No authenticated user found.');
  }

  return data.user.id;
};

export class ProfileService {
  async saveProfile(profile: ProfileResult): Promise<void> {
    storageManager.saveProfileResult(profile);

    const userId = await getCurrentUserId();
    const { error } = await supabase.from('profiles').upsert(
      {
        user_id: userId,
        profile_type: profile.profileType,
        profile_description: profile.profileDescription,
        natural_talents: profile.naturalTalents,
        motivation_drivers: profile.motivationDrivers,
        primary_interests: profile.primaryInterests,
        career_stage: profile.careerStage,
        feasibility_assessment: profile.feasibilityAssessment,
        next_actions: profile.nextActions,
        payload: profile,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );

    if (error) {
      throw error;
    }
  }

  async getMyProfile(): Promise<ProfileResult> {
    const userId = await getCurrentUserId();
    const { data, error } = await supabase
      .from('profiles')
      .select('payload')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data?.payload) {
      const localProfile = storageManager.loadProfileResult();
      if (localProfile) {
        return localProfile;
      }
      throw new Error('Profile not found');
    }

    return data.payload as ProfileResult;
  }

  async saveTestResponses(responses: TestResponse[]): Promise<void> {
    const userId = await getCurrentUserId();

    const { error: deleteError } = await supabase.from('test_responses').delete().eq('user_id', userId);
    if (deleteError) {
      throw deleteError;
    }

    if (responses.length === 0) {
      return;
    }

    const payload = responses.map((response) => ({
      user_id: userId,
      question_id: response.questionId,
      selected_options: response.selectedOptions,
      created_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from('test_responses').insert(payload);
    if (error) {
      throw error;
    }
  }
}

export const profileService = new ProfileService();
