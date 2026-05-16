import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true
});

export async function submitLogin(formData) {
  const params = new URLSearchParams(formData);
  const response = await API.post('/auth/authorize', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return response.data;
}

export async function registerUser(data) {
  const response = await API.post('/auth/register', data);
  return response.data;
}