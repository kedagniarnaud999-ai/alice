# Les dix modules d'AliTché, et ce que le code fait vraiment

Demain je construis, dans ClickUp, un dossier par module de mon chapitre 7, et dans chaque dossier une tâche par
fonctionnalité, avec un statut « achevé » pour ce qui est vraiment développé. Ce fichier est la liste que j'y pose.
ClickUp n'est qu'un miroir : le texte qui fait foi est ici, et ce qui tranche est le dépôt.

Rien dans ce fichier n'est sorti de mon imagination. Chaque ligne d'un tableau reprend une demande écrite de mes
mains dans `docs/CADRAGE-PRODUIT.md`, chapitre 7, parfois mot pour mot. Je n'ajoute qu'une chose : l'état réel,
fonctionnalité par fonctionnalité. Tout a été relu dans le code le 23/09/2026, et les chiffres sont comptés le même
soir : **51** modules de formation au catalogue, **11** domaines de carrière, **31** questions, **4** situations de
départ, **45** métiers documentés, **165** lignes d'écoles, de formations et de bourses. Les quatre premiers sont
les nombres que rendent les deux contrôles du dépôt (`npm run verify`) ; les deux derniers, je les ai comptés dans
leurs fichiers, `src/data/occupations.ts` et `src/data/opportunities.ts`. Partout ailleurs j'écris un nombre, je dis
où je l'ai compté.

Trois états, pas un de plus :

* **Développé** — c'est dans le code, et cela s'affiche à l'écran. Je l'ai vu.
* **Engagé** — le travail est commencé et tenu, mais une pièce manque. J'écris laquelle.
* **Absent** — il n'y a rien dans le code. J'écris ce qui manque.

Le mot « presque » ne m'est pas ouvert. La suite du travail est numérotée dans `docs/BACKLOG.md` (`S3.1`, `S4.4`…),
et les neuf points où mon cadrage et le produit ne disent pas la même chose sont dans
`docs/ECARTS-PRODUIT-CODE.md`.

---

## Module 1 — Orientation

J'en attends le point d'entrée d'AliTché : qu'un candidat reparte d'ici avec un profil qu'il comprend et une
direction qu'on lui justifie.

| Fonctionnalité (telle que je la demande) | État | Où ça se trouve, et ce qui manque |
|---|---|---|
| Répondre au questionnaire | **Développé** | 31 questions écrites dans `src/data/questions.ts`, posées une par une par `src/components/test/TestFlow.tsx`. Un candidat n'en voit pas 31 : il en voit 29 ou 30 selon sa situation de départ, et ce nombre est calculé à l'écran d'accueil du test (`src/components/test/WelcomeScreen.tsx:33`) au lieu d'être annoncé au hasard. |
| Analyser son profil | **Développé** | `src/utils/testAnalyzer.ts` : le score de chaque domaine de carrière combine 70 % de signal fonctionnel et 30 % de signal psychologique (`src/utils/testAnalyzer.ts:31`), la part purement déclarative est bornée à 15 %, et une capacité déjà saturée fait baisser le résultat (`src/utils/testAnalyzer.ts:511`). |
| Comprendre ses caractéristiques | **Développé** | `src/components/results/ResultsDashboard.tsx` : « Vos talents naturels » (`:145`), « Ce qui vous motive » (`:165`), « Vos centres d'intérêt principaux » (`:185`), « Votre position actuelle » (`:219`) et « Faisabilité » (`:234`), chaque carte écrite en phrases à partir des réponses. |
| Identifier des domaines cohérents avec son profil | **Développé** | Classement des 11 domaines de carrière de `src/data/domains.ts`, affiché par `DomainRanking` (`src/components/results/ResultsDashboard.tsx:304`). Les domaines que le candidat a écartés restent à l'écran, marqués « Écartés par vous » (`src/components/results/ResultsDashboard.tsx:365`). |
| Recevoir des recommandations | **Développé** | Jusqu'à 3 fiches de métier sur les 45 de `src/data/occupations.ts`, dans `src/components/results/OccupationResults.tsx`, chacune avec son terrain le plus porteur, ses voies de formation et les offres réelles reliées à ce métier. |
| Comprendre pourquoi certaines recommandations sont proposées | **Développé** | Trois raisons au plus par domaine de carrière (`src/utils/testAnalyzer.ts:384`), écrites à partir des réponses elles-mêmes, et affichées sur la fiche du domaine (`src/components/results/DomainDetail.tsx:116`). |
| Conserver les résultats dans son profil | **Engagé** | Le résultat est bien écrit et bien relu : `saveProfile` (`src/services/profile.api.ts:20`), relu à l'ouverture de l'espace (`src/App.tsx:196`). Deux pièces manquent. D'un côté le barème : dès que sa version change, `src/utils/profileResult.ts:43` répond « aucun résultat » et le candidat doit refaire ses 31 questions. De l'autre la feuille de réponses : elle est rangée dans sa propre table et relue nulle part (`src/services/profile.api.ts:72`) — c'est la tâche S4.1. |
| « Le questionnaire comporte actuellement 6 dimensions » | **Engagé** | Cinq groupes sont construits, pas six : situation (`src/data/questions.ts:28`), profil (`:97`), centres d'intérêt (`:337`), aptitudes (`:545`), contraintes (`:586`). Mes six dimensions sont toutes couvertes, mais motivations et talents naturels tombent dans un seul groupe, et le groupe des contraintes n'existe pas dans ma liste. Point 1 de `docs/ECARTS-PRODUIT-CODE.md`, ma réponse n'y est pas encore écrite. |

