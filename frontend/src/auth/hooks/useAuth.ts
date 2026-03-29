import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api/auth.api";
import { handleLogoutSuccess } from "../service/auth.service";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      handleLogoutSuccess();
      navigate("/");
    }
  };

  return { logout };
};
