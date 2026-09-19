import { MODULE_CATALOG, LearningModule } from '@/data/modules';
import { FUNCTIONAL_DOMAINS_BY_ID } from '@/data/domains';
import { PSYCH_TRAITS, FUNCTION_ROLE_IDS } from '@/data/psychAffinity';
import { CROSS_OCCUPATIONS } from '@/data/occupations';
import { orientationQuestions } from '@/data/questions';
import { TestAnalyzer, getVisibleQuestions } from '@/utils/testAnalyzer';
import { matchOccupations } from '@/utils/occupationMatcher';
import { normalizeProfileResult } from '@/utils/profileResult';
import { pathwayEngine, buildTrackForOccupation } from '@/utils/pathwayEngine';
import type { LearningTrack } from '@/utils/pathwayEngine';
import type { CareerSituation, FunctionRoleId, FunctionalDomainId, Question, QuestionOption, TestResponse } from '@/types/test';

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
const CAREER_SITUATIONS: CareerSituation[] = ['bachelier', 'jeune_diplome', 'reconversion', 'professionnel'];
/** Une fiche isolée n'est pas un choix : chaque domaine doit ouvrir plusieurs intersections. */
const MIN_FICHES_PER_DOMAIN = 4;

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

/**
 * Contrat commun de toute piste, qu'elle vienne d'un domaine ou d'un métier
 * croisé : taille tenable, durée calculée et non décrétée, compétences nommées,
 * progression gratuite → payante puis simple → avancée.
 */
