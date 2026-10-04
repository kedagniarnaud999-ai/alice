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
| administration       | Administration & Gestion           | 16                    | 12                                     | 4    | 11      | 68              |
| commerce_marketing   | Commerce, Vente & Marketing        | 8                     | 12                                     | 3    | 8       | 45              |
| finance              | Finance & Comptabilité             | 8                     | 6                                      | 4    | 6       | 69              |
| ingenierie           | Ingénierie & Métiers Techniques    | 6                     | 4                                      | 4    | 6       | 71              |
| ict                  | Technologies de l'Information      | 8                     | 6                                      | 4    | 6       | 56              |
| tourisme             | Tourisme, Hôtellerie & Restauration| 5                     | 3                                      | 3    | 6       | 37              |
| sante                | Santé                              | 8                     | 11                                     | 3    | 6       | 46              |
| social               | Social & Accompagnement            | 12                    | 7                                      | 3    | 8       | 40              |
| education            | Éducation & Formation              | 8                     | 11                                     | 3    | 7       | 54              |
| agriculture          | Agriculture & Agroalimentaire      | 7                     | 11                                     | 4    | 6       | 49              |
| logistique          | Transport & Logistique             | 5                     | 14                                     | 3    | 7       | 45              |

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

## Les 173 chances

95 formations, 36 établissements, 42 bourses. Les 159 lignes réelles portent une adresse et un contrôle daté ; 14
restent du jeu de démonstration, et l'écran les badge « Démo ».

Deux lignes de la base que j'ai remise n'y figurent pas : celles de l'office d'échange académique allemand et de
l'agence universitaire de la Francophonie. Leurs sites ne répondaient pas quand j'ai voulu les contrôler, et je
préfère les attendre hors catalogue plutôt que leur donner une date de vérification que je n'ai pas vue passer.

Cinq lignes venues de l'annuaire en sont sorties le 03/10/2026, pour ce seul motif : aucune n'a de page d'organisateur
qui la nomme. La « bourse Afrique subsaharienne » prêtée à une université américaine n'est écrite sur aucune page de
cette université ; la bourse de premier cycle que l'annuaire attribue à une société de production végétale
sud-africaine n'apparaît sur le site d'aucune de ses pages ; le stage de fin d'études d'un institut national de la
statistique dont le site ne rend plus qu'une page vide ; une bourse du Commonwealth que la Nouvelle-Zélande ne donne
qu'aux Îles du Pacifique et au Timor-Leste ; et une bourse de conservation marine dont la seule pièce que j'ai trouvée
est le dossier de candidature d'un cycle clos en 2018.

Les 159 dates de contrôle viennent de quatre saisies : 77 lignes contrôlées le 22/09/2026, 26 le 21/09/2026, 6 le
02/10/2026 et 50 aujourd'hui, le 03/10/2026. Les deux premières sont des saisies en masse : ce ne sont pas 103
vérifications une par une, et le dire est important — c'est la tâche S2.6 que de reprendre ces lignes une à une. Le
lot d'aujourd'hui n'est pas une saisie en masse : j'ai ouvert chaque page l'une après l'autre.

Ce que le 03/10/2026 a changé, précisément. Les 41 liens qui menaient encore au site d'un agrégateur tiers ont été
remplacés par l'adresse de l'organisme qui parle lui-même — l'école, le fonds, le ministère — et vingt-huit lignes
portent maintenant la mention « vérifiée par nous », parce que leur page a écrit le nom cherché. Huit restent comptées
comme reçues et non vérifiées, et je les dis telles quelles : deux domaines répondent sans rien contenir ni nommer
(Obiang Nguema Mbasogo d'un côté, Ajavon Sébastien de l'autre, dont la vitrine écrit un autre nom que le sien), trois
lignes de diplômes mènent à l'accueil de leur école sans que cette page nomme le diplôme, et deux adresses officielles
n'ont pas pu être lues du tout — la banque et l'université oxfordienne refusent l'accès automatisé, elles gardent donc
la date de l'annuaire et non une date d'aujourd'hui.

