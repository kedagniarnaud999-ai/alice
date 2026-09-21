import { CrossOccupation, CROSS_OCCUPATIONS } from '@/data/occupations';
import { CapacitySignals, CareerSituation, DomainScore, FunctionalDomainId, FunctionRoleId } from '@/types/test';
import { FUNCTIONAL_DOMAINS_BY_ID } from '@/data/domains';

/**
 * Le score composité ne sert qu'à ORDONNER : ses composantes fonction et terrain
 * varient peu d'une fiche à l'autre et écrasent l'échelle entre 20 et 58. Juger la
 * confiance sur ce chiffre labelliserait « médiocre » un profil qui coche toutes
 * les jambes d'un métier. La bande se lit donc sur `coreMean`, en points de domaine
 * où ~80 est le plafond réellement atteignable et 45 place déjà un domaine au sommet.
 */
const BAND_ACCESSIBLE = 50;
const BAND_NEXT_STEP = 30;
const CORE_SHARE = 0.6;
const FUNCTION_SHARE = 0.25;
const SECTOR_SHARE = 0.15;

/**
 * Plancher appliqué à chaque domaine clé avant la moyenne géométrique. Sans lui,
 * un seul domaine à 0 ramène le métier à 0 : le classement ne dirait plus
 * « cette intersection vous est fermée », il ne dirait plus rien du tout.
 */
const CORE_FLOOR = 25;
const SITUATION_BONUS = 4;
/** En dessous de ce score normalisé, un domaine clé est une lacune à combler. */
const GAP_THRESHOLD = 45;

export type OccupationBand = 'accessible' | 'prochain_pas' | 'eloigne';

/** Ce que la bande promet au candidat, dans les mots qu'il lit à l'écran. */
export const OCCUPATION_BAND_LABEL: Record<OccupationBand, string> = {
  accessible: 'Dans votre portée',
  prochain_pas: 'Prochain pas',
  eloigne: 'À construire',
};

export const OCCUPATION_BAND_BADGE: Record<OccupationBand, 'success' | 'warning' | 'default'> = {
  accessible: 'success',
  prochain_pas: 'warning',
  eloigne: 'default',
};

/** Du plus proche au plus loin : c'est l'échelle sur laquelle recule la disponibilité. */
const BAND_ORDER: OccupationBand[] = ['accessible', 'prochain_pas', 'eloigne'];

export interface OccupationMatchInput {
  situation: CareerSituation;
  domains: DomainScore[];
  functionSignals: Record<FunctionRoleId, number>;
  /** Temps et matériel disponibles : reculent la bande sans changer aucun score. */
  capacity: CapacitySignals;
}

export interface OccupationMatch {
  occupation: CrossOccupation;
  score: number;
  band: OccupationBand;
  /** La bande a reculé à cause du temps ou du matériel, pas du profil : la fiche doit le dire. */
  demoted: boolean;
  /** Evidence des domaines exigés (moyenne géométrique en points de domaine) : c'est elle qui fixe la bande. */
  coreMean: number;
  functionFit: number;
  sectorFit: number;
  /** Terrain d'application le plus porteur pour ce profil. */
  bestSector: { id: FunctionalDomainId; label: string; score: number } | null;
  /** Domaines exigés par la fiche et score du candidat sur chacun : le « pourquoi » de la fiche. */
  cores: { id: FunctionalDomainId; label: string; score: number }[];
  /** Domaines exigés encore fragiles : ce sont eux qui dictent les modules du parcours. */
  coreGaps: { id: FunctionalDomainId; label: string; score: number }[];
}

export interface OccupationRanking {
  /** Fiches compatibles, triées de la meilleure à la moins bonne. */
  matches: OccupationMatch[];
  /** Fiches emportées par une exclusion explicite : à afficher comme telles, jamais notées. */
  excluded: OccupationMatch[];
  /** Le profil tiendrait une fiche « accessible » sans le recul de disponibilité. */
  capacityBlocked: boolean;
}

function bandOf(coreMean: number, deduction = 0): OccupationBand {
  const base = coreMean >= BAND_ACCESSIBLE ? 0 : coreMean >= BAND_NEXT_STEP ? 1 : BAND_ORDER.length - 1;
  return BAND_ORDER[Math.min(BAND_ORDER.length - 1, base + deduction)];
}

