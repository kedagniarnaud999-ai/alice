# M0 · Socle & méthode

**Statut : proposition non autorisée — gate 0 non signé.**

## Destination

Un contrat signé, une architecture lue par quelqu'un d'autre que son auteur, trois décisions techniques écrites
 quelque part, un README qui décrit le produit qui existe, et un dépôt sous les 300 fichiers suivis.

M0 est le module qui rend les huit autres opposables. Sans lui, chaque désaccord se règle par l'énergie de
celui qui parle. Avec lui, se règle par un fichier et une date.

## Périmètre

| Chemin | État mesuré le 2026-09-23 |
|---|---|
| `docs/00-charter.md` | existe — 2 passes le 2026-09-23, « Validé le : — » |
| `docs/PRD.md` | existe — 12 sections, §6 = F-01…F-20 — **jamais commité** (mesuré ce jour) |
| `docs/backlog.md` | existe — §A 13 lignes d'import, §B T-001…T-027, §C QA, §D refusés, §G état ClickUp — **jamais commité** |
| `docs/modules/` | créé par ce dossier |
| `docs/01-architecture.md` | **absent** |
| `docs/adr/` | **absent** |
| `docs/test-plan.md` | **absent** |
| `docs/risks.md` | **absent** |
| `docs/icebox.md` | **absent** |
| `AGENTS.md` | **absent** |
| `.devmethod/` | **absent** — pas de `scope.json`, donc le one-in / one-out n'est tenu par aucun fichier |
| `README.md` | présent, **contredit le tronc sur cinq points** (D-05) |

## Acquis

Ce qui est déjà vrai et ne demande qu'à être signé :

- **Le contrat est écrit et chiffré.** Quatre objectifs mesurables, dont deux portent une échéance et un
  compteur à zéro aujourd'hui : OBJ-1 `0/5` parcours vus rendus, OBJ-2 `0/5` événements instrumentés.
- **Le périmètre négatif existe.** Huit non-goals, dont le 8 (« aucune nouvelle surface fonctionnelle tant
  qu'OBJ-1 est à 0/5 ») et six refus tracés dans `docs/backlog.md` §D avec leur date et leur condition de
  reprise.
- **La source de vérité est tranchée** : `docs/` du dépôt fait autorité, ClickUp est un miroir d'exécution, la
  synchronisation ne remonte jamais.

## À développer

| Code | Travail | Critère d'acceptation | Dépend de |
|---|---|---|---|
| T-001 | Signer le charter | Une ligne « Validé le : <date> » et un feu vert explicite. Le gate est bloquant : sans cette ligne, ni M4 ni M5 ni ClickUp ne bougent | — |
| T-002 | `docs/01-architecture.md` : frontières, Supabase appelé par le navigateur, `backend/` mort, ordre de déploiement | Un lecteur qui n'a pas écrit le code peut dire, sans ouvrir `src/`, ce qui casse si on retire `backend/` | T-001 |
| T-003 | Trois ADR dans `docs/adr/`, dont la fonction de score | Trois fichiers datés, chacun avec le choix contraire qu'on a écarté et pourquoi | T-001 |
| T-004 | `docs/test-plan.md` : ce qui doit passer, à quelle sévérité, et la règle « gate rouge seulement sur régression de structure, jamais sur un trou de contenu » | La règle est écrite noir sur blanc et la liste des gates avec elle | T-001 |
| T-005 | `docs/risks.md` | Le risque catalogue (151 lignes `source: 'fourni'`, deux dates de lot seulement, 0 `verifie`) y figure avec son plan | T-001 |
| T-006 | `docs/icebox.md` : copier les hors-scope datés du charter et du PRD §10 | Un « non » de séance précédente se retrouve en trois secondes et se repose | T-001 |
| T-007 | `AGENTS.md` : une tâche à la fois, WIP = 1, rien hors scope approuvée | Le fichier existe et un agent le lit sans qu'on le lui demande | T-001 |
| F-18 | Assainir le dépôt | `git ls-files \| wc -l` **< 300**. Mesuré aujourd'hui : **10 723**, dont **10 579 sous `node_modules/`** et **25 sous `backend/`** | T-001 |
| D-05 | Réécrire le README depuis le tronc, en français | Ni « JWT-based authentication » (l.10), ni « Express 4.18 » (l.65), ni « Prisma ORM 5.9 » (l.67), ni « Passport.js + Google OAuth2 » (l.68), ni `api.client.ts` documenté (l.150). Le fichier décrit Supabase-direct, 31 questions, et la version de barème **que porte le code** | F-18 |

## Trois dérives trouvées en mesurant, pas en relisant

Un document qui a raison sur le fond peut être faux dans ses références, et c'est ce qui rend une gate
illisible :

1. **Le barème est à `6`, les documents disent `5.`** `ASSESSMENT_VERSION = 6` (`src/data/questions.ts:21`)
   depuis la refonte du questionnaire (`672d56f`). Le PRD §7 et le critère d'acceptation de F-18 (« le README
   décrit … v5 ») sont donc périmés **y compris dans leur formulation de critère** : valider F-18 sur la lettre
   écrirait un faux dans le README. Le critère devient « la version que porte le code ».
2. **Les citations de lignes du backlog ont bougé sans lui.** Quatre vérifiées ce jour :
   `AuthContext.tsx:45` → `:12` et `:54` ; `testAnalyzer.ts:9-10` → `:31-32` ; `module.api.ts:64-65` → la lecture
   de progression est en `:106-119` ; la gate d'atteignabilité est en `pathway.check.ts:1068`. Le backlog et le
   PRD restent justes sur le fond — mais une gate qui cite une ligne ne peut plus se relire sans rouvrir le
   fichier. À corriger dans `docs/backlog.md` lors du re-mapping vers les modules, et à prévenir par T-004 : une
   référence de code cite un **symbole**, pas un numéro de ligne.
3. **Les deux documents qui font autorité n'étaient pas dans le dépôt.** `docs/PRD.md` et `docs/backlog.md`
   n'apparaissent pas dans `git ls-files` : écrits, lus, cités partout — mais présents uniquement sur ce
   poste. Une règle « `docs/` fait autorité, ClickUp est un miroir » ne tient pas si l'autorité n'a pas
   d'historique. Versés dans le dépôt le 2026-09-23 (commit séparé) ; **cette règle-là ne se discute pas, elle
   s'applique** : sans historique, un document d'autorité n'est pas une autorité, c'est une habitude.

## Preuve de fin

`node <skill>/scripts/gate-check.cjs --repo .` ne répond plus `NO-GO` sur le gate 1, `git ls-files | wc -l` est
sous 300, et le README se lit en français par quelqu'un qui n'a jamais ouvert le dépôt.

## Hors module

- **Ranimer `backend/`** (Express, Prisma, JWT) : refusé R-002. Aucun écran ne l'appelle. Ce que M0 demande,
  c'est de le **documenter comme mort** dans l'architecture (T-002) ou de le supprimer dans F-18 — pas de le
  faire tourner.
- **Une méthodologie plus lourde que le projet.** M0 livre sept fichiers. Un huitième qui n'oblige personne à
  rien n'entre pas ici.
