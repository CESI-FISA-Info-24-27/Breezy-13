import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "./AuthServices";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/follows`;

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

export async function getFollows(filters) {
  const params = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );
  return withAuthRetry(headers =>
    axios.get(API_URL, { headers, params }).then(res => res.data)
  );
}

export async function getFollowsFrom(id) 
{
  let params = { following: id };
  return withAuthRetry(headers =>
    axios.get(API_URL, { headers, params }).then(res => res.data)
  );
}

export async function createFollow(follow) {
  return withAuthRetry(headers =>
    axios.post(API_URL, follow, { headers }).then(res => res.data)
  );
}

export async function deleteFollow(id) 
{
  return withAuthRetry(headers =>
    axios.delete(`${API_URL}/${id}`, { headers }).then(res => res.data)
  );
}