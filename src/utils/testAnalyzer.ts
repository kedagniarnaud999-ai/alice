import { ProfileResult, TestResponse, DimensionScore } from '@/types/test';
import { orientationQuestions } from '@/data/questions';

interface ScoreMap {
  [key: string]: number;
}

export class TestAnalyzer {
  private responses: TestResponse[];
  private dimensionScores: Map<string, ScoreMap>;

  constructor(responses: TestResponse[]) {
    this.responses = responses;
    this.dimensionScores = new Map();
  }

  analyze(): ProfileResult {
    this.calculateScores();

    const profileType = this.determineProfileType();
    const naturalTalents = this.extractNaturalTalents();
    const motivationDrivers = this.extractMotivationDrivers();
    const primaryInterests = this.extractPrimaryInterests();
    const careerStage = this.determineCareerStage();
    const feasibilityAssessment = this.assessFeasibility();
    const nextActions = this.generateNextActions(careerStage, primaryInterests);

    return {
      profileType,
      profileDescription: this.getProfileDescription(profileType),
      naturalTalents,
      motivationDrivers,
      primaryInterests,
      careerStage,
      feasibilityAssessment,
      nextActions,
      dimensionScores: this.formatDimensionScores(),
    };
  }

  private calculateScores() {
    this.responses.forEach((response) => {
      const question = orientationQuestions.find(q => q.id === response.questionId);
      if (!question) return;

      response.selectedOptions.forEach((optionId) => {
        const option = question.options.find(opt => opt.id === optionId);
        if (!option) return;

        Object.entries(option.weights).forEach(([key, weight]) => {
          if (!this.dimensionScores.has(question.dimension)) {
            this.dimensionScores.set(question.dimension, {});
          }
          
          const dimScores = this.dimensionScores.get(question.dimension)!;
          dimScores[key] = (dimScores[key] || 0) + weight;
        });
      });
    });
  }

