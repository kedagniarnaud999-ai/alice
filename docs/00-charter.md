# Charter — AliTché

> Gate 0. Ce document est le contrat du projet. Il est relu et validé avant toute ligne de code.
> Date de rédaction : 2026-09-21 · Repris le : 2026-09-23 (deux passes, même jour) · Validé le : —
>
> **Brouillon soumis à validation — deuxième passe.** Le gate 0 est bloquant : rien n'est engagé — ni module,
> ni tâche, ni arborescence ClickUp — avant la signature. Les trois arbitrages demandés ont été rendus le
> 2026-09-23 et sont consignés en fin de document ; il ne reste que le « validé ».
>
> Base de ce document : tronc `672d56f`, dépôt `kedagniarnaud999-ai/alice`, production
> `https://ali-ce-i6it.vercel.app`. Toutes les affirmations du §« Où on est » ont été mesurées ou lues le
> 2026-09-23, et renvoient à un fichier, un numéro de commit ou une sortie de commande. Aucun accès Supabase,
> aucune clé n'est écrite ici.

---

## Vision

Un jeune d'Afrique francophone qui ne sait pas vers quoi aller repart avec une direction crédible, le chemin
concret pour l'atteindre, et quelque chose à montrer à la personne qui décide avec lui.

## Mission

AliTché fait passer une personne de « je ne sais pas quoi faire » à « voici le métier visé, les formations qui
y mènent et l'ordre dans lequel les suivre », puis lui permet d'exporter ce résultat.

## Utilisateurs

| Qui | Situation | Ce qu'il vient accomplir | Fréquence |
|---|---|---|---|
| Étudiant ou jeune diplômé | A un diplôme, pas de débouché identifié | Choisir un domaine, voir quels métiers mènent où, obtenir un parcours | Une à quelques fois, au moment d'une décision |
| Chercheur d'emploi | Sans emploi, pression de temps | Trouver la formation la plus courte qui change quelque chose | Périodes courtes et intenses |
| Professionnel en reconversion | En poste, veut changer | Vérifier qu'un nouveau métier est réaliste avec son temps et son matériel | Une ou deux fois |
| Conseiller, parent, enseignant | Accompagne plusieurs jeunes | **Hors périmètre v1** — lirait un parcours que le jeune lui montre | Occasionnel |

La dernière ligne est volontairement dans la table et hors périmètre : l'écran d'export existe pour ça,
le compte-conseiller n'existe pas et n'est pas prévu.

## Objectifs mesurables

Identifiants repris obligatoires par chaque tâche du backlog. Une tâche sans `OBJ-n` est refusée.

| ID | Objectif | Indicateur | Cible | Horizon | État 2026-09-23 |
|---|---|---|---|---|---|
| OBJ-1 | Le parcours complet tient sans blocage | Parcours complets terminés **vus rendus** dans un navigateur, sur 5 parcours de test rejoués à la main | 5 / 5 | 2026-10-15 | 0 / 5 — le code est là, les pixels n'ont jamais été vus |
| OBJ-2 | Le produit devient mesurable | Événements clés instrumentés : inscription, test terminé, résultats vus, parcours ouvert, export | 5 / 5 | 2026-10-31 | 0 / 5 — le dépôt ne contient aucun suivi d'événement |
| OBJ-3 | Un étranger à l'équipe l'utilise | Personnes hors équipe ayant terminé un parcours complet **sans qu'on les guide** | 10 | 2026-11-30 | 0 — jamais tenté |
| OBJ-4 | La dette cesse de croître | `tsc --noEmit` et `npm run verify` verts sur `master` à chaque fusion, **et** coussin de classabilité minimal ≥ 2 points | 100 % | permanent | tenu depuis `eebebc8` ; lint exclu jusqu'à T-022 (voir ci-dessous) |

Trois corrections apportées à la version du 2026-09-21 :

1. **OBJ-1 exige « vus rendus ».** La formule précédente (« terminés sans erreur bloquante ») se satisfaisait
   d'un build vert. Neuf des treize lignes d'import du backlog portent `validé`, quatre portent `en test` :
   la différence est exactement la preuve vue contre la preuve lue.
