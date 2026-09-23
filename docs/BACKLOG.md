# AliTché — le travail à faire

**Document de référence :** `docs/CADRAGE-PRODUIT.md`, que j'ai écrit le 2026-09-23.
Ce backlog en est la déclinaison. Il remplace tout ce qui a été écrit avant : l'ancienne documentation est
rangée dans `docs/hors-usage-2026-09-23/`, rien n'a été supprimé.

**Où lire quoi.** `docs/CADRAGE-PRODUIT.md` : ce qu'AliTché doit être, tel que je l'ai écrit. Ce fichier : le
travail à faire, dans l'ordre. `docs/MODULES.md` : les dix modules de mon chapitre 7, fonctionnalité par
fonctionnalité, avec pour chacune son état réel lu dans le code — développé, engagé, ou absent. C'est cette liste
que le miroir ClickUp doit reproduire, un dossier par module. `docs/ECARTS-PRODUIT-CODE.md` : les neuf points où les
deux ne disent pas la même chose, et qui attendent une réponse. Trois documents plus anciens que le cadrage sont
restés en place
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

## Les niveaux, tels que je les définis

| Niveau | Sens |
|---|---|
| **Maintenant** | indispensable au fonctionnement du produit actuel |
| **Ensuite** | important, mais ne bloque pas |
| **Plus tard** | utile à l'évolution |
| **Vision** | stratégique à long terme |
| **Parking** | idée intéressante, pertinence pas encore démontrée |

## La règle « terminé »

Je la pose ainsi, et elle s'applique à toutes les tâches de ce fichier :

une fonctionnalité n'est pas finie parce que le code compile. Elle est finie quand elle fonctionne, qu'elle est
cohérente avec le parcours, qu'elle est utilisable **sur ordinateur et sur téléphone**, qu'elle affiche les
erreurs et les écrans vides, qu'elle sauvegarde vraiment les données, qu'elle respecte qui a le droit de voir
quoi, qu'elle ne casse rien de ce qui existait, et qu'elle ressemble au reste d'AliTché.

## La règle « avant de développer »

Les huit questions de mon document, en plus court : quel problème, pour qui, à quelle étape, avec quelle donnée,
quelle donnée produite, est-ce nécessaire maintenant, est-ce que ça n'existe pas déjà, est-ce que ça améliore
réellement le produit. Si une réponse manque : **on ne code pas, on classe au Parking et on demande.**

## Ce qui existe aujourd'hui, en une phrase mesurée

AliTché est en ligne et fonctionne de bout en bout sur ma machine : un visiteur peut découvrir,
s'inscrire, répondre à **31 questions**, voir un classement de ses **11 domaines de carrière** possibles parmi
**45 métiers documentés**, choisir une direction et recevoir un parcours bâti sur **51 modules**, avec **165
écoles, formations et bourses** référencées. Le produit n'a encore été **testé par personne hors de l'équipe**,
et rien de ce parcours n'a été **vu rendu à l'écran par un utilisateur réel**. C'est pour ça que la priorité 0
de mon document — stabiliser — est aussi la première du backlog.

---

# Sprint 1 — Stabiliser

*Ma priorité 0 : « avant d'ajouter de nouvelles fonctionnalités ».*
Objectif du sprint : qu'aucun écran d'AliTché ne puisse surprendre désagréablement.

### S1.1 — Voir chaque écran dans ses trois états, sur ordinateur et sur téléphone

- **Ce que ça change** : un candidat qui arrive sur un écran vide, lent ou en panne ne voit plus un blanc ou une
  icône qui tourne sans explication. Il voit pourquoi, et quoi faire.
- **Pourquoi maintenant** : ma priorité 0 demande de vérifier les états vides, les erreurs et la version mobile.
- **Comment on saura que c'est fini** : les neuf écrans après connexion, plus l'accueil public, plus le test sans
  compte. Pour chacun : une capture à l'écran vide, une au chargement, une à l'erreur, sur ordinateur et sur
  téléphone. Les captures sont rangées dans `docs/tests/` avec la date.
- **Taille** : une semaine, si on ne corrige qu'au fil de l'eau.
- **Où ça se joue** : tous les écrans, en particulier `src/components/` et `src/pages/`.

### S1.2 — Vérifier les formulaires, champ par champ

- **Ce que ça change** : plus de message incompréhensible, plus de bouton qui reste grisé sans raison visible,
  plus de mot de passe accepté ou refusé sans que la règle soit dite.
