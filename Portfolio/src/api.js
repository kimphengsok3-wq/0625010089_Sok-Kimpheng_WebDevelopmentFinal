// This file holds the base URL of your backend API.
// Locally it points to your own computer (localhost).
// After we deploy in Phase 8, we'll change this one line to your live backend URL.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
