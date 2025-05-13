import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useStore } from '../store/useStore';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = useStore.getState().token;
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      useStore.getState().setAuth(null);
    }
    return Promise.reject(error);
  }
);

// API methods
export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config).then(response => response.data),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.post<T>(url, data, config).then(response => response.data),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.put<T>(url, data, config).then(response => response.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config).then(response => response.data),
};

export default apiService;
