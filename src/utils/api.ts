/**
 * Generic API utility for handling HTTP requests
 * Provides centralized error handling, loading states, and request management
 */

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export class ApiException extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.code = code;
  }
}

/**
 * Generic fetcher function for API calls
 * @param url - API endpoint URL
 * @param options - Fetch options (method, headers, body, etc.)
 * @returns Promise with typed response data
 */
export async function fetcher<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  // Simulate API delay for better UX demonstration
  await new Promise(resolve => setTimeout(resolve, 800));

  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    // Handle HTTP errors
    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status}`;
      
      switch (response.status) {
        case 400:
          errorMessage = 'Bad request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please log in again.';
          break;
        case 403:
          errorMessage = 'Access forbidden. You don\'t have permission.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 503:
          errorMessage = 'Service unavailable. Please try again later.';
          break;
        default:
          errorMessage = `Request failed with status ${response.status}`;
      }

      throw new ApiException(errorMessage, response.status, 'HTTP_ERROR');
    }

    // Parse JSON response
    const data = await response.json();
    console.log(data.data);
    return data.data;

  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiException(
        'Network error. Please check your internet connection.',
        0,
        'NETWORK_ERROR'
      );
    }

    // Handle timeout errors
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiException(
        'Request timeout. Please try again.',
        0,
        'TIMEOUT_ERROR'
      );
    }

    // Re-throw ApiException as-is
    if (error instanceof ApiException) {
      throw error;
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      throw new ApiException(
        'Invalid response format from server.',
        0,
        'PARSE_ERROR'
      );
    }

    // Handle unknown errors
    throw new ApiException(
      error instanceof Error ? error.message : 'An unexpected error occurred.',
      0,
      'UNKNOWN_ERROR'
    );
  }
}


// Read API base URL from Vite env var (client-visible vars must start with VITE_).
// Example: VITE_API_BASE_URL=http://127.0.0.1:3000/api/v1
export const API_BASE_URL: string = (import.meta as any).env?.VITE_API_BASE_URL || 'http://127.0.0.1:3000/api/v1';

/**
 * Helper function to build API URLs
 */
export function buildApiUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}

/**
 * Fetch all paginated results from an offset/limit style API.
 * Repeats requests until pagination.hasNext is false (when provided by API)
 * or until a page returns fewer items than `limit`.
 * Returns the concatenated items and the last pagination object (if any).
 */
export async function fetchAllPages<T = any>(
  endpoint: string,
  options?: { limit?: number; sort?: string; order?: string }
): Promise<{ items: T[]; pagination?: any }> {
  const limit = options?.limit ?? 50;
  const sort = options?.sort ?? 'created_at';
  const order = options?.order ?? 'desc';

  let offset = 0;
  const items: T[] = [];
  let lastPagination: any = undefined;

  while (true) {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      sort,
      order,
    });

    const url = `${buildApiUrl(endpoint)}?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      let message = `HTTP Error: ${response.status}`;
      try {
        const errBody = await response.json();
        if (errBody && errBody.message) message = String(errBody.message);
      } catch (e) {
        // ignore
      }
      throw new ApiException(message, response.status, 'HTTP_ERROR');
    }

    const body = await response.json();
    const pageData: T[] = Array.isArray(body?.data) ? body.data : [];
    const pagination = body?.pagination;

    items.push(...pageData);
    lastPagination = pagination;

    if (pagination) {
      if (!pagination.hasNext) break;
      if (typeof pagination.pageSize === 'number' && typeof pagination.page === 'number') {
        offset = pagination.page * pagination.pageSize;
      } else {
        offset += pageData.length || limit;
      }
    } else {
      if (pageData.length < limit) break;
      offset += pageData.length || limit;
    }
  }

  return { items, pagination: lastPagination };
}