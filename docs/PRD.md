# AliTché — Documentation produit

> **Ce document est l'autorité produit.** Il décrit le logiciel tel qu'il est et tel qu'on s'engage à ce
> qu'il soit — pas l'ambition. La vision, la mission et les non-goals vivent dans
> [`00-charter.md`](./00-charter.md) ; les pôles d'expansion (universités, entreprises, consultants) dans
> [`PRD_Ali_Ce_Private.md`](./PRD_Ali_Ce_Private.md), qui reste un document de stratégie et ne décrit pas
> le produit livré.
>
> Version : 1.0 · Date : 2026-09-22 · Base vérifiée : `master` `b853047`
> Toutes les affirmations de ce document portent une référence `fichier:ligne` ou une commande exécutée.
> Une affirmation sans référence est une **intention** et est écrite comme telle (§6).

---

## 1. Le produit en dix lignes

AliTché est un site web francophone d'orientation professionnelle. Un candidat qui ne sait pas vers quoi
aller remplit un questionnaire de 31 questions, reçoit un classement de ses 11 domaines fonctionnels,
choisit un domaine puis un métier réel, et repart avec un parcours de formation taillé selon le temps et le
matériel dont il dispose réellement.

Le parcours est utilisable **sans compte** jusqu'au résultat (`/trial`), et le compte sert à retrouver son
profil sur un autre appareil et à suivre sa progression dans les modules.

Trois choses à savoir pour ne pas se tromper sur le produit :

- AliTché **recommande**, il ne forme pas. Le contenu des modules n'existe pas (§9, F-14).
- AliTché **n'a pas de backend applicatif**. Le navigateur parle directement à Supabase ; le dossier
  `backend/` est mort (§10, non-goal du charter).
- AliTché **n'a jamais été confronté à un utilisateur hors équipe** (§9). Tout ce qui suit décrit un
  produit que sa propre équipe a construit, pas un produit validé par le marché.

## 2. Utilisateurs et moment d'usage

| Qui | Moment | Appareil et réseau | Ce qui doit sortir de la séance |
|---|---|---|---|
| Étudiant ou jeune diplômé, au moment d'une inscription | Soir ou week-end, 20–40 min d'un trait | Android, écran 360–410 px, data mobile parfois 3G | Un domaine crédible et 2–3 métiers qu'il peut nommer à ses parents |
| Chercheur d'emploi sous pression de temps | Une séance courte, interrompue | Mobile, connexion partagée | La formation la plus courte qui change quelque chose |
| Professionnel en reconversion | Réfléchi, compare | Parfois ordinateur partagé au travail | Vérifier qu'un métier est réaliste avec son temps et son matériel |

Le conseiller, le parent et l'enseignant ne sont **pas** des utilisateurs : ils lisent ce que le jeune leur
montre, d'où l'export (§6, F-11). Ils n'ont pas de compte et n'en auront pas en v1.

Contrainte d'usage structurante : le questionnaire se remplit **en une séance**. Une reprise à J+1 n'existe
que dans le test lui-même (brouillon rechargé, `TestFlow.tsx:38-44`), pas entre les étapes du parcours — un
candidat qui a obtenu ses résultats et fermé l'onglet reprend à l'accueil. C'est la ligne 7 du charter (§10)
et la fonctionnalité F-13 (§6) qui la lèvera.

## 3. Parcours complet, écran par écran

Le routeur (`App.tsx:44-67`) expose 10 URL. `/app` est une **seule URL** pour neuf écrans : l'état interne
de `WorkspaceApp` (`home · welcome · test · loading · results · domain · focus · dashboard · pathway ·
profile`) ne se traduisit en aucune URL. Conséquence assumée et mesurée : **aucun écran du parcours connecté
n'est partageable ni rechargeable par lien**, et le bouton retour du navigateur sort de l'application au
lieu de remonter d'un écran.

### 3.1 Porte d'entrée

`src/main.tsx:13-15` remplace **tout le routeur** par `ConfigErrorScreen` si Supabase n'est pas configuré.
Le parcours invité `/trial`, qui n'a besoin d'aucun compte ni d'aucune base, est donc inaccessible tant que
les variables d'environnement ne sont pas là. Anomalie de conception, pas un bug d'exécution.

### 3.2 Les deux voies

| # | Écran | URL | Entrée | Sortie normale | Sortie d'échec |
|---|---|---|---|---|---|
| 1 | Accueil / vitrine | `/` | lien, saisie | « Commencer » → `/trial`, ou `/app` si connecté | — |
| 2 | Démarrage du test | — | `/trial` | « Démarrer » → questionnaire | retour `/` |
| 3 | Questionnaire | — | 31 questions, dont **3 seulement** à affichage conditionnel | résultat complet | brouillon repris (`TestFlow.tsx:139-140`) |
| 4 | Analyse | — | 900 ms (invité) / 1200 ms (connecté) en dur | profil | — |
| 5 | Résultats | — | classement des domaines, intersection retenue | ouvrir une fiche domaine, ou « démarrer le parcours » | pas de profil → accueil |
| 6 | Fiche domaine | — | métiers rattachés au domaine | « choisir ce domaine » → ciblage | retour résultats |
| 7 | Ciblage | — | 1–3 débouchés + jusqu'à 2 axes | « confirmer » → parcours taillé | `validateFocus` bloque le bouton |
| 8 | Compte | `/register` | e-mail + mot de passe | `/verify-email-sent` | erreurs Supabase francisées |
| 9 | Connexion | `/login` | identifiants | `/app` | 8 s d'attente max (§7) |
| 10 | Espace | `/app` | profil restauré | tableau de bord | repli local (§3.4) |
| 11 | Tableau de bord | — | état du parcours, progression modules | ouvrir le parcours, les réglages, réinitialiser | — |
| 12 | Parcours | — | 1–3 pistes de 5 modules + acquis rapides | cocher un module (persiste) | — |
| 13 | Réglages | — | profil, avatar, suppression des données | sauvegardé | — |
| 14 | Export | — | PDF (impression), fichier `.txt`, lien | quelque chose **hors de l'app** | lien partagé inutile (§9, F-11) |

### 3.3 Passages delicats du parcours invité

