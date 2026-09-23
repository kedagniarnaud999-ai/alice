# Backlog — AliTché

> Gate 3. Tableau de référence. ClickUp en est le miroir d'exécution ; en cas de divergence, on régénère ClickUp depuis ce fichier, jamais l'inverse.
> **État : proposé, non approuvé.** Le gate 0 attend encore ses quatre arbitrages (`docs/00-charter.md` §« Points à trancher ») et son contrat
> n'est pas signé. Ce document décrit le travail à venir, il ne l'autorise pas.
> Base mesurée : tronc `eebebc8` (2026-09-22). Aucune capacité de sprint n'est encore retenue : une seule personne travaille sur ce dépôt, la
> capacité se choisit à l'approbation, pas ici. Réserve dette à retenir quand même : **20 %**, et la dette n'est pas optionnelle (§B plus bas).

## Légende

- **Objectif** : `OBJ-n` du charter. Une tâche sans objectif est refusée.
- **Surface** : front · back · admin · notification · autre
- **Crit.** : Must · Should · Could · Won't
- **Est.** : Fibonacci (1 2 3 5 8). Au-delà de 8, la tâche est mal découpée.
- **WSJF** : (valeur + risque de retard + savoir-faire) / taille, **à remplir à l'approbation** — le donner maintenant reviendrait à chiffrer
  une valeur qu'aucun utilisateur hors équipe n'a encore mesurée (charter, risque principal).
- **Preuve** : une ligne de `§B` ou une sortie de commande. Une tâche ne passe `validé` que sur preuve, jamais sur « le code est écrit ».

## Épics — ce que le produit saura démontrer

La découpe est une **capacité démontrable**, pas une couche technique. Une couche (front, back, design) est portée par une étiquette de surface,
jamais par un épic.

| Épic | Capacité démontrable |État| ClickUp |
|---|---|---|---|
| E1 · Cadrage & socle | Le projet a un contrat, une architecture, des décisions écrites et un plan de test | ouvert | `1200430000031551` |
| E2 · Design & états | Chaque écran se comporte quand il est vide, quand il charge, et quand il échoue | ouvert | `1200430000038629` |
| E3 · Compte & parcours de l'utilisateur | Un candidat sans compte obtient une direction, la retrouve après inscription, et la fait voir à quelqu'un | ouvert | `1200430000038631` |
| E4 · Moteur de parcours & donnée | Le profil, le métier et le parcours produits sont justes, et la donnée les tient | ouvert | `1200430000038632` |
| E5 · Fiabilité & mise en ligne | Le tronc est vérifiable par machine, et ce qui est publié ne ment pas | ouvert | `1200430000038636` |
| QA · bugs & tests | Les défauts sont rejoués, les cinq parcours sont tenus, les seuils de gate sont écrits | ouvert | `1200430000038641` |

## A. Déjà bouclé dans le scope — traçabilité d'import

Ce lot n'est **pas** du travail restant : c'est ce que le dépôt fait déjà et qu'on ne va pas re-développer. Il est là pour qu'on sache où est la
ligne. Colonne « Preuve » = ce qui a été exécuté ou lu pour l'affirmer, avec la date.

