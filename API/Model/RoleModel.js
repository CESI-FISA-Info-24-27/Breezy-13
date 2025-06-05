/**
 * Modèle représentant un rôle.
 * 
 * @export
 * @class RoleModel
 * @param {Object} params - Les paramètres pour initialiser le modèle.
 * @param {string} params.name - Le nom du rôle.
 * @param {string|Object} params.permissions - Les permissions du rôle (peut être "all" ou un objet détaillé).
 */
export default class RoleModel {
    constructor({_id, name, permissions }) {
        this._id = _id;
        this.name = name;
        this.permissions = permissions;
    }
}