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
    if (!req.body.email || !req.body.password) {
        return res.status(400).send('Email ou mot de passe manquant');
    }

    let user = [];
    try {
        // Récupère l'utilisateur depuis la base de données
        user = await UsersServices.getUsers({ email: req.body.email });

        // Si l'utilisateur n'existe pas
        if (user.length === 0) {
            return res.status(401).send('Utilisateur non trouvé');
        }

        // Vérifie si le mot de passe est correct
        if (!bcrypt.compareSync(req.body.password, user[0].password)) {
            return res.status(401).send('Mot de passe incorrect');
        }

        // Génère les permissions de l'utilisateur
        const permissions = await UsersServices.getPermissions(user[0]._id);

        // Génère un token d'accès et un token de rafraîchissement
        const accessToken = Jwt.sign(
            { id: user[0]._id, username: user[0].username, permissions },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        const refreshToken = Jwt.sign(
            { id: user[0]._id, username: user[0].username, permissions },
            process.env.JWT_SECRET_REFRESH,
            //{ expiresIn: '14d' }
            { expiresIn: '14d' }
        );

        if(req.body.rememberMe == true) {
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                //secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                secure: true,
                path: '/',
                maxAge: 14 * 24 * 60 * 60 * 1000 // 14 jours
            });
        }

        // Retourne les tokens
        return res.status(200).json({ token : accessToken , id: user[0]._id});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default loginPath;