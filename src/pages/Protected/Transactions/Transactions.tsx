import { Link } from "react-router";
import TransactionList from "./components/TransactionList";
import { Button } from "@/components/ui/button";

export default function Transactions() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Link to="/transactions/create">
        <Button
          type="button"
          variant="default"
          className="w-full font-semibold"
        >
          Create New Order
        </Button>
      </Link>
      <TransactionList />
    </div>
  );
}
