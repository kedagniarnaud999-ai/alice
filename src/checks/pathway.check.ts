import { MODULE_CATALOG, LearningModule } from '@/data/modules';
import { FUNCTIONAL_DOMAINS_BY_ID } from '@/data/domains';
import { PSYCH_TRAITS } from '@/data/psychAffinity';
import { orientationQuestions } from '@/data/questions';
import { TestAnalyzer, getVisibleQuestions } from '@/utils/testAnalyzer';
import { normalizeProfileResult } from '@/utils/profileResult';
import { pathwayEngine } from '@/utils/pathwayEngine';
import type { FunctionalDomainId, Question, TestResponse } from '@/types/test';

const DIFFICULTY_LEVEL: Record<LearningModule['difficulty'], number> = {
  Debutant: 0,
  Intermediaire: 1,
  Avance: 2,
};

const FORMATS: readonly LearningModule['format'][] = ['Video', 'Projet', 'Lecture', 'Interactif'];
const DOMAIN_IDS = Object.keys(FUNCTIONAL_DOMAINS_BY_ID) as FunctionalDomainId[];

/** Conventions admises par le moteur, rappelées ici pour servir d'oracle. */
const HOURS_PER_WEEK = 5;
const INTEREST_SHARE = 0.7;
const PSYCH_SHARE = 0.3;
const PSYCH_REASON_MARKER = 'cohérent avec ce domaine';
const MIN_MODULES_PER_TRACK = 3;
const MAX_MODULES_PER_TRACK = 5;
const QUICK_WIN_COUNT = 3;

const ALL_SITUATIONS = ['s_bachelier', 's_diplome', 's_reconversion', 's_pro'];

function requireQuestion(id: string): Question {
  const question = orientationQuestions.find((entry) => entry.id === id);
  if (!question) throw new Error(`Question introuvable dans le catalogue : ${id}`);
  return question;
}

function expectedWeeks(modules: LearningModule[]): number {
  const total = modules.reduce((sum, module) => {
    const value = Number.parseFloat(module.duration.replace(',', '.'));
    const weeks = /semaine/i.test(module.duration) ? value : value / HOURS_PER_WEEK;
    return sum + (Number.isFinite(weeks) ? weeks : 0);
  }, 0);
  return Math.max(1, Math.round(total));
}

function domainIdOfTrack(trackId: string): FunctionalDomainId {
  return trackId.replace('track_', '') as FunctionalDomainId;
}

function answerEvery(
  offset: number,
  choose: (question: Question, rotate: number) => string[]
): TestResponse[] {
  const gate = requireQuestion('q_situation');
  const responses: TestResponse[] = [
    { questionId: gate.id, selectedOptions: [gate.options[offset % gate.options.length].id] },
  ];

  for (let guard = 0; guard < 200; guard += 1) {
    const visible = getVisibleQuestions(responses);
    const next = visible.find(
      (question) => !responses.some((response) => response.questionId === question.id)
    );
    if (!next) break;
    responses.push({
      questionId: next.id,
      selectedOptions: choose(next, orientationQuestions.indexOf(next) * 3 + offset),
    });
  }

  return responses;
}

/** Réponses « candidat lambda » : de tout, sans parti pris, comme un clic au hasard. */
function walk(answerRatio: number, offset: number): TestResponse[] {
  const pick = (question: Question, rotate: number): string[] => {
    const count =
      question.type === 'single'
        ? 1
        : Math.max(1, Math.min(question.options.length, Math.ceil(question.options.length / 2)));
    const picked = new Set<string>();
    for (let k = 0; k < count; k += 1) {
      picked.add(question.options[(rotate + k) % question.options.length].id);
    }
    return Array.from(picked);
  };

  const responses = answerEvery(offset, pick);
  const target = Math.max(2, Math.round(getVisibleQuestions(responses).length * answerRatio));
  return responses.slice(0, Math.max(2, target));
}

