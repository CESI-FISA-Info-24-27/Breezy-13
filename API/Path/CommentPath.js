import express from 'express';
import CommentController from '../Controller/CommentController.js';
import fieldsRequired from '../Middlewares/RequiredFields.js';

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
commentRoutes.post('/', fieldsRequired(["author", "post", "content"]), CommentController.createComment);

/**
 * Mettre à jour un commentaire
 */
commentRoutes.patch('/:id', fieldsRequired(["post", "content"]), CommentController.updateComment);

/**
 * Supprimer un commentaire
 */
commentRoutes.delete('/:id', CommentController.deleteComment);

export default commentRoutes;
