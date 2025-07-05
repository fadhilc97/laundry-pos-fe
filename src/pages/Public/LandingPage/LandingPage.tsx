import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="flex flex-col px-4 justify-center items-center h-screen">
      <h1 className="font-semibold text-2xl text-center">Laundry POS</h1>
      <p className="text-center text-sm leading-4 px-4 mt-1">
        Welcome to your laundry management solution.
      </p>
      <img
        src="/img/laundry-illustration.png"
        alt="Laundry Illustration, Source: https://www.vhv.rs/download/bRTTRb_washing-machine-drawing-png-transparent-png/"
        width={72}
        className="mt-8"
      />
      <Link to="/login" className="inline-block mt-8 w-full">
        <Button
          className="font-semibold w-full"
          variant="default"
          type="button"
        >
          Login
        </Button>
      </Link>
    </div>
  );
}
