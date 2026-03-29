import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAutoLogin } from "../auth/hooks/useAutoLogin";
import { getAccessToken } from "./tokenStorage";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const { pathname } = location;

  const { isChecking: isAuthCheking, isLoggedIn } = useAutoLogin();

  const token = getAccessToken();

  if (isAuthCheking) return <div>인증 확인중...</div>;

  if (pathname.startsWith("/login")) {
    return <>{children}</>;
  }

  if (pathname.startsWith("/login") && isLoggedIn && token) {
    return <Navigate to="/" replace />;
  }
  return <></>;
};
