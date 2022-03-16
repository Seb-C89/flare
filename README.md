# Read Me

## Testez-moi

J'ai voulu publier le site tel quel, car il est fonctionel, mais le fait que les images soient enregistrées sur le disque dur pose probléme avec les hébergeurs (tel Vercel). Il faudra mettre en place, et dépendre, d'un énième service pour héberger les images. J'ai donc créer un Docker pour faciliter le partage de la version de développement.

### Docker

Il suffit de lancer Docker-compose :
`docker-compose up -d`

Il faut attendre jusqu'à quelques minutes que le container MySQL s'initialise puis le site est accessible à partir de n'importe quel navigateur à l'adresse [http://localhost:3000/](http://localhost:3000/)

#### Petite spécificité sur le fonctionnement du Docker

Le code source n'est pas "monté" dans un volume, mais copié dans l'image pour rendre le docker plus portable. En effet les modules du dossier /node_module ont des versions spécifiques à Windows ou Linux. Si le code source est monté dans l'image avec des modules téléchargés depuis Windows celà pose probléme, et si les modules sont installés depuis Dockers le site ne peux plus être développé avec un ordinateur sous Windows...
Pour mettre à jour le code il faut donc reconstruire l'image (Se qui n'est pas génant dans le cas de se docker de démonstration, puisqu'il est censé être construit qu'une seule fois)

Autre spécificité, l'image MySQL initialise la base de donnée uniquement lors de la premiére utilisation. Il faut donc penser à supprimer le volume créé par défault pour redéclencher une initialisation. (Se n'est pas génant dans le cas de se docker de démonstration puisqu'il n'est pas censé être reconstruit)

### Capture d'écran

