// frontend/src/store/authStore.js
import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('ore_dake_token') || null,
  isLoading: false,
  error: null,

  register: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/auth/register', { username, email, password });
      set({ isLoading: false });
      return true; // نجاح التسجيل
    } catch (error) {
      set({ error: error.response?.data?.message || 'خطأ في التسجيل', isLoading: false });
      return false;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('ore_dake_token', token);
      set({ user, token, isLoading: false });
      return true; // نجاح الدخول
    } catch (error) {
      set({ error: error.response?.data?.message || 'بيانات الدخول غير صحيحة', isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('ore_dake_token');
    set({ user: null, token: null });
  }
}));

export default useAuthStore;