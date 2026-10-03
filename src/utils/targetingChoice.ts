import { Targeting } from '@/types/test';
import type { FunctionChoice } from './functionFocus';

/**
 * La fonction sous laquelle le candidat a rangé son choix, et la raison qu'il en
 * a donnée, suivent le ciblage. Elles n'entrent dans aucun calcul : le parcours
 * reste taillé sur le domaine, les fiches et les axes.
 */
export const withFunctionChoice = (draft: Targeting, choice?: FunctionChoice): Targeting =>
  choice ? { ...draft, functionId: choice.functionId, functionRationale: choice.rationale } : draft;
