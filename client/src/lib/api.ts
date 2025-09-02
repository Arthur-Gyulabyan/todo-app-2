/**
 * @file src/lib/api.ts
 * @description Centralized API client for interacting with the backend.
 *              Uses a simple fetch wrapper. In a larger application, Axios or a more
 *              robust client with interceptors for auth, error handling, etc., would be used.
 */

const API_BASE_URL = "/api/v1";

interface ApiErrorResponse {
  message: string;
}

export const api = {
  /**
   * Performs a GET request.
   * @param path The API endpoint path (e.g., "/get-all-todos").
   * @param params Optional query parameters.
   * @returns A promise that resolves to the parsed JSON response.
   * @throws An error if the network request fails or the server responds with a non-OK status.
   */
  get: async <T>(path: string, params?: Record<string, any>): Promise<T> => {
    const url = new URL(`${API_BASE_URL}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
      const errorBody: ApiErrorResponse = await response.json();
      throw new Error(errorBody.message || `API GET error: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  },

  /**
   * Performs a POST request.
   * @param path The API endpoint path (e.g., "/create-todo").
   * @param body The request body to be sent as JSON.
   * @returns A promise that resolves to the parsed JSON response.
   * @throws An error if the network request fails or the server responds with a non-OK status.
   */
  post: async <T>(path: string, body: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorBody: ApiErrorResponse = await response.json();
      throw new Error(errorBody.message || `API POST error: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  },
};