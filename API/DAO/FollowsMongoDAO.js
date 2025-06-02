import { MongoClient, ObjectId } from 'mongodb';
import { FollowsDAO } from './FollowsDAO.js';
import dotenv from 'dotenv'

/**
 * User DAO for MongoDB.
 * @extends FollowsDAO
 * @class
 */
export class FollowsMongoDAO extends FollowsDAO {
    /**
     * @constructor
     */
    constructor() {
        super();
        dotenv.config();
        const uri = process.env.MONGODB_URI
        const dbName = process.env.DB_NAME

        this.client = new MongoClient(uri, { useUnifiedTopology: true });
        this.dbName = dbName;
    }

    async init() {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        this.collection = this.db.collection('follows');
    }

    /**
     * Retrieves users based on the specified filters.
     * @param {object} filters
     * @returns {Array}
     */
    async getFollows(filters) {
        const mongoFilters = {};
        if (filters.id) mongoFilters._id = new ObjectId(filters.id);
        if (filters.follower) mongoFilters.follower = filters.follower;
        if (filters.following) mongoFilters.following = filters.following;
        if (filters.createdAt) mongoFilters.createdAt = filters.createdAt;

        return await this.collection.find(mongoFilters).toArray();
    }

    /**
     * Updates an existing user.
     * @param {string} id
     * @param {object} user
     * @returns {object}
     */
    async updateFollow(id, follow) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { follower: follow.follower, following: follow.following } }
        );
    }

    /**
     * Deletes an existing user.
     * @param {string} id
     * @returns {object}
     */
    async deleteFollow(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    /**
     * Creates a new user.
     * @param {object} user
     * @returns {object}
     */
    async createFollow(follow) {
        return await this.collection.insertOne(follow);
    }
}