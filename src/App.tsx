import { BrowserRouter, Routes, Route } from "react-router";
import { Login, NotFound, Dashboard, Errors } from "@/pages";
import { AuthRoute, PersistLoginRoute, UserRolesRoute } from "@/routes";
import { Role } from "./lib";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/errors" element={<Errors />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PersistLoginRoute />}>
          <Route element={<AuthRoute />}>
            <Route element={<UserRolesRoute roles={[Role.STAFF]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
