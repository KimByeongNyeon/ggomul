import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../api/auth.api";
import { handleLogoutSuccess } from "../service/auth.service";

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      await logoutApi();
      handleLogoutSuccess();
    },
  });
};
