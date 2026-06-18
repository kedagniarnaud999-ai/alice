import { supabase } from '@/lib/supabase';
import { MODULE_CATALOG, type LearningModule } from '@/utils/pathwayEngine';

export type ModuleProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface UserModuleProgress {
  moduleId: string;
  status: ModuleProgressStatus;
  progress: number;
  startedAt?: string;
  completedAt?: string;
  updatedAt?: string;
  module: LearningModule;
}

interface ModuleProgressRow {
  module_id: string;
  status: ModuleProgressStatus;
  progress: number;
  started_at: string | null;
  completed_at: string | null;
  updated_at: string | null;
}

const clampProgress = (value: number) => Math.min(100, Math.max(0, value));

const mapRowToProgress = (row: ModuleProgressRow): UserModuleProgress | null => {
  const module = MODULE_CATALOG.find((item) => item.id === row.module_id);
  if (!module) {
    return null;
  }

  return {
    moduleId: row.module_id,
    status: row.status,
    progress: row.progress,
    startedAt: row.started_at ?? undefined,
    completedAt: row.completed_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
    module,
  };
};

export class ModuleService {
  async getModules(filters?: {
    category?: string;
    difficulty?: string;
    isFree?: boolean;
  }): Promise<LearningModule[]> {
    return MODULE_CATALOG.filter((module) => {
      if (filters?.category && module.category !== filters.category) {
        return false;
      }

      if (filters?.difficulty && module.difficulty !== filters.difficulty) {
        return false;
      }

      if (filters?.isFree !== undefined && module.isFree !== filters.isFree) {
        return false;
      }

      return true;
    });
  }

  async getModule(id: string): Promise<LearningModule> {
    const module = MODULE_CATALOG.find((item) => item.id === id);
    if (!module) {
      throw new Error('Module introuvable.');
    }

    return module;
  }

  async updateProgress(moduleId: string, progress: number, status?: ModuleProgressStatus): Promise<void> {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      throw userError ?? new Error('Utilisateur non authentifie.');
    }

    const safeProgress = clampProgress(progress);
    const nextStatus: ModuleProgressStatus =
      status ?? (safeProgress >= 100 ? 'completed' : safeProgress > 0 ? 'in_progress' : 'not_started');

    const now = new Date().toISOString();
    const payload = {
      user_id: userData.user.id,
      module_id: moduleId,
      status: nextStatus,
      progress: safeProgress,
      started_at: nextStatus === 'not_started' ? null : now,
      completed_at: nextStatus === 'completed' ? now : null,
      updated_at: now,
    };

    const { error } = await supabase.from('user_module_progress').upsert(payload, {
      onConflict: 'user_id,module_id',
    });

    if (error) {
      throw error;
    }
  }

  async getMyProgress(): Promise<UserModuleProgress[]> {
    const { data, error } = await supabase
      .from('user_module_progress')
      .select('module_id,status,progress,started_at,completed_at,updated_at')
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? [])
      .map((row) => mapRowToProgress(row as ModuleProgressRow))
      .filter((row): row is UserModuleProgress => row !== null);
  }

  async clearMyProgress(): Promise<void> {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      throw userError ?? new Error('Utilisateur non authentifie.');
    }

    const { error } = await supabase
      .from('user_module_progress')
      .delete()
      .eq('user_id', userData.user.id);

    if (error) {
      throw error;
    }
  }
}

export const moduleService = new ModuleService();
