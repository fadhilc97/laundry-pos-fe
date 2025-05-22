import { ArrowLeftRight, Users, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router";
import { NavMenuItem } from "@/components/NavMenus/NavMenus";

type QuickAccessMenuItems = NavMenuItem;

const QUICE_ACCESS_MENU_ITEMS: QuickAccessMenuItems[] = [
  { url: "/transactions", icon: <ArrowLeftRight />, label: "Orders" },
  { url: "/customers", icon: <Users />, label: "Customers" },
  { url: "/products", icon: <ShoppingBag />, label: "Products" },
];

export default function QuickAccessMenu() {
  return (
    <Card className="rounded-lg flex-row justify-around p-4">
      {QUICE_ACCESS_MENU_ITEMS.map((menuItem) => (
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
