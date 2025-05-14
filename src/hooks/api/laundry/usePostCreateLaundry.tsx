import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "@/hooks";
import { CreateLaundryFormInputs, ISuccessResponse } from "@/lib";

export interface IPostCreateLaundryResponse extends ISuccessResponse {}

export function usePostCreateLaundry() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["laundry", "create"],
    mutationFn: async function (data: CreateLaundryFormInputs) {
      return await axiosPrivate.post<IPostCreateLaundryResponse>(
        "/api/v1/laundry",
        data
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["laundry", "me"],
      });
    },
  });
}