- **Pourquoi maintenant** : ma priorité 0 cite les formulaires et la sauvegarde des données.
- **Comment on saura que c'est fini** : inscription, connexion, mot de passe oublié, réinitialisation, profil,
  choix de direction. Pour chacun : un champ vide, un champ faux, un champ trop long, un double envoi. Quatre
  cas notés quelque part, et le message affiché est lisible par quelqu'un qui n'a pas fait d'informatique.
- **Taille** : trois jours.
- **Où ça se joue** : `src/components/auth/`, `src/pages/`, `src/components/profile/ProfileSettings.tsx`.

### S1.3 — Dire à l'utilisateur quand quelque chose n'a pas été enregistré

- **Ce que ça change** : aujourd'hui, quand une sauvegarde échoue, AliTché ne le dit pas et le candidat peut
  croire que ses réponses sont perdues — ou les croire sauvegardées alors qu'elles ne sont pas parties. Après :
  un bandeau à l'écran, avec une conduite à tenir.
- **Pourquoi maintenant** : ma priorité 0 (« vérifier la sauvegarde des données ») et mon principe 2 (l'utilisateur
  doit comprendre où il en est). C'est aussi le cas le plus fréquent de panne silencieuse du produit : sur les
  treize fonctions qui écrivent localement, douze avalent l'erreur sans rien dire. Le même défaut existe à l'envers
  de la sauvegarde : le bouton « Réinitialiser mes données » du tableau de bord appelle une suppression à distance
  dont l'échec est seulement écrit dans la console, et l'écran revient à l'accueil comme si la demande était
  traitée. Une personne qui demande l'effacement de son compte n'a donc aucun moyen de savoir si c'est fait.
- **Comment on saura que c'est fini** : on vide le stockage du navigateur, on remplit le questionnaire, on
  recharge. Le message est apparu, il est compris par la personne qui le voit, et la reprise propose la bonne
  solution. Et côté effacement : on coupe la connexion à la base en ligne, on clique sur « Réinitialiser mes
  données », et le produit dit qu'il n'a pas pu — au lieu de faire semblant.
- **Taille** : trois jours.
- **Où ça se joue** : `src/utils/storageManager.ts` (les douze captures muettes), `src/App.tsx` (ligne 386 pour
  l'effacement), `src/components/dashboard/Dashboard.tsx`, `src/components/ServiceStatusBanner.tsx`.
- **Écrit le 2026-09-23 au soir, à voir à l'écran.** Les douze captures muettes parlent : chacune affiche un message
  à l'écran avec la reprise qui va avec. Le bouton « Réinitialiser mes données » ne fait plus semblant — si le
  serveur n'a rien reçu, rien n'est effacé sur l'appareil, le message le dit, et le bouton reste disponible pour
  relancer. Trois silences de plus sont sortis de la console, parce qu'ils mentaient de la même façon : l'envoi de
  la direction choisie, l'envoi de l'avancement d'un module, et le repli sur la copie locale du profil quand le
  compte n'a pas répondu. Les textes sont écrits au « vous » du produit — il avait cent soixante-sept formes de
  « vous » et aucune de « tu » avant que je commence. Ce que les contrôles automatiques ne disent pas : que le
  message se voit et se comprend. Les deux scènes décrites ci-dessus restent à jouer à la main.

### S1.4 — Prouver qu'un compte ne voit pas les données d'un autre

- **Ce que ça change** : on peut dire, avec deux comptes réels et des captures, que les réponses, le profil et la
  progression de l'un ne sont pas lisibles par l'autre.
- **Pourquoi maintenant** : ma priorité 0 (« vérifier les données »), mon chapitre sur la confidentialité, et une
  lecture qui n'a jamais été contrôlée : la liste de progression est demandée sans filtre explicite côté
  navigateur, donc tout repose sur un réglage de la base en ligne, réglage que personne n'a vérifié à ce jour.
- **Comment on saura que c'est fini** : deux comptes de test, deux appareils. Ce que le second voit est noté, et
  c'est rien. Si ce n'est pas rien, la correction part en tâche bloquante du même sprint.
- **Taille** : deux jours.
- **Où ça se joue** : `src/services/module.api.ts`, `src/services/profile.api.ts`, `supabase/`.

### S1.5 — Retirer les fausses promesses de l'interface

- **Ce que ça change** : quatre boutons du menu de l'accueil (« Orientation », « Métiers », « Écoles »,
  « Mentors ») n'avaient aucune action : un clic ne produisait rien. Une carte du tableau de bord
  s'appelle « Voir mes résultats détaillés » et ouvre une autre page. Un écran « Lien traité » existe alors que le
  vrai chemin d'inscription ne l'emprunte jamais. Une étiquette « Premium » s'affiche sur des modules payants,
  alors qu'AliTché ne fait payer quoi que ce soit. Après la tâche : plus aucun de ces quatre écarts.
