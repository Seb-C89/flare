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

## A propos

# Choix du Framework

Next.js a été choisi un peu au hasard, m'ayant était présenté comme LE framework révolutionnaire à la mode. Finalement il s'avére ne pas être le meilleur choix, car le site ne tire partie d'aucun de ses avantages et doit faire avec certaines restriction...

J'aurais préféré que les pages du site soit reconstruites à la demande, lorsque le contenu de la base de donnée change, via par exemple une fonction pour "invalider" des pages. Mais celà n'est pas possible, Next.js ne propose qu'un Server Side Rendering systématique ou à intervalle régulier...
Next.js ne sert les fichiers statiques que s'ils sont présents à la construction du site et sans restriction, ce qui est génant dans mon cas puisque les utilisateurs peuvent uploader des images qui doivent d'être valider manuellement. J'ai donc créer une route pour servir les images en fonction de leur état de validation.

J'aurais souhaité que le site puisse fonctionner sans Javascript ni Cookies. Ces technologies offre beaucoup de possibilité et les navigateurs que peu de contrôle sur celles-ci, de plus elles sont utilisées à tort et à travers pour traquer les utilisateurs (certain site ne fonctionne pas sans, n'affiche pas de miniature ou ne tri pas la liste des resultats si les cookies sont désactivées...)(Je ne vous parle même pas des popups sur l'utilisation des cookies...)

Pour l'heure seul les pages d'administration et le chargement du css dépendent du Javascript ou des cookies. Les pages d'administration fonctionnent avec une authentification via cookies (puisque [l'authentification HTTP](https://fr.wikipedia.org/wiki/Authentification_HTTP) est déprécié, certain navigateur refusant d'afficher la popup demandant le login et mot de passe). Quant au css je n'ai pas encore cherché de solution.
Pour les formulaires j'ai conservé l'attribut `action` en plus d'ajouter un événement `onClick`. Ainsi si Javascript est activé le formulaire est envoyé via `fetch()` comme il est habituelle de le faire avec React. Dans le cas où Javascript est désactiver la requête est récupérer grâce à la fonction de Server Side Rendering qui passe la requête à l'api et permet son traitement.

# Security

Les formulaires du site ne sont accessible que si l'utilisateur à vérifier son adresse mail afin d'éviter le spam par des personnes physique (pas efficace contre des bots évolués).

Les fichiers uploader sont enregistré sans extension, puis le type de fichier est détecter selon leur contenue. Ainsi les images ne sont servies que si ce sont vraiment des images (mais cela ne protége pas contre les failles liées au chargement de l'image)

Beaucoup de page et de route de l'API renvoie un code 404, si leurs conditions ne sont pas remplies afin de les "cachées" au yeux des bots. Mais elles restent détectable puisque certaines sont obligées de lire des cookies ce qui rend leur temps de réponse plus long que les pages qui n'existent vraiment pas.

Pour éviter que les pages d'administration soit trouvées elles sont "cachées" derriére un dossier avec un nom aléatoire.

# Dépendance
Next.js; React; busboy (formulaire); iron-session (session in cookie); mysql; nodemailer (envoie de mail);
