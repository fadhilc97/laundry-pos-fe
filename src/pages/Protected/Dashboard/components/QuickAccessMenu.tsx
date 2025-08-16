import { ArrowLeftRight, Users, ShoppingBag, Users2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router";
import { NavMenuItem } from "@/components/NavMenus/NavMenus";
import { Role } from "@/lib";
import { use } from "react";
import { AuthContext } from "@/contexts";

type QuickAccessMenuItem = NavMenuItem;

const QUICE_ACCESS_MENU_ITEMS: QuickAccessMenuItem[] = [
  {
    url: "/transactions",
    icon: <ArrowLeftRight />,
    label: "Orders",
    accessRoles: [Role.OWNER, Role.STAFF],
  },
  {
    url: "/customers",
    icon: <Users />,
    label: "Customers",
    accessRoles: [Role.OWNER, Role.STAFF],
  },
  {
    url: "/products",
    icon: <ShoppingBag />,
    label: "Products",
    accessRoles: [Role.OWNER],
  },
  {
    url: "/user",
    icon: <Users2 />,
    label: "User",
    accessRoles: [Role.SUPER_ADMIN],
  },
];

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
    <Card className="rounded-lg flex-row justify-around p-4">
      {QUICE_ACCESS_MENU_ITEMS.filter(filterMenuItem).map((menuItem) => (
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
