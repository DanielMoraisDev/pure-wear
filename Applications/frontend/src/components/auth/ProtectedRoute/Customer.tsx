import { useCustomerStore } from "@/stores/useCustomerStore";
import { Navigate, Outlet } from "react-router-dom";

export const CustomerProtectedRoute = () => {
  const customerInfo = useCustomerStore((state) => state.customerInfo);

  if (!customerInfo) {
    // Redireciona para o login se não estiver logado
    return <Navigate to="/auth?type=login" replace />;
  }

  return <Outlet />; // Renderiza as rotas filhas (o dashboard)
};
