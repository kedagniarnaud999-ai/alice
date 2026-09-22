import { FunctionalDomainId } from '@/types/test';

/**
 * Un domaine classé premier ne dit toujours pas sur quoi s'appuyer en premier :
 * « Administration & Gestion » ouvre aussi bien la coordination d'un projet
 * financé par des bailleurs que la tenue d'un secrétariat. Les fiches croisées
 * résolvent le QUEL métier, les modules résolvent le COMMENT, il manquait le
 * QUEL AXE — c'est cette couche.
 *
 * Elles sont rédigées par nous, jamais dérivées automatiquement : un libellé
 * inventé serait un intitulé de diplôme fantôme. La contrepartie est tenue par
 * les contrôles de `pathway.check.ts` — chaque axe doit résoudre au moins deux
 * fiches réelles du même domaine et trois modules réels du même domaine, sinon
 * il n'a pas le droit d'exister.
 */
export interface Specialization {
  id: string;
  /** Ce que voit le candidat : un axe de travail, pas un cycle d'études. */
  label: string;
  /** L'axe est déclaré dans UN seul domaine, celui dont il est la déclinaison. */
  domainId: FunctionalDomainId;
  /** Une phrase honnête sur le travail réel. Aucune école, aucun diplôme. */
  note: string;
  /** Fiches de `occupations.ts` où l'axe se retrouve, toutes exigeant ce domaine. */
  occupationIds: string[];
  /** Modules de `modules.ts` qui l'étayent, tous rattachés à ce domaine. */
  moduleIds: string[];
}

