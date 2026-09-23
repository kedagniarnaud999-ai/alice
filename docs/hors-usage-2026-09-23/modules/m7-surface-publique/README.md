# M7 · Surface publique

**Statut : proposition non autorisée — gate 0 non signé.**

## Destination

La vitrine ne promet plus un produit plus grand que le produit, et elle s'affiche sur une connexion 3G.

C'est le seul module que voit un visiteur qui n'a pas encore décidé. Il ne juge pas le moteur : il juge s'il
nous confie trente minutes.

## Périmètre

| Chemin | Rôle |
|---|---|
| `src/components/home/HomePage.tsx` | la vitrine (313 lignes) |
| `src/components/home/AliTcheLanding.tsx` | **aucun importateur** (D-12) |
| `src/components/brand/BrandMark.tsx` | marque |
| `src/components/ui/LoadingScreen.tsx` | ce que voit le visiteur avant que le client démarre |
| `public/brand/` | `alitche_logo.png`, `alitche_logo_blue.jpg`, favicons — l'endroit où logerait une image d'accueil servie par le dépôt |
| `index.html` | balisage social |

## Acquis (mesuré le 2026-09-23)

- **Le vocabulaire imposé tient.** `filière` : **0 occurrence** dans `src/`. Partout « domaine de carrière ».
  C'est une contrainte du fondateur, et elle est respectée dans le code comme dans la donnée.
- **La vitrine est en français**, comme le reste.
- **Le blocage de la barre de navigation est déjà levé** : les boutons du site public ne sont plus sous
  `LoadingScreen`, et un accès à la connexion est proposé depuis l'écran de démarrage.

## À développer

| Code | Travail | Critère d'acceptation | Dépend de |
|---|---|---|---|
| F-17 · T-019 | Les quatre onglets morts | « Orientation », « Métiers », « Écoles », « Mentors » (`HomePage.tsx:49-60`) sont des `<button type="button">` **sans `onClick`**, et aucune route ne les porte. Soit ils mènent quelque part, soit ils sortent. Idem le lien de pied de page (`:306`). **Après passage, un clic ne doit plus jamais ne rien faire** | T-001 |
| D-07 | L'image d'accueil hébergée ailleurs | `HomePage.tsx:27` charge depuis `lh3.googleusercontent.com/aida-public/…`. L'actif est servi depuis `public/` et le dépôt n'a plus de dépendance d'affichage vers un hôte tiers | — |
| (à créer) | Balisage social du lien partagé | `index.html` ne contient **aucune** balise `og:` ni `twitter:` (vérifié ce jour) : un lien AliTché partagé dans WhatsApp ou Slack arrive nu. À traiter avec T-010 (M6), qui porte la même URL | T-010 (M6) |
| (à créer) | Alléger le JS initial | Bundle mesuré le 2026-09-23 : **779,15 kB**, **214,10 kB gzip** (seuil d'alerte Vite : 500 kB non gzip). Un premier affichage utile sur 3G, chiffré après suppression de D-12 et auto-hébergement de l'image | D-12 (M6) |

## Le risque de ce module est réputationnel, pas technique

Quatre onglets qui ne font rien, c'est un visiteur qui conclut que le produit est une maquette. Une image chez
Google, c'est un accueil qui se casse un jour sans lien avec nous. Les deux se réparent en une séance ; le
dégât, non. C'est pourquoi M7 est **petit et prioritaire** dans le mouvement 1 : il conditionne la crédibilité
de tout ce qu'on va envoyer à dix personnes hors équipe pour OBJ-3.

## Preuve de fin

Un visiteur sur 3G, depuis un téléphone, parcourt la vitrine, ne rencontre aucun bouton mort, et arrive au test
sans que la page se soit appuyée sur un hôte extérieur.

## Hors module

- **Une refonte graphique.** Rien ici ne demande un nouveau design : la vitrine garde sa figure, elle tient ses
  promesses.
- **Des pages de plus** (blog, comparateurs, témoignages). Non-goal 8. Chaque page nouvelle en sort une autre.
- **Rassurer avec des chiffres qu'on n'a pas.** Aucun compteur d'utilisateurs, aucune « note » inventée sur la
  vitrine avant que OBJ-2 ne fournisse une mesure vraie.
