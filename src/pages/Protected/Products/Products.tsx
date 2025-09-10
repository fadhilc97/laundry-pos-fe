import { useGetProductList } from "@/hooks";
import ProductListItem from "./components/ProductListItem";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams({
    serviceType: "REGULAR",
  });
  const getProductList = useGetProductList();
  const products = getProductList.data?.data.data;

  return (
    <div className="space-y-3 p-4">
      <div className="flex justify-between">
        <h1 className="font-semibold items-center text-md">Product List</h1>
      </div>
      <Button type="button" className="w-full font-semibold">
        Create New Product
      </Button>
      <div className="flex gap-2 justify-center">
        <Button
          type="button"
          onClick={() => setSearchParams({ serviceType: "REGULAR" })}
          size="sm"
          variant={
            searchParams.get("serviceType") === "REGULAR"
              ? "default"
              : "outline"
          }
          className="font-semibold"
        >
          Regular
        </Button>
        <Button
          type="button"
          onClick={() => setSearchParams({ serviceType: "EXPRESS" })}
          size="sm"
          variant={
            searchParams.get("serviceType") === "EXPRESS"
              ? "default"
              : "outline"
          }
          className="font-semibold"
        >
          Express
        </Button>
        <Button
          type="button"
          onClick={() => setSearchParams({ serviceType: "FLASH" })}
          size="sm"
          variant={
            searchParams.get("serviceType") === "FLASH" ? "default" : "outline"
          }
          className="font-semibold"
        >
          Flash
        </Button>
      </div>
      {products?.map((product) => (
        <ProductListItem
          key={product.id}
          id={product.id}
          name={product.name}
          currency={product.currency.symbol}
          price={product.price}
        />
      ))}
    </div>
  );
}