[![screenshoot](https://db3pap001files.storage.live.com/y4mmIPqG8H9yMM8O7MCsfQbwJnBeUeYHVc4AdKNrC4AihAaeNfNn9KRKlGDg4uDtZkkoZI9bGCaJJIDgQGVQVIpAC5ViFWLDnUdagNaaxQOzkjSwhm-NVpoJJvN5SEhNw3snxXb72BHVPs9yn2YQCwNYZ5IW4slkgXdqSNYCQmGTsQVqmoOz9GG2r1vmbNyPqJQ?width=256&height=124&cropmode=none)](https://db3pap001files.storage.live.com/y4mmIPqG8H9yMM8O7MCsfQbwJnBeUeYHVc4AdKNrC4AihAaeNfNn9KRKlGDg4uDtZkkoZI9bGCaJJIDgQGVQVIpAC5ViFWLDnUdagNaaxQOzkjSwhm-NVpoJJvN5SEhNw3snxXb72BHVPs9yn2YQCwNYZ5IW4slkgXdqSNYCQmGTsQVqmoOz9GG2r1vmbNyPqJQ?width=1919&height=933&cropmode=none) Plus de capture ici : https://1drv.ms/u/s!At9WEvfyjLgEhhPUQUvytRvNHUFd?e=qIsmUN

## A propos

### Choix du Framework

Next.js a été choisi un peu au hasard, m'ayant été présenté comme LE framework révolutionnaire à la mode. Finalement, il s'avère ne pas être le meilleur choix, car le site ne tire parti d'aucun de ses avantages et doit faire avec ses contraintes...

J'aurais préféré que les pages du site soient reconstruites à la demande, lorsque le contenu de la base de données change, via par exemple une fonction pour "invalider" des pages ou des ressources. Mais cela n'est pas possible, Next.js ne propose qu'un Server Side Rendering systématique ou à intervalle régulié...
Next.js ne sert les fichiers statiques que s'ils sont présents à la construction du site, ce qui est gênant dans mon cas puisque les utilisateurs peuvent uploader des images et en plus celles-ci ne doivent pas être disponibles avant d'être validées manuellement. J'ai donc créé une route pour servir les images en fonction de leur état de validation.

J'aurais souhaité que le site puisse fonctionner sans Javascript ni Cookies. Ces technologies offre beaucoup de possibilités et les navigateurs que peu de contrôle sur celles-ci, de plus elles sont utilisées à tort et à travers pour traquer les utilisateurs (certain site ne fonctionne pas sans, n'affiche pas de miniature ou ne tri pas la liste des resultats si les cookies sont désactivés...)(Je ne vous parle même pas des popups sur l'utilisation des cookies qui pop sans arrêt...)

Pour l'heure seule les pages d'administration et le chargement du css dépend de Javascript ou des cookies. Les pages d'administration fonctionnent avec une authentification via cookies (puisque [l'authentification HTTP](https://fr.wikipedia.org/wiki/Authentification_HTTP) est dépréciée, certain navigateur refusant d'afficher la popup demandant le login et mot de passe). Quant au css je n'ai pas encore cherché de solution.
Pour les formulaires j'ai conservé l'attribut `action` en plus d'ajouter un événement `onClick`. Ainsi si Javascript est activé le formulaire est envoyé via `fetch()` comme il est habituelle de le faire avec React. Dans le cas où Javascript est désactivé la requête est récupérée grâce à la fonction de Server Side Rendering qui passe la requête à l'api et permet son traitement.

### Securité

Les formulaires du site ne sont accessibles que si l'utilisateur a vérifié son adresse mail afin d'éviter le spam (pas efficace contre des bots évolués).

Les fichiers uploadés sont enregistré sans extension, puis le type de fichier est détecté selon leur contenus. Ainsi les images ne sont servies que si se sont vraiment des images (mais cela ne protége pas contre les failles liées au chargement des images, car la détection se limite aux entêtes et ne vérifie pas l'integrité des fichiers)

Beaucoup de page et de route de l'API renvoient un code 404 si leurs conditions ne sont pas remplies afin de les "cachées" aux yeux des bots. Mais elles restent détectable puisque certaines sont obligées de lire des cookies ce qui rend leur temps de réponse plus long que les pages qui n'existent vraiment pas.

Pour éviter que les pages d'administration soit trouvées elles sont "cachées" derriére un dossier avec un nom qui ne signifie rien (par exemple "fgQqrg").

### Messagerie

En attandant de mettre en place un server mail, les messages sont envoyés sur une boite mail public (gmail, outlook, ...) avec le champ `replyTo` rempli avec le mail du destinataire et le champ `from` avec une chaine vide. Il ne reste plus qu'à cliquer sur répondre. Seul "bemol", s'il en est, le message initial est detecté comme indésirable mais pas sa réponse, l'utilisateur reçois donc la réponse comme il faut. ¯\\_(ツ)_/¯

### Base de données

Le site ne nécessite pas d'inscription. Chaque post peut être signé avec un pseudo différent, voir déjà existant (c'est le champ `user_name`) mais chaque post est relié à une adresse mail (c'est le champ `user_id` qui fait la jontion avec la table `user`). Ainsi grâce à l'adresse mail les posts d'un utilisateur peuvent être retrouvé.

### Map

#### Routes

| Route | Fichier | Description |
| --- | --- | --- |
| `/` | `index.js` | Index du site, affiche les posts récent. Exporte les fonctions de `recent/[last_index].js` |
| `/recent` | `recent.js` | Affiche les posts récent. Exporte les fonctions de `recent/[last_index].js` |
| `/recent/56` | `recent/[last_index].js` | Affiche les posts récent depuis l'id `[last_index]` (pagination plus performante que d'utiliser `LIMIT + OFFSET`) |
| `/about` |  | Page static qui décrit le site |
| `/form/post` |  | - Permet de soumettre de nouveaux posts (admin ou utilisateur vérifié) ou de valider son email (si non vérifiée) |
| `/form/contact` |  | - Permet d'envoyer un email à l'administrateur (admin ou utilisateur vérifié) ou de valider son email (si non vérifiée) |
| `/gKlm/*` |  | Dossier derriére lequel sont "cachées" les pages d'administration |
| `/gKlm/files` |  | Permet de gérer les fichiers qui sont perdue : Fichier présent sur le disque mais pas dans la bdd et inversement; posts qui ne sont plus reliés à des images dans la bdd et inversment ... |
| `/gKlm/login` |  | S'authentifier comme admin |
| `/gKlm/logout` |  | Déconnexion. Supprime les données du cookies |
| `/gKlm/valid` |  | Permet de valider les nouveaux posts |
| `/api/image/...` |  | Permet de servir les images |
| `/api/recent/...` |  | Permet d'obtenir les nouveaux posts au format JSON |
| `/api/gKlm/*` |  | Routes d'administration |
| `/api/form/*` |  | Routes qui traites les données des formulaires |

### Dépendance

Next.js; React; busboy (formulaire); iron-session (session in cookie); mysql; nodemailer (envoie de mail);

## TODO

- [ ] SQL: 'game' col in 'post' as join ?
- [ ] unit test
- [ ] css: optimize for phone
- [x] ~~Docker~~
- [ ] use Next/image
- [ ] internasionalization
- [ ] gallery: auto load on scroll
- [ ] pouvoir trier les posts par jeu /game/\[nom_du_jeu\]
- [ ] SQL requete with UNIXTIMESTANP() to avoid parsing Date()
- [ ] Utiliser un ORM (Sequelize)
- [ ] Meilleur gestion des fichiers. ajouter une extension aux fichier validé pour faciliter la detection du type mime dans api/image/ (detection du type mime par l'extension)
- [ ] Ne pas refaire vérifier les adresses mail qui l'on déjà était (les retrouver dans la bdd en cas de perte du cookies)
- [ ] déclaration de confidentialité
- [ ] imrpove database connexion handling (pool?)
- [ ] site map
