import { Card } from "@/components/ui/card";
import { IGetTransactionDetail } from "@/hooks";

type Props = {
  transaction: IGetTransactionDetail | undefined;
};

export default function ListItems({ transaction }: Props) {
  return (
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
  );
}
