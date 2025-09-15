import MainLayout from "@/components/layouts/MainLayout";
import Courses from "@/pages/Courses";
import Dashboard from "@/pages/Dashboard";
import Emotions from "@/pages/Emotions";
import LoginPage from "@/pages/LoginPage";
import Professors from "@/pages/Professors";
import Records from "@/pages/RecordsPage";
import { Outlet, Route, Routes } from "react-router";

const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/asignaturas", element: <Courses /> },
  { path: "/emociones", element: <Emotions /> },
  { path: "/docentes", element: <Professors /> },
  { path: "/registros-emociones", element: <Records /> },
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