- **Pourquoi maintenant** : ma priorité 0 (« corriger les bugs », « vérifier les états de navigation ») et mon
  principe : une fonctionnalité ne doit pas donner l'impression d'un produit plus grand que le produit.
- **Comment on saura que c'est fini** : chaque bouton visible mène quelque part ; chaque intitulé décrit ce qu'il
  ouvre ; le mot « Premium » a disparu de l'écran — décidé le 2026-09-23, la distinction reste dans les données.
  Les quatre onglets de l'accueil sont retirés depuis le 2026-09-23 ; restent à écrire les pages des deux
  groupes de pied de page qui subsistent, « Support » et « Légal ».
- **Avancement (23/09/2026)** : les étiquettes de prix sont retirées de l'écran — la pastille « Gratuit » /
  « Premium » de la liste du parcours, la même pastille sur la fiche d'un module, la mention « gratuit /
  payant » de la fiche d'un domaine, et le cadenas de la carte de module (ouvert pour les gratuits, fermé pour
  les payants) : le mot avait disparu, le symbole était resté. Les six modules concernés gardent l'information
  dans leurs données : rien n'est effacé, rien n'est annoncé. Les quatre onglets morts de l'accueil, repris dans
  le pied de page sous « Plateforme », sont retirés depuis le 2026-09-23 (commit `6005e19`) ; les groupes
  « Support » et « Légal » du pied de page restent, leurs pages sont à écrire. Sur les quatre fausses promesses
  listées ici, il en reste deux : la carte du tableau de bord qui ouvre une autre page qu'elle ne le dit, et
  l'écran « Lien traité » que le vrai chemin d'inscription n'emprunte jamais.
- **Taille** : trois jours.
- **Où ça se joue** : `src/components/home/HomePage.tsx`, `src/components/dashboard/Dashboard.tsx`,
  `src/pages/VerifyEmail.tsx`, `src/components/pathway/PathwayView.tsx`,
  `src/components/results/DomainDetail.tsx`.

### S1.6 — Rejouer le parcours complet cinq fois de suite, à la main, et le raconter

- **Ce que ça change** : on remplace « ça marche sur ma machine » par une trace. Cinq parcours, cinq personnes
  différentes de l'équipe si possible (un lycéen, un diplômé, un adulte en reconversion, quelqu'un avec peu de
  connexion, quelqu'un sur téléphone).
- **Pourquoi maintenant** : c'est ma phase B, et elle conditionne tout le reste : j'écris qu'il ne faut pas
  ajouter massivement de fonctionnalités avant d'avoir observé les utilisateurs.
- **Comment on saura que c'est fini** : cinq comptes rendus écrits, avec les endroits où la personne a hésité,
  s'est arrêtée, ou a mal compris une recommandation. Chaque blocage repéré devient une tâche du sprint suivant.
- **Taille** : une semaine en parallèle des autres tâches.
- **Où ça se joue** : dans le produit en ligne, pas sur une machine de développement.

---

# Sprint 2 — Corriger les incohérences

*Ma priorité 0, deuxième point : « corriger les incohérences ».*
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

### S2.2 — Finir la connexion Google, retirer la connexion sans mot de passe

- **Décision prise le 2026-09-23** : Google est terminé et affiché, à condition de n'engager aucune dépense ; le
  lien de connexion sans mot de passe est retiré du code et des documents.
- **Ce que ça change** : le visiteur voit un bouton « continuer avec Google » qui l'amène vraiment dans son
  compte. La connexion sans mot de passe disparaît du code, de l'accueil et des fichiers de description.
- **Pourquoi maintenant** : une fonctionnalité à moitié construite coûte plus cher qu'une fonctionnalité absente —
  elle fausse les estimations, les descriptions, et maintenant la fiche de présentation du dépôt.
- **Comment on saura que c'est fini** : un vrai compte Google ouvre AliTché depuis le bouton, une fermeture du
  navigateur puis une réouverture remettent le candidat dans son parcours, et le mot « magique » n'apparaît plus
  dans l'application. Plus une ligne ajoutée à la liste des chemins de connexion qui ne sont plus proposés.
- **Taille** : une journée de travail technique, et elle est faite. Les deux manipulations qui restent se font dans deux
  consoles en ligne, chez Google et chez le service d'authentification ; elles ne coûtent rien.
