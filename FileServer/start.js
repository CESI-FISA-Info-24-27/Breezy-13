import app from './server.js';

const PORT = process.env.PORT;

// On lance le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur de fichiers démarré sur http://localhost:${PORT}`);
});