import CreateCustomerDialog from "@/components/Dialogs/CreateCustomerDialog/CreateCustomerDialog";
import { Card } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCustomerList } from "@/hooks";
import { cn, CreateTransactionFormInputs } from "@/lib";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router";

export default function BasicInfoInputs() {
  const formContext = useFormContext<CreateTransactionFormInputs>();
  const [_, setSearchParams] = useSearchParams({
    serviceType: "REGULAR",
  });

  const getCustomerList = useGetCustomerList();
  const customers = getCustomerList.data?.data.data;
  const customerOptions = customers?.map((customer) => ({
    value: customer.id.toString(),
    label: customer.name,
  }));

  return (
    <Card className="p-3 rounded-lg border">
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="customerId">Customer</Label>
          <div className="flex items-center gap-2">
            <div className="w-full">
              <Combobox
                options={customerOptions || []}
                selectMessage="Select customer..."
                onSelect={(value) => formContext.setValue("customerId", +value)}
                isError={!!formContext.formState.errors.customerId}
              />
            </div>
            <CreateCustomerDialog />
          </div>
          {formContext.formState.errors.customerId && (
            <p className="text-xs font-medium text-red-500">
              {formContext.formState.errors.customerId.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="serviceType">Service Type</Label>
          <Select
            onValueChange={(value) => {
              formContext.setValue("serviceType", value);
              formContext.setValue("items", []);
              setSearchParams({ serviceType: value });
            }}
            defaultValue={formContext.getValues("serviceType")}
          >
            <SelectTrigger
              className={cn(
                "w-full",
                formContext.formState.errors.serviceType && "border-destructive"
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
          {formContext.formState.errors.serviceType && (
            <p className="text-xs font-medium text-red-500">
              {formContext.formState.errors.serviceType.message}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
