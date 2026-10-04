# AliTché — le travail à faire

**Réorganisé le 2026-10-04** sur mon backlog de référence fonctionnel — « Backlog de référence AliTché, de
l'admission à l'insertion : construis ta voie », version 1.0, octobre 2026 — que je tiens pour mon périmètre.
Ce fichier ne remplace plus ce document : il le contient. Les cent trente-sept lignes d'inventaire sont recopiées
ici, ligne à ligne, avec leurs identifiants, et chaque ligne porte maintenant en face ce que mon produit fait
vraiment. Les vingt-neuf tâches des sprints, leurs preuves et mes décisions sont toujours là, dans la partie B, à
leur place et avec leurs mots.

**Document de référence produit :** `docs/CADRAGE-PRODUIT.md`, que j'ai écrit le 2026-09-23. En cas de désaccord
sur ce qu'AliTché doit être, c'est lui qui a raison. Sur ce que le produit contient, c'est
`docs/CONTENU-PRODUIT.md`. Sur ce qui reste à faire, c'est ce fichier.

## Où lire quoi

| Je cherche | Je lis |
|---|---|
| ce qu'AliTché doit être | `docs/CADRAGE-PRODUIT.md` |
| la liste de tout ce que le produit pourrait faire, rangée par espace et par fonctionnalité, avec un identifiant | **partie A** de ce fichier, puis mon document de référence, `Backlog_de_reference_AliTche.docx`, qui fait foi sur le périmètre |
| ce que le produit fait vraiment aujourd'hui | la sixième colonne des tableaux de la partie A, et `docs/CONTENU-PRODUIT.md` pour les nombres |
| ce que je fais, dans quel ordre, et ce qui est fini | **partie B** |
| où le document de référence et mon produit se contredisent | **partie C** |
| ce qui est écrit dans l'outil de suivi | **partie D** |
| les dix modules, fonctionnalité par fonctionnalité | `docs/MODULES.md` |
| les points où le produit et le code ne disent pas la même chose | `docs/ECARTS-PRODUIT-CODE.md` |

Une chose à dire sur ce document de référence : il vit dans mon dossier de téléchargements, pas dans le dépôt. Le
dépôt en porte maintenant la copie intégrale en français, mais l'original n'est nulle part où il survive à un
changement d'ordinateur. Je note la question en partie C, et je ne copie pas le fichier sans qu'on me le dise.

## Comment lire une tâche

Chaque tâche dit six choses, en français :

- **Ses identifiants** — les lettres et les chiffres de mon inventaire, par exemple `IND02-F04`. C'est le lien avec
  la partie A et avec les cartes de l'outil de suivi. Une tâche qui n'en porte pas est une tâche technique : elle
  est rattachée quand même, parce que j'ai écrit que tout travail technique doit tenir sur une fonctionnalité.
- **Ce que ça change pour l'utilisateur** — ce qu'il verra, ou ne verra plus.
- **Pourquoi maintenant** — le lien avec une priorité du document de cadrage.
- **Comment on saura que c'est fini** — une liste courte, vérifiable à la main, sans discussion.
- **Taille** — une journée, trois jours, une semaine. C'est un ordre de grandeur, pas un engagement.
- **Où ça se joue** — le ou les écrans et fichiers concernés, pour celui qui code.

Une tâche porte deux numéros qui ne se ressemblent pas et ne se remplacent pas : `S1.3`, qui est le mien et dit
dans quel sprint elle tombe, et `IND02-F04`, qui est celui du document de référence et dit de quoi il s'agit.

## Les deux échelles que ce fichier porte

La mienne dit **quand**, celle du document dit **combien ça compte**. Elles ne se contrarient pas, elles se lisent ensemble.

| Mon niveau | Sens | Ce que ça donne dans le document |
|---|---|---|
| **Maintenant** | indispensable au fonctionnement du produit actuel | les `P0` et une partie des `P1` |
| **Ensuite** | important, mais ne bloque pas | le reste des `P1` et les `P2` |
| **Plus tard** | utile à l'évolution | les `P2` et une partie des `P3` |
| **Vision** | stratégique à long terme | les `P3` et la ligne « hors du premier indispensable » |
| **Parking** | idée intéressante, pertinence pas encore démontrée | rien : le document de référence ne connaît pas ce cas, et c'est très bien ainsi |

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
**45 métiers documentés**, choisir une direction et recevoir un parcours bâti sur **51 modules**, avec **173
écoles, formations et bourses** référencées. Le produit n'a encore été **testé par personne hors de l'équipe**,
et rien de ce parcours n'a été **vu rendu à l'écran par un utilisateur réel**. C'est pour ça que la priorité 0
de mon document — stabiliser — est aussi la première du backlog.

---

# Partie A — mon inventaire fonctionnel, ligne par ligne

Cette partie vient du document, pas de mes mesures : le découpage, les noms, les identifiants, les statuts, les
priorités et le périmètre écrit dans la cinquième colonne viennent de mon backlog de référence, recopiés sans
retouche. La sixième colonne est la seule que j'ajoute, et elle est à charge : c'est ce que le produit fait, mesuré
dans le dépôt et sur le site en ligne, et non ce que j'aimerais y voir. Quand les deux colonnes ne tombent pas
d'accord, le désaccord est écrit en partie C avec un numéro.

## Comment lire les six statuts du document

Le document range chaque ligne dans un état, et j'ai gardé les états écrits tels quels dans la colonne « Statut écrit » :

| Statut écrit | Ce que le document entend par là | Ce que j'y ai mis en face |
|---|---|---|
| `EXISTANT` | déjà opérationnel dans le produit actuel | je les ai toutes repassées, dans le code et à l'écran : c'est l'état le plus juste des six |
| `PARTIELLEMENT EXISTANT` | une partie du besoin est là, le périmètre cible non | c'est l'état le plus fréquent de mes propres écrans, et je le confirme plus souvent que le document ne l'écrit |
| `À AMÉLIORER` | là, mais à reprendre | d'accord, et je nomme ce qui manque |
| `À DÉVELOPPER` | prévu, pas disponible | **cent onze lignes sur cent trente-sept.** C'est le vrai chiffre de notre avancement |
| `À VALIDER` | besoin identifié, fonctionnement à confirmer | les trois lignes de cet état sont en fait en ligne et fonctionnent : désaccord n° 2 |
| `HORS MVP` | gardé dans la vision, exclu du premier indispensable | une seule ligne, et c'est cette ligne qui contredit mon sprint 5 : désaccord n° 7 |

Le document range aussi chaque ligne par priorité, et les quatre mots du document ne sont pas les miens :

| Priorité écrite | Ce que le document entend par là | Combien de lignes |
|---|---|---|
| `P0` | le cœur du produit, sans quoi la promesse ne tient pas | vingt-cinq |
| `P1` | la première version solide | trente-cinq |
| `P2` | l'évolution, après consolidation | cinquante et un |
| `P3` | le long terme, ou ce qui dépend d'un partenariat | vingt-six |

## Ce que dit le découpage du document, avant les tableaux

Trois espaces, plus une porte d'entrée et un atelier : la page d'accueil pour tout le monde, puis quatre espaces
utilisateurs — les individus, les universités et centres de formation, les consultants et centres d'employabilité,
les entreprises —, l'espace d'administration derrière, et le transversal qui sert à tous. Le document de référence pose que le
module des individus est le cœur du parcours produit et que le reste complète l'écosystème autour. C'est exactement
l'ordre de mes sprints, et je n'ai rien à y changer.

Les huit principes du document, et ce qu'ils me demandent :

1. **Le parcours de l'individu est le cœur.** Ma chaîne à moi s'arrête avant l'insertion : je documente les écoles,
   les formations et les bourses, aucun stage ni aucun emploi. Le principe est reçu, la fin de la chaîne non.
2. **Ne pas surcharger le premier choix de parcours.** Fait : l'écran de direction propose, la personne consulte,
   puis confirme. La personnalisation est renvoyée après.
3. **Le profil évolue dans le temps.** Non fait, et c'est écrit en face de `IND03-F05` : rien ne remonte de la
   progression vers le profil. C'est S4.3.
4. **Refaire l'orientation ne réinitialise pas le profil.** Fait, et le document de référence la met encore « à développer » :
   désaccord n° 3.
5. **Le test sans compte doit réduire la friction, et le travail doit survivre au passage au compte.** Fait à
   moitié, avec un piège que le tableau du document ne dit pas : la garde est une seule par appareil. C'est S1.4.
6. **Les fonctions institutionnelles dépendent d'un partenariat.** Reçu, et sans objet tant que l'espace
   établissement n'existe pas.
7. **L'administration reste à part.** Reçu en principe, pas en fait : chez moi les référentiels vivent dans des
   fichiers du dépôt, personne n'a d'écran pour les reprendre. C'est le désaccord n° 6, le plus lourd des onze.
8. **Le backlog est la source de vérité fonctionnelle.** C'est pour ça que la partie A existe dans ce fichier et
   plus seulement dans un document à côté. La règle a une conséquence que j'ai mise en partie D : une carte de
   suivi ne crée pas une fonctionnalité, elle la répète.

Les relations entre modules du document, en une phrase chacun : un individu consulte des formations et interagit avec des
établissements ; un individu demande un accompagnement ; un individu accède à des opportunités et, à terme, entre
dans un processus d'évaluation ; une entreprise évalue ses collaborateurs et l'alignement de leur projet ; le suivi
académique avancé d'une université dépend d'un partenariat ; l'administration fournit à tous les référentiels, les
règles, les contenus, les réglages et les droits. **Aucune de ces sept relations ne se joue entre deux comptes dans
mon produit**, pour une raison simple : il n'y a qu'une seule sorte de compte, l'individu. La septième pourtant est
remplie — l'administration qui fournit les référentiels à tout le monde, c'est moi, à la main, dans les fichiers du
dépôt, et c'est la seule façon dont elle l'est.

La dernière page du document est un parcours cible en quatorze pas, de l'arrivée sur AliTché jusqu'à l'évolution du profil et la
possibilité de refaire l'orientation. Les pas 1 à 9 sont en ligne, de l'arrivée au choix de la direction puis à sa
validation. Le pas 10, créer ou compléter le profil quand il le faut, est le plus creux : deux champs. Les pas 11 et
12, démarrer le parcours et le suivre, sont en ligne. Au pas 13, on accède aux formations, aux écoles et aux
bourses, mais à rien qui ressemble à un stage, un emploi ou un accompagnement. Au pas 14, on peut refaire son
orientation, on ne peut pas encore faire évoluer son profil avec le temps.

## Une seule des lignes du document a un détail sous elle

`IND03-F03`, le remplissage du profil, est découpée en sept blocs dans le document de référence : informations personnelles,
parcours académique, compétences, expériences, certifications, documents, projets et réalisations. Suivant chacun,
le document écrit la règle qui compte : refaire l'orientation ne réinitialise pas le profil, les informations personnelles
restent, et seul le résultat d'orientation est remplacé après validation. Mon écran du profil tient aujourd'hui sur
deux champs, nom et photo, face à ces sept blocs. C'est l'écart le plus simple à voir de tout l'inventaire.


## Le chapitre 4 — la page d'accueil

### LP01 — Présentation d’AliTché (le document ne nomme pas ce bloc) — 1 ligne au cœur du produit

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `LP01-F01` | Présentation d’AliTché | EXISTANT / À AMÉLIORER | P1 | Proposition de valeur, problème traité, promesse. | La page d'accueil est en ligne et dit qui elle aide et ce qu'elle promet. Le mot que j'avais exclu et les quatre onglets morts l'ont quittée le 23/09 (S1.5). |
| `LP01-F02` | Présentation du parcours AliTché | À DÉVELOPPER | P1 | Expliquer le passage de l’admission à l’insertion. | À moitié fait : l'accueil raconte trois étapes numérotées, du parcours guidé à la lecture du profil. Le titre du document, « de l'admission à l'insertion », ne s'y lit pas : mon parcours s'arrête avant l'insertion. |
| `LP01-F03` | Accès au démarrage rapide | EXISTANT | P0 | Entrée directe vers le Trial / questionnaire. | C'est fait : le bouton « Découvrir mon profil » ouvre le test sans demander de compte. |
| `LP01-F04` | Accès aux espaces utilisateurs | À DÉVELOPPER | P1 | Accès individus, établissements, consultants, entreprises. | Les quatre accès n'existaient que comme texte ; je les ai retirés le 23/09 parce qu'un clic ne produisait rien et qu'aucune adresse du site ne leur correspondait. À remettre quand les espaces existent. |
| `LP01-F05` | Présentation de l’écosystème | À DÉVELOPPER | P2 | Formation, accompagnement, opportunités, entreprises. | Rien : l'accueil ne parle que des candidats, ni des établissements, ni des entreprises, ni de l'accompagnement. |


## Le chapitre 5 — les individus

