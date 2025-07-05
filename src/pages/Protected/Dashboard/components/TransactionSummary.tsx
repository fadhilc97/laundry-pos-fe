import {
  LogIn,
  LucideRefreshCw,
  CheckSquare,
  LogOut,
  ArrowUpDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export function TransactionSummary() {
  return (
    <Card className="rounded-lg justify-around p-4">
      <div className="flex flex-col">
        <span className="text-4xl font-semibold text-center">20</span>{" "}
        <div className="flex gap-2 justify-center items-center font-semibold text-sm">
          <ArrowUpDown size={14} />
          <span className="text-center">Transactions</span>
        </div>
      </div>
      <div className="divide-y">
        <div className="grid grid-cols-2 divide-x gap-4">
          <div className="py-4 flex flex-col">
            <span className="text-lg font-semibold text-center">20</span>{" "}
            <div className="flex gap-2 justify-center items-center text-sm">
              <LogIn size={14} />
              <span className="text-center">Check-in</span>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <span className="text-lg font-semibold text-center">20</span>{" "}
            <div className="flex gap-2 justify-center items-center text-sm">
              <LucideRefreshCw size={14} />{" "}
              <span className="text-center">In-process</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x gap-4">
          <div className="flex py-4 flex-col">
            <span className="text-lg font-semibold text-center">20</span>{" "}
            <div className="flex gap-2 justify-center items-center text-sm">
              <CheckSquare size={14} />
              <span className="text-center">Finished</span>
            </div>
          </div>
          <div className="flex py-4 flex-col">
            <span className="text-lg font-semibold text-center">20</span>{" "}
            <div className="flex gap-2 justify-center items-center text-sm">
              <LogOut size={14} />
              <span className="text-center">Check-out</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
