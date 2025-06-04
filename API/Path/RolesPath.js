import express from 'express';
import RoleController from '../Controller/RoleController.js';
import fieldsRequired from '../Middlewares/RequiredFields.js';

/**
 * Représente un chemin pour les rôles
 * @class RolePath
 */
const rolePath = express.Router();

/**
 * Obtenir les rôles
 * @param {object} req - La requête
 */
rolePath.get('/', RoleController.getRoles);

/**
 * Créer des rôles
 * @param {object} req - La requête
 */
rolePath.post('/', fieldsRequired(["name"]), RoleController.createRoles);

/**
 * Mettre à jour des rôles
 * @param {object} req - La requête
 */
rolePath.patch('/:id', fieldsRequired(["name"]), RoleController.updateRoles);

/**
 * Supprimer des rôles
 * @param {object} req - La requête
 */
rolePath.delete('/:id', RoleController.deleteRoles);

export default rolePath;