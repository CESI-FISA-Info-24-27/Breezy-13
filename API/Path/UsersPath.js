import express from 'express';
import UserController from '../Controller/UserController.js';
import fieldsRequired from '../Middlewares/RequiredFields.js';

/**
 * Représente un chemin pour les utilisateurs
 * @class UserPath
 */
const userPath = express.Router();

/**
 * Récupérer les utilisateurs
 * @param {object} req - La requête
 */
userPath.get('/', UserController.getUsers);

/**
 * Créer des utilisateurs
 * @param {object} req - La requête
 */
userPath.post('/', fieldsRequired(["username", "email", "password", "avatar", "bio", "role_id"]), UserController.createUsers);

/**
 * Mettre à jour les utilisateurs
 * @param {object} req - La requête
 */
userPath.patch('/:id', fieldsRequired(["username", "email", "password", "avatar", "bio", "role_id"]), UserController.updateUsers);

/**
 * Supprimer des utilisateurs
 * @param {object} req - La requête
 */
userPath.delete('/:id', UserController.deleteUsers);

export default userPath;