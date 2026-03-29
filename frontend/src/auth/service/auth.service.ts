import { clearToken, setTokens, updateAccessToken } from "../../lib/tokenStorage";

export const handleLoginSuccess = (accesToken: string) => {
    setTokens(accesToken);
}
export const handleLogoutSuccess = (): void => {
  clearToken();
};

export const handleTokenRefreshSuccess = (accessToken: string) => {
  updateAccessToken(accessToken);
};

export const handleTokenRefreshFailure = (): void => {
  clearToken();
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp <= currentTime;
  } catch {
    return true;
  }
};
