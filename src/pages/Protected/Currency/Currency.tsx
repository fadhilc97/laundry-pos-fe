import { Link } from "react-router";
import CurrencyList from "./components/CurrencyList";
import { Button } from "@/components/ui/button";

export default function Currency() {
  return (
    <div className="space-y-3 p-4">
      <h1 className="font-semibold items-center text-md">Currency List</h1>
      <Link to="/currency/create" className="block">
        <Button type="button" className="w-full font-semibold">
          Create New Currency
        </Button>
      </Link>
      <CurrencyList />
    </div>
  );
}
