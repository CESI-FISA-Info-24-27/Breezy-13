import express from 'express';
import PostController from '../Controller/PostController.js';
import fieldsRequired from '../Middlewares/RequiredFields.js';

/**
 * Représente un chemin pour les posts
 * @class PostRoutes
 */
/**
 * @constant {Router} postRoutes
 * @description Routeur Express utilisé pour gérer les routes liées aux opérations POST.
 */
const postRoutes = express.Router();

/**
 * Obtenir tous les posts
 */
postRoutes.get('/', PostController.getPosts);

/**
 * Obtenir tous les posts
 */
postRoutes.get('/:id', PostController.getPostComments);

/**
 * Créer un nouveau post
 */
postRoutes.post('/', fieldsRequired(["author", "content", "image", "likes" ]), PostController.createPost);

/**
 * Mettre à jour un post
 */
postRoutes.patch('/:id', fieldsRequired(["content", "image", "likes"]), PostController.updatePost);

/**
 * Supprimer un post
 */
postRoutes.delete('/:id', PostController.deletePost);

export default postRoutes;
