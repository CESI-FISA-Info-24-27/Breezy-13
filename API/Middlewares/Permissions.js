import permissions from "../Middlewares/PermissionsParam.js";

/**
 * Vérifie si un utilisateur dispose des permissions requises pour un chemin et une méthode donnés.
 * @param {Array<string>} userRoles - Les rôles de l'utilisateur.
 * @param {string} path - Le chemin pour lequel vérifier les permissions.
 * @param {string} method - La méthode HTTP pour laquelle vérifier les permissions.
 * @returns {boolean} - True si l'utilisateur dispose des permissions requises, false sinon.
 */
function hasRequiredPermissions(userRole, path, method) {
    // Si l'utilisateur est un administrateur, il a toutes les permissions
    if (userRole == 'admin') {
        return true;
    }

    // Vérifie si le rôle de l'utilisateur existe dans les permissions
    if (!permissions[userRole]) {
        return false;
    }

    // Si le chemin n'existe pas pour le rôle de l'utilisateur, il n'a pas la permission
    if (!permissions[userRole][path]) {
        return false;
    }

    // Si la méthode n'existe pas pour le chemin du rôle de l'utilisateur, il n'a pas la permission
    if (!permissions[userRole][path][method]) {
        return false;
    }
    
    return true;
}

export default hasRequiredPermissions;