Le funnel invité (`/trial`) n'est pas une démo jetable : l'engagement pris à l'écran 7 **survit** à la
création du compte. `onConfirm` écrit `{...profileResult, targeting: draft}` en localStorage puis envoie sur
`/register?from=trial` (`App.tsx:156-163`) ; le premier `saveProfile` après l'inscription emporte ce
ciblage. Inversement, choisir un métier **dans les résultats** efface le ciblage précédent
(`App.tsx:311-320`) : c'est la dernière intention du candidat qui gagne, et c'est délibéré.

### 3.4 Règle de vérité des données

Quand on est connecté, **le profil distant fait foi** : `hydrateApp` appelle `getMyProfile`, écrase le local
et régénère le parcours si aucun n'est enregistré (`App.tsx:224-237`). Si la lecture échoue alors qu'un
profil local existe, le local est **poussé** vers Supabase (`App.tsx:241-251`) ; si ce push échoue, on reste
en local avec un `console.warn` et **rien n'est dit à l'utilisateur**. Un candidat peut donc croire
work synchronisé alors qu'il ne l'est que sur son téléphone.

Un profil dont l'`assessmentVersion` n'est pas la version 5 est **rejeté** à la normalisation
(`profileResult.ts`) et l'utilisateur voit « Votre profil enregistré date d'une version antérieure… ». Tout
changement de barème invalide donc la base existante — à traiter comme une contrainte de migration (§7),
pas comme un détail.

## 4. Règles métier

Ce sont les règles réellement exécutées, avec leurs constantes. Elles engagent le produit : une
recommandation incompréhensible pour un adulte non-initié est un défaut, pas une subtilité.

### 4.1 Du questionnaire au profil (`testAnalyzer.ts`)

- Score d'un domaine = **70 % de signaux fonctionnels + 30 % d'affinité psychologique**
  (`FUNCTIONAL_SHARE=0.7`, `PSYCH_SHARE=0.3`, lignes 9-10).
- Dans les signaux fonctionnels : **60 % déclaratif direct + 40 % déduit** des missions déclarées
  (`DIRECT_FUNCTION_SHARE=0.6`, `INFERRED_FUNCTION_SHARE=0.4`, lignes 63-64).
- Le barème est **explicite dans les données** : chaque option de question porte
  `domains: { ingenierie: 2, ict: 1, … }` (`questions.ts:64-89`). Un barème se relit donc comme un tableau,
  pas comme du code.
- Normalisation par **maximal théorique** : le dénominateur suppose toutes les questions répondues. Un
  candidat qui saute des branches voit donc ses domaines écrasés, et non remontés. **Limite connue, non
  corrigée.**
- Le « domaine de carrière » affiché est **déduit du classement** (`testAnalyzer.ts:261-283`), depuis le
  commit `f470f2f` (2026-09-22). Il n'est plus recopié d'une réponse texte.
- Capacité : `time_none` vaut **+2**, `time_low` **+1**, et l'absence simultanée d'ordinateur et de connexion
  **+1**, le tout **plafonné à 2** (`assessCapacity`, `testAnalyzer.ts:510-530`). `q_constraint` alimente par
  ailleurs la faisabilité (`buildFeasibility`).
- Composition réelle du questionnaire : 13 questions psychométriques, 10 centres d'intérêt, 3 contraintes,
  3 situation, 2 aptitudes ; 18 à choix unique, 13 à choix multiples ; 11 portent un `maxSelections`, 11 un
  `excludes`, **3 seulement** une condition d'affichage (`visibleIf`). Le candidat en parcourt donc au moins
  20, et jusqu'à 30 selon la voie.

### 4.2 Du profil aux métiers (`occupationMatcher.ts`)

- Adéquation à un métier = **somme pondérée de trois termes**, plus un bonus de situation éligible :
  `0,6 × moyenne des domaines centraux + 0,25 × ajustement fonctionnel + 0,15 × ajustement sectoriel + 4`
  (`occupationMatcher.ts:12-24`, `135`). Le premier terme seul est une **moyenne géométrique pondérée**
  (`weightedGeometricMean`, plancher 25) : c'est lui qui empêche un métier fort sur une compétence et nul sur
  les autres de remonter. Ce choix de fonction de score n'est documenté dans **aucun ADR** — il n'en existe
  pas.
- Un métier dont la situation du candidat n'est pas listée ne reçoit pas le bonus et se classe donc plus bas,
  sans que l'écran l'explique.
- Trois bandes présentées au candidat : « Dans votre portée » ≥ **50**, « Prochain pas » ≥ **30**, et un
  plancher de domaine central à **25** (`BAND_ACCESSIBLE`, `BAND_NEXT_STEP`, `CORE_FLOOR`).
- La bande **recule** selon la capacité déclarée : le même métier peut passer de « à portée » à « prochain
  pas » si le candidat déclare peu de temps (commit `2026-09-20`, « faire reculer les fiches métier selon le
  temps et le matériel mobilisables »).
- Une exclusion déclarée (`q_exclude`) est un **veto propagé**, pas un simple malus ; `matchOccupations`
  renvoie `{matches, excluded, capacityBlocked}`.

### 4.3 Du métier au parcours (`pathwayEngine.ts`, `focusSelection.ts`, `domainFocus.ts`)

- Une piste = **5 modules** (`TRACK_MODULE_COUNT=5`), une charge supposée de **5 h/semaine**
  (`WEEKLY_STUDY_HOURS=5`) : la durée annoncée est `5 × 5 = 25 h` nominales, arrondie en semaines.
- L'ordre d'une piste est contraint : **3 à 5 modules**, du **gratuit vers le payant**, et en
  **difficulté croissante** — c'est une assertion de `pathway.check.ts`, donc une régression casse le build
  de vérification.
- Le ciblage demandé au candidat est borné : **1 à 3 débouchés**, **jusqu'à 2 axes**
  (`MIN_TARGETED_OPENINGS`, `MAX_TARGETED_OPENINGS`, `MAX_TARGETED_SPECIALIZATIONS`). Hors bornes,
  `validateFocus` renvoie une phrase et le bouton « confirmer » est désactivé.
- « Construire sur mes domaines » = **renoncer au ciblage**, et efface aussi le ciblage gardé
  (`handleBuildOnDomains`, `App.tsx:323-326`).
