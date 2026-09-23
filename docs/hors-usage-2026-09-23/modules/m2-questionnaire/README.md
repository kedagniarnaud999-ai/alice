# M2 · Questionnaire

**Statut : proposition non autorisée — gate 0 non signé.**

## Destination

31 questions tiennent. Un barème qui change ne jette plus les profils. Et ce qu'un candidat a répondu reste
relisible.

Trois promesses, trois verrous différents : le premier est une question de données, le deuxième une question de
migration, le troisième une question de lecture — au sens littéral, une requête qui manque.

## Périmètre

| Chemin | Rôle |
|---|---|
| `src/data/questions.ts` | les 31 questions, les poids par domaine, `ASSESSMENT_VERSION` |
| `src/components/test/` | `WelcomeScreen`, `QuestionCard`, `SectionHeader`, `TestFlow` |
| `src/utils/profileResult.ts` | normalise, accepte ou **jette** un profil selon sa version |
| `src/services/profile.api.ts` | écritures `profiles.payload` et `test_responses` |
| `src/utils/storageManager.ts` | brouillon local, résultat, progression |
| `supabase/001_initial_schema.sql` | table `test_responses` et sa politique de lecture |

**Frontière avec M3** : M2 porte *ce qu'on demande et ce qu'on en garde*. La façon dont les réponses
deviennent un classement est M3. `src/utils/testAnalyzer.ts` est donc M3, et le critère
`MAX_DECLARATIVE_SHARE_PER_DOMAIN = 0,2` se vérifie là-bas.

## Acquis (mesuré le 2026-09-23)

- **31 questions, et le compte y est.** 31 occurrences de `id: 'q_` dans `src/data/questions.ts`. Le barème est
  dans la donnée, pas dans le code : `ASSESSMENT_VERSION = 6` (`questions.ts:21`).
- **Quatre situations de départ, 29 à 30 questions selon le chemin** (T-104, validé par la sortie de
  `npm run verify`).
- **La reprise du test interrompu est écrite.** `TestFlow.tsx:37` relit la progression locale, `:137-144` rend
  un écran « Reprendre votre test ? » avec son compteur de réponses et ses deux issues. **Jamais vue rendue
  dans un navigateur** — c'est ce qui distingue un acquis d'une preuve, et OBJ-1 est là pour ça (T-204).
- **Le domaine n'est plus déclaré.** Le candidat ne choisit pas un domaine : il répond, et le domaine est déduit.
  Conséquence mesurable côté M3 : le plafond déclaratif tient le signal.

## À développer

| Code | Travail | Critère d'acceptation | Dépend de |
|---|---|---|---|
| T-024 | Migrer un profil d'un barème antérieur au lieu de le refuser | Un profil écrit sous `assessmentVersion` 5 s'ouvre après un passage à 6 : une fonction de migration est appelée, le `if` de `profileResult.ts:43` ne termine plus par « profil absent » | T-003 (l'ADR du barème doit exister avant qu'on migre vers quoi) |
| D-09 · T-012 | `test_responses` : servir ou supprimer | **Servir** : une requête relit les réponses d'un compte et rejoue le même premier domaine. **Supprimer** : la table, sa politique, ses écritures (`profile.api.ts:91`) et la clé morte `alice_test_responses` (`storageManager.ts:8`) disparaissent du dépôt | T-018 (savoir qui a le droit de lire) |
| T-204 | Les 5 parcours d'OBJ-1 rejoués à la main, vus rendus, avec captures | Cinq captures, cinq dates, un fichier de compte rendu dans `docs/` | — |

## Le point exact où le profil meurt

```
src/utils/profileResult.ts:43
  if (candidate.assessmentVersion !== ASSESSMENT_VERSION) { … }
```

Aujourd'hui, cette ligne rejette. Le produit a déjà connu six barèmes : **chaque changement de version rend la
base silencieusement inutilisable**, sans script de migration (PRD §7). Ce n'est pas un bug, c'est une décision
implicite — et c'est la seule du dossier qui fasse perdre à un candidat **son résultat**, pas seulement son
accès.

## Une correction de document, pas de code

Le PRD §7 écrit `assessmentVersion = 5` et le charter décrit le tronc comme « 31 questions à 11 domaines,
version 5 ». Le code est à **6**. Les documents disent vrai sur la structure et faux sur le chiffre. À corriger
dans la même vague que `docs/test-plan.md` (T-004), pas avant : un document qui bouge sans arbitrage signé
devient l'autorité de quelqu'un d'autre.

## Preuve de fin

Un candidat qui a répondu hier, changé d'appareil, et dont le barème a bougé depuis, retrouve **son** profil et
**ses** réponses — pas un écran d'accueil qui lui propose de tout refaire.

## Hors module

- **Une 32ᵉ question.** Le nombre tient, la durée aussi ; toute question nouvelle en sort une autre (one-in /
  one-out), et `docs/icebox.md` (T-006) garde la trace du refus.
- **Un second instrument psychométrique.** Non-goal 5 : une recommandation doit assumer une source.
- **Ajouter une dimension de score pour arranger un cas.** Les seuils et les poids se vérifissent en M3 ; ils ne
  se retouchent pas pour passer une vague au vert.