Ce module est le plus avancé des dix, et c'est justement son piège : un candidat qui le traverse voit un résultat
complet et en déduit qu'AliTché conserve son histoire. Ce n'est pas ce que fait le code — l'analyse est bonne, la
mémoire est mince. Et « comprendre pourquoi » tient sur trois raisons par domaine : c'est peu, mais c'est vrai, et
c'est la seule partie du produit où une recommandation se justifie devant quelqu'un.

---

## Module 2 — Profil utilisateur

J'en attends qu'il grandisse avec la personne au lieu de rester une fiche figée.

| Fonctionnalité (telle que je la demande) | État | Où ça se trouve, et ce qui manque |
|---|---|---|
| Informations personnelles | **Développé** | `src/pages/ProfileSettings.tsx` : un seul champ se corrige, « Nom complet » (`:69`, saisie `:73`) ; l'adresse électronique (`:86`) et le rôle (`:95`) s'affichent sans qu'on puisse y toucher, et la photo se remplace (`:48`). C'est le seul écran de saisie du profil, et il ne contient que cela. |
| Parcours académique | **Absent** | Rien ne le demande et rien ne le range. Aucun champ, aucune donnée, aucun écran. |
| Formations | **Absent** | Les 51 modules du catalogue sont des formations qu'AliTché propose, pas des formations que la personne a suivies. La distinction n'existe nulle part dans le code. |
| Expériences | **Absent** | Aucun écran, aucun champ. Une personne qui a travaillé cinq ans n'a aucun endroit où le dire. |
| Compétences | **Absent** | Les compétences existent dans le produit, mais portées par les modules en libellés libres, jamais par la personne. Tâche S4.4 du backlog. |
| Intérêts | **Engagé** | Les 10 questions d'intérêt (`src/data/questions.ts:337`) produisent un classement affiché et sauvegardé avec le résultat. Ce qui manque : la personne ne peut ni le consulter isolément ni le corriger — ces intérêts ne vivent que dans le compte-rendu de l'orientation. |
| Résultats d'orientation | **Développé** | Le compte-rendu complet est rangé avec le profil et relu à la connexion (`src/services/profile.api.ts:42`). Même réserve qu'au point 7 du module 1 : ce résultat ne survit pas à un changement de barème. |
| Certifications | **Absent** | Aucun endroit où les inscrire. |
| Réalisations | **Absent** | Aucun endroit où les inscrire. |
| Objectifs | **Absent** | Le domaine de carrière visé et le métier visé sont bien gardés, mais ce ne sont pas des objectifs écrits par la personne ; elle n'en formule aucun. |
| Projet professionnel | **Engagé** | Le ciblage est choisi puis sauvegardé (`src/App.tsx:346`) et revalidé à chaque ouverture contre le catalogue du jour (`src/utils/profileResult.ts:96`). Ce qui manque : rien de ce que demande mon module 6 — secteur, compétences nécessaires, expériences à acquérir — n'est attaché à ce projet. |
| Progression | **Développé** | `src/services/module.api.ts` relit l'avancement par module, et `src/components/dashboard/Dashboard.tsx:111` l'affiche en pourcentage de modules terminés. |
| « Le profil devient une identité numérique académique et professionnelle évolutive » | **Absent** | Le produit ne range la personne que dans trois endroits : qui elle est, ce qu'elle a répondu, où elle en est de ses modules. Une identité académique et professionnelle demande au moins six des douze lignes ci-dessus, et aucune n'est écrite. |

