import { useAdminStore } from "@/stores/useAdminStore";
import { Navigate, Outlet } from "react-router-dom";

export const AdminProtectedRoute = () => {
  const adminInfo = useAdminStore((state) => state.adminInfo);

  if (!adminInfo) {
    // Redireciona para o login se não estiver logado
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />; // Renderiza as rotas filhas (o dashboard)
};
