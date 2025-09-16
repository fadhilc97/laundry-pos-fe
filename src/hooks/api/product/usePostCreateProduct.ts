import { useAxiosPrivate } from "@/hooks";
import {
  CreateUpdateProductFormInputs,
  IErrorResponse,
  ISuccessResponse,
} from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function usePostCreateProduct() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["product", "create"],
    mutationFn: async function (
      data: CreateUpdateProductFormInputs
    ): Promise<AxiosResponse<ISuccessResponse>> {
      return await axiosPrivate.post("/api/v1/product/", data);
    },
    onSuccess(data, variables) {
      toast.success(data.data.message);
      navigate(`/products?serviceType=${variables.serviceType}`);
    },
    onError(error) {
      if (isAxiosError<IErrorResponse>(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });
}
