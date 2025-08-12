// API Configuration
const API_BASE_URL = import.meta.env.PROD
    ? 'https://taskmanager-production-b8b8.up.railway.app'
    : 'http://localhost:5001';

export { API_BASE_URL };