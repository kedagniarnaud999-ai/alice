import {
  ProfileResult,
  TestResponse,
  Question,
  QuestionOption,
  DomainScore,
  FunctionalDomainId,
  FunctionRoleId,
  CareerSituation,
  AssessmentContext,
  CapacitySignals,
} from '@/types/test';
import { orientationQuestions, ASSESSMENT_VERSION } from '@/data/questions';
import { FUNCTIONAL_DOMAINS_BY_ID, ALL_DOMAIN_IDS } from '@/data/domains';
import {
  PSYCH_DOMAIN_AFFINITY,
  PSYCH_ROLE_AFFINITY,
  PSYCH_TRAIT_LABELS,
  PSYCH_TRAITS,
  FUNCTION_ROLE_IDS,
} from '@/data/psychAffinity';

type ScoreMap = Record<string, number>;

/**
 * Part respective du signal fonctionnel (intérêts, aptitudes) et du signal
 * psychologique dans le score final d'un domaine. Le psychologique corrobore,
 * il ne décrète pas une filière.
 */
const FUNCTIONAL_SHARE = 0.7;
const PSYCH_SHARE = 0.3;

const COGNITIVE_KEYS = [
  'analytical',
  'structured',
  'experimental',
  'pragmatic',
  'collaborative',
  'adaptive',
  'intuitive',
];

const PASSION_KEYS = [
  'innovation',
  'impact',
  'challenge',
  'autonomy',
  'stability',
  'learning',
  'recognition',
  'achievement',
  'growth',
];

const TALENT_KEYS = [
  'analytical_talent',
  'organizational_talent',
  'communication_talent',
  'creative_talent',
  'interpersonal_talent',
  'resourcefulness_talent',
  'technical_talent',
  'linguistic_talent',
  'leadership',
  'problem_solving',
];

const COGNITIVE_MAP: Record<string, string> = {
  analytical: 'Analytique',
  structured: 'Structuré',
  experimental: 'Expérimental',
  pragmatic: 'Pragmatique',
  collaborative: 'Collaboratif',
  adaptive: 'Adaptatif',
  intuitive: 'Intuitif',
};

const PASSION_MAP: Record<string, string> = {
  innovation: 'Innovateur',
  impact: 'Orienté Impact',
  challenge: 'Orienté Défis',
  autonomy: 'Autonome',
  stability: 'En quête de Stabilité',
  learning: 'Apprenant',
  recognition: 'En quête de Reconnaissance',
  achievement: 'Orienté Résultats',
  growth: 'En Progression',
};

const TALENT_MAP: Record<string, string> = {
  analytical_talent: 'Analyse et résolution de problèmes',
  organizational_talent: 'Organisation et coordination',
  communication_talent: 'Communication et pédagogie',
  creative_talent: 'Créativité et expression',
  interpersonal_talent: 'Relations interpersonnelles et empathie',
  resourcefulness_talent: 'Débrouillardise et pragmatisme',
  technical_talent: 'Compétences techniques et digitales',
  linguistic_talent: 'Langues et communication',
  leadership: 'Leadership et influence',
  problem_solving: 'Résolution de problèmes complexes',
};

const MOTIVATION_MAP: Record<string, string> = {
  innovation: 'Innovation et créativité',
  impact: 'Impact social et contribution',
  challenge: 'Défis et accomplissement',
  autonomy: 'Autonomie et liberté',
  stability: 'Sécurité et stabilité',
  learning: 'Apprentissage continu',
  recognition: 'Reconnaissance et validation',
  achievement: "Atteinte d'objectifs mesurables",
  growth: 'Développement personnel',
};

const CAREER_STAGE_LABELS: Record<CareerSituation, string> = {
  bachelier: "Nouveau bachelier — en recherche d'orientation post-bac",
  jeune_diplome: 'Jeune diplômé(e) — en insertion professionnelle',
  reconversion: 'En reconversion professionnelle',
  professionnel: 'Professionnel(le) en montée en compétences',
};

