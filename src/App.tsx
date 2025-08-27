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
  TransactionDetails,
  TransactionCreate,
  Customers,
  User,
  UserCreateOrUpdate,
  EditMyLaundry,
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
              {/* Accessible to anyone */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions">
                <Route index element={<Transactions />} />
                <Route
                  path="details/:transactionId"
                  element={<TransactionDetails />}
                />
              </Route>
              <Route path="/customers" element={<Customers />} />
              <Route path="/others" element={<Others />} />

              {/* Accessible to OWNER and STAFF only */}
              <Route
                element={<UserRolesRoute roles={[Role.OWNER, Role.STAFF]} />}
              >
                <Route path="/transactions">
                  <Route path="create" element={<TransactionCreate />} />
                </Route>
                <Route path="/others">
                  <Route path="my-laundry">
                    <Route index element={<MyLaundry />} />
                    <Route path="edit" element={<EditMyLaundry />} />
                  </Route>
                </Route>
              </Route>

              {/* Accessible to SUPER ADMIN only */}
              <Route element={<UserRolesRoute roles={[Role.SUPER_ADMIN]} />}>
                <Route path="/user">
                  <Route index element={<User />} />
                  <Route path="create" element={<UserCreateOrUpdate />} />
                  <Route
                    path="update/:userId"
                    element={<UserCreateOrUpdate />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
