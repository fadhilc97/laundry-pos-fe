import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmInactiveUserDialog, UpdateUserDialog } from "@/components";
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
  const [openConfirmInactiveDialog, setOpenConfirmInactiveDialog] =
    useState<boolean>(false);

  function handleOpenEdit() {
    setSearchParams({ userId: id.toString() });
    setOpenUpdateUserDialog(true);
    setOpen(false);
  }

  function handleOpenInactive() {
    setSearchParams({ userId: id.toString() });
    setOpenConfirmInactiveDialog(true);
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
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => handleOpenInactive()}
            >
              Set to Inactive
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>Reset Password</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateUserDialog
        open={openUpdateUserDialog}
        setOpen={setOpenUpdateUserDialog}
      />
      <ConfirmInactiveUserDialog
        open={openConfirmInactiveDialog}
        setOpen={setOpenConfirmInactiveDialog}
      />
    </>
  );
}
