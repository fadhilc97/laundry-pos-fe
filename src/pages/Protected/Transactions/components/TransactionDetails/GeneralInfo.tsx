import { Card } from "@/components/ui/card";
import { IGetTransactionDetail } from "@/hooks";
import { cn, TransactionPaymentStatus } from "@/lib";

type Props = {
  transaction: IGetTransactionDetail | undefined;
};

export default function GeneralInfo({ transaction }: Props) {
  return (
    <Card className="p-3 bg-secondary rounded-lg border">
      <div className="space-y-2 grid grid-cols-2">
        <div className="-space-y-1">
          <p className="text-xs">Transaction No.</p>
          <h2 className="font-semibold text-lg">
            {transaction?.transactionNo}
          </h2>
        </div>
        <div className="-space-y-1">
          <p className="text-xs">Payment Status</p>
          <p
            className={cn(
              "font-semibold capitalize",
              transaction?.paymentStatus === TransactionPaymentStatus.PAID
                ? "text-green-600"
                : "text-destructive"
            )}
          >
            {transaction?.paymentStatus.toLowerCase()}
          </p>
        </div>
        <div className="-space-y-1">
          <p className="text-xs">Service Type</p>
          <p className="font-semibold capitalize">
            {transaction?.serviceType.toLowerCase()}
          </p>
        </div>
        <div className="-space-y-1">
          <p className="text-xs">Location</p>
          <p className="font-semibold capitalize">
            {transaction?.location?.name || "-"}
          </p>
        </div>
      </div>
    </Card>
  );
}
