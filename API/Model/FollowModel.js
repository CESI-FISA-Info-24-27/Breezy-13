/**
 * Modèle représentant une relation de suivi.
 * 
 * @export
 * @class followModel
 * @param {Object} params - Les paramètres pour initialiser le modèle.
 * @param {string} params._id - L'identifiant unique (ObjectId).
 * @param {string} params.follower_id - L'identifiant de l'utilisateur qui suit.
 * @param {string} params.following_id - L'identifiant de l'utilisateur suivi.
 * @param {Date} params.createdAt - La date de création de la relation.
 */
export default class followModel {
    constructor({_id, follower_id, following_id, createdAt}) {
        this._id = _id;
        this.follower_id = follower_id;
        this.following_id = following_id;
        this.createdAt = createdAt;
    }
}
