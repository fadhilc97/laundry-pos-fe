import { MapPin } from "lucide-react";

export default function MyLaundry() {
  return (
    <div className="p-4 space-y-2 bg-secondary">
      <div className="border-2 mx-auto border-primary rounded-full w-fit">
        <img
          src={"/img/default.png"}
          alt="Laundry Profile Picture"
          width={40}
          className="rounded-full"
        />
      </div>
      <h1 className="text-xl text-center">Your laundry name here</h1>
      <div className="flex gap-2 items-center justify-center">
        <MapPin size={18} />
        <p className="text-sm text-muted-foreground">
          Your laundry location here
        </p>
      </div>
    </div>
  );
}
