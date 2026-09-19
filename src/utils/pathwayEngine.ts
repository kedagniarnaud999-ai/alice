import { ProfileResult, FunctionalDomainId, CareerSituation } from '@/types/test';
import { FUNCTIONAL_DOMAINS_BY_ID } from '@/data/domains';
import { LearningModule, MODULE_CATALOG } from '@/data/modules';
import { CrossOccupation } from '@/data/occupations';

export interface LearningTrack {
  id: string;
  title: string;
  description: string;
  modules: LearningModule[];
  estimatedWeeks: number;
  targetSkills: string[];
}

export interface PersonalizedPathway {
  profileType: string;
  /** Intitulé du métier visé quand le parcours a été taillé pour une fiche croisée. */
  occupationTitle?: string;
  recommendedTracks: LearningTrack[];
  quickWins: LearningModule[];
  longTermGoals: string[];
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  criteria: string[];
}

/** Nombre de modules d'un parcours : assez pour progresser, pas assez pour décourager. */
const TRACK_MODULE_COUNT = 5;

function uniqueModules(modules: LearningModule[]): LearningModule[] {
  const seen = new Set<string>();
  return modules.filter((module) => {
    if (seen.has(module.id)) return false;
    seen.add(module.id);
    return true;
  });
}

/**
 * Charge nominale d'un apprenant sur une semaine. Sert à convertir en semaines
 * les modules dont la durée est exprimée en heures ; les modules déjà exprimés
 * en semaines sont comptés tels quels.
 */
const WEEKLY_STUDY_HOURS = 5;

function durationInWeeks(duration: string): number {
  const hours = Number.parseFloat(duration.replace(',', '.'));
  if (!Number.isFinite(hours)) {
    return 0;
  }
  return /semaine/i.test(duration) ? hours : hours / WEEKLY_STUDY_HOURS;
}

function estimateWeeks(modules: LearningModule[]): number {
  const total = modules.reduce((sum, module) => sum + durationInWeeks(module.duration), 0);
  return Math.max(1, Math.round(total));
}

const DIFFICULTY_LEVEL = { Debutant: 0, Intermediaire: 1, Avance: 2 } as const;

/** Gratuit d'abord, puis du plus simple au plus avancé ; ordre du catalogue à égalité. */
function byTrackOrder(a: LearningModule, b: LearningModule): number {
  if (a.isFree !== b.isFree) {
    return a.isFree ? -1 : 1;
  }
  return DIFFICULTY_LEVEL[a.difficulty] - DIFFICULTY_LEVEL[b.difficulty];
}

function extractSkills(modules: LearningModule[]): string[] {
  const skills = new Set<string>();
  modules.forEach((module) => {
    module.skills.forEach((skill) => skills.add(skill));
  });
  return Array.from(skills).slice(0, 8);
}

export function buildTrackForDomain(domainId: FunctionalDomainId): LearningTrack | null {
  const modules = MODULE_CATALOG.filter((module) =>
    (module.domains ?? []).includes(domainId)
  );
  if (modules.length === 0) {
    return null;
  }
  const domain = FUNCTIONAL_DOMAINS_BY_ID[domainId];
  const trackModules = modules.sort(byTrackOrder).slice(0, TRACK_MODULE_COUNT);
  return {
    id: `track_${domainId}`,
    title: `Parcours ${domain.label}`,
    description: `${domain.tagline}. Développez vos compétences de manière progressive et structurée.`,
    modules: trackModules,
    estimatedWeeks: estimateWeeks(trackModules),
    targetSkills: extractSkills(trackModules),
  };
}

/**
 * Parcours taillé pour un métier à l'intersection de plusieurs domaines.
 *
 * L'union des pools s'impose : aucun module ne porte deux domaines à la fois,
 * donc l'intersection serait vide. Mais tronquer le pool concaténé remplirait
 * le parcours avec le domaine le mieux fourni — la jambe secondaire, celle qui
 * fait l'intersection, resterait à quai. Les pools sont donc arrosés à tour de
 * rôle, le plus exigé d'abord, puis la sélection est triée pour rendre au
 * parcours sa progression gratuite → payante, simple → avancée.
 */
