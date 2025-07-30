import { Card } from "@/components/ui/card";
import { MapPin, Phone, User } from "lucide-react";

type Props = {
  name: string;
  address: string;
  whatsappNumber: string;
};

export default function CustomerListItem({
  name,
  address,
  whatsappNumber,
}: Props) {
  return (
    <Card className="rounded-lg p-4">
      <div className="space-y-1 divide-y">
        <div className="flex items-center gap-2 py-2">
          <User />
          <h2 className="font-semibold text-xl">{name}</h2>
        </div>
        <div className="py-2 space-y-2">
          <div className="flex gap-2 items-center">
            <i>
              <MapPin size={18} />
            </i>
            <p className="text-sm">{address}</p>
          </div>
          <div className="flex gap-2 items-center">
            <i>
              <Phone size={18} />
            </i>
            <p className="text-sm">{whatsappNumber}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
