import express from 'express';
import Jwt from 'jsonwebtoken';
import UsersServices from '../Services/UsersServices.js';

const refreshTokenPath = express.Router();

/**
 * Rafraîchir le token
 * @param {object} req - La requête
 */
refreshTokenPath.post('/', async (req, res) => {
    const refreshToken = req.headers['x-refresh-token'];

    if (!refreshToken) {
        return res.status(401).json({ error: 'Token de rafraîchissement manquant' });
    }

    Jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token de rafraîchissement invalide' });
        }

        try {
            // Vérifie si l'utilisateur existe
            const user = await UsersServices.getUsers({ id: decoded.id });
            if (user.length === 0) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            // Génère un nouveau token
            const newToken = Jwt.sign(
                { id: user[0]._id, username: user[0].username },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            return res.status(200).json({ token: newToken });
        } catch (error) {
            return res.status(500).json({ error: 'Erreur lors du rafraîchissement du token' });
        }
    });
});

export default refreshTokenPath;