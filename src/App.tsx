import { BrowserRouter, Routes, Route } from "react-router";
import {
  Login,
  NotFound,
  Dashboard,
  LandingPage,
  Errors,
  Others,
  MyLaundry,
  Transactions,
} from "@/pages";
import { AuthRoute, PersistLoginRoute, UserRolesRoute } from "@/routes";
import { Role } from "@/lib";
import { MainLayout } from "@/layouts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/errors" element={<Errors />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PersistLoginRoute />}>
          <Route element={<AuthRoute />}>
            <Route element={<MainLayout />}>
              <Route
                element={<UserRolesRoute roles={[Role.OWNER, Role.STAFF]} />}
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions">
                  <Route index element={<Transactions />} />
                </Route>
                <Route
                  path="/customers"
                  element={<p>TODO: Create customers page here</p>}
                />
                <Route path="/others">
                  <Route index element={<Others />} />
                  <Route path="my-laundry" element={<MyLaundry />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
