import { Button } from "@/components/ui/button";
import { usePostLogout } from "@/hooks";

export default function Dashboard() {
  const postLogout = usePostLogout();

  return (
    <div className="space-y-2">
      <h1>Dashboard page</h1>
      <Button
        type="button"
        onClick={() => postLogout.mutate()}
        disabled={postLogout.isPending}
      >
        Logout
      </Button>
    </div>
  );
}
