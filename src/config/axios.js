import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api'
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
});

instance.interceptors.response.use(
    response => response,
    error => {
        const {
            response: { status, data }
        } = error;

        if (status === 401 && data.error === 'Token Expired') {
            window.location.reload();
        }

        return Promise.reject(error);
    }
);

export default instance;
