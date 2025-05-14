import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetMyLaundry, usePostLogout } from "@/hooks";
import CreateLaundryForm from "./components/CreateLaundryForm";

export default function CreateLaundryDialog() {
  const postLogout = usePostLogout();
  const getMyLaundry = useGetMyLaundry();
  const myLaundryData = getMyLaundry.data?.data.data;

  return (
    <Dialog open={!myLaundryData && !getMyLaundry.isPending}>
      <DialogContent className="h-2/3 overflow-auto">
        <DialogHeader className="text-left">
          <DialogTitle>Create Laundry</DialogTitle>
          <DialogDescription>
            Please complete your laundry service information below
          </DialogDescription>
        </DialogHeader>
        <CreateLaundryForm />
        <DialogFooter>
          <Button
            type="button"
            onClick={() => postLogout.mutate()}
            disabled={postLogout.isPending}
            variant="outline"
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
