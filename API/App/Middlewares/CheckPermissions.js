import Jwt from 'jsonwebtoken';
import UsersServices from '../Services/UsersServices.js';
import RolesServices from '../Services/RolesServices.js';

/**
 * Middleware pour vérifier les permissions d'accès d'un utilisateur.
 * 
 * Ce middleware extrait le jeton d'autorisation de l'en-tête de la requête,
 * vérifie sa validité, récupère les informations de l'utilisateur associé,
 * et détermine si l'utilisateur a les permissions nécessaires pour accéder
 * à la ressource demandée.
 * 
 * @returns {Function} Middleware Express qui gère la vérification des permissions.
 * 
 * @throws {Error} Renvoie une réponse HTTP avec un code d'erreur approprié :
 * - 401 : Si le jeton est manquant ou invalide, ou si l'utilisateur n'est pas trouvé.
 * - 403 : Si l'utilisateur n'a pas les permissions nécessaires pour accéder à la ressource.
 */
const checkPermissions = () => {
    return async (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ error: 'Token manquant' });
        }

        try {
            const decoded = Jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            const user = await UsersServices.getUsers({ id: decoded.id });
            if (user.length === 0) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }

            const userRole = user[0].role;
            const permissions = await RolesServices.getRolePermissions(userRole);

            if (permissions === 'all') {
                return next();
            }

            const pathPermissions = permissions[req.path];
            if (!pathPermissions || !pathPermissions[req.method]) {
                return res.status(403).json({ error: 'Accès interdit' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ error: 'Token invalide' });
        }
    };
};

export default checkPermissions;