import { Button } from "@/components/ui/button";
import { useGetMyLaundry } from "@/hooks";
import { MapPin } from "lucide-react";
import { Link } from "react-router";

export default function MyLaundry() {
  const getMyLaundry = useGetMyLaundry();
  const laundry = getMyLaundry.data?.data.data;

  return (
    <div className="w-full">
      <div className="p-4 space-y-2 bg-secondary">
        <div className="border-2 mx-auto border-primary rounded-full w-fit">
          <img
            src={laundry?.imageUrl || "/img/default.png"}
            alt="Laundry Profile Picture"
            width={40}
            className="rounded-full"
          />
        </div>
        <h1 className="text-xl text-center">{laundry?.name}</h1>
        <div className="flex gap-2 items-center justify-center">
          <MapPin size={18} />
          <p className="text-sm text-muted-foreground">{laundry?.address}</p>
        </div>
      </div>
      <div className="space-y-2 p-4">
        <div className="-space-y-1">
          <p className="text-slate-700 text-xs font-semibold">
            Default Currency
          </p>
          <p className="text-slate-500">{laundry?.currency}</p>
        </div>
        {laundry?.contacts.map((contact) => (
          <div key={contact.id} className="-space-y-1">
            <p className="text-slate-700 text-xs font-semibold capitalize">
              {contact.name.toLocaleLowerCase()}
            </p>
            <p className="text-slate-500">{contact.details}</p>
          </div>
        ))}
      </div>
      <div className="px-4">
        <Link to="/others/my-laundry/edit">
          <Button
            type="button"
            className="w-full font-semibold"
            variant="default"
          >
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}
