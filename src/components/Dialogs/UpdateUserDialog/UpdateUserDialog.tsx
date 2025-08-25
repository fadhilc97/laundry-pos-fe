import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateUserForm from "./components/UpdateUserForm";

type Props = {
  id: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function UpdateUserDialog({ id, open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-3/4">
        <DialogHeader className="text-left">
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>
        <UpdateUserForm id={id} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
