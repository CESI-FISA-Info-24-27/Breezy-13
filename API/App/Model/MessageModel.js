/**
 * Représente un modèle de données pour un message utilisateur.
 * @class
 * @classdesc Modèle de données pour un message utilisateur.
 *
 * @param {Object} params - Les paramètres du message.
 * @param {string} params._id - Identifiant unique du message.
 * @param {string} params.from - Identifiant de l'expéditeur (référence à User).
 * @param {string} params.to - Identifiant du destinataire (référence à User).
 * @param {string} params.content - Contenu du message.
 * @param {Date} params.createdAt - Date de création du message.
 * @param {Date} params.updatedAt - Date de dernière mise à jour du message.
 * @param {boolean} [params.read=false] - Indique si le message a été lu.
 */
export default class messageModel {
    constructor({_id, from, to, content, createdAt, updatedAt, read = false}) {
        this._id = _id; 
        this.from = from; 
        this.to = to;
        this.content = content; 
        this.createdAt = createdAt;
        this.updatedAt = updatedAt; 
        this.read = read;
    }
}