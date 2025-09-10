import { useGetCustomerList } from "@/hooks";
import CustomerListItem from "./CustomerListItem";
import { SpinnerText } from "@/components";

export default function CustomerList() {
  const getCustomerList = useGetCustomerList();
  const customers = getCustomerList.data?.data.data;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h1 className="font-semibold items-center text-md">Customer List</h1>
      </div>
      {getCustomerList.isPending && <SpinnerText text="Please wait" />}
      {customers?.map((customer) => (
        <CustomerListItem
          key={customer.id}
          id={customer.id}
          name={customer.name}
          address={customer.address}
          whatsappNumber={customer.whatsappPhone}
        />
      ))}
    </div>
  );
}
