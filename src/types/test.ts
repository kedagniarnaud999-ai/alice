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
  /**
   * Déclaration directe d'une fonction (« je veux piloter des projets »), à
   * l'opposé des traits psychologiques que le test déduit : ici le candidat dit
   * ce qu'il veut faire. Une valeur négative est un refus — la mission est
   * éliminée, pas seulement peu marquée.
   */
  functions?: Partial<Record<FunctionRoleId, number>>;
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

/**
 * Ce que le candidat peut vraiment mobiliser maintenant, calculé depuis les
 * questions de contraintes. Il ne touche aucun score de domaine — un profil
 * solide reste solide — mais recule la bande des fiches métier : « accessible ce
 * trimestre » et « accessible dans deux ans » ne se conseillent pas de la même
 * façon.
 */
export interface CapacitySignals {
  /** Nombre de crans dont chaque fiche recule : 0, 1 ou 2. */
  bandDeduction: number;
  /** Les causes, en mots montrés au candidat. Vide quand rien ne freine. */
  reasons: string[];
}

/**
 * Ce que le candidat a choisi dans l'entonnoir après le test : une jambe phare,
 * les débouchés qui lui parlent, les axes où il veut s'appuyer dessus. Le moteur
 * de parcours taille alors ses pistes sur ces fiches au lieu de raisonner par
 * domaine isolé.
 */
export interface Targeting {
  flagshipDomainId: FunctionalDomainId;
  occupationIds: string[];
  specializationIds: string[];
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
  /** Temps et matériel déclarés : reculent la bande des fiches métier, jamais les scores. */
  capacity: CapacitySignals;
  topDomainIds: FunctionalDomainId[];
  excludedDomainIds: FunctionalDomainId[];
  /** Fiche croisée choisie par le candidat : le parcours se taille alors pour elle. */
  selectedOccupationId?: string;
  /**
   * L'engagement pris dans l'entonnoir : un domaine phare, ses débouchés retenus,
   * l'axe où s'appuyer. Optionnel parce que le choix se fait après le test — un
   * profil sans ciblage reste un profil complet, il repart sur les pistes par domaine.
   */
  targeting?: Targeting;
}

export interface TestState {
  currentQuestionIndex: number;
  responses: TestResponse[];
  completed: boolean;
  result?: ProfileResult;
}