function emptyDomainRecord(): Record<FunctionalDomainId, number> {
  return ALL_DOMAIN_IDS.reduce(
    (acc, id) => {
      acc[id] = 0;
      return acc;
    },
    {} as Record<FunctionalDomainId, number>
  );
}

function truncate(text: string, max = 72): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/**
 * Resolve the career situation chosen at the gate (q_situation). Used both by
 * the analyzer and by the flow (to drive conditional question visibility).
 */
export function getSituation(responses: TestResponse[]): CareerSituation | undefined {
  const gate = orientationQuestions.find((q) => q.id === 'q_situation');
  if (!gate) return undefined;
  for (const response of responses) {
    if (response.questionId !== gate.id) continue;
    for (const optionId of response.selectedOptions) {
      const option = gate.options.find((o) => o.id === optionId);
      if (option?.sets?.situation) return option.sets.situation;
    }
  }
  return undefined;
}

/** Read-only context handed to `Question.visibleIf`. Shared with the flow. */
export function buildAssessmentContext(responses: TestResponse[]): AssessmentContext {
  const selected = new Set<string>();
  responses.forEach((r) => r.selectedOptions.forEach((o) => selected.add(`${r.questionId}::${o}`)));
  return {
    situation: getSituation(responses),
    hasSelected: (questionId, optionId) => selected.has(`${questionId}::${optionId}`),
  };
}

/** Questions effectivement posées, branche conditionnelle incluse. */
export function getVisibleQuestions(responses: TestResponse[]): Question[] {
  const context = buildAssessmentContext(responses);
  return orientationQuestions.filter((q) => !q.visibleIf || q.visibleIf(context));
}

/**
 * Cumule, dans `target`, le maximum théoriquement atteignable pour chaque clé
 * (`domains` d'une option ou `weights` d'une option) sur les questions proposées.
 * Le dénominateur doit ignorer les réponses réelles : sinon un candidat qui ne
 * répond qu'à une seule question est crédité de 100 %.
 */
function applyTheoreticalMaxima(
  target: ScoreMap,
  questions: Question[],
  read: (option: QuestionOption) => Record<string, number | undefined> | undefined
): void {
  const keys = new Set<string>();
  questions.forEach((question) =>
    question.options.forEach((option) => {
      Object.keys(read(option) ?? {}).forEach((key) => keys.add(key));
    })
  );

  questions.forEach((question) => {
    const cap = question.type === 'single' ? 1 : question.maxSelections ?? question.options.length;

    keys.forEach((key) => {
      const achievable = question.options
        .map((option) => read(option)?.[key] ?? 0)
        .filter((value) => value > 0)
        .sort((a, b) => b - a)
        .slice(0, cap)
        .reduce((sum, value) => sum + value, 0);

      if (achievable > 0) {
        target[key] = (target[key] ?? 0) + achievable;
      }
    });
  });
}

/**
 * Quand le candidat dit ce qu'il veut faire, sa déclaration passe avant ce que ses
 * traits laissent deviner — mais l'implicite garde un poids : un seul « oui » ne
 * doit pas effacer un profil psychologique cohérent.
 */
const DIRECT_FUNCTION_SHARE = 0.6;
const INFERRED_FUNCTION_SHARE = 0.4;

/** Projection des traits psychologiques sur les six axes fonctionnels, en 0..100. */
function projectTraitRoles(traitRatios: ScoreMap): Record<FunctionRoleId, number> {
  return FUNCTION_ROLE_IDS.reduce(
    (acc, role) => {
      let weighted = 0;
      let measurable = 0;

      PSYCH_TRAITS.forEach((trait) => {
        const affinity = PSYCH_ROLE_AFFINITY[trait]?.[role] ?? 0;
        const ratio = traitRatios[trait];
        if (affinity <= 0 || ratio === undefined) return;
        measurable += affinity;
        weighted += affinity * ratio;
      });

      acc[role] = measurable > 0 ? Math.round((weighted / measurable) * 100) : 0;
      return acc;
    },
    {} as Record<FunctionRoleId, number>
  );
}

