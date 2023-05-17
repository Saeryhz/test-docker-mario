# test-docker-mario

**Projet de test KaboomJS et Socket.IO**

*C'est un début de projet de fond de tiroir récupéré pour tester docker, on peut seulement mettre 2 mario sur le même niveau, **rien ne fonctionne à part la connexion**.*

## Conteneurs

* 1 conteneur `test-docker-mario-mario-server` contenant le serveur Socket.IO dans un environnement Node en écoute du client sur le port 5600
* 1 conteneur `test-docker-mario-mario-client` contenant le bundle KaboomJS géneré avec webpack
* 1 conteneur `test-docker-mario-nginx` afin de servir les fichiers statiques de `mario-client` sur le port 80

## Installation

`docker-compose up`

url `127.0.0.1:80`

## CI/CD
A chaque push / pr sur main, les images Docker sont build et envoyées sur [Docker Hub](https://hub.docker.com/r/williamiia/).

