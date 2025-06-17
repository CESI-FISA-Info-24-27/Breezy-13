import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Jwt from 'jsonwebtoken';

import userPath from './App/Path/UsersPath.js';
import postPath from './App/Path/PostPath.js';
import commentPath from './App/Path/CommentPath.js';
import followPath from './App/Path/FollowPath.js';
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

// Auth Path (login, logout, refresh)
app.use('/auth', authPath);
app.use('/refresh-token', refreshTokenPath);

// Middleware de vérification du token
//TODO: Mettre ce middleware dans un fichier séparé pour la réutilisation
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
      return res.status(401).json({ error: 'No token provided' });
  }

  // Vérifie si le token est révoqué
  if (await userService.isTokenRevoked(token)) {
      return res.status(401).json({ error: 'Token revoked' });
  }

  Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).json({ error: 'Invalid token' });
      }

      req.user = decoded;
      next();
  });
});

// Path principales
app.use('/users', userPath);
app.use('/posts', postPath);
app.use('/comments', commentPath);
app.use('/follows', followPath);
app.use('/roles', rolePath);
app.use('/disconnect', disconnectPath);

app.listen(port, () => {
  console.log(`🚀 Server running at ${process.env.WEBAPP_ORIGIN}:${port}`);
});