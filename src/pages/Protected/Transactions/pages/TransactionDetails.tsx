import { Link, useParams } from "react-router";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetTransactionDetails } from "@/hooks";
import { cn, TransactionPaymentStatus, TransactionStatus } from "@/lib";
import TransactionFlowActions from "../components/TransactionFlowActions";
import { CreatePaymentDialog } from "@/components";

type Params = {
  transactionId: string;
};

const TRANSACTION_STATUS = {
  CHECK_IN: "Check-in",
  IN_PROCESS: "In Process",
  FINISHED: "Finished",
  CHECK_OUT: "Check-out",
};

export default function TransactionDetails() {
  const { transactionId } = useParams<Params>();
  const statusLabelEntries = Object.entries(TRANSACTION_STATUS);
  const statusKeys = Object.keys(TRANSACTION_STATUS);

  const getTransactionDetails = useGetTransactionDetails({ transactionId });
  const transaction = getTransactionDetails.data?.data.data;

  function isStatusPrimaryColor(
    idx: number,
    status: TransactionStatus = TransactionStatus.CHECK_IN
  ) {
    return idx <= statusKeys.indexOf(status);
  }

  if (!transaction) {
    return <p>Transaction not found</p>;
  }

  if (!transactionId) {
    return <p>Unable to open the details</p>;
  }

  return (
    <div className="p-4 space-y-4">
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
      <Card className="p-3 rounded-lg border">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Customer Info</h2>
          <div className="flex justify-between">
            <div className="-space-y-1">
              <p className="text-xs">Name</p>
              <h2 className="font-semibold text-lg">
                {transaction?.customer.name}
              </h2>
            </div>
            <div className="-space-y-1">
              <p className="text-xs">Whatsapp No.</p>
              <h2 className="font-semibold text-lg">
                {transaction?.customer.customerContacts[0].contact.details}
              </h2>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-3 rounded-lg border">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Status</h2>
          {transaction.status !== TransactionStatus.CHECK_OUT && (
            <TransactionFlowActions
              currentStatus={transaction.status}
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
            <span>
              {moment(transaction?.checkInDate).format("DD MMM YYYY")}
            </span>
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
      <Card className="p-3 rounded-lg border">
        <div className="divide-y">
          <h2 className="text-lg font-semibold py-1">Items</h2>
          <div className="space-y-1">
            {transaction?.items.map((item) => (
              <div key={item.id} className="py-1">
                <p className="font-semibold">{item.description}</p>
                <div className="flex justify-between">
                  <p>
                    {item.qty}
                    {item.quantityUnit.shortName} &times;{" "}
                    {transaction.currency.symbol}
                    {item.price.toLocaleString("id-ID")}
                  </p>
                  <p>
                    {transaction.currency.symbol}
                    {item.subTotal.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="py-1">
            <p className="font-semibold flex justify-between">
              <span>Total</span>
              <span>
                {transaction?.currency.symbol}
                {transaction?.totalTransactionAmount.toLocaleString("id-ID")}
              </span>
            </p>
            <p className="font-semibold flex justify-between">
              <span>Paid</span>
              <span>
                {transaction?.currency.symbol}
                {transaction?.totalPaidAmount.toLocaleString("id-ID")}
              </span>
            </p>
            <p className="font-semibold flex justify-between">
              <span>Pending</span>
              <span>
                {transaction?.currency.symbol}
                {transaction?.pendingPaid.toLocaleString("id-ID")}
              </span>
            </p>
          </div>
        </div>
      </Card>
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
          paymentStatus={transaction.paymentStatus}
          buttonVariant="default"
        />
      </div>
    </div>
  );
}