- Les acquis rapides sont sélectionnés sur quatre critères conjonctifs : gratuit, débutant, domaine
  principal, catégorie Employabilité, **3 au maximum** (`selectQuickWins`).
- Les 3 jalons de long terme sont **codés en dur selon la situation déclarée**, pas calculés.
- Le pré-remplissage du ciblage propose **2 débouchés et 1 axe** déjà cochés (`focusFromResult`), pour que
  valider en un geste reste possible.

### 4.4 Garde-fous de catalogue (`signal.check.ts`, `pathway.check.ts`)

La donnée est tenue à la main, donc elle est **contrôlée par programme** :

- Une question purement déclarative ne peut porter que **20 % au plus** du score d'un domaine, et **18 % au
  plus** cumulés ; chaque domaine doit avoir un plafond non nul et son signal **démonstratif doit l'emporter
  sur le déclaratif** (`MAX_DECLARATIVE_SHARE_PER_DOMAIN=0.2`). « On ne peut pas s'auto-proclamer ingénieur. »
- Chaque domaine doit avoir **au moins 4 fiches métier** ; un axe de spécialisation doit ouvrir sur **≥2
  débouchés et ≥3 modules**, et sa note ne doit contenir ni « diplôme », « école », « licence », « master »,
  ni URL.
- `catalogue.report.ts` produit un rapport de volumétrie et d'orphelins — **sans assertion**, donc sans
  échec possible, et **branché à aucun script** : il ne tourne que si on y pense.

## 5. La donnée

Tout le contenu vient de sept fichiers TypeScript édités à la main dans `src/data/`. Aucune API de contenu,
aucune génération par modèle, aucun chargement distant (charter, non-goal 5).

| Fichier | Contenu | Volume au 2026-09-22 | Clé |
|---|---|---|---|
| `domains.ts` | 11 domaines fonctionnels : administration, commerce_marketing, finance, ingenierie, ict, tourisme, santé, social, education, agriculture, logistique. Chacun porte 5 « occupations » et 4 « studyPaths » **en texte libre** | 11 | `FUNCTIONAL_DOMAINS_BY_ID` |
| `questions.ts` | barème du questionnaire, 5 familles | **31 questions**, `ASSESSMENT_VERSION = 5` | `q_*` |
| `psychAffinity.ts` | traits psychologiques → clés d'affinité consommées par le scoring | 106 lignes | clé psychologique |
| `occupations.ts` | métiers croisés : contexte (> 60 caractères, contrôlé), 1–3 domaines centraux pondérés de 1 à 3, secteurs, fonctions, compétences, filières, situations compatibles, `escoUri` | **45** | `OCCUPATIONS_BY_ID` |
| `specializations.ts` | axes « jamais dérivés automatiquement », chacun relié à des métiers et des modules ; 3 ou 4 par domaine | **38** | `sp_*` |
| `modules.ts` | catalogue d'apprentissage : durée, difficulté, format, gratuité, domaines. **45 gratuits / 6 payants** ; 31 débutant, 18 intermédiaire, 2 avancé ; 6 à 11 modules par domaine, 2 transverses | **51** | `mod_*` |
| `opportunities.ts` | écoles, formations et bourses : **95 formations, 36 établissements, 34 bourses** ; 121 lignes « Bénin », 32 « multi-pays », 12 étrangères | **165** = **151 `fourni` + 14 `demo` + 0 `verifie`** | id opportunité |

**Ce que ces chiffres veulent dire.** Santé et social ont été **dissociés** le 2026-09-22 (`b853047`) : un
domaine qui mélangeait deux projets de vie différents est devenu deux domaines, donc tout le barème a dû
suivre — et c'est ce commit qui a rendu `pathway.check` rouge (§9.1).

**Deux sources de vérité sur les métiers.** `domains.ts` énumère des intitulés de métiers **en texte libre**,
tandis que `occupations.ts` porte les vraies fiches reliées au moteur. Les deux listes ne se recoupent par
aucune clé. Un domaine peut donc afficher un métier que le moteur est incapable d'apparier à une formation,
et rien ne le détecte. C'est la première dette de donnée du projet.

**Une garantie que le contrôle ne contrôle pas.** `pathway.check` exige qu'une opportunité non-`demo` porte un
`verifiedAt` : les 151 lignes « fourni » en ont un, **toujours daté du 21 ou du 22 septembre 2026** — la date de
l'import, pas la date d'une relecture. Le contrôle est donc satisfait par une recopie : il certifie la présence
d'un champ, pas la vérification. Le champ `source: 'verifie'` existe dans le type et arrive **en tête de
l'ordre d'affichage** (`SOURCE_ORDER`, `opportunities.ts:2033`) : **zéro enregistrement ne l'utilise**.

**Les liens ne sont pas tous les nôtres.** Sur les 151 URL du catalogue, **50 pointent vers un annuaire tiers**,
`https://v1.gostudy.net//ben/institution/…` (double slash dans le chemin, assumé par le commentaire
`opportunities.ts:24-27`). AliTché renvoie donc un tiers à un annuaire qu'il ne tient pas, sans le dire à
l'écran.

Enfin, `CrossOccupation.escoUri` est documenté comme un rattachement au répertoire européen ESCO
(`occupations.ts:13-14`) : **aucun des 45 métiers ne le remplit**. La promesse est dans le type, pas dans la
donnée.

Le badge « Démo » est une règle de données, pas une option d'affichage : une opportunité marquée `demo` **n'a
pas le droit de porter d'URL** (`opportunities.ts:2102`, `DEMO_OPPORTUNITY_NOTICE`).

## 6. Fonctionnalités livrables et critères d'acceptation

Une ligne = une tâche du backlog ClickUp. `État` : **livré** (dans le tronc), **partiel**, **à faire**.
`Preuve` renvoie au §9. Les fonctionnalités à faire portent un critère d'acceptation qui se vérifie sans
discussion.

