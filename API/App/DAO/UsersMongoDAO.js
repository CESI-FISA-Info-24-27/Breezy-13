import { MongoClient, ObjectId } from 'mongodb';
import { UsersDAO } from './UsersDAO.js';
import dotenv from 'dotenv'
import e from 'express';

/**
 * DAO pour la gestion des utilisateurs avec MongoDB.
 * @extends UsersDAO
 * @class
 */
export class UsersMongoDAO extends UsersDAO {
    /**
     * Constructeur de la classe UsersMongoDAO.
     * Initialise la connexion à la base de données MongoDB.
     */
    constructor() {
        super();
        dotenv.config();
        const uri = process.env.MONGODB_URI
        const dbName = process.env.DB_NAME

        this.client = new MongoClient(uri);
        this.dbName = dbName;
    }

    /**
     * Initialise la connexion à la base de données et à la collection.
     */
    async init() {
        try {
            console.log('Tentative de connexion à MongoDB...');
            await this.client.connect();
            this.db = this.client.db(this.dbName);
            this.collection = this.db.collection('users');

            console.log('Connexion à MongoDB réussie !');
            return true;

        } catch (error) {
            console.error('Erreur lors de l\'initialisation de la connexion MongoDB:', error);
            throw error;
        }
    }

     /**
     * Ferme la connexion à la base de données.
     */
    async close() 
    {
        await this.client.close();
    }

    /**
     * Récupère les utilisateurs selon les filtres spécifiés.
     * @param {object} filters - Les filtres à appliquer (id, username, password, email, avatar, bio, createdAt, updatedAt).
     * @returns {Array} - Liste des utilisateurs trouvés.
     */
    async getUsers(filters) {
        const mongoFilters = {};
        if (filters.id)
        {
            // Si ça a l'air d'être une liste
            if (Array.isArray(filters.id)) 
            {
                const validIds = filters.id
                .filter(id => ObjectId.isValid(id))
                .map(id => new ObjectId(id));

                if (validIds.length > 0) 
                {
                    mongoFilters._id = { $in: validIds };
                }
            }
            // Sinon si c'est un ID
            else if (ObjectId.isValid(filters.id))
            {
                mongoFilters._id = new ObjectId(filters.id);
            }
        } 
        if (filters.username) mongoFilters.username = filters.username;
        if (filters.password) mongoFilters.password = filters.password;
        if (filters.email) mongoFilters.email = filters.email;
        if (filters.avatar) mongoFilters.avatar = filters.avatar;
        if (filters.bio) mongoFilters.bio = filters.bio;
        if (filters.isVerified !== undefined) mongoFilters.isVerified = filters.isVerified;
        if (filters.verificationToken) mongoFilters.verificationToken = filters.verificationToken;
        if (filters.createdAt) mongoFilters.createdAt = filters.createdAt;
        if (filters.updatedAt) mongoFilters.updatedAt = filters.updatedAt;

        return await this.collection.find(mongoFilters).toArray();
    }

    /**
     * Met à jour un utilisateur existant.
     * @param {string} id - L'identifiant de l'utilisateur à mettre à jour.
     * @param {object} user - Les nouvelles données de l'utilisateur.
     * @returns {object} - Résultat de la mise à jour.
     */
    async updateUser(id, user) {
        const updateFields = {};
        
        // Ne mettre à jour que les champs fournis
        if (user.username !== undefined) updateFields.username = user.username;
        if (user.email !== undefined) updateFields.email = user.email;
        if (user.avatar !== undefined) updateFields.avatar = user.avatar;
        if (user.bio !== undefined) updateFields.bio = user.bio;
        if (user.role_id !== undefined) updateFields.role_id = user.role_id;
        if (user.password !== undefined) updateFields.password = user.password;
        if (user.isVerified !== undefined) updateFields.isVerified = user.isVerified;
        if (user.verificationToken !== undefined) updateFields.verificationToken = user.verificationToken;
        if (user.verificationTokenExpires !== undefined) updateFields.verificationTokenExpires = user.verificationTokenExpires;
        if (user.updatedAt !== undefined) updateFields.updatedAt = user.updatedAt;
        
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
        );
    }

    /**
     * Supprime un utilisateur existant.
     * @param {string} id - L'identifiant de l'utilisateur à supprimer.
     * @returns {object} - Résultat de la suppression.
     */
    async deleteUser(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    /**
     * Crée un nouvel utilisateur.
     * @param {object} user - Les données de l'utilisateur à créer.
     * @returns {object} - Résultat de l'insertion.
     */
    async createUser(user) {
        return await this.collection.insertOne(user);
    }

    /**
     * Récupère les permissions d'un utilisateur en fonction de son rôle.
     * @param {string} userId - L'identifiant de l'utilisateur.
     * @returns {object} - Les permissions de l'utilisateur.
     */
    async getPermissions(userId) {
        // Récupère l'utilisateur
        const user = await this.collection.findOne({ _id: new ObjectId(userId) });
    
        if (!user || !user.role_id) {
            throw new Error('Utilisateur ou rôle non trouvé');
        }
    
        // Correction ici : recherche par _id
        const rolesCollection = this.db.collection('roles');
        const role = await rolesCollection.findOne({ _id: new ObjectId(user.role_id) });
    
        if (!role) {
            throw new Error('Rôle non trouvé');
        }
    
        return role.permissions;
    }

    /**
     * Vérifie si un token est révoqué.
     * @param {string} token - Le token à vérifier.
     * @returns {boolean} - True si le token est révoqué, sinon false.
     */
    async isTokenRevoked(token) {
        const revokedToken = await this.db.collection('revokedTokens').findOne({ token });
        return !!revokedToken; // Retourne true si le token est trouvé, sinon false
    }

    /**
     * Ajoute un token révoqué dans la base de données.
     * @param {string} token - Le token à révoquer.
     * @returns {object} - Résultat de l'insertion.
     */
    async addRevokedToken(token) {
        return await this.db.collection('revokedTokens').insertOne({ token, revokedAt: new Date() });
    }
}