/**
 * Moyenne géométrique pondérée : une intersection exige plusieurs domaines EN
 * MEME TEMPS, donc un profil très fort sur un seul ne doit pas passer devant un
 * profil équilibré. La moyenne arithmétique, elle, noierait une lacune.
 */
function weightedGeometricMean(entries: { value: number; weight: number }[]): number {
  const total = entries.reduce((sum, entry) => sum + entry.weight, 0);
  if (total === 0) return 0;
  const logSum = entries.reduce(
    (sum, entry) => sum + entry.weight * Math.log(Math.max(CORE_FLOOR, Math.min(100, entry.value))),
    0
  );
  return Math.exp(logSum / total);
}

export function matchOccupations(input: OccupationMatchInput): OccupationRanking {
  const byId = new Map<FunctionalDomainId, DomainScore>();
  input.domains.forEach((domain) => byId.set(domain.id, domain));

  const signal = (id: FunctionalDomainId): number => byId.get(id)?.normalized ?? 0;
  const vetoed = (id: FunctionalDomainId): boolean => byId.get(id)?.excluded === true;

  const ranked = CROSS_OCCUPATIONS.map((occupation) => {
    const coreEntries = Object.entries(occupation.core)
      .filter(([, weight]) => (weight ?? 0) > 0)
      .map(([id, weight]) => ({
        id: id as FunctionalDomainId,
        value: signal(id as FunctionalDomainId),
        weight: weight ?? 0,
      }));

    const hardVeto = coreEntries.some((entry) => vetoed(entry.id));
    const coreMean = weightedGeometricMean(coreEntries);

    const functionFit = occupation.functions.length
      ? occupation.functions.reduce((sum, role) => sum + (input.functionSignals[role] ?? 0), 0) /
        occupation.functions.length
      : 0;

    const sectorScores = occupation.sectors
      .filter((id) => !vetoed(id))
      .map((id) => ({ id, label: FUNCTIONAL_DOMAINS_BY_ID[id].label, score: signal(id) }));
    const bestSector = sectorScores.length
      ? sectorScores.reduce((best, current) =>
          current.score > best.score || (current.score === best.score && current.id < best.id) ? current : best
        )
      : null;
    const sectorFit = bestSector?.score ?? 0;

    const raw =
      CORE_SHARE * coreMean + FUNCTION_SHARE * functionFit + SECTOR_SHARE * sectorFit +
      (occupation.situations.includes(input.situation) ? SITUATION_BONUS : 0);

    return {
      match: {
        occupation,
        score: hardVeto ? 0 : Math.min(100, Math.round(raw)),
        band: hardVeto ? 'eloigne' : bandOf(coreMean, input.capacity.bandDeduction),
        demoted:
          !hardVeto && bandOf(coreMean, input.capacity.bandDeduction) !== bandOf(coreMean),
        coreMean: Math.round(coreMean),
        functionFit: Math.round(functionFit),
        sectorFit: Math.round(sectorFit),
        bestSector,
        cores: coreEntries.map((entry) => ({
          id: entry.id,
          label: FUNCTIONAL_DOMAINS_BY_ID[entry.id].label,
          score: Math.round(entry.value),
        })),
        coreGaps: coreEntries
          .filter((entry) => entry.value < GAP_THRESHOLD)
          .map((entry) => ({ id: entry.id, label: FUNCTIONAL_DOMAINS_BY_ID[entry.id].label, score: entry.value }))
          .sort((a, b) => a.score - b.score || a.id.localeCompare(b.id)),
      },
      vetoed: hardVeto,
    };
  });

  const compare = (a: OccupationMatch, b: OccupationMatch): number =>
    b.score - a.score || b.functionFit - a.functionFit || a.occupation.id.localeCompare(b.occupation.id);

  const matches = ranked.filter((entry) => !entry.vetoed).map((entry) => entry.match).sort(compare);
  const excluded = ranked.filter((entry) => entry.vetoed).map((entry) => entry.match).sort(compare);

  return {
    matches,
    excluded,
    // Une fiche aurait été « accessible » sans le recul : l'écran doit le nommer
    // au lieu de laisser lire un « prochain pas » comme un manque de compétence.
    capacityBlocked:
      input.capacity.bandDeduction > 0 &&
      !matches.some((match) => match.band === 'accessible') &&
      matches.some((match) => match.coreMean >= BAND_ACCESSIBLE),
  };
}
