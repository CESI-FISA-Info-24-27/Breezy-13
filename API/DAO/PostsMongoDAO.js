import { MongoClient, ObjectId } from 'mongodb';
import { PostsDAO } from './PostsDAO.js';
import dotenv from 'dotenv'

/**
 * User DAO for MongoDB.
 * @extends PostsDAO
 * @class
 */
export class PostsMongoDAO extends PostsDAO {
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
        this.collection = this.db.collection('posts');
    }

    /**
     * Retrieves users based on the specified filters.
     * @param {object} filters
     * @returns {Array}
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
     * Updates an existing user.
     * @param {string} id
     * @param {object} user
     * @returns {object}
     */
    async updatePost(id, post) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { author: post.author, content: post.content, image: post.image, likes: post.likes, updatedAt: post.updatedAt } }
        );
    }

    /**
     * Deletes an existing user.
     * @param {string} id
     * @returns {object}
     */
    async deletePost(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    /**
     * Creates a new user.
     * @param {object} user
     * @returns {object}
     */
    async createPost(post) {
        return await this.collection.insertOne(post);
    }
}