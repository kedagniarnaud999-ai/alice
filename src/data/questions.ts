import { Question } from '@/types/test';

/**
 * The questionnaire is a staged funnel:
 *   1. situation   → who the person is (post-bac / diplômé / reconversion / pro)
 *   2. psych       → compressed psychological profile (drives the narrative)
 *   3. interests   → functional-domain affinity + hard exclusions (GoStudy-style)
 *   4. aptitude    → self-assessed ability, a lighter corroborating signal
 *   5. constraints → time / resources / blocker (drives feasibility)
 *
 * `orientationQuestions` is the full, ordered list (including the conditional
 * branching questions). The analyzer looks answers up by id; the flow decides
 * visibility through `visibleIf`.
 */
export const ASSESSMENT_VERSION = 2;

export const orientationQuestions: Question[] = [
  // ─────────────────────────────── 1. SITUATION ───────────────────────────────
  {
    id: 'q_situation',
    stage: 'situation',
    section: 'Votre situation',
    sectionDescription:
      "Tout part d'ici : votre point de détermine quelles questions on vous pose et quel type de parcours vous recommander.",
    text: "Quelle est votre situation actuelle ?",
    type: 'single',
    options: [
      {
        id: 's_bachelier',
        text: "Je viens d'avoir mon bac (ou je l'attends) — je cherche mon orientation post-bac",
        sets: { situation: 'bachelier' },
      },
      {
        id: 's_diplome',
        text: "Je suis jeune diplômé(e) et je cherche mon premier emploi",
        sets: { situation: 'jeune_diplome' },
      },
      {
        id: 's_reconversion',
        text: 'Je veux changer de métier — je suis en reconversion',
        sets: { situation: 'reconversion' },
      },
      {
        id: 's_pro',
        text: "J'ai déjà un métier et je veux évoluer / monter en compétences",
        sets: { situation: 'professionnel' },
      },
    ],
  },
  {
    id: 'q_bac_series',
    stage: 'situation',
    text: "Quelle est (ou era) votre série de bac ?",
    type: 'single',
    optional: true,
    visibleIf: ({ situation }) => situation === 'bachelier',
    options: [
      { id: 'bac_s', text: 'S / Scientifique', domains: { ingenierie: 2, ict: 1, sante_social: 1, finance: 1 } },
      { id: 'bac_t', text: 'T / Technique', domains: { ingenierie: 2, logistique: 1 } },
      { id: 'bac_litt', text: 'L / Littéraire', domains: { education: 2, commerce_marketing: 1, administration: 1 } },
      { id: 'bac_es', text: 'ES / Économique et social', domains: { finance: 2, administration: 2, commerce_marketing: 1 } },
      { id: 'bac_st2s', text: 'ST2S / Sanitaire et social', domains: { sante_social: 2, education: 1 } },
      { id: 'bac_pro', text: 'Bac professionnel', domains: { ingenierie: 1, logistique: 1, administration: 1 } },
      { id: 'bac_other', text: "Autre, ou je ne sais pas encore" },
    ],
  },
  {
    id: 'q_transferable',
    stage: 'situation',
    text: 'Quelles compétences avez-vous déjà développées dans votre métier actuel ?',
    type: 'multiple',
    maxSelections: 3,
    optional: true,
    visibleIf: ({ situation }) => situation === 'reconversion',
    options: [
      { id: 'tr_manage', text: 'Encadrer / manager une équipe', domains: { administration: 2, commerce_marketing: 1 } },
      { id: 'tr_sales', text: 'Vendre, négocier, convaincre', domains: { commerce_marketing: 2 } },
      { id: 'tr_admin', text: 'Gestion administrative, saisie, dossiers', domains: { administration: 2, finance: 1 } },
      { id: 'tr_tech', text: 'Outils digitaux, informatique', domains: { ict: 2 } },
      { id: 'tr_care', text: "Relation d'aide, service client", domains: { sante_social: 1, tourisme: 1, commerce_marketing: 1 } },
      { id: 'tr_teach', text: 'Formation, transmission', domains: { education: 2 } },
      { id: 'tr_logistics', text: 'Logistique, stock, transport', domains: { logistique: 2 } },
      { id: 'tr_numbers', text: 'Chiffres, comptabilité, budgets', domains: { finance: 2 } },
    ],
  },

  // ──────────────────────────────── 2. PSYCH ──────────────────────────────────
  {
    id: 'q_cognitive',
    stage: 'psych',
    section: 'Votre profil',
    sectionDescription:
      'Quelques questions sur votre façon de penser et de travailler — pour dresser votre profil psychologique.',
    text: 'Face à un problème que vous navez jamais rencontré, votre réflexe est de…',
    type: 'single',
    options: [
      { id: 'p_analytical', text: 'Le décomposer et lanalyser en détail', weights: { analytical: 3 } },
      { id: 'p_structured', text: 'Suivre une méthode éprouvée, étape par étape', weights: { structured: 3 } },
      { id: 'p_experimental', text: 'Tester, expérimenter, voir ce qui marche', weights: { experimental: 3 } },
      { id: 'p_collaborative', text: "En parler et chercher l'avis des autres", weights: { collaborative: 3 } },
      { id: 'p_pragmatic', text: "Aller à l'essentiel et trouver la solution la plus rapide", weights: { pragmatic: 3 } },
    ],
  },
  {
    id: 'q_motivation',
    stage: 'psych',
    text: "Qu'est-ce qui vous donne le plus d'énergie au travail ? (2 max)",
    type: 'multiple',
    maxSelections: 2,
    options: [
      { id: 'm_innovation', text: 'Créer quelque chose de nouveau', weights: { innovation: 3 } },
      { id: 'm_impact', text: "Voir l'impact concret sur les autres", weights: { impact: 3 } },
      { id: 'm_challenge', text: 'Relever des défis, la performance', weights: { challenge: 3 } },
      { id: 'm_autonomy', text: 'Être libre de mes décisions', weights: { autonomy: 3 } },
      { id: 'm_stability', text: 'La sécurité, la régularité', weights: { stability: 3 } },
      { id: 'm_learning', text: 'Apprendre en permanence', weights: { learning: 3 } },
    ],
  },
  {
    id: 'q_talents',
    stage: 'psych',
    text: 'Ce que les autres reconnaissent facilement en vous ? (3 max)',
    type: 'multiple',
    maxSelections: 3,
    options: [
      { id: 't_analysis', text: 'Analyser et résoudre des problèmes', weights: { analytical_talent: 3 } },
      { id: 't_orga', text: 'Organiser, planifier, coordonner', weights: { organizational_talent: 3 } },
      { id: 't_comm', text: 'Communiquer, persuader, expliquer', weights: { communication_talent: 3 } },
      { id: 't_creative', text: 'Créer, imaginer, innover', weights: { creative_talent: 3 } },
      { id: 't_empathy', text: 'Comprendre et aider les autres', weights: { interpersonal_talent: 3 } },
      { id: 't_resourceful', text: 'Se débrouiller, rester concret(e)', weights: { resourcefulness_talent: 3 } },
      { id: 't_technical', text: 'Maîtriser les outils techniques / digitaux', weights: { technical_talent: 3 } },
      { id: 't_leadership', text: 'Entraîner les autres, décider', weights: { leadership: 3 } },
    ],
  },
  {
    id: 'q_environment',
    stage: 'psych',
    text: 'Le cadre de travail qui vous ressemble le plus ?',
    type: 'single',
    options: [
      {
        id: 'e_data',
        text: 'Beaucoup de chiffres, de données, d’analyse',
        weights: { analytical: 2 },
        domains: { finance: 1, ict: 1 },
      },
      {
        id: 'e_people',
        text: "Beaucoup d'humains : aider, former, servir",
        weights: { collaborative: 2, interpersonal_talent: 1 },
        domains: { sante_social: 1, education: 1, tourisme: 1 },
      },
      {
        id: 'e_field',
        text: 'Du mouvement, du terrain, du concret',
        weights: { pragmatic: 2 },
        domains: { ingenierie: 1, agriculture: 1, logistique: 1 },
      },
      {
        id: 'e_create',
        text: 'Créer, concevoir, innover',
        weights: { creative_talent: 1, innovation: 1 },
        domains: { ict: 1, commerce_marketing: 1 },
      },
      {
        id: 'e_order',
        text: "De l'ordre, des procédures, du contrôle",
        weights: { structured: 2 },
        domains: { administration: 1, finance: 1, logistique: 1 },
      },
    ],
  },

  // ─────────────────────────────── 3. INTERESTS ───────────────────────────────
  {
    id: 'q_interest_activities',
    stage: 'interests',
    section: 'Vos centres d’intérêt',
    sectionDescription:
      'On entre dans le vif : repérer les domaines fonctionnels qui vous attirent, et éliminer ceux qui ne vous concernent pas.',
    text: 'Quelles activités vous attirent le plus ? (4 max)',
    type: 'multiple',
    maxSelections: 4,
    options: [
      { id: 'a_sell', text: 'Vendre, négocier, conclure un marché', domains: { commerce_marketing: 3 } },
      { id: 'a_organize', text: "Classer, planifier, mettre de l'ordre dans des dossiers", domains: { administration: 3, finance: 1 } },
      { id: 'a_numbers', text: 'Analyser des chiffres, des budgets, des tableaux', domains: { finance: 3 } },
      { id: 'a_build', text: 'Réparer, assembler, fabriquer de mes mains', domains: { ingenierie: 3, agriculture: 1 } },
      { id: 'a_machines', text: "Comprendre comment fonctionnent des machines ou des installations", domains: { ingenierie: 2, logistique: 1 } },
      { id: 'a_code', text: "Programmer, créer des sites ou des applications", domains: { ict: 3 } },
      { id: 'a_data', text: "Exploiter des données, des tableurs, des outils digitaux", domains: { ict: 2, finance: 2 } },
      { id: 'a_host', text: "Accueillir, servir, mettre les gens à l'aise", domains: { tourisme: 3 } },
      { id: 'a_food', text: 'Cuisiner, préparer, recevoir', domains: { tourisme: 2 } },
      { id: 'a_care', text: 'Prendre soin des autres, soigner, accompagner', domains: { sante_social: 3, education: 1 } },
      { id: 'a_healthsci', text: 'Comprendre le corps, la santé, les maladies', domains: { sante_social: 3 } },
      { id: 'a_teach', text: "Expliquer, former, transmettre un savoir", domains: { education: 3 } },
      { id: 'a_write', text: "Écrire, concevoir, créer du contenu", domains: { commerce_marketing: 2, education: 2 } },
      { id: 'a_nature', text: "Travailler dehors, avec les plantes ou les animaux", domains: { agriculture: 3 } },
      { id: 'a_logistics', text: "Organiser des transports, des livraisons, des stocks", domains: { logistique: 3, administration: 1 } },
    ],
  },
  {
    id: 'q_interest_fields',
    stage: 'interests',
    text: "Si vous deviez choisir UN seul domaine dès aujourd'hui, lequel ?",
    type: 'single',
    options: [
      { id: 'f_administration', text: 'Administration & Gestion', domains: { administration: 5 } },
      { id: 'f_commerce', text: 'Commerce, Vente & Marketing', domains: { commerce_marketing: 5 } },
      { id: 'f_finance', text: 'Finance & Comptabilité', domains: { finance: 5 } },
      { id: 'f_ingenierie', text: 'Ingénierie & Métiers techniques', domains: { ingenierie: 5 } },
      { id: 'f_ict', text: "Technologies de l'information", domains: { ict: 5 } },
      { id: 'f_tourisme', text: 'Tourisme, Hôtellerie & Restauration', domains: { tourisme: 5 } },
      { id: 'f_sante', text: 'Santé & Services sociaux', domains: { sante_social: 5 } },
      { id: 'f_education', text: 'Éducation & Formation', domains: { education: 5 } },
      { id: 'f_agriculture', text: 'Agriculture & Agroalimentaire', domains: { agriculture: 5 } },
      { id: 'f_logistique', text: 'Transport & Logistique', domains: { logistique: 5 } },
    ],
  },
  {
    id: 'q_interest_content',
    stage: 'interests',
    text: 'Quels types de contenus ou matières vous réussissent le mieux ? (3 max)',
    type: 'multiple',
    maxSelections: 3,
    options: [
      { id: 'c_math', text: 'Maths, logique, calcul', domains: { finance: 2, ict: 2, ingenierie: 2 } },
      { id: 'c_bio', text: 'Biologie, sciences de la vie', domains: { sante_social: 2, agriculture: 2 } },
      { id: 'c_physique', text: 'Physique, technologie, génie', domains: { ingenierie: 3, ict: 1 } },
      { id: 'c_info', text: 'Informatique, digital, code', domains: { ict: 3 } },
      { id: 'c_eco', text: 'Économie, gestion, comptabilité', domains: { administration: 2, finance: 2, commerce_marketing: 2 } },
      { id: 'c_comm', text: 'Langues, communication, expression', domains: { commerce_marketing: 2, education: 2, tourisme: 1 } },
      { id: 'c_shs', text: 'Histoire, géo, sciences humaines', domains: { education: 2, administration: 1 } },
      { id: 'c_agronomie', text: 'Agronomie, environnement, vivant', domains: { agriculture: 3 } },
      { id: 'c_hotel', text: 'Hôtellerie, restauration, accueil', domains: { tourisme: 2, sante_social: 1 } },
      { id: 'c_transport', text: 'Logistique, transport, flux', domains: { logistique: 3 } },
    ],
  },
  {
    id: 'q_exclude',
    stage: 'interests',
    text: 'Quels domaines voulez-vous EXCLURE ? Aucun ? Laissez vide.',
    type: 'multiple',
    optional: true,
    options: [
      { id: 'x_administration', text: "Je n'envisage pas l'administration / la gestion", excludes: ['administration'] },
      { id: 'x_commerce', text: "Je n'envisage pas le commerce / la vente / le marketing", excludes: ['commerce_marketing'] },
      { id: 'x_finance', text: "Je n'envisage ni la finance ni la comptabilité", excludes: ['finance'] },
      { id: 'x_ingenierie', text: "Je n'envisage pas l'ingénierie / les métiers techniques", excludes: ['ingenierie'] },
      { id: 'x_ict', text: "Je n'envisage pas l'informatique / le numérique", excludes: ['ict'] },
      { id: 'x_tourisme', text: "Je n'envisage pas le tourisme / l'hôtellerie / la restauration", excludes: ['tourisme'] },
      { id: 'x_sante', text: "Je n'envisage ni la santé ni le social", excludes: ['sante_social'] },
      { id: 'x_education', text: "Je n'envisage pas l'éducation / la formation", excludes: ['education'] },
      { id: 'x_agriculture', text: "Je n'envisage pas l'agriculture / l'agroalimentaire", excludes: ['agriculture'] },
      { id: 'x_logistique', text: "Je n'envisage pas le transport / la logistique", excludes: ['logistique'] },
    ],
  },

  // ─────────────────────────────── 4. APTITUDE ────────────────────────────────
  {
    id: 'q_aptitude_tasks',
    stage: 'aptitude',
    section: 'Vos aptitudes',
    sectionDescription:
      "Intérêt et capacité ne se recoupent pas toujours. Voici un regard honnête sur ce que vous savez déjà faire.",
    text: "Dans quoi êtes-vous déjà à l'aise aujourd'hui ? (4 max)",
    type: 'multiple',
    maxSelections: 4,
    options: [
      { id: 'ab_numbers', text: "Manipuler des chiffres, des budgets", domains: { finance: 2, administration: 1 } },
      { id: 'ab_selling', text: 'Vendre, convaincre', domains: { commerce_marketing: 2 } },
      { id: 'ab_tech', text: 'Coder, bricoler un ordinateur ou un réseau', domains: { ict: 2, ingenierie: 1 } },
      { id: 'ab_build', text: "Réparer, construire, utiliser des outils", domains: { ingenierie: 2, agriculture: 1 } },
      { id: 'ab_care', text: 'Soigner, accompagner des personnes', domains: { sante_social: 2 } },
      { id: 'ab_teach', text: 'Expliquer, faire apprendre', domains: { education: 2 } },
      { id: 'ab_host', text: 'Accueillir, servir, gérer une salle', domains: { tourisme: 2 } },
      { id: 'ab_organize', text: 'Organiser une logistique, des stocks, des plannings', domains: { logistique: 2, administration: 1 } },
      { id: 'ab_nature', text: 'Cultiver, élever, travailler en extérieur', domains: { agriculture: 2 } },
      { id: 'ab_admin', text: "Gérer l'administratif et les dossiers", domains: { administration: 2 } },
    ],
  },
  {
    id: 'q_aptitude_learn',
    stage: 'aptitude',
    text: 'Quand vous apprenez quelque chose de nouveau, vous retenez plus vite…',
    type: 'single',
    options: [
      { id: 'al_logic', text: 'La logique, le code, les systèmes', domains: { ict: 2, ingenierie: 1 } },
      { id: 'al_human', text: "Le contact, l'écoute, le soin", domains: { sante_social: 2, education: 1 } },
      { id: 'al_business', text: 'Le commerce, la négociation', domains: { commerce_marketing: 2, administration: 1 } },
      { id: 'al_numbers', text: 'Les chiffres, la gestion', domains: { finance: 2, administration: 1 } },
      { id: 'al_nature', text: 'Le vivant, la terre, les animaux', domains: { agriculture: 2 } },
      { id: 'al_service', text: "L'accueil, l'événement, la cuisine", domains: { tourisme: 2 } },
      { id: 'al_teach', text: 'Transmettre, animer, former', domains: { education: 2 } },
      { id: 'al_logistics', text: 'Coordonner des flux, des transports, des stocks', domains: { logistique: 2, administration: 1 } },
    ],
  },

  // ────────────────────────────── 5. CONSTRAINTS ──────────────────────────────
  {
    id: 'q_time',
    stage: 'constraints',
    section: 'Vos contraintes',
    sectionDescription:
      'Pour que la recommandation soit réaliste : de quoi disposez-vous vraiment pour vous former ?',
    text: 'Combien d’heures par semaine pouvez-vous consacrer à votre montée en compétences ?',
    type: 'single',
    options: [
      { id: 'time_high', text: '10h ou plus' },
      { id: 'time_medium', text: '5 à 10h' },
      { id: 'time_low', text: '2 à 5h' },
      { id: 'time_none', text: 'Moins de 2h pour l’instant' },
    ],
  },
  {
    id: 'q_resources',
    stage: 'constraints',
    text: 'De quoi disposez-vous pour apprendre ? (sélection libre)',
    type: 'multiple',
    optional: true,
    options: [
      { id: 'r_computer', text: 'Un ordinateur' },
      { id: 'r_internet', text: 'Une connexion internet régulière' },
      { id: 'r_mobile', text: 'Un smartphone' },
      { id: 'r_offline', text: 'Peu ou pas d’accès — il me faut du hors-ligne' },
    ],
  },
  {
    id: 'q_constraint',
    stage: 'constraints',
    text: 'Qu’est-ce qui freine le plus votre projet aujourd’hui ?',
    type: 'single',
    options: [
      { id: 'constraint_time', text: 'Le manque de temps' },
      { id: 'constraint_money', text: 'Le budget / le coût des formations' },
      { id: 'constraint_direction', text: 'Ne pas savoir quelle direction prendre' },
      { id: 'constraint_equipment', text: 'Le manque de matériel ou de connexion' },
      { id: 'constraint_confidence', text: 'Le manque de confiance en moi' },
    ],
  },
];
