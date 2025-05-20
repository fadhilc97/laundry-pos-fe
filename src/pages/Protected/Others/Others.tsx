import OtherMenus from "./components/OtherMenus";
import Profile from "./components/Profile";

export default function Others() {
  return (
    <div className="divide-y space-y-4">
      <Profile />
      <OtherMenus />
    </div>
  );
}
