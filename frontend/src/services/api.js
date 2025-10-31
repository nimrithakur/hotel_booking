import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// Hotel API
export const hotelAPI = {
  search: (params) => api.get('/hotels/search', { params }),
  getById: (id) => api.get(`/hotels/${id}`),
  getAll: (params) => api.get('/hotels', { params }),
};

// Booking API
export const bookingAPI = {
  create: (bookingData) => api.post('/bookings/', bookingData),
  getMyBookings: () => api.get('/bookings/my-bookings'),
  cancel: (bookingId) => api.put(`/bookings/${bookingId}/cancel`),
  getById: (bookingId) => api.get(`/bookings/${bookingId}`),
};

export default api;
