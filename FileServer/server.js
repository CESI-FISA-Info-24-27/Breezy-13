import express from 'express';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import Jwt from 'jsonwebtoken';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:3001", // autorise ton front
    credentials: true
}));

app.use(cors({
    origin: "http://localhost:3001", // autorise ton front
    credentials: true
}));

// Middleware d'authentification
const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Utilisez 'authorization' en minuscules

    if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé. Token manquant.' });
    }

    Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalide.' });
        }

        req.user = decoded; // Ajoute les informations utilisateur au req
        next();
    });
};

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