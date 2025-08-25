import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateUserDialog } from "@/components";
import { useState } from "react";

type Props = {
  id: number;
};

export default function UserListItemActions({ id }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [openUpdateUserDialog, setOpenUpdateUserDialog] =
    useState<boolean>(false);

  function handleOpenEdit() {
    setOpenUpdateUserDialog(true);
    setOpen(false);
  }

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" size="icon">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleOpenEdit}>
            Edit Role
          </DropdownMenuItem>
          <DropdownMenuItem>Reset Password</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateUserDialog
        id={id}
        open={openUpdateUserDialog}
        setOpen={setOpenUpdateUserDialog}
      />
    </>
  );
}
