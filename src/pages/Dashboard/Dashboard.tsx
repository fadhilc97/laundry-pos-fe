import { Button } from "@/components/ui/button";
import { useGetMyLaundry, usePostLogout } from "@/hooks";

export default function Dashboard() {
  const postLogout = usePostLogout();
  const getMyLaundry = useGetMyLaundry();
  const myLaundryData = getMyLaundry.data?.data.data;

  return (
    <div className="space-y-2">
      <h1>Dashboard page</h1>
      <h2>Your laundry info:</h2>
      <p>Name: {myLaundryData?.name}</p>
      <p>Address: {myLaundryData?.address}</p>
      <Button
        type="button"
        onClick={() => postLogout.mutate()}
        disabled={postLogout.isPending}
      >
        Logout
      </Button>
    </div>
  );
}
