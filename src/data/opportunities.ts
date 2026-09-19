import { FunctionalDomainId } from '@/types/test';
import { ALL_DOMAIN_IDS } from '@/data/domains';
import { CrossOccupation } from '@/data/occupations';

/**
 * Conteneur des chances reliées à un métier : où se former, quelle formation
 * courte, comment financer. Rien ici n'est une donnée vérifiée — un nom d'école
 * ou de bourse inventé enverrait un candidat vers un établissement qui n'existe
 * pas, ce qui est pire que une case vide.
 *
 * Comment remplir ce catalogue (dans l'ordre de fiabilité) :
 *  1. une liste fournie par l'équipe (partenaires, annuaire déjà contrôlé) :
 *     `source: 'fourni'`, une `url` réelle et `verifiedAt` à la date de contrôle ;
 *  2. une table backend exposée par l'API (Lot 2) : le même format JSON, et ce
 *     fichier ne devient que le repli hors ligne ;
 *  3. le jeu de démonstration ci-dessous, qui n'a d'autre rôle que de prouver
 *     l'appariement et l'affichage. `source: 'demo'` interdit l'`url` : l'UI
 *     affiche un badge « Démo » tant qu'une chance n'est pas passée en 'fourni'
 *     ou 'verifie'.
 */
export type OpportunityKind = 'etablissement' | 'formation' | 'bourse';

export type OpportunitySource = 'demo' | 'fourni' | 'verifie';

/** 'multi' = dispositif régional ou en ligne, donc sans pays unique à afficher. */
export interface Opportunity {
  id: string;
  kind: OpportunityKind;
  label: string;
  country: string;
  delivery?: 'presentiel' | 'distanciel' | 'hybride';
  occupationIds: string[];
  domainIds: FunctionalDomainId[];
  source: OpportunitySource;
  verifiedAt?: string;
  url?: string;
}

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'demo_etablissement_management',
    kind: 'etablissement',
    label: 'École de management et de gestion de projet (cycle licence / master)',
    country: 'multi',
    delivery: 'presentiel',
    occupationIds: [
      'gestionnaire_projet_ict4d',
      'responsable_administratif_financier',
      'gestionnaire_bourses_financement',
    ],
    domainIds: ['administration', 'finance'],
    source: 'demo',
  },
  {
    id: 'demo_etablissement_numerique',
    kind: 'etablissement',
    label: 'Institut des métiers du numérique (cycle DUT / BTS)',
    country: 'multi',
    delivery: 'presentiel',
    occupationIds: [
      'concepteur_produit_mobile_money',
      'technicien_reseaux_telecom',
      'charge_marketing_digital',
    ],
    domainIds: ['ict'],
    source: 'demo',
  },
  {
    id: 'demo_etablissement_tvet_agricole',
    kind: 'etablissement',
    label: 'Lycée technique / centre de formation professionnelle agricole',
    country: 'multi',
    delivery: 'presentiel',
    occupationIds: ['technicien_agriculture_precision', 'technicien_solaire_irrigation'],
    domainIds: ['agriculture', 'ingenierie'],
    source: 'demo',
  },
  {
    id: 'demo_etablissement_paramedical',
    kind: 'etablissement',
    label: 'Institut de formation paramédicale et de santé publique',
    country: 'multi',
    delivery: 'presentiel',
    occupationIds: [
      'gestionnaire_etablissement_sante',
      'educateur_sante_communaute',
      'delegate_medical',
    ],
    domainIds: ['sante_social'],
    source: 'demo',
  },
  {
    id: 'demo_etablissement_ens_technique',
    kind: 'etablissement',
    label: "École normale d'enseignement technique et professionnel",
    country: 'multi',
    delivery: 'presentiel',
    occupationIds: ['formateur_technique_tvet', 'coordinateur_pedagogique'],
    domainIds: ['education', 'ingenierie'],
    source: 'demo',
  },
  {
    id: 'demo_etablissement_hotellerie',
    kind: 'etablissement',
    label: 'École d’hôtellerie, de tourisme et de restauration',
    country: 'multi',
    delivery: 'presentiel',
    occupationIds: ['responsable_hebergement', 'chef_produit_touristique', 'responsable_agrotourisme'],
    domainIds: ['tourisme'],
    source: 'demo',
  },
  {
    id: 'demo_etablissement_logistique',
    kind: 'etablissement',
    label: 'Institut de formation aux métiers du transport et de la logistique',
    country: 'multi',
    delivery: 'presentiel',
    occupationIds: [
      'charge_logistique_humanitaire',
      'acheteur_supply_chain',
      'charge_approvisionnement_sanitaire',
    ],
    domainIds: ['logistique'],
    source: 'demo',
  },
  {
    id: 'demo_formation_gestion_projet',
    kind: 'formation',
    label: 'Certification gestion de projet, niveau opérationnel',
    country: 'multi',
    delivery: 'hybride',
    occupationIds: ['gestionnaire_projet_ict4d', 'charge_logistique_humanitaire'],
    domainIds: ['administration'],
    source: 'demo',
  },
  {
    id: 'demo_formation_donnees',
    kind: 'formation',
    label: 'Formation analyse de données et tableaux de bord de suivi',
    country: 'multi',
    delivery: 'distanciel',
    occupationIds: ['analyste_financement_infrastructure', 'concepteur_produit_mobile_money'],
    domainIds: ['ict', 'finance'],
    source: 'demo',
  },
  {
    id: 'demo_formation_digital',
    kind: 'formation',
    label: 'Parcours certifiant marketing digital et animation de communauté',
    country: 'multi',
    delivery: 'distanciel',
    occupationIds: ['charge_marketing_digital', 'charge_destination_numerique'],
    domainIds: ['commerce_marketing', 'ict'],
    source: 'demo',
  },
  {
    id: 'demo_formation_comptabilite',
    kind: 'formation',
    label: 'Formation comptabilité et gestion budgétaire appliquée',
    country: 'multi',
    delivery: 'presentiel',
    occupationIds: ['responsable_administratif_financier', 'charge_credit_agricole'],
    domainIds: ['finance', 'administration'],
    source: 'demo',
  },
  {
    id: 'demo_formation_foad',
    kind: 'formation',
    label: 'Ingénierie pédagogique et formation à distance',
    country: 'multi',
    delivery: 'distanciel',
    occupationIds: ['concepteur_elearning', 'charge_developpement_formation'],
    domainIds: ['education', 'ict'],
    source: 'demo',
  },
  {
    id: 'demo_formation_reseaux',
    kind: 'formation',
    label: 'Certification infrastructure, réseaux et maintenance',
    country: 'multi',
    delivery: 'hybride',
    occupationIds: ['technicien_reseaux_telecom', 'responsable_maintenance'],
    domainIds: ['ict', 'ingenierie'],
    source: 'demo',
  },
  {
    id: 'demo_formation_chaine_froide',
    kind: 'formation',
    label: 'Gestion des approvisionnements et chaîne du froid',
    country: 'multi',
    delivery: 'presentiel',
    occupationIds: ['charge_approvisionnement_sanitaire'],
    domainIds: ['logistique', 'sante_social'],
    source: 'demo',
  },
  {
    id: 'demo_bourse_criteria_sociaux',
    kind: 'bourse',
    label: 'Bourse nationale sur critères sociaux',
    country: 'multi',
    occupationIds: [],
    domainIds: ALL_DOMAIN_IDS,
    source: 'demo',
  },
  {
    id: 'demo_bourse_alternance',
    kind: 'bourse',
    label: "Prise en charge par l'employeur ou alternance rémunérée",
    country: 'multi',
    occupationIds: [],
    domainIds: ['administration', 'finance', 'ict', 'commerce_marketing', 'ingenierie', 'logistique'],
    source: 'demo',
  },
  {
    id: 'demo_bourse_cooperation',
    kind: 'bourse',
    label: "Bourse de mobilité d'un programme de coopération régionale",
    country: 'multi',
    occupationIds: [],
    domainIds: ['agriculture', 'education', 'sante_social', 'ict'],
    source: 'demo',
  },
  {
    id: 'demo_bourse_excellence',
    kind: 'bourse',
    label: "Bourse d'excellence d'une institution multilatérale de développement",
    country: 'multi',
    occupationIds: [],
    domainIds: ['finance', 'ingenierie', 'ict', 'administration'],
    source: 'demo',
  },
];

