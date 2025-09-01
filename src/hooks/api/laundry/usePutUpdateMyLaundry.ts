import { useAxiosPrivate } from "@/hooks";
import { ISuccessResponse, UpdateLaundryFormInputs } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePutUpdateMyLaundry() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["laundry", "update", "me"],
    mutationFn: async function (data: UpdateLaundryFormInputs) {
      return await axiosPrivate.put<ISuccessResponse>(
        "/api/v1/laundry/me",
        data
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["laundry", "me"],
      });
      toast.success("Success updated your laundry data");
    },
  });
}