Sur douze choses que je demande, deux sont faites et une seule est à moitié faite. C'est l'écart le plus large du
produit, et il explique la moitié des modules suivants : sans parcours, sans expériences et sans compétences tenues
par la personne, il n'y a rien à comparer, rien à valider et rien à exposer.

---

## Module 3 — Parcours

J'en attends que la personne sache, en regardant une fois, où elle en est et ce qu'elle fait ensuite.

| Fonctionnalité (telle que je la demande) | État | Où ça se trouve, et ce qui manque |
|---|---|---|
| Où suis-je ? | **Développé** | `src/components/dashboard/Dashboard.tsx:157` : la lecture du profil et la situation de départ s'affichent sur la première carte de l'espace. |
| Qu'ai-je déjà accompli ? | **Développé** | `src/components/dashboard/Dashboard.tsx:111` : le nombre de modules terminés sur le total du parcours, en pourcentage et en fraction (`:184`). C'est étroit — tout ce que le produit tient pour « accompli », c'est ce que la personne a déclaré elle-même. |
| Qu'ai-je validé ? | **Absent** | Rien n'est validé nulle part. « Terminer le module » (`src/components/pathway/PathwayView.tsx:477`) est un clic sur soi-même ; aucune note, aucune vérification, aucune attestation ne vient derrière. |
| Qu'est-ce qu'il me reste à faire ? | **Développé** | Le parcours est écrit module par module, avec son état d'avancement et le compteur en fractions (`src/components/pathway/PathwayView.tsx:335`). |
| Quelle est ma prochaine étape ? | **Développé** | La carte des gains rapides (`src/components/pathway/PathwayView.tsx:91`) place en tête du parcours les modules les plus courts à fermer, bouton « Commencer » à l'appui (`:273`). |
| Pourquoi cette étape est-elle recommandée ? | **Absent** | L'ordre des modules est pourtant calculé, en comptant combien de compétences du métier visé chaque module apporte (`src/utils/pathwayEngine.ts:128`) — et ce calcul n'est jamais dit. Sur les neuf écrans après connexion, aucune phrase n'explique pourquoi un module est là plutôt qu'un autre. |
| « Orientation → Formation → Compétences → Expérience → Insertion → Évolution » | **Engagé** | Les deux premiers maillons tiennent : l'orientation débouche sur un parcours de formation. Les quatre autres n'ont aucune donnée derrière eux. Et la colonne « Jalons de progression » (`src/components/pathway/PathwayView.tsx:163`) est écrite une fois pour toutes : la fabrication des jalons ne reçoit rien en entrée (`src/utils/pathwayEngine.ts:330`), donc les trois mêmes jalons s'affichent pour tout le monde, avec des critères qu'AliTché ne peut pas observer — « Profil complété à 100 % », « Participation à la communauté », « CV et profil LinkedIn optimisés ». |

