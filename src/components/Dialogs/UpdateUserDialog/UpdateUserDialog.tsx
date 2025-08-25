import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateUserForm from "./components/UpdateUserForm";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function UpdateUserDialog({ open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-3/4">
        <DialogHeader className="text-left">
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>
        <UpdateUserForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
