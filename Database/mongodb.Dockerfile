# L'image consiste en une image de mongodb (la version 7)
FROM mongo:7

# On copie simplement le script d'initialisation vers l'entrypoint de mongodb
COPY init_bdd_mongo_shell.js /docker-entrypoint-initdb.d/init_bdd.js