export function buildTrackForOccupation(occupation: CrossOccupation): LearningTrack | null {
  const coreIds = Object.entries(occupation.core)
    .filter(([, weight]) => (weight ?? 0) > 0)
    .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0) || a[0].localeCompare(b[0]))
    .map(([domainId]) => domainId as FunctionalDomainId);

  const wanted = new Set(occupation.skills);
  const relevance = (module: LearningModule): number =>
    module.skills.reduce((count, skill) => count + (wanted.has(skill) ? 1 : 0), 0);

  const pools = coreIds
    .map((domainId) =>
      MODULE_CATALOG.filter((module) => (module.domains ?? []).includes(domainId)).sort(
        (a, b) => relevance(b) - relevance(a) || byTrackOrder(a, b)
      )
    )
    .filter((pool) => pool.length > 0);

  const picked: LearningModule[] = [];
  const cursors = pools.map(() => 0);

  while (picked.length < TRACK_MODULE_COUNT) {
    let advanced = false;
    pools.forEach((pool, index) => {
      if (picked.length >= TRACK_MODULE_COUNT) return;
      while (cursors[index] < pool.length && picked.includes(pool[cursors[index]])) {
        cursors[index] += 1;
      }
      if (cursors[index] < pool.length) {
        picked.push(pool[cursors[index]]);
        cursors[index] += 1;
        advanced = true;
      }
    });
    if (!advanced) break;
  }

  if (picked.length === 0) {
    return null;
  }

  const modules = picked.sort(byTrackOrder);
  const coreLabels = coreIds.map((id) => FUNCTIONAL_DOMAINS_BY_ID[id].label).join(' et ');
  return {
    id: `occupation_${occupation.id}`,
    title: occupation.title,
    description: `${occupation.context} Le parcours couvre ${coreLabels}.`,
    modules,
    estimatedWeeks: estimateWeeks(modules),
    targetSkills: extractSkills(modules),
  };
}

class PathwayEngine {
  generatePathway(result: ProfileResult, occupation?: CrossOccupation): PersonalizedPathway {
    const occupationTrack = occupation ? buildTrackForOccupation(occupation) : null;
    const tracks = this.selectRecommendedTracks(result);

    return {
      profileType: result.profileType,
      occupationTitle: occupationTrack?.title,
      recommendedTracks: occupationTrack ? [occupationTrack, ...tracks] : tracks,
      quickWins: this.selectQuickWins(result),
      longTermGoals: this.generateLongTermGoals(result),
      milestones: this.generateMilestones(),
    };
  }

  private selectQuickWins(result: ProfileResult): LearningModule[] {
    const wanted = new Set<FunctionalDomainId>(result.topDomainIds);

    const domainPicks = MODULE_CATALOG.filter(
      (module) =>
        module.isFree &&
        module.difficulty === 'Debutant' &&
        (module.domains ?? []).some((domain) => wanted.has(domain))
    );
    const employability = MODULE_CATALOG.filter(
      (module) => module.category === 'Employabilite' && module.isFree
    );

    return uniqueModules([...domainPicks, ...employability]).slice(0, 3);
  }

  private selectRecommendedTracks(result: ProfileResult): LearningTrack[] {
    const tracks = result.topDomainIds
      .map((domainId) => buildTrackForDomain(domainId))
      .filter((track): track is LearningTrack => track !== null);

    if (tracks.length > 0) {
      return tracks;
    }

    const employabilityModules = MODULE_CATALOG.filter(
      (module) => module.category === 'Employabilite' && module.isFree
    );
    if (employabilityModules.length === 0) {
      return [];
    }
    return [
      {
        id: 'track_employabilite',
        title: 'Parcours Employabilité',
        description: 'Consolidez les bases qui ouvrent toutes les portes : CV, LinkedIn et posture professionnelle.',
        modules: employabilityModules,
        estimatedWeeks: estimateWeeks(employabilityModules),
        targetSkills: extractSkills(employabilityModules),
      },
    ];
  }

  private generateLongTermGoals(result: ProfileResult): string[] {
    const goals: Record<CareerSituation, string[]> = {
      bachelier: [
        "Choisir et intégrer une filière alignée sur votre domaine prioritaire",
        'Bâtir un premier portfolio de projets simples',
        'Développer un réseau dans le domaine visé',
      ],
      jeune_diplome: [
        "Décrocher votre premier emploi dans votre domaine d'intérêt",
        'Constituer un portfolio professionnel solide',
        'Développer un réseau professionnel actif',
      ],
      reconversion: [
        'Acquérir les compétences-clés de votre nouveau domaine',
        'Valider votre transition avec un projet concret',
        "Positionner votre expérience passée comme atout",
      ],
      professionnel: [
        'Obtenir une certification reconnue dans votre domaine',
        'Élargir votre expertise technique ou managériale',
        'Accéder à des responsabilités supérieures',
      ],
    };
    return goals[result.situation];
  }

  private generateMilestones(): Milestone[] {
    return [
      {
        id: 'milestone_1',
        title: 'Démarrage : première semaine',
        description: 'Familiarisez-vous avec la plateforme et complétez vos premiers modules',
        timeframe: 'Semaine 1',
        criteria: ['Profil complété à 100 %', 'Premier module terminé', 'Objectifs définis'],
      },
      {
        id: 'milestone_2',
        title: 'Progression : Premier mois',
        description: 'Développez vos compétences de base et lancez un projet pratique',
        timeframe: 'Mois 1',
        criteria: [
          '3 à 5 modules complétés',
          'Premier projet pratique démarré',
          'Participation à la communauté',
        ],
      },
      {
        id: 'milestone_3',
        title: 'Validation : Trois mois',
        description: 'Validez vos acquis et positionnez-vous sur le marché',
        timeframe: 'Mois 3',
        criteria: [
          'Parcours principal complété à 70 %',
          'Portfolio ou projet finalisé',
          'CV et profil LinkedIn optimisés',
        ],
      },
    ];
  }
}

export const pathwayEngine = new PathwayEngine();
