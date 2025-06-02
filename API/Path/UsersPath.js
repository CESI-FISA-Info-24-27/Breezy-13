import express from 'express';
import UserController from '../Controller/UserController.js';

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
userPath.post('/', UserController.createUsers);

/**
 * Mettre à jour les utilisateurs
 * @param {object} req - La requête
 */
userPath.patch('/:id', UserController.updateUsers);

/**
 * Supprimer des utilisateurs
 * @param {object} req - La requête
 */
userPath.delete('/:id', UserController.deleteUsers);

export default userPath;