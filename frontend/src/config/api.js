// API Configuration
const API_BASE_URL = import.meta.env.PROD
    ? 'https://task-manager-production-a32f.up.railway.app'
    : 'http://localhost:5001';

export { API_BASE_URL };