| ID | Fonctionnalité | État | Épic | Critère d'acceptation |
|---|---|---|---|---|
| F-01 | Questionnaire : 31 questions, barème dans les données, reprise du brouillon | livré | E4 | `npm run verify` vert ; répondre 5 questions suffit à produire un profil |
| F-02 | Scoring 70/30 fonctionnel-psychologique avec plafond déclaratif | livré | E4 | `signal.check` vert ; deux réponses contraires ne donnent pas le même premier domaine |
| F-03 | Résultats : classement des domaines et intersection retenue | livré | E4 | le premier domaine d'un profil obtenu sans aucun bac scientifique n'est jamais « ingenierie » par défaut |
| F-04 | Fiche domaine avec ses métiers et ses filières | livré | E4 | ≥4 fiches métier affichées par domaine (assertion `pathway.check`) |
| F-05 | Croisement métier ↔ écoles, formations et bourses | partiel | E4 | chaque métier affiche ≥1 opportunité **relue ligne à ligne** ; `verifiedAt` doit cesser d'être une date recopiée en bloc |
| F-06 | Parcours invité sans compte, engagement repris à l'inscription | livré | E3 | un ciblage pris à `/trial` se retrouve dans le parcours après `/register?from=trial` |
| F-07 | Ciblage 1–3 débouchés + jusqu'à 2 axes, hors-bornes bloquant | livré | E4 | `validateFocus` renvoie une phrase lisible et le bouton reste désactivé |
| F-08 | Parcours taillé (domaine, métier ou axes) avec ordre gratuit→payant | livré | E4 | 5 modules par piste, semaines = durée réellement affichée |
| F-09 | Capacité déclarée : temps et matériel font reculer les métiers | livré | E4 | un profil « peu de temps, téléphone seul » obtient une bande inférieure à profil de compétences égal |
| F-10 | Compte : inscription, vérification, mot de passe oublié et réinitialisation | partiel | E3 | un vrai candidat reçoit l'e-mail et aboutit ; l'expiration du lien est annoncée (`c7b5784`) |
| F-11 | Export du résultat : PDF, `.txt`, partage | **partiel** | E3 | le lien partagé rouvre **le profil exporté** sur un autre appareil — pas l'accueil |
| F-12 | Tableau de bord et progression des modules | partiel | E3 | cocher un module sur l'appareil A se voit sur l'appareil B |
| F-13 | Reprise d'un parcours interrompu entre étapes | **à faire** | E3 | rouvrir l'app 3 jours après reprend à l'étape atteinte, avec l'URL de cette étape |
| F-14 | Contenu réel des modules | **à faire** | E4 | une page de module affiche une leçon et un exercice, pas 4 étapes générées du titre |
| F-15 | Instrumentation des 5 événements clés (OBJ-2) | **à faire** | E5 | les 5 événements visibles dans un tableau de bord, sur 7 jours réels |
| F-16 | RLS réellement démontrée sur les trois tables | **à faire** | E5 | `getMyProgress` filtre `user_id` côté client **et** deux comptes ne se voient pas |
| F-17 | Espace public fiable : liens de la vitrine et image d'accueil | **à faire** | E2 | aucun bouton sans action ; l'image d'accueil est servie par le dépôt |
| F-18 | Nettoyage du dépôt : `node_modules`, guides morts, README, `backend/` | **à faire** | E5 | `git ls-files` < 300 et le README décrit Supabase-direct, 31 questions, v5 |
| F-19 | Dire à l'utilisateur qu'une synchronisation a échoué | **à faire** | E3 | un enregistrement non parti affiche un bandeau, pas un `console.warn` |
| F-20 | Couvrir les états de chaque écran (§8) : vide, chargement, erreur | **à faire** | E2 | chaque écran de la table §8 est vu rendu dans ses trois états dans le navigateur |

## 7. Exigences non fonctionnelles

**Performance et rendu.** Application mono-page sans rendu serveur : le premier affichage dépend du
téléchargement du bouquet complet. Les écrans publics ne dépendent d'aucun serveur applicatif, ce qui est
l'intérêt du choix (un seul artifact à déployer) et son risque (§3.1) : si le client ne démarre pas, rien ne
s'affiche, pas même une page statique.

**Tolérance au réseau.** `SESSION_RESTORE_GRACE_MS = 8000` (`AuthContext.tsx:45`) : la restauration de
session est une `Promise.race` avec un délai de 8 secondes, au-delà de quoi l'utilisateur est traité comme
non connecté. Sans cette mesure, un Supabase lent figeait l'écran de chargement. Ce chiffre est un
arbitrage, pas une vérité : sur une connexion 3G interrompue, il éjecte du compte un candidat qui y était.

**Persistance et versionnage.** Le profil est stocké en `jsonb` dans `profiles.payload` sous une version de
barème (`assessmentVersion = 5`). `normalizeProfileResult` **rejette** toute version antérieure. Conséquence :
chaque refonte de barème rend la base silencieusement inutilisable, et aucun script de migration n'existe. La
règle à tenir est donc : **une évolution de barème s'accompagne d'un traducteur, jamais d'un simple
incrément de version.**

