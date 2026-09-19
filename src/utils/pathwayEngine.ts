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
    description: 'Apprenez a creer un CV qui se demarque sur le marche africain francophone',
    duration: '2 heures',
    difficulty: 'Debutant',
    category: 'Employabilite',
    skills: ['Redaction CV', 'Personal Branding', 'Communication'],
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
    title: 'Introduction au Developpement Web',
    description: 'Decouvrez les bases du HTML, CSS et JavaScript',
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
    title: 'Marketing Digital pour Debutants',
    description: 'Maitrisez les fondamentaux du marketing digital et des reseaux sociaux',
    duration: '3 semaines',
    difficulty: 'Debutant',
    category: 'Business',
    skills: ['Marketing Digital', 'Reseaux Sociaux', 'Content Marketing', 'SEO'],
    format: 'Video',
    isFree: true,
    domains: ['commerce_marketing'],
  },
  {
    id: 'mod_excel',
    title: 'Excel pour Professionnels',
    description: 'De la saisie de donnees aux tableaux croises dynamiques',
    duration: '2 semaines',
    difficulty: 'Intermediaire',
    category: 'Gestion',
    skills: ['Excel', 'Analyse de donnees', 'Productivite'],
    format: 'Interactif',
    isFree: true,
    domains: ['administration', 'finance'],
  },
  {
    id: 'mod_design_thinking',
    title: 'Design Thinking & Innovation',
    description: 'Apprenez a resoudre des problemes de maniere creative',
    duration: '3 semaines',
    difficulty: 'Intermediaire',
    category: 'Creativite',
    skills: ['Design Thinking', 'Innovation', 'Problem Solving', 'Creativite'],
    format: 'Projet',
    isFree: false,
    domains: ['commerce_marketing', 'administration'],
  },
  {
    id: 'mod_communication',
    title: 'Communication Professionnelle Efficace',
    description: 'Developpez vos competences de communication en milieu professionnel',
    duration: '2 semaines',
    difficulty: 'Debutant',
    category: 'Education',
    skills: ['Communication', 'Presentation', 'Ecoute Active'],
    format: 'Video',
    isFree: true,
    domains: ['education', 'tourisme', 'commerce_marketing'],
  },
  {
    id: 'mod_entrepreneurship',
    title: "Entrepreneuriat : De l'idee au lancement",
    description: 'Transformez votre idee en projet entrepreneurial viable',
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
    title: 'Analyse de Donnees avec Python',
    description: "Decouvrez l'analyse de donnees avec Python et Pandas",
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
    description: 'Maitrisez les methodes agiles pour gerer vos projets efficacement',
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
    description: 'Creez des interfaces utilisateur professionnelles avec Figma',
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
    title: 'Techniques de Formation et Pedagogie',
    description: 'Apprenez a transmettre vos connaissances efficacement',
    duration: '3 semaines',
    difficulty: 'Intermediaire',
    category: 'Education',
    skills: ['Pedagogie', 'Formation', 'Animation', 'Evaluation'],
    format: 'Video',
    isFree: true,
    domains: ['education'],
  },
  {
    id: 'mod_intro_ingenierie',
    title: 'Lecture de plan et bases du genie',
    description: 'Decouvrez les fondamentaux techniques : lecture de plans, outils et normes',
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
    title: "Introduction a l'agribusiness",
    description: "Du champ au marche : bases de production vegetale et valorisation agricole",
    duration: '5 semaines',
    difficulty: 'Debutant',
    category: 'Agriculture',
    skills: ['Production vegetale', 'Elevage', 'Agroalimentaire', 'Gestion agricole'],
    format: 'Projet',
    isFree: true,
    domains: ['agriculture'],
  },
  {
    id: 'mod_soins_base',
    title: 'Fondamentaux du soin et de l’accompagnement',
    description: "Hygiene, bientraitance et premiers gestes pour les metiers de la santé et du social",
    duration: '3 semaines',
    difficulty: 'Debutant',
    category: 'Sante',
    skills: ['Soins de base', 'Hygiene', 'Bientraitance', 'Accompagnement'],
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
        estimatedWeeks: 3,
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
    return {
      id: `track_${domainId}`,
      title: `Parcours ${domain.label}`,
      description: `${domain.tagline}. Developpez vos competences de maniere progressive et structuree.`,
      modules: modules.slice(0, 5),
      estimatedWeeks: 8,
      targetSkills: this.extractSkills(modules),
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
        "Choisir et integrer une filiere alignee sur votre domaine prioritaire",
        'Batir un premier portfolio de projets simples',
        'Developper un reseau dans le domaine vise',
      ],
      jeune_diplome: [
        "Decrocher votre premier emploi dans votre domaine d'interet",
        'Constituer un portfolio professionnel solide',
        'Developper un reseau professionnel actif',
      ],
      reconversion: [
        'Acquerir les competences-cles de votre nouveau domaine',
        'Valider votre transition avec un projet concret',
        "Positionner votre experience passee comme atout",
      ],
      professionnel: [
        'Obtenir une certification reconnue dans votre domaine',
        'Elargir votre expertise technique ou manageriale',
        'Acceder a des responsabilites superieures',
      ],
    };
    return goals[result.situation];
  }

  private generateMilestones(): Milestone[] {
    return [
      {
        id: 'milestone_1',
        title: 'Demarrage : Premiere semaine',
        description: 'Familiarisez-vous avec la plateforme et completez vos premiers modules',
        timeframe: 'Semaine 1',
        criteria: ['Profil complete a 100%', 'Premier module termine', 'Objectifs definis'],
      },
      {
        id: 'milestone_2',
        title: 'Progression : Premier mois',
        description: 'Developpez vos competences de base et lancez un projet pratique',
        timeframe: 'Mois 1',
        criteria: [
          '3 a 5 modules completes',
          'Premier projet pratique demarre',
          'Participation a la communaute',
        ],
      },
      {
        id: 'milestone_3',
        title: 'Validation : Trois mois',
        description: 'Validez vos acquis et positionnez-vous sur le marche',
        timeframe: 'Mois 3',
        criteria: [
          'Parcours principal complete a 70%',
          'Portfolio ou projet finalise',
          'CV et profil LinkedIn optimises',
        ],
      },
    ];
  }
}

export const pathwayEngine = new PathwayEngine();
