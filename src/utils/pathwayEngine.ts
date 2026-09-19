import { ProfileResult, FunctionalDomainId, CareerSituation } from '@/types/test';
import { FUNCTIONAL_DOMAINS_BY_ID } from '@/data/domains';

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Debutant' | 'Intermediaire' | 'Avance';
  category: string;
  skills: string[];
  format: 'Video' | 'Projet' | 'Lecture' | 'Interactif';
  isFree: boolean;
  /** Functional domains this module develops. Absent = cross-cutting (employability). */
  domains?: FunctionalDomainId[];
}

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

export const MODULE_CATALOG: LearningModule[] = [
  {
    id: 'mod_cv_building',
    title: "Construire un CV percutant pour l'Afrique",
    description: "Apprenez à créer un CV qui se démarque sur le marché africain francophone",
    duration: '2 heures',
    difficulty: 'Debutant',
    category: 'Employabilite',
    skills: ['Rédaction CV', 'Personal Branding', 'Communication'],
    format: 'Video',
    isFree: true,
  },
  {
    id: 'mod_linkedin',
    title: 'Optimiser votre profil LinkedIn',
    description: 'Transformez votre profil LinkedIn en outil de networking professionnel',
    duration: '1.5 heures',
    difficulty: 'Debutant',
    category: 'Employabilite',
    skills: ['LinkedIn', 'Networking', 'Personal Branding'],
    format: 'Interactif',
    isFree: true,
  },
  {
    id: 'mod_web_intro',
    title: 'Introduction au Développement Web',
    description: 'Découvrez les bases du HTML, CSS et JavaScript',
    duration: '4 semaines',
    difficulty: 'Debutant',
    category: 'Technologie',
    skills: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
    format: 'Video',
    isFree: true,
    domains: ['ict'],
  },
  {
    id: 'mod_digital_marketing',
    title: 'Marketing Digital pour Débutants',
    description: 'Maîtrisez les fondamentaux du marketing digital et des réseaux sociaux',
    duration: '3 semaines',
    difficulty: 'Debutant',
    category: 'Business',
    skills: ['Marketing Digital', 'Réseaux Sociaux', 'Content Marketing', 'SEO'],
    format: 'Video',
    isFree: true,
    domains: ['commerce_marketing'],
  },
  {
    id: 'mod_excel',
    title: 'Excel pour Professionnels',
    description: 'De la saisie de données aux tableaux croisés dynamiques',
    duration: '2 semaines',
    difficulty: 'Intermediaire',
    category: 'Gestion',
    skills: ['Excel', 'Analyse de données', 'Productivité'],
    format: 'Interactif',
    isFree: true,
    domains: ['administration', 'finance'],
  },
  {
    id: 'mod_design_thinking',
    title: 'Design Thinking & Innovation',
    description: 'Apprenez à résoudre des problèmes de manière créative',
    duration: '3 semaines',
    difficulty: 'Intermediaire',
    category: 'Creativite',
    skills: ['Design Thinking', 'Innovation', 'Problem Solving', 'Créativité'],
    format: 'Projet',
    isFree: false,
    domains: ['commerce_marketing', 'administration'],
  },
  {
    id: 'mod_communication',
    title: 'Communication Professionnelle Efficace',
    description: 'Développez vos compétences de communication en milieu professionnel',
    duration: '2 semaines',
    difficulty: 'Debutant',
    category: 'Education',
    skills: ['Communication', 'Présentation', 'Écoute Active'],
    format: 'Video',
    isFree: true,
    domains: ['education', 'tourisme', 'commerce_marketing'],
  },
  {
    id: 'mod_entrepreneurship',
    title: "Entrepreneuriat : De l'idée au lancement",
    description: 'Transformez votre idée en projet entrepreneurial viable',
    duration: '6 semaines',
    difficulty: 'Intermediaire',
    category: 'Business',
    skills: ['Entrepreneuriat', 'Business Plan', 'Pitch', 'Gestion'],
    format: 'Projet',
    isFree: false,
    domains: ['commerce_marketing', 'administration'],
  },
  {
    id: 'mod_data_analysis',
    title: 'Analyse de Données avec Python',
    description: "Découvrez l'analyse de données avec Python et Pandas",
    duration: '5 semaines',
    difficulty: 'Intermediaire',
    category: 'Technologie',
    skills: ['Python', 'Pandas', 'Data Analysis', 'Visualisation'],
    format: 'Projet',
    isFree: true,
    domains: ['ict', 'finance'],
  },
  {
    id: 'mod_project_mgmt',
    title: 'Gestion de Projet Agile',
    description: 'Maîtrisez les méthodes agiles pour gérer vos projets efficacement',
    duration: '4 semaines',
    difficulty: 'Intermediaire',
    category: 'Gestion',
    skills: ['Gestion de Projet', 'Agile', 'Scrum', 'Organisation'],
    format: 'Video',
    isFree: false,
    domains: ['administration', 'logistique'],
  },
  {
    id: 'mod_ui_design',
    title: 'UI Design avec Figma',
    description: 'Créez des interfaces utilisateur professionnelles avec Figma',
    duration: '4 semaines',
    difficulty: 'Debutant',
    category: 'Creativite',
    skills: ['UI Design', 'Figma', 'Design', 'Prototypage'],
    format: 'Projet',
    isFree: true,
    domains: ['ict', 'commerce_marketing'],
  },
  {
    id: 'mod_teaching',
    title: 'Techniques de Formation et Pédagogie',
    description: 'Apprenez à transmettre vos connaissances efficacement',
    duration: '3 semaines',
    difficulty: 'Intermediaire',
    category: 'Education',
    skills: ['Pédagogie', 'Formation', 'Animation', 'Évaluation'],
    format: 'Video',
    isFree: true,
    domains: ['education'],
  },
  {
    id: 'mod_intro_ingenierie',
    title: 'Lecture de plan et bases du génie',
    description: 'Découvrez les fondamentaux techniques : lecture de plans, outils et normes',
    duration: '4 semaines',
    difficulty: 'Debutant',
    category: 'Technique',
    skills: ['Lecture de plan', 'Dessin technique', 'Normes', 'Calcul de base'],
    format: 'Projet',
    isFree: true,
    domains: ['ingenierie', 'logistique'],
  },
  {
    id: 'mod_agribusiness',
    title: "Introduction à l'agribusiness",
    description: "Du champ au marché : bases de production végétale et valorisation agricole",
    duration: '5 semaines',
    difficulty: 'Debutant',
    category: 'Agriculture',
    skills: ['Production végétale', 'Élevage', 'Agroalimentaire', 'Gestion agricole'],
    format: 'Projet',
    isFree: true,
    domains: ['agriculture'],
  },
  {
    id: 'mod_soins_base',
    title: 'Fondamentaux du soin et de l’accompagnement',
    description: "Hygiène, bientraitance et premiers gestes pour les métiers de la santé et du social",
    duration: '3 semaines',
    difficulty: 'Debutant',
    category: 'Sante',
    skills: ['Soins de base', 'Hygiène', 'Bientraitance', 'Accompagnement'],
    format: 'Video',
    isFree: true,
    domains: ['sante_social'],
  },
];

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

