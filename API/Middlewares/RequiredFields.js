const fieldsRequired = () => {
    return async (request, response, next) => {

        // Tableau pour stocker les champs manquants
        const missingFields = [];

        try {
            // Vérifie chaque champ requis
            fieldsRequired.forEach((field) => {
                if (!request.body[field]) {
                    missingFields.push(field);  // Ajoute le champ manquant au tableau
                }
            });

            // Si des champs sont manquants, renvoie une erreur 400
            if (missingFields.length > 0) {
                return response.status(400).json({
                    error: `Les champs suivants sont requis : ${missingFields.join(', ')}`  // Affiche les champs manquants
                });
            }

            next();  // Passe au middleware suivant si aucun champ n'est manquant

        } catch(err) {
            console.error(err);  // Affiche l'erreur dans la console
            return response.status(500).json({ error: 'Internal server error' });  // Renvoie une erreur 500 si une exception est levée
        }
    };
};

export default fieldsRequired;