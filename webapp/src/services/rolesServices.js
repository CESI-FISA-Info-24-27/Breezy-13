import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "./authService";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/roles`;

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

export async function getRoles() {
  return withAuthRetry(headers =>
    axios.get(API_URL, { headers }).then(res => res.data)
  );
}

export async function createRole(role) {
  return withAuthRetry(headers =>
    axios.post(API_URL, role, { headers }).then(res => res.data)
  );
}

export async function updateRole(id, role) {
  return withAuthRetry(headers =>
    axios.patch(`${API_URL}/${id}`, role, { headers }).then(res => res.data)
  );
}

export async function deleteRole(id) {
  return withAuthRetry(headers =>
    axios.delete(`${API_URL}/${id}`, { headers }).then(res => res.data)
  );
}