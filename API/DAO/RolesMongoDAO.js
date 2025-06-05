import { MongoClient, ObjectId } from 'mongodb';
import { RolesDAO } from './RolesDAO.js';
import RoleModel from '../Model/RoleModel.js';
import dotenv from 'dotenv'

/**
 * DAO pour la gestion des rôles avec MongoDB.
 * @extends RolesDAO
 * @class
 */
export class RolesMongoDAO extends RolesDAO {
    /**
     * Constructeur de la classe RolesMongoDAO.
     * Initialise la connexion à la base de données MongoDB.
     */
    constructor() {
        super();
        dotenv.config();
        const uri = process.env.MONGODB_URI
        const dbName = process.env.DB_NAME

        this.client = new MongoClient(uri, { useUnifiedTopology: true });
        this.dbName = dbName;
    }

    /**
     * Initialise la connexion à la base de données et à la collection.
     */
    async init() {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        this.collection = this.db.collection('roles');
    }

    /**
     * Récupère les rôles selon les filtres spécifiés.
     * @param {object} filters - Les filtres à appliquer (id, name).
     * @returns {Array} - Liste des rôles trouvés.
     */
    async getRoles(filters) {
        const mongoFilters = {};
        if (filters._id) mongoFilters._id = new ObjectId(filters._id); // Utilisation correcte de _id
        if (filters.name) mongoFilters.name = filters.name;
    
        const roles = await this.collection.find(mongoFilters).toArray();
        return roles.map(role => new RoleModel(role)); // Instancie chaque rôle avec le modèle
    }

    /**
     * Met à jour un rôle existant.
     * @param {string} id - L'identifiant du rôle à mettre à jour.
     * @param {object} role - Les nouvelles données du rôle.
     * @returns {object} - Résultat de la mise à jour.
     */
    async updateRole(id, role) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) }, // Utilisation de _id
            { $set: { name: role.name, permissions: role.permissions } }
        );
    }

    /**
     * Supprime un rôle existant.
     * @param {string} id - L'identifiant du rôle à supprimer.
     * @returns {object} - Résultat de la suppression.
     */
    async deleteRole(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    /**
     * Crée un nouveau rôle.
     * @param {object} role - Les données du rôle à créer.
     * @returns {object} - Résultat de l'insertion.
     */
    async createRole(role) {
        const result = await this.collection.insertOne(role);
        return { _id: result.insertedId, ...role }; // Retourne le rôle avec son _id
    }
}