import { CareerSituation, FunctionalDomainId, FunctionRoleId } from '@/types/test';

/**
 * Un métier croisé se définit par les domaines qu'il EXIGE EN MEME TEMPS, pas par
 * un domaine isolé : « gestionnaire de projet ICT4D » demande l'administration, le
 * numérique, et se pose sur un terrain agricole, éducatif ou sanitaire. Le catalogue
 * mono-domaine de `domains.ts` ne peut pas exprimer cette intersection.
 *
 * `core` = 2 ou 3 domaines avec un poids de 1 à 3. `sectors` = terrains
 * d'application : ils élargissent la fiche sans multiplier le catalogue.
 * `skills` reprend le vocabulaire de `MODULE_CATALOG` pour que l'écart de
 * compétences se calcule sur les modules réellement disponibles.
 * `escoUri` ne se pose qu'après vérification humaine fiche par fiche : la recherche
 * ESCO renvoie un classement non fiable, un identifiant faux serait pire qu'absent.
 */
export interface CrossOccupation {
  id: string;
  title: string;
  context: string;
  core: Partial<Record<FunctionalDomainId, number>>;
  sectors: FunctionalDomainId[];
  functions: FunctionRoleId[];
  skills: string[];
  studyPaths: string[];
  situations: CareerSituation[];
  escoUri?: string;
}

const ALL_SITUATIONS: CareerSituation[] = ['bachelier', 'jeune_diplome', 'reconversion', 'professionnel'];

