import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetQuantityUnitList } from "@/hooks";
import { Pencil } from "lucide-react";
import { Link } from "react-router";

export default function QuantityUnitList() {
  const getQuantityList = useGetQuantityUnitList();
  const currencies = getQuantityList.data?.data.data;

  return currencies?.map((quantityUnit) => (
    <Card key={quantityUnit.id} className="rounded-lg px-4 py-2">
      <div className="flex justify-between items-center">
        <p>
          {quantityUnit.name} ({quantityUnit.shortName})
        </p>
        <Link to={`/quantity-unit/${quantityUnit.id}/edit`}>
          <Button type="button" size="sm">
            <Pencil size={14} />
          </Button>
        </Link>
      </div>
    </Card>
  ));
}
