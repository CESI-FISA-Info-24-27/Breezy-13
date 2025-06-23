import { MongoClient, ObjectId } from 'mongodb';
import { MessagesDAO } from './MessagesDAO.js';
import dotenv from 'dotenv';

/**
 * DAO pour la gestion des messages avec MongoDB.
 * @extends MessagesDAO
 */
export class MessagesMongoDAO extends MessagesDAO {
    constructor() {
        super();
        dotenv.config();
        const uri = process.env.MONGODB_URI;
        const dbName = process.env.DB_NAME;

        this.client = new MongoClient(uri);
        this.dbName = dbName;
    }

    /**
     * Initialise la connexion à la base de données et à la collection.
     */
    async init() {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        this.collection = this.db.collection('messages');
    }

    /**
     * Ferme la connexion à la base de données.
     */
    async close() {
        await this.client.close();
    }

    /**
     * Récupère les messages selon les filtres spécifiés.
     * @param {object} filters - Les filtres à appliquer (id, from, to, read, createdAt, etc.).
     * @returns {Array} - Liste des messages trouvés.
     */
    async getMessages(filters) {
        const mongoFilters = {};
        if (filters.id && ObjectId.isValid(filters.id)) mongoFilters._id = new ObjectId(filters.id);
        if (filters.from && ObjectId.isValid(filters.from)) mongoFilters.from = new ObjectId(filters.from);
        if (filters.to && ObjectId.isValid(filters.to)) mongoFilters.to = new ObjectId(filters.to);
        if (filters.read !== undefined) mongoFilters.read = filters.read;
        if (filters.createdAt) mongoFilters.createdAt = filters.createdAt;
        if (filters.updatedAt) mongoFilters.updatedAt = filters.updatedAt;

        return await this.collection.find(mongoFilters).toArray();
    }

    /**
     * Crée un nouveau message.
     * @param {object} message - Les données du message à créer.
     * @returns {object} - Résultat de l'insertion.
     */
    async createMessage(message) {
        message.createdAt = new Date();
        message.updatedAt = new Date();
        message.read = message.read ?? false;
        return await this.collection.insertOne(message);
    }

    /**
     * Met à jour un message existant.
     * @param {string} id - L'identifiant du message à mettre à jour.
     * @param {object} message - Les nouvelles données du message.
     * @returns {object} - Résultat de la mise à jour.
     */
    async updateMessage(id, message) {
        message.updatedAt = new Date();
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: message }
        );
    }

    /**
     * Supprime un message existant.
     * @param {string} id - L'identifiant du message à supprimer.
     * @returns {object} - Résultat de la suppression.
     */
    async deleteMessage(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }
}