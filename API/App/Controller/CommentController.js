import CommentsServices from '../Services/CommentsServices.js';

/**
 * Contrôleur pour gérer les opérations liées aux commentaires.
 * Fournit des méthodes pour récupérer, créer, mettre à jour et supprimer des commentaires.
 * @class CommentController
 */
class CommentController {

    /**
     * Récupérer les commentaires.
     * Cette méthode permet de récupérer une liste de commentaires en fonction des critères passés en requête.
     * @param {object} req - L'objet de requête HTTP, contenant les paramètres de recherche dans `req.query`.
     * @param {object} res - L'objet de réponse HTTP.
     * @returns {void} - Retourne une réponse JSON contenant les commentaires ou une erreur.
     */
    async getComments(req, res) {
        try {
            const comments = await CommentsServices.getComments(req.query);
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Créer un nouveau commentaire.
     * Cette méthode permet de créer un commentaire à partir des données fournies dans le corps de la requête.
     * @param {object} req - L'objet de requête HTTP, contenant les données du commentaire dans `req.body`.
     * @param {object} res - L'objet de réponse HTTP.
     * @returns {void} - Retourne une réponse JSON contenant le commentaire créé ou une erreur.
     */
    async createComment(req, res) {
        try {
            const { author, post, content, parentCommentId } = req.body;

            if (!author || !post || !content) {
                return res.status(400).json({ error: 'Les champs author, post et content sont requis' });
            }

            const newComment = await CommentsServices.createComment({ author, post, content, parentCommentId });
            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Supprimer un commentaire.
     * Cette méthode permet de supprimer un commentaire en fonction de son ID.
     * @param {object} req - L'objet de requête HTTP, contenant l'ID du commentaire dans `req.params.id`.
     * @param {object} res - L'objet de réponse HTTP.
     * @returns {void} - Retourne une réponse JSON confirmant la suppression ou une erreur.
     */
    async deleteComment(req, res) {
        try {
            const comment = await CommentsServices.getComments({ id: req.params.id });
            if (comment.length === 0) {
                return res.status(404).json({ error: 'Commentaire non trouvé' });
            }

            await CommentsServices.deleteComment(req.params.id);
            res.json({ message: 'Commentaire supprimé' });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new CommentController();