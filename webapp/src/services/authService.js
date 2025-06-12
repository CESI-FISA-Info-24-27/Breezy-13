import axios from 'axios';

export async function login(email, password, rememberMe = false) {
    try {
        const response = await axios.post('/api/auth', {
            email,
            password,
            rememberMe
        });
        return response.data;
    } catch (error) {
        // Gérer les erreurs (important pour la production)
        throw error.response?.data || { message: 'Une erreur est survenue.' };
    }
}