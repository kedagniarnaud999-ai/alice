import { FUNCTION_ROLE_IDS, ROLE_LABELS } from '@/data/psychAffinity';
import { FunctionRoleId } from '@/types/test';

/**
 * Une fonction, telle que l'entend l'entonnoir : ce que fait une personne DANS
 * une structure, indépendamment du secteur où se trouve la structure. Le domaine
 * répond « où », la fonction répond « dans quel service », le métier répond « quel
 * poste ». Les six libellés vivent dans `psychAffinity.ts` (ce sont les axes déjà
 * scorés par le questionnaire) ; ce fichier n'ajoute que la phrase que le
 * candidat lit sous le nom.
 */
export interface FunctionProfile {
  id: FunctionRoleId;
  label: string;
  /** Ce que la fonction produit dans une structure. Aucun intitulé de poste, aucune école. */
  blurb: string;
}

const FUNCTION_BLURBS: Record<FunctionRoleId, string> = {
  coordination:
    'Tenir un objectif à plusieurs : planifier, arbitrer, suivre les engagements et rendre des comptes.',
  analyse:
    'Chiffrer et comprendre avant de décider : mesurer, modéliser, contrôler, documenter.',
  technique:
    'Fabriquer, installer, réparer et faire tourner — du matériel jusqu’au logiciel.',
  relation:
    'Convaincre, conseiller, accompagner : tout ce qui se joue avec une personne en face.',
  conception:
    'Donner forme à une idée : un produit, un service, un contenu, un visuel.',
  terrain:
    'Exécuter là où les choses se passent : déployer, prévenir, intervenir au plus près des faits.',
};

export const FUNCTION_PROFILES: Record<FunctionRoleId, FunctionProfile> = FUNCTION_ROLE_IDS.reduce(
  (acc, id) => {
    acc[id] = { id, label: ROLE_LABELS[id], blurb: FUNCTION_BLURBS[id] };
    return acc;
  },
  {} as Record<FunctionRoleId, FunctionProfile>
);

/** Ordre stable pour toute liste qui n'a pas de raison de trier autrement. */
export const FUNCTION_PROFILE_LIST: FunctionProfile[] = FUNCTION_ROLE_IDS.map(
  (id) => FUNCTION_PROFILES[id]
);

/**
 * Les motifs proposés au « pourquoi ce choix ? ». Quatre cases suffisent : elles
 * couvrent les trois façons dont un choix réel dépasse un questionnaire (déjà vu
 * sur place, déjà en formation, ce qui fait vivre ici) plus la seule qui nous
 * accuse — « le test n'a pas vu ce côté de moi » — et c'est exactement celle dont
 * le formulaire d'orientation a besoin pour progresser.
 */
export const CHOICE_RATIONALES: { id: string; label: string }[] = [
  { id: 'vu_around', label: 'J’ai déjà vu ce travail autour de moi' },
  { id: 'already_training', label: 'Je me forme déjà dans cette direction' },
  { id: 'pays_real', label: 'Ici, c’est ce qui fait vivre' },
  { id: 'test_missed', label: 'Le test n’a pas vu ce côté de moi' },
];
