# M4 · Catalogue (donnée)

**Statut : proposition non autorisée — gate 0 non signé.**

## Destination

Chaque métier affiché renvoie à une école qui existe, vérifiée **ligne à ligne**, avec son socle et ses
formations complémentaires.

M4 est le seul module dont une erreur ne se corrige pas en redéploiant : elle se corrige chez un candidat qui
se présente à un guichet où nous n'avions rien vérifié.

## Périmètre

| Chemin | Ce que c'est, mesuré le 2026-09-23 |
|---|---|
| `src/data/domains.ts` | 11 identifiants de domaine |
| `src/data/occupations.ts` | 45 fiches métier |
| `src/data/specializations.ts` | 38 axes |
| `src/data/modules.ts` | 655 lignes, catalogue de modules mobilisé par le moteur |
| `src/data/opportunities.ts` | **165 offres** (écoles, formations, bourses) en 2 110 lignes de fichier |
| `src/components/results/DomainDetail.tsx` | l'écran qui montre cette donnée |
| `src/checks/catalogue.report.ts` | 118 lignes, **zéro assertion**, aucun appelant (D-11, porté par M8) |

## Acquis

- **F-04 — la fiche domaine existe et tient.** `MIN_FICHES_PER_DOMAIN = 4` est une assertion de
  `pathway.check`, pas une intention : les 11 domaines passent (`eebebc8`, re-mesuré depuis).
- **La règle « démo » est une règle de données.** Une opportunité marquée `demo` n'a pas le droit de porter
  d'URL (`opportunities.ts:2102`, `DEMO_OPPORTUNITY_NOTICE`). 14 lignes sont dans ce cas, sur les 165 que compte le fichier
  (`151` `fourni`, `14` `demo`, **0 `verifie`**).
- **Trois vagues de donnée sont déjà dans le tronc** : les programmes du guide MESRS, le retrait de quatre
  établissements de démo doublonnés par du réel, la scission de `sante_social` en `sante` et `social`. À
  **prouver** ligne à ligne, pas à recommencer.
- **Mais la provenance d'une ligne ne se lit que dans un commentaire.** `MESRS` n'apparaît que deux fois dans
  `src/`, en prose (`opportunities.ts:1049`, `:1374`). Aucun champ machine ne dit d'où vient une ligne — ce qui
  rend la vérification ligne à ligne (F-05) aussi longue qu'elle est nécessaire, et invérifiable par une gate.

## À développer

### Le seul travail qui compte ici : vérifier

| Code | Travail | Critère d'acceptation | Dépend de |
|---|---|---|---|
| F-05 · T-009 | `verifiedAt` cesse d'être une date de lot | Sur les 151 lignes qui portent un `verifiedAt`, plus aucune paire ne porte la même date **sauf** si la vérification a réellement été conduite en une séance nommée ; `source: 'verifie'` apparaît au moins une fois par domaine, ou le champ disparaît du type. Aujourd'hui : **deux dates seulement** (2026-09-21 : 74 · 2026-09-22 : 77) et **zéro** ligne `verifie` | — |
| T-029 | Remplacer les liens d'agrégateur par l'adresse d'origine | **50 liens sur 151** portent `v1.gostudy.net` (mesuré ce jour) : un agrégateur tiers, et non l'école, pas vers l'école. Chacun devient l'URL officielle de l'établissement, ou la ligne sort du catalogue | F-05 |
| D-10 | Réaligner la promesse et le contrôle | `modules.ts:38-41` promet « au moins 6 modules par domaine, dont 4 gratuits et 2 gratuits de niveau `Debutant` ». Le contrôle exige 3 (`pathway.check.ts:40`, `:252`) et **ne regarde la gratuité que pour ordonner** (`:101-102`) et pour les trois victoires rapides (`:320`). Soit le seuil monte à 6 avec une assertion de gratuité par domaine, soit le commentaire se rabaisse au seuil réel. **Les deux tels quels est le seul état interdit** | — |
| T-028 | Rattacher les chances réelles aux métiers, pas au seul domaine | Un métier affiche les opportunités de **ses** études, non celles de son domaine parent ; un métier croisé ne reçoit plus une liste de tout le domaine | T-008 (M3) |
| T-031 | Composer socle + formations complémentaires par métier | Chaque fiche métier affiche un socle et 1 à 3 complémentaires, et la gate de composition passe par école du socle + complémentaires — jamais par un intitulé exact | T-028 |
| T-030 | Combler les libellés sans fiche | Tout libellé affiché se résout sur une fiche de `occupations.ts` ; le nombre de libellés non résolus tombe à 0 (15 lors du dernier audit — **à re-mesurer avant d'ouvrir la tâche**) | T-008 (M3) |
| T-032 | Consolidation canonique ROME + MESRS + annuaire | Un mapping écrit dans `docs/modules/m4-catalogue/` relie chaque fiche à son intitulé de référence, avec la source nommée | T-030 |
| T-033 | Compléter l'offre hors Bénin et le résidu MESRS | Les domaines sous le seuil de couverture remontent, ou le produit le dit à l'écran | T-032 |

`T-028` et suivants sont **proposés ici** : `docs/backlog.md` s'arrête à T-027 pour le travail à faire. La
table du charter porte « 4 tâches de catalogue non versées » ; une fois écrites au lieu d'être devinées, elles
sont six.

## Ce que M4 ne peut pas faire, même pressé

1. **Le catalogue GoStudy / PACE est la propriété d'un tiers.** Sa *structure* peut nous inspirer ; son
   *contenu* ne se copie pas et ne se scrape pas. Les CSV que nous a fournis le fondateur sont la voie
   légitime « liste fournie ». Vérifier qu'un lien répond (code de statut) est légitime ; en extraire le
   contenu ne l'est pas.
2. **Jamais d'école, de bourse, d'identifiant ou d'URL inventé.** Une ligne qu'on ne peut pas sourcer ne rentre
   pas. Le critère d'acceptation de F-05 n'est pas « le catalogue est plus grand » : il est « le catalogue est
   plus sûr ».
3. **L'absence d'une école dans notre catalogue ne dit rien du marché.** Avant d'écrire qu'une formation
   n'existe pas, on a fouillé les sources du dépôt **et** cherché en ligne. Notre ingestion n'est pas une
   description de l'offre.

## Preuve de fin

On ouvre trois domaines au hasard, on prend une fiche par domaine, on clique l'école proposée : la page répond,
c'est le site de l'établissement, et la date de `verifiedAt` correspond à une séance de contrôle nommée.

## Hors module

- **Élargir avant d'avoir vérifié.** Le critère d'arrêt du charter nomme exactement ce cas : une école fausse
  découverte par un utilisateur arrête l'élargissement tant que la vague T-009 n'est pas passée.
- **La marketplace.** R-004 : aucune commission, tant que les écoles sont référencées et non marchandes.
