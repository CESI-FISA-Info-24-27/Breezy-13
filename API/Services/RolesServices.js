import { DAOMongoDbFactory } from "../Factory/DAOMongoDbFactory.js";

const Factory = new DAOMongoDbFactory();
const RolesDAO = Factory.createRolesDAO();

RolesDAO.init();

/**
 * Represents a service for handling roles requests
 */
const RolesServices = {
    /**
     * Get roles
     * @param {object} filters - The filters to apply
     * @returns {Array} - An array of roles
     */
    getRoles: async (filters) => {
        return await RolesDAO.getRoles(filters);
    },

    /**
     * Update roles
     * @param {number} roleId - The id of the role to update
     * @param {object} role - The role data to update
     * @returns {object} - The role updated
     */
    updateRoles: async (roleId, role) => {
        return await RolesDAO.updateRole(roleId, role);
    },

    /**
     * Delete roles
     * @param {number} roleId - The id of the role to delete
     * @returns {object} - The role deleted
     */
    deleteRoles: async (roleId) => {
        return await RolesDAO.deleteRole(roleId);
    },

    /**
     * Create roles
     * @param {object} role - The role to create
     * @returns {object} - The role created
     */
    createRoles: async (role) => {
        return await RolesDAO.createRole(role);
    },
    
    /**
     * Récupère les permissions d'un rôle
     * @param {number} roleId - L'identifiant du rôle
     * @returns {object} - Les permissions du rôle
     */
    getRolePermissions: async (roleId) => {
        const roles = await RolesDAO.getRoles({ role_id: roleId });
        if (roles.length === 0) {
            throw new Error('Rôle non trouvé');
        }
        return roles[0].permissions;
    }
}

export default RolesServices;