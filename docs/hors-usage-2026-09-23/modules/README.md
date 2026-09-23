# Modules M0–M8

**Statut : proposition non autorisée.** Le gate 0 (`docs/00-charter.md`) n'est pas signé. Rien dans ce dossier
n'engage le projet : aucun dossier n'est créé dans ClickUp, aucune tâche n'est versée au backlog, aucun chemin
de code n'est engagé. Ce dossier existe pour que la signature porte sur quelque chose de complet — la direction
de neuf modules, pas seulement le constat sur le tronc.

## Règle de découpage

Décision rendue le 2026-09-23 dans le charter, appliquée ici :

1. **Les modules remplacent les épics.** E1–E5 sont dissoutes. Une tâche porte un seul code `M0…M8`.
2. **Un module n'est pas une couche.** Front, back et donnée cohabitent dans le même module : `M4 Catalogue`
   contient la donnée et l'écran qui l'affiche, parce que le travail se juge sur la fiche vue par un candidat.
3. **Un module = un sous-dossier ici, un dossier dans ClickUp.** Le miroir ne précède jamais le document.

Chaque document de module suit la même structure : **destination** (ce qu'il saura démontrer), **périmètre**
(les chemins exacts), **acquis** (ce qui existe, avec la preuve mesurée le 2026-09-23), **à développer** (avec
un critère d'acceptation vérifiable sans discussion), **preuve de fin**, **hors module** (ce qui ne peut pas
entrer ici sans faire sortir autre chose).

## Les neuf modules

| Code | Module | Destination | Document | Dossier ClickUp |
|---|---|---|---|---|
| **M0** | Socle & méthode | Un contrat signé, une architecture lue, trois décisions techniques écrites, un README qui ne ment pas, un dépôt sous les 300 fichiers suivis | [`m0-socle-et-methode/`](m0-socle-et-methode/README.md) | à pousser |
| **M1** | Compte & session | Un inconnu s'inscrit, reçoit un vrai e-mail, se reconnecte six jours plus tard, et ses données ne se lisent pas chez le voisin | [`m1-compte-et-session/`](m1-compte-et-session/README.md) | à pousser |
| **M2** | Questionnaire | 31 questions tiennent, un barème qui change ne jette plus les profils, et ce qu'un candidat a répondu reste relisible | [`m2-questionnaire/`](m2-questionnaire/README.md) | à pousser |
| **M3** | Moteur de recommandation | Deux profils opposés ne tombent pas sur le même premier domaine, et chaque fiche reste atteignable avec une marge mesurée | [`m3-moteur/`](m3-moteur/README.md) | à pousser |
| **M4** | Catalogue (donnée) | Chaque métier affiché renvoie à une école qui existe, vérifiée ligne à ligne, avec son socle et ses formations complémentaires | [`m4-catalogue/`](m4-catalogue/README.md) | à pousser |
| **M5** | Ciblage & parcours | Le parcours ne se recommande plus seulement : il s'ouvre, une leçon s'y lit, et rien ne promet un paiement qui n'existe pas | [`m5-ciblage-et-parcours/`](m5-ciblage-et-parcours/README.md) | à pousser |
| **M6** | Restitution | Neuf écrans, neuf URL : on rouvre l'application trois jours après à l'étape atteinte, et un lien partagé rouvre un profil | [`m6-restitution/`](m6-restitution/README.md) | à pousser |
| **M7** | Surface publique | La vitrine ne promet plus un produit plus grand que le produit, et elle s'affiche sur une connexion 3G | [`m7-surface-publique/`](m7-surface-publique/README.md) | à pousser |
| **M8** | Fiabilité & mesure | Cinq événements visibles sur sept jours réels, trois commandes tenues par une machine à chaque push, et une panne qui se dit à l'écran | [`m8-fiabilite-et-mesure/`](m8-fiabilite-et-mesure/README.md) | à pousser |

## Trois codes que la table du charter ne verse à personne

La table « Où va chaque module » du charter couvre 21 codes. Trois restent sans module. Je les verse en M0, à
confirmer ou à réaffecter à la signature :

- **T-001 — signer le charter.** Ce n'est pas une tâche de développement ; c'est le gate lui-même. Je le garde
  dans M0 parce que c'est le seul endroit où il a un sens, et parce qu'il bloque tout le reste.
- **T-004 — plan de test et seuils de gate** (`docs/test-plan.md`).
- **T-005 — registre des risques** (`docs/risks.md`).

## Ce que la table du charter sous-compte

M4 porte « 4 tâches de catalogue non encore versées au backlog ». Une fois les quatre travaux de donnée écrits
au lieu d'être devinés, ils sont **six** (voir [`m4-catalogue/`](m4-catalogue/README.md)). L'écart se corrige
dans le charter, pas dans la réalité du catalogue.

## Vocabulaire des identifiants

`F-01…F-20` : ligne du PRD §6, ce qu'un écran doit faire. `T-001…T-027`, `T-101…T-113`, `T-204`, `T-205`,
`BUG-01…03` : ligne du backlog, où écrire le code. `D-01…D-12` : décision implicite déjà prise par le tronc
(§ « Les douze décisions » du charter). Les codes `T-028` et au-delà sont **proposés dans ce dossier** et
n'existent pas encore dans `docs/backlog.md`, qui s'arrête à T-027 pour le travail à faire.
