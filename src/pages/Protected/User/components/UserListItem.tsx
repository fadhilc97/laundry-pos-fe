import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Mail, User } from "lucide-react";

type Props = {
  name: string;
  email: string;
  roles: { id: number; name: string }[];
};

export default function UserListItem({ name, email, roles }: Props) {
  return (
    <Card className="rounded-lg p-4">
      <div className="space-y-1 divide-y">
        <div className="flex items-center gap-2 py-2">
          <User />
          <h2 className="font-semibold text-xl">{name}</h2>
        </div>
        <div className="py-2 space-y-3">
          <div className="flex gap-2 items-center">
            <i>
              <Mail size={18} />
            </i>
            <p className="text-sm">{email}</p>
          </div>
          <div className="flex gap-2 items-center">
            {roles.map((role) => (
              <Badge key={role.id} variant="default" className="font-semibold">
                {role.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
