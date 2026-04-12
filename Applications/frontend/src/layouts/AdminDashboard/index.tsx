import { Outlet, useLocation } from "react-router-dom";

import { useEffect } from "react";
import { useNavigationAdminDashboardStore } from "@/stores/useNavigationAdminDashboardStore";
import SidebarNav from "@/pages/AdminDashboard/components/SidebarNav";

const AdminDashboardLayout = () => {
  const { pathname } = useLocation();
  const { setActiveItem } = useNavigationAdminDashboardStore();

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

export default AdminDashboardLayout;
