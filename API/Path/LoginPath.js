import express from 'express';
import Jwt from 'jsonwebtoken';
import UsersServices from '../Services/UsersServices.js';
import bcrypt from 'bcrypt';
import env from 'dotenv';
env.config();

/**
 * Représente un chemin pour la connexion
 * @class LoginPath
 */
const loginPath = express.Router();

/**
 * Connexion
 * @param {object} req - La requête
 */
loginPath.post('/', async (req, res) => {
    // Vérifie que le nom d'utilisateur et le mot de passe sont présents
    if (!req.body.username || !req.body.password) {
        return res.status(400).send('Nom d’utilisateur ou mot de passe manquant');
    }

    let user = [];
    try {
        // Récupère l'utilisateur depuis la base de données
        user = UsersServices.getUsers({ username: req.body.username });
        // Si l'utilisateur n'existe pas
        if (user.length === 0) {
            return res.status(401).send('Utilisateur non trouvé');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    // Vérifie si l'utilisateur existe
    if (UsersServices.getUsers({ username: req.body.username }).length === 0) {
        return res.status(401).send('Utilisateur non trouvé');
    }

    // Vérifie si le mot de passe est correct
    if (!bcrypt.compareSync(req.body.password, user[0].password)) {
        return res.status(401).send('Mot de passe incorrect');
    }
    else {
        // Attribue des permissions dans le token
        const permissions = await UsersServices.getPermissions(user[0].user_id);

        // Retourne un token et un token de rafraîchissement
        const token = Jwt.sign({ id: user[0].user_id, username: user[0].username, permissions }, process.env.JWT_SECRET, { expiresIn: '2h' });
        const refreshToken = Jwt.sign({ id: user[0].user_id, username: user[0].username, permissions }, process.env.JWT_SECRET_REFRESH, { expiresIn: '14d' });
        return res.status(200).json({ token: token, refreshToken: refreshToken });
    }
});

export default loginPath;