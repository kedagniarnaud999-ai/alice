import { FunctionalDomainId, FunctionRoleId } from '@/types/test';

/**
 * Affinités entre traits psychologiques (portés par `option.weights`) et domaines
 * fonctionnels. Le profil psychologique ne suffit jamais à lui seul : il corrobore
 * ou non les intérêts déclarés, et c'est ce mélange qui classe les domaines de carrière.
 * Échelle 1 (affinité faible) à 3 (affinité forte).
 */
export const PSYCH_DOMAIN_AFFINITY: Record<string, Partial<Record<FunctionalDomainId, number>>> = {
  analytical: { finance: 3, ict: 2, ingenierie: 2, administration: 1, education: 1 },
  structured: { administration: 3, finance: 3, logistique: 2, ingenierie: 1, education: 1 },
  experimental: { ict: 2, ingenierie: 3, agriculture: 2, commerce_marketing: 1 },
  pragmatic: { ingenierie: 2, logistique: 2, agriculture: 3, administration: 1, tourisme: 1 },
  collaborative: { education: 2, sante_social: 2, administration: 1, tourisme: 1 },
  adaptive: { logistique: 2, tourisme: 2, commerce_marketing: 1, ict: 1 },
  intuitive: { commerce_marketing: 1, ict: 1, agriculture: 1 },

  innovation: { ict: 2, commerce_marketing: 2, ingenierie: 1, education: 1 },
  impact: { sante_social: 3, education: 2, agriculture: 1, finance: 1 },
  challenge: { commerce_marketing: 3, ict: 1, ingenierie: 1, logistique: 1 },
  autonomy: { agriculture: 2, ict: 1, commerce_marketing: 1 },
  stability: { administration: 2, finance: 2, sante_social: 1, logistique: 1 },
  learning: { education: 3, ict: 2, ingenierie: 1, sante_social: 1 },
  recognition: { education: 1, sante_social: 1, administration: 1 },
  achievement: { finance: 1, ingenierie: 1, ict: 1, logistique: 1 },
  growth: { education: 2, commerce_marketing: 1, sante_social: 1 },

  analytical_talent: { finance: 3, ict: 2, ingenierie: 2, administration: 1 },
  organizational_talent: { administration: 3, logistique: 3, finance: 1 },
  communication_talent: { commerce_marketing: 3, education: 3, tourisme: 2 },
  creative_talent: { commerce_marketing: 2, ict: 1, tourisme: 1 },
  interpersonal_talent: { sante_social: 3, education: 2, tourisme: 2 },
  resourcefulness_talent: { agriculture: 3, tourisme: 1, ingenierie: 1 },
  technical_talent: { ict: 3, ingenierie: 3, logistique: 1 },
  linguistic_talent: { tourisme: 3, education: 1, commerce_marketing: 1 },
  leadership: { administration: 2, commerce_marketing: 2, education: 1, logistique: 1 },
  problem_solving: { ingenierie: 3, ict: 3, finance: 2, logistique: 1 },
};

/** Libellés affichés dans la liste « pourquoi ce domaine vous est recommandé ». */
export const PSYCH_TRAIT_LABELS: Record<string, string> = {
  analytical: 'votre style analytique',
  structured: 'votre goût des méthodes',
  experimental: 'votre démarche expérimentale',
  pragmatic: 'votre sens du concret',
  collaborative: 'votre intelligence collective',
  adaptive: 'votre capacité d’adaptation',
  intuitive: 'votre intuition',
  innovation: 'votre besoin de créer',
  impact: 'votre besoin d’impact',
  challenge: 'votre goût du défi',
  autonomy: 'votre besoin d’autonomie',
  stability: 'votre besoin de stabilité',
  learning: 'votre appétit d’apprendre',
  recognition: 'votre besoin de reconnaissance',
  achievement: 'votre goût du résultat',
  growth: 'votre quête de progression',
  analytical_talent: 'votre talent d’analyse',
  organizational_talent: 'votre talent d’organisation',
  communication_talent: 'votre talent de communication',
  creative_talent: 'votre talent créatif',
  interpersonal_talent: 'votre talent relationnel',
  resourcefulness_talent: 'votre débrouillardise',
  technical_talent: 'votre aisance technique',
  linguistic_talent: 'votre aisance avec les langues',
  leadership: 'votre leadership naturel',
  problem_solving: 'votre sens de la résolution de problèmes',
};

/**
 * Projection des traits psychologiques sur l'axe fonctionnel. Même échelle que
 * PSYCH_DOMAIN_AFFINITY : 1 affinité faible, 3 forte. Un seul trait ne suffit
 * jamais à revendiquer une fonction ; c'est la moyenne pondérée des ratios de
 * traits effectivement mesurés qui produit le signal.
 */
export const PSYCH_ROLE_AFFINITY: Record<string, Partial<Record<FunctionRoleId, number>>> = {
  organizational_talent: { coordination: 3, analyse: 1 },
  leadership: { coordination: 3, relation: 1 },
  analytical_talent: { analyse: 3 },
  problem_solving: { analyse: 2, terrain: 1 },
  technical_talent: { technique: 3 },
  creative_talent: { conception: 3 },
  communication_talent: { relation: 3, conception: 1 },
  linguistic_talent: { relation: 2 },
  interpersonal_talent: { relation: 3, terrain: 1 },
  resourcefulness_talent: { terrain: 3, technique: 1 },
  structured: { coordination: 2, analyse: 1 },
  pragmatic: { terrain: 2, technique: 1 },
  collaborative: { relation: 2, coordination: 1 },
  experimental: { conception: 2, terrain: 1 },
  adaptive: { terrain: 1, relation: 1 },
  intuitive: { conception: 1 },
};

export const ROLE_LABELS: Record<FunctionRoleId, string> = {
  coordination: 'Coordonner et piloter',
  analyse: 'Analyser et modéliser',
  technique: 'Construire et réparer',
  relation: 'Conseiller et convaincre',
  conception: 'Imaginer et concevoir',
  terrain: 'Exécuter sur le terrain',
};

export const FUNCTION_ROLE_IDS: FunctionRoleId[] = Object.keys(ROLE_LABELS) as FunctionRoleId[];

export const PSYCH_TRAITS = Object.keys(PSYCH_DOMAIN_AFFINITY);
