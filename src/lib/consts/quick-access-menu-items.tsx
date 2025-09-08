import { ArrowLeftRight, Users, ShoppingBag, Users2 } from "lucide-react";
import { NavMenuItem } from "@/components/NavMenus/NavMenus";
import { Role } from "@/lib";

export type QuickAccessMenuItem = NavMenuItem;

export const QUICK_ACCESS_MENU_ITEMS: QuickAccessMenuItem[] = [
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
  {
    url: "/user",
    icon: <Users2 />,
    label: "Staff",
    accessRoles: [Role.OWNER],
  },
];
