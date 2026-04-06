import { ProfileResult } from '@/types/test';

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
  },
];

class PathwayEngine {
  generatePathway(result: ProfileResult): PersonalizedPathway {
    const quickWins = this.selectQuickWins(result);
    const tracks = this.selectRecommendedTracks(result);
    const goals = this.generateLongTermGoals(result);
    const milestones = this.generateMilestones();

    return {
      profileType: result.profileType,
      recommendedTracks: tracks,
      quickWins,
      longTermGoals: goals,
      milestones,
    };
  }

  private selectQuickWins(result: ProfileResult): LearningModule[] {
    const primaryInterest = result.primaryInterests[0]?.toLowerCase() || '';

    return MODULE_CATALOG.filter((module) => {
      const categoryMatch =
        module.category.toLowerCase().includes(primaryInterest) ||
        primaryInterest.includes(module.category.toLowerCase());

      return categoryMatch && module.difficulty === 'Debutant' && module.isFree;
    }).slice(0, 3);
  }

  private selectRecommendedTracks(result: ProfileResult): LearningTrack[] {
    return result.primaryInterests
      .slice(0, 2)
      .map((interest) => this.buildTrackForInterest(interest))
      .filter((track): track is LearningTrack => track !== null);
  }

  private buildTrackForInterest(interest: string): LearningTrack | null {
    const modules = this.getModulesForInterest(interest);

    if (modules.length === 0) {
      return null;
    }

    return {
      id: `track_${interest.toLowerCase().replace(/\s+/g, '_')}`,
      title: `Parcours ${interest}`,
      description: `Developpez vos competences en ${interest} de maniere progressive et structuree.`,
      modules: modules.slice(0, 5),
      estimatedWeeks: 8,
      targetSkills: this.extractSkills(modules),
    };
  }

  private getModulesForInterest(interest: string): LearningModule[] {
    const interestLower = interest.toLowerCase();

    return MODULE_CATALOG.filter((module) => {
      const categoryMatch =
        module.category.toLowerCase().includes(interestLower) ||
        interestLower.includes(module.category.toLowerCase());
      return categoryMatch;
    });
  }

  private extractSkills(modules: LearningModule[]): string[] {
    const skills = new Set<string>();
    modules.forEach((module) => {
      module.skills.forEach((skill) => skills.add(skill));
    });
    return Array.from(skills).slice(0, 8);
  }

  private generateLongTermGoals(result: ProfileResult): string[] {
    const careerStage = result.careerStage.toLowerCase();

    if (careerStage.includes('diplome')) {
      return [
        "Decrocher votre premier emploi dans votre domaine d'interet",
        'Constituer un portfolio professionnel solide',
        'Developper un reseau professionnel actif',
      ];
    }

    if (careerStage.includes('reconversion')) {
      return [
        'Acquerir les competences-cles de votre nouveau domaine',
        'Valider votre transition avec un projet concret',
        'Positionner votre experience passee comme atout',
      ];
    }

    if (careerStage.includes('competence')) {
      return [
        'Obtenir une certification reconnue dans votre domaine',
        'Elargir votre expertise technique ou manageriale',
        'Acceder a des responsabilites superieures',
      ];
    }

    return [
      'Clarifier votre projet professionnel',
      'Developper des competences recherchees sur le marche',
      'Ameliorer votre employabilite et votre positionnement',
    ];
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
