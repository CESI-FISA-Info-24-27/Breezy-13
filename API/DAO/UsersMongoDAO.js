import { MongoClient, ObjectId } from 'mongodb';
import { UsersDAO } from './UsersDAO.js';
import dotenv from 'dotenv'

/**
 * User DAO for MongoDB.
 * @extends UsersDAO
 * @class
 */
export class UsersMongoDAO extends UsersDAO {
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
        this.collection = this.db.collection('users');
    }

    /**
     * Retrieves users based on the specified filters.
     * @param {object} filters
     * @returns {Array}
     */
    async getUsers(filters) {
        const mongoFilters = {};
        if (filters.id) mongoFilters._id = new ObjectId(filters.id);
        if (filters.username) mongoFilters.username = filters.username;
        if (filters.password) mongoFilters.password = filters.password;
        if (filters.email) mongoFilters.email = filters.email;
        if (filters.avatar) mongoFilters.avatar = filters.avatar;
        if (filters.bio) mongoFilters.bio = filters.bio;
        if (filters.createdAt) mongoFilters.createdAt = filters.createdAt;
        if (filters.updatedAt) mongoFilters.updatedAt = filters.updatedAt;

        return await this.collection.find(mongoFilters).toArray();
    }

    /**
     * Updates an existing user.
     * @param {string} id
     * @param {object} user
     * @returns {object}
     */
    async updateUser(id, user) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { username: user.username, password: user.password, email: user.email, avatar: user.avatar, bio: user.bio, updatedAt: user.updatedAt } }
        );
    }

    /**
     * Deletes an existing user.
     * @param {string} id
     * @returns {object}
     */
    async deleteUser(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    /**
     * Creates a new user.
     * @param {object} user
     * @returns {object}
     */
    async createUser(user) {
        return await this.collection.insertOne(user);
    }
}