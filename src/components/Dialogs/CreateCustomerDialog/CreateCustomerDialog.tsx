import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CreateCustomerForm from "./components/CreateCustomerForm";

export default function CreateCustomerDialog() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" color="default" size="sm">
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader className="text-left">
          <DialogTitle>Create Customer</DialogTitle>
        </DialogHeader>
        <CreateCustomerForm />
      </DialogContent>
    </Dialog>
  );
}