2. **OBJ-4 ne cite plus `npm run lint`.** Sur `master`, `npm run lint` est **inexécutable** : le script existe
   (`package.json:8`) et les paquets aussi, mais aucun fichier de configuration n'est suivi — vérifié le
   2026-09-23 (`ls` à la racine : aucune `.eslintrc.*`). La configuration vit dans la PR #12, ouverte depuis le
   2026-09-20 et non fusionnée. Écrire un objectif que la machine ne peut pas évaluer est une dette déguisée
   en critère. Le lint revient dans OBJ-4 dès T-022, donc à la date que fixera l'arbitrage 2 du bas de document.
3. **OBJ-4 porte désormais le coussin, pas seulement le vert.** Mesuré le 2026-09-23 : la version antérieure
   à la dernière vague était « verte » avec un coussin minimal de **0**, une fiche tenue par un simple
   départage alphabétique. Un voyant vert n'était pas une marge.

OBJ-2 vient avant OBJ-3 : aujourd'hui aucune des « réussites » constatées ne provient d'un utilisateur réel,
et aucune ne pourrait l'être, faute d'instrumentation.

## Non-Goals — ce que ce projet ne fera pas

1. AliTché **ne relancera pas son API interne parallèle**. `backend/` (25 fichiers suivis : Express, Prisma,
   passeport JWT, service d'e-mail, uploads, plus ses fichiers de déploiement Railway/Fly/Docker) est appelé
   par **aucun** écran : `apiClient` (`src/services/api.client.ts`) n'est référencé nulle part, et
   `auth.api.ts`, `module.api.ts`, `profile.api.ts` parlent directement à Supabase. Ce code reste en l'état,
   ne reçoit aucune fonctionnalité nouvelle, et n'est pas linté. Le retirer est l'arbitrage 2 (en fin de document), pas un prétexte.
2. AliTché **ne met pas en relation employeurs et candidats**. Pas d'espace recruteur, pas de dépôt de
   candidature, pas de messagerie, pas d'offre d'emploi.
3. AliTché **n'ouvre aucun espace institutionnel** — université, consultant, centre d'employabilité,
   parent — tant que le parcours individuel n'a pas prouvé sa valeur (`docs/PRD_Ali_Ce_Private.md` §11.3,
   toujours valable le 2026-09-23).
4. AliTché **ne vend rien**. Pas de paiement, pas de commission, pas de marketplace : les écoles, formations
   et bourses sont référencées, jamais marchandes.
5. AliTché **ne génère pas ses contenus par modèle d'IA**. Domaines, métiers, modules et opportunités sont
   des données maintenues dans `src/data/` (7 fichiers, 4 791 lignes), pas des sorties de génération. Une
   recommandation produite par un modèle devrait assumer une source ; elle n'en aura pas.
6. AliTché **ne remplace pas un conseiller d'orientation** et ne garantit aucune équivalence de diplôme.
   Le résultat est indicatif, et l'écran doit continuer de le dire.
7. AliTché **n'accepte plus de `node_modules` versionné** : 10 579 fichiers suivis sur 10 722 (98,7 %). Les
   revues de diff ne veulent plus rien dire et chaque commit pèse. La règle est écrite ici, son application
   est l'arbitrage 2 (en fin de document).
8. AliTché **n'ajoute pas de nouvelle surface fonctionnelle tant qu'OBJ-1 est à 0 / 5**. C'est la non-goal qui
   compte pour les six prochains mois : « on développera les modules restants » n'est pas une réponse à
   l'absence d'utilisateur. Un module nouveau exige un arbitrage écrit, pas une session de plus.

## Périmètre négocié

### v1 — Essentiel

Le tronc le fait déjà ; la v1 consiste à le **garantir** plutôt qu'à le faire croître : compte et session,
test d'orientation, profil, résultats croisés domaine × métier, parcours taillé selon le temps et le matériel
mobilisables, export du résultat, persistance Supabase, responsive web.

Deux lignes ont bougé par rapport au 2026-09-21 :

