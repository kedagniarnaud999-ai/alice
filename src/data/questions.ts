import { Question } from '@/types/test';

export const orientationQuestions: Question[] = [
  {
    id: 'q1',
    dimension: 'cognitive',
    section: 'Partie 1 : Votre Profil Cognitif',
    sectionDescription: 'Comprendre comment vous apprenez, réfléchissez et résolvez des problèmes au quotidien',
    text: 'Quand vous apprenez quelque chose de nouveau, quelle approche vous convient le mieux ?',
    type: 'single',
    options: [
      {
        id: 'q1_a',
        text: 'Je préfère comprendre la théorie avant de pratiquer',
        weights: { analytical: 3, structured: 2 }
      },
      {
        id: 'q1_b',
        text: 'J\'apprends en faisant, par essai-erreur',
        weights: { experimental: 3, pragmatic: 2 }
      },
      {
        id: 'q1_c',
        text: 'J\'ai besoin d\'exemples concrets et de cas réels',
        weights: { pragmatic: 3, visual: 2 }
      },
      {
        id: 'q1_d',
        text: 'Je discute avec d\'autres pour comprendre différents points de vue',
        weights: { collaborative: 3, social: 2 }
      }
    ]
  },
  {
    id: 'q2',
    dimension: 'cognitive',
    text: 'Face à un problème complexe, quelle est votre première réaction ?',
    type: 'single',
    options: [
      {
        id: 'q2_a',
        text: 'Je décompose le problème en étapes logiques',
        weights: { analytical: 3, structured: 3 }
      },
      {
        id: 'q2_b',
        text: 'Je cherche des solutions qui ont déjà fonctionné ailleurs',
        weights: { pragmatic: 3, resourceful: 2 }
      },
      {
        id: 'q2_c',
        text: 'J\'expérimente plusieurs approches rapidement',
        weights: { experimental: 3, adaptive: 2 }
      },
      {
        id: 'q2_d',
        text: 'Je demande conseil à des personnes expérimentées',
        weights: { collaborative: 3, social: 2 }
      }
    ]
  },
  {
    id: 'q13',
    dimension: 'cognitive',
    text: 'Comment organisez-vous vos tâches quotidiennes ?',
    type: 'single',
    options: [
      {
        id: 'q13_a',
        text: 'Je planifie tout à l\'avance avec des listes et calendriers',
        weights: { structured: 3, organized: 2 }
      },
      {
        id: 'q13_b',
        text: 'Je m\'adapte selon les priorités du moment',
        weights: { adaptive: 3, flexible: 2 }
      },
      {
        id: 'q13_c',
        text: 'Je travaille par blocs d\'activités similaires',
        weights: { systematic: 2, efficient: 3 }
      },
      {
        id: 'q13_d',
        text: 'Je fais d\'abord ce qui m\'inspire le plus',
        weights: { intuitive: 3, creative: 2 }
      }
    ]
  },
  {
    id: 'q18',
    dimension: 'cognitive',
    text: 'Comment préférez-vous recevoir des retours sur votre travail ?',
    type: 'single',
    options: [
      {
        id: 'q18_a',
        text: 'Des critiques détaillées avec des suggestions précises',
        weights: { analytical: 2, structured: 3 }
      },
      {
        id: 'q18_b',
        text: 'Des encouragements avec quelques axes d\'amélioration',
        weights: { supportive: 3, growth_oriented: 2 }
      },
      {
        id: 'q18_c',
        text: 'Une discussion ouverte et collaborative',
        weights: { collaborative: 3, dialogue_oriented: 2 }
      },
      {
        id: 'q18_d',
        text: 'Des métriques et données objectives',
        weights: { data_driven: 3, quantitative: 2 }
      }
    ]
  },
  {
    id: 'q3',
    dimension: 'passion',
    section: 'Partie 2 : Vos Motivations',
    sectionDescription: 'Identifier ce qui vous donne de l\'énergie, vous engage et vous fait avancer',
    text: 'Qu\'est-ce qui vous donne le plus d\'énergie dans votre travail ou vos projets ?',
    type: 'multiple',
    maxSelections: 2,
    options: [
      {
        id: 'q3_a',
        text: 'Créer quelque chose de nouveau ou innover',
        weights: { innovation: 3, creativity: 2 }
      },
      {
        id: 'q3_b',
        text: 'Avoir un impact positif sur les autres',
        weights: { impact: 3, altruism: 2 }
      },
      {
        id: 'q3_c',
        text: 'Relever des défis et résoudre des problèmes',
        weights: { challenge: 3, achievement: 2 }
      },
      {
        id: 'q3_d',
        text: 'Travailler en autonomie et prendre mes décisions',
        weights: { autonomy: 3, independence: 2 }
      },
      {
        id: 'q3_e',
        text: 'La stabilité et la sécurité professionnelle',
        weights: { stability: 3, security: 2 }
      }
    ]
  },
  {
    id: 'q4',
    dimension: 'passion',
    text: 'Quel type d\'environnement de travail vous motive le plus ?',
    type: 'single',
    options: [
      {
        id: 'q4_a',
        text: 'Dynamique et en constante évolution',
        weights: { innovation: 2, adaptability: 3 }
      },
      {
        id: 'q4_b',
        text: 'Structuré avec des processus clairs',
        weights: { stability: 3, structure: 2 }
      },
      {
        id: 'q4_c',
        text: 'Collaboratif avec beaucoup d\'interactions',
        weights: { collaboration: 3, social: 2 }
      },
      {
        id: 'q4_d',
        text: 'Flexible où je peux organiser mon temps',
        weights: { autonomy: 3, flexibility: 2 }
      }
    ]
  },
  {
    id: 'q14',
    dimension: 'passion',
    text: 'Qu\'est-ce qui vous fait vous sentir accompli professionnellement ?',
    type: 'single',
    options: [
      {
        id: 'q14_a',
        text: 'Voir des résultats concrets et mesurables',
        weights: { achievement: 3, results_driven: 2 }
      },
      {
        id: 'q14_b',
        text: 'Recevoir de la reconnaissance de mes pairs ou supérieurs',
        weights: { recognition: 3, validation: 2 }
      },
      {
        id: 'q14_c',
        text: 'Savoir que j\'ai aidé quelqu\'un ou fait une différence',
        weights: { impact: 3, altruism: 2 }
      },
      {
        id: 'q14_d',
        text: 'Apprendre quelque chose de nouveau',
        weights: { learning: 3, growth: 2 }
      }
    ]
  },
  {
    id: 'q19',
    dimension: 'passion',
    text: 'Quel aspect du travail vous démotive le plus ?',
    type: 'single',
    options: [
      {
        id: 'q19_a',
        text: 'La routine et les tâches répétitives',
        weights: { seeks_variety: 3, innovation_driven: 2 }
      },
      {
        id: 'q19_b',
        text: 'Le manque d\'impact visible',
        weights: { impact_driven: 3, purpose_seeking: 2 }
      },
      {
        id: 'q19_c',
        text: 'Le manque d\'autonomie et de liberté',
        weights: { autonomy_driven: 3, independence_seeking: 2 }
      },
      {
        id: 'q19_d',
        text: 'L\'absence de progression ou d\'apprentissage',
        weights: { growth_driven: 3, learning_motivated: 2 }
      }
    ]
  },
  {
    id: 'q5',
    dimension: 'talents',
    section: 'Partie 3 : Vos Talents Naturels',
    sectionDescription: 'Identifier les compétences pour lesquelles les autres vous sollicitent spontanément',
    text: 'Pour quoi les gens vous sollicitent-ils souvent ?',
    type: 'multiple',
    maxSelections: 3,
    options: [
      {
        id: 'q5_a',
        text: 'Résoudre des problèmes techniques ou logiques',
        weights: { analytical_talent: 3, problem_solving: 2 }
      },
      {
        id: 'q5_b',
        text: 'Organiser et coordonner des projets ou événements',
        weights: { organizational_talent: 3, leadership: 2 }
      },
      {
        id: 'q5_c',
        text: 'Expliquer des concepts complexes simplement',
        weights: { communication_talent: 3, pedagogy: 2 }
      },
      {
        id: 'q5_d',
        text: 'Créer du contenu visuel ou écrire',
        weights: { creative_talent: 3, expression: 2 }
      },
      {
        id: 'q5_e',
        text: 'Écouter et conseiller sur des situations personnelles',
        weights: { interpersonal_talent: 3, empathy: 2 }
      },
      {
        id: 'q5_f',
        text: 'Trouver des solutions pratiques avec peu de ressources',
        weights: { resourcefulness_talent: 3, pragmatism: 2 }
      }
    ]
  },
  {
    id: 'q6',
    dimension: 'talents',
    text: 'Quelle compétence acquérez-vous facilement ?',
    type: 'single',
    options: [
      {
        id: 'q6_a',
        text: 'Les langues et la communication',
        weights: { linguistic_talent: 3, communication_talent: 2 }
      },
      {
        id: 'q6_b',
        text: 'Les outils techniques et numériques',
        weights: { technical_talent: 3, digital_literacy: 2 }
      },
      {
        id: 'q6_c',
        text: 'La gestion de relations et le networking',
        weights: { interpersonal_talent: 3, social_talent: 2 }
      },
      {
        id: 'q6_d',
        text: 'L\'analyse de données et la logique',
        weights: { analytical_talent: 3, quantitative: 2 }
      }
    ]
  },
  {
    id: 'q15',
    dimension: 'talents',
    text: 'Dans un projet d\'équipe, quel rôle prenez-vous naturellement ?',
    type: 'single',
    options: [
      {
        id: 'q15_a',
        text: 'Celui qui propose des idées et des solutions',
        weights: { creative_talent: 3, innovation_talent: 2 }
      },
      {
        id: 'q15_b',
        text: 'Celui qui organise et coordonne les tâches',
        weights: { organizational_talent: 3, leadership: 2 }
      },
      {
        id: 'q15_c',
        text: 'Celui qui exécute et finalise les livrables',
        weights: { execution_talent: 3, reliability: 2 }
      },
      {
        id: 'q15_d',
        text: 'Celui qui facilite la communication entre membres',
        weights: { interpersonal_talent: 3, mediation: 2 }
      }
    ]
  },
  {
    id: 'q20',
    dimension: 'talents',
    text: 'Quelle réussite personnelle ou professionnelle vous rend le plus fier ?',
    type: 'single',
    options: [
      {
        id: 'q20_a',
        text: 'Avoir résolu un problème complexe ou technique',
        weights: { analytical_talent: 3, problem_solving: 2 }
      },
      {
        id: 'q20_b',
        text: 'Avoir mené à bien un projet d\'équipe',
        weights: { organizational_talent: 3, leadership: 2 }
      },
      {
        id: 'q20_c',
        text: 'Avoir créé quelque chose d\'original',
        weights: { creative_talent: 3, innovation_talent: 2 }
      },
      {
        id: 'q20_d',
        text: 'Avoir aidé quelqu\'un à progresser ou réussir',
        weights: { interpersonal_talent: 3, mentorship: 2 }
      }
    ]
  },
  {
    id: 'q7',
    dimension: 'interests',
    section: 'Partie 4 : Vos Centres d\'Intérêt',
    sectionDescription: 'Découvrir les domaines professionnels qui vous attirent naturellement',
    text: 'Quels domaines vous attirent naturellement ?',
    type: 'multiple',
    maxSelections: 3,
    options: [
      {
        id: 'q7_a',
        text: 'Technologie, digital, innovation',
        weights: { tech: 3, digital: 2 }
      },
      {
        id: 'q7_b',
        text: 'Commerce, vente, marketing',
        weights: { business: 3, commercial: 2 }
      },
      {
        id: 'q7_c',
        text: 'Éducation, formation, coaching',
        weights: { education: 3, development: 2 }
      },
      {
        id: 'q7_d',
        text: 'Santé, bien-être, social',
        weights: { health: 3, social_impact: 2 }
      },
      {
        id: 'q7_e',
        text: 'Créativité, design, contenu',
        weights: { creative: 3, arts: 2 }
      },
      {
        id: 'q7_f',
        text: 'Gestion, administration, finances',
        weights: { management: 3, operations: 2 }
      }
    ]
  },
  {
    id: 'q8',
    dimension: 'interests',
    text: 'Quel type de projet vous passionne le plus ?',
    type: 'single',
    options: [
      {
        id: 'q8_a',
        text: 'Développer un produit ou service innovant',
        weights: { tech: 2, entrepreneurship: 3 }
      },
      {
        id: 'q8_b',
        text: 'Aider des personnes à atteindre leurs objectifs',
        weights: { education: 3, coaching: 2 }
      },
      {
        id: 'q8_c',
        text: 'Créer du contenu qui inspire ou informe',
        weights: { creative: 3, communication: 2 }
      },
      {
        id: 'q8_d',
        text: 'Optimiser des processus ou améliorer l\'efficacité',
        weights: { management: 3, operations: 2 }
      }
    ]
  },
  {
    id: 'q16',
    dimension: 'interests',
    text: 'Quel type de contenu consommez-vous le plus dans votre temps libre ?',
    type: 'multiple',
    maxSelections: 2,
    options: [
      {
        id: 'q16_a',
        text: 'Tutoriels techniques et formations en ligne',
        weights: { tech: 2, learning_oriented: 3 }
      },
      {
        id: 'q16_b',
        text: 'Contenus business, entrepreneuriat, développement personnel',
        weights: { business: 3, self_development: 2 }
      },
      {
        id: 'q16_c',
        text: 'Art, design, créativité, culture',
        weights: { creative: 3, artistic: 2 }
      },
      {
        id: 'q16_d',
        text: 'Actualités, société, causes sociales',
        weights: { social_impact: 3, awareness: 2 }
      },
      {
        id: 'q16_e',
        text: 'Sciences, santé, psychologie',
        weights: { health: 2, analytical: 2, education: 1 }
      }
    ]
  },
  {
    id: 'q21',
    dimension: 'interests',
    text: 'Si vous deviez lancer un projet secondaire demain, ce serait dans quel domaine ?',
    type: 'single',
    options: [
      {
        id: 'q21_a',
        text: 'Créer une application ou un service digital',
        weights: { tech: 3, digital: 2 }
      },
      {
        id: 'q21_b',
        text: 'Démarrer une activité commerciale ou e-commerce',
        weights: { business: 3, entrepreneurship: 2 }
      },
      {
        id: 'q21_c',
        text: 'Produire du contenu créatif (blog, vidéos, design)',
        weights: { creative: 3, content_creation: 2 }
      },
      {
        id: 'q21_d',
        text: 'Offrir des services de conseil ou formation',
        weights: { education: 3, consulting: 2 }
      }
    ]
  },
  {
    id: 'q9',
    dimension: 'reality',
    section: 'Partie 5 : Votre Réalité Actuelle',
    sectionDescription: 'Évaluer vos ressources et contraintes pour un parcours réaliste',
    text: 'Combien de temps pouvez-vous consacrer à votre développement professionnel par semaine ?',
    type: 'single',
    options: [
      {
        id: 'q9_a',
        text: 'Moins de 3 heures',
        weights: { time_low: 3 }
      },
      {
        id: 'q9_b',
        text: '3 à 7 heures',
        weights: { time_medium: 3 }
      },
      {
        id: 'q9_c',
        text: '7 à 15 heures',
        weights: { time_high: 3 }
      },
      {
        id: 'q9_d',
        text: 'Plus de 15 heures (temps plein disponible)',
        weights: { time_full: 3 }
      }
    ]
  },
  {
    id: 'q10',
    dimension: 'reality',
    text: 'Quels outils et ressources avez-vous à disposition ?',
    type: 'multiple',
    maxSelections: 4,
    options: [
      {
        id: 'q10_a',
        text: 'Ordinateur personnel',
        weights: { resource_computer: 2 }
      },
      {
        id: 'q10_b',
        text: 'Smartphone avec internet',
        weights: { resource_mobile: 1 }
      },
      {
        id: 'q10_c',
        text: 'Connexion internet stable',
        weights: { resource_internet: 2 }
      },
      {
        id: 'q10_d',
        text: 'Budget pour formations payantes',
        weights: { resource_budget: 2 }
      },
      {
        id: 'q10_e',
        text: 'Espace calme pour étudier',
        weights: { resource_space: 1 }
      }
    ]
  },
  {
    id: 'q17',
    dimension: 'reality',
    text: 'Quelle contrainte limite le plus votre développement professionnel actuellement ?',
    type: 'single',
    options: [
      {
        id: 'q17_a',
        text: 'Le manque de temps',
        weights: { constraint_time: 3 }
      },
      {
        id: 'q17_b',
        text: 'Le manque de ressources financières',
        weights: { constraint_money: 3 }
      },
      {
        id: 'q17_c',
        text: 'Je ne sais pas par où commencer',
        weights: { constraint_direction: 3 }
      },
      {
        id: 'q17_d',
        text: 'Le manque de connexions professionnelles',
        weights: { constraint_network: 3 }
      }
    ]
  },
  {
    id: 'q22',
    dimension: 'reality',
    text: 'Quel format d\'apprentissage vous convient le mieux ?',
    type: 'single',
    options: [
      {
        id: 'q22_a',
        text: 'Vidéos courtes que je peux regarder à mon rythme',
        weights: { format_video: 3, self_paced: 2 }
      },
      {
        id: 'q22_b',
        text: 'Sessions en direct avec possibilité d\'interaction',
        weights: { format_live: 3, interactive: 2 }
      },
      {
        id: 'q22_c',
        text: 'Lectures et articles détaillés',
        weights: { format_text: 3, depth_oriented: 2 }
      },
      {
        id: 'q22_d',
        text: 'Projets pratiques et exercices hands-on',
        weights: { format_practice: 3, experiential: 2 }
      }
    ]
  },
  {
    id: 'q11',
    dimension: 'positioning',
    section: 'Partie 6 : Votre Positionnement Professionnel',
    sectionDescription: 'Situer votre étape actuelle dans votre parcours de carrière',
    text: 'Quelle phrase décrit le mieux votre situation actuelle ?',
    type: 'single',
    options: [
      {
        id: 'q11_a',
        text: 'Je viens de terminer mes études (secondaires ou supérieures)',
        weights: { stage_graduate: 5 }
      },
      {
        id: 'q11_b',
        text: 'Je suis en emploi et cherche à monter en compétences',
        weights: { stage_upskilling: 5 }
      },
      {
        id: 'q11_c',
        text: 'Je veux changer de domaine professionnel',
        weights: { stage_reconversion: 5 }
      },
      {
        id: 'q11_d',
        text: 'Je cherche activement un emploi ou un meilleur poste',
        weights: { stage_jobseeker: 5 }
      },
      {
        id: 'q11_e',
        text: 'Je veux me repositionner sur le marché',
        weights: { stage_repositioning: 5 }
      }
    ]
  },
  {
    id: 'q12',
    dimension: 'positioning',
    text: 'Quel est votre niveau d\'expérience professionnelle ?',
    type: 'single',
    options: [
      {
        id: 'q12_a',
        text: 'Peu ou pas d\'expérience (0-1 an)',
        weights: { exp_junior: 3 }
      },
      {
        id: 'q12_b',
        text: 'Débutant (1-3 ans)',
        weights: { exp_intermediate: 3 }
      },
      {
        id: 'q12_c',
        text: 'Intermédiaire (3-7 ans)',
        weights: { exp_experienced: 3 }
      },
      {
        id: 'q12_d',
        text: 'Expérimenté (7+ ans)',
        weights: { exp_senior: 3 }
      }
    ]
  },
  {
    id: 'q23',
    dimension: 'positioning',
    text: 'Quel est votre objectif principal pour les 6 prochains mois ?',
    type: 'single',
    options: [
      {
        id: 'q23_a',
        text: 'Décrocher mon premier emploi ou un stage',
        weights: { goal_first_job: 3 }
      },
      {
        id: 'q23_b',
        text: 'Obtenir une promotion ou augmentation',
        weights: { goal_advancement: 3 }
      },
      {
        id: 'q23_c',
        text: 'Acquérir une nouvelle compétence spécifique',
        weights: { goal_skill: 3 }
      },
      {
        id: 'q23_d',
        text: 'Clarifier ma direction et mon projet professionnel',
        weights: { goal_clarity: 3 }
      }
    ]
  }
];
