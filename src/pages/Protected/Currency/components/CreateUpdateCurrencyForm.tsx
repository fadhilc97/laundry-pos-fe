import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateUpdateCurrencyFormInputs,
  createUpdateCurrencySchema,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

export default function CreateUpdateCurrencyForm() {
  const params = useParams<{ currencyId: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateUpdateCurrencyFormInputs>({
    resolver: zodResolver(createUpdateCurrencySchema),
  });

  function onSubmit(values: CreateUpdateCurrencyFormInputs) {
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Currency Name"
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
        <Label htmlFor="name">Symbol</Label>
        <Input
          id="symbol"
          type="text"
          placeholder="Currency Symbol"
          className="mt-1"
          autoComplete="off"
          aria-invalid={!!errors.symbol}
          {...register("symbol")}
        />
        {errors.symbol && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {errors.symbol.message}
          </p>
        )}
      </div>
      <div className="mt-3 space-y-2">
        <Button
          type="submit"
          variant="default"
          className="font-semibold w-full"
          // disabled={isMutationPending}
        >
          {/* {isMutationPending && <Loader2 className="animate-spin" />} */}
          {params.currencyId ? "Update" : "Create"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/currency")}
          className="font-semibold w-full"
        >
          Back to list
        </Button>
      </div>
    </form>
  );
}
