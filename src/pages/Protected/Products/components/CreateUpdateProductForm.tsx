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
import { useGetCurrencyList, useGetQuantityUnitList } from "@/hooks";
import {
  cn,
  CreateUpdateProductFormInputs,
  createUpdateProductSchema,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router";

export default function CreateUpdateProductForm() {
  const params = useParams<{ productId: string }>();
  const navigate = useNavigate();

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

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateUpdateProductFormInputs>({
    resolver: zodResolver(createUpdateProductSchema),
  });

  function onSubmit(values: CreateUpdateProductFormInputs) {
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Product Name"
          className="mt-1"
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
            setValue("serviceType", value);
          }}
          defaultValue={getValues("serviceType")}
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
            selectMessage="Select quantity unit..."
            onSelect={(value) => setValue("qtyUnitId", +value)}
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
            options={currencyOptions || []}
            selectMessage="Select currency..."
            onSelect={(value) => setValue("currencyId", +value)}
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
          className="mt-1"
          customInput={Input}
          thousandSeparator=","
          onValueChange={(values) => setValue("price", values.floatValue || 0)}
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
        >
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
