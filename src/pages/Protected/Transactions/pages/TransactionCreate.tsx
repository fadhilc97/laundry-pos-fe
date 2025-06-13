import { NumericFormat } from "react-number-format";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  useGetCustomerList,
  useGetProductList,
  usePostCreateTransaction,
} from "@/hooks";
import {
  cn,
  CreateTransactionFormInputs,
  createTransactionSchema,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

export default function TransactionCreate() {
  const [searchParams, setSearchParams] = useSearchParams({
    serviceType: "REGULAR",
  });
  const serviceType = searchParams.get("serviceType") as string;

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<CreateTransactionFormInputs>({
    defaultValues: {
      serviceType: serviceType as string,
      items: [],
    },
    resolver: zodResolver(createTransactionSchema),
  });

  const transactionItems = getValues("items");

  const getCustomerList = useGetCustomerList();
  const customers = getCustomerList.data?.data.data;
  const customerOptions = customers?.map((customer) => ({
    value: customer.id.toString(),
    label: customer.name,
  }));

  const getProductList = useGetProductList({ serviceType });
  const products = getProductList.data?.data.data;

  const postCreateTransaction = usePostCreateTransaction();

  function onSubmit(data: CreateTransactionFormInputs) {
    postCreateTransaction.mutate(data);
  }

  function getItemQuantity(productId: number): number {
    const existingItem = transactionItems.find(
      (item) => item.productId === productId
    );
    return existingItem?.qty || 0;
  }

  function handleChangeButtonQty(
    product: {
      productId: number;
      price: number;
      description: string;
      qtyUnitId: number;
    },
    changeQty: number
  ) {
    const findPredicate = (item: { productId: number; qty: number }) =>
      item.productId === product.productId;

    const item = transactionItems.find(findPredicate);
    const itemIdx = transactionItems.findIndex(findPredicate);

    if (itemIdx === -1 && changeQty > 0) {
      setValue("items", [
        ...transactionItems,
        {
          productId: product.productId,
          qty: changeQty,
          price: product.price,
          description: product.description,
          qtyUnitId: product.qtyUnitId,
        },
      ]);
      return;
    }

    const newQty = (item?.qty || 0) + changeQty;
    setValue(`items.${itemIdx}.qty`, newQty < 0 ? 0 : newQty);

    const finalizedItems = transactionItems.filter((item) => item.qty > 0);
    setValue("items", finalizedItems);
  }

  function handleChangeInputQty(
    product: {
      productId: number;
      price: number;
      description: string;
      qtyUnitId: number;
    },
    changeQty: number
  ) {
    const itemIdx = transactionItems.findIndex(
      (item) => item.productId === product.productId
    );

    if (itemIdx === -1) {
      setValue("items", [
        ...transactionItems,
        {
          productId: product.productId,
          qty: changeQty,
          price: product.price,
          description: product.description,
          qtyUnitId: product.qtyUnitId,
        },
      ]);
      return;
    }

    setValue(`items.${itemIdx}.qty`, changeQty);

    const finalizedItems = transactionItems.filter((item) => item.qty > 0);
    setValue("items", finalizedItems);
  }

  function getTotalTransactionAmount() {
    return transactionItems.reduce(
      (acc, curr) => acc + curr.qty * curr.price,
      0
    );
  }

  watch("items");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <Card className="p-3 rounded-lg border">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="customerId">Customer</Label>
            <Combobox
              options={customerOptions || []}
              selectMessage="Select customer..."
              onSelect={(value) => setValue("customerId", +value)}
              isError={!!errors.customerId}
            />
            {errors.customerId && (
              <p className="text-xs font-medium text-red-500">
                {errors.customerId.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select
              onValueChange={(value) => {
                setValue("serviceType", value);
                setValue("items", []);
                setSearchParams({ serviceType: value });
              }}
              defaultValue={getValues("serviceType")}
            >
              <SelectTrigger
                className={cn(
                  "w-full",
                  errors.serviceType && "border-destructive"
                )}
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
        </div>
      </Card>
      <Card
        className={cn(
          "p-3 rounded-lg border",
          errors.items && "border-destructive"
        )}
      >
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">Items</h1>
          <div className="space-y-2 max-h-[37vh] overflow-auto">
            {products?.map((product) => (
              <Card key={product.id} className="p-3 rounded-lg border">
                <div className="flex justify-between gap-2">
                  <p className="text-sm">{product.name}</p>
                  <p className="text-sm font-semibold">
                    {(
                      getItemQuantity(product.id) * +product.price
                    ).toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <Button
                    size="sm"
                    type="button"
                    variant="default"
                    onClick={() =>
                      handleChangeButtonQty(
                        {
                          productId: product.id,
                          description: product.name,
                          price: +product.price,
                          qtyUnitId: product.quantityUnit.id,
                        },
                        -1
                      )
                    }
                  >
                    -
                  </Button>
                  <NumericFormat
                    value={getItemQuantity(product.id)}
                    onChange={(e) =>
                      handleChangeInputQty(
                        {
                          productId: product.id,
                          description: product.name,
                          price: +product.price,
                          qtyUnitId: product.quantityUnit.id,
                        },
                        +e.target.value
                      )
                    }
                    className="w-1/4 text-center"
                    customInput={Input}
                    defaultValue={0}
                    decimalScale={1}
                    allowNegative={false}
                  />
                  <Button
                    size="sm"
                    type="button"
                    variant="default"
                    onClick={() =>
                      handleChangeButtonQty(
                        {
                          productId: product.id,
                          description: product.name,
                          price: +product.price,
                          qtyUnitId: product.quantityUnit.id,
                        },
                        1
                      )
                    }
                  >
                    +
                  </Button>
                  <p className="text-sm">
                    {product.quantityUnit.shortName} &times;{" "}
                    {(+product.price).toLocaleString("id-ID")}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-between px-1">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">
              Rp{getTotalTransactionAmount().toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </Card>
      <Button
        type="submit"
        disabled={postCreateTransaction.isPending}
        variant="default"
        className="w-full font-semibold"
      >
        {postCreateTransaction.isPending && (
          <Loader2 className="animate-spin" />
        )}
        Confirm and Continue
      </Button>
    </form>
  );
}