- **Ce qui est fait dans le dépôt (23/09/2026)** : le bouton « Continuer avec Google » apparaît sur l'écran de
  connexion, « S'inscrire avec Google » sur l'écran de création de compte, et les deux reviennent par le chemin
  `/auth/callback` qui existait déjà dans le code sans jamais être emprunté. La fonction qui envoyait un lien de
  connexion sans mot de passe est supprimée : plus aucun écran ne la proposait, et elle entretenait un deuxième
  chemin d'entrée que personne n'a jamais parcouru.
- **Ce qui reste à faire, et seulement là, chez Google** : console Google Cloud → « API et services » →
  « Identifiants » → créer un identifiant client OAuth de type « Application Web » → dans « URI de redirection
  autorisés », ajouter exactement
  `https://pldbjuprxqmuxwqtjgnq.supabase.co/auth/v1/callback`.
  **Et chez Supabase** : tableau de bord → Authentication → « Sign In / Providers » → Google → coller
  l'identifiant client et la clé secrète donnés par Google, puis activer le fournisseur. Juste à côté, dans
  Authentication → « URL Configuration » : « Site URL » = `https://ali-ce-i6it.vercel.app`, et dans « Redirect
  URLs » ajouter `https://ali-ce-i6it.vercel.app/auth/callback` ainsi que `http://localhost:5173/auth/callback`
  pour travailler sur la machine de développement. L'adresse `pldbjuprxqmuxwqtjgnq.supabase.co` a été relue aujourd'hui sur le site
  en ligne ; si le projet venait à être recréé, elle change, et c'est elle qu'il faut recopier mot pour mot chez
  Google.
- **À savoir avant les cinq tests de la semaine** : tant que les deux réglages ci-dessus ne sont pas faits, le
  bouton est visible et un clic mène sur une page d'erreur de Google. Rien n'est cassé dans le dépôt, c'est inachevé dans les
  consoles. Deux issues possibles : faire les deux réglages avant de lancer les tests — c'est une dizaine de
  minutes —, ou faire retirer le bouton jusqu'à ce qu'ils soient faits, et c'est une ligne à enlever.
- **Où ça se joue** : `src/services/auth.api.ts`, `src/contexts/AuthContext.tsx`,
  `src/components/auth/GoogleAuthButton.tsx`, `src/components/auth/LoginForm.tsx`,
  `src/components/auth/RegisterForm.tsx`, `src/pages/AuthCallback.tsx`, `README.md` (touche à S2.3).

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
- **Pourquoi maintenant** : mon principe 7 (modularité) et le bon sens : on ne peut pas faire évoluer
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

*Ma priorité 1 : inscrire → profil → orientation → résultats → recommandations → parcours → formation →
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
- **Pourquoi maintenant** : mon étape 7 suppose que le candidat peut revenir. La reprise existe pour le test,
  jamais vue rendue ; elle n'existe pas pour le parcours.
- **Comment on saura que c'est fini** : on ferme à une étape, on rouvre trois jours plus tard, on retombe dessus.
  Sur un autre appareil, avec le même compte, idem.
- **Taille** : trois jours après S3.1.
- **Où ça se joue** : `src/App.tsx`, `src/utils/storageManager.ts`, `src/services/profile.api.ts`.

### S3.3 — Un vrai écran de profil avant le questionnaire

- **Ce que ça change** : après l'inscription, le candidat voit une étape courte où il dit qui il est — situation,
  âge, niveau, pays, ce qu'il vise — et le test part de là.
- **Pourquoi maintenant** : mon parcours compte une étape « profil initial » avant l'orientation. Aujourd'hui,
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
- **Pourquoi maintenant** : c'est mon chapitre 10 et mon principe 4. C'est aussi ce qui sépare un produit crédible
  d'une boîte noire, et un parent qui finance une formation veut une raison.
- **Comment on saura que c'est fini** : sur les résultats et sur le parcours, trois phrases nomment ce qui a pesé,
  avec les mots du candidat, pas le vocabulaire interne du produit. Vérifié sur les cinq parcours du sprint 1 : la personne
  retrouve sa logique.
- **Taille** : une semaine.
- **Où ça se joue** : `src/utils/occupationMatcher.ts`, `src/components/results/`,
  `src/components/pathway/PathwayView.tsx`.

### S3.5 — Un lien partagé qui ouvre le vrai profil

- **Ce que ça change** : aujourd'hui, partager l'adresse d'un résultat envoie l'autre personne sur l'accueil.
  Après : elle voit le profil partagé, si et seulement si le candidat a choisi de le rendre visible.
- **Pourquoi maintenant** : mon étape 11 (valorisation) et ma règle sur le contrôle de ce qui est visible. Un lien
  qui ne porte rien est aussi un lien qu'on n'a pas le droit d'envoyer à un recruteur.
