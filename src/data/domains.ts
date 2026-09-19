import { FunctionalDomainId } from '@/types/test';

export interface FunctionalDomain {
  id: FunctionalDomainId;
  label: string;
  /** Compact label for chips and badges. */
  shortLabel: string;
  tagline: string;
  description: string;
  occupations: string[];
  studyPaths: string[];
}

/**
 * Local catalogue of the 10 functional domains used by the orientation engine.
 * This is an original, self-contained taxonomy (inspired by common francophone
 * career-field groupings); it does not import or depend on any external catalogue.
 */
export const FUNCTIONAL_DOMAINS: FunctionalDomain[] = [
  {
    id: 'administration',
    label: 'Administration & Gestion',
    shortLabel: 'Administration',
    tagline: 'Organiser, coordonner et faire tourner la structure',
    description:
      'Les métiers du support, des processus et de l’organisation : bureautique, ressources humaines, gestion administrative et coordination.',
    occupations: [
      'Assistant(e) de direction',
      'Chargé(e) des ressources humaines',
      'Agent administratif',
      'Chargé(e) de clientèle',
      'Coordinateur(trice) de projet',
    ],
    studyPaths: [
      'BTS/Licence Gestion administrative',
      'Licence RH',
      'Secrétariat et bureautique',
      'Gestion de projet',
    ],
  },
  {
    id: 'commerce_marketing',
    label: 'Commerce, Vente & Marketing',
    shortLabel: 'Commerce & Marketing',
    tagline: 'Convaincre, vendre et développer un marché',
    description:
      'La vente, la négociation, la promotion et la relation client — du terrain au marketing digital.',
    occupations: [
      'Commercial(e) / Attaché(e) commercial',
      'Responsable marketing',
      'Chargé(e) de communication digitale',
      'Chef de produit',
      'Gérant(e) de point de vente',
    ],
    studyPaths: [
      'BTS/Licence Commerce international',
      'École de commerce',
      'Marketing digital',
      'Techniques de vente',
    ],
  },
  {
    id: 'finance',
    label: 'Finance & Comptabilité',
    shortLabel: 'Finance & Compta',
    tagline: 'Chiffrer, contrôler et financer',
    description:
      'Les chiffres, la trésorerie, l’audit et l’analyse financière — la rigueur au service de la décision.',
    occupations: [
      'Comptable',
      'Analyste financier(ère)',
      'Auditeur(trice)',
      'Contrôleur(se) de gestion',
      'Conseiller(ère) en banque',
    ],
    studyPaths: [
      'BTS CG / DCG / DSCG',
      'Licence Finance',
      'Comptabilité et gestion',
      'Audit et contrôle',
    ],
  },
  {
    id: 'ingenierie',
    label: 'Ingénierie & Métiers Techniques',
    shortLabel: 'Ingénierie',
    tagline: 'Concevoir, construire et maintenir',
    description:
      'Le génie civil, mécanique, électrique et les métiers techniques — comprendre et fabriquer le monde matériel.',
    occupations: [
      'Ingénieur(e) génie civil',
      'Technicien(ne) maintenance industrielle',
      'Dessinateur(trice)-projeteur(se)',
      'Électrotechnicien(ne)',
      'Chef de chantier',
    ],
    studyPaths: [
      'DUT/BTS Génie civil / mécanique / EE',
      'École d’ingénieurs',
      'Licence professionnelle technique',
      'Formation professionnelle du bâtiment',
    ],
  },
  {
    id: 'ict',
    label: "Technologies de l'Information",
    shortLabel: 'Tech / ICT',
    tagline: 'Programmer, concevoir et administrer les systèmes',
    description:
      'Le développement, les réseaux, la donnée et le digital — construire les outils numériques de demain.',
    occupations: [
      'Développeur(se) web / mobile',
      'Administrateur(trice) réseaux & systèmes',
      'Data analyst',
      'Technicien(ne) support IT',
      'Chef de projet digital',
    ],
    studyPaths: [
      'Licence Informatique',
      'BTS/Licence pro développement',
      'Réseaux et télécommunications',
      'Écoles du numérique (coding bootcamps)',
    ],
  },
  {
    id: 'tourisme',
    label: 'Tourisme, Hôtellerie & Restauration',
    shortLabel: 'Tourisme & Hôtellerie',
    tagline: 'Accueillir, servir et faire vivre une expérience',
    description:
      "L'accueil, l'hébergement, la restauration et le tourisme — l'hospitalité et le sens du service.",
    occupations: [
      'Réceptionniste / Agent de réservation',
      'Manager en restauration',
      'Guide touristique',
      'Chef de rang / Cuisinier(ère)',
      'Chargé(e) d’événementiel',
    ],
    studyPaths: [
      'BTS Hôtellerie / Tourisme',
      'École hôtelière',
      'Restauration et métiers de bouche',
      'Agences de voyage et guidage',
    ],
  },
  {
    id: 'sante_social',
    label: 'Santé & Services sociaux',
    shortLabel: 'Santé & Social',
    tagline: 'Soigner, accompagner et protéger',
    description:
      'Les soins, la santé publique et l’accompagnement social — prendre soin des personnes et des communautés.',
    occupations: [
      'Infirmier(ère)',
      'Aide-soignant(e)',
      'Assistant(e) social(e)',
      'Sage-femme',
      'Agent de santé communautaire',
    ],
    studyPaths: [
      'Institut de formation en soins infirmiers',
      'Licence Sciences de la santé',
      'Travail social / CSS',
      'Santé publique',
    ],
  },
  {
    id: 'education',
    label: 'Éducation & Formation',
    shortLabel: 'Éducation',
    tagline: 'Transmettre, former et faire grandir',
    description:
      "L'enseignement, la pédagogie et la formation — transmettre des savoirs et développer les compétences.",
    occupations: [
      'Enseignant(e)',
      'Formateur(trice) professionnel(le)',
      'Éducateur(trice)',
      'Ingénieur(e) pédagogique',
      'Coach / Mentor',
    ],
    studyPaths: [
      ' Licence d’enseignement',
      'CAPES / écoles normales',
      'Sciences de l’éducation',
      'Ingénierie de formation',
    ],
  },
  {
    id: 'agriculture',
    label: 'Agriculture & Agroalimentaire',
    shortLabel: 'Agriculture',
    tagline: 'Cultiver, élever et transformer',
    description:
      "Les cultures, l'élevage, l'agroalimentaire et l'environnement — produire et valoriser le vivant.",
    occupations: [
      'Technicien(ne) agricole',
      'Agronome',
      'Éleveur(se) / agriculteur(trice)',
      'Responsable qualité agroalimentaire',
      'Conseiller(ère) en agribusiness',
    ],
    studyPaths: [
      'BTS/Licence Agronomie',
      'Écoles d’agriculture et vétérinaires',
      'Génie rural / productions animales et végétales',
      'Transformations agroalimentaires',
    ],
  },
  {
    id: 'logistique',
    label: 'Transport & Logistique',
    shortLabel: 'Transport & Logistique',
    tagline: 'Acheminer, stocker et distribuer',
    description:
      'La supply chain, le stockage, le transport et la distribution — faire circuler les biens au bon moment.',
    occupations: [
      'Responsable logistique / entrepôt',
      'Agent de transit',
      'Approvisionneur(se)',
      'Gestionnaire de stock',
      'Planificateur(trice) transport',
    ],
    studyPaths: [
      'BTS Transport / Logistique',
      'Licence Supply chain',
      'Gestion des flux et entrepôts',
      'Transit et douane',
    ],
  },
];

export const FUNCTIONAL_DOMAINS_BY_ID: Record<FunctionalDomainId, FunctionalDomain> =
  FUNCTIONAL_DOMAINS.reduce(
    (acc, domain) => {
      acc[domain.id] = domain;
      return acc;
    },
    {} as Record<FunctionalDomainId, FunctionalDomain>
  );

export const ALL_DOMAIN_IDS: FunctionalDomainId[] = FUNCTIONAL_DOMAINS.map((d) => d.id);
