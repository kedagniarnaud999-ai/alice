import { ALL_DOMAIN_IDS } from '@/data/domains';
import { orientationQuestions } from '@/data/questions';
import { getVisibleQuestions, TestAnalyzer } from '@/utils/testAnalyzer';
import type { CareerSituation, FunctionalDomainId, Question, QuestionOption, TestResponse } from '@/types/test';

/**
 * Un score de domaine se normalise sur ce que la branche de questions du candidat
 * permettait d'atteindre. Si deux questions laissent le candidat nommer son propre
 * domaine, ces questions entrent au plafond de *tous* les domaines mais ne
 * créditent que celui qu'il a choisi : la déclaration devient le score.
 *
 * Ce contrôle borne donc la part déclarative du plafond, par domaine et en cumulé.
 * Il ne juge pas le poids d'une question isolée — seulement la part du total qui
 * vient de « dites-nous votre domaine » plutôt que de « montrez-nous ce que vous
 * faites ».
 */

const SITUATIONS: CareerSituation[] = ['bachelier', 'jeune_diplome', 'reconversion', 'professionnel'];

/** Questions où le candidat nomme lui-même le domaine visé, sans intermédiaire. */
const DECLARATIVE_QUESTION_IDS = ['q_interest_fields', 'q_target_sectors'];

/** Marges choisies après mesure : 17 % et 16 % constatés, plafonds à 20 % et 18 %. */
const MAX_DECLARATIVE_SHARE_PER_DOMAIN = 0.2;
const MAX_DECLARATIVE_SHARE_TOTAL = 0.18;

const failures: string[] = [];

function check(condition: boolean, message: string): void {
  if (!condition) failures.push(message);
}

/** Mêmes règles que `applyTheoreticalMaxima`, isolées pour pouvoir les détailler. */
function questionCeiling(
  question: Question,
  read: (option: QuestionOption) => Record<string, number | undefined> | undefined
): Record<string, number> {
  const cap = question.type === 'single' ? 1 : question.maxSelections ?? question.options.length;
  const keys = new Set<string>();
  question.options.forEach((option) =>
    Object.keys(read(option) ?? {}).forEach((key) => keys.add(key))
  );

  const ceiling: Record<string, number> = {};
  keys.forEach((key) => {
    const achievable = question.options
      .map((option) => read(option)?.[key] ?? 0)
      .filter((value) => value > 0)
      .sort((a, b) => b - a)
      .slice(0, cap)
      .reduce((sum, value) => sum + value, 0);
    if (achievable > 0) ceiling[key] = achievable;
  });
  return ceiling;
}

/** Les questions réellement proposées quand le candidat déclare telle situation. */
function branchFor(situation: CareerSituation): Question[] {
  const gate = orientationQuestions.find((q) => q.id === 'q_situation');
  const option = gate?.options.find((o) => o.sets?.situation === situation);
  const responses: TestResponse[] = option
    ? [{ questionId: 'q_situation', selectedOptions: [option.id] }]
    : [];
  return getVisibleQuestions(responses);
}

const notes: string[] = [];

SITUATIONS.forEach((situation) => {
  const questions = branchFor(situation);
  const ceilings = questions.map((q) => ({ q, ceiling: questionCeiling(q, (o) => o.domains) }));

  let totalMax = 0;
  let totalDeclared = 0;
  let worstDomain = '';
  let worstShare = 0;

  ALL_DOMAIN_IDS.forEach((domain) => {
    let max = 0;
    let declared = 0;
    ceilings.forEach(({ q, ceiling }) => {
      const value = ceiling[domain] ?? 0;
      max += value;
      if (DECLARATIVE_QUESTION_IDS.includes(q.id)) declared += value;
    });
    if (max === 0) {
      failures.push(`${situation} : aucune question ne mène au domaine « ${domain} » — son plafond est à 0`);
      return;
    }
    const share = declared / max;
    totalMax += max;
    totalDeclared += declared;
    if (share > worstShare) {
      worstShare = share;
      worstDomain = domain;
    }
    check(
      share <= MAX_DECLARATIVE_SHARE_PER_DOMAIN,
      `${situation} : « ${domain} » doit ${Math.round(share * 100)} % de son plafond (${declared}/${max}) à la seule auto-déclaration, plafond ${Math.round(MAX_DECLARATIVE_SHARE_PER_DOMAIN * 100)} %`
    );
  });

  check(
    totalDeclared / totalMax <= MAX_DECLARATIVE_SHARE_TOTAL,
    `${situation} : l'auto-déclaration pèse ${Math.round((totalDeclared / totalMax) * 100)} % du plafond cumulé (${totalDeclared}/${totalMax}), plafond ${Math.round(MAX_DECLARATIVE_SHARE_TOTAL * 100)} %`
  );

  notes.push(
    `  ${situation.padEnd(14)} ${questions.length} questions, plafond cumulé ${totalMax}, déclaratif ${Math.round(
      (totalDeclared / totalMax) * 100
    )} % ; domaine le plus exposé : ${worstDomain} ${Math.round(worstShare * 100)} %`
  );
});

/**
 * Le plafond borne la mécanique ; cette assertion teste la promesse. Un candidat
 * qui montre qu'il fait déjà le travail doit passer devant celui qui se contente
 * de nommer le domaine. Les deux jeux de réponses sont construits depuis les
 * données pour que le contrôle tienne encore si un id ou un poids bouge.
 */
function optionsCarrying(question: Question, domain: FunctionalDomainId): string[] {
  return question.options.filter((o) => (o.domains?.[domain] ?? 0) > 0).map((o) => o.id);
}

const referenceSituation: CareerSituation = 'jeune_diplome';

ALL_DOMAIN_IDS.forEach((domain) => {
  const questions = branchFor(referenceSituation);
  const declarative = questions.filter((q) => DECLARATIVE_QUESTION_IDS.includes(q.id));
  const demonstrative = questions.filter(
    (q) => !DECLARATIVE_QUESTION_IDS.includes(q.id) && q.stage !== 'psych' && q.stage !== 'situation'
  );

  const chosen = (list: Question[]) =>
    list
      .map((q) => {
        const carrying = optionsCarrying(q, domain);
        if (carrying.length === 0) return null;
        const cap = q.type === 'single' ? 1 : q.maxSelections ?? carrying.length;
        return { questionId: q.id, selectedOptions: carrying.slice(0, cap) };
      })
      .filter((r): r is TestResponse => r !== null);

  const scoreFor = (list: Question[]) =>
    new TestAnalyzer(chosen(list)).analyze().domains.find((d) => d.id === domain)?.normalized ?? 0;

  const declaredOnly = scoreFor(declarative);
  const shownOnly = scoreFor(demonstrative);

  check(
    shownOnly > declaredOnly,
    `${referenceSituation} · ${domain} : montrer suffit pour ${shownOnly}, déclarer rapporte ${declaredOnly} — un candidat qui nomme le domaine passe devant un candidat qui le pratique`
  );
});

console.log(`Contrôles du signal — ${orientationQuestions.length} questions, ${ALL_DOMAIN_IDS.length} domaines de carrière`);
notes.forEach((note) => console.log(note));

if (failures.length > 0) {
  console.error(`\n${failures.length} contrôle(s) en échec :`);
  failures.forEach((failure) => console.error(`  - ${failure}`));
  throw new Error('Contrôles du signal en échec.');
}

console.log('\nTous les contrôles passent.');
