import { CHOICE_RATIONALES, FUNCTION_PROFILES } from '@/data/functions';
import { FUNCTION_ROLE_IDS } from '@/data/psychAffinity';
import { domainOpenings } from '@/utils/domainFocus';
import { OccupationMatch } from '@/utils/occupationMatcher';
import { FunctionalDomainId, FunctionRoleId, ProfileResult } from '@/types/test';

/**
 * Résolution `domaine → fonctions → métiers`, sans React : la fiche du domaine et
 * les contrôles lisent tous deux la même répartition, ils ne peuvent pas se
 * contredire sur ce qu'une fonction ouvre.
 *
 * Rien n'est ajouté au profil pour ça : le questionnaire score déjà les six axes
 * (`functionSignals`), chaque fiche s'en déclare deux (`occupation.functions`).
 * Ce niveau-ci est une façon de présenter ce qui existait, pas une donnée neuve.
 */

/**
 * Une fonction qui n'ouvre qu'un seul métier du domaine n'est pas un choix, c'est
 * un cul-de-sac déguisé en menu : elle reste visible, elle n'est plus recommandée.
 */
export const MIN_FUNCTION_OPENINGS = 2;
/** Les « trois grandes fonctions qui matchent » demandées : ni plus (bruit), ni moins (hasard). */
export const RECOMMENDED_FUNCTION_COUNT = 3;

/**
 * Longueur maximale de la justification. `profileResult.ts` tronque à l'identique à
 * la relecture du payload : afficher plus que ce que le stockage garde ferait
 * disparaître une partie de la phrase du candidat sans qu'il le sache.
 */
export const MAX_RATIONALE_CHARS = 240;

/**
 * Plafond de la seule note libre. Les quatre motifs cochés font au plus 145
 * caractères : ce budget-ci garantit que la phrase du candidat entre entière dans
 * `MAX_RATIONALE_CHARS`, donc qu'elle n'est pas amputée à l'enregistrement.
 */
export const MAX_RATIONALE_NOTE_CHARS = 90;

export interface FunctionOption {
  id: FunctionRoleId;
  label: string;
  blurb: string;
  /** Signal du questionnaire sur cet axe, en points : la paillette que lit le candidat. */
  fit: number;
  /** Les métiers de ce domaine que CETTE fonction ouvre chez CE candidat. */
  openings: OccupationMatch[];
  /** Meilleur score de métier sous cet axe : un repère, pas une promesse. */
  bestScore: number;
  recommended: boolean;
  /** Pourquoi cette fonction n'est pas recommandée — pour n'afficher aucun bouton muet. */
  closedReason: string | null;
}

/**
 * Ce que la fiche du domaine transmet à l'engagement : la fonction sous laquelle
 * le candidat a rangé son choix, et la phrase qu'il a pu donner sur ce choix.
 * La seconde est facultative par construction — rien dans le parcours ne doit
 * attendre qu'un candidat réponde à une question bonus.
 */
export interface FunctionChoice {
  functionId: FunctionRoleId;
  rationale?: string;
}

export interface FunctionView {
  /** Les six fonctions, recommandées en tête, puis les autres dans le même ordre de mérite. */
  options: FunctionOption[];
  recommended: FunctionOption[];
  others: FunctionOption[];
  /** Métiers du domaine ouverts à ce candidat, toute fonction confondue : le dénominateur. */
  total: number;
}

function rank(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function functionView(result: ProfileResult, domainId: FunctionalDomainId): FunctionView {
  const { openings } = domainOpenings(result, domainId);

  const options: FunctionOption[] = FUNCTION_ROLE_IDS.map((id) => {
    const underAxis = openings.filter((match) => match.occupation.functions.includes(id));
    const bestScore = underAxis.reduce((best, match) => Math.max(best, match.score), 0);
    const profile = FUNCTION_PROFILES[id];
    return {
      id,
      label: profile.label,
      blurb: profile.blurb,
      fit: rank(result.functionSignals[id] ?? 0),
      openings: underAxis,
      bestScore,
      recommended: false,
      closedReason:
        underAxis.length === 0
          ? 'Aucun métier de ce domaine ne travaille sur cette fonction pour vous aujourd’hui.'
          : underAxis.length < MIN_FUNCTION_OPENINGS
            ? 'Cette fonction ne fait qu’un seul métier dans ce domaine : rien à choisir derrière.'
            : null,
    };
  });

  /**
   * Le signal du candidat décide d'abord : « les fonctions qui matchent » sont les
   * siennes, pas les plus peuplées du catalogue. Le nombre de métiers départage,
   * et une fonction sous le seuil ne peut pas être recommandée.
   */
  const eligible = options
    .filter((option) => option.closedReason === null)
    .sort(
      (a, b) =>
        b.fit - a.fit ||
        b.openings.length - a.openings.length ||
        a.id.localeCompare(b.id)
    );
  const recommendedIds = new Set(
    eligible.slice(0, RECOMMENDED_FUNCTION_COUNT).map((option) => option.id)
  );

  const ordered = options
    .map((option) => ({ ...option, recommended: recommendedIds.has(option.id) }))
    .sort(
      (a, b) =>
        Number(b.recommended) - Number(a.recommended) ||
        b.fit - a.fit ||
        b.openings.length - a.openings.length ||
        a.id.localeCompare(b.id)
    );

  return {
    options: ordered,
    recommended: ordered.filter((option) => option.recommended),
    others: ordered.filter((option) => !option.recommended),
    total: openings.length,
  };
}

/** Les métiers d'une fonction donnée dans un domaine déjà résolu. */
export function openingsForFunction(view: FunctionView, functionId: FunctionRoleId): OccupationMatch[] {
  return view.options.find((option) => option.id === functionId)?.openings ?? [];
}

/** Un intitulé lisible pour la barre de filtre, sinon `null`. */
export function functionLabel(functionId: FunctionRoleId): string {
  return FUNCTION_PROFILES[functionId].label;
}

/**
 * La phrase qui part avec le ciblage. Les motifs cochés sont rangés dans l'ordre
 * proposé, pas dans l'ordre du clic : deux profils qui cochent les mêmes cases
 * doivent produire la même chaîne, sinon rien de tout ça n'est comparable.
 * Rien de coché et rien d'écrit rend `undefined` — une justification vide n'a
 * rien à faire dans un payload.
 */
export function composeRationale(tagIds: string[], note: string): string | undefined {
  const tags = CHOICE_RATIONALES.filter(
    (entry) => tagIds.includes(entry.id)
  ).map((entry) => entry.label);
  const free = note.trim().replace(/\s+/g, ' ');
  const parts = free.length > 0 ? [...tags, free] : tags;
  if (parts.length === 0) {
    return undefined;
  }
  return parts.join(' · ').slice(0, MAX_RATIONALE_CHARS);
}