Deux pièges relevés dans ce module, et corrigés le 23/09 au soir. Le premier était le plus grave du fichier : la
phrase « Choisir et intégrer une filière alignée sur votre domaine prioritaire » s'affiche sous « Objectifs long
terme » (`src/components/pathway/PathwayView.tsx:144`) alors que j'ai exclu ce mot de notre vocabulaire ; elle est
écrite dans le moteur de parcours (`src/utils/pathwayEngine.ts:307`) et se voyait en ligne depuis le 23/09. Le mot
« formation » le remplace, et le contrôle qui interdisait déjà « filière » dans la phrase de profil l'interdit
désormais aussi dans les objectifs du parcours — le texte ne peut plus revenir sans que `npm run verify` le refuse.
Le second : quatre titres d'écran avaient perdu leurs accents, « Quick wins - Demarrez maintenant », « Modules
termines », « Aucun profil trouve », « Gerez votre parcours ». Ils sont remis au français, et le titre anglais
s'écrit maintenant « Gains rapides », comme ce fichier l'appelle.

---

## Module 4 — Formation / Apprentissage

J'en attends que le parcours promis se suive quelque part, et que la fin d'un module se sache.

| Fonctionnalité (telle que je la demande) | État | Où ça se trouve, et ce qui manque |
|---|---|---|
| Cours | **Absent** | Ouvrir un module affiche quatre phrases fabriquées à partir de son titre (`src/components/pathway/PathwayView.tsx:420`), présentées sous « Étapes conseillées » (`:493`). Il n'y a pas de cours derrière. |
| Ressources | **Absent** | La fiche d'un module ne tient que sur dix champs (`src/data/modules.ts:6`) : un identifiant, un titre, une description, une durée, un niveau, une catégorie, des compétences, un format, une gratuité, des domaines. Aucun de ces dix ne porte une ressource ni une adresse. |
| Vidéos | **Absent** | Le format « Vidéo » existe comme étiquette (`src/data/modules.ts:31`) et s'affiche sur la carte du module. Rien ne se lit. |
| Exercices | **Absent** | Aucun champ, aucun écran, aucune donnée. |
| Évaluations | **Absent** | Rien ne mesure ce qui a été compris. Le module 9 y était réservé, il n'a pas commencé. |
| Progression | **Développé** | Trois boutons la font avancer : démarrer à 10 %, « Marquer une avancée » qui ajoute 25 % et s'arrête à 90 % (`src/components/pathway/PathwayView.tsx:470`), terminer à 100 % (`:477`). Le chiffre est conservé et relu pour chaque personne (`src/services/module.api.ts`). |
| Validation | **Absent** | Le 100 % vient d'un clic, jamais d'une vérification. Ma chaîne « formation suivie → compétence développée → compétence validée » échoue dès son deuxième maillon. |
| Compétences associées | **Développé** | Les 51 modules portent une liste de compétences, sans exception, et c'est cette liste qui décide de l'ordre du parcours (`src/utils/pathwayEngine.ts:128`). Ce qui manque n'est pas l'association mais la nature des compétences : des libellés libres, pas des éléments que le produit peut compter ni valider. |

La décision du 23/09/2026 est claire — AliTché oriente, il n'héberge pas — et l'absence de cours est donc un choix
assumé, pas un trou. Ce qui ne l'est pas : l'écran est écrit comme si le cours était donné, et il annonce une durée
en semaines calculée sur les modules (`src/components/pathway/PathwayView.tsx:316`). C'est exactement la tâche S5.1,
et sa sœur S5.2, qui veut que chaque module renvoie vers une formation qui existe.

---

## Module 5 — Compétences

J'en attends le cœur du produit : pouvoir dire à quelqu'un ce qu'il sait déjà, ce qui lui manque, et comment le
combler.

