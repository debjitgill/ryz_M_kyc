import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../constants/constants";
import useSessionStorage from "./useSession";
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useSessionStorage("token", "");
  const postData = async (
    url,
    data,
    isPatch = false,
    headers = {},
    BASE_URL = API_ENDPOINT
  ) => {
    setLoading(true);
    setError(null);
    try {
      if (token) {
        headers["xuserid"] = `${token}`;
      }

      // const formData = new FormData();
      // for (const key in data) {
      //   if (data.hasOwnProperty(key)) {
      //     if (data[key] instanceof File) {
      //       formData.append(key, data[key]);
      //     } else {
      //       formData.append(key, JSON.stringify(data[key]));
      //     }
      //   }
      // }

      const response = await fetch(`${BASE_URL}${url}`, {
        method: `${isPatch ? "PATCH" : "POST"}`,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        sessionStorage.removeItem("token");
      }

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = await response.json();
      // Save userid in session storage
      if (result?.userid) {
        setToken(result?.userid ?? "");
        // sessionStorage.setItem("token", result?.userid);
      }
      return result;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (url, headers = {}, BASE_URL = API_ENDPOINT) => {
    setLoading(true);
    setError(null);
    try {
      if (token) {
        headers["xuserid"] = token;
      }
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        headers: { ...headers },
      });

      if (response.status === 401 || response.status === 400) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("kycStatus");
      }

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, postData, fetchData };
};

export default useApi;
