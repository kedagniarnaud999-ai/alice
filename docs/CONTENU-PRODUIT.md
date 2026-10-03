# Ce que contient AliTché

*Tâche S2.5 du backlog.*

Ceci est le seul endroit du dépôt où j'écris les nombres du produit. Les autres documents — `MODULES.md`, `BACKLOG.md`,
`ECARTS-PRODUIT-CODE.md`, `TESTS-USAGERS.md` — ne font que les rappeler.

Une vérification automatique, `src/checks/contenu.check.ts`, tourne avec `npm run verify`. Elle recompte le catalogue
dans le code, et elle rougit dans deux cas : si un nombre de cette fiche ne correspond plus à la réalité, et si un
autre document du dépôt écrit un chiffre que je ne retrouve dans aucune mesure. Quand j'ajoute une fiche métier, un
module ou une école, la vérification me dit précisément quelle phrase reprendre.

Les identifiants du bloc final s'écrivent sans accent et avec des points, parce que la vérification les compare
caractère par caractère.

## Le questionnaire

31 questions sont écrites, mais personne ne les voit toutes : selon la situation déclarée, entre 29 et 30 questions se
posent. Elles se répartissent en cinq moments — se situer (3), parler de soi (13), dire ce qui intéresse (10), mesurer
deux aptitudes (2), poser ses contraintes (3).

| Situation déclarée par la personne                     | Questions posées |
| -------------------------------------------------------- | ---------------- |
| Qui sort du bac                                          | 30               |
| Qui cherche un emploi après sa formation                 | 29               |
| Qui veut changer de métier                               | 30               |
| Qui veut évoluer dans le métier qu'elle fait déjà        | 29               |

Le questionnaire ne demande jamais « quel domaine vous plaît ». Il le déduit de ce que la personne fait et de ce
qu'elle choisit, parce qu'un candidat qui nomme son domaine passe devant celui qui le pratique.

## Les 11 domaines de carrière

Le résultat classe par domaine de carrière — jamais « filière », ce mot n'est pas celui du produit. Un domaine n'est
pas un diplôme : c'est un faisceau de métiers qui se partagent les mêmes compétences.

| Identifiant          | Nom affiché à l'écran              | Métiers qui l'exigent | Métiers qui s'en servent comme terrain | Axes | Modules | Chances réelles |
| -------------------- | ---------------------------------- | --------------------- | -------------------------------------- | ---- | ------- | --------------- |
| administration       | Administration & Gestion           | 16                    | 12                                     | 4    | 11      | 61              |
| commerce_marketing   | Commerce, Vente & Marketing        | 8                     | 12                                     | 3    | 8       | 37              |
| finance              | Finance & Comptabilité             | 8                     | 6                                      | 4    | 6       | 61              |
| ingenierie           | Ingénierie & Métiers Techniques    | 6                     | 4                                      | 4    | 6       | 63              |
| ict                  | Technologies de l'Information      | 8                     | 6                                      | 4    | 6       | 49              |
| tourisme             | Tourisme, Hôtellerie & Restauration| 5                     | 3                                      | 3    | 6       | 29              |
| sante                | Santé                              | 8                     | 11                                     | 3    | 6       | 37              |
| social               | Social & Accompagnement            | 12                    | 7                                      | 3    | 8       | 32              |
| education            | Éducation & Formation              | 8                     | 11                                     | 3    | 7       | 46              |
| agriculture          | Agriculture & Agroalimentaire      | 7                     | 11                                     | 4    | 6       | 41              |
| logistique          | Transport & Logistique             | 5                     | 14                                     | 3    | 7       | 37              |

Les colonnes ne se totalisent pas : une même fiche métier compte dans chaque domaine qu'elle touche, et une école, une
formation ou une bourse peut servir plusieurs domaines.

## Les 45 métiers

Une fiche métier se définit par ce qu'elle exige **en même temps** : deux ou trois domaines de cœur, ce qui fait
91 accouplages domaine-métier dans le catalogue. S'y ajoutent 97 accouplages de terrain : les secteurs où le même
métier s'exerce sans en changer.

Les 45 fiches ont toutes au moins une chance réelle derrière elles — une école, une formation ou une bourse que je
peux montrer. 30 fiches appartiennent à un axe, 15 n'en ont encore aucun.

## Les 38 axes

Un axe est une manière d'exercer dans un domaine : « conduire un projet » en administration ne se joue pas comme en
agriculture. Chaque domaine en porte 3 ou 4. Un axe nomme 2 ou 3 métiers et exactement 3 modules.

Les axes sont écrits à la main. Aucun axe n'est déduit automatiquement d'un mot du catalogue, et la vérification le
refuse si un axe revendique un métier ou un module qui n'existe pas.

## Les 51 modules

Le parcours recommandé se construit avec ces briques. 49 se rattachent à au moins un domaine ; 2 sont transversales et
ne servent aucun domaine en particulier — ce sont celles d'employabilité.

## Les 165 chances

