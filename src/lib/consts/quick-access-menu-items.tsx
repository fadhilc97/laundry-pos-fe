import {
  ArrowLeftRight,
  Users,
  ShoppingBag,
  Users2,
  Pin,
  Currency,
  Ruler,
} from "lucide-react";
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
    url: "/products?serviceType=REGULAR",
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
  {
    url: "/location",
    icon: <Pin />,
    label: "Shelf Location",
    accessRoles: [Role.OWNER],
  },
  {
    url: "/currency",
    icon: <Currency />,
    label: "Currency",
    accessRoles: [Role.OWNER],
  },
  {
    url: "/quantity-unit",
    icon: <Ruler />,
    label: "Quantity Unit",
    accessRoles: [Role.OWNER],
  },
];
