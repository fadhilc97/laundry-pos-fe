import { Calendar, User, HandHeart } from "lucide-react";
import moment from "moment";
import _ from "lodash";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { IGetTransaction } from "@/hooks";
import { CreatePaymentDialog } from "@/components";
import { TransactionPaymentStatus } from "@/lib";

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
  paymentStatus,
}: Props) {
  return (
    <Card className="rounded-lg p-4">
      <div className="space-y-1 divide-y">
        <div className="flex justify-between items-center py-2">
          <h2 className="font-semibold text-xl">{transactionNo}</h2>
          <Badge variant="default" className="font-semibold capitalize">
            {status.replace("_", " ").toLowerCase()}
          </Badge>
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
