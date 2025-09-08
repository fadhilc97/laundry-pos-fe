import { useAxiosPrivate } from "@/hooks";
import { ISuccessResponse } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

export function usePutInactiveUser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId") as string;

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user", "update", userId, "inactive"],
    mutationFn: async function () {
      return axiosPrivate.put<ISuccessResponse>(
        `/api/v1/user/${userId}/inactive`
      );
    },
    onSuccess(res) {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setSearchParams({});
    },
  });
}
