import { useGetTransactionList } from "@/hooks";
import TransactionListItem from "./TransactionListItem";
import TransactionListFilter from "./TransactionListFilter";
import { SimplePagination } from "@/components";
import { Loader2 } from "lucide-react";

export default function TransactionList() {
  const getTransactionList = useGetTransactionList();
  const transactions = getTransactionList.data?.data.data;
  const metadata = getTransactionList.data?.data.metadata;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h1 className="font-semibold items-center text-md">Transaction List</h1>
        <TransactionListFilter />
      </div>
      <SimplePagination lastPage={metadata?.pagination.lastPage || 1} />
      {getTransactionList.isPending && (
        <p className="flex items-center gap-1 justify-center">
          <Loader2 className="animate-spin" />
          <span>Please wait</span>
        </p>
      )}
      {transactions?.map((transaction) => (
        <TransactionListItem key={transaction.id} {...transaction} />
      ))}
    </div>
  );
}
