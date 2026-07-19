import api from './api';
import type { AuthUser, ApiEnvelope } from '../types';

export const loginRequest = async (email: string, password: string) => {
  const res = await api.post<ApiEnvelope<{ token: string; user: AuthUser }>>('/auth/login', {
    email,
    password,
  });
  return res.data.data;
};

export const logoutRequest = async () => {
  await api.post('/auth/logout');
};

export const getMeRequest = async () => {
  const res = await api.get<ApiEnvelope<AuthUser>>('/auth/me');
  return res.data.data;
};
