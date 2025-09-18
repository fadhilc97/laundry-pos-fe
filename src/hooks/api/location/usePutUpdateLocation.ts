import { useAxiosPrivate } from "@/hooks";
import {
  CreateUpdateLocationFormInputs,
  IErrorResponse,
  ISuccessResponse,
} from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "sonner";

export function usePutUpdateLocation(id?: number) {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["location", id, "update"],
    mutationFn: async function (
      data: CreateUpdateLocationFormInputs
    ): Promise<AxiosResponse<ISuccessResponse>> {
      return await axiosPrivate.put(`/api/v1/location/${id}`, data);
    },
    onSuccess(data) {
      toast.success(data.data.message);
      queryClient.invalidateQueries({
        queryKey: ["locations"],
      });
    },
    onError(error) {
      if (isAxiosError<IErrorResponse>(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });
}