function checkTrackContract(track: LearningTrack, label: string): void {
  const name = `${label} / ${track.title}`;

  check(track.modules.length >= MIN_MODULES_PER_TRACK && track.modules.length <= MAX_MODULES_PER_TRACK,
    `${name} : ${track.modules.length} modules`);
  check(track.estimatedWeeks === expectedWeeks(track.modules),
    `${name} : ${track.estimatedWeeks} semaine(s) au lieu des ${expectedWeeks(track.modules)} calculées`);
  check(track.targetSkills.length > 0, `${name} : aucune compétence visée`);

  for (let i = 1; i < track.modules.length; i += 1) {
    const before = track.modules[i - 1];
    const after = track.modules[i];
    if (before.isFree !== after.isFree) {
      check(before.isFree, `${name} : ${after.id} (payant) est placé avant ${before.id}`);
    } else {
      check(DIFFICULTY_LEVEL[before.difficulty] <= DIFFICULTY_LEVEL[after.difficulty],
        `${name} : progression inversée à ${after.id}`);
    }
  }
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

/**
 * Réponses calibrées pour cumuler TOUS les domaines exigés par une fiche métier :
 * à chaque question, on recharge le cœur le plus en retard par rapport à son propre
 * maximum théorique. Un profil ainsi ciblé doit rendre la fiche accessible — sinon
 * c'est la fiche qui est morte, ou le questionnaire qui est muet sur ce domaine.
 */
function walkForCores(
  cores: Partial<Record<FunctionalDomainId, number>>,
  offset: number,
  forceExclude?: FunctionalDomainId
): TestResponse[] {
  const coreIds = Object.keys(cores) as FunctionalDomainId[];
  const achieved: Partial<Record<FunctionalDomainId, number>> = {};
  const maxima: Partial<Record<FunctionalDomainId, number>> = {};

  coreIds.forEach((id) => {
    maxima[id] = Math.max(
      1,
      orientationQuestions.reduce((sum, question) => {
        const cap = question.type === 'single' ? 1 : question.maxSelections ?? question.options.length;
        return (
          sum +
          question.options
            .map((option) => option.domains?.[id] ?? 0)
            .sort((a, b) => b - a)
            .slice(0, cap)
            .reduce((total, value) => total + value, 0)
        );
      }, 0)
    );
    achieved[id] = 0;
  });

  const valueOf = (option: QuestionOption): number =>
    coreIds.reduce(
      (sum, id) => sum + ((cores[id] ?? 0) * (option.domains?.[id] ?? 0)) / (1 + (achieved[id] ?? 0)),
      0
    );

  return answerEvery(offset, (question) => {
    if (forceExclude && question.options.some((option) => option.excludes?.includes(forceExclude))) {
      const option = question.options.find((entry) => entry.excludes?.includes(forceExclude));
      return option ? [option.id] : [];
    }

    const candidates = question.options.filter((option) => (option.excludes?.length ?? 0) === 0);
    if (!candidates.length) return [];

    const strong = candidates.filter((option) => valueOf(option) > 0).sort((a, b) => valueOf(b) - valueOf(a));
    const pool = strong.length ? strong : [candidates[0]];
    const cap = question.type === 'single' ? 1 : question.maxSelections ?? pool.length;
    const chosen = pool.slice(0, cap);

    chosen.forEach((option) =>
      coreIds.forEach((id) => {
        achieved[id] = (achieved[id] ?? 0) + (option.domains?.[id] ?? 0) / (maxima[id] ?? 1);
      })
    );

    return chosen.map((option) => option.id);
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
    checkTrackContract(track, label);

    track.modules.forEach((module) => {
      check((module.domains ?? []).includes(domainIdOfTrack(track.id)),
        `${label} / ${track.title} : ${module.id} n'appartient pas à ce domaine`);
    });
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
onlyVisibleTo('q_missions', ALL_SITUATIONS);
onlyVisibleTo('q_target_sectors', ALL_SITUATIONS);
onlyVisibleTo('q_missions_refuse', ALL_SITUATIONS);

/**
 * Un axe qu'aucune question visible ne permet de déclarer retombe sur la seule
 * projection psychologique : la fiche métier qui l'exige devient injoignable pour
 * cette branche. Le refus compte autant que le goût — éliminer est la moitié du
 * dispositif, et sans option négative un « je ne veux plus de ça » reste muet.
 */
gate.options.forEach((situationOption) => {
  const label = situationOption.id;
  const visibleQuestion = (question: Question): boolean =>
    visibility.get(question.id)?.has(label) === true;

  const silent = FUNCTION_ROLE_IDS.filter(
    (role) =>
      !orientationQuestions.some(
        (question) => visibleQuestion(question) && question.options.some((option) => (option.functions?.[role] ?? 0) > 0)
      )
  );
  check(silent.length === 0,
    `${label} : aucune question visible ne laisse déclarer ${silent.join(', ')} — axe réduit à l'implicite`);

  const unfalsifiable = FUNCTION_ROLE_IDS.filter(
    (role) =>
      !orientationQuestions.some(
        (question) => visibleQuestion(question) && question.options.some((option) => (option.functions?.[role] ?? 0) < 0)
      )
  );
  check(unfalsifiable.length === 0,
    `${label} : aucun refus possible pour ${unfalsifiable.join(', ')} — l'élimination n'existe pas sur cette branche`);
});

function withAnswer(responses: TestResponse[], questionId: string, optionIds: string[]): TestResponse[] {
  return [
    ...responses.filter((response) => response.questionId !== questionId),
    { questionId, selectedOptions: optionIds },
  ];
}

const intersectionCores: Partial<Record<FunctionalDomainId, number>> = { administration: 3, ict: 3 };
const calmResponses = walkForCores(intersectionCores, 3);
const calm = new TestAnalyzer(calmResponses).analyze();
const refused = new TestAnalyzer(withAnswer(calmResponses, 'q_missions_refuse', ['rf_manage'])).analyze();
check(
  refused.functionSignals.coordination < calm.functionSignals.coordination,
  `Refuser le management laisse la coordination à ${refused.functionSignals.coordination} contre ${calm.functionSignals.coordination} : le refus n'est pas entendu`
);
check(
  refused.functionSignals.conception === calm.functionSignals.conception,
  `Refuser le management déplace aussi la conception (${calm.functionSignals.conception} → ${refused.functionSignals.conception}) : la pénalité fuiterait sur les autres axes`
);

/** Deux domaines à la fois doit rester exprimable : sinon toute intersection reste sous la bande accessible. */
let starvedLeg = '';
CROSS_OCCUPATIONS.forEach((occupation, index) => {
  if (starvedLeg) return;
  const result = new TestAnalyzer(walkForCores(occupation.core, index)).analyze();
  const legs = (Object.keys(occupation.core) as FunctionalDomainId[]).map(
    (id) => result.domains.find((domain) => domain.id === id)?.normalized ?? 0
  );
  if (Math.min(...legs) < 40) {
    starvedLeg = `${occupation.id} : meilleur profil obtenu [${legs.join(', ')}], une jambe reste sous 40`;
  }
});
check(!starvedLeg, `Le questionnaire ne sait pas porter deux domaines en même temps — ${starvedLeg}`);

/**
 * Parcours taillé pour un métier croisé. Bâtie sur l'union des pools, la piste
 * peut se refermer sur le domaine le mieux fourni : la seconde jambe disparaît
 * alors du parcours, alors que l'écran affiche un métier d'intersection.
 */
CROSS_OCCUPATIONS.forEach((occupation) => {
  const track = buildTrackForOccupation(occupation);
  check(track !== null, `${occupation.title} : aucun module trouvé, le métier reste sans parcours`);
  if (!track) return;

  checkTrackContract(track, occupation.id);

  const coreIds = Object.keys(occupation.core) as FunctionalDomainId[];
  coreIds.forEach((domainId) => {
    const share = track.modules.filter((module) => (module.domains ?? []).includes(domainId)).length;
    check(share > 0, `${occupation.title} : ${domainId} n'apporte aucun module, la jambe est hors parcours`);
  });
  check(
    track.modules.every((module) => (module.domains ?? []).some((domain) => coreIds.includes(domain))),
    `${occupation.title} : un module étranger au cœur s'est glissé dans le parcours`
  );
});

const occupationPathway = pathwayEngine.generatePathway(calm, CROSS_OCCUPATIONS[0]);
const plainPathway = pathwayEngine.generatePathway(calm);
check(occupationPathway.occupationTitle === CROSS_OCCUPATIONS[0].title,
  'Le parcours taillé pour un métier ne rend pas son intitulé : la page reste générique');
check(occupationPathway.recommendedTracks[0]?.id === `occupation_${CROSS_OCCUPATIONS[0].id}`,
  'La piste du métier visé n’ouvre pas le parcours');
check(
  occupationPathway.recommendedTracks.slice(1).map((track) => track.id).join(',') ===
    plainPathway.recommendedTracks.map((track) => track.id).join(','),
  'Poser une fiche métier efface les pistes par domaine au lieu de s’y ajouter'
);
check(
  JSON.parse(JSON.stringify(occupationPathway)).occupationTitle === occupationPathway.occupationTitle,
  'occupationTitle ne survit pas à la sauvegarde locale du parcours'
);

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
    FUNCTION_ROLE_IDS.every(
      (role) =>
        Number.isInteger(fresh.functionSignals[role]) &&
        fresh.functionSignals[role] >= 0 &&
        fresh.functionSignals[role] <= 100 &&
        stored.functionSignals[role] === fresh.functionSignals[role]
    ),
    `${label} : un axe fonctionnel est absent, hors 0..100, ou difforme après relecture du payload`
  );
  check(
    FUNCTION_ROLE_IDS.some((role) => fresh.functionSignals[role] > 0),
    `${label} : aucun signal fonctionnel calculé, les fiches métiers ne pourront plus être triées`
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

/**
 * Un métier croisé n'a d'intérêt que s'il est atteignable : une fiche que aucun
 * profil ne peut faire remonter est du texte mort, et une fiche que le cross
 * n'ajoute jamais aux domaines prioritaires ne fait que répéter le silo.
 */
const occupationIds = new Set<string>();
CROSS_OCCUPATIONS.forEach((occupation) => {
  check(!occupationIds.has(occupation.id), `Identifiant de métier dupliqué : ${occupation.id}`);
  occupationIds.add(occupation.id);

  const coreIds = Object.keys(occupation.core) as FunctionalDomainId[];
  check(coreIds.length >= 2, `${occupation.id} : ${coreIds.length} domaine(s) de cœur, une intersection s'en exige 2`);
  check(coreIds.every((id) => DOMAIN_IDS.includes(id)), `${occupation.id} : domaine de cœur hors taxonomie`);
  check(coreIds.every((id) => (occupation.core[id] ?? 0) >= 1 && (occupation.core[id] ?? 0) <= 3),
    `${occupation.id} : poids de cœur hors échelle 1..3`);
  check(occupation.sectors.length > 0 && occupation.sectors.every((id) => DOMAIN_IDS.includes(id)),
    `${occupation.id} : terrain d'application inconnu ou absent`);
  check(occupation.functions.length > 0 && occupation.functions.every((role) => FUNCTION_ROLE_IDS.includes(role)),
    `${occupation.id} : axe fonctionnel inconnu`);
  check(occupation.situations.length > 0 && occupation.situations.every((s) => CAREER_SITUATIONS.includes(s)),
    `${occupation.id} : situation éligible hors contrat`);
  check(occupation.skills.length > 0, `${occupation.id} : aucune compétence à développer`);
  check(occupation.studyPaths.length > 0, `${occupation.id} : aucune voie de formation`);
  check(occupation.context.length > 60, `${occupation.id} : contexte trop court pour être lisible`);
});

DOMAIN_IDS.forEach((domainId) => {
  const count = CROSS_OCCUPATIONS.filter(
    (occupation) => (occupation.core[domainId] ?? 0) > 0 || occupation.sectors.includes(domainId)
  ).length;
  check(count >= MIN_FICHES_PER_DOMAIN,
    `${domainId} : ${count} fiche(s) croisée(s) le mentionnent, un choix réel en exige ${MIN_FICHES_PER_DOMAIN}`);
});

let geometricPenaltySeen = false;
CROSS_OCCUPATIONS.forEach((occupation, index) => {
  const result = new TestAnalyzer(walkForCores(occupation.core, index)).analyze();
  const ranking = matchOccupations(result);
  const position = ranking.matches.findIndex((match) => match.occupation.id === occupation.id);
  const match = ranking.matches[position];

  check(position >= 0 && position <= 3,
    `${occupation.id} : rang ${position + 1} pour un profil pourtant ciblé sur ses cœurs — fiche inatteignable`);
  check(match?.band === 'accessible',
    `${occupation.id} : bande « ${match?.band ?? 'absente'} » sur un profil ciblé, donc jamais recommandée`);

  const coreValues = (Object.keys(occupation.core) as FunctionalDomainId[]).map(
    (id) => result.domains.find((domain) => domain.id === id)?.normalized ?? 0
  );
  if (match && match.coreMean < Math.max(...coreValues) - 1) geometricPenaltySeen = true;
});

check(geometricPenaltySeen,
  'Aucune fiche ne tombe sous le niveau de son meilleur domaine : la moyenne géométrique ne punit pas un cœur absent, le croisement redevient un silo');

let beyondTopDomainSeen = false;
let functionAxisMatters = false;
ALL_SITUATIONS.forEach((_option, offset) => {
  const result = new TestAnalyzer(walk(1, offset)).analyze();
  const ranking = matchOccupations(result);
  const top = ranking.matches[0];
  if (top && Object.keys(top.occupation.core).some((id) => !result.topDomainIds.includes(id as FunctionalDomainId))) {
    beyondTopDomainSeen = true;
  }

  const blankSignals = FUNCTION_ROLE_IDS.reduce(
    (acc, role) => {
      acc[role] = 0;
      return acc;
    },
    {} as Record<FunctionRoleId, number>
  );
  const erasedOrder = matchOccupations({ ...result, functionSignals: blankSignals }).matches
    .map((match) => match.occupation.id)
    .join('|');
  if (erasedOrder !== ranking.matches.map((match) => match.occupation.id).join('|')) functionAxisMatters = true;
});
check(beyondTopDomainSeen,
  'Le premier métier proposé ne repose que sur des domaines déjà prioritaires : le catalogue croisé n’ouvre aucune voie nouvelle');

DOMAIN_IDS.forEach((domainId) => {
  const sample = CROSS_OCCUPATIONS.find((occupation) => (occupation.core[domainId] ?? 0) > 0);
  if (!sample) return;

  const result = new TestAnalyzer(walkForCores(sample.core, 0, domainId)).analyze();
  const ranking = matchOccupations(result);
  check(result.excludedDomainIds.includes(domainId),
    `${domainId} : exclu dans q_exclude mais absent de excludedDomainIds`);
  check(ranking.matches.every((match) => (match.occupation.core[domainId] ?? 0) === 0),
    `${domainId} : un métier qui l'exige reste classé après une exclusion explicite`);
  check(ranking.excluded.some((match) => match.occupation.id === sample.id),
    `${sample.id} : écarté par l'exclusion de ${domainId} sans figurer parmi les fiches exclues`);
});

const fixedResponses = walkForCores(CROSS_OCCUPATIONS[0].core, 0);
check(
  JSON.stringify(matchOccupations(new TestAnalyzer(fixedResponses).analyze())) ===
    JSON.stringify(matchOccupations(new TestAnalyzer(fixedResponses).analyze())),
  'Deux lectures des mêmes réponses classent les métiers différemment : le matcheur n’est pas déterministe'
);

check(functionAxisMatters,
  'Effacer les six axes fonctionnels laisse l’ordre des métiers identique pour chaque profil : la projection des fonctions est décorative');

console.log(`Contrôles du parcours — catalogue de ${MODULE_CATALOG.length} modules, ${DOMAIN_IDS.length} domaines, ${gate.options.length} situations`);
notes.forEach((note) => console.log(`  ${note}`));

if (failures.length > 0) {
  console.error(`\n${failures.length} contrôle(s) en échec :`);
  failures.forEach((failure) => console.error(`  - ${failure}`));
  throw new Error('Contrôles du parcours en échec.');
}

console.log('\nTous les contrôles passent.');
