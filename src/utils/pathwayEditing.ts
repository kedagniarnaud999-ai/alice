import { LearningModule } from '@/data/modules';
import { PathwayAdjustments } from '@/types/test';
import {
  estimateWeeks,
  extractSkills,
  LearningTrack,
  NOMINAL_WEEKLY_HOURS,
  PersonalizedPathway,
} from '@/utils/pathwayEngine';

/**
 * Amplitude laissée au candidat pour dire ses heures. Le borne basse existe parce
 * qu'une semaine vide ne fait pas un parcours ; la haute parce qu'un calendrier
 * bâti sur 40 heures par semaine n'est plus le sien, et que l'écran le vendrait
 * comme tenant.
 */
export const MIN_WEEKLY_HOURS = 1;
export const MAX_WEEKLY_HOURS = 20;

export const DEFAULT_ADJUSTMENTS: PathwayAdjustments = {
  weeklyHours: NOMINAL_WEEKLY_HOURS,
  excludedModuleIds: [],
  priorityOrder: [],
};

const asIdList = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  const seen = new Set<string>();
  value.forEach((item) => {
    if (typeof item === 'string' && item.trim()) {
      seen.add(item.trim());
    }
  });
  return Array.from(seen);
};

/**
 * Une retouche revient du JSONB ou du localStorage : un volume qui n'est pas un
 * nombre, des listes qui ne sont pas des listes. Elle se répare ici et nulle part
 * ailleurs — hors de là, l'écran afficherait un calendrier inventé.
 */
export function normalizeAdjustments(value: unknown): PathwayAdjustments {
  if (!value || typeof value !== 'object') {
    return { ...DEFAULT_ADJUSTMENTS };
  }

  const source = value as Record<string, unknown>;
  const raw = typeof source.weeklyHours === 'number' ? Math.round(source.weeklyHours) : Number.NaN;
  const weeklyHours = Number.isFinite(raw)
    ? Math.min(MAX_WEEKLY_HOURS, Math.max(MIN_WEEKLY_HOURS, raw))
    : NOMINAL_WEEKLY_HOURS;

  return { weeklyHours, excludedModuleIds: asIdList(source.excludedModuleIds), priorityOrder: asIdList(source.priorityOrder) };
}

/**
 * Une même séance peut figurer dans deux pistes : la croiser et la retrouver.
 * L'ordre voulu se range donc par piste (`piste::séance`), et une clé nue — écrite
 * avant cette précaution — s'applique partout où la séance se montre.
 */
const orderKey = (trackId: string, moduleId: string): string => `${trackId}::${moduleId}`;

/** Les identifiants que l'ordre voulu place devant cette piste, dans l'ordre voulu. */
function citedIdsFor(trackId: string, priorityOrder: string[], present: Set<string>): string[] {
  const cited: string[] = [];
  const seen = new Set<string>();
  const keep = (id: string): void => {
    if (present.has(id) && !seen.has(id)) {
      seen.add(id);
      cited.push(id);
    }
  };
  priorityOrder.forEach((key) => {
    const separator = key.indexOf('::');
    if (separator === -1) {
      keep(key);
      return;
    }
    if (key.slice(0, separator) === trackId) {
      keep(key.slice(separator + 2));
    }
  });
  return cited;
}

/** Les séances citées d'abord dans l'ordre voulu, le reste à sa place de moteur. */
function orderModules(modules: LearningModule[], priorityOrder: string[], trackId: string): LearningModule[] {
  if (priorityOrder.length === 0) {
    return modules;
  }
  const citedIds = citedIdsFor(trackId, priorityOrder, new Set(modules.map((module) => module.id)));
  if (citedIds.length === 0) {
    return modules;
  }
  const inFront = new Set(citedIds);
  const cited = citedIds
    .map((id) => modules.find((module) => module.id === id))
    .filter((module): module is LearningModule => module !== undefined);
  return [...cited, ...modules.filter((module) => !inFront.has(module.id))];
}

/** Ce que le candidat voit dans une piste, retouches comprises : la base du travail d'ordre. */
function displayedModules(track: LearningTrack, adjustments: PathwayAdjustments): LearningModule[] {
  const excluded = new Set(adjustments.excludedModuleIds);
  return orderModules(
    track.modules.filter((module) => !excluded.has(module.id)),
    adjustments.priorityOrder,
    track.id
  );
}

/**
 * La retouche ne touche pas le moteur : elle se pose sur le parcours généré et s'en
 * détache intégralement, si bien que la base reste rejouable à l'identique.
 */
export function applyAdjustments(
  pathway: PersonalizedPathway,
  adjustments?: PathwayAdjustments
): PersonalizedPathway {
  const wanted = normalizeAdjustments(adjustments);
  const excluded = new Set(wanted.excludedModuleIds);

  const recommendedTracks = pathway.recommendedTracks.map((track) => {
    const kept = track.modules.filter((module) => !excluded.has(module.id));
    const ordered = orderModules(kept, wanted.priorityOrder, track.id);
    const estimatedWeeks = ordered.length === 0 ? 0 : estimateWeeks(ordered, wanted.weeklyHours);
    const targetSkills = ordered.length === 0 ? [] : extractSkills(ordered);
    const unchanged =
      ordered.length === track.modules.length &&
      ordered.every((module, index) => module.id === track.modules[index].id) &&
      estimatedWeeks === track.estimatedWeeks &&
      JSON.stringify(targetSkills) === JSON.stringify(track.targetSkills);
    if (unchanged) {
      return track;
    }
    return { ...track, modules: ordered, estimatedWeeks, targetSkills };
  });

  const quickWins = pathway.quickWins.filter((module) => !excluded.has(module.id));
  return { ...pathway, recommendedTracks, quickWins };
}

export type MoveDirection = 'up' | 'down';

/**
 * Déplacer une séance d'un cran dans la piste qui l'affiche. Rien ne bouge si elle
 * est déjà en tête ou en queue : la retouche ne s'invente pas un ordre pour faire
 * semblant d'avoir agi.
 */
export function moveSession(
  adjustments: PathwayAdjustments,
  track: LearningTrack,
  moduleId: string,
  direction: MoveDirection
): PathwayAdjustments {
  const current = displayedModules(track, adjustments).map((module) => module.id);
  const index = current.indexOf(moduleId);
  const swapWith = direction === 'up' ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= current.length) {
    return adjustments;
  }

  const next = [...current];
  const moved = next[swapWith];
  next[swapWith] = next[index];
  next[index] = moved;

  const mine = new Set(track.modules.map((module) => module.id));
  const foreign = adjustments.priorityOrder.filter((key) => {
    const separator = key.indexOf('::');
    return separator === -1 ? !mine.has(key) : key.slice(0, separator) !== track.id;
  });
  return { ...adjustments, priorityOrder: [...foreign, ...next.map((id) => orderKey(track.id, id))] };
}

/** Écarter une séance, la reprendre : la liste des écartées est l'interrupteur. */
export function toggleExcluded(adjustments: PathwayAdjustments, moduleId: string): PathwayAdjustments {
  const excluded = adjustments.excludedModuleIds.includes(moduleId)
    ? adjustments.excludedModuleIds.filter((id) => id !== moduleId)
    : [...adjustments.excludedModuleIds, moduleId];
  return { ...adjustments, excludedModuleIds: excluded };
}

/** Le résumé que l'écran affiche en haut : ce qui reste à faire, en une lecture. */
export function countRetainedSessions(pathway: PersonalizedPathway): number {
  return (
    pathway.quickWins.length +
    pathway.recommendedTracks.reduce((total, track) => total + track.modules.length, 0)
  );
}
