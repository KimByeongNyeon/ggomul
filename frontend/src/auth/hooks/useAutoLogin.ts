import { useEffect, useState } from "react";
import { getAccessToken } from "../../lib/tokenStorage";
import {
  handleTokenRefreshFailure,
  handleTokenRefreshSuccess,
  isTokenExpired,
} from "../service/auth.service";
import { refreshApi } from "../api/auth.api";

export const useAutoLogin = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = getAccessToken();

        if (accessToken && !isTokenExpired(accessToken)) {
          setIsLoggedIn(true);
          return;
        }
        try {
          const response = await refreshApi();
          handleTokenRefreshSuccess(response.accessToken);
          setIsLoggedIn(true);
        } catch {
          handleTokenRefreshFailure();
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuthStatus();
  }, []);

  return { isChecking, isLoggedIn };
};
