# AliTché — le travail à faire

**Document de référence :** `docs/CADRAGE-PRODUIT.md`, remis par le fondateur le 2026-09-23.
Ce backlog en est la déclinaison. Il remplace tout ce qui a été écrit avant : l'ancienne documentation est
rangée dans `docs/hors-usage-2026-09-23/`, rien n'a été supprimé.

**Où lire quoi.** `docs/CADRAGE-PRODUIT.md` : ce qu'AliTché doit être, écrit par le fondateur. Ce fichier : le
travail à faire, dans l'ordre. `docs/ECARTS-PRODUIT-CODE.md` : les neuf points où les deux ne disent pas la
même chose, et qui attendent une réponse. Trois documents plus anciens que le cadrage sont restés en place
(`Ali_Ce_Product_Overview_Public.md`, `PRD_Ali_Ce_Private.md`, `PRD_Ali_Ce_Private.html`) : ils sont conservés
comme traces, et en cas de désaccord avec le cadrage, c'est le cadrage qui a raison.

## Comment lire une tâche

Chaque tâche dit cinq choses, en français :

- **Ce que ça change pour l'utilisateur** — ce qu'il verra, ou ne verra plus.
- **Pourquoi maintenant** — le lien avec une priorité du document de cadrage.
- **Comment on saura que c'est fini** — une liste courte, vérifiable à la main, sans discussion.
- **Taille** — une journée, trois jours, une semaine. C'est un ordre de grandeur, pas un engagement.
- **Où ça se joue** — le ou les écrans et fichiers concernés, pour celui qui code.

Une tâche porte un numéro simple : `S1.3` = sprint 1, tâche 3.

## Les niveaux, tels que ton document les définit

| Niveau | Sens |
|---|---|
| **Maintenant** | indispensable au fonctionnement du produit actuel |
| **Ensuite** | important, mais ne bloque pas |
| **Plus tard** | utile à l'évolution |
| **Vision** | stratégique à long terme |
| **Parking** | idée intéressante, pertinence pas encore démontrée |

## La règle « terminé »

Telle que ton document la pose, et elle s'applique à toutes les tâches de ce fichier :

une fonctionnalité n'est pas finie parce que le code compile. Elle est finie quand elle fonctionne, qu'elle est
cohérente avec le parcours, qu'elle est utilisable **sur ordinateur et sur téléphone**, qu'elle affiche les
erreurs et les écrans vides, qu'elle sauvegarde vraiment les données, qu'elle respecte qui a le droit de voir
quoi, qu'elle ne casse rien de ce qui existait, et qu'elle ressemble au reste d'AliTché.

## La règle « avant de développer »

Les huit questions de ton document, en plus court : quel problème, pour qui, à quelle étape, avec quelle donnée,
quelle donnée produite, est-ce nécessaire maintenant, est-ce que ça n'existe pas déjà, est-ce que ça améliore
réellement le produit. Si une réponse manque : **on ne code pas, on classe au Parking et on demande.**

## Ce qui existe aujourd'hui, en une phrase mesurée

AliTché est en ligne et fonctionne de bout en bout sur l'ordinateur du fondateur : un visiteur peut découvrir,
s'inscrire, répondre à **31 questions**, voir un classement de ses **11 domaines de carrière** possibles parmi
**45 métiers documentés**, choisir une direction et recevoir un parcours bâti sur **51 modules**, avec **165
écoles, formations et bourses** référencées. Le produit n'a encore été **testé par personne hors de l'équipe**,
et rien de ce parcours n'a été **vu rendu à l'écran par un utilisateur réel**. C'est pour ça que la priorité 0
de ton document — stabiliser — est aussi la première du backlog.

---

# Sprint 1 — Stabiliser

*Ta priorité 0 : « avant d'ajouter de nouvelles fonctionnalités ».*
Objectif du sprint : qu'aucun écran d'AliTché ne puisse surprendre désagréablement.

### S1.1 — Voir chaque écran dans ses trois états, sur ordinateur et sur téléphone

- **Ce que ça change** : un candidat qui arrive sur un écran vide, lent ou en panne ne voit plus un blanc ou une
  icône qui tourne sans explication. Il voit pourquoi, et quoi faire.