- **Comment on saura que c'est fini** : un lien ouvert sur un autre appareil, sans être connecté, affiche le profil
  exporté. Un second lien, non partagé, est refusé. Les deux cas sont capturés.
- **Taille** : une semaine.
- **Où ça se joue** : `src/components/results/ExportMenu.tsx`, `index.html`.

### S3.6 — Un tableau de bord qui guide l'action

- **Ce que ça change** : en arrivant, le candidat lit où il en est, ce qu'il a fait, ce qui reste, et la prochaine
  étape — pas une accumulation de statistiques.
- **Pourquoi maintenant** : c'est mon chapitre 9, presque mot pour mot, et mon principe 2.
- **Comment on saura que c'est fini** : le tableau de bord répond aux six questions que je liste, en six éléments
  visibles. Une personne du sprint 1, interrogée, désigne la bonne prochaine étape sans hésiter.
- **Taille** : une semaine.
- **Où ça se joue** : `src/components/dashboard/Dashboard.tsx`.

### S3.7 — Tester avec dix personnes hors de l'équipe, avant le 30 novembre 2026

- **Ce que ça change** : on sait enfin si « ma voie » se comprend sans explication.
- **Pourquoi maintenant** : c'est ma phase B, et la condition que je me suis posée le 2026-09-23. Sans ces dix
  retours, les sprints 4 et 5 reposent sur des suppositions.
- **Comment on saura que c'est fini** : dix personnes, dix comptes rendus écrits, et pour chacune : a-t-elle
  compris son profil, a-t-elle trouvé la recommandation juste, a-t-elle ouvert un parcours, où a-t-elle lâché.
- **Taille** : continu, à partir de la fin du sprint 1.
- **Règle** : les sprints 4 et 5 ne démarrent pas avant six de ces dix retours écrits.

---

# Sprint 4 — Connecter les données entre elles

*Ma priorité 2 : le questionnaire identifie, le profil conserve, le système recommande, la formation développe,
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
- **Pourquoi maintenant** : c'est le maillon manquant de ma chaîne « formation suivie → compétence développée →
  compétence validée ».
- **Comment on saura que c'est fini** : cocher un module sur un appareil change le tableau de bord et le profil sur
  un autre, avec un seul chiffre quelque part, pas deux qui se contredisent.
- **Taille** : trois jours.
- **Où ça se joue** : `src/services/module.api.ts`, `src/App.tsx`, `src/components/dashboard/Dashboard.tsx`.

### S4.4 — Faire des compétences une donnée du profil

- **Ce que ça change** : AliTché peut dire « tu as développé trois compétences, il t'en manque deux pour ton
  objectif ».
- **Pourquoi maintenant** : les 51 modules portent bien des compétences, mais ce sont des libellés libres dans une
  fiche. Rien ne les compte, rien ne les valide, rien ne les compare à un objectif. Or c'est le coeur de mes
  chapitres compétences et projet professionnel.
- **Comment on saura que c'est fini** : une liste de compétences unique, chaque module et chaque métier rattaché à
  cette liste, le profil affiche les siennes et l'écart avec son objectif.
- **Taille** : deux semaines.
- **Où ça se joue** : `src/data/modules.ts`, `src/data/occupations.ts`, un nouveau fichier de référence des
  compétences, `src/types/`.

### S4.5 — Choisir qui voit quoi

- **Ce que ça change** : le candidat décide, information par information, ce qui est privé, ce qui est partagé à un
  accompagnateur, ce qui est visible d'un recruteur.
- **Pourquoi maintenant** : mon chapitre 24 pose la règle — un recruteur n'accède pas automatiquement à tout — et
  mon principe 8 le redit. Il vaut mieux poser la structure tôt que la greffer sur dix mille profils.
- **Comment on saura que c'est fini** : trois niveaux de visibilité dans le produit, un écran de contrôle dans le
  profil, et la vérification que ce qui est privé ne sort pas par le lien partagé de S3.5.
- **Taille** : une semaine.
- **Où ça se joue** : `src/data/` pour la forme du profil, `src/services/profile.api.ts`,
  `src/components/profile/ProfileSettings.tsx`.

---

# Sprint 5 — Relier les modules à des formations réelles

*Ma priorité 3, telle que je l'ai tranchée le 2026-09-23 : orienter d'abord. Les contenus viendront ensuite,
proposés par les centres de formation et les universités et référencés par AliTché. Quant à produire des modules
en interne, c'est une capacité à atteindre, pas une tâche de ce sprint.*

### S5.1 — Dire à l'écran où se suit la formation, et comment s'y inscrire

