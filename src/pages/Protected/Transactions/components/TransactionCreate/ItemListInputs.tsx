import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetProductList } from "@/hooks";
import { cn, CreateTransactionFormInputs } from "@/lib";
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export default function ItemListInputs() {
  const formContext = useFormContext<CreateTransactionFormInputs>();

  const getProductList = useGetProductList();
  const products = getProductList.data?.data.data;

  const transactionItems = formContext.getValues("items");

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
      formContext.setValue("items", [
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
    formContext.setValue(`items.${itemIdx}.qty`, newQty < 0 ? 0 : newQty);

    const finalizedItems = transactionItems.filter((item) => item.qty > 0);
    formContext.setValue("items", finalizedItems);
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
      formContext.setValue("items", [
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

    formContext.setValue(`items.${itemIdx}.qty`, changeQty);

    const finalizedItems = transactionItems.filter((item) => item.qty > 0);
    formContext.setValue("items", finalizedItems);
  }

  function getTotalTransactionAmount() {
    return transactionItems.reduce(
      (acc, curr) => acc + curr.qty * curr.price,
      0
    );
  }

  return (
    <Card
      className={cn(
        "p-3 rounded-lg border",
        formContext.formState.errors.items && "border-destructive"
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
  );
}
