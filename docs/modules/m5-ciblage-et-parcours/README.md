# M5 · Ciblage & parcours

**Statut : proposition non autorisée — gate 0 non signé.**

## Destination

Le parcours ne se recommande plus seulement : il s'ouvre, une leçon s'y lit, et rien ne promet un paiement qui
n'existe pas.

## Périmètre

| Chemin | Rôle |
|---|---|
| `src/components/focus/` | `FocusFlow`, `OccupationStep`, `SpecializationStep` |
| `src/utils/focusSelection.ts` | `validateFocus` (`:87`) — la phrase lisible quand le ciblage sort des bornes |
| `src/utils/domainFocus.ts` | le `targeting` persisté dans le profil |
| `src/components/pathway/PathwayView.tsx` | la piste, les modules, `ModuleDetailView` (`:429`) |
| `src/utils/pathwayEngine.ts` | `estimatedWeeks` (`:98`, `:179`) et l'ordre gratuit → payant |

## Acquis (mesuré le 2026-09-23)

- **F-07 — le ciblage est borné et il parle.** 1 à 3 débouchés, jusqu'à 2 axes ; hors bornes, `validateFocus`
  renvoie une phrase et le bouton reste désactivé.
- **F-08 — le parcours est taillé.** `TRACK_MODULE_COUNT = 5`, ordre `isFree` vérifié par `pathway.check`, et
  `estimatedWeeks` se calcule sur les modules réellement affichés (`pathwayEngine.ts:98`) — plus un chiffre
  décoratif.
- **Les trois victoires rapides sont gratuites et débutantes**, et c'est une assertion
  (`pathway.check.ts:320`), pas une intention.

## À développer

| Code | Travail | Critère d'acceptation | Dépend de |
|---|---|---|---|
| F-14 · T-011 | Contenu réel des modules, **ou renonciation écrite** | `ModuleDetailView` (`PathwayView.tsx:429`) n'affiche plus quatre étapes générées depuis le titre et le format (`:436`) : soit une leçon et un exercice, soit l'écran dit explicitement « AliTché vous oriente vers cette formation, il ne l'héberge pas ». **Bloqué : arbitrage produit d'abord** (PRD §11.4) | le fondateur |
| T-026 | Gate de classabilité | Chaque fiche atteignable pour le profil qui la cible, **avec un coussin ≥ 2 points** mesuré, sans qu'un seuil ait bougé pour y arriver | T-021 (M3) |
| T-027 | Reprendre le parcours à l'étape atteinte | Rouvrir trois jours après reprend à l'étape atteinte, **avec l'URL de cette étape** | T-013 (M6) |
| D-04 | Étiquettes « Gratuit » / « Premium » sans paiement | `PathwayView.tsx:374`/`:378` rendent ces mots, `:457` les déduit de `isFree`. Aucun paiement derrière (Non-goal 4, R-004). Soit l'affichage se retire, soit T-011 assume une offre réelle | F-14 |

## Le point de bascule du module

Aujourd'hui AliTché annonce un parcours de 12 à 19 semaines **sans contenir une leçon**. C'est défendable — le
produit est un orienteur, pas une école — à une condition : que l'écran le dise. Tant que ce n'est pas dit,
l'utilisateur lit « formation » et arrive avec une attente que nous ne remplissons pas, et le badge « Premium »
ajoute une couche de promesse commerciale que le produit n'a jamais eu l'intention de tenir.

C'est pour ça que la renonciation écrite est une issue **au même titre** que le contenu réel. Ce qui n'en est
pas une, c'est l'état actuel.

## Preuve de fin

Un candidat ouvre son parcours, lit une véritable leçon dans un module gratuit — ou lit clairement qu'AliTché
l'oriente sans héberger la formation —, et aucun mot de l'écran ne laisse attendre un paiement.

## Hors module

- **Monétiser.** R-004 et Non-goal 4 : aucune commission, aucun paiement, tant que les écoles sont référencées
  et non marchandes.
- **Héberger des cours.** Cela demanderait une production éditoriale et des droits ; ce n'est pas un surplus de
  M5, c'est un autre projet (à écrire dans `docs/icebox.md`, T-006).