class PathwayEngine {
  generatePathway(result: ProfileResult): PersonalizedPathway {
    return {
      profileType: result.profileType,
      recommendedTracks: this.selectRecommendedTracks(result),
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
      .map((domainId) => this.buildTrackForDomain(domainId))
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
        targetSkills: this.extractSkills(employabilityModules),
      },
    ];
  }

  private buildTrackForDomain(domainId: FunctionalDomainId): LearningTrack | null {
    const modules = MODULE_CATALOG.filter((module) =>
      (module.domains ?? []).includes(domainId)
    );
    if (modules.length === 0) {
      return null;
    }
    const domain = FUNCTIONAL_DOMAINS_BY_ID[domainId];
    const trackModules = modules.slice(0, 5);
    return {
      id: `track_${domainId}`,
      title: `Parcours ${domain.label}`,
      description: `${domain.tagline}. Développez vos compétences de manière progressive et structurée.`,
      modules: trackModules,
      estimatedWeeks: estimateWeeks(trackModules),
      targetSkills: this.extractSkills(trackModules),
    };
  }

  private extractSkills(modules: LearningModule[]): string[] {
    const skills = new Set<string>();
    modules.forEach((module) => {
      module.skills.forEach((skill) => skills.add(skill));
    });
    return Array.from(skills).slice(0, 8);
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
