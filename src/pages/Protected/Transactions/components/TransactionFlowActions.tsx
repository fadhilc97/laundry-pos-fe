import { SetLocationDialog } from "@/components";
import { Button } from "@/components/ui/button";
import { usePutUpdateTransaction } from "@/hooks";
import { TransactionStatus } from "@/lib";
import { Loader2 } from "lucide-react";

type Props = {
  currentStatus: TransactionStatus;
  transactionId: string;
};

export default function TransactionFlowActions({
  currentStatus,
  transactionId,
}: Props) {
  const putUpdateTransaction = usePutUpdateTransaction({ transactionId });

  function getActionButton(currentStatus: TransactionStatus) {
    switch (currentStatus) {
      case TransactionStatus.CHECK_IN:
        return { label: "Proceed", nextStatus: TransactionStatus.IN_PROCESS };
      case TransactionStatus.IN_PROCESS:
        return {
          label: "Set to Finish",
          nextStatus: TransactionStatus.FINISHED,
        };
      case TransactionStatus.FINISHED:
        return { label: "Check Out", nextStatus: TransactionStatus.CHECK_OUT };
    }
  }

  function handleNextStatus(nextStatus: TransactionStatus) {
    putUpdateTransaction.mutate({ action: nextStatus });
  }

  return getActionButton(currentStatus)?.nextStatus ===
    TransactionStatus.FINISHED ? (
    <SetLocationDialog transactionId={transactionId} />
  ) : (
    <Button
      size="sm"
      type="button"
      variant="default"
      className="font-semibold"
      disabled={putUpdateTransaction.isPending}
      onClick={() =>
        handleNextStatus(
          getActionButton(currentStatus)?.nextStatus as TransactionStatus
        )
      }
    >
      {putUpdateTransaction.isPending && <Loader2 className="animate-spin" />}
      {getActionButton(currentStatus)?.label}
    </Button>
  );
}
