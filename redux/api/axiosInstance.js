import axios from 'axios';
import localStorage from '../../components/utils/localStorage';

const axiosInstance = axios.create({
  baseURL: "https://gprglhk7-4000.inc1.devtunnels.ms",
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem('userToken');
  if (token) {
    config.headers['token'] = token;
  }
  return config;
}, (error) => Promise.reject(error));

export default axiosInstance;