  private getTopScores(dimension: string, limit: number = 3): string[] {
    const scores = this.dimensionScores.get(dimension) || {};
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([key]) => key);
  }

  private determineProfileType(): string {
    const cognitiveTop = this.getTopScores('cognitive', 2);
    const passionTop = this.getTopScores('passion', 1);

    const cognitiveMap: { [key: string]: string } = {
      analytical: 'Analytique',
      structured: 'Structuré',
      experimental: 'Expérimental',
      pragmatic: 'Pragmatique',
      collaborative: 'Collaboratif',
      adaptive: 'Adaptatif',
      intuitive: 'Intuitif',
    };

    const passionMap: { [key: string]: string } = {
      innovation: 'Innovateur',
      impact: 'Impact',
      challenge: 'Orienté Défis',
      autonomy: 'Autonome',
      stability: 'Stabilité',
      learning: 'Apprenant',
    };

    const cognitive1 = cognitiveMap[cognitiveTop[0]] || 'Polyvalent';
    const passion1 = passionMap[passionTop[0]] || 'Motivé';

    return `${cognitive1} ${passion1}`;
  }

  private getProfileDescription(profileType: string): string {
    const descriptions: { [key: string]: string } = {
      'Analytique Innovateur': 'Vous excellez dans la résolution de problèmes complexes avec une approche créative. Vous aimez décortiquer les systèmes et proposer des solutions nouvelles basées sur la logique et l\'analyse.',
      'Structuré Stabilité': 'Vous prospérez dans des environnements organisés où les processus sont clairs. Vous apportez de la rigueur et de la fiabilité dans tout ce que vous entreprenez.',
      'Pragmatique Impact': 'Vous cherchez des solutions concrètes qui font une vraie différence. Vous êtes orienté résultats et aimez voir l\'impact tangible de votre travail.',
      'Collaboratif Impact': 'Vous réussissez en travaillant avec les autres pour créer du changement positif. Votre force réside dans votre capacité à mobiliser et inspirer.',
      'Expérimental Innovateur': 'Vous apprenez par l\'action et n\'avez pas peur d\'essayer de nouvelles approches. Vous êtes à l\'aise avec l\'incertitude et l\'exploration.',
    };

    return descriptions[profileType] || 'Vous avez un profil polyvalent qui vous permet de vous adapter à différents contextes professionnels. Vos forces résident dans votre capacité à combiner plusieurs approches pour atteindre vos objectifs.';
  }

  private extractNaturalTalents(): string[] {
    const talentScores = this.dimensionScores.get('talents') || {};
    const topTalents = Object.entries(talentScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const talentMap: { [key: string]: string } = {
      analytical_talent: 'Analyse et résolution de problèmes',
      organizational_talent: 'Organisation et coordination',
      communication_talent: 'Communication et pédagogie',
      creative_talent: 'Créativité et expression',
      interpersonal_talent: 'Relations interpersonnelles et empathie',
      resourcefulness_talent: 'Débrouillardise et pragmatisme',
      technical_talent: 'Compétences techniques et digitales',
      linguistic_talent: 'Langues et communication',
      leadership: 'Leadership et influence',
      problem_solving: 'Résolution de problèmes complexes',
    };

    return topTalents.map(([key]) => talentMap[key] || key).filter(Boolean).slice(0, 4);
  }

  private extractMotivationDrivers(): string[] {
    const passionScores = this.dimensionScores.get('passion') || {};
    const topMotivations = Object.entries(passionScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4);

    const motivationMap: { [key: string]: string } = {
      innovation: 'Innovation et créativité',
      impact: 'Impact social et contribution',
      challenge: 'Défis et accomplissement',
      autonomy: 'Autonomie et liberté',
      stability: 'Sécurité et stabilité',
      learning: 'Apprentissage continu',
      recognition: 'Reconnaissance et validation',
      achievement: 'Atteinte d\'objectifs mesurables',
      collaboration: 'Travail d\'équipe',
      growth: 'Développement personnel',
    };

    return topMotivations.map(([key]) => motivationMap[key] || key).filter(Boolean);
  }

  private extractPrimaryInterests(): string[] {
    const interestScores = this.dimensionScores.get('interests') || {};
    const topInterests = Object.entries(interestScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4);

    const interestMap: { [key: string]: string } = {
      tech: 'Technologie & Digital',
      business: 'Business & Entrepreneuriat',
      education: 'Éducation & Formation',
      health: 'Santé & Bien-être',
      creative: 'Créativité & Design',
      management: 'Gestion & Administration',
      digital: 'Transformation digitale',
      commercial: 'Commerce & Vente',
      social_impact: 'Impact social',
      entrepreneurship: 'Entrepreneuriat',
    };

    return topInterests.map(([key]) => interestMap[key] || key).filter(Boolean);
  }

  private determineCareerStage(): string {
    const positioningScores = this.dimensionScores.get('positioning') || {};
    
    const stages = [
      { key: 'stage_graduate', label: 'Jeune diplômé en insertion' },
      { key: 'stage_upskilling', label: 'Professionnel en montée en compétences' },
      { key: 'stage_reconversion', label: 'Professionnel en reconversion' },
      { key: 'stage_jobseeker', label: 'Chercheur d\'emploi actif' },
      { key: 'stage_repositioning', label: 'Professionnel en repositionnement' },
    ];

    let maxScore = 0;
    let stage = stages[0].label;

    stages.forEach(({ key, label }) => {
      if (positioningScores[key] > maxScore) {
        maxScore = positioningScores[key];
        stage = label;
      }
    });

    return stage;
  }

  private assessFeasibility(): string {
    const realityScores = this.dimensionScores.get('reality') || {};
    
    const timeAvailable = realityScores['time_full'] || realityScores['time_high'] || 
                          realityScores['time_medium'] || realityScores['time_low'] || 0;
    
    const hasComputer = realityScores['resource_computer'] || 0;
    const hasInternet = realityScores['resource_internet'] || 0;
    const hasBudget = realityScores['resource_budget'] || 0;

    let feasibility = '';

    if (timeAvailable >= 3 && hasComputer >= 2 && hasInternet >= 2) {
      feasibility = 'Excellent : Vous avez les ressources nécessaires pour un parcours d\'apprentissage intensif. Vous pouvez viser des formations complètes et des projets ambitieux.';
    } else if (timeAvailable >= 2 && (hasComputer >= 1 || hasInternet >= 1)) {
      feasibility = 'Bon : Avec vos ressources actuelles, privilégiez des modules courts et flexibles. L\'apprentissage mobile peut être une bonne option.';
    } else {
      feasibility = 'Réaliste : Vos contraintes actuelles nécessitent une approche progressive. Commencez par des micro-formations accessibles et des ressources gratuites.';
    }

    const mainConstraint = this.getTopScores('reality', 1).find(key => key.startsWith('constraint_'));
    if (mainConstraint === 'constraint_time') {
      feasibility += ' Optimisez votre temps avec des sessions courtes quotidiennes (15-30min).';
    } else if (mainConstraint === 'constraint_money') {
      feasibility += ' Concentrez-vous d\'abord sur les ressources gratuites de qualité.';
    } else if (mainConstraint === 'constraint_direction') {
      feasibility += ' Un parcours guidé étape par étape sera idéal pour vous.';
    }

    return feasibility;
  }

  private generateNextActions(stage: string, interests: string[]): string[] {
    const actions: string[] = [];

    if (stage.includes('diplômé')) {
      actions.push('Complétez votre profil avec vos compétences et projets');
      actions.push('Suivez le module "Construire son CV pour le marché africain"');
      actions.push(`Explorez la piste : ${interests[0] || 'Technologie & Digital'}`);
    } else if (stage.includes('reconversion')) {
      actions.push('Identifiez vos compétences transférables');
      actions.push(`Démarrez le parcours découverte : ${interests[0] || 'Business'}`);
      actions.push('Rejoignez la communauté de professionnels en transition');
    } else if (stage.includes('compétences')) {
      actions.push('Évaluez votre niveau actuel dans votre domaine');
      actions.push('Définissez une compétence-clé à développer en priorité');
      actions.push('Choisissez une certification reconnue sur votre marché');
    } else {
      actions.push('Lancez votre parcours personnalisé');
      actions.push(`Focus domaine : ${interests[0] || 'Développement professionnel'}`);
      actions.push('Préparez votre stratégie de recherche d\'opportunités');
    }

    return actions;
  }

  private formatDimensionScores(): DimensionScore[] {
    const result: DimensionScore[] = [];

    this.dimensionScores.forEach((scores, dimension) => {
      const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
      const dominant = sortedScores.slice(0, 3).map(([key]) => key);
      
      result.push({
        dimension: dimension as any,
        scores: new Map(Object.entries(scores)),
        dominant,
      });
    });

    return result;
  }
}
