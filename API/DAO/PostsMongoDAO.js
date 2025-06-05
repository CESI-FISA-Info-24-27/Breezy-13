import { MongoClient, ObjectId } from 'mongodb';
import { PostsDAO } from './PostsDAO.js';
import dotenv from 'dotenv'

/**
 * DAO pour la gestion des posts avec MongoDB.
 * @extends PostsDAO
 * @class
 */
export class PostsMongoDAO extends PostsDAO {
    /**
     * Constructeur de la classe PostsMongoDAO.
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
        this.collection = this.db.collection('posts');
    }

    /**
     * Récupère les posts selon les filtres spécifiés.
     * @param {object} filters - Les filtres à appliquer (id, author, content, image, likes, createdAt, updatedAt).
     * @returns {Array} - Liste des posts trouvés.
     */
    async getPosts(filters) {
        const mongoFilters = {};
        if (filters.id) mongoFilters._id = new ObjectId(filters.id);
        if (filters.author) mongoFilters.author = filters.author;
        if (filters.content) mongoFilters.content = filters.content;
        if (filters.image) mongoFilters.image = filters.image;
        if (filters.likes) mongoFilters.likes = filters.likes;
        if (filters.createdAt) mongoFilters.createdAt = filters.createdAt;
        if (filters.updatedAt) mongoFilters.updatedAt = filters.updatedAt;

        return await this.collection.find(mongoFilters).toArray();
    }

    /**
     * Met à jour un post existant.
     * @param {string} id - L'identifiant du post à mettre à jour.
     * @param {object} post - Les nouvelles données du post.
     * @returns {object} - Résultat de la mise à jour.
     */
    async updatePost(id, post) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...post } } 
        );
    }

    /**
     * Supprime un post existant.
     * @param {string} id - L'identifiant du post à supprimer.
     * @returns {object} - Résultat de la suppression.
     */
    async deletePost(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    /**
     * Crée un nouveau post.
     * @param {object} post - Les données du post à créer.
     * @returns {object} - Résultat de l'insertion.
     */
    async createPost(post) {
        const result = await this.collection.insertOne(post);
        return { _id: result.insertedId, ...post }; // Retourne l'objet complet avec l'_id
    }
}