import express from 'express';
import PostController from '../Controller/PostController.js';

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
postRoutes.get('/', PostController.getAllPosts);

/**
 * Créer un nouveau post
 */
postRoutes.post('/', PostController.createPost);

/**
 * Mettre à jour un post
 */
postRoutes.patch('/:id', PostController.updatePost);

/**
 * Supprimer un post
 */
postRoutes.delete('/:id', PostController.deletePost);

export default postRoutes;
