import express from 'express';
import Jwt from 'jsonwebtoken';
import UsersServices from '../Services/UsersServices.js';

/**
 * Représente un chemin pour la déconnexion
 * @class DisconnectPath
 */
const disconnectPath = express.Router();

/**
 * Déconnexion
 * @param {object} req - La requête
 */
disconnectPath.post('/', async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }

    Jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalide' });
        }

        try {
            await UsersServices.addRevokedToken(token); // Ajoute le token à la liste des tokens révoqués
            return res.status(200).json({ message: 'Déconnecté avec succès' });
        } catch (error) {
            return res.status(500).json({ error: 'Erreur lors de la révocation du token' });
        }
    });
});

export default disconnectPath;