- **Pourquoi maintenant** : ta priorité 0 demande de vérifier les états vides, les erreurs et la version mobile.
- **Comment on saura que c'est fini** : les neuf écrans après connexion, plus l'accueil public, plus le test sans
  compte. Pour chacun : une capture à l'écran vide, une au chargement, une à l'erreur, sur ordinateur et sur
  téléphone. Les captures sont rangées dans `docs/tests/` avec la date.
- **Taille** : une semaine, si on ne corrige qu'au fil de l'eau.
- **Où ça se joue** : tous les écrans, en particulier `src/components/` et `src/pages/`.

### S1.2 — Vérifier les formulaires, champ par champ

- **Ce que ça change** : plus de message incompréhensible, plus de bouton qui reste grisé sans raison visible,
  plus de mot de passe accepté ou refusé sans que la règle soit dite.
- **Pourquoi maintenant** : ta priorité 0 cite les formulaires et la sauvegarde des données.
- **Comment on saura que c'est fini** : inscription, connexion, mot de passe oublié, réinitialisation, profil,
  choix de direction. Pour chacun : un champ vide, un champ faux, un champ trop long, un double envoi. Quatre
  cas notés quelque part, et le message affiché est lisible par quelqu'un qui n'a pas fait d'informatique.
- **Taille** : trois jours.
- **Où ça se joue** : `src/components/auth/`, `src/pages/`, `src/components/profile/ProfileSettings.tsx`.

### S1.3 — Dire à l'utilisateur quand quelque chose n'a pas été enregistré

- **Ce que ça change** : aujourd'hui, quand une sauvegarde échoue, AliTché ne le dit pas et le candidat peut
  croire que ses réponses sont perdues — ou les croire sauvegardées alors qu'elles ne sont pas parties. Après :
  un bandeau à l'écran, avec une conduite à tenir.
- **Pourquoi maintenant** : ta priorité 0 (« vérifier la sauvegarde des données ») et ton principe 2 (l'utilisateur
  doit comprendre où il en est). C'est aussi le cas le plus fréquent de panne silencieuse du produit : sur les
  treize fonctions qui écrivent localement, douze avalent l'erreur sans rien dire.
- **Comment on saura que c'est fini** : on vide le stockage du navigateur, on remplit le questionnaire, on
  recharge. Le message est apparu, il est compris par la personne qui le voit, et la reprise propose la bonne
  solution.
- **Taille** : trois jours.
- **Où ça se joue** : `src/utils/storageManager.ts` (les douze captures muettes), `src/App.tsx`,
  `src/components/ServiceStatusBanner.tsx`.

### S1.4 — Prouver qu'un compte ne voit pas les données d'un autre

- **Ce que ça change** : on peut dire, avec deux comptes réels et des captures, que les réponses, le profil et la
  progression de l'un ne sont pas lisibles par l'autre.
- **Pourquoi maintenant** : ta priorité 0 (« vérifier les données »), ton chapitre sur la confidentialité, et une
  lecture qui n'a jamais été contrôlée : la liste de progression est demandée sans filtre explicite côté
  navigateur, donc tout repose sur un réglage de la base en ligne, réglage que personne n'a vérifié à ce jour.
- **Comment on saura que c'est fini** : deux comptes de test, deux appareils. Ce que le second voit est noté, et
  c'est rien. Si ce n'est pas rien, la correction part en tâche bloquante du même sprint.
- **Taille** : deux jours.
- **Où ça se joue** : `src/services/module.api.ts`, `src/services/profile.api.ts`, `supabase/`.

### S1.5 — Retirer les fausses promesses de l'interface

- **Ce que ça change** : quatre boutons du menu de l'accueil (« Orientation », « Métiers », « Écoles »,
  « Mentors ») ne font rien du tout aujourd'hui : cliquer ne produit aucun effet. Une carte du tableau de bord
  s'appelle « Voir mes résultats détaillés » et ouvre une autre page. Un écran « Lien traité » existe alors que le
  vrai chemin d'inscription ne l'emprunte jamais. Une étiquette « Premium » s'affiche sur des modules payants,
  alors qu'AliTché ne fait payer quoi que ce soit. Après la tâche : plus aucun de ces quatre écarts.
