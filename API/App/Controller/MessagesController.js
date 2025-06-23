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
     * @returns {Array} - Un tableau de messages
     * @throws {Error} 404 - Message non trouvé
     * @throws {Error} 400 - L'id doit être un nombre
     * @throws {Error} 400 - L'expéditeur ou le destinataire doit être une chaîne de caractères
     * @throws {Error} 500 - Erreur inattendue
     * @throws {Error} 200 - Récupération des messages réussie
     */
    async getMessages(req, res) {
        try {
            // Vérifie que les paramètres sont valides
            if (req.query.id && isNaN(req.query.id)) {
                return res.status(400).json({ error: 'L\'id doit être un nombre' });
            }
            if (req.query.from && typeof req.query.from !== 'string') {
                return res.status(400).json({ error: 'L\'expéditeur doit être une chaîne de caractères' });
            }
            if (req.query.to && typeof req.query.to !== 'string') {
                return res.status(400).json({ error: 'Le destinataire doit être une chaîne de caractères' });
            }

            // Vérifie que l'id existe
            if (req.query.id) {
                const message = await MessagesServices.getMessages({ id: req.query.id });
                if (!message || message.length === 0) {
                    return res.status(404).json({ error: 'Message non trouvé' });
                }
            }

            const messages = await MessagesServices.getMessages(req.query);
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Créer un nouveau message (texte obligatoire, image ou vidéo optionnelles).
     * @param {object} req - L'objet de requête HTTP, contenant les données du message dans `req.body`.
     * @param {object} res - L'objet de réponse HTTP.
     */
    async createMessage(req, res) {
        try {
            if (!req.body.content || typeof req.body.content !== 'string' || req.body.content.trim() === '') {
                return res.status(400).json({ error: 'Le message doit contenir du texte.' });
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