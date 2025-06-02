import { MongoClient, ObjectId } from 'mongodb';
import { CommentsDAO } from './CommentsDAO.js';
import dotenv from 'dotenv'

/**
 * DAO pour la gestion des commentaires avec MongoDB.
 * @extends CommentsDAO
 * @class
 */
export class CommentsMongoDAO extends CommentsDAO {
    /**
     * Constructeur de la classe CommentsMongoDAO.
     * Initialise la connexion à la base de données MongoDB.
     */
    constructor() {
        super();
        dotenv.config();
        const uri = process.env.MONGODB_URI
        const dbName = process.env.DB_NAME

        this.client = new MongoClient(uri, { useUnifiedTopology: true });
        this.dbName = dbName;
    }

    /**
     * Initialise la connexion à la base de données et à la collection.
     */
    async init() {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        this.collection = this.db.collection('comments');
    }

    /**
     * Récupère les commentaires selon les filtres spécifiés.
     * @param {object} filters - Les filtres à appliquer (id, author, post, content, createdAt).
     * @returns {Array} - Liste des commentaires trouvés.
     */
    async getComments(filters) {
        const mongoFilters = {};
        if (filters.id) mongoFilters._id = new ObjectId(filters.id);
        if (filters.author) mongoFilters.author = filters.author;
        if (filters.post) mongoFilters.post = filters.post;
        if (filters.content) mongoFilters.content = filters.content;
        if (filters.createdAt) mongoFilters.createdAt = filters.createdAt;

        return await this.collection.find(mongoFilters).toArray();
    }

    /**
     * Met à jour un commentaire existant.
     * @param {string} id - L'identifiant du commentaire à mettre à jour.
     * @param {object} comment - Les nouvelles données du commentaire.
     * @returns {object} - Résultat de la mise à jour.
     */
    async updateComment(id, comment) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { author: comment.author, post: comment.post, content: comment.content } }
        );
    }

    /**
     * Supprime un commentaire existant.
     * @param {string} id - L'identifiant du commentaire à supprimer.
     * @returns {object} - Résultat de la suppression.
     */
    async deleteComment(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    /**
     * Crée un nouveau commentaire.
     * @param {object} comment - Les données du commentaire à créer.
     * @returns {object} - Résultat de l'insertion.
     */
    async createComment(comment) {
        return await this.collection.insertOne(comment);
    }
}