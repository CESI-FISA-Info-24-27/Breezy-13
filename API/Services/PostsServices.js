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
    createPost: async (post) => {
        const newPost = {
            ...post,
            createdAt: new Date(), // Ajoute la date de création
            updatedAt: new Date(), // Initialise également updatedAt
        };
        return await PostsDAO.createPost(newPost);
    },

    updatePost: async (postId, post) => {
        const updatedPost = {
            ...post,
            updatedAt: new Date(), // Met à jour la date de modification
        };
    
        // Effectue la mise à jour
        const updateResult = await PostsDAO.updatePost(postId, updatedPost);
    
        // Vérifie si la mise à jour a été effectuée
        if (updateResult.matchedCount === 0) {
            throw new Error('Post not found');
        }
    
        // Récupère l'objet mis à jour
        const postAfterUpdate = await PostsDAO.getPosts({ id: postId });
        if (postAfterUpdate.length === 0) {
            throw new Error('Failed to retrieve updated post');
        }
    
        return postAfterUpdate[0]; // Retourne l'objet mis à jour
    },

    deletePost: async (postId) => {
        const post = await PostsDAO.getPosts({ id: postId });
        if (post.length === 0) {
            throw new Error('Post not found');
        }
        return await PostsDAO.deletePost(postId);
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