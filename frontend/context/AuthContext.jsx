import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL, LOGIN_URL, API_TOKEN } from "../constants/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const api = axios.create({ baseURL: BASE_API_URL });
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem("token") || null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    api.interceptors.request.use((config) => {
      token && (config.headers.Authorization = `Bearer ${token}`);
      config.headers["X-Api-Token"] = API_TOKEN;
      return config;
    },(error) => Promise.reject(error));
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post(LOGIN_URL, { email, password });
    setToken(res.data.token);
    setUser(res.data.user_guid);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
