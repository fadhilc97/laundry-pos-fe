import { useGetTransactionList } from "@/hooks";
import TransactionListItem from "./TransactionListItem";
import TransactionListFilter from "./TransactionListFilter";
import { SimplePagination } from "@/components";
import { useSearchParams } from "react-router";

export default function TransactionList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const getTransactionList = useGetTransactionList();
  const transactions = getTransactionList.data?.data.data;
  const metadata = getTransactionList.data?.data.metadata;

  function handleChangePage(page: number) {
    setSearchParams((prev) => ({ ...prev, page }));
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h1 className="font-semibold items-center text-md">Transaction List</h1>
        <TransactionListFilter />
      </div>
      <SimplePagination
        page={currentPage}
        lastPage={metadata?.pagination.lastPage || 1}
        onChangePage={handleChangePage}
      />
      {transactions?.map((transaction) => (
        <TransactionListItem key={transaction.id} {...transaction} />
      ))}
    </div>
  );
}
