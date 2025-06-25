import { MongoClient, ObjectId } from 'mongodb';
import { MessagesDAO } from './MessagesDAO.js';
import dotenv from 'dotenv';

/**
 * DAO (Data Access Object) pour la gestion des messages avec MongoDB.
 * Fournit des méthodes pour interagir avec la collection "messages" de la base de données.
 */
export class MessagesMongoDAO extends MessagesDAO {
    /**
     * Initialise la connexion MongoDB et configure la base de données.
     * Les paramètres de connexion sont récupérés depuis les variables d'environnement.
     */
    constructor() {
        super();
        dotenv.config();
        const uri = process.env.MONGODB_URI;
        const dbName = process.env.DB_NAME;

        this.client = new MongoClient(uri);
        this.dbName = dbName;
    }

    /**
     * Établit la connexion à la base de données et prépare la collection "messages".
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
     * Récupère les messages selon les filtres fournis.
     * @param {Object} filters - Filtres de recherche (id, from, to, read, createdAt, updatedAt).
     * @returns {Promise<Array>} Liste des messages correspondant aux filtres.
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
     * Crée un nouveau message dans la base de données.
     * Les champs from et to sont convertis en ObjectId si besoin.
     * Les champs createdAt, updatedAt et read sont automatiquement ajoutés.
     * @param {Object} message - Données du message à insérer.
     * @returns {Promise<Object>} Résultat de l'insertion.
     */
    async createMessage(message) {
        // Conversion des champs from/to en ObjectId si besoin
        if (message.from && typeof message.from === "string" && ObjectId.isValid(message.from)) {
            message.from = new ObjectId(message.from);
        }
        if (message.to && typeof message.to === "string" && ObjectId.isValid(message.to)) {
            message.to = new ObjectId(message.to);
        }
        message.createdAt = new Date();
        message.updatedAt = new Date();
        message.read = message.read ?? false;
        return await this.collection.insertOne(message);
    }

    /**
     * Met à jour un message existant selon son identifiant.
     * Le champ updatedAt est mis à jour automatiquement.
     * @param {string} id - Identifiant du message à mettre à jour.
     * @param {Object} message - Champs à mettre à jour.
     * @returns {Promise<Object>} Résultat de la mise à jour.
     */
    async updateMessage(id, message) {
        message.updatedAt = new Date();
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: message }
        );
    }

    /**
     * Supprime un message selon son identifiant.
     * @param {string} id - Identifiant du message à supprimer.
     * @returns {Promise<Object>} Résultat de la suppression.
     */
    async deleteMessage(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }
}