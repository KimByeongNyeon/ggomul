import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleLoginSuccess } from "../service/auth.service";

export const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    if (accessToken) {
      handleLoginSuccess(accessToken);
    }
    navigate("/");
  }, [navigate]);

  return <></>;
};
