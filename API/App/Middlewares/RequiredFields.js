const fieldsRequired = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = [];

        try {
            requiredFields.forEach((field) => {
                // Exception : password n'est requis que pour POST (création)
                if (
                    field === "password" &&
                    req.method !== "POST" // PATCH ou PUT : password optionnel
                ) {
                    return;
                }
<<<<<<< HEAD
                // Exception : role_id n'est pas requis pour PATCH sur /users
                if (
                    field === "role_id" &&
                    req.method === "PATCH" &&
                    req.path.startsWith("/users")
                ) {
                    return;
                }
=======
>>>>>>> 5d7dcf3 (fix: Correction pour éviter d'avoir de passer le mdp obligatoirement lors d'un patch)
                if (!req.body[field]) {
                    missingFields.push(field);
                }
            });

            if (missingFields.length > 0) {
                return res.status(400).json({
                    error: `Les champs suivants sont requis : ${missingFields.join(', ')}`
                });
            }

            next();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    };
};

export default fieldsRequired;