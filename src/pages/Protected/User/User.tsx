import { Button } from "@/components/ui/button";
import { UserList } from "./components";

export default function User() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Button type="button" variant="default" className="w-full font-semibold">
        Create New User
      </Button>
      <UserList />
    </div>
  );
}