/**
 * Intensité de chaque axe fonctionnel, en 0..100. Comme pour les domaines, seuls
 * les axes que la branche de questions du candidat permettait de déclarer entrent
 * au dénominateur. Une déclaration descend sous la projection quand elle dit
 * « je ne veux plus de ça » : un refus ne peut pas se lire comme une force.
 */
export function computeFunctionSignals(
  direct: ScoreMap,
  directMax: ScoreMap,
  traitRatios: ScoreMap
): Record<FunctionRoleId, number> {
  const inferred = projectTraitRoles(traitRatios);

  return FUNCTION_ROLE_IDS.reduce(
    (acc, role) => {
      const cap = directMax[role] ?? 0;
      if (cap <= 0) {
        acc[role] = inferred[role];
        return acc;
      }
      const declared = Math.max(0, Math.min(100, Math.round(((direct[role] ?? 0) / cap) * 100)));
      acc[role] = Math.round(DIRECT_FUNCTION_SHARE * declared + INFERRED_FUNCTION_SHARE * inferred[role]);
      return acc;
    },
    {} as Record<FunctionRoleId, number>
  );
}

export class TestAnalyzer {
  private responses: TestResponse[];
  private questionById: Map<string, Question>;
  private psych: ScoreMap = {};
  private declaredFunctions: ScoreMap = {};

  constructor(responses: TestResponse[]) {
    this.responses = responses;
    this.questionById = new Map(orientationQuestions.map((q) => [q.id, q]));
  }

  analyze(): ProfileResult {
    const declaredSituation = getSituation(this.responses);
    const situation: CareerSituation = declaredSituation ?? 'jeune_diplome';

    const rawByDomain = emptyDomainRecord();
    const maxByDomain = emptyDomainRecord();
    const psychMaxByTrait: ScoreMap = {};
    const declaredMaxByRole: ScoreMap = {};
    const excluded = new Set<FunctionalDomainId>();
    const reasonMap: Record<FunctionalDomainId, { text: string; score: number }[]> =
      ALL_DOMAIN_IDS.reduce(
        (acc, id) => {
          acc[id] = [];
          return acc;
        },
        {} as Record<FunctionalDomainId, { text: string; score: number }[]>
      );

    const visibleQuestions = getVisibleQuestions(this.responses);
    applyTheoreticalMaxima(maxByDomain, visibleQuestions, (option) => option.domains);
    applyTheoreticalMaxima(psychMaxByTrait, visibleQuestions, (option) => option.weights);
    applyTheoreticalMaxima(declaredMaxByRole, visibleQuestions, (option) => option.functions);

    this.responses.forEach((response) => {
      const question = this.questionById.get(response.questionId);
      if (!question) return;

      response.selectedOptions.forEach((optionId) => {
        const option = question.options.find((o) => o.id === optionId);
        if (!option) return;

        Object.entries(option.weights ?? {}).forEach(([key, value]) => {
          this.psych[key] = (this.psych[key] ?? 0) + (value ?? 0);
        });

        Object.entries(option.functions ?? {}).forEach(([role, value]) => {
          this.declaredFunctions[role] = (this.declaredFunctions[role] ?? 0) + (value ?? 0);
        });

        Object.entries(option.domains ?? {}).forEach(([domainId, value]) => {
          const id = domainId as FunctionalDomainId;
          const weight = value ?? 0;
          rawByDomain[id] += weight;
          if (weight > 0) reasonMap[id].push({ text: option.text, score: weight });
        });

        option.excludes?.forEach((id) => excluded.add(id));
      });
    });

    const traitRatios = this.computeTraitRatios(psychMaxByTrait);
    const domains = this.buildDomainScores(rawByDomain, maxByDomain, traitRatios, excluded, reasonMap);
    const functionSignals = computeFunctionSignals(this.declaredFunctions, declaredMaxByRole, traitRatios);
    const topDomainIds = domains
      .filter((d) => !d.excluded && d.normalized > 0)
      .slice(0, 3)
      .map((d) => d.id);

    const primaryInterests = topDomainIds.length
      ? topDomainIds.map((id) => FUNCTIONAL_DOMAINS_BY_ID[id].label)
      : ['à confirmer lors d’un échange'];

    return {
      assessmentVersion: ASSESSMENT_VERSION,
      situation,
      profileType: this.determineProfileType(),
      profileDescription: this.buildProfileDescription(),
      naturalTalents: this.extractByKeys(TALENT_KEYS, TALENT_MAP, 4),
      motivationDrivers: this.extractByKeys(PASSION_KEYS, MOTIVATION_MAP, 4),
      primaryInterests,
      careerStage: declaredSituation
        ? CAREER_STAGE_LABELS[declaredSituation]
        : 'Situation à préciser — répondez à la première question du test pour affiner votre parcours.',
      feasibilityAssessment: this.assessFeasibility(),
      nextActions: this.generateNextActions(situation, topDomainIds),
      domains,
      functionSignals,
      capacity: this.assessCapacity(),
      topDomainIds,
      excludedDomainIds: ALL_DOMAIN_IDS.filter((id) => excluded.has(id)),
    };
  }