**Sécurité des données.** Trois tables verrouillées par RLS, politiques « own » uniquement : `profiles`
(4 politiques, suppression ajoutée par `supabase/003_profiles_delete_own.sql`), `test_responses` (3),
`user_module_progress` (4). Chaîne d'identité unique — `user_id uuid … references auth.users(id) on delete
cascade` — donc supprimer le compte supprime les données. **Un trou concret subsiste** : `getMyProgress`
(`module.api.ts:64-65`) n'émet aucun filtre `.eq('user_id', …)` et repose entièrement sur la RLS. Un appel qui
*peut* renvoyer autrui se corrige, il ne se rassure pas.

**Secrets.** Aucune valeur secrète dans ce document, dans un commentaire de code, dans une description de
tâche ni dans le dépôt. `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` viennent de Vercel ; `.env.example`
ne porte que des noms. La clé `anon` est publique par conception et n'est admissible **que** parce que la RLS
tient : c'est pourquoi le point ci-dessus est une exigence de sécurité, pas un détail de style.

**Disponibilité.** Un projet Supabase gratuit, un hébergement Vercel : **pas de redondance**. Constaté le
2026-09-19 (PR #11) — l'hôte Supabase injoignable produisait « Failed to fetch » sur tous les écrans, y
compris publics. Aucun plan de repli n'est accepté à ce jour ; il existe seulement une bannière d'état de
service (`ServiceStatusBanner.tsx`) et un écran d'erreur de configuration.

**Qualité.** Aucun framework de test : `tests/` n'existe pas. `npm run verify` construit deux programmes de
vérification par `vite build --ssr` puis les exécute (`pathway.check.ts`, 1 153 lignes, une centaine
d'assertions ; `signal.check.ts`, 165 lignes). Ils couvrent le moteur et le catalogue, **ni l'interface ni
l'authentification**. Trois faiblesses de mécanique, toutes corrigibles en une tâche :

- `vercel-build` vaut `tsc && vite build` : **la vérification ne tourne jamais au déploiement**. Un `master`
  rouge se déploie en production sans que personne n'ait eu à le savoir ;
- les deux contrôles sont chaînés par `&&` : dès que `pathway.check` échoue, `signal.check` **ne s'exécute
  pas** — le plafond déclaratif, qui est la garantie d'intégrité du barème, cesse d'être testé au moment précis
  où le catalogue pose problème ;
- aucune intégration continue : pas de `.github/`, aucun fichier de workflow. Rien n'exécute ces contrôles si
  personne ne tape la commande, et le charter seul (ligne « Qualité ») l'exige à la main.

Voir §9 : mesuré deux fois le 2026-09-22, `verify` était rouge sur `b853047` et vert sur `eebebc8` ; ce qui
tient OBJ-4 en échec aujourd'hui, c'est le lint sans configuration.

**Accessibilité.** Non auditée. Deux points connus à traiter : le plein écran de chargement en `z-50`, qui a
déjà rendu le site public inutilisable (`App.tsx:69-70`), et les quatre onglets de la vitrine rendus comme de
faux boutons (§9).

**Conformité.** Le produit peut accueillir des mineurs et collecte e-mail, situation personnelle et réponses
psychométriques. La suppression effective et la RLS sont les seuls garde-fous existants ; aucune politique de
conservation n'est écrite. À traiter comme un point de gate 1, pas comme une annexe.

## 8. États par écran

Chaque écran doit avoir ses quatre états. La colonne « aujourd'hui » décrit ce que le code fait, et le
diagnostic se lit verticalement : les cases vides sont les trous.

| Écran | Vide | Chargement | Erreur | Succès |
|---|---|---|---|---|
| Accueil | — | aucune attente de session, délibéré (`App.tsx:69-70`) | aucun état : `ConfigErrorScreen` si env absent | vitrine et appels à l'action |
| Questionnaire | questions affichées selon les réponses | transitions de pas | non géré : une question sans option visible bloque le pas | brouillon écrit à chaque réponse |
| Analyse | — | écran dédié, 900/1200 ms en dur | **aucun** : `result` absent renvoie à l'accueil sans message | profil calculé |
| Résultats | `guestMode` si aucun compte | — | profil normalisé rejeté → texte « version antérieure » | classement et intersection |
| Fiche domaine | domaine sans métier rattaché : **non prévénue** | — | aucune branche | métiers et filières |
| Ciblage | zéro débouché sélectionné | — | `validateFocus` désactive le bouton avec une phrase | draft validé |
| Inscription | — | bouton neutralisé pendant l'appel | refus Supabase francisé (`authErrors.ts`) | `/verify-email-sent` |
| Connexion | — | écran plein, 8 s au plus | grâce expirée → retourné comme non connecté | `/app` |
| Espace | premier candidat, aucun profil local ni distant | `initializing` → écran plein | **silencieuse** : `console.warn`, l'utilisateur n'apprend rien | tableau de bord |
| Parcours | `appState==='pathway' && pathway` : sans parcours, l'écran est inatteignable | — | progression distante en échec → local seul, non dit | pistes et cases à cocher |
| Réglages | pas d'avatar | envoi en cours | bucket `avatars` absent → erreur brute, non traduite | profil à jour |
| Export | profil absent : rien à exporter | — | `navigator.share` indisponible → repli presse-papiers | fichier hors de l'application |

**La règle manquante tient en une phrase** : aucune erreur de synchronisation n'est jamais dite à
l'utilisateur. Quatre endroits du tronc font `console.warn` et poursuivent en local (`App.tsx:239`, `253`,
`364`, `413`). Un candidat qui croit avoir sauvegardé n'a rien sauvegardé. D'où F-19.

## 9. Ce qui marche contre ce qui est annoncé

La section à lire en entier avant de décider quoi que ce soit. Une tâche du backlog ne passe en `achevé` que
si sa preuve figure ici.

### 9.1 Commandes exécutées ce jour (2026-09-22)

Mesurées deux fois, parce que le tronc a bougé entre les deux : le dépôt est édité en parallèle.

| Commande | Sur `b853047` | Sur `eebebc8` (HEAD courant) | Ce que ça veut dire |
|---|---|---|---|
| `npx tsc --noEmit` | sortie 0 | non relancée | le typage tient |
| `npm run verify` | **ROUGE** — `educateur_sante_communaute : rang 7 pour un profil pourtant ciblé sur ses cœurs — fiche inatteignable` | **VERT** — `Tous les contrôles passent.` ×2, sortie 0 | le défaut était réel et il est déjà corrigé dans le tronc : la fiche a été réattribuée (l'éducation redevient un *terrain*, plus un *cœur*), sans toucher aux seuils |
| `signal.check` (via `verify`) | **jamais exécuté** — la chaîne `&&` s'arrête au premier échec | **exécuté et vert** | le plafond déclaratif tient réellement : 15 % cumulé, domaine le plus exposé `tourisme` à 17 %, sous le plafond de 20 % |
| `npm run lint` | **sortie 2** — `ESLint couldn't find a configuration file` | inchangé | aucune configuration ESLint sur `master` : le fichier vit dans la PR #12, non fusionnée |

**Conséquence sur le charter** : OBJ-4 (« lint, tsc et verify verts sur `master` à chaque tâche mergée ») n'est
violé qu'à **un** de ses trois volets, et c'est le moins cher à réparer — une configuration de lint à écrire ou
à fusionner. Le charter, rédigé le 2026-09-21 sur `50995f6`, annonçait `verify` vert : il l'était, il ne l'a
plus été le 22 à midi, et il l'est de nouveau le 22 au soir. Cette page n'a pas d'autre valeur que la date et
le hash qu'elle porte — c'est précisément pour ça qu'ils sont écrits.

### 9.2 Prouvé

