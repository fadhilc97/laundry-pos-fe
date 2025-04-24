import { useSearchParams } from "react-router";
import Forbidden from "./Forbidden/Forbidden";

export default function Errors() {
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("code");

  switch (errorCode) {
    case "403":
      return <Forbidden />;
  }
}
