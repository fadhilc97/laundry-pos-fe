import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePostCreateLocation, usePutUpdateLocation } from "@/hooks";
import {
  CreateUpdateLocationFormInputs,
  createUpdateLocationSchema,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";

type Props = {
  mode: "create" | "edit";
  initialValues?: CreateUpdateLocationFormInputs;
  locationId?: number;
  onCancel?: () => void;
  onEditSuccess?: () => void;
};

export default function LocationForm({
  mode,
  locationId,
  onCancel,
  initialValues,
  onEditSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUpdateLocationFormInputs>({
    resolver: zodResolver(createUpdateLocationSchema),
    values: mode === "edit" ? initialValues : undefined,
  });

  const postCreateLocation = usePostCreateLocation();
  const putUpdateLocation = usePutUpdateLocation(locationId);
  const isPending = postCreateLocation.isPending || putUpdateLocation.isPending;

  function onSubmit(values: CreateUpdateLocationFormInputs) {
    if (mode === "create") {
      postCreateLocation.mutate(values);
    } else {
      putUpdateLocation.mutate(values, {
        onSuccess() {
          onEditSuccess?.();
        },
      });
    }
    reset();
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name")}
        aria-invalid={!!errors.name}
        type="text"
        placeholder="Location Name"
      />
      <Button type="submit" size="sm" variant="default" disabled={isPending}>
        {isPending ? (
          <Loader2 size={14} className="animate-spin" />
        ) : mode === "create" ? (
          "+"
        ) : (
          <Pencil size={14} />
        )}
      </Button>
      {mode === "edit" && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="border-black"
          onClick={onCancel}
        >
          <CircleX size={14} />
        </Button>
      )}
    </form>
  );
}