### IND01 — Onboarding & accès — 4 lignes au cœur du produit

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `IND01-F01` | Inscription | EXISTANT | P0 | Création de compte. | C'est fait : la création de compte en ligne, avec vérification de l'adresse e-mail. Le chemin de vérification doit être unique, c'est S2.1. |
| `IND01-F02` | Connexion | EXISTANT | P0 | Accès au compte. | C'est fait : la connexion par mot de passe, et le bouton Google affiché sur l'écran de connexion depuis le 23/09. Ses deux réglages chez le fournisseur attendent la carte bancaire que je n'ai pas. |
| `IND01-F03` | Gestion de session | À AMÉLIORER | P1 | Maintien de session, déconnexion, sécurité de base. | À moitié : la session tient, la déconnexion est nette, un second appel de connexion n'évince plus le premier. Ce qui reste dur, c'est la reprise quand la connexion est lente. |
| `IND01-F04` | Démarrage rapide / Trial | EXISTANT | P0 | Questionnaire sans création préalable de compte. | C'est fait : le test sans compte, enchaîné sur six écrans, du message d'accueil du test jusqu'à l'écran de direction. |
| `IND01-F05` | Passage du Trial au compte | PARTIELLEMENT EXISTANT | P0 | Conserver les résultats et choix déjà effectués lors de la création du profil. | À moitié : le résultat du test est gardé sur l'appareil puis poussé sur le compte à l'inscription. Ce qui manque est un piège : la clé de garde est une seule par appareil, pas une par personne, donc un ordinateur partagé peut porter le profil de la personne précédente dans le compte suivant. C'est S1.4. |

### IND02 — Orientation & recommandations — 8 lignes au cœur du produit

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `IND02-F01` | Questionnaire d’orientation | EXISTANT | P0 | 23 questions structurées en 6 sections : cognition, motivations/passions, talents, intérêts, réalité, positionnement. | C'est fait, mais pas au chiffre écrit : 31 questions en cinq groupes — « Votre situation », « Votre profil », « Vos centres d'intérêt », « Vos aptitudes », « Vos contraintes ». Selon la situation déclarée, on en répond 29 ou 30. Le document en annonce 23 en six sections, et « talents » n'a pas de groupe à son nom chez moi. Désaccord n° 1. |
| `IND02-F02` | Génération du résultat d’orientation | EXISTANT | P0 | Production du profil / résultat à partir des réponses. | C'est fait : le classement sort des réponses, et personne ne déclare son domaine à l'avance, il est déduit. |
| `IND02-F03` | Consultation du résultat | EXISTANT | P0 | Présentation claire du résultat. | C'est fait : le classement des domaines, une phrase de profil pour chacun, et la part qui revient à chaque domaine. |
| `IND02-F04` | Sauvegarde du résultat | EXISTANT | P1 | Conserver le résultat pour le retrouver. | C'est fait : gardé sur l'appareil, et sur le compte quand il y en a un. L'avertissement à l'écran quand l'envoi n'a pas pu partir est en ligne depuis S1.3. |
| `IND02-F05` | Téléchargement / export du résultat | À VALIDER | P1 | Format et niveau d’export à confirmer. | C'est fait, quatre sorties : impression, envoi par le partage du navigateur, copie dans le presse-papiers, fichier texte téléchargé. Ce qui manque est un seul format, le PDF. Désaccord n° 2. |
| `IND02-F06` | Recommandations de voies / formations | EXISTANT | P0 | Les recommandations incluent la voie et les formations associées. | C'est fait : cinq modules par domaine retenu, et derrière, les formations du catalogue qui mènent à une adresse. |
| `IND02-F07` | Exploration des recommandations | EXISTANT | P0 | Parcourir les options proposées avant décision. | C'est fait : les trois écrans « domaine, tous ses métiers, puis spécialisations » sont en ligne et se construisent avec leurs données. |
| `IND02-F08` | Choix d’une voie | EXISTANT | P0 | L’utilisateur peut sélectionner une voie recommandée. | C'est fait : la direction se choisit puis se confirme à l'écran de ciblage, et le choix s'écrit dans le profil. |
| `IND02-F09` | Consultation du parcours associé | PARTIELLEMENT EXISTANT | P0 | Voir le parcours lié à la voie choisie. | C'est fait : le parcours lié s'affiche, pistes, modules, semaines, et ce que chaque module apporte. |
| `IND02-F10` | Validation du parcours envisagé | À VALIDER | P0 | Validation avant démarrage définitif. | C'est fait : la direction confirmée devient le parcours, et repart sur un autre appareil avec le profil. Ce qui reste à valider est le mot à l'écran, pas le mécanisme. Désaccord n° 2. |

### IND03 — Profil individuel — 3 lignes au cœur du produit

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `IND03-F01` | Création du profil | EXISTANT / PARTIELLEMENT EXISTANT | P0 | Création après ou pendant le passage du Trial au compte. | À moitié : l'identité tient en deux champs, nom et photo. Les réponses du test ne remplissent pas encore l'écran du profil, c'est S3.3. |
| `IND03-F02` | Consultation du profil | À AMÉLIORER | P1 | Vue consolidée des informations personnelles et du parcours. | À moitié : « Mon Profil » affiche la photo et le nom, avec le lien vers les réglages du compte. La vue consolidée qu'il demande, profil et parcours ensemble, n'existe pas. |
| `IND03-F03` | Remplissage du profil | À DÉVELOPPER | P0 | Fonctionnalité regroupant les sous-parties ci-dessous. | Pas fait, et son statut est juste : c'est exactement ce qui manque. Deux champs seulement sont remplis. |
| `IND03-F04` | Modification du profil | À DÉVELOPPER | P0 | Modifier les informations existantes. | À moitié : le nom et la photo se modifient et repartent sur le compte. Rien d'autre n'est modifiable. |
| `IND03-F05` | Actualisation du profil | À DÉVELOPPER | P1 | Mettre à jour le profil au fil du temps. | Pas fait : le profil ne bouge plus après le test. S4.3. |
| `IND03-F06` | Refaire son orientation | À DÉVELOPPER | P1 | Rejouer l’orientation sans supprimer les informations personnelles. | C'est fait : depuis mon espace, le bouton d'accueil ramène au test, et le compte garde sa photo et son nom. Désaccord n° 3. |

### IND04 — Parcours — 2 lignes au cœur du produit

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `IND04-F01` | Consultation du parcours | PARTIELLEMENT EXISTANT | P0 | Voir le parcours recommandé après le choix de la voie. | C'est fait : le parcours recommandé s'affiche dès la direction confirmée, avec ses modules et leurs semaines. |
| `IND04-F02` | Validation du parcours | À VALIDER | P0 | Valider et démarrer le parcours. | C'est fait : la validation se fait à l'écran de ciblage, et le premier module s'ouvre depuis le parcours. Désaccord n° 2. |
| `IND04-F03` | Personnalisation du parcours | HORS MVP | P2 | Ajouter, retirer, remplacer, réordonner ou ajouter une étape personnelle. Fonction dédiée ultérieurement. | À moitié, depuis le 2026-10-04 : écarter une séance, la reprendre, changer son rang dans une piste et doser ses heures par semaine se font à l'écran du parcours, le parcours se recalcule aussitôt, et mes retouches repartent avec mon profil. Restent à faire : y ajouter une séance qui n'était pas proposée, écrire une étape qui m'est personnelle, et garder l'histoire de mes changements. Le document classe cette ligne « hors du premier indispensable » et je l'ai quand même commencée : désaccord n° 7, et cette fois c'est moi qui ai bougé. |

### IND05 — Progression

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `IND05-F01` | Visualisation de la progression | À DÉVELOPPER | P1 | Vue synthétique de l’avancement. | C'est fait : le tableau de bord affiche les modules faits sur le total et le pourcentage qui en sort, calculés, jamais écrits à la main. Désaccord n° 4. |
| `IND05-F02` | Suivi des étapes | À DÉVELOPPER | P1 | Voir les étapes du parcours. | C'est fait : les pistes et leurs modules s'affichent dans l'ordre. Désaccord n° 4. |
| `IND05-F03` | Mise à jour de l’avancement | À DÉVELOPPER | P1 | Actualiser les étapes réalisées. | À moitié : la progression est enregistrée, sur le compte et sur l'appareil, mais elle ne remonte pas au profil. C'est S4.3, et c'est le seul de ses cinq lignes qui mérite son « à développer ». |
| `IND05-F04` | Validation d’une étape | À DÉVELOPPER | P1 | Marquer une étape comme terminée. | C'est fait : un module se marque terminé à l'écran et l'état repart sur le compte. Désaccord n° 4. |
| `IND05-F05` | Historique du parcours | À DÉVELOPPER | P2 | Historique des évolutions. | Pas faite : aucune histoire des changements de direction n'est gardée. |

### IND06 — Opportunités

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `IND06-F01` | Découverte des opportunités | À DÉVELOPPER | P1 | Stages, emplois, formations, programmes, concours ou autres opportunités pertinentes. | À moitié, et c'est le mot exact : 173 lignes d'écoles, de formations et de bourses à l'écran, 159 avec une adresse réelle. Aucun stage, aucun emploi, aucun concours, aucun programme. Désaccord n° 5. |
| `IND06-F02` | Consultation d’une opportunité | À DÉVELOPPER | P1 | Détails et conditions. | À moitié : la fiche d'une chance affiche ses conditions et son adresse ; les détails d'un stage ou d'un emploi manquent faute d'offre. Désaccord n° 5. |
| `IND06-F03` | Recommandation d’opportunités | À DÉVELOPPER | P2 | Personnalisation selon le profil et le parcours. | À moitié : les chances sont reliées au domaine, pas encore au métier visé. C'est ma ligne E1. |
| `IND06-F04` | Sauvegarde d’une opportunité | À DÉVELOPPER | P2 | Retrouver une opportunité. | Rien de ce côté : ni mise de côté pour retrouver une chance plus tard, ni trace d'une candidature. |
| `IND06-F05` | Candidature | À DÉVELOPPER | P2 | Candidature directe ou redirection selon le cas. | Pas faite : AliTché ne poste aucune candidature et ne redirige vers aucun formulaire d'offre. |
| `IND06-F06` | Suivi des candidatures | À DÉVELOPPER | P2 | Statut des candidatures. | Rien de ce côté : ni mise de côté pour retrouver une chance plus tard, ni trace d'une candidature. |

### IND07 — Notifications & rappels

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `IND07-F01` | Notifications | À DÉVELOPPER | P1 | Informations liées au parcours et aux opportunités. | Aucune notification dans le produit : ni écran, ni table, ni envoi. Les seuls messages sont les avertissements à l'écran de S1.3. |
| `IND07-F02` | Rappels | À DÉVELOPPER | P2 | Rappels d’étapes, actions ou échéances. | Aucune notification dans le produit : ni écran, ni table, ni envoi. Les seuls messages sont les avertissements à l'écran de S1.3. |
| `IND07-F03` | Préférences de notification | À DÉVELOPPER | P2 | Canaux et types de notifications. | Aucune notification dans le produit : ni écran, ni table, ni envoi. Les seuls messages sont les avertissements à l'écran de S1.3. |

### IND08 — Accompagnement

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `IND08-F01` | Demande d’accompagnement | À DÉVELOPPER | P2 | Solliciter un accompagnement. | Rien : AliTché n'a ni conseiller, ni mise en relation, ni suivi d'accompagnement. Ce bloc est dans ma « Vision ». |
| `IND08-F02` | Mise en relation | À DÉVELOPPER | P2 | Connexion avec consultant / centre d’employabilité. | Rien : AliTché n'a ni conseiller, ni mise en relation, ni suivi d'accompagnement. Ce bloc est dans ma « Vision ». |
| `IND08-F03` | Suivi de l’accompagnement | À DÉVELOPPER | P2 | Historique et suivi. | Rien : AliTché n'a ni conseiller, ni mise en relation, ni suivi d'accompagnement. Ce bloc est dans ma « Vision ». |


## Le chapitre 6 — les universités et centres de formation

### UNI01 — Onboarding & accès

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `UNI01-F01` | Création de compte établissement | À DÉVELOPPER | P1 | — | Aucune route d'établissement, aucun écran, aucune table. |
| `UNI01-F02` | Connexion | À DÉVELOPPER | P1 | — | Aucune route d'établissement, aucun écran, aucune table. |
| `UNI01-F03` | Gestion des utilisateurs internes et rôles | À DÉVELOPPER | P2 | — | Aucune route d'établissement, aucun écran, aucune table. |

### UNI02 — Profil établissement

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `UNI02-F01` | Profil de l’établissement | À DÉVELOPPER | P1 | — | Aucune route d'établissement, aucun écran, aucune table. |
| `UNI02-F02` | Informations et présentation | À DÉVELOPPER | P1 | — | Aucune route d'établissement, aucun écran, aucune table. |
| `UNI02-F03` | Gestion des campus / sites | À DÉVELOPPER | P2 | — | Aucune route d'établissement, aucun écran, aucune table. |

### UNI03 — Formations & catalogue

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `UNI03-F01` | Création / gestion des formations | À DÉVELOPPER | P1 | — | Aucune saisie possible par un établissement : les formations du catalogue sont nos lignes à nous. C'est ma ligne E8. |
| `UNI03-F02` | Programme et contenu des formations | À DÉVELOPPER | P1 | — | Aucune saisie possible par un établissement : les formations du catalogue sont nos lignes à nous. C'est ma ligne E8. |
| `UNI03-F03` | Conditions d’admission | À DÉVELOPPER | P1 | — | Aucune saisie possible par un établissement : les formations du catalogue sont nos lignes à nous. C'est ma ligne E8. |
| `UNI03-F04` | Publication / visibilité des formations | À DÉVELOPPER | P1 | — | Aucune saisie possible par un établissement : les formations du catalogue sont nos lignes à nous. C'est ma ligne E8. |

