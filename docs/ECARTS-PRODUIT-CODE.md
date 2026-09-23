# AliTché — là où ton document et le produit ne disent pas la même chose

*Écrit le 2026-09-23. Neuf points. Les faits de la colonne « ce que le produit fait » ont tous été comptés
dans le code le jour même, pas déduits d'un souvenir ni d'un ancien document.*

Ce fichier n'annonce aucune correction. Il pose neuf constats en face de neuf phrases de ton document de
cadrage (`docs/CADRAGE-PRODUIT.md`). Quatre portent une réponse depuis le 2026-09-23 — les points 2, 4, 5
et 6. Les cinq autres attendent la leur, à une ligne chacun, à écrire à la place de « Ta décision ».

Trois réponses reviennent pour presque tous les points :

- **le finir** — c'est ce que tu veux, le produit l'a commencé, on termine ;
- **le retirer** — ça n'est pas ce que tu veux, ou pas maintenant, on l'enlève de ce que le visiteur voit ;
- **le dire autrement** — le produit fait X, on annonce X, on n'annonce plus Y en attendant.

Un écart n'est pas un bug. Mais un écart qu'on ne tranche pas devient une promesse que le produit ne tient pas
devant un candidat, et c'est exactement ce que tu veux éviter.

---

## 1. Le questionnaire : six dimensions annoncées, cinq groupes construits

**Ce que dit ton document.** Chapitre 7, module 1 : le questionnaire comporte six dimensions — profil
cognitif, motivations, talents naturels, centres d'intérêt, réalité actuelle, positionnement professionnel.

**Ce que le produit fait.** Le questionnaire a 31 questions réparties en cinq groupes : situation, profil
psychologique, intérêts, aptitudes, contraintes. Tes six dimensions sont toutes couvertes, mais deux des
tiennes — motivations et talents naturels — tombent dans un seul groupe côté produit, et un groupe côté
produit — les contraintes (temps, argent, obstacle) — n'existe pas dans ta liste.

**Ce que je propose.** Reconnaître les cinq groupes du produit comme la version réelle des six dimensions, et
écrire la correspondance dans `docs/CONTENU-PRODUIT.md` (tâche S2.5). Le produit n'a pas besoin de changer ;
ton document, si. Une dimension que personne ne compte n'est pas une dimension, c'est une phrase.

**Ta décision.**

---

## 2. « Le parcours principal est presque finalisé » : personne d'extérieur ne l'a parcouru

**Ce que dit ton document.** Chapitre 13 : « le parcours utilisateur principal est presque atteint », « la
priorité n'est plus de réinventer le parcours ».

**Ce que le produit fait.** Le parcours fonctionne. Il a été essayé des centaines de fois — par la personne
qui l'a construit. Zéro utilisateur hors de l'équipe, à ma connaissance, a fait les 31 questions jusqu'au
bout sans qu'on le guide.

**Ce que je propose.** Garder ta conclusion — ne pas réinventer le parcours — mais changer la preuve.
« Presque finalisé » veut dire, à partir de maintenant : « essayé cinq fois de suite par cinq personnes qui
ne sont pas de l'équipe, et ces cinq récits sont écrits ». C'est la tâche S1.6, et c'est ce qui ouvre le
sprint 3.

**Ta décision.** *Reçue le 2026-09-23 : cinq personnes hors de l'équipe, cette semaine.* Le protocole
d'observation et la fiche de compte rendu sont prêts dans `docs/TESTS-USAGERS.md` : cinq essais, cinq fiches,
et la règle qu'aucune retouche du parcours n'est décidée sans la fiche en face. → tâches S1.6 et S3.7.

---

## 3. « Premières briques de formation » : des étapes de parcours, aucune leçon

**Ce que dit ton document.** Chapitre 13, dans ce qui est déjà développé : « premières briques de formation ».

**Ce que le produit fait.** Un parcours affiche des modules, chaque module affiche quatre étapes calculées
automatiquement à partir de son titre et de sa durée. Aucun contenu de leçon : pas de cours, pas de ressource,
pas d'exercice, pas de vidéo. Un candidat peut donc suivre un parcours complet sans lire une seule ligne
écrite pour lui.

