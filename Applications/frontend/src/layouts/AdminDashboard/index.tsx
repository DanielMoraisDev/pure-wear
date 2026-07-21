import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useNavigationAdminDashboardStore } from "@/stores/useNavigationAdminDashboardStore";
import SidebarNav from "@/pages/AdminDashboard/components/SidebarNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AdminDashboardLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setActiveItem } = useNavigationAdminDashboardStore();

  // Sincroniza o destaque da sidebar com a URL atual
  useEffect(() => {
    const path = pathname.split("/").pop() || "dashboard";
    setActiveItem(path);
  }, [pathname, setActiveItem]);

  return (
    <div className="flex flex-col gap-6 p-8 w-full">
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Admin Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your ecommerce store and orders
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="rounded-full border-black/10 bg-white px-4 py-2 shadow-sm hover:bg-black hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>

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
