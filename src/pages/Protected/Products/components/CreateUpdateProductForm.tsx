import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetCurrencyList,
  useGetProductDetails,
  useGetQuantityUnitList,
  usePostCreateProduct,
  usePutUpdateProduct,
} from "@/hooks";
import {
  cn,
  CreateUpdateProductFormInputs,
  createUpdateProductSchema,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router";

export default function CreateUpdateProductForm() {
  const params = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const getProductDetails = useGetProductDetails();
  const product = getProductDetails.data?.data.data;

  const getQuantityUnitList = useGetQuantityUnitList();
  const quantityUnits = getQuantityUnitList.data?.data.data;
  const quantityUnitOptions = quantityUnits?.map((qtyUnit) => ({
    value: qtyUnit.id.toString(),
    label: qtyUnit.name,
  }));

  const getCurrencyList = useGetCurrencyList();
  const currencies = getCurrencyList.data?.data.data;
  const currencyOptions = currencies?.map((currency) => ({
    value: currency.id.toString(),
    label: `${currency.name} (${currency.symbol})`,
  }));

  const postCreateProduct = usePostCreateProduct();
  const putUpdateProduct = usePutUpdateProduct();
  const isMutationPending =
    postCreateProduct.isPending || putUpdateProduct.isPending;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateUpdateProductFormInputs>({
    resolver: zodResolver(createUpdateProductSchema),
    values: params.productId ? product : undefined,
  });

  function onSubmit(values: CreateUpdateProductFormInputs) {
    if (params.productId) {
      putUpdateProduct.mutate(values);
    } else {
      postCreateProduct.mutate(values);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Product Name"
          className={cn("mt-1", errors.name && "border-destructive")}
          autoComplete="off"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="serviceType">Service Type</Label>
        <Select
          onValueChange={(value) => {
            setValue("serviceType", value, { shouldValidate: true });
          }}
          value={watch("serviceType")}
        >
          <SelectTrigger
            className={cn("w-full", errors.serviceType && "border-destructive")}
          >
            <SelectValue placeholder="Select service type..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="REGULAR">Regular</SelectItem>
            <SelectItem value="EXPRESS">Express</SelectItem>
            <SelectItem value="FLASH">Flash</SelectItem>
          </SelectContent>
        </Select>
        {errors.serviceType && (
          <p className="text-xs font-medium text-red-500">
            {errors.serviceType.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="qtyUnitId">Quantity Unit</Label>
        <div className="w-full">
          <Combobox
            options={quantityUnitOptions || []}
            selectValue={watch("qtyUnitId")?.toString()}
            selectMessage="Select quantity unit..."
            onSelect={(value) =>
              setValue("qtyUnitId", +value, { shouldValidate: true })
            }
            isError={!!errors.qtyUnitId}
          />
        </div>
        {errors.qtyUnitId && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {errors.qtyUnitId.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="currencyId">Currency</Label>
        <div className="w-full">
          <Combobox
            selectValue={watch("currencyId")?.toString()}
            options={currencyOptions || []}
            selectMessage="Select currency..."
            onSelect={(value) =>
              setValue("currencyId", +value, { shouldValidate: true })
            }
            isError={!!errors.currencyId}
          />
        </div>
        {errors.currencyId && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {errors.currencyId.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="price">Price</Label>
        <NumericFormat
          id="price"
          placeholder="Price"
          className={cn("mt-1", errors.name && "border-destructive")}
          customInput={Input}
          thousandSeparator=","
          onValueChange={(values) =>
            setValue("price", values.floatValue || 0, { shouldValidate: true })
          }
          value={watch("price")}
          {...register("price")}
        />
        {errors.price && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {errors.price.message}
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
          {params.productId ? "Update" : "Create"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
          className="font-semibold w-full"
        >
          Back to list
        </Button>
      </div>
    </form>
  );
}