### UNI04 — Candidatures & admissions

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `UNI04-F01` | Réception des candidatures | À DÉVELOPPER | P2 | — | Rien : AliTché ne transmet aucun dossier à une école. |
| `UNI04-F02` | Traitement des candidatures | À DÉVELOPPER | P2 | — | Rien : AliTché ne transmet aucun dossier à une école. |
| `UNI04-F03` | Décision / statut de candidature | À DÉVELOPPER | P2 | — | Rien : AliTché ne transmet aucun dossier à une école. |

### UNI05 — Suivi académique

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `UNI05-F01` | Suivi des cours | À DÉVELOPPER | P3 | Partenariat requis | Rien : le suivi de cours n'existe pas, et son propre chapitre 12 le conditionne à un partenariat valide. |
| `UNI05-F02` | Gestion de la présence physique | À DÉVELOPPER | P3 | Partenariat requis | Rien : le suivi de cours n'existe pas, et son propre chapitre 12 le conditionne à un partenariat valide. |
| `UNI05-F03` | Gestion de la présence en ligne | À DÉVELOPPER | P3 | Partenariat requis | Rien : le suivi de cours n'existe pas, et son propre chapitre 12 le conditionne à un partenariat valide. |
| `UNI05-F04` | Gestion des examens | À DÉVELOPPER | P3 | Partenariat requis | Rien : le suivi de cours n'existe pas, et son propre chapitre 12 le conditionne à un partenariat valide. |
| `UNI05-F05` | Saisie et consultation des notes | À DÉVELOPPER | P3 | Partenariat requis | Rien : le suivi de cours n'existe pas, et son propre chapitre 12 le conditionne à un partenariat valide. |
| `UNI05-F06` | Calcul automatique des moyennes | À DÉVELOPPER | P3 | Partenariat requis | Rien : le suivi de cours n'existe pas, et son propre chapitre 12 le conditionne à un partenariat valide. |
| `UNI05-F07` | Validation académique | À DÉVELOPPER | P3 | Partenariat requis | Rien : le suivi de cours n'existe pas, et son propre chapitre 12 le conditionne à un partenariat valide. |
| `UNI05-F08` | Tableau de bord étudiant | À DÉVELOPPER | P3 | Partenariat requis | Rien : le suivi de cours n'existe pas, et son propre chapitre 12 le conditionne à un partenariat valide. |
| `UNI05-F09` | Tableau de bord établissement | À DÉVELOPPER | P3 | Partenariat requis | Rien : le suivi de cours n'existe pas, et son propre chapitre 12 le conditionne à un partenariat valide. |

### UNI06 — Interaction avec les individus

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `UNI06-F01` | Consultation des profils autorisés | À DÉVELOPPER | P2 | Selon règles de confidentialité | Rien : aucun profil n'est consultable par un tiers, même avec un accord. |
| `UNI06-F02` | Échanges / notifications | À DÉVELOPPER | P2 | — | Rien : aucun profil n'est consultable par un tiers, même avec un accord. |


## Le chapitre 7 — les consultants et centres d'employabilité

### CON01 — Onboarding & accès

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `CON01-F01` | Création de compte | À DÉVELOPPER | P2 | — | Aucune route de consultant, aucun écran, aucune table. |
| `CON01-F02` | Connexion | À DÉVELOPPER | P2 | — | Aucune route de consultant, aucun écran, aucune table. |
| `CON01-F03` | Rôles et accès | À DÉVELOPPER | P2 | — | Aucune route de consultant, aucun écran, aucune table. |

### CON02 — Profil consultant / centre

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `CON02-F01` | Profil professionnel | À DÉVELOPPER | P2 | — | Aucune route de consultant, aucun écran, aucune table. |
| `CON02-F02` | Expertises et services | À DÉVELOPPER | P2 | — | Aucune route de consultant, aucun écran, aucune table. |
| `CON02-F03` | Disponibilités | À DÉVELOPPER | P2 | — | Aucune route de consultant, aucun écran, aucune table. |

### CON03 — Accompagnement

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `CON03-F01` | Prise en charge d’un individu | À DÉVELOPPER | P2 | — | Rien : la prise en charge d'un individu n'existe pas dans le produit. |
| `CON03-F02` | Plan d’accompagnement | À DÉVELOPPER | P2 | — | Rien : la prise en charge d'un individu n'existe pas dans le produit. |
| `CON03-F03` | Suivi des actions | À DÉVELOPPER | P2 | — | Rien : la prise en charge d'un individu n'existe pas dans le produit. |

### CON04 — Suivi des individus

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `CON04-F01` | Consultation des profils autorisés | À DÉVELOPPER | P2 | — | Rien : aucun profil n'est consultable par un tiers, même avec un accord. |
| `CON04-F02` | Suivi de progression | À DÉVELOPPER | P2 | — | Rien : aucun profil n'est consultable par un tiers, même avec un accord. |
| `CON04-F03` | Historique d’accompagnement | À DÉVELOPPER | P2 | — | Rien : aucun profil n'est consultable par un tiers, même avec un accord. |

### CON05 — Ressources & recommandations

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `CON05-F01` | Recommandation de ressources | À DÉVELOPPER | P2 | — | Rien. |
| `CON05-F02` | Orientation vers opportunités | À DÉVELOPPER | P2 | — | Rien. |

### CON06 — Suivi & statistiques

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `CON06-F01` | Tableau de bord | À DÉVELOPPER | P3 | — | Rien. |
| `CON06-F02` | Indicateurs d’accompagnement | À DÉVELOPPER | P3 | — | Rien. |


## Le chapitre 8 — les entreprises

### ENT01 — Onboarding & accès

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ENT01-F01` | Création de compte entreprise | À DÉVELOPPER | P2 | — | Aucune route d'entreprise, aucun écran, aucune table. |
| `ENT01-F02` | Connexion | À DÉVELOPPER | P2 | — | Aucune route d'entreprise, aucun écran, aucune table. |
| `ENT01-F03` | Gestion des rôles internes | À DÉVELOPPER | P2 | — | Aucune route d'entreprise, aucun écran, aucune table. |

### ENT02 — Profil entreprise

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ENT02-F01` | Profil de l’entreprise | À DÉVELOPPER | P2 | — | Aucune route d'entreprise, aucun écran, aucune table. |
| `ENT02-F02` | Secteurs, métiers et besoins | À DÉVELOPPER | P2 | — | Aucune route d'entreprise, aucun écran, aucune table. |

### ENT03 — Opportunités

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ENT03-F01` | Création d’offres / opportunités | À DÉVELOPPER | P2 | — | Rien : AliTché ne publie aucune offre. |
| `ENT03-F02` | Gestion des offres | À DÉVELOPPER | P2 | — | Rien : AliTché ne publie aucune offre. |
| `ENT03-F03` | Suivi des candidatures | À DÉVELOPPER | P2 | — | Rien : AliTché ne publie aucune offre. |

### ENT04 — Recherche & sélection de profils

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ENT04-F01` | Recherche de profils | À DÉVELOPPER | P2 | — | Rien : aucun profil n'est consultable par une entreprise. |
| `ENT04-F02` | Filtres par compétences / expérience | À DÉVELOPPER | P2 | — | Rien : aucun profil n'est consultable par une entreprise. |
| `ENT04-F03` | Consultation de profils autorisés | À DÉVELOPPER | P2 | — | Rien : aucun profil n'est consultable par une entreprise. |

### ENT05 — Évaluation des collaborateurs

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ENT05-F01` | Création d’une évaluation | À DÉVELOPPER | P3 | — | Rien : aucune évaluation de collaborateur. |
| `ENT05-F02` | Évaluation périodique ou à la demande | À DÉVELOPPER | P3 | — | Rien : aucune évaluation de collaborateur. |
| `ENT05-F03` | Test de compétences et de performance | À DÉVELOPPER | P3 | — | Rien : aucune évaluation de collaborateur. |
| `ENT05-F04` | Passage de l’évaluation par le collaborateur | À DÉVELOPPER | P3 | — | Rien : aucune évaluation de collaborateur. |
| `ENT05-F05` | Analyse automatique des résultats | À DÉVELOPPER | P3 | — | Rien : aucune évaluation de collaborateur. |

### ENT06 — Mise à niveau & développement des compétences

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ENT06-F01` | Identification des écarts de compétences | À DÉVELOPPER | P3 | — | Rien : les écarts de compétences ne se calculent pas pour une entreprise. |
| `ENT06-F02` | Recommandation de formations | À DÉVELOPPER | P3 | — | Rien : les écarts de compétences ne se calculent pas pour une entreprise. |
| `ENT06-F03` | Plan de montée en compétences | À DÉVELOPPER | P3 | — | Rien : les écarts de compétences ne se calculent pas pour une entreprise. |
| `ENT06-F04` | Suivi de la progression | À DÉVELOPPER | P3 | — | Rien : les écarts de compétences ne se calculent pas pour une entreprise. |

### ENT07 — Alignement projet professionnel / entreprise

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ENT07-F01` | Évaluation de l’alignement | À DÉVELOPPER | P3 | Comparer projet professionnel et objectifs de l’entreprise. | Rien. |
| `ENT07-F02` | Identification des écarts | À DÉVELOPPER | P3 | — | Rien. |
| `ENT07-F03` | Recommandation d’actions | À DÉVELOPPER | P3 | Formation, mobilité interne, évolution de rôle, mentorat, accompagnement. | Rien. |

### ENT08 — Suivi des collaborateurs

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ENT08-F01` | Vue collaborateurs | À DÉVELOPPER | P3 | — | Rien. |
| `ENT08-F02` | Historique des évaluations | À DÉVELOPPER | P3 | — | Rien. |
| `ENT08-F03` | Suivi des actions de développement | À DÉVELOPPER | P3 | — | Rien. |


## Le chapitre 9 — l'espace d'administration

### ADM01 — Utilisateurs

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM01-F01` | Gestion des utilisateurs | À DÉVELOPPER | P1 | — | Rien : aucun écran d'administration. Les comptes se consultent chez le fournisseur de la base de données, et je ne peux pas ouvrir cette console d'ici. |
| `ADM01-F02` | Gestion des rôles et droits | À DÉVELOPPER | P1 | — | Rien : aucun écran d'administration dans le produit. |

### ADM02 — Orientation — 2 lignes au cœur du produit

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM02-F01` | Référentiel d’orientation | À DÉVELOPPER | P0 | — | Les données sont là et à jour, 14 domaines, 11 fonctions, 84 métiers génériques et 113 spécialisations, ingérés de la base de référence. Ce qui n'existe pas est un écran pour les modifier : tout passe par un fichier du dépôt, un commit, puis une poussée en ligne. |
| `ADM02-F02` | Gestion des règles d’orientation | À DÉVELOPPER | P0 | — | Les poids du barème sont dans le code et 91 paires de cœur, 97 paires de terrain sont vérifiés à chaque contrôle automatique. Aucun écran. |

### ADM03 — Référentiel métiers / emplois

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM03-F01` | Référentiel des métiers / emplois | À DÉVELOPPER | P1 | — | Nos 45 fiches à l'écran sur les 84 de la base de référence, et 15 libellés attendent encore leur fiche. |

### ADM04 — Référentiel formations — 1 ligne au cœur du produit

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM04-F01` | Référentiel des formations | À DÉVELOPPER | P0 | — | 95 lignes de formation dans le catalogue, 159 adresses relues entre le 2026-09-21 et aujourd'hui. Le catalogue est un fichier du dépôt, pas un écran. |

### ADM05 — Référentiel parcours — 1 ligne au cœur du produit

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM05-F01` | Référentiel des parcours | À DÉVELOPPER | P0 | — | 51 modules et le moteur qui les assemble ; les règles sont dans le code et ne se administrent pas. |

### ADM06 — Référentiel compétences

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM06-F01` | Référentiel des compétences | À DÉVELOPPER | P1 | — | Les compétences existent dans les données, trois à quatre par spécialisation, plus celles de la base de référence. Elles ne sont ni partagées ni reconnues : S4.4. |

### ADM07 — Opportunités

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM07-F01` | Gestion des opportunités | À DÉVELOPPER | P1 | — | 173 lignes, dont 159 avec une adresse d'origine et zéro adresse d'agrégateur. Relues par lots de 26, 77, 6 puis 50. Aucun écran pour les reprendre. |

### ADM08 — Établissements

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM08-F01` | Gestion des établissements | À DÉVELOPPER | P1 | — | 36 lignes d'établissements dans le même catalogue, rien d'éditable. |

### ADM09 — Entreprises

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM09-F01` | Gestion des entreprises | À DÉVELOPPER | P2 | — | Rien. |

### ADM10 — Consultants

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM10-F01` | Gestion des consultants / centres | À DÉVELOPPER | P2 | — | Rien. |

### ADM11 — Partenariats

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM11-F01` | Gestion des partenariats | À DÉVELOPPER | P2 | — | Rien : la notion de partenariat n'existe ni dans les données ni à l'écran. |
| `ADM11-F02` | Activation des fonctionnalités selon partenariat | À DÉVELOPPER | P2 | Notamment suivi académique universitaire. | Rien : la notion de partenariat n'existe ni dans les données ni à l'écran. |

### ADM12 — Contenus

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM12-F01` | Gestion des contenus | À DÉVELOPPER | P1 | — | Les textes du produit vivent dans le code du dépôt ; aucun écran de saisie, et c'est pour ça que S2.7 se fait à la main. |

