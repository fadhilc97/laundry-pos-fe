import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateUserDialog } from "@/components";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { AuthContext } from "@/contexts";
import { Role } from "@/lib";

type Props = {
  id: number;
};

export default function UserListItemActions({ id }: Props) {
  const authContext = use(AuthContext);
  const [_, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState<boolean>(false);
  const [openUpdateUserDialog, setOpenUpdateUserDialog] =
    useState<boolean>(false);

  function handleOpenEdit() {
    setSearchParams({ userId: id.toString() });
    setOpenUpdateUserDialog(true);
    setOpen(false);
  }

  useEffect(() => {
    if (!openUpdateUserDialog) {
      setSearchParams({});
    }
  }, [openUpdateUserDialog]);

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" size="icon">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {authContext.roles?.includes(Role.SUPER_ADMIN) && (
            <DropdownMenuItem onClick={handleOpenEdit}>
              Edit Role
            </DropdownMenuItem>
          )}
          {authContext.roles?.includes(Role.OWNER) && (
            <DropdownMenuItem className="text-destructive">
              Delete Staff
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>Reset Password</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateUserDialog
        open={openUpdateUserDialog}
        setOpen={setOpenUpdateUserDialog}
      />
    </>
  );
}
