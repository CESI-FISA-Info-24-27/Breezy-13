import PostsServices from '../Services/PostsServices.js';

/**
 * Contrôleur pour gérer les opérations liées aux publications (posts).
 * Fournit des méthodes pour récupérer, créer, mettre à jour et supprimer des publications.
 * @class PostController
 */
class PostController {

    /**
     * Récupérer les publications.
     * Cette méthode permet de récupérer une liste de publications en fonction des critères passés en requête.
     * @param {object} req - L'objet de requête HTTP, contenant les paramètres de recherche dans `req.query`.
     * @param {object} res - L'objet de réponse HTTP.
     * @returns {void} - Retourne une réponse JSON contenant les publications ou une erreur.
     */
    async getPosts(req, res) {
        try {
            const posts = await PostsServices.getPosts(req.query);
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Créer une nouvelle publication.
     * Cette méthode permet de créer une publication à partir des données fournies dans le corps de la requête.
     * @param {object} req - L'objet de requête HTTP, contenant les données de la publication dans `req.body`.
     * @param {object} res - L'objet de réponse HTTP.
     * @returns {void} - Retourne une réponse JSON contenant la publication créée ou une erreur.
     */
    async createPost(req, res) {
        try {
            if (!req.body.content || typeof req.body.content !== 'string') {
                return res.status(400).json({ error: 'Le contenu doit être une chaîne de caractères' });
            }

            const newPost = await PostsServices.createPost(req.body);
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Mettre à jour une publication existante.
     * Cette méthode permet de mettre à jour une publication en fonction de son ID et des données fournies.
     * @param {object} req - L'objet de requête HTTP, contenant l'ID de la publication dans `req.params.id` et les nouvelles données dans `req.body`.
     * @param {object} res - L'objet de réponse HTTP.
     * @returns {void} - Retourne une réponse JSON contenant la publication mise à jour ou une erreur.
     */
    async updatePost(req, res) {
        try {
            const post = await PostsServices.getPosts({ id: req.params.id });
            if (post.length === 0) {
                return res.status(404).json({ error: 'Post non trouvé' });
            }

            const updated = await PostsServices.updatePost(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Supprimer une publication.
     * Cette méthode permet de supprimer une publication en fonction de son ID.
     * @param {object} req - L'objet de requête HTTP, contenant l'ID de la publication dans `req.params.id`.
     * @param {object} res - L'objet de réponse HTTP.
     * @returns {void} - Retourne une réponse JSON confirmant la suppression ou une erreur.
     */
    async deletePost(req, res) {
        try {
            const post = await PostsServices.getPosts({ id: req.params.id });
            if (post.length === 0) {
                return res.status(404).json({ error: 'Post non trouvé' });
            }

            await PostsServices.deletePost(req.params.id);
            res.json({ message: 'Post supprimé' });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new PostController();