### ADM13 — Notifications

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM13-F01` | Gestion des notifications | À DÉVELOPPER | P2 | — | Rien : aucune notification à piloter. |

### ADM14 — Tableaux de bord & statistiques

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `ADM14-F01` | Tableaux de bord administratifs | À DÉVELOPPER | P2 | — | Rien côté AliTché : le seul tableau de bord est celui du candidat, aucun indicateur d'usage. |
| `ADM14-F02` | Statistiques et indicateurs | À DÉVELOPPER | P2 | — | Rien côté AliTché : le seul tableau de bord est celui du candidat, aucun indicateur d'usage. |


## Le chapitre 10 — le transversal

### TR01 — Authentification (le document ne nomme pas ce bloc) — 1 ligne au cœur du produit

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `TR01-F01` | Authentification | PARTIELLEMENT EXISTANT | P0 | Mécanisme commun aux espaces. | Un seul mécanisme de compte pour tout le produit : adresse et mot de passe, bouton Google, lien de vérification. Il n'y a pas d'autre espace à brancher pour l'instant. |
| `TR01-F02` | Gestion des sessions et sécurité | À AMÉLIORER | P1 | — | Session tenue, déconnexion nette, jeton partagé entre les onglets. La tolérance aux connexions lentes reste à faire. |

### TR02 — Gestion des profils (le document ne nomme pas ce bloc) — 1 ligne au cœur du produit

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `TR02-F01` | Gestion des profils | PARTIELLEMENT EXISTANT | P0 | — | À moitié : le nom et la photo sur le compte, les réponses du test gardées à côté. Les informations d'état civil (téléphone, pays, niveau d'études) ne sont prises nulle part. |

### TR03 — Recherche (le document ne nomme pas ce bloc)

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `TR03-F01` | Recherche | À DÉVELOPPER | P1 | Selon les modules. | Rien : aucune recherche dans le produit, ni d'écoles ni de métiers. Ma ligne E3. |

### TR04 — Notifications (le document ne nomme pas ce bloc)

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `TR04-F01` | Notifications | À DÉVELOPPER | P1 | — | Rien : aucune notification à envoyer. |

### TR05 — Gestion des documents (le document ne nomme pas ce bloc)

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `TR05-F01` | Gestion des documents | À DÉVELOPPER | P1 | Dépôt, consultation, téléchargement selon droits. | Rien, sauf le résultat que l'on télécharge. |

### TR06 — Moteur de recommandations (le document ne nomme pas ce bloc) — 1 ligne au cœur du produit

| ID | Fonctionnalité | Statut écrit | Priorité écrite | Périmètre écrit | Ce que le produit fait, mesuré |
|---|---|---|---|---|---|
| `TR06-F01` | Moteur de recommandations | PARTIELLEMENT EXISTANT | P0 | Oriente les résultats et recommandations. | En ligne et surveillé : le moteur déduit les domaines, choisit les pistes, assemble les modules, et un contrôle automatique refuse la publication d'un parcours qui ne tient pas. |

## Ce que la lecture des cent trente-sept lignes laisse en main

Le décompte est fait à la machine sur les lignes du tableau ci-dessus, et non sur une impression.

| Le chapitre | Lignes | Dont « à développer » | Dont au cœur du produit | Dont à la fois au cœur et absentes |
|---|---|---|---|---|
| page d'accueil | cinq | trois | une | aucune |
| individus | quarante et un | vingt et un | dix-sept | deux |
| universités et centres | vingt-quatre | vingt-quatre | aucune | aucune |
| consultants et centres d'employabilité | seize | seize | aucune | aucune |
| entreprises | vingt-six | vingt-six | aucune | aucune |
| administration | dix-huit | dix-huit | quatre | quatre |
| transversal | sept | trois | trois | aucune |
| **total** | **cent trente-sept** | **cent onze** | **vingt-cinq** | **six** |

Trois choses à retenir de ce tableau, et c'est là qu'est le vrai travail :

**Première chose : soixante-six lignes sur cent onze n'attendent rien, elles attendent un espace.** Les trois
espaces d'établissements, de consultants et d'entreprises sont pleins dans le document et vides dans le produit, sans une seule
ligne qui prétende que quoi que ce soit y existe déjà. Le document de référence ne dit pas qu'il faut les ouvrir maintenant, il
dit où ils en sont. Mes trois cartes de cadrage, dans l'outil de suivi, demandent encore la même réponse qu'en
septembre : j'ouvre, ou je n'ouvre pas. Rien dans ce tableau ne répond à cette question à ma place.

**Deuxième chose : six lignes seulement sont à la fois au cœur du produit et absentes de mon côté**, et elles sont
d'une clarté rare :

- `IND03-F03`, remplir le profil, et `IND03-F04`, le modifier. Les deux regardent le même écran, et c'est S3.3.
- `ADM02-F01` et `ADM02-F02`, le référentiel d'orientation et la gestion de ses règles.
- `ADM04-F01`, le référentiel des formations.
- `ADM05-F01`, le référentiel des parcours.

Les quatre dernières méritent qu'on s'y arrête, et c'est le désaccord n° 6 : ces référentiels existent, je les ai
ingérés de la base de référence, ils sont à l'écran. Ce qui n'existe pas, c'est la possibilité de les reprendre sans
toucher un fichier du dépôt et sans pousser en ligne. La priorité `P0` porte sur la donnée, et là elle est tenue.
Elle ne peut pas porter sur un écran d'administration, parce qu'il n'y en a aucun et qu'aucun de mes sprints n'en
ouvre.

**Troisième chose : le questionnaire et le parcours sont en avance sur l'inventaire du document, pas en retard.** Les vingt et
une lignes « à développer » du chapitre des individus se partagent en cinq paquets : le profil (quatre lignes), la
progression (cinq), les opportunités (six), les notifications (trois), l'accompagnement (trois). Six de ces lignes
sont pourtant en ligne, et je les ai revérifiées une à une : la vue d'ensemble de la progression, le suivi des
étapes, le fait de marquer un module terminé, le fait de refaire son orientation sans rien perdre, et la découverte
comme la consultation des chances, à moitié. Ce qui reste de vrai manque chez l'individu tient en trois phrases : le
profil ne se remplit pas, la progression ne remonte pas au profil, et il n'y a ni stages, ni emplois, ni
notifications, ni accompagnement. Sur ce dernier point, le document de référence et mon produit sont d'accord, et mon calendrier
aussi.

---

# Partie B — ce que je fais, dans l'ordre

Cette partie est celle d'avant, inchangée. Les cinq sprints, leurs vingt-neuf tâches, leurs preuves et leurs dates
sont exactement ceux que j'ai écrits depuis le 23 septembre, à un détail près : je ne reprends pas la plume ici pour
dire où en est une tâche, je la laisse où elle était. Les seules choses nouvelles sont ce paragraphe, la table de
correspondance en fin de partie, et la note de suspension que le désaccord n° 7 m'a fait poser sous la tâche `S5.4`.

J'ai choisi de ne pas coller les identifiants de référence dans chacune des vingt-neuf tâches. Deux raisons, et je
les dis parce qu'elles se discuteront un jour : d'abord, une tâche mienne couvre souvent plusieurs des lignes du document, et
le nombre de lignes variées rendrait chaque bloc illisible ; ensuite, les blocs des sprints portent mes preuves, et
les toucher pour une raison de rangement serait le meilleur moyen d'y introduire une erreur. La correspondance tient
donc dans une seule table, à la fin de cette partie. Quand une carte de l'outil de suivi cherche son identifiant,
elle la trouve là.

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
- **Où ça se joue** : `src/components/auth/`, `src/pages/`, dont `ProfileSettings.tsx`.

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
- **Avancement (24/09/2026)** : la seule lecture qui pouvait trahir un voisin est fermée dans le code. La liste de
  progression était demandée sans filtre côté navigateur (`getMyProgress`, `src/services/module.api.ts`) : elle est
  maintenant demandée avec l'identifiant de la personne connectée, comme les trois autres lectures de ce fichier.
  Un navigateur ne peut donc plus réclamer d'autres lignes que les siennes, même si le réglage de la base en ligne
  avait été oublié quelque part. Ce que ça ne prouve pas : que la base en ligne porte bien les réglages écrits dans
  `supabase/`. Un dépôt décrit une intention, pas l'état de ce qui est installé. C'est précisément le rôle des deux
  comptes et des deux appareils.
- **Ordre** : cette tâche passe avant les cinq sessions de test, pas après. Le reste à faire demande un clic sur un
  lien de confirmation reçu dans ma boîte e-mail — je ne peux pas le faire à ma place depuis l'outil.

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
- **Tranché le 01/10/2026 : la date est reportée, et je le dis tel quel.** Le dimanche 27/09/2026 est passé sans
  qu'aucune des cinq personnes ait été installée sur le site. Ce n'est pas un réglage qui a manqué : c'est moi qui
  n'ai pas tenu le créneau. Je reporte, pour une raison qui tient en une phrase. Entre-temps j'ai constaté que
  l'écran qui propose les métiers n'en montre que trois alors que le domaine en compte jusqu'à vingt-huit, et je
  vais le refondre. Faire tester maintenant reviendrait à mesurer un écran que je suis sur le point de changer :
  les blocages relevés ne s'appliqueraient plus à rien.
- **Ce qui est acquis malgré tout** : le parcours complet, du questionnaire au résultat puis au minimum qui suit le
  résultat — voir son domaine, ses métiers, un parcours de modules — est opérationnel en ligne. C'est exactement ce
  que les cinq fiches devaient éprouver ; ce n'est pas annulé, c'est remis à plus tard.
- **Ce qui débloque** : la nouvelle date se fixe quand l'écran des métiers refondu est en ligne. Les cinq fiches de
  test sont déjà écrites, dans le dossier des tests, et attendent.

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
- **Tranché le 24/09/2026 pour les cinq tests de la semaine** : je n'ai pas de carte de débit à engager chez Google
  aujourd'hui, et sans elle les deux réglages ci-dessus ne se font pas. Le bouton est donc **retiré des deux
  écrans**, connexion et création de compte. Un clic y menait sur une page d'erreur de Google : c'était exactement le
  genre de fausse promesse que la tâche S1.5 existe pour enlever, et la première chose qu'une personne venue tester
  aurait touchée. Le code n'est pas perdu : `src/components/auth/GoogleAuthButton.tsx`, et la fonction
  `loginWithGoogle` dans le contexte comme dans le service, restent dans le dépôt ; plus rien ne les affiche, donc
  rien de ce côté ne part dans le fichier livré. Le jour où la carte est là, les réglages ci-dessus prennent une
  dizaine de minutes et la remise à l'écran est de deux lignes, une par écran.
- **Ce que je ne fais pas à la place** : pas d'étiquette « à venir » sur le bouton, et pas de LinkedIn. Une porte
  étiquetée « à venir » reste une porte qu'on montre ; LinkedIn demanderait la même démarche de console, pour un
  deuxième fournisseur à moitié ouvert, et ce n'est pas le réflexe d'un élève de terminale à Cotonou. Les cinq tests
  portent sur le parcours, pas sur la façon d'entrer : l'entrée d'aujourd'hui est l'adresse e-mail et le mot de
  passe, et elle fonctionne.
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
- **Ce qui est fait dans le dépôt (02/10/2026)** : `README.md` est entièrement réécrit en français, à la première
  personne, et décrit le produit qui est en ligne : le navigateur parle directement au service qui tient la base,
  les comptes et les images, et le serveur abandonné est nommé comme tel plutôt que présenté comme une pièce du
  produit. Les écrans y sont listés par adresse, avec la limite franchement écrite que tout l'espace connecté tient
  sur `/app` sans changer d'adresse (c'est le travail S3.1). Les nombres du produit ne sont plus recopiés là : la
  fiche renvoie à `docs/CONTENU-PRODUIT.md`, et `src/checks/contenu.check.ts` lit désormais ce `README.md` comme il
  lit les documents de `docs/`, donc un chiffre qui divergerait du catalogue y fait rougir la vérification. Ce que
  la tâche laisse non montré : le téléversement de la photo de profil, qui est écrit dans le code mais que je n'ai
  pas encore fait avec une vraie image sur un vrai compte.

### S2.4 — Ranger le dépôt

- **Ce que ça change** : le projet pèse ce qu'il pèse vraiment. Mesuré de nouveau ce 04/10/2026, le suivi de
  versions enregistre 10 765 fichiers, dont 10 579 de bibliothèques et 25 d'un serveur abandonné que rien
  n'appelle. Hors ces deux dossiers, il ne reste que 161 fichiers.
- **Pourquoi maintenant** : mon principe 7 (modularité) et le bon sens : on ne peut pas faire évoluer
  proprement ce qu'on ne peut pas relire.
- **Comment on saura que c'est fini** : moins de 300 fichiers suivis ; le serveur abandonné est soit documenté
  comme abandonné, soit retiré, à une condition : rien de ce qui fonctionne aujourd'hui ne disparaît.
- **Taille** : deux jours, à faire une suppression à la fois, avec vérification entre chaque.
- **Où ça se joue** : `node_modules/`, `backend/`, `.gitignore`, `src/services/api.client.ts`.
- **Mesuré le 02/10/2026** : `npm run lint` ne peut pas tourner du tout. Le dépôt déclare ESLint et ses modules
  complémentaires dans `package.json`, mais ne porte aucun fichier de configuration, nulle part : la commande sort
  en erreur avant d'avoir regardé un seul fichier, en disant avoir cherché cette configuration dans le dossier du
  serveur abandonné puis dans ses dossiers parents. Écrire cette configuration fait donc partie du rangement. En
  attendant, les deux gardes qui comptent vraiment sont le contrôle de types (`npm run build` commence par `tsc`,
  muet quand tout va bien) et `npm run verify` avec ses trois contrôles.
- **Le contrôle de style tourne depuis ce 04/10/2026** (le fichier `.eslintrc.cjs`, commit `1146742`) : 88 règles
  actives sur les 83 fichiers du dépôt, et la commande sort à zéro. Deux précautions prises en mesurant, pas en
  supposant. Vérifier d'abord que la garde mord : un fichier volontairement fautif, posé puis retiré, lui a bien
  rendu ses trois erreurs, dont le crochet appelé dans une condition ; une garde muette n'est pas une garde.
  Régler ensuite chaque règle éteinte sur ce qu'elle coûte vraiment : les variables déclarées et oubliées sont
  passées en faute, parce que le dépôt en compte zéro aujourd'hui, donc ça ne coûte rien ; le mot `any` reste
  éteint, parce que ses huit apparitions sont huit fois la même chose — la récupération d'une erreur de connexion,
  aux six écrans concernés et deux fois dans le fichier qui traduit ces erreurs — et que les corriger est un
  travail à part, ce qui est écrit dans le fichier de configuration pour que ça ne devienne pas un angle mort ;
  la limite d'un seul contenu exporté par fichier reste éteinte, mesurée à 83, c'est-à-dire tous les fichiers du
  dépôt, parce que mes écrans exportent leur composant avec ses types et ses constantes. Le dossier du serveur
  abandonné est hors de portée du contrôle. Et comme la commande du dépôt traite un seul avertissement comme une
  faute, une garde qui gémit serait inutilisable : c'est pour ça qu'elle est étroite.
- **Ce qui reste, et qui se décide** : trois gestes. Chacun est réversible sur le disque, mais tous trois
  touchent au suivi de versions, donc je ne les fais pas sans les avoir écrits ici.
  1. Sortir les bibliothèques du suivi. Le fichier d'ignorance du dépôt connaît `node_modules/` depuis le début :
     ces 10 579 fichiers y sont entrés avant la règle, et le suivi les garde quand même. Le geste est un retrait
     du suivi, pas une suppression du disque. Vérifié que rien ne disparaît : la liste verrouillée des
     dépendances est suivie et complète (26 déclarations sur 26 retrouvées, 337 entrées), et les 275 paquets
     installés sur ce poste s'y trouvent tous — une installation fraîche reproduirait à l'identique ce qui marche
     aujourd'hui, donc le site en ligne ne dépend pas du fait que le dépôt porte les bibliothèques. Seul ce geste
     franchit la limite des 300 fichiers, et il laisse 161 fichiers suivis.
  2. Le serveur abandonné et ses orphelins. Mesuré de nouveau : zéro appel depuis le code du navigateur, aucun
     script du dépôt ne le construit, le contrôle de style ne le regarde plus. Mais la racine porte encore son
     instruction de montage : le `Dockerfile` de la racine ne copie que des fichiers de `backend/`, et
     `railway.json` désigne justement ce `Dockerfile`. Ranger le dossier, c'est ranger ces fichiers avec lui,
     `nixpacks.toml`, `start.sh` et `Caddyfile` faisant la même chose. Le client d'adresse dans
     `src/services/api.client.ts` est mort avec lui : 2 626 octets que personne n'appelle, mesuré à zéro
     référence hors son propre fichier.
  3. Vingt-deux documents hérités à la racine, en plus de ma fiche d'identité qui sert : des guides de mise en
     ligne pour des services que je n'utilise plus et des résumés de corrections passées. Soit ils vont dans un
     dossier `docs/histoire/`, soit ils sortent du dépôt.

### S2.5 — Écrire ce que contient AliTché, à un seul endroit

- **Ce que ça change** : plus jamais deux documents qui donnent deux nombres différents de questions, de
  domaines ou d'écoles.
- **Pourquoi maintenant** : le document de cadrage parle de six dimensions ; le produit en affiche onze. Ce n'est
  pas une erreur de l'un ou de l'autre, c'est l'absence d'un endroit unique où la vérité du produit se lit.
- **Comment on saura que c'est fini** : un fichier, `docs/CONTENU-PRODUIT.md`, tenu à jour par une vérification
  automatique qui rougit si le texte et la réalité divergent.
- **Taille** : deux jours.
- **Où ça se joue** : `src/data/`, `src/checks/`.
- **Ce qui est fait dans le dépôt (02/10/2026)** : `docs/CONTENU-PRODUIT.md` tient les nombres du produit, et le
  bloc de compteurs qu'il contient n'est pas écrit à la main : c'est la mesure qui l'a imprimé. Une troisième
  vérification automatique, `src/checks/contenu.check.ts`, recompte le catalogue à chaque `npm run verify`, compare
  les quarante-sept compteurs (mesuré le 03/10/2026), relit les onze lignes du tableau par domaine et scanne chaque
  chiffre suivi de «
  question », « module », « domaine », « métier » ou « axe » dans les documents vivants du dépôt et dans le
  `README.md`. Le garde-fou a été éprouvé en cassant le texte de trois façons différentes : chacune rougit.

### S2.6 — Relire le catalogue, ligne par ligne

- **Ce que ça change** : quand AliTché conseille une école, quelqu'un l'a vérifiée. Aujourd'hui, 159 lignes
  portent une date de vérification, mais ces dates ne forment que quatre lots : 77 lignes datées du 22/09/2026, 26
  du 21/09/2026, 6 du 02/10/2026, 50 du 03/10/2026. Le premier des deux reproches est traité : plus aucun lien du
  catalogue ne mène à un site agrégateur, c'est fait le 03/10/2026. Reste le second : cent trois lignes datent d'une
  saisie en masse, pas d'une relecture.
- **Pourquoi maintenant** : c'est le seul risque du produit qu'aucune remise en ligne du site ne corrige : un
  candidat qui se présente à une porte fermée perd autre chose que du temps.
- **Comment on saura que c'est fini** : les domaines prioritaires sont relus un par un, chaque ligne garde sa
  date de contrôle réelle, chaque lien mène au site officiel de l'établissement. Ce qui n'est pas vérifié reste,
  mais est dit comme non vérifié.
- **Où en est la tâche** : première séance faite le 02/10/2026, dix lignes relues une par une. Six écoles ont
  retrouvé leur propre adresse et portent maintenant la mention « vérifiée par nous » : ESGIS, l'École Supérieure
  de Management, les Cours Sonou, l'École Supérieure d'Expertise Comptable, l'Institut Supérieur de Communication
  et de Gestion, l'Institut Supérieur de Management Adonaï. Quatre n'avaient ce jour-là aucune adresse d'école
  joignable : l'École
  Supérieure d'Enseignement Professionnel Le Berger (le nom de site que les annuaires lui donnent ne répond plus
  du tout), l'Université Polytechnique Internationale Obiang Nguema Mbasogo, l'Institut Universitaire des Sciences
  et Techniques Ajavon Sébastien et l'Institut Supérieur d'Expertise et de Gestion. Les quatre ont retrouvé leur
  propre adresse le 03/10/2026, par un autre chemin que le nom de domaine que l'agrégateur leur prêtait : Le Berger et
  l'Institut Supérieur d'Expertise et de Gestion sont passées « vérifiées par nous » ; les deux autres gardent la
  mention « reçue, non vérifiée », parce que leur site répond sans écrire le nom que l'annuaire lui donnait — le
  domaine Obiang Nguema Mbasogo est une page vide, et la vitrine d'Ajavon Sébastien se nomme ISST-Bénin. Une leçon de
  la séance : la liste officielle du
  ministère béninois de l'enseignement supérieur existe en ligne, mais c'est un document scanné sans texte
  sélectionnable — on ne peut pas l'interroger automatiquement.

  Deuxième séance le 03/10/2026, autour des dix-neuf bourses que j'ai remises. Seize lignes du catalogue sortent
  contrôlées une à une : treize bourses nouvelles, chacune à l'adresse officielle de la session en cours, et trois
  lignes anciennes dont le lien menait à l'agrégateur et mène maintenant à l'organisme qui les distribue. Quatorze
  lignes de ma base sur dix-neuf sont donc entrées : parmi les treize nouvelles, une — celle de l'Algérie — n'y
  figurait pas et vient du portail du ministère, et deux des siennes étaient déjà au catalogue sous un lien
  d'agrégateur, la bourse Eiffel et la bourse chinoise. Trois lignes de ma base n'entrent pas. Les bourses du
  Commonwealth, d'abord : la liste officielle des pays admis ne retient pas le Bénin. Le dispositif prêté à la mairie
  de Parakou avec un institut privé ensuite, que ni l'une ni l'autre partie n'écrit sur son site. Une bourse enfin que
  l'on ne trouve que chez des sites qui recopient des annonces, sans page d'organisateur. Deux lignes restent hors
  catalogue, celles du DAAD et de l'AUF : les sites qu'elles nomment ne répondaient pas, et je ne voulais pas leur
  donner une date de contrôle que je n'avais pas vue passer. Ce que la reprise a aussi corrigé : une aide
  mensuelle de cinquante mille francs CFA que ma base ne prêtait qu'à la Russie est en fait demandée par le Bénin à
  tout candidat parti avec une bourse de l'État. La ligne déjà en place qui promettait une bourse du Commonwealth
  proposée par la Nouvelle-Zélande est reprise le même jour, et sort du catalogue : ce nom n'existe sur aucune page
  officielle de ce pays.

  Troisième séance le 03/10/2026, la plus fournie : les quarante et un liens qui menaient encore au site d'un
  agrégateur tiers. Trente-six ont retrouvé l'adresse de l'organisme qui parle lui-même — l'école, le fonds, le
  ministère — et vingt-huit portent maintenant la mention « vérifiée par nous », parce que leur page a écrit le nom
  cherché sous mes yeux. Huit restent comptées comme reçues et non vérifiées, et c'est ce qu'elles sont : six sites
  répondent sans reprendre le nom de l'école ou du diplôme, deux refusent l'accès automatisé — la banque et
  l'université oxfordienne — et gardent donc leur date d'annuaire du 21/09/2026 plutôt qu'une date que je n'ai pas
  vue passer. Cinq lignes sont sorties du catalogue, faute d'une page d'organisateur qui les nomme. Treize libellés
  portent désormais le nom que l'organisme s'écrit lui-même, dont trois où l'agrégateur se trompait : Balwin et non
  Baldwin, la Mining Qualifications Authority et non Mineral, et Manaaki pour les bourses du gouvernement
  néo-zélandais. Quatorze lignes ont reçu le pays où l'offre se déroule. Un effet de bord à connaître : la date d'une
  ligne est la date où sa page a été lue, donc trente-quatre lignes ont quitté le lot du 21/09/2026, qui passe de
  soixante-cinq à vingt-six.

  Reste pour les séances suivantes : relire une à une les cent trois lignes des deux lots saisis en masse, celles du
  22/09/2026 et celles du 21/09/2026 ; et signaler aux intéressés ce qui cloche sur leurs propres pages — le
  certificat de sécurité expiré de l'Institut Supérieur de Management Adonaï, la vitrine de l'Institut Supérieur des
  Métiers de l'Audiovisuel qui annonce son site « en construction », et le domaine de l'Université Polytechnique
  Internationale qui répond une page vide.
- **Taille** : une tâche de fond, dix lignes à la fois. Pas une semaine, des séances.
- **Où ça se joue** : `src/data/opportunities.ts`.
---

### S2.7 — Écrire en français ce que le catalogue affiche en anglais

- **Ce que ça change** : un candidat francophone lit aujourd'hui des noms de formations et de bourses écrits en
  anglais, sur l'écran même où AliTché lui parle de son avenir. Mesuré le 03/10/2026 : sur les 173 lignes du
  catalogue, 45 portent un nom écrit en anglais — 26 formations dont le diplôme se nomme « Bachelor in … », et 19
  bourses dont le nom tout entier est en anglais. Un premier comptage en annonçait 51 : il passait par un test de
  mots anglais qui attrapait aussi des lignes françaises commençant par « Master professionnel ». Cette tâche a un peu
  grandi le 03/10/2026 : en reprenant les liens d'agrégateur, j'ai écrit derrière plusieurs titres de bourses le nom
  que l'organisme se donne en anglais — « Funza Lushaka Bursary - Department of Basic Education ». Un exemple trouvé en
  relisant : « Bachelor in Accountancy — ESM », où le nom anglais est celui du diplôme tel que l'école l'écrit.
- **Pourquoi maintenant** : la tâche S2.6 oblige à relire le catalogue ligne par ligne. Autant corriger la langue
  de chaque ligne au moment où on la contrôle, plutôt que d'y revenir dans six mois.
- **Comment on saura que c'est fini** : chaque ligne est soit écrite en français, soit laissée dans sa langue
  d'origine parce que ce nom est le nom officiel de la chose, et ce choix est alors dit à l'écran par un
  complément en français. Aucune ligne ne se présente comme un
  texte brut que personne n'a relu.
- **Où en est la tâche** : une coquille est corrigée depuis le 03/10/2026, et c'est un effet de bord de S2.6 : la
  ligne belge qui écrivait « Vlanders » porte maintenant le nom que son organisateur écrit lui-même, « VLIR-UOS
  scholarships to study in Flanders ». Les quarante-cinq noms anglais restants se traiteront au fil des relectures,
  ligne par ligne.
- **Taille** : se fait avec S2.6, ligne par ligne, sans séance supplémentaire pour la plupart des cas.
- **Où ça se joue** : `src/data/opportunities.ts`, champ des noms de lignes.
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
  `src/pages/ProfileSettings.tsx`.

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

### S3.7 — Tester avec dix personnes hors de l'équipe, à partir du 3 novembre 2026

- **Ce que ça change** : on sait enfin si « ma voie » se comprend sans explication.
- **Pourquoi maintenant** : c'est ma phase B, et la condition que je me suis posée le 2026-09-23. Sans ces dix
  retours, les sprints 4 et 5 reposent sur des suppositions.
- **Comment on saura que c'est fini** : dix personnes, dix comptes rendus écrits, et pour chacune : a-t-elle
  compris son profil, a-t-elle trouvé la recommandation juste, a-t-elle ouvert un parcours, où a-t-elle lâché.
- **Taille** : continu, à partir de la fin du sprint 1.
- **Règle** : les sprints 4 et 5 ne démarrent pas avant six de ces dix retours écrits.
- **Tranché le 24/09/2026 : les dix tests sont avancés au début du sprint 3, pas laissés à la fin.** L'ancienne
  date butoir du 30/11 tombait à huit jours de la fin du sprint 3 (08/12) et ne laissait aucune marge pour que
  six retours écrits existent avant le démarrage du sprint 4. En commençant le 03/11, les six retours peuvent
  être là avant la fin novembre, et le sprint 4 n'attend pas.

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
  `src/pages/ProfileSettings.tsx`.

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
  contient 173 lignes d'écoles, formations et bourses, mais les modules du parcours ne pointent pas vers elles.
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
- **Suspendue le 2026-10-04** : le backlog de référence classe cette ligne `IND04-F03` « hors du premier
  indispensable », et mon principe numéro 2 dit de ne pas surcharger le premier choix de parcours. Je la range en
  « Ensuite » ; le désaccord n° 7 de la partie C porte la contradiction, et le calendrier garde ses jours écrits
  tels quels jusqu'à ce que je reprenne le calcul.
- **Ce que j'ai quand même construit le même jour** : l'écran du parcours se module à l'écran — écarter une séance,
  la reprendre, changer son rang dans une piste, doser les heures par semaine, et repartir de la proposition du
  moteur. Cela couvre les verbes « retirer » et « réordonner » de `IND04-F03`, pas le verbe propre de cette tâche,
  qui est d'y **ajouter** une formation repérée plus tard, ni l'historique des changements. La tâche reste donc
  rangée en « Ensuite », avec un périmètre restant plus petit que ce que j'y avais écrit.

---

# Ensuite — important, mais ne bloque pas

À tirer de ce bloc seulement quand les sprints 1 à 3 sont passés.

| Numéro | Travail | Ce que ça change |
|---|---|---|
| E1 | rattacher les chances réelles aux métiers, pas au seul domaine | un candidat qui vise un métier croisé voit les formations de ce métier |
| E2 | compléter l'offre hors Bénin et les formations qui manquent | l'orientation ne s'arrête plus à la frontière |
| E3 | rendre la recherche d'écoles utilisable | on cherche par métier, pays, durée, frais |
| E4 | alléger le premier affichage | le site s'ouvre sur une connexion faible : 119 kilo-octets compressés depuis le 2026-10-03, contre 164 le 2026-10-02 et 214 avant ; les trois catalogues sont sortis du fichier de départ, seule la bibliothèque de connexion y tient encore une centaine de kilo-octets, et elle est vraiment nécessaire dès l'ouverture |
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
  désormais aussi les objectifs du parcours : `npm run verify` le refuse maintenant. Le mot survivait aussi dans une
  réponse du questionnaire, « Une exploitation, une ferme, une filière agricole » ; elle dit maintenant « une
  coopérative agricole », et son identifiant comme ses poids n'ayant pas bougé, personne n'a eu à recommencer son
  questionnaire. Le mot tenait encore deux fois, et c'est le fichier livré en ligne qui me l'a dit : le contexte du
  formateur technique, où « les filières professionnelles » devient « les formations professionnelles », et une voie
  de formation de l'acheteur de récolte, « Formation Gestion de filière », qui n'est le nom d'aucune formation
  réelle de notre catalogue — elle s'appelle maintenant « formation en gestion des productions agricoles ». La
  vérification balaie désormais le titre, le contexte, les compétences et les voies de formation de chaque fiche :
  le mot ne peut plus revenir par les données de métiers. Huit textes d'écran avaient par ailleurs perdu leurs
  accents : « Gerez votre parcours », « Aucun profil trouve », « Modules termines », « Quick wins - Demarrez
  maintenant », les trois verbes « Demarrer » du parcours et le compteur « termines ». Ils sont remis, et le titre
  anglais s'écrit en français comme le reste.
- **La poussée en ligne** : feu vert donné, onze commits poussés le 23/09 au soir, dont les deux de code
  (S1.5 et S2.2). Ce qu'ils changent se voit maintenant sur `https://ali-ce-i6it.vercel.app`, vérifié dans le
  fichier livré : le bouton Google y est, le mot « Premium » et les quatre onglets n'y sont plus.