| ID | Tâche | Obj. | Surf. | Crit. | Est. | Preuve (2026-09-22) | Statut |
|---|---|---|---|---|---|---|---|
| T-101 | Questionnaire : 31 questions, barème tenu dans les données | OBJ-1 | front | Must | 8 | 31 `id: 'q_*'` dans `src/data/questions.ts`, `ASSESSMENT_VERSION = 5`, poids domaine par domaine `questions.ts:64-89` | validé |
| T-102 | Scoring 70/30 fonctionnel-psychologique avec plafond déclaratif | OBJ-1 | back | Must | 8 | `FUNCTIONAL_SHARE = 0,7` et `PSYCH_SHARE = 0,3` (`testAnalyzer.ts:9-10`), `MAX_DECLARATIVE_SHARE_PER_DOMAIN = 0,2` tenu par `pathway.check` | validé |
| T-103 | Croisement métier retenu : 0,6 · moyenne des cœurs + 0,25 · fonction + 0,15 · secteur + 4 | OBJ-1 | back | Must | 5 | formule lue dans `pathwayEngine.ts`, reproduite par le rapport de `pathway.check` sur quatre profils types | validé |
| T-104 | Quatre situations de départ, 29 à 30 questions selon le chemin | OBJ-1 | back | Should | 3 | sortie de `npm run verify` : `bachelier 30/30`, `jeune_diplome 29/29`, `reconversion 30/30`, `professionnel 29/29` | validé |
| T-105 | Parcours taillé : 5 modules par piste, du gratuit au payant, difficulté croissante | OBJ-1 | back | Must | 5 | `TRACK_MODULE_COUNT = 5`, `MIN/MAX_MODULES_PER_TRACK` et l'ordre `isFree` (`pathway.check.ts:40-41, 89-106`) | validé |
| T-106 | Capacité mobilisable : temps et matériel font reculer une fiche | OBJ-1 | back | Must | 3 | pondérations lues (`time_none` +2, `time_low` +1, sans ordinateur et sans connexion +1, plafond 2), bandes 50/30/25 et `GAP_THRESHOLD 45` | validé |
| T-107 | Garde-fous de catalogue : ≥4 fiches métier par domaine, 2 à 4 axes, ni diplôme ni école ni URL dans un axe | OBJ-4 | back | Must | 5 | `MIN_FICHES_PER_DOMAIN = 4`, `MIN/MAX_SPECIALIZATIONS_PER_DOMAIN`, `SPECIALIZATION_FORBIDDEN_TERMS` (`pathway.check.ts:47, 55-60, 775`) | validé |
| T-108 | Cycle de vie des données fermé par le schéma : tout meurt avec le compte | OBJ-2 | back | Must | 3 | `user_id uuid … references auth.users(id) on delete cascade` sur les trois tables (`supabase/001_initial_schema.sql`, `002_module_progress.sql`) | validé |
| T-109 | Reprise du test interrompu, avec son écran et ses deux issues | OBJ-1 | front | Should | 3 | `TestFlow.tsx:36-41` relit, `119-121` rejoue, `132-144` rend « Reprendre votre test ? » — **jamais vu rendu** | en test |
| T-110 | Engagement pris avant le compte survit au compte | OBJ-1 | front | Must | 5 | chaîne `App.tsx:156-163` → `/register?from=trial` → premier `saveProfile` → `App.tsx:349-368` qui consomme `targeting` — **jamais vu rendu** | en test |
| T-111 | Profil d'un barème antérieur refusé, pas affiché de travers | OBJ-1 | front | Should | 2 | `normalizeProfileResult`, `asTargeting` + `validateFocus` relisent et jettent les clés mortes | en test |
| T-112 | Trois voies de sortie du résultat hors de l'application | OBJ-3 | front | Must | 3 | `ExportMenu.tsx:11-32` (`Blob text/plain`), `34-83` (`window.print`), `88-106` (`navigator.share` + repli presse-papiers) | en test |
| T-113 | Chaque débouché annoncé par un domaine est porté par une fiche réelle | OBJ-1 | back | Must | 5 | commit `eebebc8` (2026-09-22), 45 fiches ; assertions `MIN_FICHES_PER_DOMAIN = 4` par domaine et `domainOccupations` passées au vert sur `eebebc8` | validé |

