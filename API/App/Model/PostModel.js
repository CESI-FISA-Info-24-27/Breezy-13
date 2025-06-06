/**
 * Modèle représentant un post.
 * 
 * @export
 * @class postModel
 * @param {Object} params - Les paramètres pour initialiser le modèle.
 * @param {string} params._id - L'identifiant unique (ObjectId).
 * @param {string} params.author - L'identifiant de l'auteur (référence à User).
 * @param {string} params.content - Le contenu du post.
 * @param {string} params.image - L'URL de l'image.
 * @param {string[]} params.likes - Liste des utilisateurs qui ont liké.
 * @param {Date} params.createdAt - La date de création.
 * @param {Date} params.updatedAt - La date de dernière mise à jour.
 */
export default class postModel {
    constructor({_id, author, content, image, likes = [], createdAt, updatedAt}) {
        this._id = _id;
        this.author = author;
        this.content = content;
        this.image = image;
        this.likes = likes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
