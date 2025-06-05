import { MongoClient, ObjectId } from 'mongodb';
import { FollowsDAO } from './FollowsDAO.js';
import dotenv from 'dotenv'

/**
 * DAO pour la gestion des abonnements (follows) avec MongoDB.
 * @extends FollowsDAO
 * @class
 */
export class FollowsMongoDAO extends FollowsDAO {
    /**
     * Constructeur de la classe FollowsMongoDAO.
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
        this.collection = this.db.collection('follows');
    }

    /**
     * Récupère les abonnements selon les filtres spécifiés.
     * @param {object} filters - Les filtres à appliquer (id, follower_id, following_id, createdAt).
     * @returns {Array} - Liste des abonnements trouvés.
     */
    async getFollows(filters) {
        const mongoFilters = {};
        if (filters.id) mongoFilters._id = new ObjectId(filters.id);
        if (filters.follower_id) mongoFilters.follower_id = filters.follower_id;
        if (filters.following_id) mongoFilters.following_id = filters.following_id;
        if (filters.createdAt) mongoFilters.createdAt = filters.createdAt;

        return await this.collection.find(mongoFilters).toArray();
    }

    /**
     * Met à jour un abonnement existant.
     * @param {string} id - L'identifiant de l'abonnement à mettre à jour.
     * @param {object} follow - Les nouvelles données de l'abonnement.
     * @returns {object} - Résultat de la mise à jour.
     */
    async updateFollow(id, follow) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { follower_id: follow.follower_id, following_id: follow.following_id } }
        );
    }

    /**
     * Supprime un abonnement existant.
     * @param {string} id - L'identifiant de l'abonnement à supprimer.
     * @returns {object} - Résultat de la suppression.
     */
    async deleteFollow(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    /**
 * Crée un nouvel abonnement.
 * @param {object} follow - Les données de l'abonnement à créer.
 * @returns {object} - L'objet complet de l'abonnement créé.
 */
    async createFollow(follow) {
        const result = await this.collection.insertOne(follow);
        return { _id: result.insertedId, ...follow }; // Retourne l'objet complet avec l'_id
    }
}