import { DomainScore, FunctionalDomainId, ProfileResult, Targeting } from '@/types/test';
import { CrossOccupation, CROSS_OCCUPATIONS } from '@/data/occupations';
import { specializationsForDomain } from '@/data/specializations';
import { matchOccupations } from '@/utils/occupationMatcher';

/**
 * Résolution `domaine → débouchés → spécialités`, sans React ni état : l'écran
 * de ciblage et les contrôles partagent cette lecture, ils ne peuvent pas se
 * contredire sur ce qu'ouvre un domaine.
 */

/**
 * Les fiches qui ouvrent un domaine, tenues par l'exigence qu'elles en portent.
 *
 * Une fiche qui ne pose le domaine qu'en terrain d'application (`sectors`) vient
 * après celles qui l'exigent en cœur : elle dit où l'on travaillerait, pas ce
 * qu'on étudierait — le même garde-fou que `relevanceOf` côté offres, qui
 * écarte les `sectors` pour la même raison.
 */
export function domainOccupations(domainId: FunctionalDomainId): CrossOccupation[] {
  return CROSS_OCCUPATIONS.filter(
    (occupation) => (occupation.core[domainId] ?? 0) > 0 || occupation.sectors.includes(domainId)
  ).sort(
    (a, b) =>
      (b.core[domainId] ?? 0) - (a.core[domainId] ?? 0) || a.id.localeCompare(b.id)
  );
}

/**
 * Les domaines entre lesquels choisir une jambe phare : tout ce que le test n'a
 * pas écarté explicitement, y compris hors du top 3. Le candidat reste libre de
 * viser un domaine mal classé que ses réponses ne fermaient pas.
 */
export function flagshipCandidates(result: ProfileResult): DomainScore[] {
  return result.domains
    .filter((domain) => !domain.excluded)
    .sort((a, b) => b.normalized - a.normalized || a.id.localeCompare(b.id));
}

/**
 * Le pré-remplissage de l'entonnoir pour un domaine : deux débouchés et, si l'un
 * des deux y mène, une spécialité.
 *
 * Deux plutôt que trois : la troisième case se saute et le parcours n'en a pas
 * besoin pour être tailé. La spécialité n'est retenue que si elle porte sur une
 * fiche déjà choisie — un axe pré-coché qui n'a rien à voir avec les débouchés
 * serait la preuve que le catalogue est décoratif.
 */
export function focusFromResult(result: ProfileResult, domainId: FunctionalDomainId): Targeting {
  const openings = domainOccupations(domainId);
  const weightOf = new Map(openings.map((occupation) => [occupation.id, occupation.core[domainId] ?? 0]));
  const allowed = new Set(weightOf.keys());

  const ranked = matchOccupations(result)
    .matches.filter((match) => allowed.has(match.occupation.id))
    .sort(
      (a, b) =>
        (weightOf.get(b.occupation.id) ?? 0) - (weightOf.get(a.occupation.id) ?? 0) ||
        b.score - a.score ||
        a.occupation.id.localeCompare(b.occupation.id)
    );

  const occupationIds = ranked.slice(0, 2).map((match) => match.occupation.id);
  const picked = new Set(occupationIds);
  const specialization = specializationsForDomain(domainId).find((entry) =>
    entry.occupationIds.some((id) => picked.has(id))
  );

  return {
    flagshipDomainId: domainId,
    occupationIds,
    specializationIds: specialization ? [specialization.id] : [],
  };
}
