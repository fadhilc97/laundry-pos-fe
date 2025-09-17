import { Link } from "react-router";
import QuantityUnitList from "./components/QuantityUnitList";
import { Button } from "@/components/ui/button";

export default function QuantityUnit() {
  return (
    <div className="space-y-3 p-4">
      <h1 className="font-semibold items-center text-md">Quantity Unit List</h1>
      <Link to="/quantity-unit/create" className="block">
        <Button type="button" className="w-full font-semibold">
          Create New Quantity Unit
        </Button>
      </Link>
      <QuantityUnitList />
    </div>
  );
}
