import {
  LogIn,
  LucideRefreshCw,
  CheckSquare,
  LogOut,
  ArrowUpDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetDashboard } from "@/hooks";
import { TransactionStatus } from "@/lib";
import { SpinnerText } from "@/components";

export function TransactionSummary() {
  const getDashboard = useGetDashboard();
  const dashboardData = getDashboard.data?.data.data;

  function getCountAll(): number {
    return (
      dashboardData?.transactionCount.reduce(
        (acc, curr) => acc + curr.count,
        0
      ) || 0
    );
  }

  function getCountByStatus(status: TransactionStatus): number {
    return (
      dashboardData?.transactionCount.find(
        (trxCount) => trxCount.status === status
      )?.count || 0
    );
  }

  return getDashboard.isPending ? (
    <SpinnerText text="Please wait" />
  ) : (
    <Card className="rounded-lg justify-around p-4">
      <div className="flex flex-col">
        <span className="text-4xl font-semibold text-center">
          {getCountAll()}
        </span>{" "}
        <div className="flex gap-2 justify-center items-center font-semibold">
          <ArrowUpDown size={14} />
          <span className="text-center">Transactions</span>
        </div>
      </div>
      <div className="divide-y">
        <div className="grid grid-cols-2 divide-x gap-4">
          <div className="py-4 flex flex-col">
            <span className="text-lg font-semibold text-center">
              {getCountByStatus(TransactionStatus.CHECK_IN)}
            </span>{" "}
            <div className="flex gap-2 justify-center items-center text-sm font-semibold">
              <LogIn size={14} />
              <span className="text-center">Check-in</span>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <span className="text-lg font-semibold text-center">
              {getCountByStatus(TransactionStatus.IN_PROCESS)}
            </span>{" "}
            <div className="flex gap-2 justify-center items-center text-sm font-semibold">
              <LucideRefreshCw size={14} />{" "}
              <span className="text-center">In-process</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x gap-4">
          <div className="flex py-4 flex-col">
            <span className="text-lg font-semibold text-center">
              {getCountByStatus(TransactionStatus.FINISHED)}
            </span>{" "}
            <div className="flex gap-2 justify-center items-center text-sm font-semibold">
              <CheckSquare size={14} />
              <span className="text-center">Finished</span>
            </div>
          </div>
          <div className="flex py-4 flex-col">
            <span className="text-lg font-semibold text-center">
              {getCountByStatus(TransactionStatus.CHECK_OUT)}
            </span>{" "}
            <div className="flex gap-2 justify-center items-center text-sm font-semibold">
              <LogOut size={14} />
              <span className="text-center">Check-out</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
