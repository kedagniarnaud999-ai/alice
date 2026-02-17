export type QuestionType = 'single' | 'multiple';

export type Dimension = 
  | 'cognitive'
  | 'passion'
  | 'talents'
  | 'interests'
  | 'reality'
  | 'positioning';

export interface QuestionOption {
  id: string;
  text: string;
  weights: {
    [key: string]: number;
  };
}

export interface Question {
  id: string;
  dimension: Dimension;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  maxSelections?: number;
  section?: string;
  sectionDescription?: string;
}

export interface TestResponse {
  questionId: string;
  selectedOptions: string[];
}

export interface DimensionScore {
  dimension: Dimension;
  scores: Map<string, number>;
  dominant: string[];
}

export interface ProfileResult {
  profileType: string;
  profileDescription: string;
  naturalTalents: string[];
  motivationDrivers: string[];
  primaryInterests: string[];
  careerStage: string;
  feasibilityAssessment: string;
  nextActions: string[];
  dimensionScores: DimensionScore[];
}

export interface TestState {
  currentQuestionIndex: number;
  responses: TestResponse[];
  completed: boolean;
  result?: ProfileResult;
}
