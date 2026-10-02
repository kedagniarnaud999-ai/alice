import { CrossOccupation } from '@/data/occupations';
import { Opportunity } from '@/data/opportunities';

/**
 * Le champ « voies de formation » d'une fiche métier mélange des établissements, des
 * noms de diplômes et des thèmes. Rien ne reliait ces noms au catalogue : le candidat
 * lisait une ligne de texte qui ne menait nulle part.
 *
 * Ce fichier ne crée aucun lien : il ne fait que reconnaître ceux qui existent déjà,
 * en comparant des libellés. Une voie sans correspondance reste une voie sans
 * correspondance, et l'écran doit le dire au lieu de la masquer.
 */

/** Minuscules, sans accents ni ponctuation : « Ecole Supérieure » égale « École supérieure ». */
export const normalizeLabel = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/** Petits mots et mots trop courts : ils ne prouvent rien dans une comparaison de noms. */
const EMPTY_WORDS = new Set([
  'et', 'de', 'des', 'du', 'la', 'le', 'les', 'en', 'un', 'une', 'au', 'aux', 'pour', 'avec', 'sans', 'ou',
  'the', 'of', 'and', 'in', 'to', 'for', 'a',
]);

/**
 * Un seul mot suffisait à déclarer un lien : « Licence AES ou GPA » prétendait
 * rejoindre huit formations, puisque toutes commencent par « Licence ». Un nom
 * commun à une famille entière de diplômes ne distingue rien ; il faut deux mots
 * qui comptent, au moins.
 */
const MIN_MEANINGFUL_TOKENS = 2;

const meaningfulTokens = (value: string): string[] =>
  normalizeLabel(value)
    .split(' ')
    .filter((token) => token.length > 3 && !EMPTY_WORDS.has(token));

/** Le nom de l'école se place après un tiret dans les libellés de formations. */
const schoolOf = (label: string): string => normalizeLabel(label.split(/[—–-]/).pop() ?? '');

/**
 * Degré de ressemblance entre une voie et une ligne du catalogue. Zéro écarte : un
 * lien annoncé pour rien égare plus qu'une ligne sans lien.
 *
 * 3 — l'un des deux noms tient tout entier dans l'autre.
 * 2 — le nom de l'école du catalogue se lit dans la voie, et un autre mot compte avec lui.
 * 1 — tous les mots qui comptent de la voie se lisent dans le libellé, deux au moins.
 */
export function matchStudyPath(path: string, opportunity: Opportunity): 0 | 1 | 2 | 3 {
  const normalizedPath = normalizeLabel(path);
  const normalizedLabel = normalizeLabel(opportunity.label);
  if (!normalizedPath || !normalizedLabel) return 0;
  if (normalizedLabel.includes(normalizedPath) || normalizedPath.includes(normalizedLabel)) return 3;

  const pathTokens = meaningfulTokens(path);
  const labelTokens = new Set(meaningfulTokens(opportunity.label));

  const school = schoolOf(opportunity.label);
  if (school.length > 3 && normalizedPath.includes(school)) {
    const schoolWords = new Set(school.split(' '));
    const programShared = [...labelTokens].filter(
      (token) => !schoolWords.has(token) && normalizedPath.includes(token)
    );
    if (programShared.length >= 1) return 2;
  }

  if (pathTokens.length >= MIN_MEANINGFUL_TOKENS && pathTokens.every((token) => labelTokens.has(token))) {
    return 1;
  }

  return 0;
}

export interface StudyPathLink {
  /** Le nom tel qu'il est écrit dans la fiche métier. */
  path: string;
  /** Les lignes du catalogue qui portent ce nom, au degré de ressemblance le plus fort. */
  matches: Opportunity[];
}

/** Au-delà, la fiche ne montre plus une voie : elle montre le catalogue entier. */
const MAX_MATCHES_PER_PATH = 3;

/** Les voies d'une fiche, chacune avec ce que le catalogue lui répond — éventuellement rien. */
export function linkStudyPaths(
  occupation: CrossOccupation,
  opportunities: Opportunity[]
): StudyPathLink[] {
  return occupation.studyPaths.map((path) => {
    const scored = opportunities.map((opportunity) => ({ opportunity, score: matchStudyPath(path, opportunity) }));
    const best = Math.max(0, ...scored.map((entry) => entry.score));
    return {
      path,
      matches: best === 0 ? [] : scored.filter((entry) => entry.score === best).slice(0, MAX_MATCHES_PER_PATH).map((entry) => entry.opportunity),
    };
  });
}
