# AliTché, fiche d'identité du dépôt

Ce fichier décrit le produit qui existe aujourd'hui, pas celui qu'on avait imaginé au départ. Tout ce que j'y
écris se montre à l'écran en dix minutes sur `https://ali-ce-i6it.vercel.app`. Ce qui n'est pas encore vrai y est
écrit comme non vérifié, plutôt que passé sous silence.

## Ce qu'AliTché fait

AliTché est une application web d'orientation et de parcours, pensée pour la francophonie africaine. Une personne
répond à un questionnaire, voit les domaines de carrière que ses réponses dessinent et dans quel ordre elle s'en
rapproche, ouvre la fiche d'un domaine pour comprendre ce que ce métier-là exige vraiment, choisit une direction,
reçoit un parcours de modules à suivre dans un ordre qui tient, puis découvre où se former : établissements,
formations et bourses.

Le travail à faire se lit dans `docs/BACKLOG.md`. Le cadrage qui fait foi est `docs/CADRAGE-PRODUIT.md` : c'est
lui que le dépôt doit servir, et non l'inverse. Le planning se tient hors de l'application, dans l'outil de
suivi d'activité.

## Ce qui ne fait pas partie du produit

Il n'y a pas de serveur applicatif à moi. Le navigateur parle directement au service qui tient la base de
données, la fabrication des comptes et le stockage des images. De ce service, le produit n'utilise que trois
tables : les profils, les réponses au questionnaire et la progression dans les modules. Chacune est fermée par des
règles de sécurité qui limitent la lecture et l'écriture au propriétaire du compte.

Le dossier `backend/` est l'amorce abandonnée d'un serveur avec jetons et base PostgreSQL gérée à la main. Rien
dans l'application ne l'appelle. Le fichier `src/services/api.client.ts` est le client de ce serveur : personne ne
l'importe. La variable `VITE_API_URL` n'est lue nulle part, même si elle traîne encore dans un fichier de réglages
locaux. Vingt-deux autres fichiers Markdown dorment à la racine du dépôt, pour la plupart des guides de déploiement
écrits pour des plate-formes que le projet n'utilise plus. Ranger tout cela sans rien casser est la tâche S2.4 du
backlog.

## Les écrans, dans l'ordre où on les traverse

| On est ici | Adresse | Ce qu'on y voit |
| --- | --- | --- |
| Accueil public | `/` | ce que fait AliTché, et l'entrée vers l'essai ou vers son compte |
| Essai sans compte | `/trial` | l'écran d'avant-questionnaire, le questionnaire, puis les résultats en mode invité avec l'invitation à créer un compte pour garder la direction choisie |
| Questionnaire | `/app` après connexion | les questions, une par écran, avec la barre de progression et la reprise là où on s'était arrêté |
| Résultats | `/app` | le classement des domaines de carrière approchés, le profil psychologique et le profil de compétences, et les deux façons de poursuivre |
| Fiche d'un domaine | `/app` | ce que le domaine demande, les métiers qui l'exigent, les terrains où on le pratique, et les écoles, formations et bourses qui s'y rattachent |
| Écran de direction | `/app` | le métier visé, la spécialisation retenue, et le parcours qui se construit dessus |
| Parcours | `/app` | les modules dans l'ordre, la progression enregistrée module par module, et l'avertissement quand une progression n'a pas pu partir sur le compte |
| Tableau de bord | `/app` | où on en est, ce qui reste à faire, et l'entrée vers le profil |
| Profil | `/app` | la photo, le nom que l'on corrige, l'adresse e-mail en lecture seule, et l'effacement de ses données |
| Compte | `/login`, `/register` | adresse e-mail et mot de passe |
| Adresse à confirmer | `/verify-email`, `/verify-email-sent` | l'écran qui dit quoi faire du lien reçu, et celui qui prévient quand le lien a expiré |
| Mot de passe | `/forgot-password`, `/reset-password` | la demande de nouveau mot de passe et sa saisie |
| Retour d'un fournisseur externe | `/auth/callback` | le chemin est en place, le bouton qui l'empruntait est retiré de l'écran, voir S2.2 |

Une limite à dire franchement : l'espace connecté tient tous ses écrans sur la seule adresse `/app` et change
d'écran sans changer l'adresse. C'est le travail S3.1, « une adresse par étape », qui doit y remédier.

## Ce que contient le produit

Les nombres du produit, qu'il s'agisse des questions, des domaines de carrière, des métiers, des axes, des
modules ou des chances de formation, se lisent à un seul endroit : `docs/CONTENU-PRODUIT.md`. Je ne les recopie
pas ici. C'est justement parce qu'ils étaient écrits à quatre endroits différents qu'ils ont commencé à se
contredire. Une vérification automatique les recompte dans le catalogue et rougit si un document du dépôt écrit un
chiffre que le catalogue ne donne pas.

## Faire tourner le projet sur sa machine

Il faut Node.js. Sur le poste de développement, la version 24 est installée et convient.

```bash
npm install
```

Deux réglages vont dans un fichier `.env.local` à la racine, et ce sont les deux seules choses que l'application
attend :

```
VITE_SUPABASE_URL=https://l-adresse-de-votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=la-cle-publique-du-projet
```