- **Le moteur calcule et se laisse inspecter.** `pathway.check` rejoue quatre profils types et imprime leurs
  trois premières pistes avec durées. Il a attrapé un défaut réel le 2026-09-22 au matin — une fiche devenue
  inatteignable après la dissociation santé/social — et le correctif passé dans le tronc n'a touché à aucun
  seuil : la fiche a été réattribuée sur ce qu'elle exige vraiment. Un contrôle qui rougit sur un vrai défaut
  puis verdit sans qu'on l'affaiblisse, c'est la démonstration qu'il sert à quelque chose.
- **Le plafond déclaratif est mesuré, pas décrété.** `signal.check` passe et chiffre ce que le produit
  s'interdit : 15 % de déclaratif cumulé par profil, domaine le plus exposé à 17 %, sous le plafond de 20 %.
  « On ne peut pas s'auto-proclamer ingénieur » est une propriété vérifiée par une commande, pas une phrase de
  présentation.
- **Le catalogue a une contrainte d'extension connue.** Le contrôle d'atteignabilité impose qu'une fiche reste
  dans le top 4 des fiches recommandées à un profil construit pour ses propres cœurs. Quatre fiches tiennent à
  0–1 point de la 4ᵉ place : ajouter une fiche sur une paire de cœurs déjà peuplée casse chez une voisine.
  Ce n'est pas un défaut, c'est la règle du jeu — elle doit être écrite dans `docs/test-plan.md`.
- **Le barème est un document relisible.** Les poids domaine par domaine sont dans `questions.ts:64-89`, pas
  dans du code : un non-développeur peut les contester ligne par ligne.
- **Les données engagent ce qu'elles disent.** Une opportunité `demo` n'a pas le droit de porter d'URL et le
  candidat voit « Démo » (`opportunities.ts:2102`) ; les axes de spécialisation ne peuvent pas mentionner un
  diplôme ni une école (interdits vérifiés par `pathway.check`). Le produit se refuse des promesses qu'il ne
  peut pas tenir — c'est une décision d'architecture, pas un texte de communication.
- **Le cycle de vie des données personnelles est fermé par construction.** Tout repose sur
  `user_id … references auth.users(id) on delete cascade` et trois fichiers SQL lus (`supabase/001`–`003`).
- **L'export produit un objet hors de l'application.** `handleDownloadText` fabrique un `Blob text/plain` et
  déclenche le téléchargement de `profil-alitche-<horodatage>.txt` ; `Imprimer` appelle `window.print()` ;
  `Partager` utilise `navigator.share` avec repli presse-papiers (`ExportMenu.tsx:11-32`, `34-83`,
  `88-106`). Ces trois voies sont écrites et branchées. *(Écrites et branchées : vues dans le code, pas
  encore vues rendues — voir 9.4.)*
- **Le ciblage pris avant le compte survit au compte.** Chaîne complète `App.tsx:156-163` →
  `register?from=trial` → premier `saveProfile` → `App.tsx:349-368` qui consomme `targeting`. C'est la
  fonctionnalité qui distingue AliTché d'un questionnaire jetable, et elle est câblée de bout en bout.
- **Un profil d'une version de barème antérieure est refusé**, pas affiché de travers
  (`profileResult.normalizeProfileResult`), et le ciblage stocké est re-validé : les clés mortes sont jetées
  (`asTargeting` + `validateFocus`).

### 9.3 Annoncé, ou présent sans être atteignable

Ce qui suit **compile et n'est pas forcément faux**, mais ne doit en aucun cas compter comme acquis.

- **Aucun écran n'a été vu rendu** dans un navigateur au cours de cette vérification. Tout ce que ce document
  dit des parcours 3.2 vient du code, jamais d'un rendu observé. Un écran dont personne n'a vu les pixels est
  une hypothèse.
- **Quatre onglets de la vitrine ne font rien.** « Orientation », « Métiers », « Écoles », « Mentors » sont
  des `<button type="button">` **sans gestionnaire** (`HomePage.tsx:49-60`) ; il n'existe aucune route
  correspondante. Les icônes et liens du pied de page non plus (`FooterIcon:290-298`,
  `FooterLinks:300-313`). Un visiteur qui clique sur « Écoles » ne se passe rien : c'est la vitrine qui
  promet un produit plus grand que le produit.
- **L'image d'accueil est hébergée ailleurs** : `lh3.googleusercontent.com/aida-public/…`. Tant que le lien
  est vivant, rien ne se voit ; le jour où il meurt, l'accueil se casse de l'extérieur, sans lien avec le
  dépôt.
- **Les modules n'ont pas de contenu.** `ModuleDetailView` **génère quatre étapes génériques** à partir du
  titre et du format du module (`PathwayView.tsx`). AliTché annonce un parcours de 12 à 19 semaines de
  formation sans contenir une leçon. C'est cohérent avec un produit d'orientation, à condition que l'écran le
  dise ; aujourd'hui il le suggère sans le dire.
- **Des badges « Locked » / « Premium » sans paiement derrière.** Le paywall est visuel.
- **`loginWithGoogle` est exposé par le contexte d'authentification et consommé par aucune interface**
  (`auth.api.ts:92`, `AuthContext.tsx:18`, `90`, `114`) ; `sendMagicLink` n'est référencé nulle part
  (`auth.api.ts:176`). Le README, lui, annonce « Google OAuth » comme une fonctionnalité.
- **`test_responses` est une table d'écriture seule** : insérée (`TestFlow.tsx:69`), jamais relue, sauf à se
  supprimer elle-même. Les réponses du test ne servent donc **jamais** à rejouer un profil — un candidat
  reconnecté retrouve un `payload` de résultat, pas ce qu'il a répondu.
- **Écritures mortes** : sur les six clés de `STORAGE_KEYS` (`storageManager.ts:7-14`), deux ne servent à
  rien — `alice_user_profile` (`saveUserProfile`/`loadUserProfile` sans appelant) et `alice_test_responses`,
  déclarée ligne 8 et **jamais référencée** : les réponses ne passent que par Supabase. Vivants en
  revanche : `alice_test_progress`, `alice_profile_result`, `alice_pathway`, `alice_module_progress`.
  Autres écritures mortes : `services/api.client.ts`, `components/home/AliTcheLanding.tsx`,
  `components/ui/Animations.tsx` — aucun import hors eux-mêmes.
