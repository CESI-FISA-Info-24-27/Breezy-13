import FollowsServices from '../Services/FollowsServices.js';

/**
 * Contrôleur pour gérer les opérations liées aux suivis (follows).
 * Fournit des méthodes pour récupérer, créer et supprimer des relations de suivi entre utilisateurs.
 * @class FollowController
 */
class FollowController {

    /**
     * Récupérer les suivis.
     * Cette méthode permet de récupérer une liste de relations de suivi en fonction des critères passés en requête.
     * @param {object} req - L'objet de requête HTTP, contenant les paramètres de recherche dans `req.query`.
     * @param {object} res - L'objet de réponse HTTP.
     * @returns {void} - Retourne une réponse JSON contenant les suivis ou une erreur.
     */
    async getFollows(req, res) {
        try {
            const follows = await FollowsServices.getFollows(req.query);
            res.json(follows);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Créer une relation de suivi.
     * Cette méthode permet de créer une relation de suivi entre deux utilisateurs à partir des données fournies dans le corps de la requête.
     * @param {object} req - L'objet de requête HTTP, contenant les identifiants `follower_id` et `following_id` dans `req.body`.
     * @param {object} res - L'objet de réponse HTTP.
     * @returns {void} - Retourne une réponse JSON contenant la relation de suivi créée ou une erreur.
     */
    async createFollow(req, res) {
        try {
            const newFollow = await FollowsServices.createFollow(req.body);
            res.status(201).json(newFollow);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Supprimer une relation de suivi.
     * Cette méthode permet de supprimer une relation de suivi en fonction de son ID.
     * @param {object} req - L'objet de requête HTTP, contenant l'ID de la relation de suivi dans `req.params.id`.
     * @param {object} res - L'objet de réponse HTTP.
     * @returns {void} - Retourne une réponse JSON confirmant la suppression ou une erreur.
     */
    async deleteFollow(req, res) {
        try {
            const follow = await FollowsServices.getFollows({ id: req.params.id });
            if (follow.length === 0) {
                return res.status(404).json({ error: 'Suivi non trouvé' });
            }

            await FollowsServices.deleteFollow(req.params.id);
            res.json({ message: 'Suivi supprimé' });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new FollowController();