import RolesServices from '../Services/RolesServices.js';

/**
 * Représente un contrôleur pour gérer les requêtes liées aux rôles
 * @class RoleController
 */
class RoleController {
    /**
     * Récupérer les rôles
     * @param {object} req - La requête
     * @param {object} res - La réponse
     * @returns {Array} - Un tableau de rôles
     * @throws {Error} 404 - Aucun rôle trouvé
     * @throws {Error} 500 - Erreur inattendue
     */
    async getRoles(req, res) {
        try {
            const filters = {};
            if (req.query._id) filters._id = req.query._id; // Ajout de _id dans les filtres
            if (req.query.name) filters.name = req.query.name;
    
            const roles = await RolesServices.getRoles(filters);
    
            if (roles.length === 0) {
                return res.status(404).json({ error: 'Aucun rôle trouvé' });
            }
    
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Créer un rôle
     * @param {object} req - La requête
     * @param {object} res - La réponse
     * @throws {Error} 409 - Ce rôle existe déjà
     * @throws {Error} 500 - Erreur inattendue
     */
    async createRoles(req, res) {
        try {
            const { name, permissions } = req.body;

            if (!name || !permissions) {
                return res.status(400).json({ error: 'Les champs name et permissions sont requis' });
            }

            const newRole = await RolesServices.createRoles({ name, permissions });
            res.status(201).json({ message: 'Rôle créé avec succès', role: newRole });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Mettre à jour un rôle
     * @param {object} req - La requête
     * @param {object} res - La réponse
     * @throws {Error} 404 - Rôle introuvable
     * @throws {Error} 500 - Erreur inattendue
     */
    async updateRoles(req, res) {
        try {
            const { name, permissions } = req.body;
    
            // Vérifie si le rôle existe
            const role = await RolesServices.getRoles({ _id: req.params.id });
            if (role.length === 0) {
                return res.status(404).json({ error: 'Rôle introuvable' });
            }
    
            // Met à jour le rôle
            const updateResult = await RolesServices.updateRoles(req.params.id, { name, permissions });
    
            if (updateResult.modifiedCount === 0) {
                return res.status(400).json({ error: 'Aucune modification effectuée' });
            }
    
            // Récupère le rôle mis à jour
            const updatedRole = await RolesServices.getRoles({ _id: req.params.id });
    
            res.status(200).json({
                message: 'Rôle mis à jour avec succès',
                role: updatedRole[0] // Renvoie le premier rôle correspondant
            });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Supprimer les rôles
     * @param {object} req - La requête
     * @param {object} res - La réponse
     * @throws {Error} 404 - Id introuvable
     * @throws {Error} 500 - Erreur inattendue
     * @throws {Error} 200 - Rôle supprimé
     */
    async deleteRoles(req, res) {
        try {
            const role = await RolesServices.getRoles({ _id: req.params.id });
            if (role.length === 0) {
                return res.status(404).json({ error: 'Rôle introuvable' });
            }
    
            await RolesServices.deleteRoles(req.params.id);
            res.json({ message: 'Rôle supprimé' });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new RoleController();