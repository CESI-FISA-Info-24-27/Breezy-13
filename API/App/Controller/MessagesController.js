import MessagesServices from '../Services/MessagesServices.js';

/**
 * Contrôleur pour gérer les opérations liées aux messages privés.
 */
class MessagesController {
    /**
     * Récupère les messages selon des filtres (ex : conversation entre deux utilisateurs).
     * 
     * @param {Object} req - Requête Express contenant les filtres dans req.query.
     * @param {Object} res - Réponse Express.
     * @returns {Array} Liste des messages correspondant aux filtres.
     */
    async getMessages(req, res) {
        try {
            // On ne vérifie plus le type ici, car on accepte des ObjectId sous forme de string
            const messages = await MessagesServices.getMessages(req.query);
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Crée un nouveau message (texte ou média).
     * 
     * @param {Object} req - Requête Express contenant le message dans req.body.
     * @param {Object} res - Réponse Express.
     * @returns {Object} Le message créé.
     */
    async createMessage(req, res) {
        try {
            // On autorise un message sans content si images ou vidéos présentes
            if ((!req.body.content || typeof req.body.content !== 'string' || req.body.content.trim() === '') &&
                (!Array.isArray(req.body.images) || req.body.images.length === 0) &&
                (!Array.isArray(req.body.videos) || req.body.videos.length === 0)
            ) {
                return res.status(400).json({ error: 'Le message doit contenir du texte, une image ou une vidéo.' });
            }
            if (!req.body.from || !req.body.to) {
                return res.status(400).json({ error: 'Expéditeur et destinataire requis.' });
            }
            const result = await MessagesServices.createMessage(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Met à jour un message existant (ex : marquer comme lu).
     * 
     * @param {Object} req - Requête Express contenant l'ID du message dans req.params.id et les champs à mettre à jour dans req.body.
     * @param {Object} res - Réponse Express.
     * @returns {Object} Le message mis à jour.
     */
    async updateMessage(req, res) {
        try {
            const updated = await MessagesServices.updateMessage(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Supprime un message.
     * 
     * @param {Object} req - Requête Express contenant l'ID du message dans req.params.id.
     * @param {Object} res - Réponse Express.
     * @returns {Object} Message de confirmation.
     */
    async deleteMessage(req, res) {
        try {
            await MessagesServices.deleteMessage(req.params.id);
            res.json({ message: 'Message supprimé' });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new MessagesController();