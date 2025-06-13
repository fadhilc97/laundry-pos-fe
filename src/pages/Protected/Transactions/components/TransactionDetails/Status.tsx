import { Card } from "@/components/ui/card";
import { IGetTransactionDetail } from "@/hooks";
import { cn, TransactionStatus } from "@/lib";
import TransactionFlowActions from "../TransactionFlowActions";
import moment from "moment";

const TRANSACTION_STATUS = {
  CHECK_IN: "Check-in",
  IN_PROCESS: "In Process",
  FINISHED: "Finished",
  CHECK_OUT: "Check-out",
};

type Props = {
  transactionId: string;
  transaction: IGetTransactionDetail | undefined;
};

export default function Status({ transactionId, transaction }: Props) {
  const statusLabelEntries = Object.entries(TRANSACTION_STATUS);
  const statusKeys = Object.keys(TRANSACTION_STATUS);

  function isStatusPrimaryColor(
    idx: number,
    status: TransactionStatus = TransactionStatus.CHECK_IN
  ) {
    return idx <= statusKeys.indexOf(status);
  }

  return (
    <Card className="p-3 rounded-lg border">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Status</h2>
        {transaction?.status !== TransactionStatus.CHECK_OUT && (
          <TransactionFlowActions
            currentStatus={transaction?.status as TransactionStatus}
            transactionId={transactionId}
          />
        )}
      </div>
      <ul className="flex items-center justify-between w-full">
        {statusLabelEntries.map(([statusKey, statusLabel], idx, arr) => (
          <li
            key={statusKey}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Circle */}
            <div
              className={cn(
                "w-4 h-4 rounded-full z-10",
                isStatusPrimaryColor(idx, transaction?.status)
                  ? "bg-primary"
                  : "bg-border"
              )}
            />
            {/* Label */}
            <span className="mt-2 text-xs font-semibold text-center">
              {statusLabel}
            </span>
            {/* Line */}
            {idx < arr.length - 1 && (
              <div
                className={cn(
                  "absolute top-2 left-1/2 w-full h-0.5 z-0 -right-1/2",
                  isStatusPrimaryColor(idx + 1, transaction?.status)
                    ? "bg-primary"
                    : "bg-border"
                )}
              />
            )}
          </li>
        ))}
      </ul>
      <div className="space-y-1 border-t py-1">
        <p className="flex justify-between text-sm">
          <span className="font-semibold">Check-in date</span>
          <span>{moment(transaction?.checkInDate).format("DD MMM YYYY")}</span>
        </p>
        <p className="flex justify-between text-sm">
          <span className="font-semibold">Proceed Date</span>
          <span>
            {transaction?.proceedDate
              ? moment(transaction.proceedDate).format("DD MMM YYYY")
              : "-"}
          </span>
        </p>
        <p className="flex justify-between text-sm">
          <span className="font-semibold">Finished date</span>
          <span>
            {transaction?.finishedDate
              ? moment(transaction.finishedDate).format("DD MMM YYYY")
              : "-"}
          </span>
        </p>
        <p className="flex justify-between text-sm">
          <span className="font-semibold">Check-out date</span>
          <span>
            {transaction?.checkOutDate
              ? moment(transaction.checkOutDate).format("DD MMM YYYY")
              : "-"}
          </span>
        </p>
      </div>
    </Card>
  );
}
