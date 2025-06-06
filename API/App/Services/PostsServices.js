import { DAOMongoDbFactory } from "../Factory/DAOMongoDbFactory.js";

const Factory = new DAOMongoDbFactory();
const PostsDAO = Factory.createPostsDAO();

await PostsDAO.init();

/**
 * Represents a service for handling posts requests
 */
const PostsServices = {
    /**
     * Get posts
     * @param {object} filters - The filters to apply
     * @returns {Array} - An array of posts
     */
    getPosts: async (filters) => {
        return await PostsDAO.getPosts(filters);
    },

    /**
     * Create posts
     * @param {object} post - The post to create
     * @returns {object} - The post created
     */
    createPosts: async (post) => {
        return await PostsDAO.createPost(post);
    },

    /**
     * Get the comments of a post
     * @param {number} postId - The id of the post
     * @returns {object} - The comments of the post
     * @async
     */
    getComments: async (postId) => {
        return await UsersDAO.getComments(postId);
    },

    
    /**
     * Get the comments of a post
     * @param {number} postId - The id of the post
     * @param {number} userId - The id of the user
     * @async
     */
    likePost: async (postId, userId) => {
        return await PostsDAO.likePost(postId, userId);
    },
}

export default PostsServices;