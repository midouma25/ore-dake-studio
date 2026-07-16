// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // تأكد أن هذا هو بورت الخادم الخاص بك
});

// إضافة التوكن تلقائياً لأي طلب يحتاجه
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ore_dake_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;