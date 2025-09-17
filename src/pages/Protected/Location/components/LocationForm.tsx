import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreateUpdateLocationFormInputs,
  createUpdateLocationSchema,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";

type Props = {
  usage: "create" | "edit";
  initialValues?: CreateUpdateLocationFormInputs;
  locationId?: number;
  onCancel?: () => void;
};

export default function LocationForm({
  usage,
  locationId,
  onCancel,
  initialValues,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUpdateLocationFormInputs>({
    resolver: zodResolver(createUpdateLocationSchema),
    values: usage === "edit" ? initialValues : undefined,
  });

  function onSubmit(values: CreateUpdateLocationFormInputs) {
    console.log(values);
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name")}
        aria-invalid={!!errors.name}
        type="text"
        placeholder="Location Name"
      />
      <Button type="submit" size="sm" variant="default">
        {usage === "create" ? "+" : <Pencil size={14} />}
      </Button>
      {usage === "edit" && (
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
