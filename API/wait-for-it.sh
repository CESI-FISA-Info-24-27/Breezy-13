#!/bin/bash
# Attente de la connexion à MongoDB
host="$1"
shift
port="$1"
shift

until nc -z -v -w30 "$host" "$port"
do
  echo "En attente de MongoDB à $host:$port..."
  sleep 1
done

echo "MongoDB est prêt à accepter des connexions."
exec "$@"