- **Pourquoi maintenant** : ta priorité 0 (« corriger les bugs », « vérifier les états de navigation ») et ton
  principe : une fonctionnalité ne doit pas donner l'impression d'un produit plus grand que le produit.
- **Comment on saura que c'est fini** : chaque bouton visible mène quelque part ; chaque intitulé décrit ce qu'il
  ouvre ; le mot « Premium » a disparu, ou une offre payante réelle existe derrière (voir les décisions
  attendues).
- **Taille** : trois jours.
- **Où ça se joue** : `src/components/home/HomePage.tsx`, `src/components/dashboard/Dashboard.tsx`,
  `src/pages/VerifyEmail.tsx`, `src/components/pathway/PathwayView.tsx`.

### S1.6 — Rejouer le parcours complet cinq fois de suite, à la main, et le raconter

- **Ce que ça change** : on remplace « ça marche sur ma machine » par une trace. Cinq parcours, cinq personnes
  différentes de l'équipe si possible (un lycéen, un diplômé, un adulte en reconversion, quelqu'un avec peu de
  connexion, quelqu'un sur téléphone).
- **Pourquoi maintenant** : c'est ta phase B, et elle conditionne tout le reste : tu écris qu'il ne faut pas
  ajouter massivement de fonctionnalités avant d'avoir observé les utilisateurs.
- **Comment on saura que c'est fini** : cinq comptes rendus écrits, avec les endroits où la personne a hésité,
  s'est arrêtée, ou a mal compris une recommandation. Chaque blocage repéré devient une tâche du sprint suivant.
- **Taille** : une semaine en parallèle des autres tâches.
- **Où ça se joue** : dans le produit en ligne, pas sur une machine de développement.

---

# Sprint 2 — Corriger les incohérences

*Ta priorité 0, deuxième point : « corriger les incohérences ».*
Objectif : que le produit, ce qu'il affiche et ce qui est écrit à son sujet disent la même chose.

### S2.1 — Un seul chemin pour vérifier son adresse e-mail

- **Ce que ça change** : le candidat ne se retrouve plus devant deux écrans pour une seule action, dont un que
  personne n'emprunte.
- **Pourquoi maintenant** : incohérence constatée, et le chemin e-mail n'a jamais été parcouru par une vraie
  personne de bout en bout.
- **Comment on saura que c'est fini** : une inscription réelle, un vrai clic sur un vrai lien, et le produit
  rouvre au bon endroit. Le comportement du lien expiré et celui d'une deuxième demande sont écrits quelque part.
- **Taille** : deux jours plus une contrainte de délai (les liens expirent vite).
- **Où ça se joue** : `src/services/auth.api.ts`, `src/pages/VerifyEmailSent.tsx`, `src/pages/VerifyEmail.tsx`,
  `src/pages/AuthCallback.tsx`.

### S2.2 — Décider ce que deviennent Google et la connexion sans mot de passe

- **Ce que ça change** : soit le visiteur voit un bouton « continuer avec Google » qui fonctionne, soit il n'en
  est plus jamais question, ni à l'écran ni dans les documents.
- **Pourquoi maintenant** : les deux existent à moitié dans le code. Une fonctionnalité à moitié construite coûte
  plus cher qu'une fonctionnalité absente : elle fausse toutes les estimations et toutes les descriptions.
- **Comment on saura que c'est fini** : une décision écrite, appliquée partout — code, accueil, fichiers de
  description.
- **Taille** : une journée après ta décision (voir `docs/ECARTS-PRODUIT-CODE.md`).
- **Où ça se joue** : `src/services/auth.api.ts`, `src/contexts/AuthContext.tsx`, `README.md`.

### S2.3 — Réécrire la fiche d'identité du dépôt, en français simple

- **Ce que ça change** : quelqu'un qui ouvre le projet sans le connaître comprend ce qu'AliTché est vraiment :
  une application web qui parle directement à sa base de données, 31 questions, 11 domaines, sans serveur
  applicatif à elle.
