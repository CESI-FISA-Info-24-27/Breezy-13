/**
 * Modèle représentant un utilisateur.
 * 
 * @export
 * @class userModel
 * @param {Object} params - Les paramètres pour initialiser le modèle.
 * @param {string} params._id - L'identifiant unique (ObjectId).
 * @param {string} params.username - Le nom d'utilisateur.
 * @param {string} params.email - L'email unique.
 * @param {string} params.password - Le mot de passe hashé.
 * @param {string} params.avatar - L'URL de l'avatar.
 * @param {string} params.bio - La bio.
 * @param {number} params.role_id - L'identifiant du rôle.
 * @param {Date} params.createdAt - La date de création.
 * @param {Date} params.updatedAt - La date de dernière mise à jour.
 */
export default class userModel {
    constructor({_id, username, password, email, avatar, bio, role_id, createdAt, updatedAt}) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.avatar = avatar;
        this.bio = bio;
        this.role_id = role_id; // Ajout du champ role_id
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}