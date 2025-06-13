import { Card } from "@/components/ui/card";
import { IGetTransactionDetail } from "@/hooks";

type Props = {
  transaction: IGetTransactionDetail | undefined;
};

export default function CustomerInfo({ transaction }: Props) {
  return (
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
  );
}
