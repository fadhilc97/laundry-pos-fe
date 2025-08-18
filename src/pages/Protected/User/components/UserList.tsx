import { useGetUserList } from "@/hooks/api/users";
import UserListItem from "./UserListItem";

export default function UserList() {
  const getUserList = useGetUserList();
  const users = getUserList.data?.data.data;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h1 className="font-semibold items-center text-md">User List</h1>
      </div>
      {users?.map((user) => (
        <UserListItem
          key={user.id}
          name={user.name}
          email={user.email}
          roles={user.roles}
        />
      ))}
    </div>
  );
}
