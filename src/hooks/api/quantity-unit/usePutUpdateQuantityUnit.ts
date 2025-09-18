import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { CreateUpdateQuantityUnitFormInputs, ISuccessResponse } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export function usePutUpdateQuantityUnit() {
  const navigate = useNavigate();
  const params = useParams<{ qtyUnitId: string }>();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["quantity-unit", params.qtyUnitId, "update"],
    mutationFn: async function (data: CreateUpdateQuantityUnitFormInputs) {
      return await axiosPrivate.put<ISuccessResponse>(
        `/api/v1/quantity-unit/${params.qtyUnitId}`,
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