/** Réponses taillées pour un seul trait psychologique : isolent l'apport de la fusion. */
function walkForTrait(trait: string, offset: number): TestResponse[] {
  return answerEvery(offset, (question) => {
    const best = [...question.options].sort(
      (a, b) => (b.weights?.[trait] ?? 0) - (a.weights?.[trait] ?? 0)
    )[0];
    return [best.id];
  });
}

const failures: string[] = [];
const notes: string[] = [];

function check(condition: boolean, message: string): void {
  if (!condition) failures.push(message);
}

const gate = requireQuestion('q_situation');
check(gate.options.length === ALL_SITUATIONS.length,
  `Le portique propose ${gate.options.length} situations au lieu de ${ALL_SITUATIONS.length}`);

const seenIds = new Set<string>();
MODULE_CATALOG.forEach((module) => {
  check(!seenIds.has(module.id), `Identifiant de module dupliqué : ${module.id}`);
  seenIds.add(module.id);
  check(Object.prototype.hasOwnProperty.call(DIFFICULTY_LEVEL, module.difficulty),
    `Difficulté hors contrat pour ${module.id} : « ${module.difficulty} »`);
  check(FORMATS.includes(module.format), `Format hors contrat pour ${module.id} : « ${module.format} »`);
  check(typeof module.isFree === 'boolean', `isFree non booléen pour ${module.id}`);
  check((module.domains ?? []).every((domain) => DOMAIN_IDS.includes(domain)), `Domaine inconnu rattaché à ${module.id}`);
  check(/semaine|heure/i.test(module.duration), `Durée non convertible pour ${module.id} : « ${module.duration} »`);
  check((module.skills ?? []).length > 0, `Compétences manquantes pour ${module.id}`);
});

DOMAIN_IDS.forEach((domainId) => {
  const count = MODULE_CATALOG.filter((module) => (module.domains ?? []).includes(domainId)).length;
  check(count >= MIN_MODULES_PER_TRACK,
    `Couverture insuffisante pour ${domainId} : ${count} module(s), un parcours complet en exige ${MIN_MODULES_PER_TRACK}`);
});

const visibility = new Map<string, Set<string>>();
const employabilityIds = new Set(
  MODULE_CATALOG.filter((module) => module.category === 'Employabilite').map((module) => module.id)
);
let fusionChangesRanking = false;

