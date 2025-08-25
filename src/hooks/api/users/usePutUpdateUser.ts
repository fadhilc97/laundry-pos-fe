import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { UpdateUserFormInputs, ISuccessResponse } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface IPutUpdateUserResponse extends ISuccessResponse {}

export function usePutUpdateUser(id: number) {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user", "update", id],
    mutationFn: async function (data: UpdateUserFormInputs) {
      return axiosPrivate.put<IPutUpdateUserResponse>(
        `/api/v1/user/${id}`,
        data
      );
    },
    onSuccess(res) {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
