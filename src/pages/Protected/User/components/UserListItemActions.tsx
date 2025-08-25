import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateUserDialog } from "@/components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

type Props = {
  id: number;
};

export default function UserListItemActions({ id }: Props) {
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
          <DropdownMenuItem onClick={handleOpenEdit}>
            Edit Role
          </DropdownMenuItem>
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
