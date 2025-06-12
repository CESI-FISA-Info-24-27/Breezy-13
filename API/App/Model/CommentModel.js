/**
 * Modèle représentant un commentaire.
 * 
 * @export
 * @class commentModel
 * @param {Object} params - Les paramètres pour initialiser le modèle.
 * @param {string} params._id - L'identifiant unique (ObjectId).
 * @param {string} params.author - L'identifiant de l'auteur (référence à User).
 * @param {string} params.post - L'identifiant du post (référence à Post).
 * @param {string} params.content - Le contenu du commentaire.
 * @param {string} [params.parentCommentId] - L'identifiant du commentaire parent (facultatif).
 * @param {string[]} [params.likes=[]] - Liste des utilisateurs qui ont liké le commentaire.
 * @param {Date} params.createdAt - La date de création.
 */
export default class commentModel {
    constructor({_id, author, postId, content, parentCommentId = null, likes = [], createdAt}) {
        this._id = _id;
        this.author = author;
        this.postId = postId;
        this.content = content;
        this.parentCommentId = parentCommentId;
        this.likes = likes;
        this.createdAt = createdAt;
    }
}