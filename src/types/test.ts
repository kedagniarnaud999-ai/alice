export type QuestionType = 'single' | 'multiple';

export type AssessmentStage =
  | 'situation'
  | 'psych'
  | 'interests'
  | 'aptitude'
  | 'constraints';

export type CareerSituation =
  | 'bachelier'
  | 'jeune_diplome'
  | 'reconversion'
  | 'professionnel';

export type FunctionalDomainId =
  | 'administration'
  | 'commerce_marketing'
  | 'finance'
  | 'ingenierie'
  | 'ict'
  | 'tourisme'
  | 'sante_social'
  | 'education'
  | 'agriculture'
  | 'logistique';

/**
 * Ce que la personne veut faire au quotidien, indépendamment du secteur. Un métier
 * croisé se définit par ses domaines ET par cet axe : « coordonner » en numérique ou
 * en agriculture n'est pas le même poste, et « construire » non plus.
 */
export type FunctionRoleId =
  | 'coordination'
  | 'analyse'
  | 'technique'
  | 'relation'
  | 'conception'
  | 'terrain';

export interface QuestionOption {
  id: string;
  text: string;
  /**
   * Free-form psychological trait weights (cognitive style, motivations,
   * talents). Aggregated into a flat score map that drives the profile narrative.
   */
  weights?: Record<string, number>;
  /** Contribution of this option to each functional domain score. */
  domains?: Partial<Record<FunctionalDomainId, number>>;
  /** Hard exclusion: selecting this option removes the domain from the ranking. */
  excludes?: FunctionalDomainId[];
  /** Side-effects applied to the collected responses (e.g. the situation gate). */
  sets?: {
    situation?: CareerSituation;
  };
}

export interface Question {
  id: string;
  stage: AssessmentStage;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  maxSelections?: number;
  optional?: boolean;
  section?: string;
  sectionDescription?: string;
  /**
   * Question is only asked when this predicate passes, given the responses
   * collected so far. Used for the branching (situation-specific) questions.
   */
  visibleIf?: (context: AssessmentContext) => boolean;
}

/**
 * Read-only view handed to `visibleIf` so a question can branch on the
 * situation already chosen or on specific prior answers.
 */
export interface AssessmentContext {
  situation?: CareerSituation;
  hasSelected: (questionId: string, optionId: string) => boolean;
}

export interface TestResponse {
  questionId: string;
  selectedOptions: string[];
}

export interface DomainScore {
  id: FunctionalDomainId;
  label: string;
  raw: number;
  maxPossible: number;
  normalized: number;
  rank: number;
  reasons: string[];
  excluded: boolean;
}

export interface ProfileResult {
  assessmentVersion: number;
  situation: CareerSituation;
  profileType: string;
  profileDescription: string;
  naturalTalents: string[];
  motivationDrivers: string[];
  primaryInterests: string[];
  careerStage: string;
  feasibilityAssessment: string;
  nextActions: string[];
  domains: DomainScore[];
  /** Intensité 0..100 de chaque axe fonctionnel, projetée depuis les traits psychologiques. */
  functionSignals: Record<FunctionRoleId, number>;
  topDomainIds: FunctionalDomainId[];
  excludedDomainIds: FunctionalDomainId[];
}

export interface TestState {
  currentQuestionIndex: number;
  responses: TestResponse[];
  completed: boolean;
  result?: ProfileResult;
}