**Ce que je propose.** Deux choses à ne pas confondre. Aujourd'hui, le mot « formation » dans l'interface doit
désigner une orientation vers une formation existante ailleurs, pas une formation qu'AliTché donne : c'est la
tâche S1.5. Et la première vraie leçon est la tâche S5.2, qui attend la réponse au point 5 ci-dessous.

**Ta décision.**

---

## 4. L'étiquette « Premium » sans rien de payant derrière

**Ce que dit ton document.** Chapitre 19, ce qu'il ne faut pas développer maintenant, et chapitre 26 : le
modèle économique est une direction, pas une décision qui a été prise.

**Ce que le produit faisait à la mesure (23/09/2026).** Les modules marqués non gratuits portaient une étiquette
« Premium » à l'écran, comme si une offre payante existait. Aucun paiement n'est possible nulle part, aucun prix
n'est affiché, aucun compte payant ne se distingue d'un compte gratuit.

**Ce que je propose.** Retirer l'étiquette (tâche S1.5), et garder la distinction quelque part dans les
données pour ne pas avoir à la reconstruire le jour où tu décides ce qui est payant. Un visiteur qui voit
« Premium » sans prix en déduit soit que le site est bâclé, soit qu'il va devoir payer pour ce qu'on lui a
annoncé comme un outil d'orientation. Les deux coûtent plus cher que l'étiquette.

**Ta décision.** *Reçue le 2026-09-23 : l'étiquette est retirée de l'affichage. La distinction reste dans les
données, elle ne se voit plus.* → tâche S1.5.

**Où on en est, le soir du 23/09/2026.** Le mot « Premium » n'apparaît plus dans l'application, et le mot
« payant » non plus : la pastille a été retirée de la liste du parcours et de la fiche d'un module, la mention a
disparu de la fiche d'un domaine, et le cadenas des cartes de module — ouvert pour les gratuits, fermé pour les
six autres — est parti avec, parce que le mot avait disparu mais pas le symbole. Les six modules concernés
gardent leur drapeau dans leurs données, donc le jour où une offre payante existe, l'information est là et il n'y
a pas à la reconstituer.

---

## 5. Est-ce qu'AliTché héberge des cours, ou oriente vers des cours ?

**Ce que dit ton document.** Chapitre 7, module 4 : la plateforme doit permettre d'intégrer des modules de
formation, avec cours, ressources, vidéos, exercices, évaluations. Chapitre 17, priorité 3 : « compléter les
premiers modules de formation », chaque module devant tenir un objectif, un contenu, une progression, des
exercices, une validation et une compétence associée.

**Ce que le produit fait.** Rien de décidé. Les 51 modules du catalogue portent un titre, une durée, une
difficulté, un format, une liste de compétences en texte libre — et zéro contenu. Le produit est aujourd'hui
côté « orienter », et l'interface laisse croire qu'il est côté « héberger ».

**Ce que je propose.** C'est la seule question qui bloque un sprint entier. Répondre « orienter » : le sprint 5
devient « relier chaque module à une formation qui existe déjà quelque part, avec son lien et son inscription
». Répondre « héberger » : le sprint 5 devient « écrire six vrais modules », ce qui est un travail de contenu
et de pédagogie, pas de code, et qui demande un auteur. La première question de ta règle du chapitre 20 —
quel problème utilisateur cela résout-il ? — fait pencher la balance vers « orienter » d'abord.

**Ta décision.** *Reçue le 2026-09-23, en trois temps : d'abord orienter — AliTché renvoie vers des formations
qui existent ailleurs. Ensuite, les centres de formation et les universités pourront proposer leurs contenus,
qu'AliTché référence. Et à une étape où l'on en aura la capacité, on pourra produire nous-mêmes des modules
pour répondre à un besoin constaté.* Le sprint 5 se lit donc ainsi : relier, référencer, et ne rien écrire
avant d'avoir vu un besoin. Le deuxième temps (les contenus fournis par les établissements) ouvre un travail
nouveau, qui n'est pas encore dans le backlog : il faudra dire comment un établissement dépose un contenu, et
ce qui le rend digne d'être référencé. → tâche S5.1, et une tâche à créer.