  private buildDomainScores(
    rawByDomain: Record<FunctionalDomainId, number>,
    maxByDomain: Record<FunctionalDomainId, number>,
    traitRatios: ScoreMap,
    excluded: Set<FunctionalDomainId>,
    reasonMap: Record<FunctionalDomainId, { text: string; score: number }[]>
  ): DomainScore[] {
    const scores: DomainScore[] = ALL_DOMAIN_IDS.map((id) => {
      const raw = rawByDomain[id];
      const max = maxByDomain[id];
      const functional = max > 0 ? raw / max : 0;
      const psych = this.psychContribution(id, traitRatios);
      const fused = max > 0 ? FUNCTIONAL_SHARE * functional + PSYCH_SHARE * psych.score : psych.score;
      const normalized = Math.round(fused * 100);
      const functionalReasons = reasonMap[id]
        .sort((a, b) => b.score - a.score)
        .filter((r, index, arr) => arr.findIndex((x) => x.text === r.text) === index)
        .slice(0, 3)
        .map((r) => truncate(r.text));
      return {
        id,
        label: FUNCTIONAL_DOMAINS_BY_ID[id].label,
        raw,
        maxPossible: max,
        normalized,
        rank: 0,
        reasons: [...functionalReasons.slice(0, 2), ...psych.reasons].slice(0, 3),
        excluded: excluded.has(id),
      };
    });

    scores
      .filter((d) => !d.excluded)
      .sort((a, b) => b.normalized - a.normalized || b.raw - a.raw)
      .forEach((d, index) => {
        d.rank = index + 1;
      });

    return scores.sort((a, b) => Number(a.excluded) - Number(b.excluded) || a.rank - b.rank);
  }

  /** Score obtenu / maximum théorique, par trait effectivement mesurable. */
  private computeTraitRatios(psychMaxByTrait: ScoreMap): ScoreMap {
    const ratios: ScoreMap = {};
    Object.keys(psychMaxByTrait).forEach((trait) => {
      ratios[trait] = Math.min(1, (this.psych[trait] ?? 0) / psychMaxByTrait[trait]);
    });
    return ratios;
  }

