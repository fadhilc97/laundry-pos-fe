import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useParams } from "react-router";

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

  return (
    <div className="p-4 space-y-4">
      <Card className="p-3 bg-secondary rounded-lg border">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="-space-y-1">
              <p className="text-xs">Transaction No.</p>
              <h2 className="font-semibold text-lg">0001</h2>
            </div>
            <div className="-space-y-1">
              <p className="text-xs">Payment Status</p>
              <p className="font-semibold">Pending</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="-space-y-1">
              <p className="text-xs">Service Type</p>
              <p className="font-semibold">Regular</p>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-3 rounded-lg border">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Contacts</h2>
          <div className="flex justify-between">
            <div className="-space-y-1">
              <p className="text-xs">Name</p>
              <h2 className="font-semibold text-lg">Fadhil</h2>
            </div>
            <div className="-space-y-1">
              <p className="text-xs">Whatsapp No.</p>
              <h2 className="font-semibold text-lg">0812-3456-7890</h2>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-3 rounded-lg border">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Status</h2>
          <Button
            size="sm"
            type="button"
            variant="default"
            className="font-semibold"
          >
            Proceed
          </Button>
        </div>
        <ul className="flex items-center justify-between w-full">
          {statusLabelEntries.map((label, idx, arr) => (
            <li
              key={label[0]}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Circle */}
              <div className="w-4 h-4 rounded-full bg-border z-10" />
              {/* Label */}
              <span className="mt-2 text-xs font-semibold text-center">
                {label[1]}
              </span>
              {/* Line */}
              {idx < arr.length - 1 && (
                <div className="absolute top-2 left-1/2 w-full h-0.5 bg-border z-0 -right-1/2" />
              )}
            </li>
          ))}
        </ul>
        <div className="space-y-1 border-t py-1">
          <p className="flex justify-between text-sm">
            <span className="font-semibold">Check-in date</span>
            <span>26 May 2025</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="font-semibold">Finished date</span>
            <span>-</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="font-semibold">Check-out date</span>
            <span>-</span>
          </p>
        </div>
      </Card>
      <Card className="p-3 rounded-lg border">
        <div className="divide-y">
          <h2 className="text-lg font-semibold py-1">Items</h2>
          <div className="space-y-1">
            <div className="py-1">
              <p className="font-semibold">Clothes</p>
              <div className="flex justify-between">
                <p>3kg &times; Rp6.000</p>
                <p>Rp18.000</p>
              </div>
            </div>
            <div className="py-1">
              <p className="font-semibold">Clothes</p>
              <div className="flex justify-between">
                <p>3kg &times; Rp6.000</p>
                <p>Rp18.000</p>
              </div>
            </div>
          </div>
          <div className="py-1">
            <p className="font-semibold flex justify-between">
              <span>Total</span>
              <span>Rp36.000</span>
            </p>
            <p className="font-semibold flex justify-between">
              <span>Paid</span>
              <span>Rp0</span>
            </p>
            <p className="font-semibold flex justify-between">
              <span>Pending</span>
              <span>Rp36.000</span>
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
        <Button type="button" variant="default" className="w-1/2 font-semibold">
          Create Payment
        </Button>
      </div>
    </div>
  );
}
