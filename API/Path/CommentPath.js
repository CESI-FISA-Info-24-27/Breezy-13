import express from 'express';
import CommentController from '../Controller/CommentController.js';

/**
 * Représente un chemin pour les commentaires
 * @class CommentRoutes
 */
const commentRoutes = express.Router();

/**
 * Obtenir tous les commentaires
 */
commentRoutes.get('/', CommentController.getComments);

/**
 * Créer un nouveau commentaire
 */
commentRoutes.post('/', CommentController.createComment);

/**
 * Mettre à jour un commentaire
 */
commentRoutes.patch('/:id', CommentController.updateComment);

/**
 * Supprimer un commentaire
 */
commentRoutes.delete('/:id', CommentController.deleteComment);

export default commentRoutes;
