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
} from "@/components/ui/select";
import { FilterIcon } from "lucide-react";

export default function TransactionListFilter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon">
          <FilterIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-4 h-[50vh] overflow-auto">
        <h3 className="font-semibold">Filters</h3>
        <div className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label className="block text-sm font-medium mb-1">Search</Label>
            <Input type="text" />
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium mb-1">Start Date</Label>
            <Input type="date" />
          </div>
          <div className="space-y-1">
            <Label className="block text-sm font-medium mb-1">End Date</Label>
            <Input type="date" />
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium mb-1">
              Service Type
            </Label>
            <Select defaultValue="-">
              <SelectTrigger className="w-full">All</SelectTrigger>
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
            <Select defaultValue="-">
              <SelectTrigger className="w-full">All</SelectTrigger>
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
            <Select defaultValue="-">
              <SelectTrigger className="w-full">All</SelectTrigger>
              <SelectContent>
                <SelectItem value="-">All</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="UNPAID">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex mt-4 justify-end">
          <Button variant="default" className="font-semibold">
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
