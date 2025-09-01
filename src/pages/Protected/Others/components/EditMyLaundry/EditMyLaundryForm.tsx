import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetMyLaundry, usePutUpdateMyLaundry } from "@/hooks";
import { UpdateLaundryFormInputs, updateLaundrySchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function EditMyLaundryForm() {
  const navigate = useNavigate();

  const getMyLaundry = useGetMyLaundry();
  const laundry = getMyLaundry.data?.data.data;

  const putUpdateMyLaundry = usePutUpdateMyLaundry();

  function getContact(name: string) {
    const contact = laundry?.contacts.find(
      (contact) => contact.name === name.toUpperCase()
    );
    return contact?.details;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateLaundryFormInputs>({
    resolver: zodResolver(updateLaundrySchema),
    values: {
      name: laundry?.name || "",
      address: laundry?.address || "",
      contacts: {
        email: getContact("email") || "",
        instagram: getContact("instagram") || "",
        phone: getContact("phone") || "",
        whatsapp: getContact("whatsapp") || "",
        website: getContact("website") || "",
      },
    },
  });

  function onSubmit(values: UpdateLaundryFormInputs) {
    putUpdateMyLaundry.mutate(values);
    navigate("/others/my-laundry");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Laundry Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Laundry service name"
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
          <Input
            id="address"
            type="text"
            placeholder="Laundry service address"
            className="mt-1"
            autoComplete="off"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-xs font-medium text-red-500 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="contacts.whatsapp">Whatsapp Number</Label>
          <Input
            id="contacts.whatsapp"
            type="text"
            placeholder="Laundry service whatsapp number"
            className="mt-1"
            autoComplete="off"
            {...register("contacts.whatsapp")}
          />
          {errors.contacts?.whatsapp && (
            <p className="text-xs font-medium text-red-500 mt-1">
              {errors.contacts?.whatsapp.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="contacts.phone">Phone</Label>
          <Input
            id="contacts.phone"
            type="text"
            placeholder="Laundry service phone number"
            className="mt-1"
            autoComplete="off"
            {...register("contacts.phone")}
          />
          {errors.contacts?.whatsapp && (
            <p className="text-xs font-medium text-red-500 mt-1">
              {errors.contacts?.whatsapp.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="contacts.email">Email</Label>
          <Input
            id="contacts.email"
            type="text"
            placeholder="Laundry service email"
            className="mt-1"
            autoComplete="off"
            {...register("contacts.email")}
          />
          {errors.contacts?.email && (
            <p className="text-xs font-medium text-red-500 mt-1">
              {errors.contacts?.email.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="contacts.instagram">Instagram</Label>
          <Input
            id="contacts.instagram"
            type="text"
            placeholder="Laundry service instgram account"
            className="mt-1"
            autoComplete="off"
            {...register("contacts.instagram")}
          />
          {errors.contacts?.instagram && (
            <p className="text-xs font-medium text-red-500 mt-1">
              {errors.contacts?.instagram.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="address">Website</Label>
          <Input
            id="contact.website"
            type="text"
            placeholder="Laundry service website"
            className="mt-1"
            autoComplete="off"
            {...register("contacts.website")}
          />
          {errors.contacts?.website && (
            <p className="text-xs font-medium text-red-500 mt-1">
              {errors.contacts?.website.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col space-y-2">
        <Button
          type="submit"
          variant="default"
          disabled={putUpdateMyLaundry.isPending}
          className="font-semibold w-full"
        >
          {putUpdateMyLaundry.isPending && <Loader2 className="animate-spin" />}
          Submit
        </Button>
        <Button
          type="button"
          variant="outline"
          className="font-semibold w-full"
          onClick={() => navigate("/others/my-laundry")}
        >
          Back
        </Button>
      </div>
    </form>
  );
}
