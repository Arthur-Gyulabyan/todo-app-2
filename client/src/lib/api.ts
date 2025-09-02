import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/v1', // Matches the server URL in the OpenAPI spec
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add an interceptor for generic error handling if needed,
// but for this scope, TanStack Query's error handling is often sufficient.