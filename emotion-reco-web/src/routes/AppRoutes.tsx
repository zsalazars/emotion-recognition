import MainLayout from "@/components/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard";
import LoginPage from "@/pages/LoginPage";
import Records from "@/pages/RecordsPage";
import { Outlet, Route, Routes } from "react-router";

const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/records", element: <Records /> },
];

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route>
        <Route path="/" element={<LoginPage />} />
      </Route>

      <Route
        element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      >
        {protectedRoutes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;