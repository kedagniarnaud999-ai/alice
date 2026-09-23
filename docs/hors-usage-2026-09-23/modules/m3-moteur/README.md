# M3 · Moteur de recommandation

**Statut : proposition non autorisée — gate 0 non signé.**

## Destination

Deux profils opposés ne tombent pas sur le même premier domaine, et chaque fiche métier du catalogue reste
**atteignable** pour le profil qui la cible — avec une marge chiffrée, pas seulement un voyant vert.

## Périmètre

| Chemin | Rôle |
|---|---|
| `src/utils/testAnalyzer.ts` | fusion fonctionnel / psychologique |
| `src/utils/occupationMatcher.ts` | score d'une fiche, bandes d'accessibilité, classement |
| `src/utils/pathwayEngine.ts` | pistes de modules, ordre gratuit → payant, semaines |
| `src/utils/domainFocus.ts`, `src/utils/focusSelection.ts` | ciblage 1–3 débouchés + jusqu'à 2 axes |
| `src/data/psychAffinity.ts`, `src/data/specializations.ts` | affinités, 38 axes |
| `src/checks/pathway.check.ts` (1 153 l.), `src/checks/signal.check.ts` (165 l.) | les deux gates de structure |

## Acquis (mesuré le 2026-09-23)

- **F-02 — le partage est écrit et appliqué.** `FUNCTIONAL_SHARE = 0,7` / `PSYCH_SHARE = 0,3`
  (`testAnalyzer.ts:31-32`), fusion en `:370`. Deux réponses contraires ne donnent pas le même premier domaine :
  c'est ce que vérifie la gate, et c'est ce qui distingue ce moteur d'un questionnaire qui demande « quel
  domaine vous plaît ».
- **Le plafond déclaratif est une mesure, pas un garde-fou.** `MAX_DECLARATIVE_SHARE_PER_DOMAIN = 0,2` et
  `MAX_DECLARATIVE_SHARE_TOTAL = 0,18` vivent dans `signal.check.ts:24-25` et se vérifient en `:98`. **Ils
  n'existent pas dans le code applicatif** : rien n'empêche une question future de portées déclaratives de faire
  dériver le signal ailleurs que devant une machine. À écrire dans l'ADR du score (T-003, M0), pas à corriger
  ici.
- **F-09 — la capacité mobilisée fait reculer une fiche.** Temps et matériel pondèrent (`time_none` +2,
  `time_low` +1, sans ordinateur et sans connexion +1, plafond 2), les bandes 50/30/25 et `GAP_THRESHOLD 45`
  départagent (T-106, validé).
- **Le score d'une fiche est une formule, pas une vote.**
  `CORE_SHARE × moyenne des cœurs + FUNCTION_SHARE × fonction + SECTOR_SHARE × secteur + 4`
  (`occupationMatcher.ts:14`, `:136`), départage par `functionFit` puis `localeCompare(id)` (`:165`).
- **La gate d'atteignabilité existe.** `pathway.check.ts:1068` : une fiche cible doit finir
  `position >= 0 && position <= 3`, sinon « fiche inatteignable ». BUG-01 s'est fermé sur ce contrôle.

## À développer

| Code | Travail | Critère d'acceptation | Dépend de |
|---|---|---|---|
| T-021 | Couper la chaîne `&&` de `npm run verify` | Un échec de `pathway.check` n'éteint plus `signal.check` : les deux sorties apparaissent, même quand la première rougit. Aujourd'hui `package.json` enchaîne deux `vite build --ssr` puis deux `node` avec `&&`, donc **la seule mesure du plafond déclaratif est muette dès que l'autre tombe** | — |
| T-008 | Une seule source de vérité sur les métiers | `domains.ts` ne contient plus d'intitulés en texte libre que le moteur ne résout pas : tout intitulé affiché se join sur un `id` de `occupations.ts` | — |
| (à créer) | Rendre le coussin lisible | `verify` affiche, pour chaque fiche, `score(fiche) − score(5ᵉ)` ; le charter engage un minimum de **2 points**. Un vert à 0,4 point de marge n'est pas un vert | T-021 |

## La règle qui protège cette gate

**On ne touche pas aux seuils pour passer une vague.** Un rouge se lit toujours en écart contre la baseline
chiffrée consignée avant la moindre modification, jamais en absolu. Et un rouge sur un **trou de contenu**
(une fiche qui n'atteint pas le top 4 parce que la donnée manque) relève de M4, pas d'un ajustement de pondération
ici. Confondre les deux, c'est obtenir un moteur vert qui recommande n'importe quoi.

## Preuve de fin

Deux profils opposés n'ont pas le même premier domaine, et le coussin minimal de 2 points est affiché par la gate
sur les 45 fiches — avec les deux contrôles qui rendent leur sortie séparément.

## Hors module

- **Un modèle d'IA qui recommanderait à la place.** Non-goal 5 : chaque affirmation du produit doit assumer une
  source nominale. Le score est une formule lisible ; c'est ce qui la rend défendable à un parent.
- **Retoucher un poids pour arranger un cas particulier.** Si une fiche est inatteignable, soit la donnée est
  fausse (M4), soit la formule est incomplète (alors T-003 écrit la décision, et on l'assume pour toutes les
  fiches).
