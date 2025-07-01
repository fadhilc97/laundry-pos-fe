import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TransactionListFilterFormInputs,
  transactionListFilterSchema,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

export default function TransactionListFilter() {
  const [open, setOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<TransactionListFilterFormInputs>({
    resolver: zodResolver(transactionListFilterSchema),
    defaultValues: Object.fromEntries(searchParams),
  });

  function handleSubmit(value: TransactionListFilterFormInputs) {
    const valueEntries = Object.entries(value);
    let filters: { [key: string]: string } = {};
    for (const [key, value] of valueEntries) {
      if (value) {
        filters[key] = value;
      }
    }
    setSearchParams(filters);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon">
          <FilterIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-4 h-[50vh] overflow-auto">
        <h3 className="font-semibold">Filters</h3>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4 mt-2">
            <div className="space-y-1">
              <Label className="block text-sm font-medium mb-1">Search</Label>
              <Input type="text" {...form.register("search")} />
            </div>

            <div className="space-y-1">
              <Label className="block text-sm font-medium mb-1">
                Start Date
              </Label>
              <Input type="date" {...form.register("startDate")} />
            </div>
            <div className="space-y-1">
              <Label className="block text-sm font-medium mb-1">End Date</Label>
              <Input type="date" {...form.register("endDate")} />
            </div>

            <div className="space-y-1">
              <Label className="block text-sm font-medium mb-1">
                Service Type
              </Label>
              <Select
                defaultValue={searchParams.get("serviceType") || "-"}
                onValueChange={(value) =>
                  form.setValue(
                    "serviceType",
                    value === "-" ? undefined : value
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-">All</SelectItem>
                  <SelectItem value="REGULAR">Regular</SelectItem>
                  <SelectItem value="EXPRESS">Express</SelectItem>
                  <SelectItem value="FLASH">Flash</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="block text-sm font-medium mb-1">
                Transaction Status
              </Label>
              <Select
                defaultValue={searchParams.get("transactionStatus") || "-"}
                onValueChange={(value) =>
                  form.setValue(
                    "transactionStatus",
                    value === "-" ? undefined : value
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-">All</SelectItem>
                  <SelectItem value="CHECK_IN">Check-in</SelectItem>
                  <SelectItem value="IN_PROCESS">In-process</SelectItem>
                  <SelectItem value="FINISHED">Finished</SelectItem>
                  <SelectItem value="CHECK_OUT">Check-out</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="block text-sm font-medium mb-1">
                Payment Status
              </Label>
              <Select
                defaultValue={searchParams.get("paymentStatus") || "-"}
                onValueChange={(value) =>
                  form.setValue(
                    "paymentStatus",
                    value === "-" ? undefined : value
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-">All</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="UNPAID">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex mt-4 justify-end">
            <Button type="submit" variant="default" className="font-semibold">
              Apply
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
