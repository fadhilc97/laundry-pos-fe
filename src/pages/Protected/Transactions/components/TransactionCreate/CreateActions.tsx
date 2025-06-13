import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  isLoading: boolean;
};

export default function CreateActions({ isLoading }: Props) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      variant="default"
      className="w-full font-semibold"
    >
      {isLoading && <Loader2 className="animate-spin" />}
      Confirm and Continue
    </Button>
  );
}
