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

        this.client = new MongoClient(uri);
        this.dbName = dbName;
    }

    /**
     * Initialise la connexion à la base de données et à la collection.
     */
    async init() {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        this.collection = this.db.collection('posts');
        this.commentsCollection = this.db.collection('comments');
    }

     /**
     * Ferme la connexion à la base de données.
     */
    async close() 
    {
        await this.client.close();
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

        return await this.collection.find(mongoFilters).sort({ createdAt: -1 }).toArray();
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
            { $set: { author: new ObjectId(post.author), content: post.content, image: post.image, likes: post.likes, updatedAt: post.updatedAt } }
        );
    }

    /**
     * Récupère l'ensemble des commentaires d'un poste.
     * @param {string} id - L'identifiant du post.
     * @returns {Array} - Liste des commentaires trouvés.
     */
    async getComments(id) {
        return await this.commentsCollection.find({post: id}).toArray();
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
        return await this.collection.insertOne(post);
    }
}