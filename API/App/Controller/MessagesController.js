import MessagesServices from '../Services/MessagesServices.js';

/**
 * Contrôleur pour gérer les opérations liées aux messages privés.
 * Fournit des méthodes pour récupérer, créer, mettre à jour et supprimer des messages.
 * @class MessagesController
 */
class MessagesController {
    /**
     * Récupérer les messages selon des filtres (ex: conversation entre deux users).
     * @param {object} req - L'objet de requête HTTP, contenant les paramètres de recherche dans `req.query`.
     * @param {object} res - L'objet de réponse HTTP.
     */
    async getMessages(req, res) {
        try {
            const messages = await MessagesServices.getMessages(req.query);
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Créer un nouveau message (texte ou image).
     * @param {object} req - L'objet de requête HTTP, contenant les données du message dans `req.body`.
     * @param {object} res - L'objet de réponse HTTP.
     */
    async createMessage(req, res) {
        try {
            if ((!req.body.content || typeof req.body.content !== 'string') && !req.body.image) {
                return res.status(400).json({ error: 'Le message doit contenir du texte ou une image.' });
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
     * Mettre à jour un message existant (ex: marquer comme lu).
     * @param {object} req - L'objet de requête HTTP, contenant l'ID du message dans `req.params.id` et les nouvelles données dans `req.body`.
     * @param {object} res - L'objet de réponse HTTP.
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
     * Supprimer un message.
     * @param {object} req - L'objet de requête HTTP, contenant l'ID du message dans `req.params.id`.
     * @param {object} res - L'objet de réponse HTTP.
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