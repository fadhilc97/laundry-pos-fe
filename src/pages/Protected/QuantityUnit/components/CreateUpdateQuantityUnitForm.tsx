import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetQuantityUnitDetails,
  usePostCreateQuantityUnit,
  usePutUpdateQuantityUnit,
} from "@/hooks";
import {
  CreateUpdateQuantityUnitFormInputs,
  createUpdateQuantityUnitSchema,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

export default function CreateUpdateQuantityUnitForm() {
  const params = useParams<{ qtyUnitId: string }>();
  const navigate = useNavigate();

  const getQuantityUnitDetails = useGetQuantityUnitDetails();
  const quantityUnit = getQuantityUnitDetails.data?.data.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUpdateQuantityUnitFormInputs>({
    resolver: zodResolver(createUpdateQuantityUnitSchema),
    values: params.qtyUnitId ? quantityUnit : undefined,
  });

  const postCreateQuantityUnit = usePostCreateQuantityUnit();
  const putUpdateQuantityUnit = usePutUpdateQuantityUnit();
  const isMutationPending =
    postCreateQuantityUnit.isPending || putUpdateQuantityUnit.isPending;

  function onSubmit(values: CreateUpdateQuantityUnitFormInputs) {
    if (params.qtyUnitId) {
      putUpdateQuantityUnit.mutate(values);
    } else {
      postCreateQuantityUnit.mutate(values);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="e.g. Kilogram"
          className="mt-1"
          autoComplete="off"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="name">Short Name</Label>
        <Input
          id="shortName"
          type="text"
          placeholder="e.g. kg"
          className="mt-1"
          autoComplete="off"
          aria-invalid={!!errors.shortName}
          {...register("shortName")}
        />
        {errors.shortName && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {errors.shortName.message}
          </p>
        )}
      </div>
      <div className="mt-3 space-y-2">
        <Button
          type="submit"
          variant="default"
          className="font-semibold w-full"
          disabled={isMutationPending}
        >
          {isMutationPending && <Loader2 className="animate-spin" />}
          {params.qtyUnitId ? "Update" : "Create"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/quantity-unit")}
          className="font-semibold w-full"
        >
          Back to list
        </Button>
      </div>
    </form>
  );
}