- **Pourquoi maintenant** : le texte de présentation actuel décrit un produit différent de celui qui existe — un
  serveur avec jetons, un autre nombre de questions, six dimensions au lieu de onze domaines — et il est en
  anglais. Une recrue, un partenaire ou un outil automatique qui le lit se trompe de produit.
- **Comment on saura que c'est fini** : plus aucune affirmation du fichier de présentation qu'on ne puisse
  montrer à l'écran dans les dix minutes.
- **Taille** : une journée.
- **Où ça se joue** : `README.md`.

### S2.4 — Ranger le dépôt

- **Ce que ça change** : le projet pèse ce qu'il pèse vraiment. Aujourd'hui, le suivi de versions enregistre
  10 723 fichiers, dont 10 579 de bibliothèques et 25 d'un serveur abandonné que rien n'appelle.
- **Pourquoi maintenant** : ton principe 7 (modularité) et le bon sens : on ne peut pas faire évoluer
  proprement ce qu'on ne peut pas relire.
- **Comment on saura que c'est fini** : moins de 300 fichiers suivis ; le serveur abandonné est soit documenté
  comme abandonné, soit retiré, à une condition : rien de ce qui fonctionne aujourd'hui ne disparaît.
- **Taille** : deux jours, à faire une suppression à la fois, avec vérification entre chaque.
- **Où ça se joue** : `node_modules/`, `backend/`, `.gitignore`, `src/services/api.client.ts`.

### S2.5 — Écrire ce que contient AliTché, à un seul endroit

- **Ce que ça change** : plus jamais deux documents qui donnent deux nombres différents de questions, de
  domaines ou d'écoles.
- **Pourquoi maintenant** : le document de cadrage parle de six dimensions ; le produit en affiche onze. Ce n'est
  pas une erreur de l'un ou de l'autre, c'est l'absence d'un endroit unique où la vérité du produit se lit.
- **Comment on saura que c'est fini** : un fichier, `docs/CONTENU-PRODUIT.md`, tenu à jour par une vérification
  automatique qui rougit si le texte et la réalité divergent.
- **Taille** : deux jours.
- **Où ça se joue** : `src/data/`, `src/checks/`.

### S2.6 — Relire le catalogue, ligne par ligne

- **Ce que ça change** : quand AliTché conseille une école, quelqu'un l'a vérifiée. Aujourd'hui, 151 lignes
  portent une date de vérification, mais ces dates ne forment que deux lots : 74 lignes datées du 21/09/2026, 77
  du 22/09/2026. Et 50 liens sur 151 mènent à un site agrégateur, pas à l'école.
- **Pourquoi maintenant** : c'est le seul risque du produit qu'aucune remise en ligne du site ne corrige : un
  candidat qui se présente à une porte fermée perd autre chose que du temps.
- **Comment on saura que c'est fini** : les domaines prioritaires sont relus un par un, chaque ligne garde sa
  date de contrôle réelle, chaque lien mène au site officiel de l'établissement. Ce qui n'est pas vérifié reste,
  mais est dit comme non vérifié.
- **Taille** : une tâche de fond, dix lignes à la fois. Pas une semaine, des séances.
- **Où ça se joue** : `src/data/opportunities.ts`.
---

# Sprint 3 — Rendre le parcours fluide

*Ta priorité 1 : inscrire → profil → orientation → résultats → recommandations → parcours → formation →
progression, sans avoir l'impression de passer d'une application à l'autre.*
Ce sprint ne démarre pas tant que les cinq parcours du sprint 1 ne sont pas racontés : on fluidifie ce que les gens
ont réellement essayé, pas ce qu'on imagine.

### S3.1 — Une adresse par étape

- **Ce que ça change** : le bouton « retour » du navigateur fait ce que le candidat attend, on peut donner
  l'adresse d'une étape précise, et rafraîchir la page ne renvoie pas à zéro.
- **Pourquoi maintenant** : aujourd'hui les neuf écrans après connexion partagent une seule adresse et un simple
  compteur d'état. C'est ce qui empêche de tester, de montrer et de mesurer une étape en particulier.
