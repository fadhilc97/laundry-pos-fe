import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetCurrencyDetails,
  usePostCreateCurrency,
  usePutUpdateCurrency,
} from "@/hooks";
import {
  CreateUpdateCurrencyFormInputs,
  createUpdateCurrencySchema,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

export default function CreateUpdateCurrencyForm() {
  const params = useParams<{ currencyId: string }>();
  const navigate = useNavigate();

  const getCurrencyDetails = useGetCurrencyDetails();
  const currency = getCurrencyDetails.data?.data.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUpdateCurrencyFormInputs>({
    resolver: zodResolver(createUpdateCurrencySchema),
    values: params.currencyId ? currency : undefined,
  });

  const postCreateCurrency = usePostCreateCurrency();
  const putUpdateCurrency = usePutUpdateCurrency();
  const isMutationPending =
    postCreateCurrency.isPending || putUpdateCurrency.isPending;

  function onSubmit(values: CreateUpdateCurrencyFormInputs) {
    if (params.currencyId) {
      putUpdateCurrency.mutate(values);
    } else {
      postCreateCurrency.mutate(values);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="e.g. Rupiah"
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
        <Label htmlFor="shortName">Short Name</Label>
        <Input
          id="shortName"
          type="text"
          placeholder="e.g. IDR"
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
      <div className="space-y-1">
        <Label htmlFor="symbol">Symbol</Label>
        <Input
          id="symbol"
          type="text"
          placeholder="e.g. Rp"
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
      <div className="space-y-1">
        <Label htmlFor="countryName">Country Name</Label>
        <Input
          id="countryName"
          type="text"
          placeholder="e.g. Indonesia"
          className="mt-1"
          autoComplete="off"
          aria-invalid={!!errors.countryName}
          {...register("countryName")}
        />
        {errors.countryName && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {errors.countryName.message}
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
