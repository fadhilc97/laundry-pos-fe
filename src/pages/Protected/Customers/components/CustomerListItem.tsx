import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Pencil, Phone, User } from "lucide-react";
import { Link } from "react-router";

type Props = {
  id: number;
  name: string;
  address: string;
  whatsappNumber: string;
};

export default function CustomerListItem({
  id,
  name,
  address,
  whatsappNumber,
}: Props) {
  return (
    <Card className="rounded-lg p-4">
      <div className="space-y-1 divide-y">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 py-2">
            <User />
            <h2 className="font-semibold text-xl">{name}</h2>
          </div>
          <Link to={`/customers/${id}/edit`}>
            <Button type="button" size="sm">
              <Pencil size={14} />
            </Button>
          </Link>
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
