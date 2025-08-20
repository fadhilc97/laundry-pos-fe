import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateUserForm from "./components/CreateUserForm";

export default function CreateUserDialog() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="default"
          className="w-full font-semibold"
        >
          Create New User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-3/4">
        <DialogHeader className="text-left">
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <CreateUserForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
