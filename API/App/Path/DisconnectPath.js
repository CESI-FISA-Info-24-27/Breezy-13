import express from 'express';
import Jwt from 'jsonwebtoken';
import UsersServices from '../Services/UsersServices.js';

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

    /*
        // Récupère le token et retire le préfixe "Bearer"
        // Fonction permettant de gérer en plus la mise en BDD comme token révoqué
        const token = req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
        token = token.slice(7); // Enlève "Bearer "
        }
        else {
            throw new Error('Token manquant');
        }

        const refreshToken = req.cookies?.refreshToken;

        // Vérifie le token
        Jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token invalide' });
            }
    */

    try 
    {
        res
            .clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true, path: '/' })
            .clearCookie('token', {secure: true, sameSite: 'lax', path: '/'})

        console.log('Déconnexion en cours...');

        return res
            .status(200)
            .json({ message: 'Déconnecté' });
            
    } catch (error) {
        return res.status(500).json({ error: 'Erreur lors de la révocation du token' });
    }
    });

export default disconnectPath;