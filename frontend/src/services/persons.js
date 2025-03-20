import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const baseUrl = '/api/persons';
const api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(config => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedPhoneappUser'));
    if (loggedUser?.token) {
        config.headers.Authorization = `Bearer ${loggedUser.token}`;
    }
    return config;
});

const setToken = newToken => {
    // dont need this anymore since were using the interceptor
    // kept for compatibility
    if (newToken) {
        localStorage.setItem('loggedPhoneappUser', JSON.stringify({ token: newToken }));
    }
};

const getUserContacts = async () => {
    try {
        const response = await api.get('/');  //use the api instance
        return response.data;
    } catch(error) {
        console.error('Error fetching user contacts:', error);
        throw error;
    }
};

const create = async (newPerson) => {
    const response = await api.post('/', { 
        name: newPerson.name, 
        number: newPerson.number 
    });
    return response.data;
};

const update = (id, updatedPerson) => {
    return api.put(`/${id}`, updatedPerson)
        .then(response => response.data);
};

const delEntry = (id) => {
    return api.delete(`/${id}`);
};

export default { create, update, delEntry, setToken, getUserContacts };