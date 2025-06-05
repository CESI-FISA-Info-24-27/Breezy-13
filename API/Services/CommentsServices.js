import { DAOMongoDbFactory } from "../Factory/DAOMongoDbFactory.js";

const Factory = new DAOMongoDbFactory();
const CommentsDAO = Factory.createCommentsDAO();

await CommentsDAO.init();

/**
 * Represents a service for handling comments requests
 */
const CommentsServices = {
    /**
     * Get posts
     * @param {object} filters - The filters to apply
     * @returns {Array} - An array of posts
     */
    getComments: async (filters) => {
        return await CommentsDAO.getComments(filters);
    },

    /**
     * Create comments
     * @param {object} comment - The comment to create
     * @param {number} postId - The id of the post to comment on
     * @param {number} [parentCommentId] - The id of the parent comment (optional)
     * @returns {object} - The comment created
     */
    createComments: async (comment, postId, parentCommentId = null) => {
        const newComment = { ...comment, postId, parentCommentId };
        return await CommentsDAO.createComments(newComment);
    },
}

export default CommentsServices;