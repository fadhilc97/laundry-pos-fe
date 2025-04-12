import { LoginFormInputs } from "../utils/login-form.schema";
import { useMutation } from "@tanstack/react-query";
import axios from "@/config/axios";

export function usePostLogin() {
  return useMutation({
    mutationKey: ["laundry", "login"],
    mutationFn: async function (data: LoginFormInputs) {
      return await axios.post("/api/v1/auth/login", data);
    },
  });
}