**Ce que ce tableau ne dit pas.** Treize lignes d'import : neuf portent `validé`, quatre portent `en test`. La
différence est la preuve *vue* (sortie de commande, fichier lu qui produit un effet observable) contre la preuve
*lue* (le code est là, branché, et personne n'a vu les pixels). Le charter, lui, est catégorique : « Ne pas
déclarer une interface fonctionnelle sans l'avoir vue rendue. » Quatre tâches du socle — la reprise du test,
l'engagement repris à l'inscription, le refus d'un barème périmé, les trois voies d'export — attendent donc
encore leur première capture d'écran. C'est le travail de T-204, pas un détail.

## B. Ce qui reste à faire

### E1 · Cadrage & socle — bloque la sortie du gate 1

| ID | Tâche | Obj. | Surf. | Crit. | Est. | Chemins autorisés | Statut |
|---|---|---|---|---|---|---|---|
| T-001 | Signer le charter : trancher ses quatre points ouverts, puis le suivre par git | OBJ-1 | autre | Must | 2 | `docs/00-charter.md` | à faire — **attend votre arbitrage** |
| T-002 | Écrire l'architecture : frontières, Supabase appelé par le navigateur, `backend/` mort, ordre de déploiement | OBJ-4 | autre | Must | 5 | `docs/01-architecture.md` | à faire |
| T-003 | Trois ADR, dont celle de la fonction de score — aujourd'hui aucune décision technique n'est écrite nulle part | OBJ-1 | autre | Must | 3 | `docs/adr/` | à faire |
| T-004 | Plan de test et seuils de gate : ce qui doit passer, à quelle sévérité, et la règle « rouge seulement sur régression de structure, jamais sur un trou de contenu » | OBJ-4 | autre | Must | 5 | `docs/test-plan.md` | à faire |
| T-005 | Registre des risques | OBJ-2 | autre | Should | 2 | `docs/risks.md` | à faire |
| T-006 | ICEBOX : copier les hors-scope datés du charter et de `PRD.md` §10, pour qu'un « non » reste opposable | OBJ-4 | autre | Should | 1 | `docs/icebox.md` | à faire |
| T-007 | Contrat de travail du dépôt (`AGENTS.md`) : une tâche à la fois, WIP = 1, rien hors scope approuvée | OBJ-4 | autre | Must | 1 | `AGENTS.md` | à faire |

### E5 · Fiabilité — bloque OBJ-4, donc bloque tout le reste

| ID | Tâche | Obj. | Surf. | Crit. | Est. | Chemins autorisés | Statut |
|---|---|---|---|---|---|---|---|
| T-021 | Couper la chaîne `&&` des contrôles : un échec de `pathway.check` ne doit plus éteindre `signal.check`, qui est la seule mesure du plafond déclaratif | OBJ-4 | back | Must | 2 | `package.json`, `src/checks/` | à faire — `verify` est vert sur `eebebc8`, seul ce trou de mécanique reste |
| T-022 | Configuration ESLint sur `master` : fusionner la PR #12 ou écrire une configuration minimale | OBJ-4 | autre | Must | 2 | `.eslintrc.cjs`, `package.json` | bloqué — la PR #12 attend votre accord de fusion |
| T-023 | CI : `lint`, `tsc --noEmit` et `verify` exécutés à chaque push — `vercel-build` ne lance aujourd'hui que `tsc && vite build` | OBJ-4 | autre | Must | 3 | `.github/workflows/` (inexistant) | à faire |
| T-016 | Instrumenter les 5 événements clés : inscription, test terminé, résultats vus, parcours ouvert, export | OBJ-2 | front | Must | 5 | `src/App.tsx`, `src/services/`, `src/utils/` | à faire — OBJ-2 est à zéro |
| T-018 | Démontrer la RLS sur les trois tables : deux comptes qui ne se voient pas, **et** `getMyProgress` qui filtre côté client | OBJ-3 | back | Must | 5 | `src/services/module.api.ts:64-65`, `supabase/` | à faire |
| T-024 | Migrer les profils d'un barème antérieur au lieu de les refuser (`assessmentVersion`) | OBJ-1 | back | Should | 5 | `src/utils/profileResult.ts`, `src/data/questions.ts` | à faire — §11.7 du PRD |
| T-025 | Politique de conservation écrite : le produit peut toucher des mineurs | OBJ-2 | autre | Must | 3 | `docs/` | à faire — gate 1 |
| T-017 | Rendre la panne visible : bandeau quand `localStorage` ou Supabase refuse, pas de `console.warn` muet | OBJ-1 | front | Must | 3 | `src/utils/storageManager.ts`, `src/App.tsx:239, 253, 364, 413` | à faire |

### E4 · Moteur & donnée

| ID | Tâche | Obj. | Surf. | Crit. | Est. | Chemins autorisés | Statut |
|---|---|---|---|---|---|---|---|
| T-026 | Gate de classabilité : une fiche atteignable pour le profil qui la cible, sans toucher aux seuils pour passer au vert | OBJ-1 | back | Must | 5 | `src/data/occupations.ts`, `src/checks/pathway.check.ts` | à faire — diagnostic en §C |
| T-008 | Une seule source de vérité sur les métiers : `domains.ts` annonce des intitulés en texte libre que le moteur ne résout pas | OBJ-1 | back | Must | 5 | `src/data/domains.ts`, `src/utils/pathwayEngine.ts` | à faire — §11.12 du PRD |
| T-009 | Fiabiliser les opportunités : `verifiedAt` cesse d'être une date recopiée en bloc, le champ `verifie` devient vrai ou disparaît | OBJ-3 | back | Must | 8 | `src/data/opportunities.ts` | à faire — 165 lignes, 0 `source: 'verifie'` |
| T-011 | Contenu réel des modules, ou renonciation écrite : quatre étapes sont générées depuis le titre d'un module | OBJ-3 | front | Should | 8 | `src/components/pathway/PathwayView.tsx` | bloqué — arbitrage produit d'abord (§11.4 du PRD) |
| T-012 | Supprimer ou servir : la table `test_responses` est d'écriture seule, et la clé `alice_test_responses` n'est jamais référencée | OBJ-4 | back | Should | 3 | `supabase/001_initial_schema.sql`, `src/utils/storageManager.ts:8` | à faire |

### E3 · Compte & parcours

| ID | Tâche | Obj. | Surf. | Crit. | Est. | Chemins autorisés | Statut |
|---|---|---|---|---|---|---|---|
| T-013 | URL par écran : `/app` est une seule route pour neuf écrans pilotés par un `useState` | OBJ-1 | front | Must | 8 | `src/App.tsx` | à faire |
| T-027 | Reprise du parcours entre étapes, une fois l'URL posée (T-013) | OBJ-1 | front | Must | 5 | `src/App.tsx`, `src/utils/storageManager.ts` | à faire — dépend de T-013 |
| T-010 | Export qui transporte le profil : le lien partagé rouvre un profil, pas l'accueil | OBJ-1 | front | Should | 8 | `src/components/results/ExportMenu.tsx` | à faire — §11.3 du PRD |
| T-014 | Progression d'un appareil à l'autre, sans double vérité local/remote | OBJ-1 | back | Should | 5 | `src/services/module.api.ts`, `src/App.tsx:196-268` | à faire |
| T-015 | Chemin d'e-mail réellement parcouru : vérification, reset qui meurt en minutes, seconde demande qui tue la première | OBJ-1 | back | Must | 3 | `src/pages/`, `src/services/auth.api.ts` | à faire — dépend d'une adresse valide |

### E2 · Design & états

| ID | Tâche | Obj. | Surf. | Crit. | Est. | Chemins autorisés | Statut |
|---|---|---|---|---|---|---|---|
| T-020 | États de chaque écran (§8 du PRD) vus rendus : vide, chargement, erreur | OBJ-1 | design | Must | 5 | `src/components/` | à faire |
| T-019 | Espace public fiable : quatre boutons sans gestionnaire et une image hébergée hors dépôt | OBJ-3 | front | Should | 3 | `src/components/home/HomePage.tsx:49-60, 290-313` | à faire — §11.5 du PRD |

## C. QA — bugs et tests (liste dédiée, miroir `1200430000038641`)

| ID | Tâche | Obj. | Surf. | Crit. | Est. | Statut |
|---|---|---|---|---|---|---|
| BUG-01 | `npm run verify` rouge : `educateur_sante_communaute` au 7ᵉ rang pour un profil qui la cible | OBJ-4 | back | Must | 3 | **clos sans reproduire** — re-mesuré vert sur `eebebc8` le 2026-09-22 |
| BUG-02 | La carte « Mon profil » du tableau de bord est libellée « Voir mes résultats détaillés » et ouvre la page compte | OBJ-3 | front | Could | 1 | à trier |
| BUG-03 | `/verify-email` est un écran statique « Lien traité » que le flux réel n'emprunte jamais | OBJ-1 | front | Should | 2 | à trier |
| T-204 | Les 5 parcours de test d'OBJ-1, rejoués à la main et vus rendus, avec captures | OBJ-1 | front | Must | 8 | à faire — condition d'OBJ-1 (2026-10-15) |
| T-205 | Rejouer `verify`, `lint`, `tsc` sur le tronc **à la fin de chaque tâche mergée**, et écrire la sortie | OBJ-4 | autre | Must | 2 | à faire |

**Ce que BUG-01 a réellement coûté et ce qui reste ouvert.** Constaté le 2026-09-22 sur `b853047` :
`1 contrôle(s) en échec : educateur_sante_communaute : rang 7 … fiche inatteignable`, donc `signal.check`
**n'avait pas tourné** de la journée (chaîne `&&`). Re-mesuré le même jour sur `eebebc8` : les deux contrôles
passent, sortie 0, et `signal.check` imprime enfin sa mesure (déclaratif cumulé 15 %, domaine le plus exposé
`tourisme` à 17 %, sous le plafond de 20 %). La fermeture n'est pas un abandon : le tronc porte déjà le
correctif, qui a réattribué les champs de la fiche — l'éducation redevient un *terrain* d'application, plus un
*cœur* exigé du candidat — **sans abaisser aucun seuil**. Règle de fond à garder : ne pas obtenir un vert en
touchant le seuil.

Deux points mécaniques survivent à cette fermeture, et ce sont T-021 et T-004 : couper la chaîne `&&` pour que
l'échec d'un contrôle n'éteigne pas l'autre, et écrire la contrainte d'extension du catalogue avant la
prochaine fiche ajoutée.

**Quatre fiches tiennent à 0–1 point de la 4ᵉ place** (`gestionnaire_etablissement_sante`, `charge_protection_enfance`, `kinesitherapeute`,
`magasinier_preparateur`) : toute nouvelle fiche sur une paire déjà peuplée cassera chez une voisine. Les paires libres sont connues. Ce n'est
pas un obstacle, c'est la contrainte d'extension du catalogue — à écrire dans `docs/test-plan.md` (T-004).

## D. Refusé — ne fera pas partie de ce projet

| ID | Demande | Motif du refus | Date | Peut devenir acceptable si |
|---|---|---|---|---|
| R-001 | Espace institutionnel (université, entreprise, consultant, parent) | charter non-goal 3 | 2026-09-21 | le parcours individuel a prouvé sa valeur sur 10 personnes hors équipe |
| R-002 | Relancer `backend/` (Express, Prisma, JWT) | charter non-goal 1 : aucun écran ne l'appelle | 2026-09-21 | une fonctionnalité exige un secret serveur — alors c'est un nouveau projet |
| R-003 | Mise en relation employeurs-candidats, dépôt de candidature, messagerie | charter non-goal 2 | 2026-09-21 | hors v1 et v2, par nature |
| R-004 | Paiement, commission, marketplace | charter non-goal 4 | 2026-09-21 | jamais, tant que les écoles sont référencées et non marchandes |
| R-005 | Contenus générés par modèle d'IA | charter non-goal 5 : une recommandation doit assumer une source | 2026-09-21 | une source nominale et vérifiable existe pour chaque affirmation |
| R-006 | Retirer les badges « Premium » sans paiement | **refusé comme tâche, pas comme question** : c'est une décision de T-011, pas un nettoyage | 2026-09-22 | — |

## E. Contrôles de cohérence

- [x] 100 % des tâches ont un objectif, une criticité et une estimation — vérifié ligne à ligne à l'écriture
- [ ] Aucune tâche orpheline : `gate-check.cjs --repo .` **exécuté le 2026-09-22** → gate courant 1 (Validation), verdict **NO-GO**, quatre bloquants : `docs/01-architecture.md`, `docs/risks.md`, `docs/test-plan.md` et les 3 ADR manquants. Ce sont exactement T-002, T-003, T-004 et T-005. Deux avertissements reçus : `docs/icebox.md` et `AGENTS.md` absents (T-006, T-007), et 14 tâches sans chemins — les treize lignes d'import du §A, qui sont un relevé et non un travail à faire
- [ ] Lot tenu dans la capacité : la somme des `Must` est à confronter à une date, et cette date dépend de l'horizon OBJ-1 (2026-10-15) avec une seule personne disponible
- [ ] Chaque Could est passé Must avec justification, ou est à l'icebox — il reste BUG-02 en Could assumé
- [ ] Dépendances déclarées, sans cycle : T-027 dépend de T-013 ; BUG-01 est fermé, il ne bloque plus T-021
- [ ] ClickUp régénéré depuis ce tableau — **incomplet** : le quota MCP quotidien (100 appels) a coupé la poussée en route, état détaillé et reste à pousser en §G

## F. Ce que ce fichier attend de vous

Trois arbitrages, pas dix. Tout le reste est exécutable sans décision.

1. **Le charter signe-t-il en l'état**, à charge de corriger ses deux affirmations désormais fausses (`verify` vert ; « reprise d'un parcours
   interrompu » en v2 alors que le test la fait déjà) ? C'est T-001, et rien ne sort du gate 1 sans ça.
