import { usePostLogout } from "@/hooks";
import { LogOut, WashingMachine } from "lucide-react";
import { Link } from "react-router";

export default function OtherMenus() {
  const postLogout = usePostLogout();

  return (
    <ul className="px-4 space-y-2">
      <li>
        <Link className="flex gap-x-4 items-center" to="/others/my-laundry">
          <WashingMachine size={18} />
          <span>My Laundry</span>
        </Link>
      </li>
      <li>
        <button
          className="flex gap-x-4 items-center cursor-pointer text-destructive"
          type="button"
          onClick={() => postLogout.mutate()}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </li>
    </ul>
  );
}
