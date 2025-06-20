import { DAOMongoDbFactory } from "../Factory/DAOMongoDbFactory";

const Factory = new DAOMongoDbFactory();
const MessagesDAO = Factory.createMessagesDAO();

(async () => await MessagesDAO.init())();

/**
 * Représente un service pour gérer les messages.
 */
const MessagesServices = {
    close: async () => {
        return await MessagesDAO.close();
    },

    /**
     * Récupère les messages selon les filtres spécifiés.
     * @param {object} filters - Les filtres à appliquer.
     * @returns {Array} - Liste des messages trouvés.
     */
    getMessages: async (filters) => {
        return await MessagesDAO.getMessages(filters);
    },

    /**
     * Crée un nouveau message.
     * @param {object} message - Les données du message à créer.
     * @returns {object} - Résultat de l'insertion.
     */
    createMessage: async (message) => {
        return await MessagesDAO.createMessage(message);
    },

    /**
     * Met à jour un message existant.
     * @param {string} id - L'identifiant du message à mettre à jour.
     * @param {object} message - Les données mises à jour du message.
     * @returns {object} - Résultat de la mise à jour.
     */
    updateMessage: async (id, message) => {
        return await MessagesDAO.updateMessage(id, message);
    },

    /**
     * Supprime un message.
     * @param {string} id - L'identifiant du message à supprimer.
     * @returns {object} - Résultat de la suppression.
     */
    deleteMessage: async (id) => {
        return await MessagesDAO.deleteMessage(id);
    }
};

export default MessagesServices;