gate.options.forEach((situationOption, offset) => {
  const responses = walk(1, offset);
  const result = new TestAnalyzer(responses).analyze();
  const pathway = pathwayEngine.generatePathway(result);
  const label = situationOption.id;

  check(result.assessmentVersion === 2, `${label} : profil produit par une version obsolète du test`);
  check(result.topDomainIds.length > 0, `${label} : aucun domaine prioritaire`);
  check(result.topDomainIds.every((domainId) => DOMAIN_IDS.includes(domainId)), `${label} : domaine prioritaire inconnu`);
  check(result.excludedDomainIds.every((domainId) => !result.topDomainIds.includes(domainId)),
    `${label} : un domaine exclu est malgré tout recommandé`);

  const visible = getVisibleQuestions(responses);
  visible.forEach((question) => {
    if (!visibility.has(question.id)) visibility.set(question.id, new Set());
    visibility.get(question.id)?.add(label);
  });

  check(visible.length >= 20, `${label} : seulement ${visible.length} questions visibles, l'entonnoir est trop court`);
  check(responses.length === visible.length,
    `${label} : ${responses.length} réponses pour ${visible.length} questions visibles — une question bloque la fin du test`);

  result.domains.forEach((domain) => {
    check(domain.normalized >= 0 && domain.normalized <= 100,
      `${label} : score normalisé hors bornes pour ${domain.id} (${domain.normalized})`);
    if (domain.maxPossible <= 0) return;
    const interests = (domain.raw / domain.maxPossible) * 100;
    check(domain.normalized >= interests * INTEREST_SHARE - 1 &&
        domain.normalized <= interests * INTEREST_SHARE + PSYCH_SHARE * 100 + 1,
      `${label} : ${domain.id} à ${domain.normalized}% sort du couloir « ${INTEREST_SHARE}× intérêts + ${PSYCH_SHARE}× psychologie »`);
  });

  const measurable = result.domains.filter((domain) => domain.maxPossible > 0);
  const byInterests = [...measurable].sort((a, b) => b.raw / b.maxPossible - a.raw / a.maxPossible).map((d) => d.id);
  const byFusion = [...measurable].sort((a, b) => b.normalized - a.normalized).map((d) => d.id);
  if (byInterests.join('|') !== byFusion.join('|')) fusionChangesRanking = true;

  check(pathway.recommendedTracks.length === result.topDomainIds.length,
    `${label} : ${pathway.recommendedTracks.length} parcours pour ${result.topDomainIds.length} domaines prioritaires`);

  pathway.recommendedTracks.forEach((track) => {
    check(track.modules.length >= MIN_MODULES_PER_TRACK && track.modules.length <= MAX_MODULES_PER_TRACK,
      `${label} / ${track.title} : ${track.modules.length} modules`);
    check(track.estimatedWeeks === expectedWeeks(track.modules),
      `${label} / ${track.title} : ${track.estimatedWeeks} semaine(s) au lieu des ${expectedWeeks(track.modules)} calculées`);
    check(track.targetSkills.length > 0, `${label} / ${track.title} : aucune compétence visée`);

    track.modules.forEach((module) => {
      check((module.domains ?? []).includes(domainIdOfTrack(track.id)),
        `${label} / ${track.title} : ${module.id} n'appartient pas à ce domaine`);
    });

    for (let i = 1; i < track.modules.length; i += 1) {
      const before = track.modules[i - 1];
      const after = track.modules[i];
      if (before.isFree !== after.isFree) {
        check(before.isFree, `${label} / ${track.title} : ${after.id} (payant) est placé avant ${before.id}`);
      } else {
        check(DIFFICULTY_LEVEL[before.difficulty] <= DIFFICULTY_LEVEL[after.difficulty],
          `${label} / ${track.title} : progression inversée à ${after.id}`);
      }
    }
  });

  const topDomain = result.domains.find((domain) => domain.id === domainIdOfTrack(pathway.recommendedTracks[0]?.id ?? ''));
  check((topDomain?.reasons.length ?? 0) > 0, `${label} : le premier parcours recommandé n'est justifié par aucune raison`);

  check(pathway.quickWins.length === QUICK_WIN_COUNT,
    `${label} : ${pathway.quickWins.length} victoires rapides au lieu de ${QUICK_WIN_COUNT}`);
  check(pathway.quickWins.every((module) => module.isFree && module.difficulty === 'Debutant'),
    `${label} : une victoire rapide n'est pas gratuite et débutante`);
  check(pathway.quickWins.every((module) =>
      employabilityIds.has(module.id) ||
      (module.domains ?? []).some((domain) => result.topDomainIds.includes(domain))),
    `${label} : une victoire rapide sort des domaines prioritaires et de l'employabilité`);
  check(pathway.milestones.length === 3, `${label} : ${pathway.milestones.length} jalons`);
  check(pathway.longTermGoals.length === 3, `${label} : ${pathway.longTermGoals.length} objectifs long terme`);

  const partial = new TestAnalyzer(walk(0.4, offset)).analyze();
  const saturated = partial.domains.filter((domain) => domain.normalized >= 100).length;
  check(partial.topDomainIds.length > 0, `${label} : un questionnaire abandonné ne propose plus aucun domaine`);
  check(saturated <= 1,
    `${label} : ${saturated} domaines à 100 % sur un questionnaire inachevé — la normalisation dépend encore du nombre de réponses`);

  const summary = pathway.recommendedTracks
    .map((track) => `${track.title.replace('Parcours ', '')} (${track.modules.length} modules, ${track.estimatedWeeks} sem.)`)
    .join(' · ');
  notes.push(`${result.situation} — ${responses.length}/${visible.length} questions, max ${Math.max(
    ...result.domains.map((domain) => domain.normalized))}% — ${summary}`);
});

check(fusionChangesRanking,
  'Le classement des domaines est identique à celui des seuls intérêts déclarés : la composante psychologique de la fusion est inerte');

