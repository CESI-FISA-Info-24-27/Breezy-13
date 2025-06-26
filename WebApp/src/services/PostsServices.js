import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "./AuthServices";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/posts`;

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
      return await requestFn({ Authorization: `${newToken}` });
    }
    throw err;
  }
}

export async function getPosts(filters) {
  const params = filters ? Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  ) : {};
  return withAuthRetry(headers =>
    axios.get(API_URL, { headers, params }).then(res => res.data)
  );
}

export async function createPost(post) {
  return withAuthRetry(headers =>
    axios.post(API_URL, post, { headers }).then(res => res.data)
  );
}

export async function updatePost(id, post) {
  return withAuthRetry(headers =>
    axios.patch(`${API_URL}/${id}`, post, { headers }).then(res => res.data)
  );
}

export async function deletePost(id) {
  return withAuthRetry(headers =>
    axios.delete(`${API_URL}/${id}`, { headers }).then(res => res.data)
  );
}
