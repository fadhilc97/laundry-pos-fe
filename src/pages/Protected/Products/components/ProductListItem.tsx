import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HandCoins, Pencil, ShoppingBag } from "lucide-react";
import { Link } from "react-router";

type Props = {
  id: number;
  name: string;
  currency: string;
  price: string;
};

export default function ProductListItem({ id, name, currency, price }: Props) {
  return (
    <Card className="rounded-lg p-4">
      <div className="space-y-1 divide-y">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 py-2">
            <ShoppingBag />
            <h2 className="font-semibold text-xl">{name}</h2>
          </div>
          <Link to={`/products/${id}/edit`}>
            <Button type="button" size="sm">
              <Pencil size={14} />
            </Button>
          </Link>
        </div>
        <div className="py-2 space-y-2">
          <div className="flex gap-2 items-center">
            <i>
              <HandCoins size={18} />
            </i>
            <p className="text-sm">
              {currency}
              {(+price).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
