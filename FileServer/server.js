import express from 'express';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import Jwt from 'jsonwebtoken';
import cors from 'cors';
import crypto from 'crypto';
import fetch from 'node-fetch';
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

// Fonction pour vérifier les tokens temporaires (identique à VerificationServices)
function verifyTempUploadToken(token, userId) {
    try {
        // Vérification approximative pour les 5 dernières minutes (plus permissive)
        for (let i = 0; i < 300; i++) { // 300 secondes = 5 minutes
            const testTime = Math.floor(Date.now() / 1000) - i;
            const testPayload = {
                userId,
                type: 'temp_upload',
                exp: testTime + (60 * 30)
            };
            
            const testToken = crypto.createHmac('sha256', process.env.JWT_SECRET)
                .update(JSON.stringify(testPayload))
                .digest('hex');
                
            if (token === testToken) {
                // Vérifier si le token n'est pas expiré
                const isNotExpired = testTime + (60 * 30) > Math.floor(Date.now() / 1000);
                if (isNotExpired) {
                    console.log(`Token valide trouvé (décalage de ${i} secondes)`);
                    return true;
                }
            }
        }
        console.log('Aucun token correspondant trouvé');
        return false;
    } catch (error) {
        console.error('Erreur vérification token temporaire:', error);
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
            filePath: `/uploads/${req.file.filename}`,
            fileName: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint spécial pour l'upload d'avatar pendant l'inscription (sans authentification stricte)
app.post('/upload-avatar-registration', upload.single('file'), async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const tempToken = req.headers['x-temp-token'];
        
        if (!userId || !tempToken) {
            return res.status(400).json({ error: 'Headers x-user-id et x-temp-token requis' });
        }
        
        // Vérification simple du token temporaire
        if (!verifyTempUploadToken(tempToken, userId)) {
            return res.status(401).json({ error: 'Token temporaire invalide' });
        }
        
        const fileName = req.file.filename;
        const filePath = `/uploads/${fileName}`;
        
        // Mettre à jour l'avatar de l'utilisateur directement
        try {
            const response = await fetch('http://localhost:3000/users/update-avatar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    avatarPath: fileName  // Juste le nom du fichier, pas l'URL complète
                })
            });
            
            if (!response.ok) {
                console.error('Erreur mise à jour avatar:', await response.text());
            }
        } catch (updateError) {
            console.error('Erreur lors de la mise à jour de l\'avatar:', updateError);
        }
        
        res.status(200).json({
            message: 'Avatar uploadé et mis à jour avec succès.',
            filePath: filePath,
            fileName: fileName,
            avatarUrl: `http://localhost:5000/files/${fileName}`
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