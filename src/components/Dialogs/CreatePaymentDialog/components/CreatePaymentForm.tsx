import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePostCreatePayment } from "@/hooks";
import { cn, CreatePaymentFormInputs, createPaymentSchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type Props = {
  transactionId: string;
  onSuccess: () => void;
};

export default function CreatePaymentForm({ transactionId, onSuccess }: Props) {
  const {
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePaymentFormInputs>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      paymentMethod: "CASH",
      amount: 0,
    },
  });

  const postCreatePayment = usePostCreatePayment({ transactionId });

  function onSubmit(values: CreatePaymentFormInputs) {
    postCreatePayment.mutate(values, { onSuccess });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-3 rounded-lg border">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select
              onValueChange={(value) =>
                setValue("paymentMethod", value as "CASH" | "CASHLESS")
              }
              defaultValue={getValues("paymentMethod")}
            >
              <SelectTrigger
                className={cn(
                  "w-full",
                  errors.paymentMethod && "border-destructive"
                )}
              >
                <SelectValue placeholder="Select service type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CASH">Cash</SelectItem>
                <SelectItem value="CASHLESS">Cashless</SelectItem>
              </SelectContent>
            </Select>
            {errors.paymentMethod && (
              <p className="text-xs font-medium text-red-500">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="amount">Amount</Label>
            <NumericFormat
              customInput={Input}
              decimalSeparator=","
              thousandSeparator="."
              defaultValue={getValues("amount")}
              onValueChange={(values) =>
                setValue("amount", values.floatValue || 0)
              }
            />
            {errors.amount && (
              <p className="text-xs font-medium text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>
        </div>
      </Card>
      <DialogFooter className="mt-3">
        <Button
          type="submit"
          variant="default"
          disabled={postCreatePayment.isPending}
        >
          {postCreatePayment.isPending && <Loader2 className="animate-spin" />}
          Confirm
        </Button>
      </DialogFooter>
    </form>
  );
}
