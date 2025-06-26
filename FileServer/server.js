import express from 'express';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import Jwt from 'jsonwebtoken';
import cors from 'cors';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));

// Middleware d'authentification avec support des tokens temporaires
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    let token = null;
    let isTempToken = false;

    if (authHeader) {
        token = authHeader.split(' ')[1];
    }

    // Vérifier si c'est un token temporaire (pour upload d'avatar pendant inscription)
    const tempToken = req.headers['x-temp-token'];
    const userId = req.headers['x-user-id'];

    if (tempToken && userId) {
        // Vérification du token temporaire
        if (verifyTempUploadToken(tempToken, userId)) {
            req.user = { id: userId, isTempUser: true };
            return next();
        } else {
            return res.status(401).json({ error: 'Token temporaire invalide ou expiré.' });
        }
    }

    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé. Token manquant.' });
    }

    Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalide.' });
        }

        req.user = decoded;
        next();
    });
};

// Fonction pour vérifier les tokens temporaires
function verifyTempUploadToken(token, userId) {
    try {
        // Cette fonction doit être cohérente avec celle du VerificationServices
        for (let i = 0; i < 30; i++) {
            const testTime = Math.floor(Date.now() / 1000) - (60 * i);
            const payload = {
                userId,
                type: 'temp_upload',
                exp: testTime + (60 * 30)
            };
            
            const testToken = require('crypto').createHmac('sha256', process.env.JWT_SECRET)
                .update(JSON.stringify(payload))
                .digest('hex');
                
            if (token === testToken && testTime + (60 * 30) > Math.floor(Date.now() / 1000)) {
                return true;
            }
        }
        return false;
    } catch (error) {
        return false;
    }
}

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier où les fichiers seront stockés
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nom unique pour chaque fichier
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50 Mo par fichier
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Seuls les fichiers images et vidéos sont autorisés.'));
        }
    }
});

// Middleware pour servir les fichiers statiques
app.use('/uploads', authenticateUser, express.static('uploads'));

// Endpoint pour télécharger un fichier (authentifié)
app.post('/upload', authenticateUser, upload.single('file'), (req, res) => {
    try {
        res.status(200).json({
            message: 'Fichier téléchargé avec succès.',
            filePath: `/uploads/${req.file.filename}`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint pour télécharger plusieurs fichiers (authentifié)
app.post('/upload-multiple', authenticateUser, upload.array('files', 5), (req, res) => {
    try {
        const filePaths = req.files.map(file => `/uploads/${file.filename}`);
        res.status(200).json({
            message: 'Fichiers téléchargés avec succès.',
            filePaths: filePaths
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint pour récupérer un fichier spécifique (authentifié)
app.get('/files/:filename', authenticateUser, (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).json({ error: 'Fichier non trouvé.' });
        }
    });
});

export default app;