- **Comment on saura que c'est fini** : neuf adresses distinctes, testées sur téléphone ; retour, avance et
  rafraîchissement se comportent comme l'utilisateur l'attend.
- **Taille** : une semaine.
- **Où ça se joue** : `src/App.tsx`.

### S3.2 — Reprendre où on s'était arrêté, trois jours après, sur un autre appareil

- **Ce que ça change** : un candidat qui a commencé le test sur le téléphone d'un cousin le reprend chez lui, à la
  question où il était, sans tout refaire.
- **Pourquoi maintenant** : ton étape 7 suppose que le candidat peut revenir. La reprise existe pour le test,
  jamais vue rendue ; elle n'existe pas pour le parcours.
- **Comment on saura que c'est fini** : on ferme à une étape, on rouvre trois jours plus tard, on retombe dessus.
  Sur un autre appareil, avec le même compte, idem.
- **Taille** : trois jours après S3.1.
- **Où ça se joue** : `src/App.tsx`, `src/utils/storageManager.ts`, `src/services/profile.api.ts`.

### S3.3 — Un vrai écran de profil avant le questionnaire

- **Ce que ça change** : après l'inscription, le candidat voit une étape courte où il dit qui il est — situation,
  âge, niveau, pays, ce qu'il vise — et le test part de là.
- **Pourquoi maintenant** : ton parcours compte une étape « profil initial » avant l'orientation. Aujourd'hui,
  après l'inscription, on entre directement dans le questionnaire, et la situation de départ n'est que la première
  question du test.
- **Comment on saura que c'est fini** : l'étape existe, elle est courte (cinq informations au plus), elle reste
  modifiable plus tard depuis le profil, et elle alimente réellement les recommandations — pas seulement affichée.
- **Taille** : trois jours.
- **Où ça se joue** : `src/components/test/WelcomeScreen.tsx`, `src/data/questions.ts`,
  `src/components/profile/ProfileSettings.tsx`.

### S3.4 — Expliquer chaque recommandation

- **Ce que ça change** : au lieu de « nous vous recommandons ce domaine », AliTché dit « ce domaine parce que tes
  réponses sur tel sujet, parce que tu vis telle situation, et parce que cela demande telles compétences ».
- **Pourquoi maintenant** : c'est ton chapitre 10 et ton principe 4. C'est aussi ce qui sépare un produit crédible
  d'une boîte noire, et un parent qui finance une formation veut une raison.
- **Comment on saura que c'est fini** : sur les résultats et sur le parcours, trois phrases nomment ce qui a pesé,
  avec les mots du candidat, pas notre vocabulaire interne. Vérifié sur les cinq parcours du sprint 1 : la personne
  retrouve sa logique.
- **Taille** : une semaine.
- **Où ça se joue** : `src/utils/occupationMatcher.ts`, `src/components/results/`,
  `src/components/pathway/PathwayView.tsx`.

### S3.5 — Un lien partagé qui ouvre le vrai profil

- **Ce que ça change** : aujourd'hui, partager l'adresse d'un résultat envoie l'autre personne sur l'accueil.
  Après : elle voit le profil partagé, si et seulement si le candidat a choisi de le rendre visible.
- **Pourquoi maintenant** : ton étape 11 (valorisation) et ta règle sur le contrôle de ce qui est visible. Un lien
  qui ne porte rien est aussi un lien qu'on n'a pas le droit d'envoyer à un recruteur.
- **Comment on saura que c'est fini** : un lien ouvert sur un autre appareil, sans être connecté, affiche le profil
  exporté. Un second lien, non partagé, est refusé. Les deux cas sont capturés.
- **Taille** : une semaine.
- **Où ça se joue** : `src/components/results/ExportMenu.tsx`, `index.html`.

### S3.6 — Un tableau de bord qui guide l'action

- **Ce que ça change** : en arrivant, le candidat lit où il en est, ce qu'il a fait, ce qui reste, et la prochaine
  étape — pas une accumulation de statistiques.
- **Pourquoi maintenant** : c'est ton chapitre 9, presque mot pour mot, et ton principe 2.
- **Comment on saura que c'est fini** : le tableau de bord répond aux six questions que tu listes, en six éléments
  visibles. Une personne du sprint 1, interrogée, désigne la bonne prochaine étape sans hésiter.
