import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  if (typeof window === 'undefined')  return
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  // Setup axios interceptor
  useEffect(() => {
    const instance = axios.create();

    instance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Replace axios default instance with this one
    axios.defaults = instance.defaults;
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}login`, { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);

    // Optional: fetch user details after login
    const userRes = await axios.get("https://your-api.com/me");
    setUser(userRes.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
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
