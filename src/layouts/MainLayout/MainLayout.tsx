import { NavMenus } from "@/components";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="pb-16">
      <Outlet />
      <NavMenus />
    </div>
  );
}
