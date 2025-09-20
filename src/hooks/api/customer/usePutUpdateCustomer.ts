import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { CreateUpdateCustomerInputs, ISuccessResponse } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export interface IPutUpdateCustomerResponse extends ISuccessResponse {}

export function usePutUpdateCustomer() {
  const navigate = useNavigate();
  const params = useParams<{ customerId: string }>();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["customer", "update", params.customerId],
    mutationFn: async function (data: CreateUpdateCustomerInputs) {
      return axiosPrivate.put<IPutUpdateCustomerResponse>(
        `/api/v1/customer/${params.customerId}`,
        data
      );
    },
    onSuccess(res) {
      toast.success(res.data.message);
      navigate("/customers");
    },
  });
}