Les clés du projet en ligne ne sont pas dans le dépôt et je ne les recopie pas ici : elles vivent dans les
variables de l'environnement de la plate-forme d'hébergement. Sans ces deux réglages, l'application n'affiche aucun
écran du produit. Elle affiche à la place un écran de configuration qui nomme la variable manquante et dit pourquoi
elle est refusée. C'est voulu : mieux vaut cet écran qu'un produit qui fonctionne à moitié en silence.

```bash
npm run dev
```

Le serveur de développement écoute sur `http://localhost:5173`. Sur certaines machines, y compris celle-ci, il ne
répond qu'en adressage IPv6 et le navigateur ou un outil de contrôle ne le voit pas : lancer alors
`npm run dev -- --host 127.0.0.1` pour qu'il écoute aussi sur l'adresse utilisée partout ailleurs.

## Les trois commandes qui veillent sur le dépôt

| Commande | Ce qu'elle refuse |
| --- | --- |
| `npm run verify` | Trois contrôles. Le premier construit un profil pour chacune des quatre situations de départ et vérifie que le parcours rendu tient debout : des modules qui existent, des durées cohérentes, le bon nombre de questions. Le deuxième veille sur la qualité du signal : la part du score qui vient d'une question où le candidat nomme lui-même son domaine ne doit pas dépasser ce que j'ai admis, domaine par domaine et en cumulé. Le troisième recompte le catalogue et relit `docs/CONTENU-PRODUIT.md` ainsi que les autres documents du dépôt. |
| `npm run lint` | Le style de code, avec zéro avertissement toléré. Elle ne tourne pas aujourd'hui : le dépôt déclare l'outil dans `package.json` mais ne porte aucun fichier de configuration, alors la commande sort en erreur avant de regarder un seul fichier. Écrire cette configuration fait partie de la tâche S2.4. |
| `npm run build` | La compilation TypeScript puis l'assemblage des fichiers du site. C'est exactement ce que la mise en ligne exécute. |

Quand tout va bien, `npm run verify` écrit trois fois « Tous les contrôles passent. ». Ces contrôles se lisent
dans `src/checks/`. Ils se conduisent comme des tests : on les lance avant de pousser, et après avoir touché un
nombre du catalogue.

## Mise en ligne

Le site est hébergé sur Vercel et lié au dépôt. Une poussée sur `master` part en production en moins de cinq
minutes. La commande exécutée par la plate-forme est `vercel-build`, qui appelle `npm run build`. Le fichier
`vercel.json` ne fait qu'une seule chose : renvoyer toutes les adresses vers `index.html`, pour que `/login` ou
`/app` s'ouvrent directement et pas seulement depuis l'accueil. Épingler une version ancienne de Node dans les
réglages de la plate-forme a déjà cassé le build : on garde le choix par défaut.

## Ce qui n'est pas encore vrai

Je préfère l'écrire ici que le découvrir plus tard.

L'isolement d'un compte par rapport à un autre n'a jamais été prouvé par deux vrais comptes sur deux appareils :
c'est la tâche S1.4, et le code est en ligne pour ça. Cinquante liens sur les cent cinquante et une lignes
vérifiées du catalogue mènent à un site agrégateur plutôt qu'à l'établissement lui-même, et les dates de
vérification forment deux lots plutôt que cent cinquante et une relectures : c'est la tâche S2.6. La connexion par
compte externe est retirée de l'écran parce que son réglage chez le fournisseur exige une carte de paiement que je
n'ai pas encore : c'est la tâche S2.2, et le code reste dans le dépôt. Deux fausses promesses tiennent encore dans
l'interface : c'est la tâche S1.5. Le dépôt, enfin, enregistre des bibliothèques et un serveur mort : c'est S2.4.

Ce qu'AliTché ne fait pas, et ne fait pas exprès : tenir un emploi du temps, délivrer une certification, donner un
espace à un employeur, ni mettre en relation avec quelqu'un. Ces chantiers existent dans le cadrage, à des niveaux
qui ne sont pas « maintenant ».

## Les documents du dépôt

| Fichier | Ce qu'il tient |
| --- | --- |
| `docs/CADRAGE-PRODUIT.md` | L'autorité produit : ce que je veux construire, par quelle priorité, à quel niveau. |
| `docs/BACKLOG.md` | Le travail à faire, en sprints, écrit en français et sans sigles. |
| `docs/MODULES.md` | Les dix modules attendus et, fonctionnalité par fonctionnalité, ce que le code rend vraiment. |
| `docs/CONTENU-PRODUIT.md` | Les nombres du produit, mesurés et non recopiés. |
| `docs/ECARTS-PRODUIT-CODE.md` | Les points où le cadrage et le produit ne disent pas la même chose, et leur suivi. |
| `docs/TESTS-USAGERS.md` | Le protocole des sessions de test avec des personnes hors de l'équipe. |
| `docs/tests/` | La fiche de test et ce que chaque session a donné. |
| `docs/hors-usage-2026-09-23/` | Ce que j'ai rangé sans le détruire : l'ancienne méthode et ses documents. |

Trois textes en anglais antérieurs au cadrage attendent le même rangement : `docs/Ali_Ce_Product_Overview_Public.md`,
`docs/PRD_Ali_Ce_Private.md` et `docs/PRD_Ali_Ce_Private.html`.

## Licence et auteur

Le code de ce dépôt est propriétaire, tous droits réservés. Le projet est conduit par son fondateur, dont
l'adresse et le compte GitHub figurent dans l'historique des commits et dans l'adresse du dépôt.