const KIND_ORDER: Record<OpportunityKind, number> = {
  etablissement: 0,
  formation: 1,
  bourse: 2,
};

/**
 * Une chance est retenue si elle nomme le métier, ou si elle enseigne un des
 * domaines de cœur de la fiche. Les `sectors` sont volontairement hors jeu : ils
 * disent où le métier se pratique, pas ce qu'on étudie — sinon une école paramédicale
 * remonte sur un poste de gestion de projet ICT4D sous prétexte qu'il se vit aussi
 * dans la santé. Une offre qui balaie tous les domaines perd en outre le bénéfice
 * de la spécificité.
 */
function relevanceOf(opportunity: Opportunity, occupation: CrossOccupation): number {
  if (opportunity.occupationIds.includes(occupation.id)) return 100;
  const coreIds = new Set(Object.keys(occupation.core));
  const shared = opportunity.domainIds.filter((domainId) => coreIds.has(domainId)).length;
  if (shared === 0) return 0;
  return shared - opportunity.domainIds.length * 0.05;
}

export function opportunitiesForOccupation(
  occupation: CrossOccupation,
  kind?: OpportunityKind
): Opportunity[] {
  return OPPORTUNITIES.map((opportunity) => ({
    opportunity,
    relevance: relevanceOf(opportunity, occupation),
  }))
    .filter(({ opportunity, relevance }) => relevance > 0 && (!kind || opportunity.kind === kind))
    .sort(
      (a, b) =>
        b.relevance - a.relevance ||
        KIND_ORDER[a.opportunity.kind] - KIND_ORDER[b.opportunity.kind] ||
        a.opportunity.label.localeCompare(b.opportunity.label)
    )
    .map(({ opportunity }) => opportunity);
}

/** Le badge « Démo » tant qu'aucune donnée réelle n'est entrée dans le catalogue. */
export const isDemoOpportunity = (opportunity: Opportunity): boolean =>
  opportunity.source === 'demo';
