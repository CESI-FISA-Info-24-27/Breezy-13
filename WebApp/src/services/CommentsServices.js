import axios from "axios";
import Cookies from "js-cookie";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import { refreshToken } from "./AuthService";
>>>>>>> d1f66a5 (feat : modification des noms des routes pour avoir une bonne nomenclature de projet (PascalCase pour les composants / services / noms de dossiers principaux des différentes apps + kebab-case pour les pages))
=======
import { refreshToken } from "./AuthServices";
>>>>>>> 399dbca (feat : Mise en place des tests unitaires sur la web app #42)
=======
<<<<<<< HEAD:WebApp/src/services/CommentsServices.js
import { refreshToken } from "./AuthServices";
=======
import { refreshToken } from "./AuthService";
>>>>>>> f818b6b (feat : fix pour le merge):webapp/src/services/commentsServices.js
>>>>>>> 02ede59 (feat : fix pour le merge)

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/comments`;

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

export async function getComments() {
  return withAuthRetry(headers =>
    axios.get(API_URL, { headers }).then(res => res.data)
  );
}

export async function createComment(comment) {
  return withAuthRetry(headers =>
    axios.post(API_URL, comment, { headers }).then(res => res.data)
  );
}

export async function updateComment(id, comment) {
  return withAuthRetry(headers =>
    axios.patch(`${API_URL}/${id}`, comment, { headers }).then(res => res.data)
  );
}

export async function deleteComment(id) {
  return withAuthRetry(headers =>
    axios.delete(`${API_URL}/${id}`, { headers }).then(res => res.data)
  );
}
