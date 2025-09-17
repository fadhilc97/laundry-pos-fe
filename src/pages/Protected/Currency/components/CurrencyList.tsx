import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetCurrencyList } from "@/hooks";
import { Pencil } from "lucide-react";
import { Link } from "react-router";

export default function CurrencyList() {
  const getCurrencyList = useGetCurrencyList();
  const currencies = getCurrencyList.data?.data.data;

  return currencies?.map((currency) => (
    <Card key={currency.id} className="rounded-lg px-4 py-2">
      <div className="flex justify-between items-center">
        <p>
          {currency.name} ({currency.symbol})
        </p>
        <Link to={`/currency/${currency.id}/edit`}>
          <Button type="button" size="sm">
            <Pencil size={14} />
          </Button>
        </Link>
      </div>
    </Card>
  ));
}
