/**
 * Représente une Factory pour créer des objets DAOs
 * @class DAOFactory
 */
export class DAOFactory {
    constructor() {}

    /**
     * Crée un objet DAOFactory pour les rôles
     * @returns {RolesDAO} - Le DAO des rôles
     */
    createRolesDAO() {
        throw new Error('Non implémenté');
    }

    /**
     * Crée un objet DAOFactory pour les utilisateurs
     * @returns {UsersDAO} - Le DAO des utilisateurs
     */
    createUsersDAO() {
        throw new Error('Non implémenté');
    }

    /**
     * Crée un objet DAOFactory pour les posts
     * @returns {PostsDAO} - Le DAO des posts
     */
    createPostsDAO() {
        throw new Error('Non implémenté');
    }

    /**
     * Crée un objet DAOFactory pour les commentaires
     * @returns {CommentsDAO} - Le DAO des commentaires
     */
    createCommentsDAO() {
        throw new Error('Non implémenté');
    }

    /**
     * Crée un objet DAOFactory pour les relations de suivi
     * @returns {FollowsDAO} - Le DAO des relations de suivi
     */
    createFollowsDAO() {
        throw new Error('Non implémenté');
    }
}
