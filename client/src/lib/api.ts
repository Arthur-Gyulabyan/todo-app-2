/**
 * A simple fetch-based API client for interacting with the Todo API.
 * Handles JSON serialization/deserialization and basic error checking.
 */

const API_BASE_URL = "/api/v1"; // Matches the server URL from OpenAPI spec

interface RequestOptions extends RequestInit {
  data?: any;
}

async function request<T>(
  method: string,
  path: string,
  options?: RequestOptions
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  const config: RequestInit = {
    method,
    headers,
    ...options,
  };

  if (options?.data) {
    config.body = JSON.stringify(options.data);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
  }

  // Handle cases where response might not have a body (e.g., 204 No Content)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as T;
  }
  return null as T; // Return null for no content
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options),
  post: <T>(path: string, data: any, options?: RequestOptions) =>
    request<T>("POST", path, { ...options, data }),
  put: <T>(path: string, data: any, options?: RequestOptions) =>
    request<T>("PUT", path, { ...options, data }),
  delete: <T>(path: string, data: any, options?: RequestOptions) =>
    request<T>("POST", path, { ...options, data }), // OpenAPI spec uses POST for delete
  patch: <T>(path: string, data: any, options?: RequestOptions) =>
    request<T>("PATCH", path, { ...options, data }),
};