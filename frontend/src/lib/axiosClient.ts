import axios, { AxiosInstance } from "axios";
import { clearToken, getAccessToken, updateAccessToken } from "./tokenStorage";

const axiosClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const setupInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshRefresh = await axiosClient.post("/refresh");

          const newAccessToken = refreshRefresh.data.accessToken;

          updateAccessToken(newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return client(originalRequest);
        } catch (e) {
          clearToken();
          throw new Error(e as string);
        }
      }
      return Promise.reject(error);
    },
  );
};

setupInterceptors(axiosClient);

export default axiosClient;
