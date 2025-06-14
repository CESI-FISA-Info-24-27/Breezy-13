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