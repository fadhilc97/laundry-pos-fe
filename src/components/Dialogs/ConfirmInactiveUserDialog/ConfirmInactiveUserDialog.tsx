import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePutInactiveUser } from "@/hooks";
import { Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function ConfirmInactiveUserDialog({ open, setOpen }: Props) {
  const putInactiveUser = usePutInactiveUser();

  function handleConfirm() {
    putInactiveUser.mutate(undefined, {
      onSuccess() {
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Inactive User</DialogTitle>
        </DialogHeader>
        <p className="text-sm">Are you sure want to inactive this user ?</p>
        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="font-semibold w-1/2"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="default"
              className="font-semibold w-1/2"
              onClick={handleConfirm}
              disabled={putInactiveUser.isPending}
            >
              {putInactiveUser.isPending && <Loader2 />}
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
