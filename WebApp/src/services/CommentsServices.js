import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "./AuthServices";

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
      return await requestFn({ Authorization: `Bearer ${newToken}` });
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
