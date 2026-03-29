import axiosClient from "../../lib/axiosClient";
import { AuthResponse } from "../types";

export const refreshApi = (): Promise<AuthResponse> =>
  axiosClient.post<AuthResponse>("/auth/refresh").then((res) => res.data);

export const logoutApi = (): Promise<void> =>
  axiosClient.post<void>("/auth/logout").then((res) => res.data);