- **La poussée de ce soir, après les alertes de sauvegarde** : trois commits partis vers 22 h 40 — les messages de la
  tâche S1.3, les documents à ma première personne avec la liste des dix modules, et les accents repris. Le fichier
  servi en ligne a été relu au lieu de supposer que le dépôt suffisait : « Démarrer » y apparaît cinq fois avec son
  accent et aucune fois sans, « Gains rapides » a remplacé « Quick wins », et les phrases neuves de S1.3 s'y lisent.
  C'est cette relecture qui a démasqué les deux fiches de métier qui employaient encore le mot exclu ; elles
  ferment la marche, dans le commit suivant.
- **La poussée du 2026-10-02, sur le poids du site** : le fichier que reçoit quelqu'un qui arrive pour la première
  fois pesait 782 603 octets, et il contenait tout, y compris les quatorze écrans qu'un visiteur ne voit pas le
  premier jour. Chacun de ces écrans a maintenant son propre fichier, téléchargé au moment où l'on y arrive. Le
  fichier de départ servi en ligne pèse 550 616 octets, 164 kilo-octets une fois comprimé, contre 214 avant.
  Vérifié sur le fichier servi, non sur le dépôt : le message d'attente « Chargement de l'écran » s'y lit, le titre
  « Votre profil AliTché » a quitté le fichier de départ pour celui de l'écran des résultats, et la page de
  connexion télécharge son propre fichier sans prendre le catalogue des chances avec. Console vide. Deux pièges de
  vérification m'ont fait annoncer un déploiement fantôme : ma copie de référence du nom de fichier avait été prise
  après la poussée, donc la comparaison ne pouvait rien trouver de neuf, et mes recherches de textes accentués
  échouaient à cause de l'accent de ma propre requête, pas de l'absence du texte. La référence se prend avant de
  pousser, et une recherche qui échoue se teste d'abord sur le fichier construit ici.
