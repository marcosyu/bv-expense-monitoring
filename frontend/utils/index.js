import React from 'react';
import cookie from 'cookie';
import Axios from 'axios';
import { API_URL } from '../constants';
import defaultTheme from '../components/themes/default';

export function userFromCookie(req) {
  const raw = cookie.parse(
    req ? req.headers.cookie || '' : document.cookie
  ).nextRailsUser;
  if (!raw) return null;
  return JSON.parse(raw);
}

export const ThemeContext = React.createContext({ theme: defaultTheme });

function authRequestInterceptor(config) {
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