- **La reprise du test interrompu existe déjà, et le charter la croit future.** `TestFlow.tsx:36-41` relit la
  progression locale, `119-121` la rejoue dans l'état, `132-144` rend un écran « Reprendre votre test ? »
  avec ses deux issues. Le charter met « reprise d'un parcours interrompu » en **v2** : c'est donc déjà livré
  pour le test — pas pour le parcours ni pour le compte. Le périmètre est à corriger dans le charter, pas dans
  le code. *(Vue dans le code, jamais vue rendue.)*
- **La couche de stockage avale tout.** Les 16 méthodes de `storageManager` ont le même corps : `try`, puis
  `catch` qui fait un `console.error` et retourne `null` ou `[]` (lignes 32, 53, 62, 73, 85, 98, 112, 124,
  140, 149, 160, 171). Un quota dépassé, un `JSON.parse` corrompu ou un localStorage vidé par le navigateur
  se traduisent donc par « vous n'avez jamais passé le test », silencieusement, sans que l'écran le dise.
  C'est le chemin exact qui mène un candidat à refaire 30 questions par une panne d'écriture.
- **`catalogue.report.ts` ne bloque rien et ne tourne pas** : zéro assertion, zéro script `package.json` qui
  l'appelle.
- **Le commentaire du catalogue promet plus que le contrôle.** `modules.ts:38-41` écrit : « Chaque domaine
  fonctionnel doit y trouver au moins 6 modules, dont 4 gratuits et 2 gratuits de niveau `Debutant` ». Rien de
  tout ça n'est vérifié : `pathway.check` contrôle `count >= MIN_MODULES_PER_TRACK` avec
  `MIN_MODULES_PER_TRACK = 3` (`pathway.check.ts:40`, `252`) et **aucune** assertion de gratuité par domaine
  — `isFree` n'apparaît qu'à deux endroits, pour ordonner gratuit avant payant dans une piste (101-102) et
  pour exiger que les trois victoires rapides soient gratuites et débutantes (320-321). Un domaine peut donc
  descendre à 3 modules dont 0 gratuit sans que le tronc rougisse, pendant que le commentaire dit le
  contraire. Soit on relève le seuil du contrôle au niveau promis, soit on rabaisse la promesse : les deux
  ensemble est le seul état interdit.
- **`page /verify-email` est un écran statique** « Lien traité », hors du flux réellement emprunté (qui passe
  par `VerifyEmailSent` puis `Login`). Deux écrans pour un seul chemin, dont un que personne n'emprunte.
- **La carte « Mon profil » du tableau de bord** est libellée « Voir mes résultats détaillés » mais ouvre la
  page **compte** (`ProfileSettings`) : fonctionnel, trompeur.
- **Le README contredit le code** sur quatre points : JWT + Passport + Google OAuth, 23 questions et
  6 dimensions, un backend Express/Prisma/PostgreSQL actif, `api.client.ts` utilisé. Le tronc est en
  Supabase-direct, 31 questions à 11 domaines, version 5. Un recruté, un partenaire ou un outil d'IA qui lit
  le README se trompe de produit.

### 9.4 Non démontrable depuis le code

Trois questions que ce document ne tranche pas, et qu'une tâche du backlog devra trancher sur la production :
la RLS `user_module_progress` filtre-t-elle réellement les lignes d'autrui (le client n'émet pas le filtre) ;
le bucket `avatars` et les trois tables existent-ils dans le projet Supabase en ligne ; le parcours complet
aboutit-il de bout en bout avec une vraie adresse e-mail (inscription réelle obligatoire, GoTrue rate-limite).

## 10. Hors périmètre

Daté, parce qu'une scope sans date de décision est une scope qui se rouvre.

| Décision | Depuis | Source |
|---|---|---|
| Aucun espace institutionnel (université, entreprise, consultant, parent) avant que le parcours individuel ait prouvé sa valeur | 2026-08-06, confirmé le 2026-09-21 | `PRD_Ali_Ce_Private.md` §11.3 · charter non-goal 3 |
| AliTché ne relance pas son API interne : `backend/` ne reçoit aucune fonctionnalité nouvelle | 2026-09-21 | charter non-goal 1 |
| Pas de mise en relation employeurs-candidats, pas de dépôt de candidature, pas de messagerie | 2026-09-21 | charter non-goal 2 |
| Rien n'est vendu, aucune commission, aucune marketplace | 2026-09-21 | charter non-goal 4 |
| Aucun contenu généré par modèle d'IA : le catalogue est maintenu à la main | 2026-09-21 | charter non-goal 5 |
| AliTché ne remplace pas un conseiller et ne garantit aucune équivalence de diplôme | 2026-09-21 | charter non-goal 6 |
| Pas de `node_modules` versionné — la règle est écrite, le nettoyage est à faire | 2026-09-21 | charter non-goal 7 |

**Une nuance que la section « vision » du document de stratégie rend confuse** :
`PRD_Ali_Ce_Private.md` décrit cinq pôles d'expansion et une ambition géographique. Ces pôles ne sont pas en
scope, et aucun écran ne les prépare. Les lire comme une feuille de route produirait exactement la dérive que
le charter interdit.

## 11. Décisions ouvertes

À trancher avant la validation du gate 1. Chacune est soit une tâche, soit une renonciation écrite.

1. **Ce qui reste de l'épisode `verify` rouge.** Le défaut est corrigé dans le tronc (`eebebc8`) sans qu'un
   seuil ait été abaissé, et c'est la bonne issue. Deux décisions survivent : coupe-t-on la chaîne `&&` pour
   que `signal.check` tourne même quand `pathway.check` échoue — aujourd'hui, un échec du premier éteint la
   seule mesure du plafond déclaratif ? Et écrit-on la contrainte de classabilité (top 4 par paire de cœurs,
   quatre fiches à 0–1 point de la rupture) dans `docs/test-plan.md` avant d'ajouter une fiche ? *(E5 + QA)*
2. **Lint sans configuration sur `master`.** Fusionne-t-on la PR #12 pour rétablir le lint, ou écrit-on une
   configuration minimale indépendante de cette PR ? *(E5, bloque OBJ-4)*