| Fonctionnalité (telle que je la demande) | État | Où ça se trouve, et ce qui manque |
|---|---|---|
| Identifier les compétences | **Engagé** | Le produit en connaît beaucoup, et ne les compte pas. Les 51 modules portent 198 mentions de compétences, qui se ramènent à 179 libellés écrits à la main, dont 12 répétés (« Communication » quatre fois, « Écoute Active » quatre fois, « Secret professionnel » trois fois). Les 45 fiches de métier portent 240 mentions pour 116 libellés, dont 57 répétés. Ce qui manque : une compétence n'est pas une donnée — pas d'identifiant, rien où l'accrocher, donc aucun niveau à y raccorder. |
| Associer les compétences aux formations | **Développé** | Les 51 modules portent leur liste de compétences, et c'est elle qui classe les modules entre eux (`src/utils/pathwayEngine.ts:128`). |
| Associer les compétences aux expériences | **Absent** | Cette association suppose le module 2, et le module 2 n'a pas d'expériences à associer. |
| Suivre leur niveau | **Absent** | Aucun niveau n'est tenu pour une personne. Le seul mot de niveau dans le produit qualifie le module (« Débutant », « Intermédiaire », « Avancé », `src/data/modules.ts:24`), jamais celui ou celle qui le suit. |
| Valider certaines compétences | **Absent** | Rien ne se valide. C'est la même absence qu'au « Qu'ai-je validé ? » du module 3 et à la « validation » du module 4, vue trois fois dans ce fichier. |
| Identifier les compétences à développer | **Développé** | Le calcul est fait et affiché : les compétences de la fiche de métier sont comparées à celles que le parcours apporte déjà, et le reste est écrit sous « Compétences à développer : » (`src/components/results/OccupationResults.tsx:191`, affiché `:241`). |
| Recommander des formations ou activités | **Développé** | La recommandation est bien guidée par les compétences : un module est choisi selon combien de compétences du métier visé il couvre (`src/utils/pathwayEngine.ts:128`). Ce qui manque est plus grave qu'un retard : l'écart affiché à l'écran se définit comme ce que les cinq modules choisis ne couvrent pas (`src/components/results/OccupationResults.tsx:192`). Le parcours montre donc des manques qu'il ne peut pas, par construction, refermer. |
| « Comparer profil actuel ↔ profil cible » | **Développé** | C'est exactement ce que fait la comparaison `couvert` / `gaps` (`src/components/results/OccupationResults.tsx:191`). Une seule réserve de taille : elle n'existe que sur l'écran des résultats, jamais dans le parcours, et le profil actuel est celui de l'orientation, pas celui de la personne — faute de module 2. |

Ce module est le plus trompeur des dix. Il donne l'impression d'être avancé parce que le mot « compétences » est
partout dans le produit — et il est partout, en effet, mais toujours comme du texte collé dans une fiche. Une
compétence que rien n'identifie ne peut ni se niveler, ni se valider, ni se comparer à un objectif : c'est le sens de
la tâche S4.4.

---

## Module 6 — Projet professionnel

J'en attends que la personne écrive elle-même où elle va, et que le produit s'y range.

| Fonctionnalité (telle que je la demande) | État | Où ça se trouve, et ce qui manque |
|---|---|---|
| Son objectif professionnel | **Engagé** | Un objectif est bien choisi et gardé : le domaine de carrière, puis la fiche de métier visée, écrits dans le profil (`src/App.tsx:346`, `src/services/profile.api.ts:20`). Ce qui manque : la personne ne l'écrit pas. Elle clique une proposition, et le produit appelle cela un projet. |
| Le secteur ciblé | **Absent** | Aucun champ ne le demande. Le produit calcule bien un « terrain le plus porteur pour vous » (`src/components/results/OccupationResults.tsx:229`), mais c'est une déduction de sa part, pas un ciblage de la mienne. |
| Les métiers envisagés | **Développé** | Trois fiches au plus sont posées à l'écran (`src/components/results/OccupationResults.tsx:94`), et le choix de l'une d'elles remplace le ciblage précédent (`src/App.tsx:309`). |
| Les compétences nécessaires | **Développé** | Chaque fiche de métier porte sa liste de compétences dans `src/data/occupations.ts`, et elle est affichée sur sa carte. |
| Les formations pertinentes | **Développé** | Deux niveaux sur la même carte : « Voies de formation » issues de la fiche (`src/components/results/OccupationResults.tsx:245`), puis « Où se former, comment financer » avec jusqu'à quatre offres réelles reliées à ce métier (`:251`). |
| Les expériences à acquérir | **Absent** | Le produit ne sait ni ce qui a été vécu, ni ce qu'il faudrait vivre. Rien n'est proposé, parce que rien ne se garde. |
| Les prochaines étapes | **Développé** | Le parcours est composé de cinq modules classés dans un ordre (`src/utils/pathwayEngine.ts:35`), et chacun s'ouvre depuis la fiche du métier visé. |
| « Le projet doit être dynamique, il peut évoluer avec le temps » | **Développé** | Le ciblage se reprend à tout moment et se remplace (`src/App.tsx:309`), et il est revalidé contre le catalogue du jour à chaque ouverture, pour qu'un métier retiré ne continue pas de hanter un profil (`src/utils/profileResult.ts:96`). Une limite : l'historique n'existe pas. Un projet chassé par un autre ne laisse aucune trace, et personne ne voit le chemin qu'il a déjà pris. |

