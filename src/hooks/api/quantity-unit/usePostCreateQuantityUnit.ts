import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { CreateUpdateQuantityUnitFormInputs, ISuccessResponse } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function usePostCreateQuantityUnit() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["quantity-unit", "create"],
    mutationFn: async function (data: CreateUpdateQuantityUnitFormInputs) {
      return await axiosPrivate.post<ISuccessResponse>(
        "/api/v1/quantity-unit",
        data
      );
    },
    onSuccess(res) {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["quantity-unit"] });
      navigate("/quantity-unit");
    },
  });
}