95 formations, 36 établissements, 34 bourses. 151 sont réelles et portent une adresse dont le contrôle est daté ; 14
restent du jeu de démonstration, et l'écran les badge « Démo ».

Les 151 dates de contrôle viennent de deux saisies en masse — 74 lignes contrôlées le 21/09/2026, 77 le 22/09/2026. Ce
ne sont pas 151 vérifications une par une, et le dire est important : c'est la tâche S2.6 que de reprendre ces lignes
une à une.

## Le référentiel des 113 spécialisations

Le 3 octobre 2026, j'ai remis une base de nomenclature validée à deux, et elle est entrée dans le dépôt le jour même,
dans `src/data/referentiel.ts`. Elle tient quatre niveaux : 14 domaines, 11 fonctions, 63 métiers génériques et 113
spécialisations. Chaque spécialisation porte sa fiche rédigée — ce qu'elle est, trois ou quatre compétences qu'elle
demande, comment y accéder, et ce qu'on en fait.

Ce référentiel ne porte aucun score. Il nomme et il documente. Le questionnaire, lui, continue de mesurer les 11
domaines de carrière et les six axes de fonction du produit : c'est ce que nous savons mesurer, et un niveau que l'on
ne mesure pas ne peut pas classer quelqu'un.

Trois choses viennent donc de nous, et c'est nous qui les défendons :

- le domaine de carrière qui héberge chacun de ses 14 domaines — deux d'entre eux logent dans notre agriculture, trois
  dans notre ingénierie, et un seul de ces logements est dit approximatif : ses métiers de l'eau, de l'hydrologie et de
  l'assainissement n'ont pas de domaine qui leur soit propre chez nous ;
- la manière dont ses 11 fonctions se répartissent sur nos six axes, avec des poids qui somment à un ;
- le rang de nos 45 fiches sous ses 63 métiers génériques. 23 fiches s'y rangent exactement ; 22 le font par
  approximation, parce que notre fiche est plus étroite ou plus large que le métier générique.

Sur ses 113 spécialisations, 18 se rattachent à un métier générique de façon approximative, et les motifs sont de deux
sortes, à parts égales. Neuf sont des métiers du soin et de l'accompagnement — médecin, infirmier, sage-femme,
kinésithérapeute, travailleur social, éducateur spécialisé, conseiller d'orientation : le métier générique les
englobe sans les contenir. Neuf sont des postes plus récents ou plus spécialisés que lui, de la vente, du numérique, de
la banque et de l'environnement — chef de rayon, responsable e-commerce, growth hacker, chargé de clientèle bancaire,
hydrologue. Le lien sert à la navigation, pas à faire croire que la spécialisation est une sous-catégorie stricte du
métier générique.

Deux lignes sont en désaccord avec leur parent : le chargé de clientèle bancaire et l'agent de microfinance se rangent
sous « chargé de relation client », qui est une fonction de vente, alors qu'elles se déclarent finance. C'est la
fonction de la ligne qui est retenue partout, parce que c'est elle que lit l'écran.

Rien de ce référentiel n'est encore montré à la personne qui passe le test. La vérification, elle, le contrôle déjà :
ses codes, ses liens, ses fiches rédigées et nos trois tables de correspondance.

## Ce que cette fiche ne dit pas

Elle dit ce que le catalogue contient. Elle ne dit pas si le contenu est bon, ni s'il suffit à couvrir les métiers
réellement exercés au Bénin et dans la sous-région. Ces deux questions se traitent ailleurs : la première par les
tests usagers, la seconde par les tâches d'élargissement du backlog.

<!-- COMPTEURS : début — bloc produit par la mesure, à ne pas réécrire à la main -->
questions = 31
questions.bachelier = 30
questions.jeune_diplome = 29
questions.reconversion = 30
questions.professionnel = 29
questions.par.situation.min = 29
questions.par.situation.max = 30
questions.stage.situation = 3
questions.stage.psych = 13
questions.stage.interests = 10
questions.stage.aptitude = 2
questions.stage.constraints = 3
domaines = 11
situations = 4
metiers = 45
metiers.sans.axe = 15
metiers.avec.chance.reelle = 45
axes = 38
axes.par.domaine.min = 3
axes.par.domaine.max = 4
axes.metiers.min = 2
axes.metiers.max = 3
axes.modules.min = 3
axes.modules.max = 3
modules = 51
modules.transversaux = 2
chances = 165
chances.reelles = 151
chances.demo = 14
chances.controlees = 151
chances.avec.url = 151
chances.controlees.2026-09-21 = 68
chances.controlees.2026-09-22 = 77
chances.controlees.2026-10-02 = 6
chances.etablissement = 36
chances.formation = 95
chances.bourse = 34
paires.coeur = 91
paires.terrain = 97
referentiel.domaines = 14
referentiel.fonctions = 11
referentiel.metiers.generiques = 63
referentiel.specialisations = 113
referentiel.specialisations.approximatives = 18
referentiel.fiches.classees = 45
referentiel.fiches.classees.approximatives = 22
<!-- COMPTEURS : fin -->