- **Taille** : une semaine.
- **Où ça se joue** : `src/components/dashboard/Dashboard.tsx`.

### S3.7 — Tester avec dix personnes hors de l'équipe, avant le 30 novembre 2026

- **Ce que ça change** : on sait enfin si « ma voie » se comprend sans nous.
- **Pourquoi maintenant** : c'est ta phase B, et la condition que tu as posée toi-même le 2026-09-23. Sans ces dix
  retours, les sprints 4 et 5 reposent sur des suppositions.
- **Comment on saura que c'est fini** : dix personnes, dix comptes rendus écrits, et pour chacune : a-t-elle
  compris son profil, a-t-elle trouvé la recommandation juste, a-t-elle ouvert un parcours, où a-t-elle lâché.
- **Taille** : continu, à partir de la fin du sprint 1.
- **Règle** : les sprints 4 et 5 ne démarrent pas avant six de ces dix retours écrits.

---

# Sprint 4 — Connecter les données entre elles

*Ta priorité 2 : le questionnaire identifie, le profil conserve, le système recommande, la formation développe,
la progression actualise, le profil valorise.*

### S4.1 — Garder les réponses, et pouvoir les relire

- **Ce que ça change** : un candidat retrouve ce qu'il a répondu, pas seulement le résultat. Un accompagnateur peut
  lui dire « tu avais répondu ceci ».
- **Pourquoi maintenant** : la table des réponses est remplie et jamais relue — nulle part dans le produit. Le
  profil n'est donc reconstructible par personne, et un changement de barème efface l'histoire.
- **Comment on saura que c'est fini** : soit une vue « mes réponses » existe, soit on arrête de sauvegarder les
  réponses et on cesse de dire qu'AliTché connaît le profil. Les deux issues sont respectables ; l'état actuel ne
  l'est pas.
- **Taille** : trois jours pour relire, une journée pour supprimer.
- **Où ça se joue** : `src/services/profile.api.ts`, `supabase/001_initial_schema.sql`.

### S4.2 — Un changement de barème ne doit plus jeter les anciens profils

- **Ce que ça change** : le produit a déjà connu six versions de barème. Un candidat inscrit sous une version
  antérieure doit garder son résultat, pas être éjecté.
- **Pourquoi maintenant** : une seule ligne de code refuse aujourd'hui tout profil dont la version diffère. Avec
  dix utilisateurs visés, c'est un destructeur de comptes différé.
- **Comment on saura que c'est fini** : un profil créé avec la version précédente s'ouvre après mise à jour, avec
  une mention « ton profil a été mis à jour », et non un accueil vide.
- **Taille** : une semaine.
- **Où ça se joue** : `src/utils/profileResult.ts`, `src/data/questions.ts`.

### S4.3 — La progression dans un module met à jour le profil

- **Ce que ça change** : finir une étape d'un parcours se voit ailleurs que dans la liste des modules.
- **Pourquoi maintenant** : c'est le maillon manquant de ta chaîne « formation suivie → compétence développée →
  compétence validée ».
- **Comment on saura que c'est fini** : cocher un module sur un appareil change le tableau de bord et le profil sur
  un autre, avec un seul chiffre quelque part, pas deux qui se contredisent.
- **Taille** : trois jours.
- **Où ça se joue** : `src/services/module.api.ts`, `src/App.tsx`, `src/components/dashboard/Dashboard.tsx`.

### S4.4 — Faire des compétences une donnée du profil

- **Ce que ça change** : AliTché peut dire « tu as développé trois compétences, il t'en manque deux pour ton
  objectif ».
- **Pourquoi maintenant** : les 51 modules portent bien des compétences, mais ce sont des libellés libres dans une
  fiche. Rien ne les compte, rien ne les valide, rien ne les compare à un objectif. Or c'est le coeur de tes
  chapitres compétences et projet professionnel.
- **Comment on saura que c'est fini** : une liste de compétences unique, chaque module et chaque métier rattaché à
  cette liste, le profil affiche les siennes et l'écart avec son objectif.
