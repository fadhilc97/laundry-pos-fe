import { Loader2 } from "lucide-react";

type Props = {
  text: string;
};

export default function SpinnerText({ text }: Props) {
  return (
    <p className="flex items-center gap-1 justify-center">
      <Loader2 className="animate-spin" />
      <span>{text}</span>
    </p>
  );
}