Trois défauts de forme sont à signaler aux intéressés, pas à corriger chez nous : le certificat de sécurité du site de
l'Institut Supérieur de Management Adonaï est expiré, la vitrine de l'Institut Supérieur des Métiers de l'Audiovisuel
annonce son propre site « en construction », et l'agrégateur avait renommé deux organismes — « Baldwin Foundation »
au lieu de Balwin, « Mineral Qualifications Authority » au lieu de Mining. Les pays affichés ont été repris sur la
même page : quatorze lignes que l'annuaire disaient sans pays sont sud-africaines ou canadiennes, et cela se lit
désormais à l'écran.

Ce que le pays affiché veut dire, précisément. Treize des quarante-deux bourses du catalogue sont des dispositifs
nationaux sud-africains, écrits d'abord pour les ressortissants de l'Afrique du Sud ; la liste officielle des pays
admis que le gouvernement néo-zélandais publie pour Manaaki ne nomme aucun pays d'Afrique, et c'est cette liste que
son lien ouvre. Le pays d'une ligne dit donc où l'offre se déroule, pas à qui elle est ouverte : AliTché montre une
porte et son adresse, il ne promet pas une admission. Rapporter des offres ouvertes aux candidats béninois est le
chantier E2.

## Le référentiel des 113 spécialisations

Le 3 octobre 2026, j'ai remis une base de nomenclature validée à deux, et elle est entrée dans le dépôt le jour même,
dans `src/data/referentiel.ts`. Le 4 octobre, sa version corrigée l'a remplacée. Elle tient quatre niveaux :
14 domaines, 11 fonctions, 84 métiers génériques et 113 spécialisations. Chaque spécialisation porte sa fiche rédigée
— ce qu'elle est, trois ou quatre compétences qu'elle demande, comment y accéder, et ce qu'on en fait.

Ce référentiel ne porte aucun score. Il nomme et il documente. Le questionnaire, lui, continue de mesurer les 11
domaines de carrière et les six axes de fonction du produit : c'est ce que nous savons mesurer, et un niveau que l'on
ne mesure pas ne peut pas classer quelqu'un.

Trois choses viennent donc de nous, et c'est nous qui les défendons :

- le domaine de carrière qui héberge chacun de ses 14 domaines — deux d'entre eux logent dans notre agriculture, trois
  dans notre ingénierie, et un seul de ces logements est dit approximatif : ses métiers de l'eau, de l'hydrologie et de
  l'assainissement n'ont pas de domaine qui leur soit propre chez nous ;
- la manière dont ses 11 fonctions se répartissent sur nos six axes, avec des poids qui somment à un ;
- le rang de nos 45 fiches sous ses 84 métiers génériques. 25 fiches s'y rangent exactement ; 20 le font par
  approximation, parce que notre fiche est plus étroite ou plus large que le métier générique.

Chaque spécialisation nomme maintenant elle-même son métier générique : le lien n'est plus une supposition de ma part,
et il n'y a plus de drapeau d'approximation ligne à ligne. La nuance qu'il introduit est ailleurs, et elle est
intéressante : sur ses 84 métiers génériques, 38 ne servent qu'un seul domaine — le « Technicien agricole » n'existe
que pour l'agriculture — et 46 restent transversaux, partagés entre tous les domaines. Ses deux lignes qui étaient en
désaccord avec leur parent, le chargé de clientèle bancaire et l'agent de microfinance, sont reclassées : elles
déclarent désormais la fonction de leur parent, comme tout le monde.

Ses 113 spécialisations ne restent pas dans le fichier : elles se lisent à l'écran, sous chaque fiche, dans une liste
dépliable qui dit « les postes que ce métier recouvre ». Ce sont les titres tels qu'on les trouve sur une offre d'emploi
— gouvernante, chef de chantier, responsable e-commerce. Ils renseignent, ils ne se choisissent pas à la place du
métier : la sélection reste le domaine, la fonction, le métier, l'axe. 42 de nos 45 fiches portent au moins un titre ;
les trois autres se rangent sous un de ses métiers génériques qui ne spécialise encore rien dans sa base — directeur
administratif et financier, et les deux fiches qui se logent sous « responsable formation professionnelle ».

