import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreatePaymentForm from "./components/CreatePaymentForm";
import { useState } from "react";
import { TransactionPaymentStatus } from "@/lib";

type Props = {
  transactionId: string;
  paymentStatus: TransactionPaymentStatus;
  buttonVariant: "outline" | "default";
};

export default function CreatePaymentDialog({
  transactionId,
  paymentStatus,
  buttonVariant,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={buttonVariant}
          className="w-1/2 font-semibold"
          disabled={paymentStatus === TransactionPaymentStatus.PAID}
        >
          Create Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader className="text-left">
          <DialogTitle>Create Payment</DialogTitle>
          <DialogDescription>
            Choose the location where the finished order should be put.
          </DialogDescription>
        </DialogHeader>
        <CreatePaymentForm
          transactionId={transactionId}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
