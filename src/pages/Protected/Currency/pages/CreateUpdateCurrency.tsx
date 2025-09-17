import { useParams } from "react-router";
import CreateUpdateCurrencyForm from "../components/CreateUpdateCurrencyForm";

export default function CreateUpdateCurrency() {
  const params = useParams<{ currencyId: string }>();

  return (
    <div className="space-y-3 p-4">
      <h1 className="font-semibold items-center text-md">
        {params.currencyId ? "Update" : "Create"} Currency
      </h1>
      <CreateUpdateCurrencyForm />
    </div>
  );
}