- **La poussée du 2026-10-03, les catalogues hors du fichier de départ** : le fichier que reçoit quelqu'un qui arrive
  pesait encore 550 616 octets parce qu'il emportait le questionnaire, les fiches de métier et les modules, alors que
  l'accueil n'en affiche aucun. Ces trois-là suivent maintenant les deux écrans qui s'en servent — le test et l'espace
  de travail — et se téléchargent au moment où l'on y entre. Le fichier de départ est descendu à 409 713 octets,
  119 kilo-octets une fois comprimé, contre 164 la veille. Le fichier des catalogues pèse 142 744 octets, 38 kilo-octets
  comprimé, et ne part que pour qui lance le test ou ouvre son espace : quelqu'un qui lit seulement l'accueil ne le
  paie pas. Un seul nombre a dû rester au départ, la version du barème, parce que c'est lui qui décide si un profil
  gardé sur l'appareil est encore comparable à celui d'aujourd'hui ; il a son propre fichier, et la promesse
  « 29 à 30 questions selon votre situation » continue de se calculer sur les questions réelles, je ne l'ai pas écrite
  à la main. Vérifié à l'exécution, pas à la configuration : la liste des fichiers demandés par l'accueil ne contient
  qu'un seul fichier de programme, l'entrée dans le test déclenche celui des catalogues, et la page de résultats,
  la fiche d'un domaine et l'écran de ciblage se sont construits avec leurs données. Un piège de vérification m'a
  fait perdre dix minutes : cliquer la boîte d'une option au lieu de l'option elle-même la coche puis la décoche, si
  bien que mon parcours automatique restait bloqué sans erreur visible. Ce qui reste à gagner sur ce fichier : la
  bibliothèque de connexion, une centaine de kilo-octets, mais elle sert dès l'ouverture.

**Ouvert le 2026-10-02, et à trancher par moi : que doit contenir le champ « voies de formation ».**

D'abord une rectification à ma charge. Dans l'aperçu que j'ai donné sur l'écran d'un domaine, j'ai annoncé
« cinquante-cinq noms écrits à la main, dont sept seulement retrouvent une école derrière ». Le recomptage, fait
deux fois et indépendamment ce soir, donne un autre ordre de grandeur : 134 mentions dans les fiches de métiers et
44 dans les fiches de domaines, soit 168 noms distincts. Sur cette base élargie, onze noms retrouvent une ligne du
catalogue de façon certaine, trente-deux se ressemblent sans être certains, et le reste ne retrouve rien. Mon
chiffre du matin était donc faux, et je l'avais avancé sans le revérifier.

Le vrai problème n'est pas celui que je dénonçais. Il n'y a pas d'écoles inventées derrière ces noms : presque tous
ne sont pas des lieux. Le champ mélange trois choses différentes sans le dire : des établissements, des noms de
diplômes (« Licence Informatique », « BTS Transport et logistique »), et des thèmes (« Santé publique et
épidémiologie »). Une ligne sans réponse dans le catalogue n'est donc pas un lien cassé, c'est souvent un diplôme,
ce qui est légitime. Et aujourd'hui ce champ s'affiche comme une seule ligne de texte, sans lien nulle part : ce
que j'ai écrit là ne conduit le candidat nulle part, alors que c'est précisément la matière du parcours qu'il
réclame après avoir validé un métier.

Ma décision à prendre, en trois volets : est-ce que « voies de formation » doit ne contenir que des lieux, ou
garder les trois natures en les distinguant à l'écran ; est-ce que cette ligne devient cliquable vers les écoles et
les formations du catalogue, ce qui est le troisième pas de l'écran domaine ; et que faire des 40 lignes du
catalogue dont le nom est écrit en anglais, qui sont la tâche S2.7, et des six écoles qui n'apparaissent que dans
le nom d'une formation sans jamais avoir de ligne d'établissement à leur propre nom.

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

**Un point que ce calcul avait rendu visible, tranché le 24/09/2026.** La tâche S3.7 demandait dix personnes
testées avant le 30/11/2026, alors que le sprint 3, tel qu'il se termine le 08/12, ne pouvait pas les avoir toutes
commencées à cette date. Des deux sorties propres — avancer les tests au début du sprint 3, ou reculer le 30/11 —
c'est la première qui est retenue : les dix tests démarrent le 03/11. Ce n'était pas un détail d'agenda, puisque la
règle du backlog dit que les sprints 4 et 5 n'avancent pas avant six de ces dix retours écrits : la date des tests
décide en réalité du démarrage du sprint 4.

---

# La correspondance entre mes tâches et les lignes du document

Les identifiants en italique sont les six lignes que j'ajoute à l'inventaire, et qui attendent que je les reçoive
ou que je les refuse : elles sont écrites en partie C.

### Sprint 1 — stabiliser

| Ma tâche | Les lignes du document | Ce que la correspondance dit de moi |
|---|---|---|
| `S1.1` trois états par écran, ordinateur et téléphone | `LP01-F01`, les cinq lignes de `IND01`, `IND02-F01`, `IND03-F02`, `IND04-F01`, la première de `IND05` | je ne construis rien : je vérifie que ce qui est marqué « existant » l'est vraiment, écran par écran |
| `S1.2` formulaires, champ par champ | `TR01-F01`, `IND01-F01`, `IND01-F02`, `TR02-F01` | les deux entrées de compte sont les seules portes du produit, elles doivent être sûres avant d'en ouvrir d'autres |
| `S1.3` avertir quand une sauvegarde échoue | `IND01-F05`, `IND02-F04`, `IND03-F01`, `IND05-F03` | la ligne `IND02-F04` dit « conserver le résultat » ; tant que l'échec est muet, elle est vraie à moitié |
| `S1.4` un compte ne voit pas les données d'un autre | `TR01-F02`, `TR02-F01`, `IND01-F05` | c'est le piège de la clé de garde unique par appareil, écrit en face de `IND01-F05` |
| `S1.5` retirer les fausses promesses de l'interface | `LP01-F01`, `LP01-F04` | les quatre onglets sont ma ligne retirée le 23/09 ; l'inventaire les redemande, et il aura raison le jour où les espaces existeront |
| `S1.6` rejouer le parcours complet cinq fois | l'annexe entière, les quatorze pas | aucune ligne ne se ferme sans ce jeu-là ; c'est l'annexe qui décide de ce qu'un parcours complet veut dire |

### Sprint 2 — corriger les incohérences

