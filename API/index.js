// On récupère les variables d'environnements
const dotenv = require('dotenv');
dotenv.config();

// On met en place l'application
const express = require('express');
const app = express();
app.use(express.json());

// On écoute sur le bon port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
{
    console.log(`Listening on http://localhost:${PORT}`);
});

app.get('/test', (req, res) => 
{
    res.status(200).send(
    {
        message:"Easter-Egg : Vous avez trouvé une magnifique page !"
    });
})