import express from 'express';
import UserController from '../Controller/UserController.js';

/**
 * Routes pour la vérification d'utilisateurs
 */
const verificationPath = express.Router();

/**
 * POST /verify - Vérifier un utilisateur avec son token
 */
verificationPath.post('/', UserController.verifyUser);

/**
 * POST /resend-verification - Renvoyer un email de vérification
 */
verificationPath.post('/resend', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email requis' });
        }

        // Import dynamique pour éviter les dépendances circulaires
        const { default: UsersServices } = await import('../Services/UsersServices.js');
        const { default: VerificationServices } = await import('../Services/VerificationServices.js');

        // Chercher l'utilisateur
        const users = await UsersServices.getUsers({ email });
        if (users.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const user = users[0];

        // Vérifier si déjà vérifié
        if (user.isVerified) {
            return res.status(400).json({ error: 'Compte déjà vérifié' });
        }

        // Générer un nouveau token
        const verificationToken = VerificationServices.generateVerificationToken();
        const verificationTokenExpires = VerificationServices.generateTokenExpiration();

        // Mettre à jour l'utilisateur
        await UsersServices.updateUsers(user._id, {
            verificationToken,
            verificationTokenExpires,
            updatedAt: new Date()
        });

        // Envoyer l'email
        await VerificationServices.sendVerificationEmail(email, verificationToken, user.username);

        res.status(200).json({ message: 'Email de vérification renvoyé' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

export default verificationPath;