| Ma tâche | Les lignes du document | Ce que la correspondance dit de moi |
|---|---|---|
| `S2.1` un seul chemin pour vérifier son adresse | `IND01-F01`, `TR01-F01` | deux chemins ouverts en même temps, c'est une seule ligne de l'inventaire qui tient mal |
| `S2.2` finir Google, retirer le lien sans mot de passe | `IND01-F02`, `TR01-F01` | la ligne est en ligne, le réglage chez le fournisseur attend ma carte bancaire |
| `S2.3` la fiche d'identité du dépôt | *`TR07-F03`* | une tâche technique sans ligne ; elle mérite d'en recevoir une, parce que sans elle je ne sais plus ce qui fait foi |
| `S2.4` ranger le dépôt | *`TR07-F03`* | idem, et les trois gestes restants m'attendent |
| `S2.5` écrire le contenu du produit à un seul endroit | *`TR07-F02`*, `ADM02-F01`, `ADM03-F01`, `ADM04-F01` | ces référentiels sans écran ont au moins un lieu où leurs nombres sont vérifiés |
| `S2.6` relire le catalogue ligne par ligne | `ADM04-F01`, `ADM07-F01`, `ADM08-F01` | la relecture remplace l'écran d'administration que l'inventaire suppose et que je n'ai pas |
| `S2.7` écrire en français ce qui est en anglais | `ADM04-F01`, `ADM08-F01`, `ADM12-F01` | la ligne `ADM12-F01`, « gestion des contenus », est exactement cela, sans écran |

### Sprint 3 — rendre le parcours fluide

| Ma tâche | Les lignes du document | Ce que la correspondance dit de moi |
|---|---|---|
| `S3.1` une adresse par étape | *`TR07-F01`*, `IND01-F04`, `IND02-F03` | découper par adresse est ce qui a rendu possible le poids d'aujourd'hui |
| `S3.2` reprendre trois jours après, sur un autre appareil | `IND01-F05`, `IND02-F04`, `TR01-F02` | le « conserver son travail » de l'inventaire, testé avec de la vraie distance |
| `S3.3` un vrai écran de profil avant le questionnaire | `IND03-F01`, `IND03-F02`, `IND03-F03` | les sept blocs de la ligne `IND03-F03` sont le cahier des charges de cette tâche |
| `S3.4` expliquer chaque recommandation | `TR06-F01`, `IND02-F03` | une recommandation sans raison reste une affirmation |
| `S3.5` un lien partagé qui ouvre le vrai profil | *`TR02-F02`* | rien dans l'inventaire ne prévoit qu'un candidat montre son profil à quelqu'un |
| `S3.6` un tableau de bord qui guide l'action | `IND05-F01`, `IND05-F02`, `IND04-F01` | les deux lignes de progression sont là, mais ne disent pas quoi faire ensuite |
| `S3.7` tester avec dix personnes hors de l'équipe | le statut « à valider », partout | aucune ligne ne se ferme pour moi avant ce test ; c'est le document qui a écrit le protocole |

### Sprint 4 — connecter les données entre elles

| Ma tâche | Les lignes du document | Ce que la correspondance dit de moi |
|---|---|---|
| `S4.1` garder les réponses et pouvoir les relire | `IND02-F04`, `IND03-F01` | l'inventaire ne demande nulle part que les réponses restent lisibles après coup ; c'est une ligne que j'ajoute, rattachée à la sauvegarde |
| `S4.2` un changement de barème ne jette plus les anciens profils | `TR06-F01` | dans l'inventaire le moteur est une ligne ; dans le produit il a une version, et les profils gardés sur un appareil portent la leur |
| `S4.3` la progression dans un module met à jour le profil | `IND03-F05`, `IND05-F03` | les deux lignes se tiennent la main : l'une dit que le profil évolue, l'autre que l'avancement s'actualise, et aujourd'hui rien ne circule |
| `S4.4` faire des compétences une donnée du profil | `ADM06-F01`, `IND03-F03` | le référentiel des compétences est à développer, le mien est dans les données et ne se montre pas |
| `S4.5` choisir qui voit quoi | *`TR02-F02`*, et les deux lignes « consultation des profils autorisés » chez les établissements et les consultants | la visibilité est réglée du côté de l'institution qui consulte ; le candidat, lui, ne décide de rien |

### Sprint 5 — relier les modules à des formations réelles

| Ma tâche | Les lignes du document | Ce que la correspondance dit de moi |
|---|---|---|
| `S5.1` dire où se suit la formation et comment s'y inscrire | `IND06-F02`, `ADM04-F01` | c'est le troisième pas du parcours cible, et le seul que je ne pouvais pas faire sans adresses vraies |
| `S5.2` relier chaque module à une formation qui existe | `ADM05-F01`, `ADM04-F01`, `IND02-F06` | les deux référentiels se touchent ici, et c'est la donnée qui commande, pas l'écran |
| `S5.3` valider une compétence acquise | `ADM06-F01`, `IND05-F04` | marquer un module terminé ne prouve rien ; la ligne de compétences est le seul endroit où cette preuve se range |
| `S5.4` ajouter une formation depuis une recommandation | `IND04-F03` | **rangée** : le document écrit « hors du premier indispensable », je la programmais en sprint 5. Désaccord n° 7, et le document a raison contre moi |

### Mes lignes « Ensuite », et ce qu'elles deviennent dans l'inventaire

| Ma ligne | Les lignes du document | Nature |
|---|---|---|
| `E1` rattacher les chances aux métiers | `IND06-F03` | fonctionnalité, déjà dans l'inventaire |
| `E2` compléter l'offre hors Bénin | `ADM04-F01` | donnée, donc le chapitre 9 |
| `E3` rendre la recherche utilisable | `TR03-F01` | fonctionnalité transversale, dans l'inventaire |
| `E4` alléger le premier affichage | *`TR07-F01`* | technique, sans ligne dans l'inventaire |
| `E5` accessibilité clavier et contrastes | *`TR07-F04`* | technique, sans ligne dans l'inventaire |
| `E6` une version anglaise de l'accueil | `ADM12-F01`, `LP01-F01` | contenu, dans l'inventaire |
| `E7` la politique de conservation des données | *`TR02-F03`* | fonctionnalité, sans ligne dans l'inventaire |
| `E8` recevoir les contenus des centres et universités | `ADM11-F02`, `ADM12-F01`, `UNI03-F01`, `CON05-F01` | fonctionnalité, jusqu'au partenariat près |

### Mes trois blocs du bas, et leurs lignes dans l'inventaire

Ma liste « plus tard » tombe presque entièrement dans les `P2` et les `P1` : le catalogue de compétences partagé est
la ligne `ADM06-F01`, les opportunités d'emploi et de stage sont la ligne `IND06-F01`, l'accompagnement est tout le
bloc `IND08`, la reprise de session plus tolérante est la ligne `TR01-F02`, les tableaux de bord d'usage sont la
ligne `ADM14-F02`. Une seule de mes lignes n'a rien en face : « profil professionnel imprimable », qui n'existe que
comme adjectif dans l'inventaire.

Ma « vision » est le chapitre 6, le chapitre 7, le chapitre 8 et leur `P3`, plus la question du partenariat. Le
désaccord n'est pas sur le fond mais sur la valeur qu'on donne à ces lignes : le document les écrit comme un périmètre
à venir, je les lis comme une décision à prendre.

Mon « parking » déborde du document, et c'est normal : il décrit ce que le produit devrait faire, pas ce qu'on pourrait
lui ajouter sans raison. Rien de mon parking ne demande une ligne.

---

# Partie C — où le document de référence et le produit ne disent pas la même chose

Onze écarts, numérotés, et chacun fini par une proposition. Aucun n'est un reproche : l'inventaire a été écrit pour
dire ce que le produit devrait contenir, mes mesures disent ce qu'il contient. Là où les deux se contredisent, je dis
ce que je fais en attendant, et qui tranche.

**1. Le questionnaire du document n'est pas celui du produit.** La ligne `IND02-F01` écrit : 23 questions structurées
en 6 sections — cognition, motivations et passions, talents, intérêts, réalité, positionnement. Le produit en pose
31, réparties en cinq groupes qui s'affichent à l'écran : « Votre situation », « Votre profil », « Vos centres
d'intérêt », « Vos aptitudes », « Vos contraintes ». Selon la situation déclarée, quelqu'un en répond 29 ou 30, et ce
nombre est calculé sur les questions réelles, pas écrit à la main. Deux des six noms du document ne se retrouvent
nulle part : « talents » et « positionnement ». **Ma proposition :** laisser les 31 questions et les cinq groupes, et
reprendre les six mots du document comme thèmes de couverture, pas comme découpage d'écran. Ce que je me dois :
vérifier que les six thèmes sont tous touchés par au moins une question, et le dire ici. C'est une relecture de
texte, pas un chantier.

**2. Les trois lignes « à valider » sont en fait en ligne.** `IND02-F05` (télécharger ou exporter le résultat) :
quatre sorties fonctionnent, l'impression, le partage du navigateur, la copie dans le presse-papiers et le fichier
texte. `IND02-F10` et `IND04-F02` (valider le parcours) : le geste existe, il s'écrit dans le profil et il repart sur
un autre appareil. Le seul manque est un format, le PDF. **Ma proposition :** passer les trois lignes à
« partiellement existant », avec le PDF comme périmètre restant. Personne ne tranche ici, c'est une mesure.

**3. `IND03-F06` est marquée à développer, elle est faite.** « Refaire son orientation sans supprimer les
informations personnelles » : depuis mon espace, le bouton d'accueil ramène au test, et le compte garde sa photo et
son nom. **Ma proposition :** la passer à « partiellement existant », pas « existant », parce que le résultat neuf
remplace bien l'ancien mais ne laisse aucun moyen de le relire. C'est ma tâche `S4.1`, et c'est le mot qui manque.

**4. Trois lignes de la progression sont en ligne.** `IND05-F01`, `IND05-F02` et `IND05-F04` sont écrites « à
développer » alors que le tableau de bord calcule les modules faits sur le total, que les pistes s'affichent dans
l'ordre et qu'un module se marque terminé. `IND05-F03`, « actualiser les étapes réalisées », est à moitié là : le
geste existe, mais rien de ce qui est coché ne remonte au profil, et c'est exactement ma tâche `S4.3`. La cinquième,
`IND05-F05`, l'historique des évolutions du parcours, n'existe pas et mérite son statut. **Ma proposition :** trois
changements de statut, `IND05-F03` passée à « partiellement existant », et `S4.3` garde la main sur ce qui manque.

**5. Les lignes « opportunités » sont à moitié là, et le mot du document est juste.** `IND06-F01` et `IND06-F02`
sont marquées « à développer » alors que cent soixante-treize lignes d'offres sont à l'écran, dont cent
cinquante-neuf avec une adresse d'origine. Ce qui manque est dans la phrase même du document : les stages, les
emplois, les concours. **Ma proposition :** passer les deux lignes à « partiellement existant », et la fin de sa
note — « ou autres opportunités pertinentes » — devient ma ligne `E1` : rattacher les chances aux métiers visés, pas
seulement au domaine.

**6. Le plus lourd des onze : le chapitre 9 suppose un écran que je n'ai pas.** Les lignes `ADM02-F01`,
`ADM02-F02`, `ADM03-F01`, `ADM04-F01`, `ADM05-F01`, `ADM06-F01`, `ADM07-F01` et `ADM08-F01` sont toutes « à
développer », quatre d'entre elles au cœur du produit. Mes référentiels, eux, existent et viennent de la base du
document. Ils sont à l'écran, ils sont vérifiés à chaque contrôle automatique, et on ne peut pas les reprendre sans
toucher un fichier du dépôt et pousser en ligne. **Ma proposition, en trois temps, et c'est là que je demande :** ni
back-office complet ni statu quo. D'abord écrire dans `docs/CONTENU-PRODUIT.md` ce que chaque référentiel contient
aujourd'hui, ce qui est fait. Ensuite décider si une reprise de données en autonomie vaut un écran ; ma réponse est
non pour l'instant, parce que je suis le seul à reprendre les données et que l'écran coûterait plus que le geste.
Troisièmement, si un jour plusieurs personnes reprennent ces lignes, l'écran devient `P0` pour de vrai, et la
question se réglera alors, pas avant. Ce qui change si je me trompe : rien à l'écran pour un candidat, tout pour la
vitesse à laquelle une erreur de donnée meurt.

**7. Ma tâche `S5.4` est hors du premier indispensable du document.** La ligne `IND04-F03` est écrite « hors du
premier indispensable » : ajout d'une étape personnelle, fonction dédiée plus tard. Je la programmais en sprint 5, et
mon propre principe numéro 2 dit de ne pas surcharger le premier choix de parcours. **Ma proposition :** `S5.4`
descend en « Ensuite », les jours que le calendrier a écrits pour le sprint 5 restent tels quels jusqu'à ce que je
reprenne le calcul, et l'écran de parcours garde sa forme actuelle. C'est moi qui tranche, parce que c'est mon
principe et ma semaine.

**8. Soixante-six lignes pour trois espaces, et trois cartes qui demandent encore s'ils s'ouvrent.** Les chapitres
6, 7 et 8 du document sont complets, priorisés, et sans une ligne qui prétende exister. Dans l'outil de suivi, trois
cartes de cadrage attendent la même réponse depuis septembre. **Ma proposition :** ces trois chapitres restent dans
l'inventaire avec leurs `P2` et leurs `P3`, ma « Vision » les reçoit tels quels, et aucune ligne de ces trois espaces
n'entre dans un sprint tant que la carte de cadrage est ouverte. Ce qui est décidé ici n'est pas le périmètre mais la
séquence.

