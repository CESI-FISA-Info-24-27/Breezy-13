import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import userPath from './App/Path/UsersPath.js';
import postPath from './App/Path/PostPath.js';
import commentPath from './App/Path/CommentPath.js';
import followPath from './App/Path/FollowPath.js';
import messagePath from './App/Path/MessagePath.js';
import authPath from './App/Path/LoginPath.js';
import disconnectPath from './App/Path/DisconnectPath.js';
import refreshTokenPath from './App/Path/RefreshTokenPath.js';

// Services
import userService from './App/Services/UsersServices.js';
import rolePath from './App/Path/RolesPath.js';

dotenv.config();

// Connexion à la base MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const app = express();
const port = process.env.PORT || 3000;

// Middleware global
app.use(cors({
  origin: process.env.WEBAPP_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth Path (login, logout, refresh)
app.use('/auth', authPath);
app.use('/refresh-token', refreshTokenPath);

// Middleware de vérification du token
// TODO: Mettre ce middleware dans un fichier séparé pour la réutilisation
app.use(async (req, res, next) => {
  if (req.method === "POST" && req.path === "/users") {
    // Si la requête est pour créer un utilisateur, on ne vérifie pas le token
    return next();
  }

  const rawToken = req.headers['authorization'];
  let token = null;

  //Si le token n'est pas présent, on retourne un code "unauthorized"
  if (!rawToken) {
    return res.status(401).json({ error: 'No token provided' });
  }

  //Si le token est présent, et qu'il commence par "Bearer ", on récupère seulement le token
  if (rawToken && rawToken.startsWith('Bearer ')) {
    token = rawToken.split(' ')[1];  

    Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).json({ error: 'Invalid token' });
      }

      req.user = decoded;
      next();
    });
  }

  // Vérifie si le token est révoqué
  if (await userService.isTokenRevoked(token)) {
      return res.status(401).json({ error: 'Token revoked' });
  }
});

// Path principales
app.use('/users', userPath);
app.use('/posts', postPath);
app.use('/comments', commentPath);
app.use('/follows', followPath);
app.use('/roles', rolePath);
app.use('/disconnect', disconnectPath);
app.use('/messages', messagePath);

app.listen(port, () => {
  console.log(`🚀 Server running at ${process.env.WEBAPP_ORIGIN}:${port}`);
});