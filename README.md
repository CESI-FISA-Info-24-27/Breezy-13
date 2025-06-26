<div style="display: flex; align-items: center;">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi6jTh-1egIrH6NTX0RgA9ayAWr_Dsq1fE0w&s" alt="Logo CESI" width="150" style="margin-right: 20px;"/>
    <h1>Projet Breezy 13</h1>
</div>

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)

## Description

Breezy est un réseau social léger et réactif, inspiré de Twitter/X, conçu pour offrir une expérience fluide même dans des environnements à faibles ressources. L’application permet aux utilisateurs de publier des messages courts, d’interagir entre eux, et de naviguer rapidement à travers une interface épurée et mobile-first.

## Installation

1. Cloner le repo :

     ```bash
     git clone https://github.com/CESI-FISA-Info-24-27/Breezy-13.git
     cd Breezy-13
     ```

2. Installer les dépendances :

     ```bash
     npm install
     ```

3. Pour lancer le projet en local :
   3.1 Lancer l'API:
   
     ```bash
     cd API
     npm run dev
     ```
     
   3.2 Lancer l'application :
   
     ```bash
     cd webapp
     npm run dev
     ```

   3.3 Lancer le serveur de fichier :
   
     ```bash
     cd FileServer
     npm run dev
     ```
     
## Architecture Technique

- Front-End :
    1. Next.js
    2. Tailwind.css
    3. Interface utilisateur responsive
    4. Axios pour effectuer les requêtes vers l'API

- Back-End : 
    1. Node.js avec Express 
    2. API RESTful pour gérer les opérations principales (authentification, publication, interactions, etc...)
    3. JWT (JSON Web Tokens) pour l'authentification sécurisée de l'utilisateur et la gestion des sessions

- Infrastructure :
    1. Docker pour la containerisation des différents services (WebApp, API, FileServer)
    2. Node.js pour le lancement en local

## Fonctionnalités principales

## Structure du projet

```bash

breezy/
├── webapp/             # Front-end 
├── API/                # Back-end
├── FileServer          # Stockage des ressources de l'application
├── docker-compose.yml
└── README.md

```

## Technologies utilisées 
- React
- Node.js
- Tailwind.css
- Express
- Docker
- REST API
- MongoDB
- JWT



## Contributors
* **Sacha COLBERT-LISBONA** _alias_ [@Sunit34140](https://github.com/Sunit34140)
* **Trystan JULIEN** _alias_ [@Trystancesi](https://github.com/trystancesi)
* **Sacha COLBERT** _alias_ [@Sunnit34140](https://github.com/Sunnit34140)
* **Loïc SERRE** _alias_ [@LoicSERRE](https://github.com/LoicSERRE)
