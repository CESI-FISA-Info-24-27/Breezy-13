import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "./AuthServices";

const API_URL = process.env.NEXT_PUBLIC_FILE_SERVER_URL;

function getAuthHeader() {
  const token = Cookies.get("token") || localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function withAuthRetry(requestFn) {
  try {
    return await requestFn(getAuthHeader());
  } catch (err) {
    if (err.response && err.response.status === 401) {
      const newToken = await refreshToken();
      return await requestFn({ Authorization: `Bearer ${newToken}` });
    }
    throw err;
  }
}

// Fonction utilitaire pour vérifier si c'est une URL externe
export function isExternalUrl(url) {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
}

// Fonction utilitaire pour construire l'URL complète d'un fichier
export function getFileUrl(fileName) {
  if (!fileName) return '';
  
  // Si c'est déjà une URL complète (externe), la retourner telle quelle
  if (isExternalUrl(fileName)) {
    return fileName;
  }
  
  // Si c'est un fichier local, construire l'URL avec le serveur de fichiers
  return `${API_URL}/files/${fileName}`;
}

export async function getFile(fileName) {
  // Si c'est une URL externe (Giphy, etc.), la retourner directement
  if (isExternalUrl(fileName)) {
    return fileName;
  }
  
  // Si c'est un fichier local, utiliser l'authentification
  return withAuthRetry(headers =>
    axios.get(`${API_URL}/files/${fileName}`, { headers, responseType: 'blob' })
      .then(res => res.data)
  );
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  return withAuthRetry(headers =>
    axios.post(`${API_URL}/upload`, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data)
  );
}
