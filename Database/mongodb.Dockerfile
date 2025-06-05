# L'image consiste en une image de mongodb (la version 7)
FROM mongo:7

WORKDIR /Database

# On copie simplement le script d'initialisation vers l'entrypoint de mongodb
COPY init_bdd.js /docker-entrypoint-initdb.d/init_bdd.js
COPY ./dumps/data_dump.js /Database/data_dump.js