import axios from 'axios';
import Cookies from 'js-cookie';

const REFRESH_URL = process.env.NEXT_PUBLIC_REFRESH_URL;
const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL;


export async function login(email, password, rememberMe = false) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
            email,
            password,
            rememberMe
        });

        console.log('Connexion réussie:', response.data);

        // Stocke le token dans le cookie ici
        Cookies.set('token', response.data.token, {
            secure: true,
            sameSite: 'Lax',
            path: '/',
        });

        return response.data;
    } catch (error) {

        console.error('Erreur lors de la connexion :', error);
        throw error.response?.data || { message: 'Une erreur est survenue.' };
    }
}

export async function refreshToken() {
    try {
        const response = await axios.post(REFRESH_URL, { withCredentials: true });

        console.log('Connexion réussie:', response.data);
        
        // Stocke le token dans le cookie ici
        Cookies.set('token', response.data.token, {
            secure: true,
            sameSite: 'Lax',
            path: '/',
        });

        return response.data;
    } catch {
        window.location.href = LOGIN_URL;
        throw new Error("Session expirée");
    }
}