  /**
   * Affinité du profil psychologique à un domaine, ramenée à 0..1. Seuls les
   * traits que le test pouvait mesurer entrent au dénominateur, pour qu'un
   * domaine ne soit pas pénalisé parce qu'aucune question n'y menait.
   */
  private psychContribution(
    domainId: FunctionalDomainId,
    traitRatios: ScoreMap
  ): { score: number; reasons: string[] } {
    let weighted = 0;
    let measurable = 0;
    const contributions: { label: string; value: number }[] = [];

    PSYCH_TRAITS.forEach((trait) => {
      const affinity = PSYCH_DOMAIN_AFFINITY[trait]?.[domainId] ?? 0;
      const ratio = traitRatios[trait];
      if (affinity <= 0 || ratio === undefined) return;

      measurable += affinity;
      weighted += affinity * ratio;
      if (ratio > 0) {
        contributions.push({ label: PSYCH_TRAIT_LABELS[trait] ?? trait, value: affinity * ratio });
      }
    });

    if (measurable === 0) return { score: 0, reasons: [] };

    const score = weighted / measurable;
    const reasons =
      score >= 0.45
        ? contributions
            .sort((a, b) => b.value - a.value)
            .slice(0, 1)
            .map((entry) => `${truncate(entry.label, 48)} — cohérent avec ce domaine`)
        : [];

    return { score, reasons };
  }

  private topKeys(allowed: string[], limit: number): string[] {
    return allowed
      .map((key) => ({ key, value: this.psych[key] ?? 0 }))
      .filter((entry) => entry.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, limit)
      .map((entry) => entry.key);
  }

  private extractByKeys(allowed: string[], labels: Record<string, string>, limit: number): string[] {
    const result = this.topKeys(allowed, limit).map((key) => labels[key] ?? key);
    return result.length ? result : ['À préciser au fil du parcours'];
  }

  private determineProfileType(): string {
    const cognitiveKey = this.topKeys(COGNITIVE_KEYS, 1)[0];
    const passionKey = this.topKeys(PASSION_KEYS, 1)[0];
    const cognitive = cognitiveKey ? COGNITIVE_MAP[cognitiveKey] : 'Polyvalent';
    const passion = passionKey ? PASSION_MAP[passionKey] : 'Motivé';
    return `${cognitive} · ${passion}`;
  }

  private buildProfileDescription(): string {
    const cognitiveKey = this.topKeys(COGNITIVE_KEYS, 1)[0];
    const passionKey = this.topKeys(PASSION_KEYS, 1)[0];

    const cognitiveText: Record<string, string> = {
      analytical: 'vous décortiquez les problèmes avec méthode et logique',
      structured: 'vous prospérez dans des environnements clairs, organisés et fiables',
      experimental: 'vous apprenez par l’action et l’expérimentation, à l’aise avec l’incertitude',
      pragmatic: 'vous cherchez des solutions concrètes et un impact tangible',
      collaborative: 'vous avancez en mobilisant et en vous appuyant sur les autres',
      adaptive: 'vous vous ajustez rapidement aux situations changeantes',
      intuitive: 'vous laissez parler votre flair pour trancher vite',
    };
    const passionText: Record<string, string> = {
      innovation: "créer du nouveau",
      impact: "avoir un impact réel sur les personnes",
      challenge: "relever des défis et performer",
      autonomy: "garder votre indépendance de décision",
      stability: "construire dans la sécurité et la régularité",
      learning: "apprendre en continu",
      recognition: "être reconnu pour votre apport",
      achievement: "atteindre des objectifs mesurables",
      growth: "progresser personnellement",
    };

    const part1 = cognitiveKey ? cognitiveText[cognitiveKey] : 'vous combinez plusieurs approches selon le contexte';
    const part2 = passionKey ? passionText[passionKey] : 'faire avancer vos projets';

    return `Votre profil : ${part1}. Ce qui vous porte le plus, c'est ${part2}. Cette combinaison vous aide à choisir des filières où vous pourrez à la fois bien faire et trouver du sens.`;
  }

  private selectedOptionIds(questionId: string): string[] {
    return this.responses.find((r) => r.questionId === questionId)?.selectedOptions ?? [];
  }

