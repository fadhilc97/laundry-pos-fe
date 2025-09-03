import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/contexts";
import { useGetListRole, usePostCreateUser } from "@/hooks";
import { CreateUserFormInputs, createUserSchema, Role } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { use, useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  onSuccess: () => void;
};

export default function CreateUserForm({ onSuccess }: Props) {
  const authContext = use(AuthContext);

  const getListRole = useGetListRole();
  const postCreateUser = usePostCreateUser();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateUserFormInputs>({
    defaultValues: {
      roleIds: [],
    },
    resolver: zodResolver(createUserSchema),
  });

  function onSubmit(values: CreateUserFormInputs) {
    postCreateUser.mutate(values, { onSuccess });
  }

  useEffect(() => {
    // Checkmark the "Staff" role by default for OWNER user
    if (!getListRole.isPending && authContext.roles?.includes(Role.OWNER)) {
      const role = getListRole.data?.data.data?.find(
        (roleData) => roleData.identifier === Role.STAFF
      );
      if (role) setValue("roleIds", [role.id]);
    }
  }, [getListRole.isPending]);

  return (
    <form>
      <Card className="max-h-3/4 overflow-auto p-3 rounded-lg border">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="User Name"
              className="mt-1"
              autoComplete="off"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="address">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="User Email"
              className="mt-1"
              autoComplete="off"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="address">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="User Password"
              className="mt-1"
              autoComplete="off"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="address">Roles</Label>
            <div className="p-2 rounded-lg border space-y-1 shadow-xs">
              {getListRole.data?.data.data?.map((role) => (
                <div key={role.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`role-${role.id}`}
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
          disabled={postCreateUser.isPending}
        >
          {postCreateUser.isPending && <Loader2 className="animate-spin" />}
          Create
        </Button>
      </DialogFooter>
    </form>
  );
}