- **Taille** : deux semaines.
- **Où ça se joue** : `src/data/modules.ts`, `src/data/occupations.ts`, un nouveau fichier de référence des
  compétences, `src/types/`.

### S4.5 — Choisir qui voit quoi

- **Ce que ça change** : le candidat décide, information par information, ce qui est privé, ce qui est partagé à un
  accompagnateur, ce qui est visible d'un recruteur.
- **Pourquoi maintenant** : ton chapitre 24 pose la règle — un recruteur n'accède pas automatiquement à tout — et
  ton principe 8 le redit. Il vaut mieux poser la structure tôt que la greffer sur dix mille profils.
- **Comment on saura que c'est fini** : trois niveaux de visibilité dans le produit, un écran de contrôle dans le
  profil, et la vérification que ce qui est privé ne sort pas par le lien partagé de S3.5.
- **Taille** : une semaine.
- **Où ça se joue** : `src/data/` pour la forme du profil, `src/services/profile.api.ts`,
  `src/components/profile/ProfileSettings.tsx`.

---

# Sprint 5 — Les premières vraies formations

*Ta priorité 3 : compléter les premiers modules de formation, sans construire immédiatement une immense
bibliothèque.*

### S5.1 — Dire ce qu'AliTché héberge, ou le dire autrement

- **Ce que ça change** : aujourd'hui, ouvrir un module affiche quatre étapes générées automatiquement à partir de
  son titre. Aucune leçon, aucun exercice. AliTché annonce un parcours de 12 à 19 semaines sans contenir une heure
  de cours.
- **Pourquoi maintenant** : c'est la décision qui conditionne tout le sprint. Deux issues également respectables :
  de vrais contenus (S5.2), ou un écran qui dit clairement « AliTché t'oriente vers cette formation, elle se suit
  ailleurs ». Ce qui n'est pas une issue, c'est l'état actuel.
- **Comment on saura que c'est fini** : une décision écrite, et l'écran aligné dessus.
- **Taille** : une décision, puis rien.
- **Où ça se joue** : `src/components/pathway/PathwayView.tsx`, et la question est posée dans
  `docs/ECARTS-PRODUIT-CODE.md`.

### S5.2 — Écrire les six premiers modules utiles

- **Ce que ça change** : six modules avec objectif, contenu, exercices, validation et compétence associée — choisis
  parce qu'ils débouchent réellement un parcours, pas parce qu'ils remplissent une catégorie.
- **Pourquoi maintenant** : ta priorité 3 demande de commencer par les contenus nécessaires au parcours actuel.
- **Comment on saura que c'est fini** : six modules suivis de bout en bout par un vrai candidat, avec une validation
  qui se voit dans le profil (S4.3).
- **Taille** : trois semaines de production de contenu, pas de code.
- **Où ça se joue** : `src/data/modules.ts`, nouveaux fichiers de contenu.

### S5.3 — Valider une compétence acquise

- **Ce que ça change** : finir un module produit quelque chose de durable : une compétence marquée développée, puis
  validée.
- **Pourquoi maintenant** : c'est la boucle de ton chapitre 4 — profil, analyse, orientation, action, apprentissage,
  validation, progression, valorisation. Sans validation, la boucle s'arrête avant la fin.
- **Comment on saura que c'est fini** : un exercice final par module, une validation enregistrée, et elle
  réapparaît dans le profil et dans l'explication d'une recommandation (S3.4).
- **Taille** : une semaine.
- **Où ça se joue** : `src/services/module.api.ts`, `supabase/002_module_progress.sql`.

### S5.4 — Ajouter une formation depuis une recommandation

- **Ce que ça change** : un parcours n'est pas figé à la sortie du test. Le candidat peut y ajouter une formation
  repérée plus tard, et le parcours se recalcule.
- **Pourquoi maintenant** : ton principe 1, le parcours avant les fonctionnalités, et ton étape 8.
- **Comment on saura que c'est fini** : un parcours modifié garde son historique, la durée affichée correspond aux
  modules réellement présents, et rien de ce qui était validé n'est perdu.
