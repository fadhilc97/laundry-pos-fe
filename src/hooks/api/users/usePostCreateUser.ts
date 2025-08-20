import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { CreateUserFormInputs, ISuccessResponse } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface IPostCreateUserResponse extends ISuccessResponse {}

export function usePostCreateUser() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user", "create"],
    mutationFn: async function (data: CreateUserFormInputs) {
      return axiosPrivate.post<IPostCreateUserResponse>("/api/v1/user", data);
    },
    onSuccess(res) {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
