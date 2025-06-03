import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Jwt from 'jsonwebtoken';

// Path
import userPath from './Path/UsersPath.js';
import postPath from './Path/PostPath.js';
import commentPath from './Path/CommentPath.js';
import followPath from './Path/FollowPath.js';
import authPath from './Path/LoginPath.js';

// Services
import userService from './Services/UsersServices.js';
import hasRequiredPermissions from './Middlewares/Permissions.js';

dotenv.config();

// Connexion à la base MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

// Middleware de vérification du token et des permissions
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Vérifie si le token est révoqué
  if (await userService.isTokenRevoked(token)) {
    return res.status(401).json({ error: 'Token revoked' });
  }

  Jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Ajoute l'utilisateur décodé dans la requête
    req.user = decoded;

    // Vérifie les permissions si nécessaire
    const user = await userService.getUserByUsername(decoded.username);
    const userRoles = await userService.getRoles(user.role_id);

    if (!hasRequiredPermissions(userRoles, req.path, req.method)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  });
});

// Path principales
app.use('/users', userPath);
app.use('/posts', postPath);
app.use('/comments', commentPath);
app.use('/follows', followPath);

app.listen(port, () => {
  console.log(`🚀 Server running at ${process.env.WEBAPP_ORIGIN}:${port}`);
});