---

## 6. Connexion Google et lien de connexion : construits, jamais appelés

**Ce que dit ton document.** Chapitre 13, ce qui est déjà développé : « création de compte ». Le document ne
parle ni de Google ni du lien de connexion.

**Ce que le produit faisait à la mesure (23/09/2026).** Les deux boutons existaient dans le code de la page de
connexion et fonctionnaient techniquement. Aucune interface de l'application ne les affichait : un candidat ne
pouvait créer un compte que par adresse e-mail et mot de passe. Le fichier de présentation du dépôt, lui, annonce
la connexion Google comme une fonctionnalité du produit.

**Ce que je propose.** Une décision pour les deux (tâche S2.2). Google : le finir et l'afficher, ou le retirer
— pour un public ouest-africain francophone, la connexion Google est probablement le meilleur bouton de la
page, ce qui milite pour la finir. Lien de connexion sans mot de passe : le retirer, il fait doublon avec le
mot de passe sans rien apporter tant qu'on n'a pas mesuré combien de gens l'utiliseraient.

**Ta décision.** *Reçue le 2026-09-23 : le lien de connexion sans mot de passe est retiré. La connexion Google
est terminée et affichée, à condition de n'engager aucune dépense — elle était restée là parce que la
configuration n'avait pas pu être menée à bout.* C'est gratuite des deux côtés, chez Google comme dans le
service d'authentification utilisé. Mais les deux manipulations qui ferment ce point se font hors du dépôt,
dans deux consoles en ligne : créer l'identifiant client chez Google, et l'activer côté authentification avec
l'adresse de retour. Ce que je peux tenir : préparer les valeurs exactes à coller, l'adresse de retour, et
l'écran qui affiche le bouton. Ce que tu tiens : les deux consoles. → tâche S2.2.

**Où on en est, le soir du 23/09/2026.** Côté dépôt, c'est fait : « Continuer avec Google » s'affiche sur l'écran
de connexion, « S'inscrire avec Google » sur l'écran de création de compte, et la fonction qui envoyait un lien
sans mot de passe est sortie du code. Le point n'est fermé que quand les deux consoles sont réglées — les valeurs
exactes à coller, adresse de retour comprise, sont écrites dans la tâche S2.2 du backlog. Un avertissement lié aux
cinq tests de la semaine : avant ces réglages, un clic sur le bouton mène sur une page d'erreur de Google. Soit tu
fais les deux réglages avant de lancer les tests, soit tu me dis de retirer le bouton jusque-là et je le retire.

---

## 7. Vérifier son adresse e-mail : deux chemins, un mort, aucun parcouru par une vraie personne

**Ce que dit ton document.** Chapitre 15, priorité 1 : la chaîne inscription → profil → orientation doit être
fluide, sans donner l'impression de passer d'une application à l'autre.

**Ce que le produit fait.** Un écran « Lien traité » existe et n'est jamais atteint par le vrai lien envoyé
aux candidats. Le lien reçu par e-mail mène ailleurs. Personne n'a, à ma connaissance, créé un compte avec une
vraie adresse, ouvert un vrai message, cliqué sur un vrai lien, et raconté ce qu'il a vu.

**Ce que je propose.** Un seul chemin (tâche S2.1), et la preuve : un compte créé avec une adresse qui n'est
pas la tienne, le message ouvert, le clic fait, le résultat noté. C'est deux heures de travail et c'est ce qui
sépare « l'inscription fonctionne sur ma machine » de « l'inscription fonctionne ».

**Ta décision.**

---

## 8. Les compétences : module central du document, simple étiquette de texte dans le produit

**Ce que dit ton document.** Chapitre 7, module 5 : « les compétences constituent un élément central du
produit » — les identifier, les suivre, leur niveau, les valider, comparer profil actuel et profil cible.