**9. `LP01-F04` redemande ce que j'ai retiré le 23 septembre.** « Accès aux espaces utilisateurs, individus,
établissements, consultants, entreprises » : j'ai enlevé les quatre onglets le 23/09 parce qu'un clic ne produisait
rien et qu'aucune adresse du site ne leur correspondait. **Ma proposition :** la ligne reste « à développer », et
l'accueil ne reparle des quatre espaces que quand trois d'entre eux auront au moins un compte ouvrable. Garder un
bouton mort pour faire complet est exactement la classe de mensonge que ma tâche `S1.5` est en train de nettoyer.

**10. Le piège que la ligne `IND01-F05` ne dit pas.** Elle est marquée « partiellement existant », et le mot est
juste, mais le manque n'est pas celui qu'on croit : le résultat du test est gardé sous une seule clé par appareil,
sans distinction de personne. Sur un ordinateur partagé — un cyber, un téléphone de famille, un poste d'atelier —, le
compte suivant peut ouvrir le profil du visiteur précédent. **Ma proposition :** ne rien attendre de la
priorisation, c'est une correction, et `S1.4` la porte. Elle passe avant les trois quarts de l'inventaire, même si le
document ne la nomme nulle part sous cette forme.

**11. Le document de référence ne vit pas dans le dépôt.** Le fichier `Backlog_de_reference_AliTche.docx` est dans
mon dossier de téléchargements. La partie A de ce fichier en porte les cent trente-sept lignes, donc le dépôt n'est
pas aveugle, mais l'original disparaîtrait avec l'ordinateur. **Ma proposition :** copier le document dans le dépôt,
dans un dossier à part des documents de travail, dès que je le dis. Je ne le fais pas de moi-même, parce qu'un
document binaire livré dans un dépôt d'écriture est une décision, pas un rangement.

---

# Partie D — ce qui est écrit dans l'outil de suivi

ClickUp est le miroir, pas l'autorité. Ce que je fais, ce que je dois faire et ce qui est fait se lisent d'abord
ici ; ClickUp sert à voir l'avancement dans le temps et à suivre mes activités jour par jour. Depuis cette
réorganisation, le miroir a une règle de plus à tenir : chaque carte de fonctionnalité porte le numéro de la ligne
de référence qu'elle répète, et l'outil ne décide jamais du périmètre.

## Les règles de conversion du document, appliquées

Le document pose cinq translations et une convention. Je les applique telles quelles, parce qu'elles sont
exactement ce que mon miroir avait de mieux à faire.

| Élément du backlog | Traduction dans l'outil | La règle posée | Ce que j'en fais ici |
|---|---|---|---|
| `EPIC` | tâche parent | une tâche principale représente un grand bloc fonctionnel | mes blocs fonctionnels existent déjà : les dossiers par acteur, et les dix modules de `docs/MODULES.md` |
| Fonctionnalité | sous-tâche | chaque fonctionnalité doit pouvoir être développée et validée indépendamment | une carte par ligne de la partie A, jamais une carte pour deux lignes |
| Sous-fonctionnalité | sous-tâche de niveau inférieur, ou liste de vérification | à utiliser seulement quand un découpage est nécessaire | le seul cas que j'ai rencontré : les sept blocs de `IND03-F03`, qui tiennent en une liste de vérification, pas en sept cartes |
| Critère de validation | liste de vérification, critères d'acceptation | permet de vérifier que la fonctionnalité répond au besoin | c'est déjà ma colonne « comment on saura que c'est fini », recopiée dans la carte |
| Travail technique | tâche technique rattachée | une tâche technique doit toujours être reliée à une fonctionnalité du backlog | mes tâches de rangement et de contrôle se rattachent aux six lignes que je propose en partie C |

La convention recommandée — conserver les identifiants du backlog dans les tâches, par exemple `IND03-F03`,
pour retrouver la correspondance entre le document, l'outil et le développement — est la chose qui manquait à mon
miroir. Je l'adopte sans discussion : le numéro passe en tête du titre de la carte. Une carte qui ne porte pas de
numéro est donc une carte de mes sprints, et elle porte son propre `S3.4`.

## Le métier neuf des deux listes de l'espace d'avancement

C'est la réponse à la question que je me posais depuis septembre : deux listes se marchaient dessus, l'une portée
par les tâches, l'autre par le calendrier. Elles ont maintenant deux objets différents, et ça se voit à leurs
identifiants.

**« Action Items » porte le périmètre ouvert.** La liste `1200440000046344` avait été créée comme une liste de
service, avec ses quatre états en anglais venus d'un moule tout prêt. Elle devient l'endroit où se lisent les lignes
de la partie A qui ne fonctionnent pas encore et qui comptent le plus : les lignes à la priorité `P0` ou `P1` que
le statut écrit ne marque pas comme existantes. J'en ai recompté quarante et une sur les cent trente-sept, et
trente-trois une fois retirés les huit qui appartiennent aux trois espaces dont je n'ai pas décidé l'ouverture.
Une carte par ligne, nommée par son identifiant, avec ce qu'elle change, comment on saura que c'est fini, et un
renvoi à ce fichier. C'est là que se lit « qu'est-ce qui reste, et dans quel ordre de gravité ».

**« sprint planning » porte le temps.** La liste `1200440000046312` garde ce qu'elle contient : les cinq jalons de
sprint avec leurs dates, et les cinq fiches de session de test. Elle ne reçoit aucune ligne de périmètre. Ce qui
change pour elle, c'est une phrase dans chaque jalon : le nombre de tâches du sprint et l'adresse où elles se
lisent, la table de correspondance de la partie B. C'est là que se lit « où j'en suis dans le temps ».

Les deux listes se rejoignent par les identifiants, et nulle part ailleurs. Une carte d'« Action Items » qui devient
un travail daté ne quitte pas la partie A : elle est reprise par une carte de sprint, et la carte de suivi porte les
deux numéros, le `S` et celui du document.

## Où le travail se pose, mesuré le 03/10/2026

J'ai rangé ClickUp à la main le 25/09/2026 : le travail d'AliTché vit dans mon espace de travail le plus récent, en
deux espaces — « AliTché » pour ce qu'on construit, « Project management » pour ce qu'on suit dans le temps. Les
identifiants comptent plus que les noms, parce que les noms changent pendant qu'on travaille.

| Ce qui porte le travail | Où | Identifiant | Ce que ça contient |
|---|---|---|---|
| Backlog — Individus | dossier Module Impétrants | `1200440000047021` | soixante-dix-neuf cartes de fonctionnalités, miroir de `docs/MODULES.md`, étiquetées module 1 à module 10, plus les vingt-neuf cartes des tâches de ce document |
| Backlog — page d'accueil | dossier Landing page | `1200440000046011` | quatre cartes |
| Backlog — administration | dossier Espaces Admin | `1200440000046018` | six cartes : le catalogue et les documents du dépôt |
| Cadrage — Universités et centres de formations | `1200440000047028` | une carte : est-ce que j'ouvre cet espace |
| Cadrage — Consultants et centres d'employabilité | `1200440000047029` | une carte : idem |
| Cadrage — Entreprises et recruteurs | `1200440000047034` | une carte : idem |
| sprint planning | espace Project management | `1200440000046312` | les cinq jalons de sprint avec leurs dates, et les cinq fiches de session de test |
| Action Items | espace Project management | `1200440000046344` | la liste de service, telle qu'elle a été créée, et le métier neuf écrit plus haut |

## Ce que j'y ai écrit le 03/10/2026

Quarante-quatre cartes, prises une à une dans ce document, aucune inventée pour faire bonne mesure : vingt-neuf
tâches et lignes « Ensuite » chez les candidats, quatre pour la page d'accueil, six pour le catalogue et les
documents, cinq jalons pour le calendrier. Chaque carte porte le numéro de sa tâche, ce qu'elle change, comment on
saura que c'est fini, sa taille, et renvoie à ce fichier. Trois cartes sont fermées et portent leur preuve : la fiche
d'identité du dépôt (commit `e0cc79a`), ce que contient AliTché écrit à un seul endroit (commit `90369b2`), les
quatre onglets morts retirés de l'accueil (commit `6005e19`). Huit cartes portent « en cours », parce que leur dépôt
est écrit et leur preuve à l'écran non faite. Une porte « bloqué » : la connexion Google, dont les deux réglages chez
le fournisseur ne se font pas sans la carte bancaire que je n'ai pas.

## Ce que le miroir ne peut pas dire, et comment je m'en passe

Les listes du dossier AliTché n'ont que deux statuts, « à faire » et « achevé ». Le « où j'en suis vraiment » ne se
lit donc pas dans le statut : c'est l'étiquette qui le porte — non commencé, en cours, en test, validé, bloqué. Le
sprint n'est pas non plus une case à cocher : une étiquette « sprint 1 » à « sprint 5 » et les deux dates de la carte
font le travail. La liste de planning a quatre états en anglais, parce qu'elle vient d'un moule tout prêt ; mes cinq
jalons y sont ouverts « à faire », avec les dates du calendrier de la partie B.

## Le budget décide du rythme

Le service coupe à cent appels par jour, lectures comprises, et ce compteur est partagé avec mes autres sessions.
D'où la règle : relire par identifiant avant de réécrire, parce que rejouer un appel déjà passé fait une carte en
double. Le miroir est écrit et relu carte par carte. À l'heure où j'écris, le compteur est plein et le service
annonce la remise à zéro le soir du 2026-10-04 ; les écritures ci-dessous sont donc en file, pas en échec.

## Ce que le miroir me doit encore, écrit le 2026-10-04

Cinq écritures sont prêtes et aucune ne se devine. Les trois premières étaient dues avant la réorganisation, les
deux dernières la réorganisation elle-même :

1. « Alléger le premier affichage », chez les candidats : fermer la carte avec sa preuve mesurée sur le fichier servi
   en ligne aujourd'hui — 409 853 octets, 118,8 kilo-octets comprimés, contre 550 616 et 164 la veille ; les
   catalogues tiennent dans leur propre fichier de 142 744 octets (38,5 kilo-octets comprimés), que seul paie qui
   lance le test ou ouvre son espace. Commit `04aca30`.
2. Les cartes du module 4, chez les candidats : porter la preuve du commit `5a356c9`, relue dans le fichier servi —
   cent soixante-treize lignes d'offre, cent cinquante-neuf adresses, et zéro adresse d'agrégateur.
3. « Retirer les trois écrans qui promettent sans tenir », à la page d'accueil : la clarifier, parce que son libellé
   ne dit pas quels trois écrans et qu'on ne ferme pas une carte qu'on ne peut pas reconnaître.
4. Le métier neuf d'« Action Items » : trente-trois cartes, une par ligne ouverte de `P0` ou `P1` hors des trois
   espaces non décidés, chacune nommée par son identifiant de référence et rattachée à sa ligne de la partie A.
5. L'étiquette d'identifiant sur les cartes qui existent déjà et portent une ligne de référence : les vingt-neuf
   cartes de mes tâches ne reçoivent pas le numéro du document, elles gardent le `S` et renvoient à la table de correspondance,
   parce qu'une tâche mienne couvre plusieurs des lignes du document.

Les cinq passent d'abord par une relecture par identifiant, listes `1200440000047021`, `1200440000046011`,
`1200440000046344` et `1200440000046312` : la vue d'arbre ment depuis qu'un dossier contient un sous-dossier, et
l'écriture sans relecture produit des doublons. Deux choses ne se poussent pas, parce qu'elles m'attendent moi et non
le miroir : la preuve par deux comptes réels, et la décision sur la question des compétences déjà développées.

## Le plan du 23/09 est dépassé, pas inachevé

Le plan promettait dix dossiers de module, une liste dans chacun et quatre-vingt-quatre cartes. J'ai tranché autrement le
25/09, et c'est écrit dans `docs/MODULES.md` : des dossiers par acteur, pas par module. Les cartes des dix modules
tiennent donc dans une seule liste, « Backlog — Individus », et c'est l'étiquette qui les rend filtrables module par
module. Cette liste compte maintenant cent huit cartes : soixante-dix-neuf fonctionnalités de module, et les
vingt-neuf tâches de ce document. Les cent trente-sept lignes de la partie A ne sont pas cent trente-sept cartes de
plus : celles qui attendent un espace n'entrent dans aucun sprint tant que la carte de cadrage est ouverte, et le
reste se suit par « Action Items ».

## L'espace de travail d'avant

AliTché y occupe un dossier découpé lui aussi par acteur — « Espace utilisateurs », « Landing page », « Espace
admin », une liste dans chacun, relevé à l'instant. Les six listes de sprint que le plan du 23/09 y avait comptées
n'y sont plus : la reprise à la souris a défait cette découpe. J'affirme cela et rien de plus, parce que le
recomptage de leur contenu est tombé après la coupure. Et je ne supprime rien : le connecteur ne sait pas supprimer
une liste, et une carte effacée emporte avec elle la décision qui l'avait fait écrire.

## Règle de sens

Les cartes viennent de ce fichier, jamais l'inverse. Une retouche faite dans l'interface entre deux séances — une
priorité changée, une carte créée à la volée — est une demande de portée, pas un avancement : elle passe d'abord
ici, puis le miroir est corrigé le jour même. Le détail des cartes de module vit dans `docs/MODULES.md` ; ce
document-ci porte les tâches et l'inventaire, et ClickUp les répète. Ce que mon principe numéro huit ajoute, et que
je vais dorénavant vérifier à chaque écriture : une carte de suivi ne crée pas une fonctionnalité, elle la répète.
