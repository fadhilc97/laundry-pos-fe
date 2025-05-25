import { useGetTransactionList } from "@/hooks";
import TransactionListItem from "./TransactionListItem";

export default function TransactionList() {
  const getTransactionList = useGetTransactionList();
  const transactions = getTransactionList.data?.data.data;

  return (
    <div className="space-y-2">
      <h1 className="font-semibold text-md">Transaction List</h1>
      {transactions?.map((transaction) => (
        <TransactionListItem key={transaction.id} {...transaction} />
      ))}
    </div>
  );
}