- **Ce que ça change** : ouvrir un module ne montre plus quatre étapes calculées automatiquement à partir de son
  titre, comme si AliTché donnait le cours. L'écran dit où cette formation se suit, qui la dispense, et comment
  on y entre.
- **Pourquoi maintenant** : c'est la face visible de la décision du 2026-09-23. AliTché annonce aujourd'hui un
  parcours de 12 à 19 semaines sans contenir une heure de cours, et rien à l'écran ne le dit.
- **Comment on saura que c'est fini** : sur les 51 modules, plus aucun ne présente des étapes générées comme s'il
  s'agissait de contenu propre ; chacun renvoie vers un lieu de formation réel ou est retiré de la proposition de
  parcours.
- **Taille** : trois jours, dont une partie dépend de la tâche S2.6 (relire le catalogue).
- **Où ça se joue** : `src/components/pathway/PathwayView.tsx`, `src/data/modules.ts`,
  `docs/ECARTS-PRODUIT-CODE.md`.

### S5.2 — Relier chaque module à une formation qui existe

- **Ce que ça change** : derrière un module du parcours, il y a une école, un centre ou une bourse réels, avec une
  adresse qui mène à eux. Le candidat qui veut suivre ce module sait où aller.
- **Pourquoi maintenant** : c'est ce que mon produit sait déjà faire, et il ne le fait qu'à moitié : le catalogue
  contient 165 lignes d'écoles, formations et bourses, mais les modules du parcours ne pointent pas vers elles.
- **Comment on saura que c'est fini** : pour les domaines prioritaires, chaque module du parcours affiche au moins
  une formation réelle, vérifiée ligne à ligne (S2.6), avec son lieu, sa durée et son adresse officielle.
- **Taille** : une semaine par domaine prioritaire, en travaillant domaine par domaine.
- **Où ça se joue** : `src/data/modules.ts`, `src/data/opportunities.ts`.

### S5.3 — Valider une compétence acquise

- **Ce que ça change** : finir un module produit quelque chose de durable : une compétence marquée développée, puis
  validée.
- **Pourquoi maintenant** : c'est la boucle de mon chapitre 4 — profil, analyse, orientation, action, apprentissage,
  validation, progression, valorisation. Sans validation, la boucle s'arrête avant la fin.
- **Comment on saura que c'est fini** : un exercice final par module, une validation enregistrée, et elle
  réapparaît dans le profil et dans l'explication d'une recommandation (S3.4).
- **Taille** : une semaine.
- **Où ça se joue** : `src/services/module.api.ts`, `supabase/002_module_progress.sql`.

### S5.4 — Ajouter une formation depuis une recommandation

- **Ce que ça change** : un parcours n'est pas figé à la sortie du test. Le candidat peut y ajouter une formation
  repérée plus tard, et le parcours se recalcule.
- **Pourquoi maintenant** : mon principe 1, le parcours avant les fonctionnalités, et mon étape 8.
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
| E8 | recevoir les contenus proposés par les centres et universités, et les référencer | deuxième temps de ma décision du 2026-09-23. Deux questions à trancher avant d'écrire une ligne : comment un établissement dépose un contenu, et qu'est-ce qui le rend digne d'être référencé chez AliTché |

# Plus tard — utile à l'évolution

Ma phase C et le début de ma phase D.

- catalogue de compétences partagé, certifications, portfolio, profil professionnel imprimable ;
- espaces stages, emplois, missions et événements reliés au profil — aujourd'hui AliTché ne référence que des
  écoles, des formations et des bourses, aucun stage ni emploi ;
- accompagnement par un conseiller à l'intérieur du produit ;
- reprise de session plus tolérante, pour ne pas éjecter quelqu'un dont la connexion est lente ;
- tableaux de bord d'usage côté AliTché, pour piloter, pas pour afficher des chiffres.

# Vision — stratégique à long terme

Mes phases E et F. Rien ici ne se code maintenant ; la place est gardée dans la façon de construire le reste.

- espaces université, entreprise et recruteur, consultant, parent ou tuteur ;
- suivi du salarié après le recrutement : intégration, évaluation, plan de développement, mobilité ;
- données agrégées et anonymisées pour éclairer les politiques d'éducation et d'emploi ;
- modèle économique : abonnements institutionnels, certifications payantes, accompagnement.

# Parking — intéressant, pertinence non démontrée

Mon chapitre 19, complété par ce que le produit a déjà commencé à promettre sans que ce soit décidé.

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

# Ce que ce backlog attend encore d'une décision de ma part

**Tranché le 2026-09-23**, et déjà écrit dans les tâches concernées :

