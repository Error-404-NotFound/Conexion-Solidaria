import axios from 'axios';

const api = axios.create({
    baseURL: 'https://conexion-solidaria-backend.vercel.app' || 'http://localhost:3000', // Your API base URL
    withCredentials: true,  // Always send cookies with requests
});

export default api;
