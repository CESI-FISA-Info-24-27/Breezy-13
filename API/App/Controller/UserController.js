import UsersServices from '../Services/UsersServices.js';
import RolesServices from '../Services/RolesServices.js';
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
        try {
            // Vérifie que les paramètres sont valides
            if (req.query.id && isNaN(req.query.id)) {
                return res.status(400).json({ error: 'L\'id doit être un nombre' });
            }

            if (req.query.name && typeof req.query.name !== 'string') {
                return res.status(400).json({ error: 'Le nom doit être une chaîne de caractères' });
            }

            // Vérifie que l'id ou le nom existe
            if (req.query.id) {
                const user = await UsersServices.getUsers({ id: req.query.id });
                if (user.length === 0) {
                    res.status(404).json({ error: 'Id non trouvé' });
                }
            }
            else if (req.query.name) {
                const user = await UsersServices.getUsers({ name: req.query.name });
                if (user.length === 0) {
                    res.status(404).json({ error: 'Nom non trouvé' });
                }
            }

            const users = await UsersServices.getUsers(req.query);
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
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

            // Hacher le mot de passe
            if (req.body.password) {
                const saltRounds = parseInt(process.env.BCRYPT_SALT); // Convertir BCRYPT_SALT en nombre
                const salt = bcrypt.genSaltSync(saltRounds);
                newUser.password = bcrypt.hashSync(newUser.password, salt);
            }

            // Ajouter la date de création et de mise à jour
            newUser.createdAt = new Date();
            newUser.updatedAt = new Date();

            // Crée l'utilisateur
            const createdUser = await UsersServices.createUsers(newUser);

            // Récupère les informations de l'utilisateur créé
            const userInfo = {
                id: createdUser.insertedId,
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar,
                bio: newUser.bio,
                role_id: newUser.role_id,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            };

            res.status(201).json({ message: 'Utilisateur créé avec succès', user: userInfo });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new UserController();
