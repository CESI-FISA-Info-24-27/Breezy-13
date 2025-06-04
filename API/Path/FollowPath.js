import express from 'express';
import FollowController from '../Controller/FollowController.js';
import fieldsRequired from '../Middlewares/RequiredFields.js';

/**
 * Représente un chemin pour les abonnements (follows)
 * @class FollowRoutes
 */
const followRoutes = express.Router();

/**
 * Obtenir tous les follows
 */
followRoutes.get('/', FollowController.getFollows);

/**
 * Créer un nouvel abonnement
 */
followRoutes.post('/', fieldsRequired(["follower", "following"]), FollowController.createFollow);

/**
 * Supprimer un abonnement
 */
followRoutes.delete('/:id', FollowController.deleteFollow);

export default followRoutes;
