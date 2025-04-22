import { BrowserRouter, Routes, Route } from "react-router";
import { Login, NotFound, Dashboard } from "@/pages";
import { AuthRoute, PersistLoginRoute } from "@/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PersistLoginRoute />}>
          <Route element={<AuthRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