- **S5.1** — orienter d'abord ; ensuite les centres et universités proposeront leurs contenus, référencés par
  AliTché ; produire des modules en interne vient quand on en aura la capacité.
- **S1.5 et « Premium »** — l'étiquette est retirée de l'écran, la distinction reste dans les données.
- **S2.2** — la connexion Google est terminée et affichée, sans dépense ; le lien de connexion sans mot de passe
  est retiré.
- **S1.6** — cinq personnes hors de l'équipe cette semaine. Le protocole est dans `docs/TESTS-USAGERS.md`.

**Tranché le 2026-09-23 au soir, et fait :**

- **Les quatre onglets de l'accueil** (« Orientation », « Métiers », « Écoles », « Mentors ») : retirés. Ils
  n'avaient aucune action derrière eux — un clic ne produisait rien, et aucune adresse du site ne les
  correspondait. Les garder aurait entretenu l'idée qu'AliTché a quatre portes alors qu'il en a une. Retirés
  du menu et du pied de page, poussés et vérifiés en ligne le 23/09 au soir. Les deux groupes du pied de page
  qui subsistent, « Support » et « Légal », pointent vers des pages à écrire : c'est la tâche S1.5.
- **Le mot que j'avais exclu est revenu à l'écran.** La phrase « Choisir et intégrer une filière alignée sur votre
  domaine prioritaire » s'affiche sous « Objectifs long terme » depuis le 23/09/2026. Elle est remplacée par
  « formation », et le contrôle qui veille déjà à ce que le mot ne revienne pas dans la phrase de profil regarde
  désormais aussi les objectifs du parcours : `npm run verify` le refuse maintenant. Quatre titres d'écran avaient
  par ailleurs perdu leurs accents — « Gerez votre parcours », « Modules termines », « Aucun profil trouve »,
  « Quick wins - Demarrez maintenant » — ils sont remis, et le titre anglais s'écrit en français comme le reste.
- **La poussée en ligne** : feu vert donné, onze commits poussés le 23/09 au soir, dont les deux de code
  (S1.5 et S2.2). Ce qu'ils changent se voit maintenant sur `https://ali-ce-i6it.vercel.app`, vérifié dans le
  fichier livré : le bouton Google y est, le mot « Premium » et les quatre onglets n'y sont plus.

