import { DAOFactory } from "./DAOFactory.js";
import { UsersMongoDAO } from "../DAO/UsersMongoDAO.js";
import { RolesMongoDAO } from "../DAO/RolesMongoDAO.js";
import { PostsMongoDAO } from "../DAO/PostsMongoDAO.js";
import { CommentsMongoDAO } from "../DAO/CommentsMongoDAO.js";
import { FollowsMongoDAO } from "../DAO/FollowsMongoDAO.js";
import { MessagesMongoDAO } from "../DAO/MessagesMongoDAO.js";

/**
 * Représente une Factory pour créer des objets DAO spécifiques à MongoDB
 * @extends DAOFactory
 * @class DAOMongoDbFactory
 */
export class DAOMongoDbFactory extends DAOFactory {
    /**
     * Crée une nouvelle instance de DAOMongoDbFactory
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Crée une nouvelle instance de UsersMongoDAO
     * @returns {UsersMongoDAO} - Une nouvelle instance de UsersMongoDAO
     */
    createUsersDAO() {
        return new UsersMongoDAO();
    }

    /**
     * Crée une nouvelle instance de RolesMongoDAO
     * @returns {RolesMongoDAO} - Une nouvelle instance de RolesMongoDAO
     */
    createRolesDAO() {
        return new RolesMongoDAO();
    }

    /**
     * Crée une nouvelle instance de PostsMongoDAO
     * @returns {PostsMongoDAO} - Une nouvelle instance de PostsMongoDAO
     */
    createPostsDAO() {
        return new PostsMongoDAO();
    }

    /**
     * Crée une nouvelle instance de CommentsMongoDAO
     * @returns {CommentsMongoDAO} - Une nouvelle instance de CommentsMongoDAO
     */
    createCommentsDAO() {
        return new CommentsMongoDAO();
    }

    /**
     * Crée une nouvelle instance de FollowsMongoDAO
     * @returns {FollowsMongoDAO} - Une nouvelle instance de FollowsMongoDAO
     */
    createFollowsDAO() {
        return new FollowsMongoDAO();
    }
    
    /**
     * Crée une nouvelle instance de MessagesMongoDAO
     * @return {MessagesMongoDAO} - Une nouvelle instance de MessagesMongoDAO
     * */
    createMessagesDAO() {
        return new MessagesMongoDAO();
    }
}