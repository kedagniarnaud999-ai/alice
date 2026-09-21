import { CrossOccupation, OCCUPATIONS_BY_ID } from '@/data/occupations';
import { LearningModule, MODULE_CATALOG } from '@/data/modules';
import { Specialization, SPECIALIZATIONS_BY_ID, specializationsForDomain } from '@/data/specializations';
import { domainOpenings } from '@/utils/domainFocus';
import { FunctionalDomainId, ProfileResult, Targeting } from '@/types/test';

/**
 * La mécanique de l'entonnoir, sans React : ce que le candidat coche, ce qui
 * tombe quand une case se décoche, et ce qui bloque avant de démarrer. L'écran
 * n'a que des clics à câbler, et les contrôles testent la même règle.
 */

export const MIN_TARGETED_OPENINGS = 1;
export const MAX_TARGETED_OPENINGS = 3;
export const MAX_TARGETED_SPECIALIZATIONS = 2;

const MODULE_BY_ID = new Map<string, LearningModule>(
  MODULE_CATALOG.map((module) => [module.id, module])
);

/**
 * Cocher ou décocher un débouché.
 *
 * Au-delà de trois, un nouveau clic ne fait rien : la borne est affichée à
 * l'écran et les cases libres y apparaissent désactivées. Ajouter en écartant une
 * autre ferait disparaître, sans prévenir, une voie que le candidat avait choisie.
 *
 * Une spécialité qui ne couvre plus aucun débouché retenu tombe avec lui : sinon
 * l'axe resterait coché sur une voie que la personne vient de quitter.
 */
export function toggleOccupation(draft: Targeting, occupationId: string): Targeting {
  const picked = draft.occupationIds.includes(occupationId)
    ? draft.occupationIds.filter((id) => id !== occupationId)
    : draft.occupationIds.length >= MAX_TARGETED_OPENINGS
      ? draft.occupationIds
      : [...draft.occupationIds, occupationId];

  return {
    ...draft,
    occupationIds: picked,
    ...pruneSpecializations(draft.flagshipDomainId, picked, draft.specializationIds),
  };
}

/** Cocher ou décocher un axe de spécialisation, dans la même limite de deux. */
export function toggleSpecialization(draft: Targeting, specializationId: string): Targeting {
  const picked = draft.specializationIds.includes(specializationId)
    ? draft.specializationIds.filter((id) => id !== specializationId)
    : draft.specializationIds.length >= MAX_TARGETED_SPECIALIZATIONS
      ? draft.specializationIds
      : [...draft.specializationIds, specializationId];

  return { ...draft, specializationIds: picked };
}

/**
 * Les axes qui ont leur place sous cette sélection de débouchés.
 *
 * Un axe qui ne mène à aucun des métiers retenus n'est pas une option : le
 * proposer serait demander au candidat de choisir entre deux choses qui n'ont
 * rien à voir.
 */
export function specializationsInPlay(domainId: FunctionalDomainId, occupationIds: string[]): Specialization[] {
  const picked = new Set(occupationIds);
  return specializationsForDomain(domainId).filter((specialization) =>
    specialization.occupationIds.some((occupationId) => picked.has(occupationId))
  );
}

function pruneSpecializations(
  domainId: FunctionalDomainId,
  occupationIds: string[],
  current: string[]
): Pick<Targeting, 'specializationIds'> {
  const playable = new Set(specializationsInPlay(domainId, occupationIds).map((entry) => entry.id));
  return { specializationIds: current.filter((id) => playable.has(id)) };
}

/**
 * Le motif qui empêche de démarrer, dans les mots qu'on montre. `null` quand le
 * ciblage tient debout.
 *
 * Une spécialité n'est exigée que si le domaine en propose une sous les débouchés
 * retenus : « au moins une spécialisation si applicable » veut dire que
 * l'inapplicable ne bloque pas la porte.
 */
export function validateFocus(draft: Targeting, result: ProfileResult): string | null {
  const { flagshipDomainId, occupationIds } = draft;
  const domain = domainOpenings(result, flagshipDomainId);

  if (domain.openings.length === 0) {
    return 'Ce domaine ne vous ouvre aucun métier aujourd’hui : revenez sur sa fiche et choisissez une autre porte.';
  }
  if (occupationIds.length < MIN_TARGETED_OPENINGS) {
    return 'Choisissez au moins un débouché dans ce domaine, pour que le parcours ait une cible.';
  }

  const allowed = new Set(domain.openings.map((match) => match.occupation.id));
  if (occupationIds.some((id) => !allowed.has(id))) {
    return 'Un débouché retenu ne fait plus partie de ce domaine : reprenez votre sélection.';
  }
  if (occupationIds.length > MAX_TARGETED_OPENINGS) {
    return `Jusqu’à ${MAX_TARGETED_OPENINGS} débouchés à la fois : au-delà, le parcours redevient une liste.`;
  }

  const playable = specializationsInPlay(flagshipDomainId, occupationIds);
  if (playable.length > 0 && draft.specializationIds.length === 0) {
    return 'Choisissez au moins un axe où vous appuyer : c’est lui qui serre le parcours.';
  }
  const playableIds = new Set(playable.map((entry) => entry.id));
  if (draft.specializationIds.some((id) => !playableIds.has(id))) {
    return 'Une spécialité retenue ne mène plus aux débouchés choisis : reprenez votre sélection.';
  }
  if (draft.specializationIds.length > MAX_TARGETED_SPECIALIZATIONS) {
    return `Jusqu’à ${MAX_TARGETED_SPECIALIZATIONS} axes : deux, c’est déjà deux parcours à mener.`;
  }

  return null;
}

/**
 * Le ciblage réduit à ce que le moteur sait construire : des fiches et des
 * modules qui existent. Une clé inconnue sort ici plutôt que de traverser
 * l'écran — le parcours ne peut pas promettre une séance introuvable.
 */
export function resolveFocus(draft: Targeting): {
  occupations: CrossOccupation[];
  modules: LearningModule[];
} {
  const occupations = draft.occupationIds
    .map((id) => OCCUPATIONS_BY_ID[id])
    .filter((occupation): occupation is CrossOccupation => Boolean(occupation));

  const seen = new Set<string>();
  const modules = draft.specializationIds
    .flatMap((id) => SPECIALIZATIONS_BY_ID[id]?.moduleIds ?? [])
    .map((moduleId) => MODULE_BY_ID.get(moduleId))
    .filter((module): module is LearningModule => {
      if (!module || seen.has(module.id)) return false;
      seen.add(module.id);
      return true;
    });

  return { occupations, modules };
}
