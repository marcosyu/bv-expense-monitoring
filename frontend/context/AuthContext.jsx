import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  BASE_API_URL,
  LOGIN_URL,
  API_TOKEN,
  SIGN_UP_URL,
} from "../constants/index";

const AuthContext = createContext(null);

const api = axios.create({ baseURL: BASE_API_URL });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Invalid user in localStorage", e);
        }
      }
      if (storedToken) setToken(storedToken);
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user, hydrated]);

  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers["X-Api-Token"] = API_TOKEN;
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => {
      api.interceptors.request.eject(reqInterceptor);
    };
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post(LOGIN_URL, { email, password });
    setToken(res.data.token);
    setUser(res.data.user_id);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const signup = async (userParams, callback) => {
    const res = await api.post(SIGN_UP_URL, userParams);
    if (callback) callback(res);
    return res;
  };

  if (!hydrated) return null;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
