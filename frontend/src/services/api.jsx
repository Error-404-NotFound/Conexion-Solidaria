import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Your API base URL
    withCredentials: true,  // Always send cookies with requests
});

export default api;
