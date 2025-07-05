import QuickAccessMenu from "./components/QuickAccessMenu";
import { TransactionSummary } from "./components/TransactionSummary";

export default function Dashboard() {
  return (
    <div className="space-y-2 p-4">
      <QuickAccessMenu />
      <TransactionSummary />
    </div>
  );
}
