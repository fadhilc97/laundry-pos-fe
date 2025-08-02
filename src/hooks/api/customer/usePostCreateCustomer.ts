import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { CreateUpdateCustomerInputs, ISuccessResponse } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface IPostCreateCustomerResponse extends ISuccessResponse {}

export function usePostCreateCustomer() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["customer", "create"],
    mutationFn: async function (data: CreateUpdateCustomerInputs) {
      return axiosPrivate.post<IPostCreateCustomerResponse>(
        "/api/v1/customer",
        data
      );
    },
    onSuccess(res) {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });
}
