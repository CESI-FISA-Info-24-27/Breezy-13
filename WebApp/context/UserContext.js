"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
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

  // Fonction permettant de récupérer l'utilisateur à partir de l'id
  const fetchUser = useCallback(async (id) => {
    try {
      const data = await getUsers({ id });
      setUser(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Erreur récupération utilisateur", error);
      setUser(null);
    }
  }, []);

  // Use-Effect qui permet de récupérer l'utilisateur si jamais on a un userID
  useEffect(() => {
    if (userId) 
    {
      fetchUser(token, userId);
    } 
    else 
    {
      setUser(null);
    }
  }, [userId, fetchUser]);

  // Fonction permettant de se login
  const login = useCallback(
    async (jwt, id) => {
      setToken(jwt);
      setUserId(id);
      localStorage.setItem("token", jwt);
      localStorage.setItem("userId", id);
      await fetchUser(jwt, id);
    },
    [fetchUser]
  );

  // Fonction permettant de se logout
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }, []);

  // Mettre en place le statut initial (on récupère le token et le userId)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      login(storedToken, storedUserId);
    }
  }, [login]);
  
  return (
    <AuthContext.Provider value={{ token, userId, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}