import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "./authServices";

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

export async function getFile(fileName) {
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