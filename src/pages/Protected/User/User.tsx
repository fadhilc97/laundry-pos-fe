import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { UserList } from "./components";

export default function Users() {
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
      <UserList />
    </div>
  );
}
