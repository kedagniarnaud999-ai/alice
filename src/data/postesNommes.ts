/**
 * Les postes que sa base nomme derrière chacune de nos fiches.
 *
 * Cette table est la projection de `referentiel.ts` : le rang d'une fiche (`METIER_PAR_FICHE`)
 * croisé avec les spécialisations qui ont ce rang pour parent. Elle existe pour que les écrans
 * lisent des intitulés sans embarquer les définitions, compétences et formations du référentiel
 * dans le paquet livré. `src/checks/contenu.check.ts` rougit dès que les deux tables divergent.
 *
 * 83 lignes de postes pour 42 fiches. Un titre compte pour une fiche quand le métier
 * générique qui la range le porte, et quand le domaine propre du titre est un domaine que
 * la fiche ouvre. Un seau de sa nomenclature est un niveau, pas une famille : sans ce tri,
 * plusieurs fiches rangées sous le même seau afficheraient la même liste, y compris des
 * titres qui ne sont pas des leurs. Quand le tri ne laisse plus aucun titre, la liste du
 * seau est gardée entière et marquée en approximation. Trois fiches n'ouvrent aucun poste,
 * parce que le métier générique qui les range ne spécialise encore rien dans sa base :
 * responsable_administratif_financier, coordinateur_pedagogique, charge_developpement_formation.
 *
 * `approximation` dit deux choses : le rang de la fiche dans sa nomenclature est défendable
 * et non strict — c'est mon jugement, sa base à lui nommant elle-même le parent de chaque
 * spécialisation — ou le tri par domaine n'a rien laissé et la liste vient du seau entier.
 * L'écran le dit une fois par fiche plutôt que de porter un doute ligne à ligne.
 */

export interface PosteNomme {
  code: string;
  libelle: string;
}

export interface PostesDeFiche {
  postes: PosteNomme[];
  approximation: boolean;
}

const AUCUN: PostesDeFiche = { postes: [], approximation: false };

