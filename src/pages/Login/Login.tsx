import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { data } = useQuery({
    queryKey: ["testQuery"],
    queryFn: () => Promise.resolve({ name: "Fadhil", age: 27 }),
  });

  return (
    <>
      <h1 className="text-2xl">Login Page</h1>
      <p>Name: {data?.name}</p>
      <p>Age: {data?.age} years old</p>
      <Button type="button" variant="default">
        Click me
      </Button>
    </>
  );
}
