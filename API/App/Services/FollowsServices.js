import { DAOMongoDbFactory } from "../Factory/DAOMongoDbFactory.js";

const Factory = new DAOMongoDbFactory();
const FollowsDAO = Factory.createFollowsDAO();

(async () => await FollowsDAO.init())();

/**
 * Represents a service for handling follows requests
 */
const FollowsServices = {
    close: async () => 
    {
        return await FollowsDAO.close();
    },

    /**
     * Get follows
     * @param {object} filters - The filters to apply
     * @returns {Array} - An array of follows
     */
    getFollows: async (filters) => {
        return await FollowsDAO.getFollows(filters);
    },

    /**
     * Create follows
     * @param {object} follow - The follow relationship to create
     * @returns {object} - The follow relationship created
     */
    createFollow: async (follow) => {
        return await FollowsDAO.createFollow(follow);
    },

    /**
     * Delete follows
     * @param {object} follow - The follow relationship to delete
     * @returns {object} - The follow relationship deleted
     */
    deleteFollow: async (follow) => {
        return await FollowsDAO.deleteFollow(follow);
    },
}

export default FollowsServices;