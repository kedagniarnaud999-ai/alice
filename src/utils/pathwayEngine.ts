import { ProfileResult } from '@/types/test';

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  category: string;
  skills: string[];
  format: 'Vidéo' | 'Projet' | 'Lecture' | 'Interactif';
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

class PathwayEngine {
  generatePathway(result: ProfileResult): PersonalizedPathway {
    const quickWins = this.selectQuickWins(result);
    const tracks = this.selectRecommendedTracks(result);
    const goals = this.generateLongTermGoals(result);
    const milestones = this.generateMilestones(result);

    return {
      profileType: result.profileType,
      recommendedTracks: tracks,
      quickWins,
      longTermGoals: goals,
      milestones,
    };
  }

  private selectQuickWins(result: ProfileResult): LearningModule[] {
    const allModules = this.getAllModules();
    const primaryInterest = result.primaryInterests[0]?.toLowerCase() || '';
    
    return allModules
      .filter(module => {
        const categoryMatch = module.category.toLowerCase().includes(primaryInterest) ||
                            primaryInterest.includes(module.category.toLowerCase());
        return categoryMatch && module.difficulty === 'Débutant' && module.isFree;
      })
      .slice(0, 3);
  }

  private selectRecommendedTracks(result: ProfileResult): LearningTrack[] {
    const tracks: LearningTrack[] = [];
    
    result.primaryInterests.slice(0, 2).forEach((interest, index) => {
      const track = this.buildTrackForInterest(interest, result);
      if (track) tracks.push(track);
    });

    return tracks;
  }

  private buildTrackForInterest(interest: string, result: ProfileResult): LearningTrack | null {
    const modules = this.getModulesForInterest(interest);
    
    if (modules.length === 0) return null;

    return {
      id: `track_${interest.toLowerCase().replace(/\s+/g, '_')}`,
      title: `Parcours ${interest}`,
      description: `Développez vos compétences en ${interest} de manière progressive et structurée.`,
      modules: modules.slice(0, 5),
      estimatedWeeks: 8,
      targetSkills: this.extractSkills(modules),
    };
  }

  private getModulesForInterest(interest: string): LearningModule[] {
    const allModules = this.getAllModules();
    const interestLower = interest.toLowerCase();
    
    return allModules.filter(module => {
      const categoryMatch = module.category.toLowerCase().includes(interestLower) ||
                          interestLower.includes(module.category.toLowerCase());
      return categoryMatch;
    });
  }

  private extractSkills(modules: LearningModule[]): string[] {
    const skills = new Set<string>();
    modules.forEach(module => {
      module.skills.forEach(skill => skills.add(skill));
    });
    return Array.from(skills).slice(0, 8);
  }

  private generateLongTermGoals(result: ProfileResult): string[] {
    const goals: string[] = [];

    if (result.careerStage.includes('diplômé')) {
      goals.push('Décrocher votre premier emploi dans votre domaine d\'intérêt');
      goals.push('Constituer un portfolio professionnel solide');
      goals.push('Développer un réseau professionnel actif');
    } else if (result.careerStage.includes('reconversion')) {
      goals.push('Acquérir les compétences-clés de votre nouveau domaine');
      goals.push('Valider votre transition avec un projet concret');
      goals.push('Positionner votre expérience passée comme atout');
    } else if (result.careerStage.includes('compétences')) {
      goals.push('Obtenir une certification reconnue dans votre domaine');
      goals.push('Élargir votre expertise technique ou managériale');
      goals.push('Accéder à des responsabilités supérieures');
    } else {
      goals.push('Clarifier votre projet professionnel');
      goals.push('Développer des compétences recherchées sur le marché');
      goals.push('Améliorer votre employabilité et votre positionnement');
    }

    return goals;
  }

  private generateMilestones(result: ProfileResult): Milestone[] {
    return [
      {
        id: 'milestone_1',
        title: 'Démarrage : Première semaine',
        description: 'Familiarisez-vous avec la plateforme et complétez vos premiers modules',
        timeframe: 'Semaine 1',
        criteria: [
          'Profil complété à 100%',
          'Premier module terminé',
          'Objectifs définis',
        ],
      },
      {
        id: 'milestone_2',
        title: 'Progression : Premier mois',
        description: 'Développez vos compétences de base et lancez un projet pratique',
        timeframe: 'Mois 1',
        criteria: [
          '3-5 modules complétés',
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
          'Parcours principal complété à 70%',
          'Portfolio ou projet finalisé',
          'CV et profil LinkedIn optimisés',
        ],
      },
    ];
  }

