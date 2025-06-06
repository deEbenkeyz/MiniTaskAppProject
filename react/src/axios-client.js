import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const { response } = error;
  if (response?.status === 401) {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/login"; // redirect to login
  }

  // Reject the promise so `.catch()` gets called
  return Promise.reject(error);
});

export default axiosClient;
