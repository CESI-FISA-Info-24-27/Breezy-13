"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { getUsers } from "../src/services/UsersServices";

export const AuthContext = createContext({
  token: null,
  userId: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async (jwt, id) => {
    try {
      const data = await getUsers({ id });
      setUser(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Erreur récupération utilisateur", error);
      setUser(null);
    }
  }, []);

  const login = useCallback(
    async (jwt, id) => {
      setToken(jwt);
      setUserId(id);
      await fetchUser(jwt, id);
    },
    [fetchUser]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