La décision à prendre ici est simple et je ne l'ai pas encore écrite : est-ce qu'un projet professionnel se déclare,
ou se déduit ? Le produit a tranché pour la déduction, et c'est défendable — mais alors les quatre lignes manquantes
de ce module ne sont pas des retards, ce sont des demandes que je n'ai pas voulu poser à l'écran.

---

## Module 7 — Opportunités

J'en attends qu'AliTché sache dire où aller, et que cela suive la personne plutôt que le catalogue.

| Fonctionnalité (telle que je la demande) | État | Où ça se trouve, et ce qui manque |
|---|---|---|
| Stages | **Absent** | Le catalogue des opportunités ne connaît que trois familles (`src/data/opportunities.ts`) : formation, établissement, bourse. Le stage n'existe ni comme famille, ni comme donnée. |
| Emplois | **Absent** | Rien. Aucune offre d'emploi, aucun champ, aucun écran. |
| Formations | **Développé** | 95 des 165 lignes du catalogue sont des formations, reliées aux fiches de métier et aux domaines de carrière. |
| Programmes | **Absent** | Pas de famille « programme ». Une partie de ce qui en serait un est rangée sous « formation » sans qu'on puisse les distinguer. |
| Bourses | **Développé** | 34 lignes, affichées sous le même toit que les formations et les établissements. |
| Événements | **Absent** | Rien. |
| Missions | **Absent** | Rien. |
| Opportunités professionnelles | **Absent** | Rien de nommé ainsi, et rien qui s'en rapproche hors les trois familles existantes. |
| « Profil → compétences → objectif → opportunités pertinentes » | **Engagé** | Le dernier maillon est réel et le premier n'existe pas : les offres sont accrochées à une fiche de métier ou à un domaine de carrière (`src/components/results/OccupationResults.tsx:251`, `src/components/results/DomainDetail.tsx:24`), jamais filtrées par ce que sait la personne ni par son objectif. Le produit ne connaît que deux endroits où montrer ces 165 lignes, et aucun écran ne les parcourt : on n'y accède qu'en passant par un métier ou un domaine. |

Sur huit familles que je demande, trois existent, et une de celles qui existent n'est pas de ma liste : 36 lignes sont
des établissements. Sur les 165 lignes, 15 portent la mention « démo » et 14 en portent la trace dans leur identifiant.
Leur date de vérification ne dit pas ce qu'elle laisse croire — 151 lignes en portent une, mais en deux lots seulement,
74 datées du 21/09/2026 et 77 du 22/09/2026, et 50 d'entre elles renvoient vers un annuaire d'écoles plutôt que vers
l'école : c'est le point 9 de `docs/ECARTS-PRODUIT-CODE.md`, et ce n'est toujours pas réglé.

---

## Module 8 — Profil professionnel / Portfolio

J'en attends qu'un parcours tienne en une présentation que l'on puisse montrer à quelqu'un qui ne connaît pas
AliTché.

