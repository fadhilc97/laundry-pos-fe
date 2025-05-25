import { NavLink } from "react-router";
import { Home, ArrowLeftRight, Users, Menu } from "lucide-react";
import { cn } from "@/lib";

export type NavMenuItem = {
  url: string;
  icon: React.ReactElement;
  label: string;
};

const NAV_MENU_ITEMS: NavMenuItem[] = [
  { url: "/dashboard", icon: <Home size={18} />, label: "Home" },
  { url: "/transactions", icon: <ArrowLeftRight size={18} />, label: "Orders" },
  { url: "/customers", icon: <Users size={18} />, label: "Customers" },
  { url: "/others", icon: <Menu size={18} />, label: "Others" },
];

export default function NavMenus() {
  return (
    <nav className="w-full fixed bottom-0 bg-white">
      <ul className="flex border *:w-full">
        {NAV_MENU_ITEMS.map((menuItem) => (
          <li key={menuItem.url}>
            <NavLink
              to={menuItem.url}
              className={(navLinkProps) => {
                return cn(
                  "nav-menu-item",
                  navLinkProps.isActive && "nav-menu-item-active"
                );
              }}
            >
              {menuItem.icon}
              {menuItem.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
