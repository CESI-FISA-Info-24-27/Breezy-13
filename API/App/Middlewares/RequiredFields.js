const fieldsRequired = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = [];

        try {
            // Vérifie chaque champ requis
            requiredFields.forEach((field) => {
                if (!req.body[field]) {
                    missingFields.push(field); // Ajoute le champ manquant au tableau
                }
            });

            // Si des champs sont manquants, renvoie une erreur 400
            if (missingFields.length > 0) {
                return res.status(400).json({
                    error: `Les champs suivants sont requis : ${missingFields.join(', ')}`
                });
            }

            next(); // Passe au middleware suivant si aucun champ n'est manquant
        } catch (err) {
            console.error(err); // Affiche l'erreur dans la console
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    };
};

export default fieldsRequired;