  /**
   * Le recul de bande punit la disponibilité, jamais la compétence : les scores de
   * domaine ne bougent pas d'un point. `q_resources` étant facultative, une réponse
   * vide reste « inconnu » — sinon on ferait reculer celui qui a sauté la question
   * plus sûrement que celui qui n'a rien.
   */
  private assessCapacity(): CapacitySignals {
    const time = this.selectedOptionIds('q_time')[0];
    const resources = this.selectedOptionIds('q_resources');
    const reasons: string[] = [];
    let deduction = 0;

    if (time === 'time_none') {
      deduction += 2;
      reasons.push('moins de 2 h par semaine pour l’instant');
    } else if (time === 'time_low') {
      deduction += 1;
      reasons.push('2 à 5 h par semaine');
    }

    if (resources.length > 0 && !resources.includes('r_computer') && !resources.includes('r_internet')) {
      deduction += 1;
      reasons.push('pas d’ordinateur ni de connexion régulière');
    }

    return { bandDeduction: Math.min(2, deduction), reasons };
  }

  private assessFeasibility(): string {
    const time = this.selectedOptionIds('q_time')[0];
    const resources = new Set(this.selectedOptionIds('q_resources'));
    const blocker = this.selectedOptionIds('q_constraint')[0];

    const hasComputer = resources.has('r_computer');
    const hasInternet = resources.has('r_internet');
    const needsOffline = resources.has('r_offline');

    let verdict: string;
    if (time === 'time_high' && hasComputer && hasInternet) {
      verdict =
        "Excellent : vous réunissez le temps et les outils pour un parcours intensif. Vous pouvez viser une formation complète, avec projets et certification.";
    } else if ((time === 'time_high' || time === 'time_medium') && (hasComputer || hasInternet)) {
      verdict =
        "Bon : avec un peu d'organisation, des modules courts et réguliers vous mèneront loin. Privilégiez la constance à l'intensité.";
    } else {
      verdict =
        "Réaliste : vos contraintes appellent une approche progressive. Commencez par des micro-formations gratuites, mobile-friendly et, si besoin, téléchargeables hors-ligne.";
    }

    if (needsOffline) {
      verdict += ' Ciblez en priorité les contenus disponibles hors-ligne.';
    }

    const blockerAdvice: Record<string, string> = {
      constraint_time: ' Optimisez avec des sessions courtes de 15–30 minutes par jour.',
      constraint_money: ' Concentrez-vous d’abord sur les ressources gratuites et les dispositifs de bourses.',
      constraint_direction: ' Le classement de domaines ci-dessous est votre boussole : avancez étape par étape.',
      constraint_equipment: ' Cherchez des modules légers, utilisables sur smartphone ou en point d’accès.',
      constraint_confidence: ' Démarrez par une micro-réalisation concrète pour consolider la confiance.',
    };
    if (blocker && blockerAdvice[blocker]) {
      verdict += blockerAdvice[blocker];
    }

    return verdict.trim();
  }

  private generateNextActions(situation: CareerSituation, topDomainIds: FunctionalDomainId[]): string[] {
    const actions: string[] = [];
    const topId = topDomainIds[0];
    const domain = topId ? FUNCTIONAL_DOMAINS_BY_ID[topId] : undefined;
    const topLabel = domain?.label ?? 'votre domaine prioritaire';
    const occupation = domain?.occupations[0];

    const opener: Record<CareerSituation, string> = {
      bachelier: `Ciblez les filières post-bac menant à « ${topLabel} » et vérifiez leurs conditions d'admission.`,
      jeune_diplome: `Alignez CV et LinkedIn sur « ${topLabel} » et postulez aux offres et stages de ce domaine.`,
      reconversion: `Validez « ${topLabel} » par un projet-test avant toute rupture, en vous appuyant sur vos compétences transférables.`,
      professionnel: `Choisissez une certification montante en « ${topLabel} » pour accélérer votre évolution interne.`,
    };
    actions.push(opener[situation]);

    if (occupation) {
      actions.push(`Explorez le parcours « ${topLabel} » — métier type de référence : ${occupation}.`);
    }

    actions.push(
      'Ouvrez le module « Construire un CV percutant pour l’Afrique » pour traduire ce profil en candidature crédible.'
    );
    actions.push('Fixez un objectif à 30 jours : un module terminé et un échange avec un professionnel du domaine.');

    return actions;
  }
}
