import { Outlet, useLocation } from "react-router-dom";

import { useEffect } from "react";
import { useNavigationCustomerDashboardStore } from "@/stores/useNavigationCustomerDashboardStore";
import SidebarNav from "@/pages/CustomerDashboard/components/SidebarNav";

const CustomerDashboardLayout = () => {
  const { pathname } = useLocation();
  const { setActiveItem } = useNavigationCustomerDashboardStore();

  // Sincroniza o destaque da sidebar com a URL atual
  useEffect(() => {
    const path = pathname.split("/").pop() || "dashboard";
    setActiveItem(path);
  }, [pathname, setActiveItem]);

  return (
    <div className="flex flex-col gap-6 p-8 w-full">
      <div className="flex flex-col md:flex-row gap-8 w-full items-start">
        <SidebarNav />
        <main className="flex-1 w-full">
          {/* O Outlet renderiza o componente da rota filha aqui */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboardLayout;
