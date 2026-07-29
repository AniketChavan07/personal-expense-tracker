import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Automatically append /api if the user forgot it in their Vercel settings
if (!baseURL.endsWith('/api') && !baseURL.endsWith('/api/')) {
  baseURL = baseURL.replace(/\/$/, '') + '/api';
}

const api = axios.create({
  baseURL,
});

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;
