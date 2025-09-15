import { useParams } from "react-router";
import CreateUpdateProductForm from "../components/CreateUpdateProductForm";

export default function CreateUpdateProduct() {
  const params = useParams<{ productId: string }>();
  return (
    <div className="space-y-3 p-4">
      <h1 className="font-semibold items-center text-md">
        {params.productId ? "Update Product" : "Create New Product"}
      </h1>
      <CreateUpdateProductForm />
    </div>
  );
}