const PAR_FICHE: Record<string, PostesDeFiche> = {
  gestionnaire_projet_ict4d: {
    postes: [
      { code: 'SP106', libelle: 'Chef de projet de développement' }
    ],
    approximation: false,
  },
  charge_logistique_humanitaire: {
    postes: [
      { code: 'SP051', libelle: 'Responsable logistique portuaire' },
      { code: 'SP054', libelle: 'Responsable supply chain import-export' }
    ],
    approximation: true,
  },
  gestionnaire_etablissement_sante: {
    postes: [
      { code: 'SP095', libelle: 'Directeur d\'hôpital / Administrateur de centre de santé' },
      { code: 'SP103', libelle: 'Directeur d\'ONG' }
    ],
    approximation: true,
  },
  responsable_hebergement: {
    postes: [
      { code: 'SP069', libelle: 'Gouvernante' },
      { code: 'SP071', libelle: 'Responsable d\'hébergement' }
    ],
    approximation: false,
  },
  charge_marketing_digital: {
    postes: [
      { code: 'SP035', libelle: 'Responsable e-commerce' },
      { code: 'SP080', libelle: 'Growth hacker' },
      { code: 'SP081', libelle: 'Responsable marketing digital' }
    ],
    approximation: false,
  },
  concepteur_produit_mobile_money: {
    postes: [
      { code: 'SP078', libelle: 'Chef de projet digital' }
    ],
    approximation: true,
  },
  technicien_reseaux_telecom: {
    postes: [
      { code: 'SP076', libelle: 'Administrateur réseau' }
    ],
    approximation: false,
  },
  concepteur_elearning: {
    postes: [
      { code: 'SP092', libelle: 'Concepteur de programmes pédagogiques' }
    ],
    approximation: false,
  },
  technicien_agriculture_precision: {
    postes: [
      { code: 'SP004', libelle: 'Technicien agricole' },
      { code: 'SP006', libelle: 'Zootechnicien' },
      { code: 'SP008', libelle: 'Technicien en aquaponie' }
    ],
    approximation: false,
  },
  charge_destination_numerique: {
    postes: [
      { code: 'SP072', libelle: 'Chargé de promotion touristique' }
    ],
    approximation: true,
  },
  charge_credit_agricole: {
    postes: [
      { code: 'SP084', libelle: 'Chargé de clientèle bancaire' },
      { code: 'SP085', libelle: 'Agent de microfinance' }
    ],
    approximation: true,
  },
  acheteur_supply_chain: {
    postes: [
      { code: 'SP051', libelle: 'Responsable logistique portuaire' },
      { code: 'SP054', libelle: 'Responsable supply chain import-export' }
    ],
    approximation: true,
  },
  analyste_financement_infrastructure: {
    postes: [
      { code: 'SP083', libelle: 'Analyste crédit' },
      { code: 'SP086', libelle: 'Actuaire' },
      { code: 'SP087', libelle: 'Gestionnaire de portefeuille' }
    ],
    approximation: false,
  },
  gestionnaire_bourses_financement: {
    postes: [
      { code: 'SP108', libelle: 'Chargé de partenariats institutionnels' }
    ],
    approximation: true,
  },
  technicien_solaire_irrigation: {
    postes: [
      { code: 'SP004', libelle: 'Technicien agricole' },
      { code: 'SP006', libelle: 'Zootechnicien' },
      { code: 'SP008', libelle: 'Technicien en aquaponie' }
    ],
    approximation: true,
  },
  responsable_maintenance: {
    postes: [
      { code: 'SP024', libelle: 'Technicien de maintenance industrielle' },
      { code: 'SP027', libelle: 'Électrotechnicien' }
    ],
    approximation: true,
  },
  formateur_technique_tvet: {
    postes: [
      { code: 'SP090', libelle: 'Enseignant / Professeur' },
      { code: 'SP091', libelle: 'Formateur professionnel' }
    ],
    approximation: false,
  },
  negociant_agribusiness: {
    postes: [
      { code: 'SP032', libelle: 'Responsable des ventes' },
      { code: 'SP033', libelle: 'Chef de rayon' }
    ],
    approximation: false,
  },
  chef_produit_touristique: {
    postes: [
      { code: 'SP035', libelle: 'Responsable e-commerce' }
    ],
    approximation: true,
  },
  delegate_medical: {
    postes: [
      { code: 'SP034', libelle: 'Commercial terrain' }
    ],
    approximation: true,
  },
  educateur_sante_communaute: {
    postes: [
      { code: 'SP013', libelle: 'Formateur agricole / vulgarisateur' },
      { code: 'SP057', libelle: 'Formateur en sûreté aéroportuaire' },
      { code: 'SP090', libelle: 'Enseignant / Professeur' },
      { code: 'SP091', libelle: 'Formateur professionnel' }
    ],
    approximation: true,
  },
  charge_approvisionnement_sanitaire: {
    postes: [
      { code: 'SP036', libelle: 'Responsable approvisionnement commerce' }
    ],
    approximation: true,
  },
  responsable_agrotourisme: {
    postes: [
      { code: 'SP001', libelle: 'Chef d\'exploitation agricole / Gérant de ferme' },
      { code: 'SP066', libelle: 'Directeur d\'hôtel / Gérant de restaurant' }
    ],
    approximation: true,
  },
  assistant_social: {
    postes: [
      { code: 'SP100', libelle: 'Travailleur social' },
      { code: 'SP110', libelle: 'Éducateur spécialisé' },
      { code: 'SP111', libelle: 'Animateur socio-éducatif' },
      { code: 'SP112', libelle: 'Chargé de protection de l\'enfance' }
    ],
    approximation: false,
  },
  charge_protection_enfance: {
    postes: [
      { code: 'SP100', libelle: 'Travailleur social' },
      { code: 'SP110', libelle: 'Éducateur spécialisé' },
      { code: 'SP111', libelle: 'Animateur socio-éducatif' },
      { code: 'SP112', libelle: 'Chargé de protection de l\'enfance' }
    ],
    approximation: false,
  },
  administrateur_socio_educatif: {
    postes: [
      { code: 'SP089', libelle: 'Directeur d\'établissement scolaire / Proviseur' },
      { code: 'SP109', libelle: 'Directeur de centre social / ONG sociale' }
    ],
    approximation: true,
  },
  agent_developpement_local: {
    postes: [
      { code: 'SP106', libelle: 'Chef de projet de développement' }
    ],
    approximation: true,
  },
  infirmier_etat: {
    postes: [
      { code: 'SP097', libelle: 'Infirmier' },
      { code: 'SP098', libelle: 'Sage-femme' },
      { code: 'SP099', libelle: 'Kinésithérapeute' }
    ],
    approximation: false,
  },
  sage_femme: {
    postes: [
      { code: 'SP097', libelle: 'Infirmier' },
      { code: 'SP098', libelle: 'Sage-femme' },
      { code: 'SP099', libelle: 'Kinésithérapeute' }
    ],
    approximation: false,
  },
  kinesitherapeute: {
    postes: [
      { code: 'SP097', libelle: 'Infirmier' },
      { code: 'SP098', libelle: 'Sage-femme' },
      { code: 'SP099', libelle: 'Kinésithérapeute' }
    ],
    approximation: false,
  },
  dieteticien_nutrition: {
    postes: [
      { code: 'SP097', libelle: 'Infirmier' },
      { code: 'SP098', libelle: 'Sage-femme' },
      { code: 'SP099', libelle: 'Kinésithérapeute' }
    ],
    approximation: true,
  },
  educateur_specialise: {
    postes: [
      { code: 'SP100', libelle: 'Travailleur social' },
      { code: 'SP110', libelle: 'Éducateur spécialisé' },
      { code: 'SP111', libelle: 'Animateur socio-éducatif' },
      { code: 'SP112', libelle: 'Chargé de protection de l\'enfance' }
    ],
    approximation: false,
  },
  enseignant_primaire: {
    postes: [
      { code: 'SP090', libelle: 'Enseignant / Professeur' },
      { code: 'SP091', libelle: 'Formateur professionnel' }
    ],
    approximation: false,
  },
  agent_accueil_administration: {
    postes: [
      { code: 'SP068', libelle: 'Réceptionniste' },
      { code: 'SP070', libelle: 'Guide touristique' }
    ],
    approximation: true,
  },
  assistant_direction: {
    postes: [
      { code: 'SP104', libelle: 'Secrétaire général de mairie' }
    ],
    approximation: true,
  },
  comptable: {
    postes: [
      { code: 'SP002', libelle: 'Gestionnaire comptable de coopérative agricole' }
    ],
    approximation: true,
  },
  chef_chantier: {
    postes: [
      { code: 'SP040', libelle: 'Chef de chantier' }
    ],
    approximation: false,
  },
  developpeur_web_mobile: {
    postes: [
      { code: 'SP074', libelle: 'Développeur web / mobile' }
    ],
    approximation: false,
  },
  receptionniste_hotel: {
    postes: [
      { code: 'SP068', libelle: 'Réceptionniste' },
      { code: 'SP070', libelle: 'Guide touristique' }
    ],
    approximation: false,
  },
  conseiller_technique_agricole: {
    postes: [
      { code: 'SP005', libelle: 'Conseiller agricole / Agent de vulgarisation' }
    ],
    approximation: false,
  },
  magasinier_preparateur: {
    postes: [
      { code: 'SP037', libelle: 'Gestionnaire d\'entrepôt commercial' }
    ],
    approximation: true,
  },
  attache_commercial: {
    postes: [
      { code: 'SP034', libelle: 'Commercial terrain' }
    ],
    approximation: false,
  }
};

/** Ce que la base nomme comme postes derrière cette fiche, dans son ordre de code. */
export function postesPourFiche(occupationId: string): PostesDeFiche {
  return PAR_FICHE[occupationId] ?? AUCUN;
}
