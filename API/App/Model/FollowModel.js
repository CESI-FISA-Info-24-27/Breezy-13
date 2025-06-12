/**
 * Modèle représentant une relation de suivi.
 * 
 * @export
 * @class followModel
 * @param {Object} params - Les paramètres pour initialiser le modèle.
 * @param {string} params._id - L'identifiant unique (ObjectId).
 * @param {string} params.follower - L'identifiant de l'utilisateur qui suit.
 * @param {string} params.following - L'identifiant de l'utilisateur suivi.
 * @param {Date} params.createdAt - La date de création de la relation.
 */
export default class followModel {
    constructor({_id, follower, following, createdAt}) {
        this._id = _id;
        this.follower = follower;
        this.following = following;
        this.createdAt = createdAt;
    }
}
