/**
 * Modèle représentant un rôle.
 * 
 * @export
 * @class rolesModel
 * @param {Object} params - Les paramètres pour initialiser le modèle.
 * @param {number} params.role_id - L'identifiant unique du rôle.
 * @param {string} params.name - Le nom du rôle.
 */
export default class rolesModel {
    constructor({role_id, name}) {
        this.role_id = role_id;
        this.name = name;
    }
}