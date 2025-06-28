import { useGetTransactionList } from "@/hooks";
import TransactionListItem from "./TransactionListItem";
import TransactionListFilter from "./TransactionListFilter";

export default function TransactionList() {
  const getTransactionList = useGetTransactionList();
  const transactions = getTransactionList.data?.data.data;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h1 className="font-semibold items-center text-md">Transaction List</h1>
        <TransactionListFilter />
      </div>
      {transactions?.map((transaction) => (
        <TransactionListItem key={transaction.id} {...transaction} />
      ))}
    </div>
  );
}
