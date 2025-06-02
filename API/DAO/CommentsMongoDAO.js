import { MongoClient, ObjectId } from 'mongodb';
import { CommentsDAO } from './CommentsDAO.js';
import dotenv from 'dotenv'

/**
 * User DAO for MongoDB.
 * @extends CommentsDAO
 * @class
 */
export class CommentsMongoDAO extends CommentsDAO {
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
        this.collection = this.db.collection('comments');
    }

    /**
     * Retrieves users based on the specified filters.
     * @param {object} filters
     * @returns {Array}
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
     * Updates an existing user.
     * @param {string} id
     * @param {object} user
     * @returns {object}
     */
    async updateComment(id, comment) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { author: comment.author, post: comment.post, content: comment.content } }
        );
    }

    /**
     * Deletes an existing user.
     * @param {string} id
     * @returns {object}
     */
    async deleteComment(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    /**
     * Creates a new user.
     * @param {object} user
     * @returns {object}
     */
    async createComment(comment) {
        return await this.collection.insertOne(comment);
    }
}