- **Taille** : une semaine.
- **Où ça se joue** : `src/utils/pathwayEngine.ts`, `src/components/pathway/PathwayView.tsx`.

---

# Ensuite — important, mais ne bloque pas

À tirer de ce bloc seulement quand les sprints 1 à 3 sont passés.

| Numéro | Travail | Ce que ça change |
|---|---|---|
| E1 | rattacher les chances réelles aux métiers, pas au seul domaine | un candidat qui vise un métier croisé voit les formations de ce métier |
| E2 | compléter l'offre hors Bénin et les formations qui manquent | l'orientation ne s'arrête plus à la frontière |
| E3 | rendre la recherche d'écoles utilisable | on cherche par métier, pays, durée, frais |
| E4 | alléger le premier affichage | le site s'ouvre sur une connexion faible : 214 kilo-octets compressés aujourd'hui |
| E5 | accessibilité clavier et contrastes | utilisable sans souris et en plein soleil |
| E6 | une version anglaise de l'accueil | cohérente avec une ambition régionale, une fois la version française irréprochable |
| E7 | écrire la politique de conservation des données | le produit peut toucher des mineurs : durée de garde, effacement à demande, sortie d'un mineur |

# Plus tard — utile à l'évolution

Ta phase C et le début de ta phase D.

- catalogue de compétences partagé, certifications, portfolio, profil professionnel imprimable ;
- espaces stages, emplois, missions et événements reliés au profil — aujourd'hui AliTché ne référence que des
  écoles, des formations et des bourses, aucun stage ni emploi ;
- accompagnement par un conseiller à l'intérieur du produit ;
- reprise de session plus tolérante, pour ne pas éjecter quelqu'un dont la connexion est lente ;
- tableaux de bord d'usage côté AliTché, pour piloter, pas pour afficher des chiffres.

# Vision — stratégique à long terme

Tes phases E et F. Rien ici ne se code maintenant ; la place est gardée dans la façon de construire le reste.

- espaces université, entreprise et recruteur, consultant, parent ou tuteur ;
- suivi du salarié après le recrutement : intégration, évaluation, plan de développement, mobilité ;
- données agrégées et anonymisées pour éclairer les politiques d'éducation et d'emploi ;
- modèle économique : abonnements institutionnels, certifications payantes, accompagnement.

# Parking — intéressant, pertinence non démontrée

Ton chapitre 19, complété par ce que le produit a déjà commencé à promettre sans que ce soit décidé.

- messagerie interne et réseau social entre candidats ;
- marketplace complète et paiement en ligne — l'étiquette « Premium » appartient à ce bloc tant qu'une offre payante
  n'existe pas ;
- système de ressources humaines, gestion de scolarité, système de recrutement ;
- bibliothèque massive de cours ;
- assistant conversationnel par intelligence artificielle — le produit peut en utiliser un, mais l'intelligence
  artificielle n'est pas le produit, et une recommandation doit rester justifiable ;
- fonctionnalités blockchain ;
- tableaux de bord institutionnels complexes ;
- toute fonctionnalité publique sans cas d'usage validé par un utilisateur réel.

---

# Ce que ce backlog attend de toi

Neuf points où le produit et ton document de cadrage ne disent pas la même chose sont listés dans
`docs/ECARTS-PRODUIT-CODE.md`. Deux bloquent réellement la suite :

- **S5.1** — est-ce qu'AliTché héberge des cours, ou est-ce qu'il oriente vers des cours suivis ailleurs ? Tout le
  sprint 5 dépend de la réponse.
- **S2.2 et l'étiquette « Premium »** — ce qui est payant, ce qui ne l'est pas, et ce qu'on affiche en attendant.

# Et ClickUp

Ton mandat prévoyait de reporter ce backlog dans ClickUp et de le suivre en sprints. Ce n'est pas fait : l'espace
ClickUp actuel est organisé en grands blocs et en dossiers qui portent la découpe précédente, avec dix-neuf tâches
créées avant ce document. Recaler ClickUp ici veut dire renommer des dossiers, déplacer des tâches et en créer une
trentaine. Ça se fait, mais sur ton feu vert, et en une seule fois pour ne pas payer deux fois le quota d'appels.
