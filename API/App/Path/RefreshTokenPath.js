import Jwt from 'jsonwebtoken';
import express from 'express';
import UsersServices from '../Services/UsersServices.js';

const refreshPath = express.Router();

refreshPath.post('/', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    //Vérifie la présence du refresh token
    if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token provided' });
    }

    Jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid refresh token' });
        }

        console.log('Decoded Refresh Token:', decoded);
        console.log('User ID from Refresh Token:', decoded.id);

        // récupérer l'utilisateur depuis la base de données
        const user = await UsersServices.getUsers({ id: decoded.id });

        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const permissions = await UsersServices.getPermissions(decoded.id);

        console.log('User found:', user[0]);

        // Génère un token d'accès et un token de rafraîchissement
        const accessToken = Jwt.sign(
            { id: user[0]._id, username: user[0].username, permissions },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        return res.status(200).json({ token : accessToken });
    });
});

export default refreshPath;