export const CROSS_OCCUPATIONS: CrossOccupation[] = [
  {
    id: 'gestionnaire_projet_ict4d',
    title: 'Gestionnaire de projet ICT4D',
    context:
      "Vous pilotez des projets qui se servent du numérique pour un effet social mesurable : e-agriculture, éducation à distance, santé mobile. Le poste se joue autant dans la coordination d'équipes et de financeurs que dans la compréhension des outils.",
    core: { administration: 3, ict: 3 },
    sectors: ['agriculture', 'education', 'sante', 'social'],
    functions: ['coordination', 'analyse'],
    skills: ['Gestion de Projet', 'Agile', 'Organisation', 'Analyse de données', 'Visualisation', 'Communication'],
    studyPaths: [
      'Licence ou Master Gestion de projet',
      'Certification projet (PMP, PRINCE2)',
      'Parcours informatique de gestion',
    ],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'responsable_administratif_financier',
    title: 'Responsable administratif et financier',
    context:
      "Toute structure a besoin que ses chiffres, ses contrats et ses échéances tiennent. Vous tenez à la fois la comptabilité, la trésorerie et l'équipe administrative.",
    core: { administration: 3, finance: 3 },
    sectors: ['commerce_marketing', 'sante', 'social'],
    functions: ['coordination', 'analyse'],
    skills: ['Plan de trésorerie', 'Écritures comptables', 'Rapprochement bancaire', 'Excel', 'Organisation'],
    studyPaths: ['BTS Comptabilité et gestion', 'Licence AES ou GPA', 'Master Contrôle de gestion'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'charge_logistique_humanitaire',
    title: 'Chargé de logistique humanitaire',
    context:
      "Acheminer des vivres, du matériel ou des équipes dans un délai tenu et un budget tracé. La rigueur des stocks compte autant que la capacité à négocier sur le terrain.",
    core: { logistique: 3, administration: 2 },
    sectors: ['sante', 'social', 'agriculture'],
    functions: ['coordination', 'terrain'],
    skills: ['Fiche de stock', 'Seuil d’alerte', 'Inventaire tournant', 'Incoterms', 'Organisation'],
    studyPaths: ['Licence Logistique et transport', 'Formation gestion des stocks et chaîne du froid', 'DTS Logistique'],
    situations: ALL_SITUATIONS,
  },
  {
    id: 'coordinateur_pedagogique',
    title: 'Coordinateur pédagogique',
    context:
      "Vous concevez l'organisation d'un établissement ou d'un programme de formation : emplois du temps, suivi des résultats, accompagnement des formateurs.",
    core: { education: 3, administration: 2 },
    sectors: ['social', 'ict'],
    functions: ['coordination', 'relation'],
    skills: ['Pédagogie', 'Animation de groupe', 'Évaluation', 'Organisation', 'Gestion du temps'],
    studyPaths: ['Licence Sciences de l’éducation', 'Master Ingénierie pédagogique', 'Management d’établissement de formation'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'gestionnaire_etablissement_sante',
    title: 'Gestionnaire d’établissement de santé',
    context:
      "Cliniques, centres et ONG sanitaires manquent moins de soignants que de gens qui savent faire tourner la structure, les plannings et les comptes.",
    core: { sante: 3, administration: 2 },
    sectors: ['logistique', 'finance'],
    functions: ['coordination', 'analyse'],
    skills: ['Cahier de transmissions', 'Gestion de priorités', 'Plan de trésorerie', 'Excel'],
    studyPaths: ['Licence Gestion des établissements de santé', 'Master Management des organisations sanitaires'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'responsable_hebergement',
    title: 'Responsable d’hébergement et de restauration',
    context:
      "Diriger l'accueil, les chambres et la salle : vous tenez la qualité de service et la masse salariale d'un établissement touristique.",
    core: { tourisme: 3, administration: 2 },
    sectors: ['commerce_marketing', 'logistique'],
    functions: ['coordination', 'relation'],
    skills: ['Réservation', 'Check-in et check-out', 'Fidélisation client', 'Gestion de priorités', 'Encaissement'],
    studyPaths: ['BTS Hôtellerie-restauration', 'Licence Management hôtelier', 'École de gestion hôtelière'],
    situations: ['bachelier', 'jeune_diplome', 'professionnel'],
  },
  {
    id: 'charge_marketing_digital',
    title: 'Chargé de marketing digital',
    context:
      "Vous transformez une offre en trafic, puis en ventes, avec des budgets mesurés au clic. Les marques africaines recrutent sur cette compétence plus que sur n'importe quelle autre.",
    core: { commerce_marketing: 3, ict: 2 },
    sectors: ['tourisme', 'agriculture', 'finance'],
    functions: ['conception', 'relation'],
    skills: ['Marketing Digital', 'Réseaux Sociaux', 'SEO', 'Content Marketing', 'Analyse de données'],
    studyPaths: ['Licence Communication digitale', 'École de commerce — marketing digital', 'Certifications Meta et Google Ads'],
    situations: ALL_SITUATIONS,
  },
  {
    id: 'concepteur_produit_mobile_money',
    title: 'Concepteur de produit paiement mobile',
    context:
      "Le paiement mobile est l'infrastructure financière de la région. Vous concevez des parcours de dépôt, retrait et épargne que des agents et des clients peu technophiles utilisent sans risque.",
    core: { ict: 3, finance: 3 },
    sectors: ['commerce_marketing', 'agriculture'],
    functions: ['analyse', 'conception'],
    skills: ['Paiement mobile', 'Sécurité des transactions', 'Data Analysis', 'Analyse de données', 'Journal de caisse'],
    studyPaths: ['Licence informatique ou MIASHS', 'Master Fintech et systèmes de paiement', 'BTS Banque-finances'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'technicien_reseaux_telecom',
    title: 'Technicien réseaux et télécommunications',
    context:
      "Câbler, configurer, dépanner : vous maintenez ce qui permet aux autres structures d'être connectées, du cabinet comptable au site déporté.",
    core: { ict: 3, ingenierie: 3 },
    sectors: ['administration', 'education', 'logistique'],
    functions: ['technique', 'terrain'],
    skills: ['Diagnostic matériel', 'Installation poste de travail', 'Sauvegarde', 'Câblage basse tension', 'Normes'],
    studyPaths: ['BTS Réseaux et télécommunications', 'Licence pro Informatique industrielle', 'Certification Cisco CCNA'],
    situations: ['bachelier', 'jeune_diplome', 'professionnel'],
  },
  {
    id: 'concepteur_elearning',
    title: 'Concepteur de formation numérique',
    context:
      "Vous rendez un savoir enseignable à distance, avec des supports qui tiennent sur un téléphone et une connexion instable.",
    core: { ict: 3, education: 3 },
    sectors: ['social', 'sante', 'commerce_marketing'],
    functions: ['conception', 'relation'],
    skills: ['Création de supports', 'Quiz mobile', 'Ressources hors ligne', 'Pédagogie', 'Diffusion par messagerie'],
    studyPaths: ['Master Ingénierie pédagogique numérique', 'Licence INFOCOM', 'Formation TICE et FOAD'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'technicien_agriculture_precision',
    title: 'Technicien d’agriculture de précision',
    context:
      "Capteurs, cartes de parcelles et données météo changent la façon d'irriguer et de fertiliser. Vous êtes celui qui installe l'outil et qui explique le résultat à l'agriculteur.",
    core: { agriculture: 3, ict: 2 },
    sectors: ['ingenierie', 'logistique'],
    functions: ['technique', 'terrain'],
    skills: ['Itinéraire technique', 'Fertilité du sol', 'Irrigation', 'Analyse de données', 'Dimensionnement panneaux'],
    studyPaths: ['BTS ou Licence Agronomie', 'Formation Agriculture digitale', 'Licence Génie rural'],
    situations: ['bachelier', 'jeune_diplome', 'reconversion'],
  },
  {
    id: 'charge_destination_numerique',
    title: 'Chargé de destination touristique numérique',
    context:
      "Sites, offices et agences vendent aujourd'hui une destination en ligne. Vous construisez l'offre, les circuits et leur mise en visibilité.",
    core: { tourisme: 3, ict: 2 },
    sectors: ['commerce_marketing', 'education'],
    functions: ['conception', 'relation'],
    skills: ['Itinéraire', 'Calcul de prix de vente', 'Marketing Digital', 'Brochure', 'Fidélisation client'],
    studyPaths: ['Licence Tourisme et patrimoine', 'Formation Gestion de destination', 'Master E-tourisme'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'charge_credit_agricole',
    title: 'Chargé de crédit agricole et microfinance',
    context:
      "Prêter à une exploitation suppose de lire un cycle cultural, une marge par bande et un risque climatique, pas seulement un bilan.",
    core: { finance: 3, agriculture: 2 },
    sectors: ['logistique', 'commerce_marketing'],
    functions: ['analyse', 'relation'],
    skills: ['Ratio de rentabilité', 'Capacité d’autofinancement', 'Calcul de charges', 'Négociation', 'Diagnostic'],
    studyPaths: ['BTS Banque et microfinance', 'Licence Assurance-Banque-Finance', 'Formation Crédit rural'],
    situations: ['jeune_diplome', 'professionnel'],
  },
  {
    id: 'acheteur_supply_chain',
    title: 'Acheteur et analyste de la chaîne d’approvisionnement',
    context:
      "Vous décidez quoi acheter, à qui et à quel coût rendu, en arbitrant entre marge, délai et rupture de stock.",
    core: { logistique: 3, finance: 2 },
    sectors: ['agriculture', 'ingenierie', 'commerce_marketing'],
    functions: ['analyse', 'coordination'],
    skills: ['Incoterms', 'Dédouanement', 'Calcul du coût rendu', 'Fiche de stock', 'Écritures comptables'],
    studyPaths: ['Licence Achats et supply chain', 'DTS Transport et logistique', 'Certification Supply chain management'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'analyste_financement_infrastructure',
    title: 'Analyste en financement d’infrastructures',
    context:
      "Route, usine, réseau d'eau : vous montez le modèle économique d'un projet technique et défendez son équilibre face aux banques et aux pouvoirs publics.",
    core: { finance: 3, ingenierie: 2 },
    sectors: ['logistique', 'ict'],
    functions: ['analyse', 'technique'],
    skills: ['Diagnostic', 'Ratio de rentabilité', 'Lecture de plan', 'Calcul de charges', 'Analyse de données'],
    studyPaths: ['Master Finance de projet et PPP', 'École d’ingénieur puis spécialité économie', 'Licence Génie civil puis Master finance'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'gestionnaire_bourses_financement',
    title: 'Gestionnaire de bourses et de financements',
    context:
      "Bailleurs, universités et ONG financent des parcours : vous instruisez les dossiers, suivez les décaissements et produisez les rapports qui débloquent la suite.",
    core: { administration: 3, education: 2, finance: 2 },
    sectors: ['social', 'agriculture'],
    functions: ['coordination', 'analyse'],
    skills: ['Traitement de texte', 'Tableau de saisie', 'Organisation', 'Écritures comptables', 'Communication'],
    studyPaths: ['BTS ou Licence Gestion administrative', 'Master Administration de l’enseignement supérieur', 'Formation Montage de dossiers de financement'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'technicien_solaire_irrigation',
    title: 'Technicien solaire et irrigation',
    context:
      "Dimensionner un champ de panneaux, une batterie et une pompe pour un puits ou un marché maraîcher : le métier qui équipe les exploitations hors réseau.",
    core: { ingenierie: 3, agriculture: 3 },
    sectors: ['logistique', 'ict'],
    functions: ['technique', 'terrain'],
    skills: ['Dimensionnement panneaux', 'Batterie et régulateur', 'Pompe solaire', 'Irrigation', 'Plan de maintenance'],
    studyPaths: ['BTS Électrotechnique', 'Formation Énergies renouvelables', 'Licence Génie énergétique'],
    situations: ALL_SITUATIONS,
  },
  {
    id: 'responsable_maintenance',
    title: 'Responsable de maintenance et d’exploitation',
    context:
      "Vous organisez les arrêts, les pièces et les équipes pour que l'outil de production ne s'arrête pas.",
    core: { ingenierie: 3, logistique: 2 },
    sectors: ['agriculture', 'tourisme'],
    functions: ['technique', 'coordination'],
    skills: ['Plan de maintenance', 'Diagnostic de panne', 'Gestion des pièces', 'Fiche équipement', 'Seuil d’alerte'],
    studyPaths: ['BTS Maintenance industrielle', 'Licence Génie industriel', 'Master Management des actifs'],
    situations: ['jeune_diplome', 'professionnel'],
  },
  {
    id: 'formateur_technique_tvet',
    title: 'Formateur technique (TVET)',
    context:
      "Les filières professionnelles manquent de formateurs qui ont réellement exercé le métier avant d'enseigner le geste.",
    core: { ingenierie: 3, education: 3 },
    sectors: ['agriculture', 'logistique'],
    functions: ['relation', 'technique'],
    skills: ['Pédagogie', 'Formation', 'Animation', 'Évaluation', 'Lecture de plan'],
    studyPaths: ['Certificat d’aptitude pédagogique à l’enseignement technique', 'Licence pro Génie industriel et pédagogie', 'Master Sciences de l’éducation technique'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'negociant_agribusiness',
    title: 'Négociant et chef de marché agribusiness',
    context:
      "Vous achetez la récolte au champ, la calibrez, la stockez et la revendez au bon moment. La marge se joue sur le prix de sortie et sur la perte évitée.",
    core: { commerce_marketing: 3, agriculture: 3 },
    sectors: ['logistique', 'finance'],
    functions: ['relation', 'terrain'],
    skills: ['Veille des prix', 'Négociation', 'Calibrage et lots', 'Encaissement', 'Séchage et stockage'],
    studyPaths: ['BTS ou Licence Techniques commerciales agro', 'École de commerce — agrobusiness', 'Formation Gestion de filière'],
    situations: ALL_SITUATIONS,
  },
  {
    id: 'chef_produit_touristique',
    title: 'Chef de produit touristique',
    context:
      "Vous dessinez un séjour, négociez les prestataires, calculez le prix de vente et le tenez en brochure comme en engagement.",
    core: { commerce_marketing: 3, tourisme: 3 },
    sectors: ['ict', 'logistique'],
    functions: ['conception', 'relation'],
    skills: ['Itinéraire', 'Calcul de prix de vente', 'Négociation prestataires', 'Brochure', 'Marketing Digital'],
    studyPaths: ['Licence Tourisme', 'BTS Voyage et hospitalité', 'École hôtelière puis Master marketing'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'delegate_medical',
    title: 'Délégué médical',
    context:
      "Entre le laboratoire et le prescripteur, vous portez un produit, une preuve clinique et un argumentaire adapté à chaque praticien.",
    core: { commerce_marketing: 3, sante: 2 },
    sectors: ['administration', 'logistique'],
    functions: ['relation', 'terrain'],
    skills: ['Communication', 'Présentation', 'Négociation', 'Soins de base', 'Fidélisation client'],
    studyPaths: ['Licence Sciences de la santé ou pharmacie', 'BTS Délégué du médicament', 'Formation Visiteur médical'],
    situations: ['bachelier', 'jeune_diplome', 'reconversion'],
  },
  {
    id: 'charge_developpement_formation',
    title: 'Chargé de développement formation professionnelle',
    context:
      "Vous vendez et déployez des programmes de formation auprès d'entreprises et d'institutions, puis vous en pilotez la réalisation.",
    core: { commerce_marketing: 3, education: 2 },
    sectors: ['ict', 'administration'],
    functions: ['relation', 'coordination'],
    skills: ['Pitch', 'Business Plan', 'Communication', 'Pédagogie', 'Présentation'],
    studyPaths: ['École de commerce — vente B2B', 'Licence pro Formation et développement commercial', 'Master Ingénierie de formation'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'educateur_sante_communaute',
    title: 'Éducateur pour la santé communautaire',
    context:
      "Hygiène de l'eau, vaccination, prévention des pandémies : le travail de santé se gagne dans les cours et les écoles, pas seulement au dispensaire.",
    core: { sante: 3, social: 2, education: 2 },
    sectors: ['agriculture', 'administration'],
    functions: ['relation', 'terrain'],
    skills: ['Sensibilisation', 'Premiers signes d’alerte', 'Hygiène de l’eau', 'Écoute Active', 'Animation de groupe'],
    studyPaths: ['BTS Santé communautaire', 'Licence Santé publique — promotion de la santé', 'Formation Agent de santé communautaire'],
    situations: ALL_SITUATIONS,
  },
  {
    id: 'charge_approvisionnement_sanitaire',
    title: 'Chargé d’approvisionnement sanitaire',
    context:
      "Rupture de stock de sérums ou chaîne du froid rompue : vous tenez les niveaux, les péremptions et les sorties d'un entrepôt de produits de santé.",
    core: { logistique: 3, sante: 2 },
    sectors: ['administration', 'finance'],
    functions: ['coordination', 'technique'],
    skills: ['Chaîne du froid', 'Traçabilité', 'Seuil d’alerte', 'Inventaire tournant', 'Fiche de stock'],
    studyPaths: ['DUT ou Licence Logistique puis formation produits de santé', 'Master Supply chain santé', 'Études de pharmacie'],
    situations: ['jeune_diplome', 'professionnel'],
  },
  {
    id: 'responsable_agrotourisme',
    title: 'Responsable d’agrotourisme',
    context:
      "Vous faites visiter et héberger une exploitation : récolte, atelier de transformation, table d'hôtes. Deux métiers dans une seule structure.",
    core: { tourisme: 3, agriculture: 2 },
    sectors: ['commerce_marketing', 'administration'],
    functions: ['terrain', 'conception'],
    skills: ['Production végétale', 'Élevage', 'Itinéraire', 'Négociation prestataires', 'Communication'],
    studyPaths: ['BTS ou Licence Tourisme puis agronomie', 'Formation Agrotourisme et écotourisme', 'École hôtelière et gestion d’exploitation'],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'assistant_social',
    title: 'Assistant(e) de service social',
    context:
      "Foyer en impayé, enfant signalé, droit non ouvert : vous instruisez la situation, déclenchez l'aide qui convient et tenez le dossier jusqu'à ce qu'il aboutisse — en centre social, à l'hôpital ou dans une ONG.",
    core: { social: 3, administration: 2 },
    sectors: ['sante', 'education'],
    functions: ['relation', 'terrain'],
    skills: ['Écoute Active', 'Secret professionnel', 'Accompagnement', 'Tenu de dossier', 'Médiation'],
    studyPaths: [
      'Diplôme d’État d’assistant social',
      'Licence Travail social',
      'École supérieure des assistants sociaux',
    ],
    situations: ALL_SITUATIONS,
  },
  {
    id: 'charge_protection_enfance',
    title: 'Chargé(e) de protection de l’enfance',
    context:
      "Repérer un enfant en danger, alerter l'autorité qui décide, suivre la mesure : la protection ne s'arrête pas au signalement, elle tient un dossier jusqu'à la décision et au-delà.",
    core: { social: 3, administration: 2 },
    sectors: ['sante', 'education'],
    functions: ['terrain', 'relation'],
    skills: ['Écoute Active', 'Signalement', 'Suivi de situation', 'Secret professionnel', 'Médiation'],
    studyPaths: [
      'Licence Travail social — protection de l’enfance',
      'Diplôme d’éducateur spécialisé',
      'Formation cadre humanitaire — protection',
    ],
    situations: ALL_SITUATIONS,
  },
  {
    id: 'administrateur_socio_educatif',
    title: "Administrateur d'action socio-éducative",
    context:
      "Vous pilotez un dispositif d'accompagnement — programme jeunesse, alphabétisation fonctionnelle, réinsertion — de la conception du programme au suivi des agents qui le portent sur le terrain.",
    core: { social: 3, education: 2 },
    sectors: ['administration'],
    functions: ['coordination', 'relation'],
    skills: ['Animation de groupe', 'Gestion de Projet', 'Organisation', 'Accompagnement', 'Communication'],
    studyPaths: [
      'STASE — éducation socio-culturelle',
      'Licence Sciences de l’éducation et action sociale',
      'Master Management des organisations sociales',
    ],
    situations: ['jeune_diplome', 'reconversion', 'professionnel'],
  },
  {
    id: 'agent_developpement_local',
    title: 'Agent de développement local',
    context:
      "Cartographier les acteurs d'une commune, monter le projet qu'ils choisissent eux-mêmes, tenir la redevabilité devant ceux qui financent : le développement local se joue en réunions autant qu'en bureaux.",
    core: { social: 3, administration: 2 },
    sectors: ['agriculture', 'finance'],
    functions: ['coordination', 'terrain'],
    skills: ['Animation de groupe', 'Cadre logique', 'Redevabilité', 'Organisation', 'Communication'],
    studyPaths: [
      'Licence Sociologie anthropologie',
      'Planification du développement local',
      'Master Gestion des projets de développement',
    ],
    situations: ALL_SITUATIONS,
  },
];

export const OCCUPATIONS_BY_ID: Record<string, CrossOccupation> = CROSS_OCCUPATIONS.reduce(
  (acc, occupation) => {
    acc[occupation.id] = occupation;
    return acc;
  },
  {} as Record<string, CrossOccupation>
);
