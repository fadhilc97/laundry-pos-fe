import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePostCreateCustomer } from "@/hooks";
import { CreateUpdateCustomerInputs, createUpdateCustomerSchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export default function CreateCustomerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUpdateCustomerInputs>({
    resolver: zodResolver(createUpdateCustomerSchema),
  });
  const postCreateCustomer = usePostCreateCustomer();

  function onSubmit(values: CreateUpdateCustomerInputs) {
    postCreateCustomer.mutate(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-3 rounded-lg border">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Customer Name"
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
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Customer Address"
              className="mt-1"
              autoComplete="off"
              {...register("address")}
            ></Textarea>
            {errors.address && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="whatsappPhone">Whatsapp Number</Label>
            <Input
              id="whatsappPhone"
              type="text"
              placeholder="Customer Whatsapp Number"
              className="mt-1"
              autoComplete="off"
              {...register("whatsappPhone")}
            />
            {errors.whatsappPhone && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {errors.whatsappPhone.message}
              </p>
            )}
          </div>
        </div>
      </Card>
      <DialogFooter className="mt-3">
        <Button
          type="submit"
          variant="default"
          className="font-semibold"
          disabled={postCreateCustomer.isPending}
        >
          {postCreateCustomer.isPending && <Loader2 className="animate-spin" />}
          Create
        </Button>
      </DialogFooter>
    </form>
  );
}
