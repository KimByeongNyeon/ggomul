import { AxiosError } from "axios";

interface ApiErrorData {
  message?: string;
  error?: string;
  code?: string;
}

export const parseApiError = (
  error: unknown,
  fallback = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
): string => {
  if (!error) return fallback;

  const axiosErr = error as AxiosError<ApiErrorData>;

  if (axiosErr.response?.data) {
    const data = axiosErr.response.data;
    if (data.message) return data.message;
    if (data.error) return data.error;
  }

  if (axiosErr.message) return axiosErr.message;

  return fallback;
};
