import axios from "axios";
import Cookies from "js-cookie";
<<<<<<< HEAD
import { refreshToken } from "./AuthServices";
=======
import { refreshToken } from "./authService";
>>>>>>> 8f8223d (Ajout des services pour les requetes http à l'API)

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/follows`;

function getAuthHeader() {
  const token = Cookies.get("token") || localStorage.getItem("token");
  return token ? { Authorization: `${token}` } : {};
}

async function withAuthRetry(requestFn) {
  try {
    return await requestFn(getAuthHeader());
  } catch (err) {
    if (err.response && err.response.status === 401) {
      const newToken = await refreshToken();
      return await requestFn({ Authorization: `${newToken}` });
    }
    throw err;
  }
}

export async function getFollows() {
  return withAuthRetry(headers =>
    axios.get(API_URL, { headers }).then(res => res.data)
  );
}