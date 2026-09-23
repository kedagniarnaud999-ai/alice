# M6 · Restitution

**Statut : proposition non autorisée — gate 0 non signé.**

## Destination

Neuf écrans, neuf URL. On rouvre l'application trois jours après à l'étape atteinte, et un lien partagé rouvre
un profil.

## Périmètre

| Chemin | Rôle |
|---|---|
| `src/App.tsx` | les routes, et l'état applicatif qui pilote tout le reste (`:31-41`) |
| `src/components/results/` | `ResultsDashboard`, `OccupationResults`, `DomainDetail`, `ExportMenu` |
| `src/components/dashboard/Dashboard.tsx` | le tableau de bord et ses cartes |
| `src/components/pathway/PathwayView.tsx` | l'écran parcours, vu depuis ici |
| `src/services/module.api.ts` | progression écrite et relue (`:97` upsert, `:106-119` lecture) |
| `src/utils/storageManager.ts` | le miroir local de tout ce qui précède |

## Acquis (mesuré le 2026-09-23)

- **F-03 — le résultat est un classement, pas un verdict.** Domaine retenu et intersection affichés ; le premier
  domaine d'un profil sans bac scientifique n'est jamais « ingenierie » par défaut.
- **F-11 — partiel : trois voies de sortie existent.** `ExportMenu.tsx` : `window.print()` (`:12`),
  `navigator.share` (`:22`), presse-papiers sur l'URL courante (`:29`), et un `Blob` `.txt` (`:74`). Ce qui
  manque n'est pas une sortie de plus : c'est que le lien partagé **porte le profil**.
- **F-12 — partiel : la progression est écrite et relue.** L'écriture part (`module.api.ts:97`) et la lecture
  revient (`:106`), sans filtre client — donc la question de qui voit quoi se pose en M1 (F-16), pas ici.

## À développer

| Code | Travail | Critère d'acceptation | Dépend de |
|---|---|---|---|
| T-013 | Une URL par écran | `/app` n'est plus une seule route pour neuf écrans pilotés par un `useState` : les neuf états (`App.tsx:31-41`) ont neuf URL, et « retour » dans le navigateur fait ce que l'utilisateur attend | T-001 |
| F-13 | Reprise entre étapes | Découle de T-013 : rouvrir l'app trois jours après reprend à l'étape atteinte, avec l'URL de cette étape (la tâche de parcours elle-même est T-027, en M5) | T-013 |
| T-010 | Export qui transporte le profil | Le lien partagé rouvre **le profil exporté** sur un autre appareil, pas l'accueil (PRD §11.3) | — |
| T-014 | Une seule vérité de progression | Cocher un module sur l'appareil A se voit sur l'appareil B, sans double comptage local/remote (`App.tsx:196-268`) | F-16 (M1) |
| BUG-02 | Carte « Mon profil » mal libellée | `Dashboard.tsx:126-127` : titre « Mon profil », description « Voir mes résultats détaillés », cible la page **compte**. Soit le libellé change, soit la carte mène aux résultats | — |
| D-12 | Trois fichiers morts, deux clés mortes | `services/api.client.ts`, `components/home/AliTcheLanding.tsx`, `components/ui/Animations.tsx` : zéro importateur, vérifié ce jour. Plus `alice_user_profile` et `alice_test_responses` (`storageManager.ts:8`). Suppression dans la vague d'assainissement (arbitrage 2 : une suppression à la fois) | T-001 |

## Pourquoi l'URL passe avant la reprise

Sans URL par écran, « reprendre à l'étape atteinte » ne veut rien dire : il n'y a pas d'endroit où reprendre. On
ne peut pas tester la reprise, on ne peut pas la montrer à un utilisateur extérieur, et on ne peut pas la mesurer.
C'est le maillon qui bloque T-027 (M5), T-204 (OBJ-1) et, par ricochet, toute la vague d'OBJ-2 : un événement
« parcours ouvert » sans URL est un événement qu'on ne pourra pas recouper.

## Preuve de fin

On ferme l'application à l'étape « parcours », on la rouvre trois jours plus tard depuis le lien partagé sur un
autre appareil : on retombe sur le parcours de cette personne, pas sur l'accueil.

## Hors module

- **Un tableau de bord analytique.** Ce que M6 doit montrer, c'est un profil, pas des graphiques. La mesure des
  cinq événements est M8 (F-15) et se juge sur un tableau de bord existant, pas sur un écran de plus.
- **Neuf écrans de plus.** Non-goal 8 : aucune nouvelle surface fonctionnelle tant qu'OBJ-1 est à 0/5. M6 est
  précisément le module qui doit rendre les neuf écrans existants atteignables.
