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
 * @param {Date} params.createdAt - La date de création.
 * @param {Date} params.updatedAt - La date de dernière mise à jour.
 */
export default class userModel {
    constructor({_id, username, email, password, avatar, bio, createdAt, updatedAt}) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.bio = bio;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
