import UsersServices from '../Services/UsersServices.js';
import RolesServices from '../Services/RolesServices.js';
import VerificationServices from '../Services/VerificationServices.js';
import bcrypt from 'bcrypt';
import env from 'dotenv';
env.config();

/**
 * Représente un contrôleur pour gérer les requêtes des utilisateurs
 * @class UserController
 */
class UserController {
    /**
     * Récupérer les utilisateurs
     * @param {object} req - La requête
     * @param {object} res - La réponse
     * @returns {Array} - Un tableau d'utilisateurs
     * @throws {Error} 404 - Id non trouvé
     * @throws {Error} 404 - Nom non trouvé
     * @throws {Error} 500 - Erreur inattendue
     * @throws {Error} 400 - L'id doit être un nombre
     * @throws {Error} 400 - Le nom doit être une chaîne de caractères
     * @throws {Error} 500 - Erreur inattendue
     * @throws {Error} 200 - Récupération des utilisateurs réussie
     */
    async getUsers(req, res) {
        try 
        {
            // Vérifie que les paramètres sont valides
            let ids = req.query['id[]'] || req.query.id;
            try 
            {
                if (typeof ids === 'string' && ids.trim().startsWith('[')) 
                {
                    ids = JSON.parse(ids);
                    if (!Array.isArray(ids)) 
                    {
                        return res.status(400).json({ error: 'id doit être un tableau' });
                    }
                }
            } 
            catch (err) 
            {
                return res.status(400).json({ error: 'id doit être un tableau JSON valide', id: ids });
            }

            if (req.query.name && typeof req.query.name !== 'string') {
                return res.status(400).json({ error: 'Le nom doit être une chaîne de caractères' });
            }

            // Vérifie que l'id ou le nom existe
            if (ids) 
            {
                const user = await UsersServices.getUsers({ id: ids });
                if (user.length === 0)
                {
                    return res.status(404).json({ error: 'Id non trouvé' });
                }
            }
            else if (req.query.name) 
            {
                const user = await UsersServices.getUsers({ name: req.query.name });
                if (user.length === 0) {
                    return res.status(404).json({ error: 'Nom non trouvé' });
                }
            }

            // On modifie la query
            const query = { ...req.query };
            if ('id[]' in query) 
            {
                query.id = Array.isArray(query['id[]']) ? query['id[]'] : [query['id[]']];
                delete query['id[]'];
            }

            const users = await UsersServices.getUsers(query);
            return res.json(users);
        }
        catch (error) {
            return res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Mettre à jour les utilisateurs
     * @param {object} req - La requête
     * @param {object} res - La réponse
     * @throws {Error} 404 - Id non trouvé
     * @throws {Error} 500 - Erreur inattendue
     * @throws {Error} 400 - Le nom doit être une chaîne de caractères
     * @throws {Error} 200 - Utilisateur mis à jour
     */
    async updateUsers(req, res) {
        try {
            // Vérifie que l'id existe
            const user = await UsersServices.getUsers({ id: req.params.id });
            if (user.length === 0) {
                return res.status(404).json({ error: 'Id non trouvé' });
            }

            // Vérifie que le rôle existe
            if (req.body.role_id) {
                const role = await RolesServices.getRoles({ role_id: req.body.role_id });
                if (role.length === 0) {
                    return res.status(404).json({ error: 'Rôle non trouvé' });
                }
            }

            // Hacher le mot de passe si présent
            if (req.body.password) {
                const saltRounds = parseInt(process.env.BCRYPT_SALT); // Convertir BCRYPT_SALT en nombre
                const salt = bcrypt.genSaltSync(saltRounds);
                req.body.password = bcrypt.hashSync(req.body.password, salt);
            }

            // Ajouter la date de mise à jour
            req.body.updatedAt = new Date();

            // Met à jour l'utilisateur
            const updateResult = await UsersServices.updateUsers(req.params.id, req.body);

            if (updateResult.modifiedCount === 0) {
                return res.status(400).json({ error: 'Aucune modification effectuée' });
            }

            // Récupère les informations mises à jour de l'utilisateur
            const updatedUser = await UsersServices.getUsers({ id: req.params.id });

            // Exclure le mot de passe de la réponse
            const userInfo = {
                id: updatedUser[0]._id,
                username: updatedUser[0].username,
                email: updatedUser[0].email,
                avatar: updatedUser[0].avatar,
                bio: updatedUser[0].bio,
                role_id: updatedUser[0].role_id,
                createdAt: updatedUser[0].createdAt,
                updatedAt: updatedUser[0].updatedAt
            };

            res.status(200).json({
                message: 'Utilisateur mis à jour avec succès',
                user: userInfo
            });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Supprimer les utilisateurs
     * @param {object} req - La requête
     * @param {object} res - La réponse
     * @throws {Error} 404 - Id non trouvé
     * @throws {Error} 500 - Erreur inattendue
     * @throws {Error} 200 - Utilisateur supprimé
     */
    async deleteUsers(req, res) {
        try {
            // Vérifie que l'id existe
            const user = await UsersServices.getUsers({ id: req.params.id });
            if (user.length === 0) {
                return res.status(404).json({ error: 'Id non trouvé' });
            }

            await UsersServices.deleteUsers(req.params.id);
            res.json({ message: 'Utilisateur supprimé' });
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Créer des utilisateurs
     * @param {object} req - La requête
     * @param {object} res - La réponse
     * @throws {Error} 500 - Erreur inattendue
     * @throws {Error} 400 - Le nom doit être une chaîne de caractères
     * @throws {Error} 404 - Rôle non trouvé
     * @throws {Error} 200 - Utilisateur créé
     */
    async createUsers(req, res) {
        try {
            // Vérifie que le nom d'utilisateur est valide
            if (!req.body.username || typeof req.body.username !== 'string') {
                return res.status(400).json({ error: 'Le nom d\'utilisateur doit être une chaîne de caractères' });
            }

            // Vérifie que le nom d'utilisateur n'existe pas déjà
            const userbdd = await UsersServices.getUsers({ username: req.body.username });
            if (userbdd.length > 0) {
                return res.status(400).json({ error: 'Le nom d\'utilisateur existe déjà' });
            }

            // Vérifie que l'email n'existe pas déjà
            const emailExists = await UsersServices.getUsers({ email: req.body.email });
            if (emailExists.length > 0) {
                return res.status(400).json({ error: 'L\'email est déjà utilisé' });
            }

            const newUser = req.body;

            // Définir le rôle par défaut si non fourni (principalement pour les nouveaux utilisateurs)
            if (!newUser.role_id || newUser.role_id === 'undefined') {
                let role = await RolesServices.getRoles({ name: 'User' });

                if (!role || role.length === 0) {
                    return res.status(500).json({ error: "Rôle 'User' introuvable" });
                }

                newUser.role_id = role[0]._id;
            }

            // Hacher le mot de passe
            if (req.body.password) {
                const saltRounds = parseInt(process.env.BCRYPT_SALT);
                const salt = bcrypt.genSaltSync(saltRounds);
                newUser.password = bcrypt.hashSync(newUser.password, salt);
            }

            // Générer un token de vérification
            const verificationToken = VerificationServices.generateVerificationToken();
            const verificationTokenExpires = VerificationServices.generateTokenExpiration();

            // Ajouter les champs de vérification
            newUser.isVerified = false;
            newUser.verificationToken = verificationToken;
            newUser.verificationTokenExpires = verificationTokenExpires;

            // Ajouter la date de création et de mise à jour
            newUser.createdAt = new Date();
            newUser.updatedAt = new Date();

            // Crée l'utilisateur
            const createdUser = await UsersServices.createUsers(newUser);

            // Générer un token temporaire pour l'upload d'avatar
            const tempUploadToken = VerificationServices.generateTempUploadToken(createdUser.insertedId);

            // Envoyer l'email de vérification
            try {
                await VerificationServices.sendVerificationEmail(
                    newUser.email, 
                    verificationToken, 
                    newUser.username
                );
            } catch (emailError) {
                console.error('Erreur envoi email:', emailError);
                // On continue même si l'email échoue
            }

            // Récupère les informations de l'utilisateur créé
            const userInfo = {
                id: createdUser.insertedId,
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar,
                bio: newUser.bio,
                role_id: newUser.role_id,
                isVerified: newUser.isVerified,
                tempUploadToken: tempUploadToken, // Token pour upload d'avatar
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            };

            res.status(201).json({ 
                message: 'Utilisateur créé avec succès. Veuillez vérifier votre email pour activer votre compte.', 
                user: userInfo 
            });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Vérifier un utilisateur avec son token
     * @param {object} req - La requête
     * @param {object} res - La réponse
     */
    async verifyUser(req, res) {
        try {
            const { token } = req.body;

            if (!token) {
                return res.status(400).json({ error: 'Token de vérification requis' });
            }

            // Chercher l'utilisateur avec ce token
            const users = await UsersServices.getUsers({ verificationToken: token });
            
            if (users.length === 0) {
                return res.status(404).json({ error: 'Token de vérification invalide' });
            }

            const user = users[0];

            // Vérifier que le token n'a pas expiré
            if (new Date() > user.verificationTokenExpires) {
                return res.status(400).json({ error: 'Token de vérification expiré' });
            }

            // Mettre à jour l'utilisateur
            await UsersServices.updateUsers(user._id, {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpires: null,
                updatedAt: new Date()
            });

            res.status(200).json({ message: 'Compte vérifié avec succès' });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Mettre à jour l'avatar d'un utilisateur non vérifié
     * @param {object} req - La requête
     * @param {object} res - La réponse
     */
    async updateAvatarAfterRegistration(req, res) {
        try {
            const { userId, avatarPath } = req.body;

            if (!userId || !avatarPath) {
                return res.status(400).json({ error: 'userId et avatarPath requis' });
            }

            // Vérifie que l'utilisateur existe
            const user = await UsersServices.getUsers({ id: userId });
            if (user.length === 0) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            // Met à jour l'avatar
            const updateResult = await UsersServices.updateUsers(userId, {
                avatar: avatarPath,
                updatedAt: new Date()
            });

            if (updateResult.modifiedCount === 0) {
                return res.status(400).json({ error: 'Aucune modification effectuée' });
            }

            res.status(200).json({ 
                message: 'Avatar mis à jour avec succès',
                avatarPath: avatarPath
            });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new UserController();