  private getAllModules(): LearningModule[] {
    return [
      {
        id: 'mod_cv_building',
        title: 'Construire un CV percutant pour l\'Afrique',
        description: 'Apprenez à créer un CV qui se démarque sur le marché africain francophone',
        duration: '2 heures',
        difficulty: 'Débutant',
        category: 'Employabilité',
        skills: ['Rédaction CV', 'Personal Branding', 'Communication'],
        format: 'Vidéo',
        isFree: true,
      },
      {
        id: 'mod_linkedin',
        title: 'Optimiser votre profil LinkedIn',
        description: 'Transformez votre profil LinkedIn en outil de networking professionnel',
        duration: '1.5 heures',
        difficulty: 'Débutant',
        category: 'Employabilité',
        skills: ['LinkedIn', 'Networking', 'Personal Branding'],
        format: 'Interactif',
        isFree: true,
      },
      {
        id: 'mod_web_intro',
        title: 'Introduction au Développement Web',
        description: 'Découvrez les bases du HTML, CSS et JavaScript',
        duration: '4 semaines',
        difficulty: 'Débutant',
        category: 'Technologie',
        skills: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
        format: 'Vidéo',
        isFree: true,
      },
      {
        id: 'mod_digital_marketing',
        title: 'Marketing Digital pour Débutants',
        description: 'Maîtrisez les fondamentaux du marketing digital et des réseaux sociaux',
        duration: '3 semaines',
        difficulty: 'Débutant',
        category: 'Business',
        skills: ['Marketing Digital', 'Réseaux Sociaux', 'Content Marketing', 'SEO'],
        format: 'Vidéo',
        isFree: true,
      },
      {
        id: 'mod_excel',
        title: 'Excel pour Professionnels',
        description: 'De la saisie de données aux tableaux croisés dynamiques',
        duration: '2 semaines',
        difficulty: 'Intermédiaire',
        category: 'Gestion',
        skills: ['Excel', 'Analyse de données', 'Productivité'],
        format: 'Interactif',
        isFree: true,
      },
      {
        id: 'mod_design_thinking',
        title: 'Design Thinking & Innovation',
        description: 'Apprenez à résoudre des problèmes de manière créative',
        duration: '3 semaines',
        difficulty: 'Intermédiaire',
        category: 'Créativité',
        skills: ['Design Thinking', 'Innovation', 'Problem Solving', 'Créativité'],
        format: 'Projet',
        isFree: false,
      },
      {
        id: 'mod_communication',
        title: 'Communication Professionnelle Efficace',
        description: 'Développez vos compétences de communication en milieu professionnel',
        duration: '2 semaines',
        difficulty: 'Débutant',
        category: 'Éducation',
        skills: ['Communication', 'Présentation', 'Écoute Active'],
        format: 'Vidéo',
        isFree: true,
      },
      {
        id: 'mod_entrepreneurship',
        title: 'Entrepreneuriat : De l\'idée au lancement',
        description: 'Transformez votre idée en projet entrepreneurial viable',
        duration: '6 semaines',
        difficulty: 'Intermédiaire',
        category: 'Business',
        skills: ['Entrepreneuriat', 'Business Plan', 'Pitch', 'Gestion'],
        format: 'Projet',
        isFree: false,
      },
      {
        id: 'mod_data_analysis',
        title: 'Analyse de Données avec Python',
        description: 'Découvrez l\'analyse de données avec Python et Pandas',
        duration: '5 semaines',
        difficulty: 'Intermédiaire',
        category: 'Technologie',
        skills: ['Python', 'Pandas', 'Data Analysis', 'Visualisation'],
        format: 'Projet',
        isFree: true,
      },
      {
        id: 'mod_project_mgmt',
        title: 'Gestion de Projet Agile',
        description: 'Maîtrisez les méthodes agiles pour gérer vos projets efficacement',
        duration: '4 semaines',
        difficulty: 'Intermédiaire',
        category: 'Gestion',
        skills: ['Gestion de Projet', 'Agile', 'Scrum', 'Organisation'],
        format: 'Vidéo',
        isFree: false,
      },
      {
        id: 'mod_ui_design',
        title: 'UI Design avec Figma',
        description: 'Créez des interfaces utilisateur professionnelles avec Figma',
        duration: '4 semaines',
        difficulty: 'Débutant',
        category: 'Créativité',
        skills: ['UI Design', 'Figma', 'Design', 'Prototypage'],
        format: 'Projet',
        isFree: true,
      },
      {
        id: 'mod_teaching',
        title: 'Techniques de Formation et Pédagogie',
        description: 'Apprenez à transmettre vos connaissances efficacement',
        duration: '3 semaines',
        difficulty: 'Intermédiaire',
        category: 'Éducation',
        skills: ['Pédagogie', 'Formation', 'Animation', 'Évaluation'],
        format: 'Vidéo',
        isFree: true,
      },
    ];
  }
}

export const pathwayEngine = new PathwayEngine();
