import { MongoClient, ObjectId } from 'mongodb';
import { RolesDAO } from './RolesDAO.js';
import dotenv from 'dotenv'

/**
 * User DAO for MongoDB.
 * @extends RolesDAO
 * @class
 */
export class RolesMongoDAO extends RolesDAO {
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
        this.collection = this.db.collection('roles');
    }

    /**
     * Retrieves users based on the specified filters.
     * @param {object} filters
     * @returns {Array}
     */
    async getRoles(filters) {
        const mongoFilters = {};
        if (filters.id) mongoFilters._id = new ObjectId(filters.id);
        if (filters.name) mongoFilters.name = filters.name;

        return await this.collection.find(mongoFilters).toArray();
    }

    /**
     * Updates an existing user.
     * @param {string} id
     * @param {object} user
     * @returns {object}
     */
    async updateRole(id, role) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name: role.name } }
        );
    }

    /**
     * Deletes an existing user.
     * @param {string} id
     * @returns {object}
     */
    async deleteRole(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    /**
     * Creates a new user.
     * @param {object} user
     * @returns {object}
     */
    async createRole(role) {
        return await this.collection.insertOne(role);
    }
}