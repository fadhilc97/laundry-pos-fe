import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LocationSelection from "./components/LocationSelection";
import { useState } from "react";
import { usePutUpdateTransaction } from "@/hooks";
import { TransactionStatus } from "@/lib";
import { Loader2 } from "lucide-react";

type Props = {
  transactionId: string;
};

export default function SetLocationDialog({ transactionId }: Props) {
  const [selectedLocationId, setSelectedLocationId] = useState<
    number | undefined
  >(undefined);
  const putUpdateTransaction = usePutUpdateTransaction({ transactionId });

  function handleConfirm() {
    putUpdateTransaction.mutate({
      action: TransactionStatus.FINISHED,
      locationId: selectedLocationId,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          type="button"
          variant="default"
          className="font-semibold"
        >
          Set to Finish
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader className="text-left">
          <DialogTitle>Set Location</DialogTitle>
          <DialogDescription>
            Choose the location where the finished order should be put.
          </DialogDescription>
        </DialogHeader>
        <LocationSelection onSelect={(value) => setSelectedLocationId(value)} />
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={!selectedLocationId || putUpdateTransaction.isPending}
            onClick={handleConfirm}
          >
            {putUpdateTransaction.isPending && (
              <Loader2 className="animate-spin" />
            )}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
