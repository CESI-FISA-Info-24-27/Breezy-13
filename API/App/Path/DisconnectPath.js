import express from 'express';
import Jwt from 'jsonwebtoken';
import UsersServices from '../Services/UsersServices.js';
import bcrypt from 'bcrypt';

/**
 * Représente un chemin pour la déconnexion
 * @class LoginPath
 */
const disconnectPath = express.Router();

/**
 * Déconnexion
 * @param {object} req - La requête
 */
disconnectPath.post('/', async (req, res) => {
    const token = req.headers['authorization'];

    // Vérifie le token
    Jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalide' });
        }

        try {
            await UsersServices.addrevokedtoken(token);
        } catch (error) {
            return res.status(500).json({ error: 'Erreur lors de la révocation du token' });
        }

        return res.status(200).json({ message: 'Déconnecté' });
    });
});

export default disconnectPath;