**Ce que je ne relance pas** : les cinq écarts non tranchés du fichier `docs/ECARTS-PRODUIT-CODE.md`
(les six dimensions, les briques de formation déjà annoncées, le chemin de vérification de l'adresse e-mail,
les compétences, l'état du catalogue) se règlent en travaillant. Je les traite comme des évidences — aligner
le texte sur ce que le produit fait vraiment — sauf si j'en décide autrement.

# Le calendrier

Les fenêtres ci-dessous sortent d'un calcul, pas d'une intuition : j'ai additionné les « Taille » inscrites dans
les vingt-huit tâches, et j'ai fait suivre les sprints sans les chevaucher, puisque je suis seul à les mener.
Les jours fériés et les jours où je ne fais pas ce travail ne sont pas retirés — c'est donc un calendrier
d'avancement, pas une promesse de date.

| Sprint | Taille totale | Fenêtre |
|---|---|---|
| Sprint 1 — Stabiliser | 21 jours | 23/09/2026 → 21/10/2026 |
| Sprint 2 — Corriger les incohérences | 8 jours | 22/10/2026 → 02/11/2026 |
| Sprint 3 — Rendre le parcours fluide | 26 jours | 03/11/2026 → 08/12/2026 |
| Sprint 4 — Connecter les données entre elles | 26 jours | 09/12/2026 → 15/01/2027 |
| Sprint 5 — Relier les modules à des formations réelles | 18 jours | 18/01/2027 → 10/02/2027 |

**Un point que ce calcul rend visible, et que je dois trancher.** La tâche S3.7 demande dix personnes testées
avant le 30/11/2026, alors que le sprint 3, tel qu'il se termine le 08/12, ne peut pas les avoir toutes
commencées à cette date. Deux sorties propres : avancer les tests au début du sprint 3, ou reculer le 30/11.
Ce n'est pas un détail d'agenda — la règle du backlog dit que les sprints 4 et 5 n'avancent pas avant six de ces
dix retours écrits, donc la date des tests décide en réalité du démarrage du sprint 4.

# Et ClickUp

ClickUp est le miroir, pas l'autorité. Ce que je fais, ce que je dois faire et ce qui est fait se lisent d'abord
ici ; ClickUp sert à voir l'avancement dans le temps et à suivre mes activités jour par jour.

**Ce que j'ai demandé le 2026-09-23 au soir, et qui change la forme du miroir.** Deux choses, et pas une seule :

- **Un planning dans l'espace général**, pour planifier et suivre mes activités, au lieu de retrouver le travail
  empilé en listes de tâches. C'est là que les dates se voient.
- **Un dossier par module du chapitre 7 de mon document**, avec les fonctionnalités en cartes, et les
  sous-fonctionnalités en sous-cartes quand une fonctionnalité en demande plusieurs. Ce qui est déjà développé
  se reconnaît au statut, pas à une étiquette.

**Où ça en est, mesuré le 23/09/2026 au soir.** La liste de planning existe : « Planning — suivre mes activités »,
`https://app.clickup.com/1200430000008636/v/l/li/1200430000041935`. Quatre cartes y ont été écrites avant
d'atteindre le plafond. La liste à recopier est écrite : `docs/MODULES.md` porte **84** fonctionnalités pour les dix
modules, dont **26** développées, **10** engagées et **48** absentes — les trois nombres ont été comptés ligne à
ligne dans les tableaux du fichier, et leur somme fait bien 84. Les dix modules attendent encore leur dossier. Ce qui
est écrit dans ClickUp à cette heure, listé par une lecture du dépôt d'appels :

| Ce qui existe | Identifiant | État |
|---|---|---|
| Espace iNOVA LAB | `1200430000025095` | en place |
| Dossier AliTché | `1200430000030189` | en place, porte les six listes de sprint |
| Liste « Planning — suivre mes activités » | `1200430000041935` | créée, quatre cartes écrites |
| Liste « Sprint 1 · Stabiliser » | `1200430000041680` | en place, cartes du backlog |
| Liste « Sprint 2 · Corriger les incohérences » | `1200430000041682` | en place |
| Liste « Sprint 3 · Rendre le parcours fluide » | `1200430000041687` | en place |
| Liste « Sprint 4 · Connecter les données entre elles » | `1200430000041688` | en place |
| Liste « Sprint 5 · Relier les modules à des formations réelles » | `1200430000041689` | en place |
| Liste « Ensuite · important, mais ne bloque pas » | `1200430000041690` | en place |

**Pourquoi ça s'arrête là ce soir, et pas plus loin.** Le service de gestion de projet limite à cent appels par
jour, et les lectures comptent comme les écritures. Le compteur est à cent sur cent depuis environ dix-neuf
heures trente, heure locale, et il repart le 24/09/2026 vers 19 h 23. Ce n'est pas une panne : c'est un quota,
et il se rouvre tout seul.

**Ce que la reprise a à écrire, dans cet ordre, et seulement après avoir relu l'existant** — parce que les
appels partis avant le plafond sont bien passés, et que réécrire sans lire ferait des doublons :

1. Relire la liste de planning, puis compléter les cartes de jalons qui manquent (une par sprint, aux dates du
   tableau ci-dessus).
2. Créer les dix dossiers de module, à côté du dossier AliTché — un dossier ne peut pas en contenir un autre,
   donc ils sont frères, pas enfants : « Module 1 · Orientation », « Module 2 · Profil utilisateur »,
   « Module 3 · Parcours », « Module 4 · Formation et apprentissage », « Module 5 · Compétences »,
   « Module 6 · Projet professionnel », « Module 7 · Opportunités », « Module 8 · Profil professionnel et
   portfolio », « Module 9 · Évaluations et examens », « Module 10 · Suivi de l'employé ».
3. Dans chacun, une liste « Fonctionnalités », et une carte par fonctionnalité de `docs/MODULES.md`, avec ses
   sous-cartes quand le fichier en donne. Statut « achevé » pour ce qui est développé ; statut « à faire » pour
   le reste ; « engagé » se lit dans la description, parce que le miroir ne connaît que deux statuts ici.
4. Les cartes de la découpe précédente restent où elles sont, dans six listes renommées « Avant le cadrage · … » :
   vingt-sept cartes, mesuré avant d'écrire. Le service ne sait pas supprimer une liste ; le tri se fait dans
   l'interface quand j'y passe.

Budget, sur les nombres ci-dessus : dix dossiers plus dix listes plus quatre-vingt-quatre cartes, cela fait
**104 écritures**, et il faut y ajouter les relectures qui empêchent les doublons. À cent appels par jour, la
découpe complète tient donc sur **deux jours au minimum**, module par module, dans l'ordre des modules. Le premier
jour s'ouvre d'ailleurs à moitié fermé : le compteur se rouvre vers dix-neuf heures vingt-trois, heure locale,
ce qui laisse une soirée de travail et non une journée.
