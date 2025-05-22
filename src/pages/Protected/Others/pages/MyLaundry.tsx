import { useGetMyLaundry } from "@/hooks";
import { MapPin } from "lucide-react";

export default function MyLaundry() {
  const getMyLaundry = useGetMyLaundry();
  const laundry = getMyLaundry.data?.data.data;

  return (
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
  );
}
