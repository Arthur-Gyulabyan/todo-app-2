const API_BASE_URL = "/api/v1";

interface RequestOptions extends RequestInit {
  data?: unknown;
}

async function apiFetch<T>(
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
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || "An unexpected error occurred.");
  }

  // Handle cases where the response might not have a body (e.g., DELETE success)
  if (response.status === 204 || response.headers.get("Content-Length") === "0") {
    return null as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, "data">) =>
    apiFetch<T>("GET", path, options),
  post: <T>(path: string, data: unknown, options?: RequestOptions) =>
    apiFetch<T>("POST", path, { ...options, data }),
  put: <T>(path: string, data: unknown, options?: RequestOptions) =>
    apiFetch<T>("PUT", path, { ...options, data }),
  delete: <T>(path: string, data?: unknown, options?: RequestOptions) =>
    apiFetch<T>("POST", path, { ...options, data }), // OpenAPI spec uses POST for delete-todo
};