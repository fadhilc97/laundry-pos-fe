import { UserList } from "./components";
import { CreateUserDialog } from "@/components";

export default function User() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <CreateUserDialog />
      <UserList />
    </div>
  );
}
