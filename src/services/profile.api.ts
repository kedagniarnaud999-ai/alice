import { apiClient } from './api.client';
import { ProfileResult, TestResponse } from '@/types/test';

export class ProfileService {
  async saveProfile(profile: ProfileResult): Promise<void> {
    await apiClient.post('/profiles', profile);
  }

  async getMyProfile(): Promise<ProfileResult> {
    const response = await apiClient.get<{ data: { profile: ProfileResult } }>('/profiles/me');
    return response.data.data.profile;
  }

  async saveTestResponses(responses: TestResponse[]): Promise<void> {
    await apiClient.post('/profiles/responses', { responses });
  }
}

export const profileService = new ProfileService();
