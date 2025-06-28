import {
  Calendar,
  User,
  HandHeart,
  Download,
  Loader2,
  RefreshCw,
} from "lucide-react";
import moment from "moment";
import _ from "lodash";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  IGetTransaction,
  useDownloadFile,
  usePostGenerateTransactionReceipt,
} from "@/hooks";
import { CreatePaymentDialog } from "@/components";
import { cn, TransactionPaymentStatus } from "@/lib";

type Props = IGetTransaction;

export default function TransactionListItem({
  id,
  transactionNo,
  status,
  checkInDate,
  customerName,
  serviceType,
  currency,
  totalAmount,
  totalPendingPaidAmount,
  paymentStatus,
}: Props) {
  const postGenerateTransactionReceipt = usePostGenerateTransactionReceipt({
    transactionId: id,
  });
  const downloadFile = useDownloadFile();

  return (
    <Card className="rounded-lg p-4">
      <div className="space-y-1 divide-y">
        <div className="flex justify-between items-center py-2">
          <h2 className="font-semibold text-xl">{transactionNo}</h2>
          <div className="flex gap-1 items-end">
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => postGenerateTransactionReceipt.mutate()}
            >
              <Badge variant="default" className="py-1">
                <RefreshCw
                  className={cn(
                    postGenerateTransactionReceipt.isPending
                      ? "animate-spin"
                      : "animate-none"
                  )}
                />
              </Badge>
            </button>
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                downloadFile.mutate({
                  endPoint: `/api/v1/transaction/${id}/receipt`,
                  accept: "application/pdf",
                  fileName: "receipt.pdf",
                });
              }}
            >
              <Badge variant="default" className="py-1">
                {downloadFile.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Download />
                )}
              </Badge>
            </button>
            <Badge variant="default" className="font-semibold capitalize">
              {status.replace("_", " ").toLowerCase()}
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 py-2 gap-1">
          <div className="flex gap-1 items-center">
            <Calendar width={18} />
            <p className="text-sm">
              {moment(checkInDate).format("DD MMM YYYY")}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <User width={18} />
            <p className="text-sm">{customerName}</p>
          </div>
          <div className="flex gap-1 items-center">
            <HandHeart width={18} />
            <p className="text-sm capitalize">{serviceType.toLowerCase()}</p>
          </div>
        </div>
        <div className="flex flex-col items-end py-2 gap-1">
          <p className="text-lg font-semibold">
            Total: {currency}
            {(+totalAmount).toLocaleString("id-ID")}
          </p>
          <div className="flex gap-2">
            {+totalPendingPaidAmount > 0 &&
              +totalPendingPaidAmount < +totalAmount && (
                <i className="text-sm font-medium">
                  Pending: {(+totalPendingPaidAmount).toLocaleString("id-ID")}
                </i>
              )}
            <Badge
              variant={
                paymentStatus === TransactionPaymentStatus.PAID
                  ? "default"
                  : "destructive"
              }
              className="font-semibold capitalize"
            >
              {paymentStatus.toLowerCase()}
            </Badge>
          </div>
        </div>
        <div className="flex gap-1 py-2">
          <Link to={`/transactions/details/${id}`} className="w-1/2">
            <Button
              type="button"
              variant="default"
              className="w-full font-semibold"
            >
              Details
            </Button>
          </Link>
          <CreatePaymentDialog
            transactionId={id.toString()}
            paymentStatus={paymentStatus}
            buttonVariant="outline"
          />
        </div>
      </div>
    </Card>
  );
}
