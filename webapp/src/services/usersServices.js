import axios from "axios";
import Cookies from "js-cookie";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { refreshToken } from "./authServices";
=======
import { refreshToken } from "./authService";
>>>>>>> 8f8223d (Ajout des services pour les requetes http à l'API)
=======
import { refreshToken } from "./AuthService";
>>>>>>> a177e93 (feat : fix pour le merge)
=======
import { refreshToken } from "./AuthService";
>>>>>>> 7ea8f23 (feat : fix pour le merge)

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

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

<<<<<<< HEAD
export async function getUsers(filters = {}) {
  // Nettoie les filtres pour ne garder que les valeurs définies et non vides
  const params = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );

  return withAuthRetry(headers =>
    axios.get(API_URL, { headers, params }).then(res => res.data)
=======
export async function getUsers() {
  return withAuthRetry(headers =>
    axios.get(API_URL, { headers }).then(res => res.data)
>>>>>>> 8f8223d (Ajout des services pour les requetes http à l'API)
  );
}

export async function createUser(user) {
  return withAuthRetry(headers =>
    axios.post(API_URL, user, { headers }).then(res => res.data)
  );
}

export async function updateUser(id, user) {
  return withAuthRetry(headers =>
    axios.patch(`${API_URL}/${id}`, user, { headers }).then(res => res.data)
  );
}

export async function deleteUser(id) {
  return withAuthRetry(headers =>
    axios.delete(`${API_URL}/${id}`, { headers }).then(res => res.data)
  );
}