import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

// Attach token to every request automatically
API.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ─── Auth ────────────────────────────────────────────────────────
export async function adminLogin(credentials) {
    const response = await API.post('/admin/login', credentials);
    return response.data;
}

// ─── Clients ─────────────────────────────────────────────────────
export async function getClients() {
    const response = await API.get('/admin/clients');
    return response.data;
}

export async function registerClient(data) {
    const response = await API.post('/admin/clients', data);
    return response.data;
}

export async function deleteClient(clientId) {
    const response = await API.delete(`/admin/clients/${clientId}`);
    return response.data;
}

// ─── Users ───────────────────────────────────────────────────────
export async function getUsers() {
    const response = await API.get('/admin/users');
    return response.data;
}

export async function toggleUser(userId) {
    const response = await API.patch(`/admin/users/${userId}/toggle`);
    return response.data;
}