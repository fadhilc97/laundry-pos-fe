import { useParams } from "react-router";
import CreateUpdateQuantityUnitForm from "../components/CreateUpdateQuantityUnitForm";

export default function CreateUpdateQuantityUnit() {
  const params = useParams<{ qtyUnitId: string }>();

  return (
    <div className="space-y-3 p-4">
      <h1 className="font-semibold items-center text-md">
        {params.qtyUnitId ? "Update" : "Create"} Quantity Unit
      </h1>
      <CreateUpdateQuantityUnitForm />
    </div>
  );
}