2. **PR #12** : on la fusionne pour retrouver un lint, ou on écrit une configuration minimale et on la ferme ? C'est T-022, et OBJ-4 est
   suspendu à cette réponse. Une PR ne se ferme pas sans votre accord.
3. **Les modules promettent-ils une leçon ?** T-011 est bloqué là, et c'est un choix de produit, pas de code : renommer l'écran, lier une
   ressource externe vérifiée, ou écrire le contenu.

## G. Miroir ClickUp — état réel après la poussée interrompue du 2026-09-22

Le quota MCP quotidien (100 appels) a été atteint en plein milieu. Ce qui suit est l'inventaire exact, pour que la reprise soit mécanique et
non une reconstruction.

**Déjà en place** (espace iNOVA LAB `1200430000025095`) :

| Liste | Poussé |
|---|---|
| E4 `…38632` | F-01 `123t3hvrbmm` · F-02 `123t3hvrbnu` · F-03 `123t3hvrbp6` · F-04 `123t3hvrbp8` · F-05 `123t3hvrbpb` · F-07 `123t3hvrbpc` · F-08 `123t3hvrbpd` · F-09 `123t3hvrbpu` |
| E3 `…38631` | F-06 `123t3hvrbve` · F-10 `123t3hvrbvf` · F-11 `123t3hvrbvh` · F-12 `123t3hvrbvt` · F-13 `123t3hvrbvu` · F-19 `123t3hvrbvx` |
| E2 `…38629` | F-17 `123t3hvrbx5` · F-20 `123t3hvrbxc` |
| E5 `…38636` | F-15 `123t3hvrbxd` · F-16 `123t3hvrbxe` |
| QA `…38641` | BUG-01 `123t3hvrbvz` |

