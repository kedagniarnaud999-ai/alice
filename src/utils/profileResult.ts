import { CareerSituation, DomainScore, FunctionalDomainId, ProfileResult } from '@/types/test';
import { ALL_DOMAIN_IDS } from '@/data/domains';
import { ASSESSMENT_VERSION } from '@/data/questions';

const SITUATIONS: CareerSituation[] = ['bachelier', 'jeune_diplome', 'reconversion', 'professionnel'];

const KNOWN_DOMAINS = new Set<string>(ALL_DOMAIN_IDS);

const asText = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.trim() ? value : fallback;

const asStringList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

/**
 * Un profil vient de Supabase ou de localStorage : il peut dater d'une version
 * antérieure du test, qui ne contenait ni `domains`, ni `topDomainIds`, ni
 * `situation`. Le moteur de parcours suppose ces champs présents, donc lire un
 * ancien payload sans contrôle casse l'écran de résultats de tout compte créé
 * avant la refonte. `null` signifie « exploitable nulle part » : le candidat
 * doit simplement refaire le test.
 */
export function normalizeProfileResult(value: unknown): ProfileResult | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;

  if (candidate.assessmentVersion !== ASSESSMENT_VERSION) {
    return null;
  }

  if (!SITUATIONS.includes(candidate.situation as CareerSituation)) {
    return null;
  }

  const domains = asRawDomains(candidate.domains);
  if (!domains) {
    return null;
  }

  const topDomainIds = asStringList(candidate.topDomainIds).filter(
    (id): id is FunctionalDomainId => KNOWN_DOMAINS.has(id)
  );

  return {
    assessmentVersion: ASSESSMENT_VERSION,
    situation: candidate.situation as CareerSituation,
    profileType: asText(candidate.profileType, 'Profil en construction'),
    profileDescription: asText(
      candidate.profileDescription,
      'Reprenez le test pour obtenir une description personnalisée de votre profil.'
    ),
    naturalTalents: asStringList(candidate.naturalTalents),
    motivationDrivers: asStringList(candidate.motivationDrivers),
    primaryInterests: asStringList(candidate.primaryInterests),
    careerStage: asText(candidate.careerStage, 'Situation à préciser'),
    feasibilityAssessment: asText(candidate.feasibilityAssessment, 'À évaluer avec un conseiller.'),
    nextActions: asStringList(candidate.nextActions),
    domains,
    topDomainIds: topDomainIds.length ? topDomainIds : domains.filter((d) => d.rank <= 3 && !d.excluded).map((d) => d.id),
    excludedDomainIds: asStringList(candidate.excludedDomainIds).filter(
      (id): id is FunctionalDomainId => KNOWN_DOMAINS.has(id)
    ),
  };
}

function asRawDomains(value: unknown): DomainScore[] | null {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  const domains = value
    .filter(
      (entry): entry is DomainScore =>
        !!entry &&
        typeof entry === 'object' &&
        typeof (entry as DomainScore).id === 'string' &&
        KNOWN_DOMAINS.has((entry as DomainScore).id)
    )
    .map((entry) => ({
      id: entry.id,
      label: asText(entry.label, entry.id),
      raw: Number.isFinite(entry.raw) ? entry.raw : 0,
      maxPossible: Number.isFinite(entry.maxPossible) ? entry.maxPossible : 0,
      normalized: Number.isFinite(entry.normalized) ? Math.round(entry.normalized) : 0,
      rank: Number.isFinite(entry.rank) ? entry.rank : 0,
      reasons: asStringList(entry.reasons),
      excluded: entry.excluded === true,
    }));

  return domains.length ? domains : null;
}
