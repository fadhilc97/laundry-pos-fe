import { CreatePaymentDialog } from "@/components";
import { Button } from "@/components/ui/button";
import { IGetTransactionDetail } from "@/hooks";
import { TransactionPaymentStatus } from "@/lib";
import { Link } from "react-router";

type Props = {
  transactionId: string;
  transaction: IGetTransactionDetail | undefined;
};

export default function Actions({ transactionId, transaction }: Props) {
  return (
    <div className="flex gap-1">
      <Link to={`/transactions`} className="w-1/2">
        <Button
          type="button"
          variant="outline"
          className="w-full font-semibold"
        >
          Back to List
        </Button>
      </Link>
      <CreatePaymentDialog
        transactionId={transactionId}
        paymentStatus={transaction?.paymentStatus as TransactionPaymentStatus}
        buttonVariant="default"
      />
    </div>
  );
}
