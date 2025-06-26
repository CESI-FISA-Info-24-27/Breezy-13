import { DAOMongoDbFactory } from "../Factory/DAOMongoDbFactory.js";

const Factory = new DAOMongoDbFactory();
const UsersDAO = Factory.createUsersDAO();

let isInitialized = false;

const ensureInitialized = async () => {
    if (!isInitialized) {
        try {
            await UsersDAO.init();
            isInitialized = true;
        } catch (error) {
            console.error('Erreur d\'initialisation MongoDB:', error);
            throw error;
        }
    }
};

/**
 * Represents a service for handling users requests
 */
const UsersServices = {
    close: async () => 
    {
        return await UsersDAO.close();
    },

    /**
     * Get users
     * @param {object} filters - The filters to apply
     * @returns {Array} - An array of users
     */
    getUsers: async (filters) => {
        await ensureInitialized();
        return await UsersDAO.getUsers(filters);
    },

    /**
     * Update users
     * @param {number} userId - The id of the user to update
     * @param {object} user - The user data to update
     * @returns {object} - The user updated
     */
    updateUsers: async (userId, user) => {
        await ensureInitialized();
        return await UsersDAO.updateUser(userId, user);
    },

    /**
     * Delete users
     * @param {number} userId - The id of the user to delete
     * @returns {object} - The user deleted
     */
    deleteUsers: async (userId) => {
        await ensureInitialized();
        return await UsersDAO.deleteUser(userId);
    },

    /**
     * Create users
     * @param {object} user - The user to create
     * @returns {object} - The user created
     */
    createUsers: async (user) => {
        await ensureInitialized();
        return await UsersDAO.createUser(user);
    },

    /**
     * Add a revoked token in database
     * @param {string} token - The token to add
     * @returns {object} - The token added
     * @async
     */
    addRevokedToken: async (token) => {
        await ensureInitialized();
        return await UsersDAO.addRevokedToken(token);
    },

    /**
     * Is the token revoked
     * @param {string} token - The token to check
     * @returns {boolean} - True if the token is revoked, false otherwise
     * @async
     */
    isTokenRevoked: async (token) => {
        await ensureInitialized();
        return await UsersDAO.isTokenRevoked(token);
    },

    /**
     * Get the role of a user
     * @param {number} userId - The id of the user
     * @returns {object} - The role of the user
     * @async
     */
    getRole: async (userId) => {
        await ensureInitialized();
        return await UsersDAO.getRole(userId);
    },

    /**
     * Get the permissions of a user
     * @param {number} userId - The id of the user
     * @returns {object} - The permissions of the user
     * @async
     */
    getPermissions: async (userId) => {
        await ensureInitialized();
        return await UsersDAO.getPermissions(userId);
    }
}

export default UsersServices;