export const SPECIALIZATIONS: Specialization[] = [
  // --- Administration & Gestion ---
  {
    id: 'sp_coordination_projet',
    label: 'Coordination et pilotage de projet',
    domainId: 'administration',
    note: "Tenir un objectif, un calendrier et un budget à plusieurs, puis rendre des comptes à ceux qui financent.",
    occupationIds: ['gestionnaire_projet_ict4d', 'charge_logistique_humanitaire', 'coordinateur_pedagogique'],
    moduleIds: ['mod_project_mgmt', 'mod_design_thinking', 'mod_excel'],
  },
  {
    id: 'sp_appui_administratif',
    label: 'Bureautique et appui administratif',
    domainId: 'administration',
    note: 'Les gestes qui font tourner un secrétariat, une scolarité ou un service le jour même.',
    occupationIds: ['responsable_administratif_financier', 'gestionnaire_bourses_financement', 'gestionnaire_etablissement_sante'],
    moduleIds: ['mod_bureautique_bureau', 'mod_excel', 'mod_support_it'],
  },
  {
    id: 'sp_rh_encadrement',
    label: 'Ressources humaines et encadrement',
    domainId: 'administration',
    note: "Recruter, suivre les contrats et organiser le travail d'une équipe, y compris soignante.",
    occupationIds: ['responsable_administratif_financier', 'gestionnaire_etablissement_sante', 'coordinateur_pedagogique'],
    moduleIds: ['mod_rh_base', 'mod_tresorerie_pme', 'mod_travail_en_equipe_soignante'],
  },
  {
    id: 'sp_creation_activite',
    label: "Organisation d'une activité et entrepreneuriat",
    domainId: 'administration',
    note: "Passer d'une idée à une structure qui tient : offre, coûts, premiers clients, trésorerie.",
    occupationIds: ['gestionnaire_projet_ict4d', 'responsable_hebergement', 'responsable_agrotourisme'],
    moduleIds: ['mod_entrepreneurship', 'mod_design_thinking', 'mod_tresorerie_pme'],
  },

  // --- Commerce, Vente & Marketing ---
  {
    id: 'sp_marketing_digital',
    label: 'Marketing digital et réseaux sociaux',
    domainId: 'commerce_marketing',
    note: 'Produire le contenu, payer le clic, puis lire ce que la campagne a réellement rapporté.',
    occupationIds: ['charge_marketing_digital', 'charge_destination_numerique'],
    moduleIds: ['mod_digital_marketing', 'mod_ui_design', 'mod_communication'],
  },
  {
    id: 'sp_vente_negociation',
    label: 'Vente, négociation et relation client',
    domainId: 'commerce_marketing',
    note: 'Convaincre en face à face, défendre un prix et garder le client après la vente.',
    occupationIds: ['delegate_medical', 'negociant_agribusiness', 'charge_developpement_formation'],
    moduleIds: ['mod_communication', 'mod_commercialisation_recolte', 'mod_sejour_touristique'],
  },
  {
    id: 'sp_developpement_offre',
    label: "Développement d'une offre et d'un marché",
    domainId: 'commerce_marketing',
    note: "Concevoir l'offre, la chiffrer et la porter jusqu'à un premier client qui la recommande.",
    occupationIds: ['charge_developpement_formation', 'chef_produit_touristique', 'responsable_hebergement'],
    moduleIds: ['mod_entrepreneurship', 'mod_design_thinking', 'mod_digital_marketing'],
  },

  // --- Finance & Comptabilité ---
  {
    id: 'sp_comptabilite_tresorerie',
    label: 'Comptabilité et trésorerie au quotidien',
    domainId: 'finance',
    note: "Journal, rapprochements, encaissements et échéances : tenir les chiffres d'une structure sans trou.",
    occupationIds: ['responsable_administratif_financier', 'gestionnaire_etablissement_sante'],
    moduleIds: ['mod_comptabilite_generale', 'mod_tresorerie_pme', 'mod_excel'],
  },
  {
    id: 'sp_analyse_financiere',
    label: 'Analyse financière et contrôle',
    domainId: 'finance',
    note: 'Lire un bilan, juger une rentabilité et défendre un équilibre devant des banques ou des bailleurs.',
    occupationIds: ['analyste_financement_infrastructure', 'charge_credit_agricole', 'acheteur_supply_chain'],
    moduleIds: ['mod_analyse_financiere', 'mod_data_analysis', 'mod_excel'],
  },
  {
    id: 'sp_paiement_numerique',
    label: 'Paiement mobile et services financiers numériques',
    domainId: 'finance',
    note: 'Concevoir des parcours de dépôt, retrait et épargne que des agents peu technophiles utilisent sans risque.',
    occupationIds: ['concepteur_produit_mobile_money', 'charge_marketing_digital'],
    moduleIds: ['mod_mobile_money', 'mod_data_analysis', 'mod_excel'],
  },
  {
    id: 'sp_credit_microfinance',
    label: 'Crédit, épargne et microfinance',
    domainId: 'finance',
    note: "Prêter à une exploitation ou à une petite entreprise : lire un cycle, une marge et un risque climatique.",
    occupationIds: ['charge_credit_agricole', 'gestionnaire_bourses_financement', 'concepteur_produit_mobile_money'],
    moduleIds: ['mod_mobile_money', 'mod_tresorerie_pme', 'mod_analyse_financiere'],
  },

  // --- Ingénierie & Métiers Techniques ---
  {
    id: 'sp_maintenance_installations',
    label: "Maintenance et conduite d'installations",
    domainId: 'ingenierie',
    note: "Anticiper les arrêts, tenir les pièces et remettre en marche ce qui conditionne la production.",
    occupationIds: ['responsable_maintenance', 'technicien_reseaux_telecom'],
    moduleIds: ['mod_maintenance_preventive', 'mod_intro_ingenierie', 'mod_securite_chantier'],
  },
  {
    id: 'sp_electricite_batiment',
    label: 'Installations électriques du bâtiment',
    domainId: 'ingenierie',
    note: 'Câbler, protéger et mettre aux normes une installation, du tableau au point lumineux.',
    occupationIds: ['technicien_reseaux_telecom', 'technicien_solaire_irrigation', 'responsable_maintenance'],
    moduleIds: ['mod_elec_batiment', 'mod_securite_chantier', 'mod_intro_ingenierie'],
  },
  {
    id: 'sp_solaire_pompage',
    label: 'Solaire, pompage et énergie hors réseau',
    domainId: 'ingenierie',
    note: "Dimensionner champ de panneaux, batterie et pompe pour un puits, une exploitation ou un marché.",
    occupationIds: ['technicien_solaire_irrigation', 'technicien_agriculture_precision', 'responsable_maintenance'],
    moduleIds: ['mod_solaire_irrigation', 'mod_elec_batiment', 'mod_maintenance_preventive'],
  },
  {
    id: 'sp_dessin_technique',
    label: 'Dessin technique et lecture de plan',
    domainId: 'ingenierie',
    note: "Coter, lire et transmettre un plan : le langage commun du chantier et de l'atelier.",
    occupationIds: ['formateur_technique_tvet', 'analyste_financement_infrastructure'],
    moduleIds: ['mod_dessin_industriel', 'mod_intro_ingenierie', 'mod_securite_chantier'],
  },

  // --- Technologies de l'Information ---
  {
    id: 'sp_donnees_decision',
    label: 'Données et aide à la décision',
    domainId: 'ict',
    note: 'Collecter, nettoyer et présenter des chiffres qui engagent une décision, pas seulement un rapport.',
    occupationIds: ['concepteur_produit_mobile_money', 'technicien_agriculture_precision', 'gestionnaire_projet_ict4d'],
    moduleIds: ['mod_data_analysis', 'mod_python_debutant', 'mod_ui_design'],
  },
  {
    id: 'sp_support_reseaux',
    label: 'Support informatique et câblage',
    domainId: 'ict',
    note: "Installer, dépanner et connecter les postes d'une structure, souvent avec peu de moyens.",
    occupationIds: ['technicien_reseaux_telecom', 'gestionnaire_projet_ict4d'],
    moduleIds: ['mod_support_it', 'mod_web_intro', 'mod_python_debutant'],
  },
  {
    id: 'sp_produit_numerique',
    label: 'Conception de produit et parcours utilisateur',
    domainId: 'ict',
    note: "Dessiner un écran qu'une personne ordinaire comprend sans qu'on lui explique.",
    occupationIds: ['concepteur_produit_mobile_money', 'charge_destination_numerique', 'charge_marketing_digital'],
    moduleIds: ['mod_ui_design', 'mod_web_intro', 'mod_python_debutant'],
  },
  {
    id: 'sp_numerique_educatif',
    label: 'Numérique éducatif et formation à distance',
    domainId: 'ict',
    note: 'Faire tenir un cours sur un téléphone et une connexion instable, sans perdre l’apprenant en route.',
    occupationIds: ['concepteur_elearning', 'coordinateur_pedagogique', 'gestionnaire_projet_ict4d'],
    moduleIds: ['mod_numerique_pedagogique', 'mod_support_it', 'mod_web_intro'],
  },

  // --- Tourisme, Hôtellerie & Restauration ---
  {
    id: 'sp_accueil_reception',
    label: 'Accueil, réception et réservation',
    domainId: 'tourisme',
    note: "Recevoir, tenir la chambre et la réservation jusqu'au départ du client.",
    occupationIds: ['responsable_hebergement', 'responsable_agrotourisme', 'chef_produit_touristique'],
    moduleIds: ['mod_reception_hoteliere', 'mod_service_en_salle', 'mod_hygiene_alimentaire'],
  },
  {
    id: 'sp_montage_sejours',
    label: 'Montage et vente de séjours',
    domainId: 'tourisme',
    note: 'Dessiner un circuit, négocier les prestataires et en fixer un prix de vente qui tient.',
    occupationIds: ['chef_produit_touristique', 'charge_destination_numerique', 'responsable_hebergement'],
    moduleIds: ['mod_sejour_touristique', 'mod_francais_anglais_pro', 'mod_communication'],
  },
  {
    id: 'sp_promotion_destination',
    label: 'Promotion de la destination en ligne',
    domainId: 'tourisme',
    note: "Rendre une destination visible, réservable et fréquentée hors saison.",
    occupationIds: ['charge_destination_numerique', 'responsable_agrotourisme'],
    moduleIds: ['mod_sejour_touristique', 'mod_reception_hoteliere', 'mod_communication'],
  },

  // --- Santé ---
  {
    id: 'sp_soins_accompagnement',
    label: 'Soins de base et accompagnement',
    domainId: 'sante',
    note: 'Les gestes quotidiens du soin et de la dépendance, faits proprement et transmis à l’équipe.',
    occupationIds: ['gestionnaire_etablissement_sante', 'educateur_sante_communaute'],
    moduleIds: ['mod_soins_base', 'mod_accompagnement_personne_agee', 'mod_secourisme'],
  },
  {
    id: 'sp_sante_communaute',
    label: 'Santé communautaire et prévention',
    domainId: 'sante',
    note: "Hygiène de l'eau, vaccination, classe et quartier : le travail de santé se gagne avant le dispensaire.",
    occupationIds: ['educateur_sante_communaute', 'charge_approvisionnement_sanitaire'],
    moduleIds: ['mod_sante_scolaire', 'mod_travail_en_equipe_soignante', 'mod_soins_base'],
  },
  {
    id: 'sp_gestion_structure_sanitaire',
    label: 'Gestion d\'une structure de santé',
    domainId: 'sante',
    note: "Faire tourner la clinique, les plannings, les stocks et les comptes d'un centre.",
    occupationIds: ['gestionnaire_etablissement_sante', 'charge_approvisionnement_sanitaire'],
    moduleIds: ['mod_travail_en_equipe_soignante', 'mod_hygiene_alimentaire', 'mod_secourisme'],
  },

  // --- Social & Accompagnement ---
  {
    id: 'sp_accompagnement_personnes',
    label: 'Accompagnement des personnes vulnérables',
    domainId: 'social',
    note: "Recevoir une personne, tenir son dossier, la conduire jusqu'aux droits qu'elle n'ouvrait pas seule.",
    occupationIds: ['assistant_social', 'charge_protection_enfance'],
    moduleIds: ['mod_entretien_social', 'mod_acces_aux_droits', 'mod_accompagnement_personne_agee'],
  },
  {
    id: 'sp_protection_enfance_famille',
    label: 'Protection de l’enfance et famille',
    domainId: 'social',
    note: "Repérer un danger, décrire les faits sans les interpréter, alerter qui décide et suivre la situation.",
    occupationIds: ['charge_protection_enfance', 'assistant_social'],
    moduleIds: ['mod_protection_enfance', 'mod_mediation_familiale', 'mod_entretien_social'],
  },
  {
    id: 'sp_developpement_communaute',
    label: 'Développement communautaire',
    domainId: 'social',
    note: "Partir des acteurs d'un quartier, écrire un programme qu'un financeur soutient et dont on rend compte.",
    occupationIds: ['agent_developpement_local', 'administrateur_socio_educatif', 'educateur_sante_communaute'],
    moduleIds: ['mod_animation_communaute', 'mod_programme_social_bailleurs', 'mod_acces_aux_droits'],
  },

  // --- Éducation & Formation ---
  {
    id: 'sp_pedagogie_formation',
    label: 'Pédagogie et formation d’adultes',
    domainId: 'education',
    note: "Faire apprendre un geste ou une notion à un groupe d'adultes, et vérifier que c'est acquis.",
    occupationIds: ['formateur_technique_tvet', 'charge_developpement_formation', 'coordinateur_pedagogique'],
    moduleIds: ['mod_teaching', 'mod_communication', 'mod_gestion_classe'],
  },
  {
    id: 'sp_ingenierie_formation',
    label: 'Ingénierie de formation et ressources numériques',
    domainId: 'education',
    note: "Concevoir un programme, ses supports et son évaluation avant la première séance.",
    occupationIds: ['concepteur_elearning', 'coordinateur_pedagogique'],
    moduleIds: ['mod_numerique_pedagogique', 'mod_teaching', 'mod_francais_anglais_pro'],
  },
  {
    id: 'sp_vie_scolaire',
    label: "Vie scolaire et accompagnement de l'élève",
    domainId: 'education',
    note: 'Tenir un groupe nombreux, désamorcer les conflits et suivre ceux qui décrochent.',
    occupationIds: ['educateur_sante_communaute', 'coordinateur_pedagogique', 'gestionnaire_bourses_financement'],
    moduleIds: ['mod_sante_scolaire', 'mod_gestion_classe', 'mod_communication'],
  },

  // --- Agriculture & Agroalimentaire ---
  {
    id: 'sp_productions_vegetales',
    label: 'Maraîchage et conduite de parcelles',
    domainId: 'agriculture',
    note: 'Itinéraire technique, rotation, irrigation : décider ce qui pousse, quand et à quel coût.',
    occupationIds: ['technicien_agriculture_precision', 'responsable_agrotourisme'],
    moduleIds: ['mod_maraichage', 'mod_solaire_irrigation', 'mod_commercialisation_recolte'],
  },
  {
    id: 'sp_eleavage',
    label: 'Élevage et productions animales',
    domainId: 'agriculture',
    note: "Conduire un cheptel, sa nourriture, son eau et sa sortie : la marge se joue à l'animal près.",
    occupationIds: ['negociant_agribusiness', 'charge_credit_agricole'],
    moduleIds: ['mod_aviculture', 'mod_solaire_irrigation', 'mod_agribusiness'],
  },
  {
    id: 'sp_transformation_recoltes',
    label: 'Conservation et transformation des récoltes',
    domainId: 'agriculture',
    note: 'Sécher, stocker, transformer : la perte évitée vaut un rendement gagné.',
    occupationIds: ['negociant_agribusiness', 'responsable_agrotourisme'],
    moduleIds: ['mod_transformation_recoltes', 'mod_maraichage', 'mod_agribusiness'],
  },
  {
    id: 'sp_agribusiness',
    label: 'Commercialisation et agribusiness',
    domainId: 'agriculture',
    note: 'Suivre les prix, calibrer les lots et vendre au bon moment plutôt qu’à la sortie du champ.',
    occupationIds: ['negociant_agribusiness', 'charge_credit_agricole', 'technicien_agriculture_precision'],
    moduleIds: ['mod_commercialisation_recolte', 'mod_agribusiness', 'mod_transformation_recoltes'],
  },

  // --- Transport & Logistique ---
  {
    id: 'sp_gestion_stocks',
    label: 'Gestion de stock et inventaire fiable',
    domainId: 'logistique',
    note: 'Seuils d’alerte, inventaires tournants, péremptions : savoir ce qui reste vraiment en rayon.',
    occupationIds: ['charge_logistique_humanitaire', 'charge_approvisionnement_sanitaire', 'acheteur_supply_chain'],
    moduleIds: ['mod_gestion_stock', 'mod_transformation_recoltes', 'mod_securite_chantier'],
  },
  {
    id: 'sp_transit_douane',
    label: 'Transport international, Incoterms et dédouanement',
    domainId: 'logistique',
    note: 'Négocier le coût rendu, les délais et les formalités d’une marchandise qui traverse une frontière.',
    occupationIds: ['acheteur_supply_chain', 'charge_logistique_humanitaire'],
    moduleIds: ['mod_incoterms_douane', 'mod_gestion_stock', 'mod_project_mgmt'],
  },
  {
    id: 'sp_chaine_froide',
    label: 'Chaîne du froid et approvisionnement de santé',
    domainId: 'logistique',
    note: 'Tenir les niveaux et la température d’un entrepôt de produits de santé, sans rupture ni perte.',
    occupationIds: ['charge_approvisionnement_sanitaire', 'charge_logistique_humanitaire', 'responsable_maintenance'],
    moduleIds: ['mod_gestion_stock', 'mod_incoterms_douane', 'mod_maintenance_preventive'],
  },
];

export const SPECIALIZATIONS_BY_ID: Record<string, Specialization> = SPECIALIZATIONS.reduce(
  (acc, specialization) => {
    acc[specialization.id] = specialization;
    return acc;
  },
  {} as Record<string, Specialization>
);

export function specializationsForDomain(domainId: FunctionalDomainId): Specialization[] {
  return SPECIALIZATIONS.filter((specialization) => specialization.domainId === domainId);
}
