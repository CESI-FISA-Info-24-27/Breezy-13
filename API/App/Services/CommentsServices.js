import { DAOMongoDbFactory } from "../Factory/DAOMongoDbFactory.js";

const Factory = new DAOMongoDbFactory();
const CommentsDAO = Factory.createCommentsDAO();

(async () => await CommentsDAO.init())();

/**
 * Represents a service for handling comments requests
 */
const CommentsServices = {
    close: async () => 
    {
        return await CommentsDAO.close();
    },

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
    createComment: async (comment) => {
        const { author, post, content, parentCommentId = null } = comment;

        // Valide les champs requis
        if (!author || !post || !content) {
            throw new Error('Les champs author, post et content sont requis');
        }

        const newComment = { author, post, content, parentCommentId };
        return await CommentsDAO.createComment(newComment);
    },

    deleteComment: async (id) => {
        const comment = await CommentsDAO.getComments({ id });
        if (comment.length === 0) {
            throw new Error('Comment not found');
        }
        return await CommentsDAO.deleteComment(id);
    }
}

export default CommentsServices;