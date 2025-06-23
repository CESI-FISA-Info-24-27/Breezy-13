import express from 'express';
import MessagesController from '../Controller/MessagesController.js';
import fieldsRequired from '../Middlewares/RequiredFields.js';

/**
 * Représente un chemin pour les messages
 * @class messagePath
 */

/**
 * @constant {Router} messagePath
 * @description Routeur Express utilisé pour gérer les routes liées aux opérations de messages privés.
 */
const messagePath = express.Router();

/**
 * Obtenir les messages selon des filtres (ex: conversation entre deux utilisateurs).
 */
messagePath.get('/', MessagesController.getMessages);

/**
 * Créer un nouveau message (texte ou image).
 */
messagePath.post('/', fieldsRequired(["from", "to", "content"]), MessagesController.createMessage);

/**
 * Mettre à jour un message (ex: marquer comme lu).
 */
messagePath.patch('/:id', fieldsRequired(["read"]), MessagesController.updateMessage);

/**
 * Supprimer un message.
 */
messagePath.delete('/:id', MessagesController.deleteMessage);

export default messagePath;