- la **reprise du test interrompu passe de v2 à v1** : elle est déjà codée (`TestFlow.tsx:118` relit la
  sauvegarde, `137` rend « Reprendre votre test ? », `143-144` l'offre). La classer v2 voulait dire la
  re-développer. Ce qu'elle attend, c'est d'être vue rendue — T-204.
- la **reprise du parcours d'un appareil à l'autre** reste v2, distincte de la précédente : elle dépend de
  l'URL par écran (T-013) qui n'existe pas.

### v2 — Important

Progression réelle dans les modules (aujourd'hui le parcours se recommande, il ne se suit pas), enrichissement
vérifié des écoles et bourses, accessibilité sur connexion lente, instrumentation d'OBJ-2, export qui
transporte le profil, reprise inter-appareils.

### Icebox

Comptes institutionnels, portfolio de preuves et certifications, langues autres que le français,
recommandation générée par modèle, rapprochement avec une offre d'emploi. Copié dans `docs/icebox.md` (T-006),
jamais implémenté sans arbitrage.

## Contraintes

| Type | Contrainte | Conséquence assumée |
|---|---|---|
| Stack | React 18 + TypeScript + Vite 5 + Tailwind, SPA sans serveur applicatif | Un seul artifact à déployer ; aucun rendu côté serveur, donc les écrans publics dépendent de l'état du client |
| Données | Catalogue tenu à la main dans `src/data/` | L'exactitude des métiers, écoles et bourses engage le projet ; aucune source externe vérifiée ne la garantit — 165 lignes d'opportunités : 151 `source: 'fourni'`, 14 `source: 'demo'`, **0 `source: 'verifie'`** |
| Hébergement | Vercel + projet Supabase, offres gratuites. `vercel-build` = `tsc && vite build`. **Pas de CI** : pousser sur `master` publie en production | Pas de redondance et pas de filet : une coupure du projet Supabase coupe le produit entier (constaté le 2026-09-19, PR #11), et une régression part en prod au premier push |
| Vérification | `npm run verify` lance deux contrôles (`pathway.check`, `signal.check`) mais enchaînés par `&&` | Un échec du premier éteint la mesure du second. Constaté le 2026-09-22 pendant une journée entière, **toujours ouvert** — à corriger par T-021 |
| Accès | Inscription réelle obligatoire pour voir l'application | GoTrue rejette les domaines sans boîte mail et rate-limite : sans adresse valide, les écrans après la connexion restent invérifiables — c'est ce qui bloque OBJ-1 |
| Poids | Bundle 779,15 kB, **214,10 kB gzip** (mesuré le 2026-09-23, seuil d'alerte Vite : 500 kB non gzip) | Sur une connexion 3G, le premier affichage paie ce prix avant la moindre question. Tâche non encore versée au backlog |
| Disponibilité humaine | Une personne, plusieurs sessions de travail en parallèle sur le même dépôt | Une seule tâche en cours par surface (WIP = 1) ; pas de fusion sans relecture ; `git add` par chemins explicites |
| Conformité | Données personnelles de jeunes, mineurs possibles | Aucune clé ni secret dans un commentaire, une description de tâche ou le dépôt ; politique de conservation non écrite (T-025) |

## Où on est — constat mesuré le 2026-09-23

### Ce qui tient, preuve en main

- `tsc --noEmit` sur la base de `672d56f` : **0 erreur**.
- `npm run verify` : **vert** (`PATHWAY=0`, `SIGNAL=0`). En-tête du contrôle : catalogue de **51 modules**,
  **11 domaines**, **4 situations** ; signal : **31 questions**, **11 domaines de carrière**.
- `npm run build` : sortie 0 en 2 min 2 s.
- **45 fiches métier** (`src/data/occupations.ts`), **38 axes** (`specializations.ts`), **165 opportunités**
  (`opportunities.ts`), **51 modules de formation** (`modules.ts`), `ASSESSMENT_VERSION = 6`.
- **Classabilité** : les 45 fiches se classent dans le top 4 des profils construits pour leurs propres
  domaines de cœur, et la gate ne doit son vert à aucun abaissement de seuil.
- **Coussin** : la fiche la plus faible tient à **2 points** de la 5ᵉ place ; **aucune** fiche à ≤ 1 point.
  C'était 0 point et 4 fiches à ≤ 1 point il y a deux jours.
- **Posture déclarable** : paires domaine × fonction silencieuses **23 sur 66**, contre 44 avant la vague du
  2026-09-23. Déclaratif cumulé 15 %, domaine le plus exposé `tourisme` à 17 %, sous le plafond de 20 %.
- **Douze commits depuis le 2026-09-20**, dont la dissociation santé/social (`b853047`), les écoles publiques
  réelles des domaines pauvres (`5289aa8`), l'ingestion de l'annuaire transmis (`879e2b8`) et les fiches
  portant les débouchés annoncés (`eebebc8`).
- **Documentation** : `docs/00-charter.md` (ce document), `docs/backlog.md`, `docs/PRD.md` (525 lignes,
  12 sections), `docs/PRD_Ali_Ce_Private.md`, `docs/Ali_Ce_Product_Overview_Public.md`.
- **ClickUp** : espace iNOVA LAB `1200430000025095`, 6 épics créées, **19 tâches poussées**. Miroir interrompu en
  cours de poussée par le quota quotidien MCP (backlog §G, inventaire exact).

### Ce qui est annoncé mais non prouvé

- **Aucun écran n'a été vu rendu** dans un navigateur. Tout ce qui précède atteste que le code compile et que
  le moteur calcule juste, pas qu'un jeune obtient une direction en une séance. OBJ-1 : 0 / 5.
- Quatre tâches du socle sont `en test` faute de capture : reprise du test, engagement repris à l'inscription,
  refus d'un barème périmé, trois voies d'export.
- Le chemin après connexion n'est pas parcourable sans une adresse e-mail réelle (contrainte « Accès »).

### Ce qui est mort, absent ou en attente

- `backend/` : Non-Goal 1.
- **`npm run lint` inexécutable** sur `master` (aucune configuration suivie). PR #12 ouverte depuis le
  2026-09-20, attend un accord de fusion.
- **23 fichiers Markdown à la racine**, hors `docs/`, pour un seul hébergement réel : guides Railway, Fly.io,
  intégrations et corrections passées.
- **10 579 fichiers `node_modules` suivis** sur 10 722.
- **Aucune CI** : pas de `.github/`. Les trois commandes de gate tournent à la main, donc seulement quand on
  y pense.
- **Aucune instrumentation** : OBJ-2 à zéro.
- Absents : `docs/01-architecture.md`, `docs/adr/` (aucune décision technique écrite nulle part),
  `docs/risks.md`, `docs/test-plan.md`, `docs/icebox.md`, `AGENTS.md`, `.devmethod/scope.json`.
- `gate-check.cjs` **relancé le 2026-09-23** : gate courant 1 (Validation), verdict **NO-GO**, 42 tâches au
  backlog, quatre bloquants — `01-architecture.md`, trois ADR, `risks.md`, `test-plan.md`. Ce sont exactement
  T-002 à T-005. Deux avertissements : `docs/icebox.md` et `AGENTS.md` absents (T-006, T-007), et 16 tâches sans
  chemins déclarés.
- PR #9 : base du 6 août, non fusionnable, contenu repris par #12. PR #10 : brouillon de README.
- **Onze routes** déclarées dans `App.tsx` (dont l'attrape-tout `*`), mais `/app` porte **neuf écrans derrière
  un seul `useState`** (`type AppState`, `App.tsx:31` : welcome, test, results, domain, focus, pathway,
  dashboard, profile, home) : aucun écran n'est adressable, aucun n'est reprenable par URL.

## Où on va

Le cap n'est pas « plus de fonctionnalités ». C'est : **que le noyau tienne devant des inconnus, et qu'on le
sache.** Trois mouvements, dans cet ordre, et le suivant ne démarre pas sans le précédent.

| Mouvement | Question à laquelle il répond | Ce qu'il produit | Condition de sortie |
|---|---|---|---|
| **1 · Prouver** (gate 1 → gate 4, premier sprint) | Est-ce qu'un inconnu termine le parcours sans qu'on le guide ? | Les 5 parcours vus rendus (T-204), le chemin d'e-mail réellement parcouru (T-015), les états vide/chargement/erreur de chaque écran (T-020), l'architecture et les 3 ADR écrits (T-002/003) | OBJ-1 à 5 / 5 |
| **2 · Mesurer** (parallèle dès que 1 est engagé) | Qu'est-ce qui se passe réellement, en chiffres ? | 5 événements instrumentés (T-016), CI qui exécute les gates à chaque push (T-023), politique de conservation (T-025) | OBJ-2 à 5 / 5 |
| **3 · Approfondir** (v2, seulement après 1 et 2) | Est-ce que le parcours se *suit*, au-delà du premier écran ? | Progression réelle dans les modules, reprise inter-appareils, écoles et bourses vérifiées une à une (T-009), catalogue élargi sur les paires libres (les quatre tâches M4) | OBJ-3 atteint |

Le mouvement 3 est le seul qui ressemble à du développement de produit nouveau. Il est explicitement
conditionné aux deux premiers, et la Non-Goal 8 rend ce refus opposable séance après séance.

## Découpage en modules

**Décision rendue le 2026-09-23 : les modules remplacent les épics.** E1-E5 sont dissoutes et redistribuées
dans M0-M8. ClickUp reçoit un dossier par module, le dépôt un sous-dossier de documentation par module
(`docs/modules/m4-catalogue/`), et une tâche ne porte plus qu'un seul code. Le module n'est pas une couche :
front, back et donnée cohabitent dans le même module.

### Où va chaque module

| Code | Module | Ce qu'il saura démontrer à la fin du mouvement 3 | Déjà livré, à prouver | À développer |
|---|---|---|---|---|
| **M0** | Socle & méthode | Un contrat signé, une architecture lue, trois décisions techniques écrites, un README qui ne ment pas, un dépôt sous les 300 fichiers suivis | charter, backlog, PRD | F-18 · T-002, T-003, T-006, T-007 · D-05 |
| **M1** | Compte & session | Un inconnu s'inscrit, reçoit un vrai e-mail, se reconnecte six jours plus tard, et ses données ne se lisent pas chez le voisin | F-06, F-10 | F-16 · T-015, T-018, T-025 · D-01, D-02, D-03 |
| **M2** | Questionnaire | 31 questions tiennent, un barème qui change ne jette plus les profils, et ce qu'un candidat a répondu reste relisible | F-01 | T-024 · D-09 |
| **M3** | Moteur de recommandation | Deux profils opposés ne tombent pas sur le même premier domaine, et chaque fiche reste atteignable avec une marge mesurée | F-02, F-09 | T-008, T-021 |
| **M4** | Catalogue (donnée) | Chaque métier affiché renvoie à une école qui existe, vérifiée ligne à ligne, avec son socle et ses formations complémentaires | F-04 | F-05 · D-10 · **et 6 tâches de catalogue non encore versées au backlog** |
| **M5** | Ciblage & parcours | Le parcours ne se recommande plus seulement : il s'ouvre, une leçon s'y lit, et rien ne promet un paiement qui n'existe pas | F-07, F-08 | F-14 · T-026, T-027 · D-04 |
| **M6** | Restitution | Neuf écrans, neuf URL : on rouvre l'application trois jours après à l'étape atteinte, et un lien partagé rouvre un profil | F-03, F-11, F-12 | F-13 · T-010, T-013, T-014, BUG-02 · D-12 |
| **M7** | Surface publique | La vitrine ne promet plus un produit plus grand que le produit, et elle s'affiche sur une connexion 3G | — | F-17 · D-06, D-07 · alléger le JS initial (214 kB gzip) |
| **M8** | Fiabilité & mesure | Cinq événements visibles sur sept jours réels, trois commandes tenues par une machine à chaque push, et une panne qui se dit à l'écran | — | F-15, F-19, F-20 · T-022, T-023, T-205 · D-08, D-11 |

Trois vocabulaires coexistent, et c'est le seul risque de lisibilité de cette table : `F-nn` est une ligne du
PRD §6 (ce que l'écran doit faire), `T-0nn` une ligne du backlog (où écrire le code), `D-nn` une décision du §
ci-dessous (si on la prend à notre place). Les deux premiers se recouvrent parfois — `F-11` et `T-010` sont le
même travail vu de deux documents. **Aucun code `F` au-delà de F-20 n'existe** : le PRD s'arrête là, et ce qui
n'y figure pas porte un `T-` ou un `D-`, jamais un numéro inventé.

### Les douze décisions que le tronc a déjà prises à notre place

Ce ne sont pas des bugs. Ce sont des choix de produit implicites, dans le tronc, que personne n'a faits à
l'endroit. Chacune se refuse en un mot : **servir**, **supprimer**, ou **annoncer**.

| ID | Ce que le dépôt expose aujourd'hui | Ce que ça suppose | Décision à rendre | Module |
|---|---|---|---|---|
| D-01 | `loginWithGoogle` dans le contexte d'auth, consommé par aucune interface | Le README annonce « Google OAuth » comme une fonctionnalité | servir (brancher l'écran) ou supprimer | M1 |
| D-02 | `sendMagicLink` jamais appelé | Une connexion sans mot de passe est à moitié construite | servir ou supprimer | M1 |
| D-03 | `/verify-email` est un écran « Lien traité » que le flux réel n'emprunte jamais | Deux écrans pour un chemin, un mort | supprimer ou raccorder | M1 |
| D-04 | Étiquettes « Gratuit » / **« Premium »** rendues sur les modules payants (`PathwayView.tsx:378, 457`), sans aucun paiement derrière | Un paywall visuel qui promet une offre payante et un compte payant qui n'existent pas (Non-Goal 4) | retirer l'affichage, ou assumer T-011 | M5 |
| D-05 | `README.md` décrit un produit qui n'existe pas : « JWT-based authentication » (l.10), « Express 4.18 » (l.65), « Prisma ORM 5.9 » (l.67), « JWT + Passport.js + Google OAuth2 » (l.68), `api.client.ts` documenté (l.150) — **et le tout en anglais** | Un partenaire, un recruté ou un outil d'IA lit une autre pile technique que la nôtre. La vitrine du dépôt contredit la Non-Goal 1 | réécrire depuis le tronc, en français, et tenir l'écart par une gate | M0 |
| D-06 | « Orientation », « Métiers », « Écoles », « Mentors » : quatre `<button type="button">` **sans `onClick`** dans la barre de navigation (`HomePage.tsx:49-60`), plus les liens de pied de page (`:306`) | Aucun de ces quatre onglets n'a de route : un visiteur qui clique sur « Écoles » ne se passe rien | servir (rouvrir le parcours sur ces entrées) ou retirer | M7 |
| D-07 | Image d'accueil hébergée sur `lh3.googleusercontent.com` | L'accueil se casse de l'extérieur un jour sans lien avec nous | servir depuis le dépôt | M7 |
| D-08 | `storageManager` : **12 de ses 13 méthodes** ont le même corps — `catch` → `console.error` → `null` ou `[]` | Un quota plein, un `JSON.parse` corrompu ou un local storage vidé se lisent comme « vous n'avez jamais passé le test » | bandeau visible (F-19) | M8 |
| D-09 | `test_responses` : `insert` et `delete` dans `profile.api.ts`, **aucun `select`** dans le dépôt | Un candidat reconnecté retrouve un résultat, jamais ce qu'il a répondu — le replay de profil est impossible par construction | servir (rejouer) ou supprimer la table | M2 |
| D-10 | `modules.ts:38-41` promet 6 modules par domaine dont 4 gratuits ; le contrôle exige 3 et ne regarde pas la gratuité | Le commentaire dit plus que ce que la gate vérifie | relever le seuil **ou** baisser la promesse — jamais les deux tels quels | M4 |
| D-11 | `catalogue.report.ts` : 118 lignes, **zéro assertion**, et rien dans `package.json` ni `src/` qui l'appelle | Un rapport que personne ne lit ni ne déclenche | brancher dans `verify` ou supprimer | M8 |
| D-12 | Trois fichiers sans aucun importateur, vérifié ce jour : `services/api.client.ts`, `components/home/AliTcheLanding.tsx`, `components/ui/Animations.tsx` — plus deux clés `STORAGE_KEYS` mortes | Ils pèsent dans chaque bundle et dans chaque revue de diff, et `api.client.ts` entretient l'illusion d'une API (Non-Goal 1) | supprimer, dans la vague d'assainissement (arbitrage 2) | M6 |

## Risque principal du projet

Le produit n'a jamais été confronté à un utilisateur extérieur à l'équipe. Tout ce qui est tenu pour démontré
l'a été par la personne qui le construit, sur sa machine. Si un jeune qui ne sait pas quoi choisir n'obtient
pas, en une séance, une direction qu'il juge crédible, alors l'empilement d'étapes de ciblage n'ajoute rien à
la valeur — il la rend seulement plus difficile à parcourir.

Risque secondaire, mesuré et non résolu : **l'exactitude du catalogue engage le projet sans garantie.** Sur
les 151 lignes `source: 'fourni'`, `verifiedAt` ne prend que **deux dates distinctes** (2026-09-21 : 74 lignes,
2026-09-22 : 77) — une date de lot, pas 151 contrôles individuels ; et **aucune** ligne n'est passée à
`source: 'verifie'`. Un jeune qui suit notre conseil et trouve porte close perd plus que de l'orientation
perdue. Ce risque-là ne se ferme pas par du code (T-009).

À re-tester au gate 1 et à la rétro.

## Critère d'arrêt

On arrête d'ajouter des fonctionnalités d'orientation, et on passe la suite à fiabiliser le noyau, si :

- à l'échéance d'OBJ-2 (2026-10-31) l'instrumentation n'est pas en place — sans mesure, toute extension est
  une décision à l'aveugle ;
- ou 10 personnes hors équipe ayant essayé, aucune ne termine le parcours complet sans qu'on la guide ;
- ou Supabase reste le point de coupure unique du produit après deux incidents distincts, sans plan de repli
  accepté ;
- ou **une école ou bourse référencée s'avère fausse devant un utilisateur** : on arrête d'élargir le
  catalogue tant que la vague de vérification (T-009) n'est pas passée.

On ne repousse pas le projet pour une raison esthétique (reprise de la palette, refactor du moteur de
parcours, sorties de `node_modules`) : seulement pour l'un des quatre ci-dessus.

## Arbitrages rendus le 2026-09-23, et ce qui reste ouvert

Trois questions posées, trois réponses nettes. Elles sont écrites ici pour qu'on ne les redemande pas.

| # | Question | Réponse retenue | Ce que ça change dans ce charter |
|---|---|---|---|
| 1 | OBJ-3 : combien de personnes hors équipe, d'ici quand | **10 avant le 2026-11-30** | La mention « à confirmer » disparaît du tableau des objectifs |
| 2 | Que fait-on du stock de dette (`backend/`, 23 guides, `node_modules`, lint inerte) | **Assainir au sprint 1, une suppression à la fois**, chacune validée avant exécution | Non-Goal 7 et la contrainte d'hébergement restent écrites telles quelles ; F-18 devient une tâche datée du sprint 1, avec OBJ-1 comme précondition. Aucun `git rm -r` global |
| 3 | Quel axe porte les sprints : modules M0-M8 ou épics E1-E5 | **Les modules remplacent les épics** | Le §Découpage devient l'autorité de l'arborescence, ClickUp et `docs/modules/` prennent les mêmes codes |

Le troisième emporte un coût qu'il faut regarder avant de signer : **les six épics déjà créées dans ClickUp et
les 19 tâches poussées sont à re-cartographier**, y compris les dépendances déclarées (T-027 après T-013).
C'est une après-midi de tracker, pas de code. Elle est inscrite au backlog sous M0, et elle ne se fera pas
avant qu'OBJ-1 avance.

**Ce qui reste ouvert : la signature elle-même.** Le gate 0 a rendu « à reprendre » le 2026-09-23, et la
raison la plus probable du flou porte un nom : la version présentée disait où on est, ligne par ligne, et
laissait le mandat entier sur « le reste des modules à développer puis leurs fonctionnalités » implicite.
Cette passe y répond — la table « Où va chaque module » nomme pour chaque module ce qu'il saura démontrer, et
la table D-01 à D-12 met sur la table les douze décisions que le tronc a prises tout seul.

Si le flou vient d'ailleurs, c'est ce qu'il faut me dire, et pas un point de plus à éclaircir : le charter
fait trois cents lignes, et peut déjà être coupé.

Ce qui reste hors du contrat, avec sa raison écrite : le dépôt `easy-apply` introuvable, listé comme point 4
le 2026-09-21. Ce dépôt n'est pas AliTché, il ne change aucune ligne du contrat ci-dessus, et le maintenir ici
entretenait l'illusion qu'un projet du portefeuille se décidait au gate 0 d'un autre.