Le métier générique qui range une fiche est souvent un niveau, pas une famille : le même rang se retrouve devant des
fiches qui n'ont rien de commun. Sans tri, toutes ces fiches afficheraient la même liste, y compris des titres qui ne
sont pas des leurs. Un titre ne descend donc sur une fiche que si le domaine qu'il déclare est un domaine que cette
fiche ouvre : 52 de ses 113 titres atteignent l'écran, en 83 lignes, parce qu'un même titre peut rester sous plusieurs
fiches. Les 61 autres n'y sont pas : soit aucune de nos fiches ne se range sous le métier générique qui les porte, soit
le domaine qu'ils déclarent n'est ouvert par aucune fiche de ce rang. La correspondance est incomplète, pas la base.
Le tri raccourcit 9 fiches ; sur 5 autres il ne laisse plus aucun titre, et là je garde le rang entier plutôt que de
faire croire qu'une fiche n'ouvre rien — la liste vient du seau, et elle est dite en approximation.

Le doute qui reste est le mien, et il descend jusqu'à l'écran une seule fois par fiche : quand son rang dans sa
nomenclature est défendable et non strict, ou quand sa liste vient du rang entier faute de domaine commun, la liste le
déclare en une phrase sous les titres, au lieu de porter un avertissement ligne à ligne. Cela concerne 21 de nos 42
fiches affichées ; les postes qu'elles ouvrent, eux, sont nommés par sa base, pas par moi.

Changer ce que l'on montre a changé une règle. Une fonction qui n'ouvrait qu'un seul métier du domaine était tenue pour
un cul-de-sac et ne se recommandait pas. C'était exact tant que le métier était la dernière marche à choisir ; ça ne
l'est plus depuis qu'il ouvre des titres. La règle dit maintenant ce que la personne voit : un métier seul cesse d'être
un cul-de-sac dès qu'il reste deux postes ou plus à choisir derrière lui. Sur les 66 rangements d'une fonction sous un
domaine, 60 passaient avant les titres, 63 dès qu'ils se sont mis à en ouvrir, ils sont 62 depuis que les listes se
trient — le tri en ferme un de plus. Les quatre qui restent fermés le sont pour de vraies raisons : la fonction de
conception ne s'appuie sur aucun métier du domaine en ingénierie, et n'en ouvre qu'un seul en santé, en social et en
logistique, avec un seul titre derrière lui, donc rien à choisir.

Rien de tout cela n'est trié à la main sans contrôle : `src/checks/contenu.check.ts` relit le référentiel — ses codes,
ses liens, ses fiches rédigées, nos trois tables de correspondance — et recalcule ce que la liste lue à l'écran,
`src/data/postesNommes.ts`, devrait donner une fois triée par domaine, rang entier compris quand le tri ne laisse rien.
Si les deux diffèrent, le contrôle rougit.

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
chances = 173
chances.reelles = 159
chances.demo = 14
chances.controlees = 159
chances.avec.url = 159
chances.controlees.2026-09-21 = 26
chances.controlees.2026-09-22 = 77
chances.controlees.2026-10-02 = 6
chances.controlees.2026-10-03 = 50
chances.etablissement = 36
chances.formation = 95
chances.bourse = 42
paires.coeur = 91
paires.terrain = 97
referentiel.domaines = 14
referentiel.fonctions = 11
referentiel.metiers.generiques = 84
referentiel.metiers.generiques.transversaux = 46
referentiel.metiers.generiques.qualifies.par.domaine = 38
referentiel.specialisations = 113
referentiel.fiches.classees = 45
referentiel.fiches.classees.approximatives = 20
<!-- COMPTEURS : fin -->