| Fonctionnalité (telle que je la demande) | État | Où ça se trouve, et ce qui manque |
|---|---|---|
| Transformer son parcours en une présentation professionnelle | **Engagé** | Un menu de sortie existe sur l'écran des résultats : « Imprimer » (`src/components/results/ExportMenu.tsx:12`), « Télécharger » un fichier texte construit ligne à ligne (`:74`), « Partager » (`:112`). Ce qui manque : ce sont les trois boutons d'un compte-rendu d'orientation, pas d'un parcours professionnel — et il n'y a pas de parcours à présenter, faute des modules 2 et 5. |
| Formation | **Absent** | Rien à exposer : la personne n'a déclaré aucune formation (`src/pages/ProfileSettings.tsx`). |
| Expériences | **Absent** | Rien à exposer, aucune saisie quelque part dans le produit. |
| Compétences | **Absent** | Les compétences que la personne verrait ici seraient celles de son parcours proposé, pas celles qu'elle a. |
| Certifications | **Absent** | Aucune donnée, aucun écran. |
| Projets | **Absent** | Les fiches de métier décrivent des projets de domaine, jamais un projet fait par la personne. |
| Réalisations | **Absent** | Aucune donnée, aucun écran. |
| Portfolio | **Absent** | Pas d'écran, pas d'adresse qui lui soit propre, pas de donnée. Aucun des neuf écrans après connexion n'est un portfolio (leur liste tient en dix entrées, `src/App.tsx:31`). |
| Objectifs professionnels | **Engagé** | La donnée existe, choisie et gardée (`src/App.tsx:346`) ; elle n'est présentée nulle part comme un objectif, seulement comme le point de départ d'un parcours. |
| « L'utilisateur garde le contrôle sur ce qui est visible » | **Absent** | Ce contrôle suppose quelque chose de publié. Rien n'est publié, et le mot même de visibilité n'apparaît dans aucun fichier du produit. Le seul geste qui y ressemble est le bouton « Partager », et il copie l'adresse de l'écran (`src/components/results/ExportMenu.tsx:29`) — or cette adresse est `/app` pour les neuf écrans (`src/App.tsx:47`), derrière une connexion : le lien envoyé ne porte rien, et ne peut donc pas non plus être retiré. C'est la tâche S3.5. |

Trois détails à ne pas manquer quand ce module s'ouvrira. Le partage est annoncé comme un contrôle alors qu'il ne
montre rien. Le site public propose une rubrique « Légal » dont les trois boutons — Mentions légales,
Confidentialité, Conditions d'utilisation — n'ont aucune destination (`src/components/home/HomePage.tsx:226`, fabriqués
`src/components/home/HomePage.tsx:284`) : un visiteur qui clique n'obtient rien, et il n'y a donc pas non plus de page
où la règle de visibilité serait écrite. Et « Progression visible » est affiché sur la page d'accueil
(`src/components/home/HomePage.tsx:105`) comme un avantage d'AliTché.

---

## Module 9 — Évaluations et examens

J'en attends, plus tard, qu'une personne soit évaluée par quelqu'un d'autre qu'elle-même — et j'ai écrit moi-même que
ce module appartenait à une phase ultérieure.

| Fonctionnalité (telle que je la demande) | État | Où ça se trouve, et ce qui manque |
|---|---|---|
| Examens | **Absent** | Rien. Aucun écran, aucune donnée, aucune durée, aucune session. |
| Tests | **Absent** | Le produit ne connaît qu'un questionnaire, celui de l'orientation, 31 questions (`src/data/questions.ts:23`). Il mesure un profil, pas un savoir, et il ne se repasse pas. |
| Évaluations | **Absent** | Aucune note n'est attribuée à personne. Le pourcentage affiché sur un module vient d'un clic de la personne (`src/components/pathway/PathwayView.tsx:470`). |
| Notation | **Absent** | Aucun barème, aucune échelle, aucun correcteur. |
| Validation de compétences | **Absent** | La troisième fois dans ce fichier, et c'est la même cause : rien ne vérifie, donc rien ne valide. |
| Suivi des résultats | **Absent** | Ce qui est suivi, c'est l'avancement déclaré, conservé par module (`src/services/module.api.ts`). Aucun résultat n'existe à suivre. |
| « Reliée au parcours académique pour les établissements » | **Absent** | Il n'y a ni parcours académique (module 2), ni compte d'établissement : le rôle de tout le monde est écrit « USER » à l'inscription (`src/services/auth.api.ts:54`, `:199`), et l'écran de profil l'affiche sans permettre de le changer (`src/pages/ProfileSettings.tsx:95`). |

