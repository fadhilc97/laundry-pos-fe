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
import { useGetCustomerList, useGetProductList } from "@/hooks";

export default function TransactionCreate() {
  const getCustomerList = useGetCustomerList();
  const customers = getCustomerList.data?.data.data;
  const customerOptions = customers?.map((customer) => ({
    value: customer.id.toString(),
    label: customer.name,
  }));

  const getProductList = useGetProductList();
  const products = getProductList.data?.data.data;

  return (
    <form className="p-4 space-y-4">
      <Card className="p-3 rounded-lg border">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="customerId">Customer</Label>
            <Combobox
              options={customerOptions || []}
              selectMessage="Select customer..."
            />
            {/* {errors.email && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {errors.email.message}
              </p>
            )} */}
          </div>
          <div className="space-y-1">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select name="serviceType" defaultValue="regular">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select service type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="flash">Flash</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      <Card className="p-3 rounded-lg border">
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">Items</h1>
          <div className="space-y-2 max-h-[37vh] overflow-auto">
            {products?.map((product) => (
              <Card key={product.id} className="p-3 rounded-lg border">
                <div className="flex justify-between gap-2">
                  <p className="text-sm">{product.name}</p>
                  <p className="text-sm font-semibold">(subtotal here)</p>
                </div>
                <div className="flex gap-1 items-center">
                  <Button size="sm" type="button" variant="default">
                    -
                  </Button>
                  <Input
                    type="text"
                    className="w-1/4 text-center"
                    defaultValue={0}
                  />
                  <Button size="sm" type="button" variant="default">
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
            <p className="font-semibold">Rp12.000</p>
          </div>
        </div>
      </Card>
      <Button type="submit" variant="default" className="w-full font-semibold">
        Confirm and Continue
      </Button>
    </form>
  );
}
