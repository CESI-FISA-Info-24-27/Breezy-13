import { DAOMongoDbFactory } from "../Factory/DAOMongoDbFactory.js";
import UsersServices from '../Services/UsersServices.js';

const Factory = new DAOMongoDbFactory();
const FollowsDAO = Factory.createFollowsDAO();

await FollowsDAO.init();

/**
 * Represents a service for handling follows requests
 */
const FollowsServices = {
    /**
     * Get follows
     * @param {object} filters - The filters to apply
     * @returns {Array} - An array of follows
     */
    getFollows: async (filters) => {
        return await FollowsDAO.getFollows(filters);
    },

    /**
     * Crée un nouvel abonnement.
     * @param {object} follow - Les données de l'abonnement à créer.
     * @returns {object} - L'objet complet de l'abonnement créé.
     */
    createFollow: async (follow) => {
        const { follower_id, following_id, createdAt } = follow;

        // Vérifie que les utilisateurs existent
        const followerExists = await UsersServices.getUsers({ _id: follower_id });
        if (followerExists.length === 0) {
            throw new Error(`L'utilisateur follower "${follower_id}" n'existe pas`);
        }

        const followingExists = await UsersServices.getUsers({ _id: following_id });
        if (followingExists.length === 0) {
            throw new Error(`L'utilisateur following "${following_id}" n'existe pas`);
        }

        // Crée l'abonnement
        const newFollow = {
            follower_id,
            following_id,
            createdAt: createdAt || new Date(),
        };

        return await FollowsDAO.createFollow(newFollow);
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