Les sept absences de ce module ne coûtent rien aujourd'hui, parce que je les ai voulues. La seule décision qu'il me
reste à prendre est de savoir si AliTché reste celui qui note — auquel cas le module 9 est une suite du module 5 — ou
si une école note à travers lui, ce qui suppose d'abord un compte qui ne soit pas « USER » pour tout le monde.

---

## Module 10 — Suivi de l'employé

J'en attends, très loin, qu'une entreprise suive une personne déjà recrutée — et j'ai écrit que ce module ne devait
pas être développé maintenant sans une décision explicite de moi.

| Fonctionnalité (telle que je la demande) | État | Où ça se trouve, et ce qui manque |
|---|---|---|
| Suivre les compétences | **Absent** | Le suivi des compétences n'existe pas pour la personne elle-même (module 5), donc pas pour une entreprise. |
| Identifier les besoins de formation | **Absent** | Rien ne rapproche un poste tenu d'un besoin de formation. Le moteur de parcours ne sait viser qu'un métier à partir d'un profil d'orientation. |
| Définir des objectifs | **Absent** | Aucun objectif ne se saisit (module 6), et aucun tiers ne peut en fixer un. |
| Suivre les évaluations | **Absent** | Le module 9 n'a pas commencé. |
| Accompagner l'évolution professionnelle | **Absent** | La chaîne « Recrutement → Intégration → Évaluation → Formation → Développement → Évolution » n'a pas son premier maillon : AliTché ne sait pas qu'une personne a été recrutée. |
| « Ne doit pas être développée maintenant sauf décision explicite » | **Absent** | Rien, et c'est conforme à ma consigne : aucun commencement de compte d'entreprise, aucun écran, rien de rangé de ce côté-là. Le modèle de données du serveur mis de côté (`backend/prisma/schema.prisma`) n'en garde pas non plus la trace. |

Ce module ne demande aucune carte dans ClickUp avant que je décide de l'ouvrir. Je le liste quand même, pour une
raison : son absence est la seule des dix à être un choix et non un retard, et il faut que cela se voie.

---
## Ce que ce fichier change dans ClickUp

Dix dossiers, un par module, nommés comme mon chapitre 7. Une tâche par ligne de tableau, dans l'ordre du
tableau, et le même libellé que la colonne de gauche — c'est ma plume, elle ne se réécrit pas.

Le statut « achevé » va sur les 26 lignes marquées **Développé**. Les 10 lignes **Engagé** et les 48 lignes
**Absent** restent ouvertes, et la description de la carte reporte l'adresse « où ça se trouve » de la troisième
colonne : une carte sans preuve en face n'est pas une carte, c'est un souhait. Total : 84 fonctionnalités comptées
ce soir, dont 26 faites.

Le dépôt décide, ClickUp reflète. Une carte ne se ferme pas parce qu'elle est cochée là-bas ; elle se ferme quand sa
ligne passe à **Développé** ici, et quand un écran ou un fichier le montre.

Ce qui reste à trancher avant de copier ce fichier là-bas, à écrire à la place de mes réserves :

- Les lignes d'un même module portent-elles un sous-dossier chacune, ou reste-t-on à plat sur 84 cartes ?
- Le module 10 : dossier vide avec une seule carte « ne pas développer maintenant », ou pas de dossier du tout ?
- Les trois écrans du produit qui ne demandent rien à personne — la page d'accueil et ses boutons sans destination,
  l'écran « Lien traité » que le courriel n'atteint jamais, et l'essai sans compte qui ne débouche pas sur un parcours
  — méritent-ils une carte chacun dans le module où ils se trouvent ?
