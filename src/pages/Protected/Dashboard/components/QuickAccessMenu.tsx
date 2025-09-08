import { Card } from "@/components/ui/card";
import { Link } from "react-router";

import { use } from "react";
import { AuthContext } from "@/contexts";
import { QUICK_ACCESS_MENU_ITEMS, QuickAccessMenuItem } from "@/lib";

export default function QuickAccessMenu() {
  const authContext = use(AuthContext);
  const userRoles = authContext.roles;

  function filterMenuItem(menuItem: QuickAccessMenuItem): boolean {
    return (
      !menuItem.accessRoles ||
      menuItem.accessRoles.some((role) => userRoles?.includes(role))
    );
  }

  return (
    <Card className="rounded-lg flex-row justify-around p-4 overflow-auto">
      {QUICK_ACCESS_MENU_ITEMS.filter(filterMenuItem).map((menuItem) => (
        <div key={menuItem.url} className="gap-2 flex flex-col items-center">
          <Link
            to={menuItem.url}
            className="w-16 h-16 rounded-full shadow-sm border flex justify-center items-center"
          >
            {menuItem.icon}
          </Link>
          <p className="text-center text-xs font-semibold">{menuItem.label}</p>
        </div>
      ))}
    </Card>
  );
}
