# Read Me

## TODO

[] SQL: game col in post as join ?
[] unit test
[] css: optimize for phone
[] docker
[] internasionalization
[] gallery: auto load on scroll
[] post par game
[] SQL requete with UNIXTIMESTANP() to avoid parsing Date()
[] Utiliser un ORM (Sequelize)
[] Meilleur gestion des fichiers. ajouter une extension aux fichier validé pour faciliter la detection du type mime dans api/image/ (detection du type mime par l'extension)
[] Ne pas refaire vérifier les adresses mail qui l'on déjà était (les retrouver dans la bdd en cas de perte du cookies)
[] déclaration de confidentialité
[] imrpove database connexion handling (pool)

## A propos

### Choix du Framework

Next.js a été choisi un peu au hasard, m'ayant été présenté comme LE framework révolutionnaire à la mode. Finalement, il s'avère ne pas être le meilleur choix, car le site ne tire parti d'aucun de ses avantages et doit faire avec ses contraintes...

J'aurais préféré que les pages du site soient reconstruites à la demande, lorsque le contenu de la base de données change, via par exemple une fonction pour "invalider" des pages ou des ressources. Mais cela n'est pas possible, Next.js ne propose qu'un Server Side Rendering systématique ou à intervalle régulié...
Next.js ne sert les fichiers statiques que s'ils sont présents à la construction du site, ce qui est gênant dans mon cas puisque les utilisateurs peuvent uploader des images et en plus celles-ci ne doivent pas être disponibles avant d'être validées manuellement. J'ai donc créé une route pour servir les images en fonction de leur état de validation.

J'aurais souhaité que le site puisse fonctionner sans Javascript ni Cookies. Ces technologies offre beaucoup de possibilités et les navigateurs que peu de contrôle sur celles-ci, de plus elles sont utilisées à tort et à travers pour traquer les utilisateurs (certain site ne fonctionne pas sans, n'affiche pas de miniature ou ne tri pas la liste des resultats si les cookies sont désactivés...)(Je ne vous parle même pas des popups sur l'utilisation des cookies qui pop sans arrêt...)

Pour l'heure seule les pages d'administration et le chargement du css dépend de Javascript ou des cookies. Les pages d'administration fonctionnent avec une authentification via cookies (puisque [l'authentification HTTP](https://fr.wikipedia.org/wiki/Authentification_HTTP) est dépréciée, certain navigateur refusant d'afficher la popup demandant le login et mot de passe). Quant au css je n'ai pas encore cherché de solution.
Pour les formulaires j'ai conservé l'attribut `action` en plus d'ajouter un événement `onClick`. Ainsi si Javascript est activé le formulaire est envoyé via `fetch()` comme il est habituelle de le faire avec React. Dans le cas où Javascript est désactivé la requête est récupérée grâce à la fonction de Server Side Rendering qui passe la requête à l'api et permet son traitement.

### Security

Les formulaires du site ne sont accessibles que si l'utilisateur a vérifié son adresse mail afin d'éviter le spam (pas efficace contre des bots évolués).

Les fichiers uploadés sont enregistré sans extension, puis le type de fichier est détecté selon leur contenus. Ainsi les images ne sont servies que si se sont vraiment des images (mais cela ne protége pas contre les failles liées au chargement des images, car la détection se limite aux entêtes et ne vérifie pas l'integrité des fichiers)

Beaucoup de page et de route de l'API renvoient un code 404 si leurs conditions ne sont pas remplies afin de les "cachées" aux yeux des bots. Mais elles restent détectable puisque certaines sont obligées de lire des cookies ce qui rend leur temps de réponse plus long que les pages qui n'existent vraiment pas.

Pour éviter que les pages d'administration soit trouvées elles sont "cachées" derriére un dossier avec un nom qui ne signifie rien (par exemple "fgQqrg").

### Messagerie

En attandant de mettre en place un server mail, les messages sont envoyés sur une boite mail public (gmail, outlook, ...) avec le champ `replyTo` rempli avec le mail du destinataire et le champ `from` avec une chaine vide. Il ne reste plus qu'à cliquer sur répondre. Seul "bemol", s'il en est, le message initial est detecté comme indésirable mais pas sa réponse, l'utilisateur reçois donc la réponse comme il faut. ¯\\_(ツ)_/¯

### Base de données

Le site ne nécessite pas d'inscription. Chaque post peut être signé avec un pseudo différent, voir déjà existant (c'est le champ `user_name`) mais chaque post est relié à une adresse mail (c'est le champ `user_id` qui fait la jontion avec la table `user`). Ainsi grâce à l'adresse mail les posts d'un utilisateur peuvent être retrouvé.

### Dépendance

Next.js; React; busboy (formulaire); iron-session (session in cookie); mysql; nodemailer (envoie de mail);
