import { apiClient } from './api.client';

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  category: string;
  skills: string[];
  format: string;
  isFree: boolean;
  content?: string;
  videoUrl?: string;
}

export interface UserProgress {
  id: string;
  moduleId: string;
  status: string;
  progress: number;
  completedAt?: string;
  module: LearningModule;
}

export class ModuleService {
  async getModules(filters?: {
    category?: string;
    difficulty?: string;
    isFree?: boolean;
  }): Promise<LearningModule[]> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.isFree !== undefined) params.append('isFree', String(filters.isFree));

    const response = await apiClient.get<{ data: { modules: LearningModule[] } }>(
      `/modules?${params.toString()}`
    );
    return response.data.data.modules;
  }

  async getModule(id: string): Promise<LearningModule> {
    const response = await apiClient.get<{ data: { module: LearningModule } }>(`/modules/${id}`);
    return response.data.data.module;
  }

  async updateProgress(moduleId: string, progress: number, status: string): Promise<void> {
    await apiClient.post(`/modules/${moduleId}/progress`, { progress, status });
  }

  async getMyProgress(): Promise<UserProgress[]> {
    const response = await apiClient.get<{ data: { progress: UserProgress[] } }>('/modules/progress/me');
    return response.data.data.progress;
  }
}

export const moduleService = new ModuleService();
