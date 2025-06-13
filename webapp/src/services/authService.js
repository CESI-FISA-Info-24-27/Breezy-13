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
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Une erreur est survenue.' };
    }
}

export async function refreshToken() {
    try {
        const res = await axios.post(REFRESH_URL, {}, { withCredentials: true });
        const newToken = res.data.token;
        Cookies.set("token", newToken);
        return newToken;
    } catch {
        window.location.href = LOGIN_URL;
        throw new Error("Session expirée");
    }
}