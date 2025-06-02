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
     * @throws {Error} 404 - Id introuvable
     * @throws {Error} 404 - Nom introuvable
     * @throws {Error} 500 - Erreur inattendue
     * @throws {Error} 400 - Id doit être un nombre
     * @throws {Error} 400 - Nom doit être une chaîne de caractères
     * @throws {Error} 500 - Erreur inattendue
     * @throws {Error} 200 - Récupération des rôles réussie
     */
    async getRoles(req, res) {
        try {
            // Vérifie que les paramètres sont valides
            if (req.query.id && isNaN(req.query.id)) {
                return res.status(400).json({ error: 'Id doit être un nombre' });
            }

            if (req.query.name && typeof req.query.name !== 'string') {
                return res.status(400).json({ error: 'Nom doit être une chaîne de caractères' });
            }

            // Vérifie que l'id ou le nom existe
            if (req.query.id) {
                const role = await RolesServices.getRoles({ id: req.query.id });
                if (role.length === 0) {
                    res.status(404).json({ error: 'Id introuvable' });
                }
            }
            else if (req.query.name) {
                const role = await RolesServices.getRoles({ name: req.query.name });
                if (role.length === 0) {
                    res.status(404).json({ error: 'Nom introuvable' });
                }
            }

            const roles = await RolesServices.getRoles(req.query);
            res.json(roles);
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Mettre à jour les rôles
     * @param {object} req - La requête
     * @param {object} res - La réponse
     * @throws {Error} 404 - Id introuvable
     * @throws {Error} 500 - Erreur inattendue
     * @throws {Error} 400 - Nom doit être une chaîne de caractères
     * @throws {Error} 200 - Rôle mis à jour
     */
    async updateRoles(req, res) {
        try {
            if (req.body.name && typeof req.body.name !== 'string') {
                return res.status(400).json({ error: 'Nom doit être une chaîne de caractères' });
            }

            // Vérifie que l'id existe
            const role = await RolesServices.getRoles({ id: req.params.id });
            if (role.length === 0) {
                return res.status(404).json({ error: 'Id introuvable' });
            }

            await RolesServices.updateRoles(req.params.id, req.body);
            res.json({ message: 'Rôle mis à jour' });
        }
        catch (error) {
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
            // Vérifie que l'id existe
            const role = await RolesServices.getRoles({ id: req.params.id });
            if (role.length === 0) {
                return res.status(404).json({ error: 'Id introuvable' });
            }

            await RolesServices.deleteRoles(req.params.id);
            res.json({ message: 'Rôle supprimé' });
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    /**
     * Créer des rôles
     * @param {object} req - La requête
     * @param {object} res - La réponse
     * @throws {Error} 409 - Ce rôle existe déjà
     * @throws {Error} 500 - Erreur inattendue
     * @throws {Error} 400 - Le nom du rôle doit être une chaîne de caractères
     * @throws {Error} 200 - Rôle créé
     */
    async createRoles(req, res) {
        try {
            if (req.body.name && typeof req.body.name !== 'string') {
                throw new Error('Le nom du rôle doit être une chaîne de caractères');
            }

            // Vérifie que le nom n'existe pas déjà
            else if (req.body.name) {
                const role = await RolesServices.getRoles({ name: req.body.name });
                if (role.length > 0) {
                    return res.status(409).json({ error: 'Ce rôle existe déjà' });
                }
            }

            const role = await RolesServices.createRoles(req.body);
            res.json(role);
        }
        catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

export default new RoleController();