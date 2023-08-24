import axios, { AxiosRequestConfig } from "axios";

// Define the base API URL
const API_BASE_URL = "http://localhost:5001/api";

// Define an interface for custom request options
interface ApiRequestOptions extends AxiosRequestConfig {
    headers: {
        Authorization: string;
    };
    method: "GET" | "POST";
}

/**
 * Performs an authenticated API request with Axios.
 *
 * @param {string} url - The API endpoint URL.
 * @param {ApiRequestOptions} options - Optional request options respecting the ApiRequestOptions interface.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const apiRequest = async (url: string, options?: ApiRequestOptions) => {
    try {
        // Perform the API request using Axios
        const response = await axios(`${API_BASE_URL}${url}`, {
            ...options,
        });

        // Return the response data
        return response.data;
    } catch (error: any) {
        // Propagate the error
        throw error;
    }
};
