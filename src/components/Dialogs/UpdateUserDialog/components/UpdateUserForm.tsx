import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useGetListRole, useGetUserDetail, usePutUpdateUser } from "@/hooks";
import { UpdateUserFormInputs, updateUserSchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

type Props = {
  onSuccess: () => void;
};

export default function UpdateUserForm({ onSuccess }: Props) {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId") as string;

  const getListRole = useGetListRole();
  const putUpdateUser = usePutUpdateUser(userId);
  const getUserDetail = useGetUserDetail(userId);
  const userData = getUserDetail.data?.data.data;

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserFormInputs>({
    values: {
      roleIds: userData?.roles.map((role) => role.id) || [],
    },
    resolver: zodResolver(updateUserSchema),
  });

  function onSubmit(values: UpdateUserFormInputs) {
    putUpdateUser.mutate(values, { onSuccess });
  }

  return (
    <form>
      <Card className="max-h-3/4 overflow-auto p-3 rounded-lg border">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="address">Roles</Label>
            <div className="p-2 rounded-lg border space-y-1 shadow-xs">
              {getListRole.data?.data.data?.map((role) => (
                <div key={role.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`role-${role.id}`}
                    // defaultChecked={userData?.roles
                    //   .map((role) => role.id)
                    //   .includes(role.id)}
                    checked={!!watch("roleIds")?.includes(role.id)}
                    onCheckedChange={(checked) => {
                      const currentRoleIds = watch("roleIds") || [];
                      if (checked) {
                        setValue("roleIds", [...currentRoleIds, role.id]);
                      } else {
                        setValue(
                          "roleIds",
                          currentRoleIds.filter((id) => id !== role.id)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={`role-${role.id}`}>{role.name}</Label>
                </div>
              ))}
            </div>
            {errors.roleIds && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {errors.roleIds.message}
              </p>
            )}
          </div>
        </div>
      </Card>
      <DialogFooter className="mt-3">
        <Button
          type="button"
          variant="default"
          className="font-semibold"
          onClick={handleSubmit(onSubmit)}
          disabled={putUpdateUser.isPending}
        >
          {putUpdateUser.isPending && <Loader2 className="animate-spin" />}
          Update
        </Button>
      </DialogFooter>
    </form>
  );
}