**Ce que le produit fait.** Une compétence n'existe pas. Les 51 modules du catalogue portent chacun une liste
de compétences en texte libre, recopiée à la main. Deux modules peuvent écrire « gestion de projet » et
« gestion de projets » et le produit ne saura pas que c'est la même chose. Rien ne peut être suivi, rien ne
peut être validé, aucun niveau n'est enregistré nulle part, aucune comparaison profil actuel ↔ profil cible
n'est possible.

**Ce que je propose.** C'est le point où ton document décrit l'avenir et où le code n'en a pas même la
première brique : à nommer comme tel plutôt qu'à corriger en cachette. La première marche est la tâche S4.4,
qui ne demande pas de construire un grand catalogue de compétences : il faut d'abord une liste réelle, sans
doublon, construite depuis ce que tes 51 modules disent déjà.

**Ta décision.**

---

## 9. Ce que le dépôt affirme du produit, et l'état réel du catalogue

Deux choses qui ne sont pas dans ton document mais qui décident de ce que les autres croient.

**Ce que le fichier de présentation du dépôt affirme.** Un serveur avec une authentification par jeton, un
gestionnaire de base de données séparé, une connexion Google. **Ce que le produit fait.** L'application parle à
la base de données depuis le navigateur du candidat. Le serveur décrit existe dans le dépôt, sous dossier
`backend/`, et rien ne l'appelle. Un partenaire, un recruteur, ou un outil d'intelligence artificielle qui lit
ce fichier ne décrit pas le même produit que toi. Proposition : le réécrire depuis le code, en français (tâche
S2.3), et ranger le serveur abandonné (tâche S2.4).

**Le catalogue.** 165 lignes d'écoles, formations et bourses. 151 portent une date de vérification, mais ces
151 dates ne forment que deux lots : 74 lignes datées du 21/09/2026, 77 du 22/09/2026. Ce n'est pas 151
contrôles, c'est deux saisies en masse. 50 lignes sur 151 renvoient vers un site qui recense des écoles, pas
vers l'école elle-même. Zéro ligne est marquée comme vérifiée individuellement. Un candidat qui suit notre
conseil et trouve porte fermée perd autre chose que du temps : il perd la disposition à suivre le prochain
conseil. Proposition : la tâche S2.6, dix lignes à la fois, et tant qu'un domaine n'est pas relu il est dit
non vérifié — ce qui est l'inverse de promettre, et ne coûte rien.

**Ta décision.**

---

## Où chaque réponse se lit dans le travail à faire

| Point | De quoi il parle | Bloque ? | Réponse | Tâche concernée |
|---|---|---|---|---|
| 1 | les six dimensions du questionnaire | non | en attente | S2.5 |
| 2 | « le parcours est presque finalisé » | oui, par une preuve | reçue : cinq personnes cette semaine | S1.6, S3.7 |
| 3 | les briques de formation déjà développées | non | en attente | S1.5 |
| 4 | l'étiquette de prix « Premium » | non | reçue et faite : retirée de l'écran, conservée dans les données | S1.5 |
| 5 | héberger des cours ou orienter vers des cours | **oui — tout le sprint 5 en dépend** | reçue : orienter, puis référencer, puis produire | S5.1 |
| 6 | Google et le lien de connexion | **oui — c'est ce qu'on annonce aux visiteurs** | reçue : Google affiché, lien sans mot de passe retiré ; restent les deux réglages en console | S2.2 |
| 7 | la vérification de l'adresse e-mail | non | en attente | S2.1 |
| 8 | les compétences comme élément central | non, mais ça décide du sprint 4 | en attente | S4.4 |
| 9 | ce que le dépôt affirme, et l'état du catalogue | non | en attente | S2.3, S2.4, S2.6 |

Les deux réponses qui bloquaient le planning sont tombées. Restent cinq points non tranchés : le 1 se règle en
écrivant la correspondance, les 3, 7, 8 et 9 se règlent en travaillant, et je les traite comme des évidences
sauf avis contraire de ta part.
