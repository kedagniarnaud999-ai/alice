# M8 · Fiabilité & mesure

**Statut : proposition non autorisée — gate 0 non signé.**

## Destination

Cinq événements visibles sur sept jours réels, trois commandes tenues par une machine à chaque push, et une
panne qui se dit à l'écran.

M8 est le module qui empêche les huit autres de mentir. Sans lui, « c'est vert » veut dire « je l'ai vu sur ma
machine ».

## Périmètre

| Chemin | Rôle |
|---|---|
| `package.json` | `build` = `tsc && vite build`, `verify` = deux contrôles enchaînés, `lint` = une commande sans configuration |
| `src/checks/` | `pathway.check.ts`, `signal.check.ts`, `catalogue.report.ts` |
| `src/utils/storageManager.ts` | 13 méthodes, **12 `catch` qui avalent** (D-08) |
| `src/lib/supabase.ts`, `src/lib/supabaseHealth.ts` | client et sonde de disponibilité |
| `src/main.tsx`, `src/components/ConfigErrorScreen.tsx`, `src/components/ServiceStatusBanner.tsx` | ce que voit une panne de config ou de service |
| `.github/workflows/` | **absent** — vérifié ce jour |
| `.eslintrc.cjs` / `eslint.config.*` | **absents** — vérifié ce jour |

## Acquis (mesuré le 2026-09-23)

- **Une partie de la panne se dit déjà.** `main.tsx:14` rend `ConfigErrorScreen` quand la config est absente,
  `:20` monte `ServiceStatusBanner`, et `AuthContext.tsx:9` consomme `checkSupabaseHealth`. Le socle existe :
  ce qui manque, c'est le cas le plus fréquent — l'écriture locale qui échoue.
- **Les trois commandes sont connues et tiennent aujourd'hui** : `node node_modules/typescript/bin/tsc --noEmit`,
  `npm run verify`, `npm run build`. C'est la baseline à consigner avant chaque session de build.
- **Deux gates mesurent la structure** : `pathway.check` (1 153 lignes de contrôles) et `signal.check`
  (165 lignes, dont le plafond déclaratif).

## À développer

| Code | Travail | Critère d'acceptation | Dépend de |
|---|---|---|---|
| F-15 · T-016 | Instrumenter les cinq événements | inscription, test terminé, résultats vus, parcours ouvert, export. **Aucun de ces cinq n'est émis aujourd'hui** (vérifié : aucune infrastructure d'événement dans `src/`) ; OBJ-2 est à `0/5`. Les cinq se lisent sur un tableau de bord, sur sept jours réels | T-013 (M6) — sans URL par écran, « parcours ouvert » n'est pas recoupable |
| F-19 · T-017 | Dire à l'utilisateur qu'une synchronisation a échoué | Un enregistrement qui n'est pas parti affiche un bandeau, pas un `console.error`. Concerne les 12 méthodes muettes de `storageManager` et `App.tsx:239, 253, 364, 413` | — |
| F-20 · T-020 | Les états de chaque écran vus rendus | Chaque écran de la table PRD §8 dans ses trois états (vide, chargement, erreur), en navigateur. C'est la condition d'OBJ-1 | T-204 |
| T-022 | Configuration ESLint sur `master` | **`npm run lint` est aujourd'hui incapable de tourner** : le script existe (`eslint . --ext ts,tsx --max-warnings 0`) et aucun fichier de configuration n'est suivi par git. Fusionner la PR #12 ou écrire une configuration minimale | accord de fusion |
| T-023 | CI aux trois commandes | Un push exécute `tsc --noEmit`, `verify` et `lint` et **rougit le check**. Aujourd'hui `vercel-build` ne lance que `tsc && vite build` : `npm run verify` ne tourne jamais sur une machine, donc aucune des deux gates n'empêche une régression d'arriver en production | T-022, T-021 (M3) |
| T-205 | rejouer les gates à la fin de chaque tâche mergée, et **écrire la sortie** | Un fichier de compte rendu par session, avec les chiffres, pas « ça marche » | T-004 (M0) |
| D-08 | `storageManager` : 12 `catch` sur 13 méthodes | Un quota dépassé, un `JSON.parse` corrompu ou un localStorage vidé ne se lit plus comme « vous n'avez jamais passé le test ». Dépend de F-19 pour la manière de le dire | F-19 |
| D-11 | `catalogue.report.ts` | 118 lignes, **zéro assertion, zéro appelant** dans `package.json` comme dans `src/`. Branché dans `verify`, ou supprimé | T-021 (M3) |

## Ce que OBJ-4 exige exactement

Le charter a restreint OBJ-4, et c'est écrit pour ne pas y revenir : **`tsc --noEmit` et `npm run verify` verts
sur `master` à chaque fusion, et coussin de classabilité minimal ≥ 2 points.** Le lint est sorti de
l'objectif **jusqu'à** T-022, non pas parce qu'il est inutile mais parce qu'exiger une commande qui ne peut pas
s'exécuter rend l'objectif faux — et un objectif faux se contourne par habitude, ce qui contamine les autres.

## Preuve de fin

Sept jours de production avec cinq événements comptés ; un push cassé par une gate que personne n'a lancée à la
main ; une écriture locale refusée qui se voit à l'écran le jour même.

## Hors module

- **Une supervision maison, un tableau de bord d'infrastructure.** Cinq événements et trois commandes. Pas un
  sixième, pas une quatrième.
- **Rendre une gate verte en la baissant.** La règle est dans M3 et vaut ici : un rouge se lit en écart contre
  la baseline, jamais en ajustement du seuil.
