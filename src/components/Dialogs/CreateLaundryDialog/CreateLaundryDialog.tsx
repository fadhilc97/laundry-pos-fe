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

export default function CreateLaundryDialog() {
  const postLogout = usePostLogout();
  const getMyLaundry = useGetMyLaundry();
  const myLaundryData = getMyLaundry.data?.data.data;

  return (
    <Dialog open={!myLaundryData}>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Create Laundry</DialogTitle>
          <DialogDescription>
            Please complete your laundry service information below
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => postLogout.mutate()}
            disabled={postLogout.isPending}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
