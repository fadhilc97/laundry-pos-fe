import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePostLogout } from "@/hooks";
import { useNavigate } from "react-router";

export default function Forbidden() {
  const postLogout = usePostLogout();
  const navigate = useNavigate();

  return (
    <section className="h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-2xl">Access forbidden</h1>
      <p className="text-center text-slate-700 text-sm mt-4">
        You don't have access to visit the application, because your assigned
        roles is <span className="text-destructive">not eligible</span> or your
        account is <span className="text-destructive">inactive</span>.
      </p>
      <p className="text-center text-slate-700 text-sm">
        Please contact our support for assistance.
      </p>
      <Button
        type="button"
        variant="default"
        onClick={() =>
          postLogout.mutate(undefined, {
            onSuccess() {
              navigate("/login");
            },
          })
        }
        className="w-full font-semibold mt-4"
      >
        {postLogout.isPending && <Loader2 className="animate-spin" />}
        Logout
      </Button>
    </section>
  );
}
