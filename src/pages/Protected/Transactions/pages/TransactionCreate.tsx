import { usePostCreateTransaction } from "@/hooks";
import { CreateTransactionFormInputs, createTransactionSchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import {
  BasicInfoInputs,
  CreateActions,
  ItemListInputs,
} from "../components/TransactionCreate";

export default function TransactionCreate() {
  const [searchParams] = useSearchParams({
    serviceType: "REGULAR",
  });
  const serviceType = searchParams.get("serviceType") as string;

  const form = useForm<CreateTransactionFormInputs>({
    defaultValues: {
      serviceType: serviceType as string,
      items: [],
    },
    resolver: zodResolver(createTransactionSchema),
  });

  const postCreateTransaction = usePostCreateTransaction();

  function onSubmit(data: CreateTransactionFormInputs) {
    postCreateTransaction.mutate(data);
  }

  form.watch("items");

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-4">
        <BasicInfoInputs />
        <ItemListInputs />
        <CreateActions isLoading={postCreateTransaction.isPending} />
      </form>
    </FormProvider>
  );
}
