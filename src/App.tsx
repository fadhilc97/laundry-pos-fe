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
  EditCustomer,
  Products,
  CreateUpdateProduct,
  Location,
  Currency,
  CreateUpdateCurrency,
  QuantityUnit,
  CreateUpdateQuantityUnit,
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
                  </Route>
                </Route>
              </Route>

              {/* Accessible to OWNER ONLY */}
              <Route element={<UserRolesRoute roles={[Role.OWNER]} />}>
                <Route path="/others">
                  <Route path="my-laundry">
                    <Route path="edit" element={<EditMyLaundry />} />
                  </Route>
                </Route>
                <Route path="/customers">
                  <Route path=":customerId/edit" element={<EditCustomer />} />
                </Route>
                <Route path="/products">
                  <Route index element={<Products />} />
                  <Route path="create" element={<CreateUpdateProduct />} />
                  <Route
                    path=":productId/edit"
                    element={<CreateUpdateProduct />}
                  />
                </Route>
                <Route path="/location">
                  <Route index element={<Location />} />
                </Route>
                <Route path="/currency">
                  <Route index element={<Currency />} />
                  <Route path="create" element={<CreateUpdateCurrency />} />
                  <Route
                    path=":currencyId/edit"
                    element={<CreateUpdateCurrency />}
                  />
                </Route>
                <Route path="/quantity-unit">
                  <Route index element={<QuantityUnit />} />
                  <Route path="create" element={<CreateUpdateQuantityUnit />} />
                  <Route
                    path=":qtyUnitId/edit"
                    element={<CreateUpdateQuantityUnit />}
                  />
                </Route>
              </Route>

              {/* Accessible to SUPER ADMIN and OWNER only */}
              <Route
                element={
                  <UserRolesRoute roles={[Role.SUPER_ADMIN, Role.OWNER]} />
                }
              >
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