**Reste à pousser**, dans cet ordre :

1. E5 : F-18 (nettoyage), T-022 (configuration ESLint, `bloqué` tant que la PR #12 attend), T-024 (migration `assessmentVersion`), T-025
   (politique de conservation).
2. QA : BUG-02, BUG-03, T-204 (les cinq parcours vus rendus), T-205 (les trois commandes à chaque fusion).
3. `Semaine — triage` `1200430000038573` : trois entrées pour la semaine qui commence, dans l'ordre du §F.
4. E1 : passer `123t3hvrbdw` (PRD) en `achevé` avec la preuve `docs/PRD.md`, 525 lignes, 12 sections, base `b853047` puis re-vérifiée sur
   `eebebc8`.
5. Corriger deux étiquettes : `123t3hvrbxe` (F-16) porte `obj-2` et doit porter `obj-3` ; et cinq noms d'E4 ont perdu leurs accents français à
   la création (F-01, F-02, F-04, F-05, F-07) — à ré-écrire, le dépôt a déjà eu une vague « restaurer les accents du français affiché ».
6. Fermer `123t3hvrbvz` (BUG-01) : statut fermé, étiquette `clos-sans-reproduire`, et la sortie verte de `eebebc8` en preuve. La tâche a été
   créée le matin sur un tronc rouge ; le tronc a été corrigé depuis, et un tracker qui garde un bug ouvert que plus personne ne reproduit
   raconte une fausse histoire.
7. Pousser les lignes du §A qui n'ont pas de jumelle sous un numéro F : T-108 (cycle de vie des données par le schéma), T-111 (refus d'un
   barème périmé), T-113 (débouchés portés par des fiches réelles). Les autres sont déjà couvertes par F-01 à F-09, et créer un doublon
   d'une tâche existante coûte plus cher à réparer qu'il n'apporte de traçabilité.

**Deux pièges vérifiés ce jour sur le connecteur** : `clickup_create_task` refuse un `workspace_id` explicite avec une erreur sans rapport
(« At least one field to update must be provided ») — l'omettre suffit ; et les outils d'étiquettes attendent `tag_name`, pas `tag`.
