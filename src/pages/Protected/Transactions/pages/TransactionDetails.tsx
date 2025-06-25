import { useParams } from "react-router";
import { useGetTransactionDetails } from "@/hooks";
import {
  CustomerInfo,
  GeneralInfo,
  ListItems,
  Status,
  Actions,
} from "../components/TransactionDetails";

type Params = {
  transactionId: string;
};

export default function TransactionDetails() {
  const { transactionId } = useParams<Params>();

  const getTransactionDetails = useGetTransactionDetails({ transactionId });
  const transaction = getTransactionDetails.data?.data.data;

  if (getTransactionDetails.isPending) {
    return <p>Getting transactions ...</p>;
  }

  if (!transaction) {
    return <p>Transaction not found</p>;
  }

  if (!transactionId) {
    return <p>Unable to open the details</p>;
  }

  return (
    <div className="p-4 space-y-4">
      <GeneralInfo transaction={transaction} />
      <CustomerInfo transaction={transaction} />
      <Status transaction={transaction} transactionId={transactionId} />
      <ListItems transaction={transaction} />
      <Actions transaction={transaction} transactionId={transactionId} />
    </div>
  );
}
