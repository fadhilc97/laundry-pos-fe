import { useForm } from "react-hook-form";
import { LoginFormInputs, loginSchema } from "@/lib";
import { usePostLogin } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const postLogin = usePostLogin();

  const onSubmit = (data: LoginFormInputs) => {
    postLogin.mutate(data);
  };

  return { register, handleSubmit, errors, postLogin, onSubmit };
}
