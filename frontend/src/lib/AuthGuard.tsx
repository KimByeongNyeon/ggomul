import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAutoLogin } from "../auth/hooks/useAutoLogin";

interface AuthGuardProps {
  children: React.ReactNode;
}

const PUBLIC_PATHS = ["/", "/login", "/auth/callback"];

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { pathname } = useLocation();
  const { isChecking, isLoggedIn } = useAutoLogin();

  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (isPublic) return <>{children}</>;

  if (isChecking) return <div>인증 확인중...</div>;

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return <>{children}</>;
};
