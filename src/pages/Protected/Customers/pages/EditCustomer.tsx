import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetCustomerDetail, usePutUpdateCustomer } from "@/hooks";
import { CreateUpdateCustomerInputs, createUpdateCustomerSchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const EditCustomer = () => {
  const putUpdateCustomer = usePutUpdateCustomer();
  const getCustomerDetail = useGetCustomerDetail();
  const customer = getCustomerDetail.data?.data.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUpdateCustomerInputs>({
    resolver: zodResolver(createUpdateCustomerSchema),
    values: customer,
  });

  function onSubmit(values: CreateUpdateCustomerInputs) {
    putUpdateCustomer.mutate(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div className="flex justify-between">
        <h1 className="font-semibold items-center text-md">Edit Customer</h1>
      </div>
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
      <div className="mt-3 space-y-2">
        <Button
          type="submit"
          variant="default"
          className="font-semibold w-full"
          disabled={putUpdateCustomer.isPending}
        >
          {putUpdateCustomer.isPending && <Loader2 className="animate-spin" />}
          Update
        </Button>
        <Link to="/customers">
          <Button
            type="button"
            variant="outline"
            className="font-semibold w-full"
          >
            Back to list
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default EditCustomer;