const PSYCH_TRAIT_LIST: string[] = [...PSYCH_TRAITS];
const psychReasonSeen = PSYCH_TRAIT_LIST.some((trait, index) => {
  const focused = new TestAnalyzer(walkForTrait(trait, index)).analyze();
  return focused.domains.some((domain) =>
    domain.reasons.some((reason) => reason.includes(PSYCH_REASON_MARKER))
  );
});
check(psychReasonSeen,
  `Aucune affinité psychologique n'apparaît dans les justifications, même profil taillé pour un seul trait : la fusion affichée est muette`);

function onlyVisibleTo(questionId: string, situations: string[]): void {
  const seen = Array.from(visibility.get(questionId) ?? []).sort().join(',');
  const expected = [...situations].sort().join(',');
  check(seen === expected,
    `${questionId} est posée à [${seen || 'personne'}] au lieu de [${expected}]`);
}

onlyVisibleTo('q_situation', ALL_SITUATIONS);
onlyVisibleTo('q_bac_series', ['s_bachelier']);
onlyVisibleTo('q_transferable', ['s_reconversion']);
onlyVisibleTo('q_cognitive', ALL_SITUATIONS);
onlyVisibleTo('q_interest_fields', ALL_SITUATIONS);
onlyVisibleTo('q_constraint', ALL_SITUATIONS);

/**
 * `profiles.payload` est une colonne JSONB : le profil repart en texte et revient
 * par `normalizeProfileResult`. Un champ qui ne survit pas à ce voyage ne casse
 * rien au moment de l'écriture, il vide seulement l'écran de parcours à la relecture.
 */
for (let offset = 0; offset < ALL_SITUATIONS.length; offset += 1) {
  const label = `situation ${ALL_SITUATIONS[offset]}`;
  const fresh = new TestAnalyzer(walk(1, offset)).analyze();
  const stored = normalizeProfileResult(JSON.parse(JSON.stringify(fresh)));

  check(stored !== null, `${label} : un profil tout juste calculé est refusé par le normaliseur`);
  if (!stored) continue;

  check(
    JSON.stringify(normalizeProfileResult(JSON.parse(JSON.stringify(stored)))) === JSON.stringify(stored),
    `${label} : l'aller-retour de lecture déforme le profil enregistré`
  );
  check(
    stored.situation === fresh.situation &&
      stored.topDomainIds.join(',') === fresh.topDomainIds.join(',') &&
      stored.domains.length === fresh.domains.length &&
      stored.nextActions.length === fresh.nextActions.length,
    `${label} : des champs du parcours se perdent dans le payload enregistré`
  );
  check(
    !/^[A-Za-z0-9_]+$/.test(stored.careerStage),
    `${label} : career_stage part vers SQL comme une clé machine (« ${stored.careerStage} ») et non un libellé`
  );
}

check(
  normalizeProfileResult({
    ...JSON.parse(JSON.stringify(new TestAnalyzer(walk(1, 0)).analyze())),
    assessmentVersion: undefined,
  }) === null,
  'Un profil sans version de test est accepté : les comptes antérieurs à la refonte ressuscitent'
);
check(
  normalizeProfileResult({
    assessmentVersion: 2,
    situation: 'bachelier',
    domains: [{ id: 'domaine_inexistant', score: 50, normalized: 50, rank: 1, reasons: [] }],
  }) === null,
  'Un profil dont tous les domaines sont inconnus est normalisé au lieu d’être rejeté'
);

console.log(`Contrôles du parcours — catalogue de ${MODULE_CATALOG.length} modules, ${DOMAIN_IDS.length} domaines, ${gate.options.length} situations`);
notes.forEach((note) => console.log(`  ${note}`));

if (failures.length > 0) {
  console.error(`\n${failures.length} contrôle(s) en échec :`);
  failures.forEach((failure) => console.error(`  - ${failure}`));
  throw new Error('Contrôles du parcours en échec.');
}

console.log('\nTous les contrôles passent.');
