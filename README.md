<div align="center">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi6jTh-1egIrH6NTX0RgA9ayAWr_Dsq1fE0w&s" alt="Logo CESI" width="150"/>
    <h1>🌪️ Breezy - Réseau Social Moderne</h1>
    <p><em>Un réseau social léger et performant inspiré de Twitter/X</em></p>
</div>

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com) 
[![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)

---

## 📋 À propos du projet

**Breezy** est une plateforme de réseau social moderne développée dans le cadre d'un projet CESI. Inspirée de Twitter/X, elle offre une expérience utilisateur fluide et engageante avec un focus sur la performance et la simplicité.

### ✨ Fonctionnalités principales

- **🔐 Authentification sécurisée** : Inscription avec vérification par email obligatoire, connexion JWT avec refresh tokens
- **📝 Publication de contenu** : Posts avec texte, images, vidéos et intégration GIFs Giphy
- **💬 Interactions sociales** : Système de likes, commentaires hiérarchiques et partages
- **👥 Réseau social** : Suivi d'utilisateurs, feed personnalisé, découverte de profils
- **💌 Messagerie privée** : Messages texte avec support d'images et médias
- **👤 Profils personnalisables** : Upload d'avatar sécurisé, bio, gestion de compte
- **🛡️ Sécurité avancée** : Système de rôles granulaire, validation des données, middleware d'autorisation
- **📱 Interface responsive** : Design mobile-first avec Tailwind CSS et animations fluides
- **🔄 Upload de fichiers** : Serveur dédié pour la gestion sécurisée des médias
- **📊 Pages d'information** : About, Privacy Policy, Contact accessibles

---

## 🏗️ Architecture Technique

### Structure Microservices

Le projet Breezy adopte une architecture microservices modulaire avec quatre services principaux :

#### 🌐 WebApp (Frontend - Next.js)
**Port : 3002** | **Framework : Next.js 15**
- **Technologies** : React 19, Next.js App Router, Tailwind CSS, Flowbite React
- **État** : Context API pour l'authentification et gestion d'état globale
- **HTTP Client** : Axios avec intercepteurs automatiques pour refresh tokens
- **UI/UX** : Interface responsive mobile-first, animations CSS, dark/light theme
- **Intégrations** : API Giphy, React Force Graph 2D, Recharts pour analytics

#### 🚀 API (Backend - Node.js)
**Port : 3001** | **Framework : Express.js**
- **Architecture** : Pattern MVC avec DAO/Factory pour l'abstraction des données
- **Base de données** : MongoDB avec Mongoose ODM
- **Authentification** : JWT avec refresh tokens, révocation de tokens
- **Sécurité** : bcrypt, validation des données, middleware d'autorisation granulaire
- **Services** : Email (Nodemailer), vérification de comptes, gestion de rôles
- **Tests** : Jest avec couverture complète (Controllers, Services, Middlewares)

#### 📁 FileServer (Stockage - Express.js)
**Port : 5000** | **Service dédié aux médias**
- **Upload** : Multer avec validation stricte des types MIME et tailles
- **Support** : Images (JPEG, PNG, GIF, WebP), vidéos (MP4, MOV, AVI, WebM)
- **Sécurité** : Authentification par tokens JWT, validation des permissions
- **Fonctionnalités** : 
  - Upload d'avatar avec token temporaire (avant vérification email)
  - Gestion des URLs externes (Giphy, médias tiers)
  - Limitation de taille et validation de format
  - Stockage sécurisé avec nommage unique

#### 🗄️ Database (MongoDB)
**Port : 27018** | **Base de données NoSQL**
- **Collections** : users, posts, comments, follows, messages, roles
- **Scripts** : Initialisation automatique, migrations, données de test
- **Indexation** : Index optimisés pour les requêtes fréquentes
- **Dumps** : Scripts de population avec données cohérentes (utilisateurs, posts, interactions)

---

## 🚀 Installation et Configuration

### Prérequis
- **Node.js** v18+ (recommandé v20 LTS)
- **MongoDB** v6.0+ (local ou MongoDB Atlas)
- **Docker** (optionnel, pour déploiement containerisé)
- **Git** pour le clonage du repository

### 1. 📥 Cloner le repository

```bash
git clone https://github.com/CESI-FISA-Info-24-27/Breezy-13.git
cd Breezy-13
```

### 2. ⚙️ Configuration des variables d'environnement

#### API (.env dans /API)
```env
# Base de données MongoDB
MONGO_URI=mongodb://localhost:27017/breezy_bdd
MONGODB_URI=mongodb://localhost:27017/breezy_bdd

# JWT et sécurité
JWT_SECRET=votre_secret_jwt_super_secure_128_caracteres_minimum
JWT_SECRET_REFRESH=votre_secret_refresh_jwt_different_du_precedent
JWT_EXPIRES_IN=2h
BCRYPT_SALT=12

# Configuration serveur
PORT=3000
WEBAPP_ORIGIN=http://localhost:3002

# Email (pour vérification des comptes)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre.email@gmail.com
SMTP_PASS=votre_mot_de_passe_application_gmail
EMAIL_FROM=noreply@breezy.com
```

#### WebApp (.env.local dans /webapp)
```env
# URLs des services
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_REFRESH_URL=http://localhost:3001/refresh-token
NEXT_PUBLIC_LOGIN_URL=/login
NEXT_PUBLIC_FILE_SERVER_URL=http://localhost:5000

# Configuration Next.js
NODE_ENV=development
NEXT_PUBLIC_GIPHY_API_KEY=votre_cle_api_giphy_optionnelle
```

#### FileServer (.env dans /FileServer)
```env
# Configuration serveur de fichiers
PORT=5000
JWT_SECRET=meme_secret_que_api
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_MIME_TYPES=image/jpeg,image/png,image/gif,image/webp,video/mp4,video/mov,video/avi,video/webm
```

### 3. 📦 Installation des dépendances

```bash
# Installation pour tous les services
npm run install-all

# Ou installation manuelle pour chaque service :

# API Backend
cd API && npm install

# WebApp Frontend  
cd ../webapp && npm install

# FileServer
cd ../FileServer && npm install

# Database (scripts)
cd ../Database && npm install
```

### 4. 🗄️ Initialisation de la base de données

```bash
# Démarrer MongoDB (si local)
mongod --dbpath /chemin/vers/data/db

# Injecter les données de test (optionnel mais recommandé)
node dumps/local.complete_data_dumps.js
```

### 5. 🚀 Lancement des services

#### Développement (4 terminaux séparés)

```bash
# Terminal 1 - MongoDB (si local)
mongod

# Terminal 2 - API Backend  
cd API && npm run dev

# Terminal 3 - FileServer
cd FileServer && npm run dev

# Terminal 4 - WebApp Frontend
cd webapp && npm run dev
```

#### Production avec Docker Compose

```bash
# Construction et lancement de tous les services
docker compose up --build

# En arrière-plan
docker compose up -d

# Arrêt des services
docker compose down
```

#### Scripts npm disponibles

```bash
# API
npm run dev      # Développement avec nodemon
npm start        # Production
npm test         # Tests Jest
npm run build    # Build avec Babel

# WebApp  
npm run dev      # Développement avec Turbopack
npm run build    # Build de production Next.js
npm start        # Serveur de production
npm test         # Tests Jest
npm run lint     # ESLint

# FileServer
npm run dev      # Développement avec nodemon  
npm start        # Production
npm test         # Tests
```

### 6. 🌐 Accès à l'application

- **Application Web** : [http://localhost:3001](http://localhost:3001)
- **API Backend** : [http://localhost:3000](http://localhost:3000)
- **FileServer** : [http://localhost:5000](http://localhost:5000)
- **MongoDB** : mongodb://localhost:27018 (si Docker ou MongoDb)

### 7. 👨‍💼 Comptes par défaut

Les données de test incluent un compte administrateur :

- **Email** : `admin@breezy.com`
- **Mot de passe** : `password`
- **Rôle** : Administrateur (permissions complètes)

**Utilisateurs de test** :
- `alice.martin@example.com` / `password123`
- `bob.dupont@example.com` / `password123`
- `charlie.bernard@example.com` / `password123`

---

## 📡 API Documentation

### Endpoints principaux

#### 🔐 Authentification
```http
POST /auth                    # Connexion
POST /refresh-token           # Renouvellement token
POST /disconnect             # Déconnexion
POST /verify                 # Vérification email
POST /verify/resend          # Renvoyer email vérification
```

#### 👥 Utilisateurs
```http
GET    /users                # Liste des utilisateurs
POST   /users                # Création d'utilisateur
PATCH  /users/:id            # Mise à jour
DELETE /users/:id            # Suppression
POST   /users/update-avatar  # Update avatar après inscription
```

#### 📝 Posts
```http
GET    /posts                # Liste des posts (avec filtres)
POST   /posts                # Création de post
PATCH  /posts/:id            # Mise à jour
DELETE /posts/:id            # Suppression
GET    /posts/:id            # Commentaires d'un post
```

#### 💬 Commentaires
```http
GET    /comments             # Liste des commentaires
POST   /comments             # Création de commentaire
PATCH  /comments/:id         # Mise à jour
DELETE /comments/:id         # Suppression
```

#### 👥 Abonnements (Follows)
```http
GET    /follows              # Liste des abonnements
POST   /follows              # Créer un abonnement
DELETE /follows/:id          # Se désabonner
```

#### 💌 Messages
```http
GET    /messages             # Liste des messages (avec filtres)
POST   /messages             # Envoyer un message
PATCH  /messages/:id         # Modifier un message
DELETE /messages/:id         # Supprimer un message
```

#### 🛡️ Rôles (Admin)
```http
GET    /roles                # Liste des rôles
POST   /roles                # Créer un rôle
PATCH  /roles/:id            # Modifier un rôle
DELETE /roles/:id            # Supprimer un rôle
```

#### 📁 FileServer
```http
GET    /files/:filename      # Récupérer un fichier
POST   /upload               # Upload de fichier (authentifié)
POST   /upload-avatar-registration  # Upload avatar avec token temporaire
```

### Authentification

Toutes les routes protégées nécessitent un header `Authorization: Bearer <token>`.
Les tokens JWT expirent après 2h et peuvent être renouvelés via `/refresh-token`.

---

## 🧪 Tests

Le projet inclut une suite de tests complète avec Jest :

```bash
# Tests API (Backend)
cd API && npm test

# Tests WebApp (Frontend)  
cd webapp && npm test

# Tests FileServer
cd FileServer && npm test

# Tests avec couverture
npm test -- --coverage
```

### Couverture de tests

- **Controllers** : Tests unitaires pour tous les endpoints
- **Services** : Tests des logiques métier et intégrations
- **Middlewares** : Tests des validations et autorisations
- **Frontend Services** : Tests des services HTTP avec retry automatique

---

## 🐳 Déploiement Docker

Le projet inclut une configuration Docker Compose complète :

```yaml
services:
  # MongoDB avec initialisation automatique
  mongodb:
    ports: "27018:27017"
    
  # API Backend
  api:
    ports: "3001:3000"
    depends_on: [mongodb]
    
  # FileServer  
  fileserver:
    ports: "5000:5000"
    
  # WebApp Frontend
  webapp:
    ports: "3002:3000"
    depends_on: [api, fileserver]
```

### Commandes Docker

```bash
# Build et démarrage
docker-compose up --build

# Démarrage en arrière-plan
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêt et nettoyage
docker-compose down -v
```

---

## 🔧 Structure du projet

```
Breezy-13/
├── 📁 API/                    # Backend Express.js
│   ├── App/
│   │   ├── Controller/        # Contrôleurs MVC
│   │   ├── DAO/              # Data Access Objects
│   │   ├── Factory/          # Factory Pattern
│   │   ├── Middlewares/      # Auth, validation, permissions
│   │   ├── Model/            # Modèles de données
│   │   ├── Path/             # Définition des routes
│   │   └── Services/         # Logiques métier
│   ├── Tests/                # Tests Jest
│   ├── package.json
│   └── index.js              # Point d'entrée
│
├── 📁 webapp/                 # Frontend Next.js
│   ├── src/
│   │   ├── app/              # App Router Next.js
│   │   │   ├── (pages)/      # Pages principales
│   │   │   ├── comp/         # Composants réutilisables
│   │   │   ├── about/        # Page À propos
│   │   │   ├── contact/      # Page Contact
│   │   │   └── privacy-policy/ # Politique de confidentialité
│   │   ├── services/         # Services HTTP
│   │   ├── tests/            # Tests Jest
│   │   └── context/          # React Context
│   ├── public/               # Assets statiques
│   └── package.json
│
├── 📁 FileServer/             # Serveur de fichiers
│   ├── uploads/              # Stockage des médias
│   ├── server.js             # Logique du serveur
│   ├── start.js              # Point d'entrée
│   └── package.json
│
├── 📁 Database/               # Scripts MongoDB
│   ├── dumps/                # Données de test
│   │   ├── local.complete_data_dumps.js  # Dump complet
│   │   ├── low_data_dump.js  # Données minimales
│   │   └── complete_data_dump.js
│   ├── init_bdd.js           # Initialisation BDD
│   └── package.json
│
├── 📁 Livrables/             # Documentation du projet
├── docker-compose.yml        # Configuration Docker
└── README.md                 # Cette documentation
```

---

## 🛠️ Technologies utilisées

### Backend
- **Node.js** v18+ avec **Express.js** 5.x
- **MongoDB** 6.x avec **Mongoose** ODM
- **JWT** pour l'authentification avec refresh tokens
- **bcrypt** pour le hashage des mots de passe
- **Nodemailer** pour l'envoi d'emails
- **Multer** pour l'upload de fichiers
- **Jest** pour les tests unitaires et d'intégration
- **JSDoc** pour la documentation du code

### Frontend  
- **Next.js** 15 avec **App Router**
- **React** 19 avec hooks et Context API
- **Tailwind CSS** 3.x pour le styling
- **Flowbite React** pour les composants UI
- **Axios** pour les requêtes HTTP
- **js-cookie** pour la gestion des cookies
- **jwt-decode** pour le décodage des tokens
- **@giphy/react-components** pour l'intégration Giphy

### DevOps & Outils
- **Docker** et **Docker Compose** pour la containerisation
- **ESLint** et **Prettier** pour la qualité du code
- **Jest** pour les tests
- **Nodemon** pour le développement
- **Git** pour le versioning

---

## 🚀 Fonctionnalités avancées

### Workflow d'inscription sécurisé
1. **Création de compte** : L'utilisateur s'inscrit avec email/mot de passe
2. **Utilisateur en base** : Création immédiate avec `isVerified: false`
3. **Token temporaire** : Génération d'un token pour upload d'avatar
4. **Upload d'avatar** : Possible avant vérification avec token temporaire
5. **Email de vérification** : Envoi automatique avec lien de confirmation
6. **Validation** : Clic sur le lien active le compte
7. **Connexion autorisée** : Uniquement après validation email

### Gestion des médias
- **Upload sécurisé** : Validation MIME type, taille, nom de fichier unique
- **URLs externes** : Gestion des GIFs Giphy sans proxification
- **Compression** : Optimisation automatique des images
- **Avatar par défaut** : Image par défaut en cas d'absence

### Système de rôles granulaire
- **Rôles configurables** : Admin, Utilisateur, Invité
- **Permissions détaillées** : Par endpoint et méthode HTTP
- **Middleware de contrôle** : Vérification automatique des autorisations

### Performance et sécurité
- **Refresh tokens** : Renouvellement automatique côté client
- **Révocation de tokens** : Blacklist pour tokens compromis
- **Rate limiting** : Protection contre le spam (à implémenter)
- **Validation de données** : Middleware de validation strict
- **CORS configuré** : Sécurisation des requêtes cross-origin

---

## 🤝 Contribution

### Standards de développement
1. **Tests** : Couvrir tout nouveau code avec des tests
2. **ESLint** : Respecter les règles de style configurées
3. **JSDoc** : Documenter toutes les fonctions publiques
4. **Git** : Messages de commit explicites et atomiques
5. **Pull Requests** : Review obligatoire avant merge

### Structure des commits
```
type(scope): description

feat(auth): ajout vérification email
fix(upload): correction validation MIME types
docs(readme): mise à jour installation
test(users): ajout tests création utilisateur
```

---

## 📞 Support et contact

### Équipe de développement
- **Sacha COLBERT-LISBONA** - [@Sunit34140](https://github.com/Sunit34140)
- **Trystan JULIEN** - [@Trystancesi](https://github.com/trystancesi)  
- **Dylan BEROUD** - [@Dylan](https://github.com/Beroud-Dylan)
- **Loïc SERRE** - [@LoicSERRE](https://github.com/LoicSERRE)

### Ressources
- **Repository** : [GitHub - Breezy-13](https://github.com/CESI-FISA-Info-24-27/Breezy-13)
- **Issues** : [GitHub Issues](https://github.com/CESI-FISA-Info-24-27/Breezy-13/issues)
- **Postman Collections** : Disponibles dans `/API/` et `/FileServer/`

---

## 📜 Licence

Ce projet est développé dans le cadre de la formation CESI et est destiné à des fins éducatives.
