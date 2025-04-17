import { BrowserRouter, Routes, Route } from "react-router";
import { Login, NotFound, Dashboard } from "@/pages";
import { AuthRoute } from "@/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
