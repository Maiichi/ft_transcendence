import { useCallback, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux";

interface ApiRequestOptions extends AxiosRequestConfig {
  headers: {
    Authorization: string;
  };
  method: "GET" | "POST";
}

const useApiRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api";

  const apiRequest = async (url: string, options?: ApiRequestOptions) => {
    try {
      console.log("TOKEN", token);
      setIsLoading(true);
      const response = await axios(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        // Handle 401 unauthorized response
        navigate("/login");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return { apiRequest, isLoading };
};

export default useApiRequest;
