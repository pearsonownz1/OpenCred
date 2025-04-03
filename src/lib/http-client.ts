import axios from 'axios';
import { supabase } from '@/lib/supabase';

// Create a base axios instance
export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor to add the auth token
httpClient.interceptors.request.use(
  async (config) => {
    // Get the session from Supabase
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh if needed
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get a fresh session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const newToken = session?.access_token;

        if (newToken) {
          // Update the failed request with the new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return httpClient(originalRequest);
        }
      } catch (err) {
        console.error('Error refreshing auth token:', err);
      }
    }

    return Promise.reject(error);
  }
);