3. **Un export qui ne transporte pas le profil.** Le lien partagé rouvre l'accueil, car le profil vit en
   localStorage. Un jeton de lecture dans l'URL est la seule solution qui ne demande pas de compte au
   destinataire. *(E3, F-11)*
4. **Le contenu des modules.** AliTché annonce-t-il une leçon qu'il n'a pas ? Trois issues : renommer
   l'écran en « ressources à chercher », lier un module vers une ressource externe vérifiée, ou écrire le
   contenu. *(E4, F-14 — arbitrage produit, pas technique)*
5. **La vitrine.** Quatre boutons morts et une image hébergée hors dépôt : répare-t-on la vitrine ou la
   réduit-on à ce qui existe ? *(E2, F-17)*
6. **Les 150 opportunités non vérifiées.** Une école dont l'adresse a bougé est une promesse tenue sur une
   donnée morte. Les affiche-t-on quand même, avec quel avertissement, et dans quel ordre les vérifie-t-on ?
   *(E4, F-05)*
7. **`assessmentVersion` et la base existante.** Toute nouvelle barème casse les profils enregistrés et
   aucun traducteur n'existe. Écrit-on la règle de migration maintenant, avant la première vraie
   utilisateur ? *(E5)*
8. **Le nettoyage.** 10 579 fichiers `node_modules` sur 10 722 suivis, 23 guides de déploiement à la racine
   pour un seul hébergement, un `backend/` mort. *(E5, F-18 — le charter demande l'arbitrage, pas le
   prétexte)*
9. **Les données personnelles d'éventuels mineurs.** Aucune politique de conservation écrite. *(E5, gate 1)*
10. **`Easy-apply`** n'existe pas comme dépôt alors que deux dépôts contiennent déjà un agent de candidature
    automatisé ; le charter le signale, le portefeuille ClickUp décrit une intention. *(portefeuille)*
11. **Promesse du catalogue contre seuil du contrôle.** `modules.ts:38-41` promet 6 modules par domaine dont
    4 gratuits ; `pathway.check` exige 3 et ne regarde la gratuité que pour ordonner une piste. Relève-t-on le
    contrôle au niveau de la promesse (et alors le tronc peut rougir sur un trou de contenu, ce qu'on refuse
    d'habitude), ou rabaisse-t-on la promesse au niveau contrôlé ? *(E4)*
12. **Deux sources de vérité sur les métiers.** `domains.ts` aligne des intitulés en texte libre à côté d'
    `occupations.ts`, sans clé partagée : un domaine peut annoncer un métier que le moteur ne sait pas
    résoudre. Supprime-t-on ces listes de l'écran, ou les fait-on résoudre par `domainOccupations` ? *(E4)*
13. **Une date de vérification qui ne vérifie rien + un annuaire tiers.** 151 opportunités portent un
    `verifiedAt` du 21 ou 22 septembre copié en masse, et 50 liens sur 151 pointent `v1.gostudy.net`.
    Réserve-t-on le champ au seul `source: 'verifie'` ? Et gostudy : source assumée et créditée, ou donnée à
    rapatrier chez nous ? *(E4, F-05)*
14. **Le stockage ne dit jamais qu'il a échoué.** Faut-il un bandeau visible quand `localStorage` refuse
    d'écrire, ou le silence est-il un choix assumé ? C'est la condition d'OBJ-1 : un candidat qui perd son
    test sans le savoir ne termine pas son parcours. *(E3, F-19)*
15. **Le charter est contredit par le code sur deux points.** Il annonce `verify` vert (rouge depuis
    `b853047`) et place « reprise d'un parcours interrompu » en v2 alors que le test l'a déjà
    (`TestFlow.tsx:132-144`). Corrige-t-on le charter, ou le périmètre annoncé est-il volontairement plus
    strict que le livré ? *(gate 0 — le charter reste l'autorité, donc c'est lui qui bouge)*

## 12. Journal

| Date | Changement | Pourquoi |
|---|---|---|
| 2026-08-06 | `PRD_Ali_Ce_Private.md` rédigé (20 sections de cadrage) | premier document produit ; décrit une ambition, pas un logiciel |
| 2026-09-21 | `docs/00-charter.md` rédigé en mode rétrospectif, non suivi par git | le dépôt existait sans contrat ; pose les objectifs mesurables et les sept non-goals |
| 2026-09-22 | **ce document** écrit à partir du tronc `b853047` | la demande : une vraie documentation produit, pas une reprise de la vision. Les 12 sections sont la norme de la méthode ; la §9 existe parce qu'un produit dont on ne sait pas ce qui marche ne peut pas dire ce qui reste à faire |
| 2026-09-22 | `verify` constaté rouge, `lint` constaté inexécutable | ces deux faits infirment le charter sur OBJ-4 ; ils sont écrits ici plutôt que corrigés là, parce que le charter est un document de contrat et ceci un document d'état |
| 2026-09-22 | **passage de vérification n°2** sur la donnée et le stockage | sept affirmations de ce document ont été corrigées après relecture ligne à ligne (nombre de questions conditionnelles, formule réelle du score métier, décompte des opportunités, garantie de modules par domaine, erreurs avalées par `storageManager`, clés mortes) ; trois découvertes nouvelles : la reprise du test existe déjà, `verifiedAt` est copié en masse, et le commentaire du catalogue promet plus que le contrôle. Une documentation produit écrite de mémoire est une documentation fausse |
| 2026-09-22 | **troisième mesure du même jour** : `verify` relancé après mouvement du tronc | le dépôt est édité en parallèle : pendant la rédaction, HEAD est passé de `b853047` à `eebebc8` et le contrôle annoncé rouge est devenu vert, `signal.check` exécuté pour la première fois de la journée. Les sections 7, 9.1 et 11 ont dû être corrigées le jour même. Une affirmation sans hash ne vaut rien, et une affirmation avec un hash peut quand même être périmée six heures plus tard |

**Ce que ce document ne remplace pas** : la vision, la mission et les objectifs mesurables restent dans
`00-charter.md`, qui devra être suivi par git après arbitrage de ses quatre points ouverts. **Ce que ce
document contredit** : `README.md`, §9.3. Tant que le README n'est pas réécrit, le dépôt offre deux descriptions
incompatibles du même logiciel, et la fausse est la première lue.
