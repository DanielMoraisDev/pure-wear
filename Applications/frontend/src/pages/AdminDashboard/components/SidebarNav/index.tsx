import { Link, useNavigate } from "react-router-dom"; // Adicione useNavigate
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigationAdminDashboardStore } from "../../../../stores/useNavigationAdminDashboardStore";
import { useAdminStore } from "@/stores/useAdminStore";

const menuItems = [
  { label: "Dashboard", path: "dashboard" },
  { label: "Categories", path: "categories" },
  { label: "Brands", path: "brands" },
  { label: "Products", path: "products" },
  { label: "Orders", path: "orders" },
  { label: "Users", path: "users" },
  { label: "Shipping", path: "shipping" },
  { label: "Change Password", path: "change-password" },
  { label: "Logout", path: "logout" }, // Mantemos aqui para aparecer na lista
];

const SidebarNav = () => {
  const { activeItem } = useNavigationAdminDashboardStore();
  const logout = useAdminStore((state) => state.logout); // Pega a função de logout
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede o Link de tentar navegar
    logout(); // Limpa o estado e o localStorage
    navigate("/admin/login"); // Manda o usuário de volta para o login
  };

  return (
    <Card className="md:min-w-[260px] md:max-w-[260px] w-full h-fit overflow-hidden shadow-sm border-gray-200">
      <nav className="flex flex-col">
        {menuItems.map((item) => {
          const isLogout = item.path === "logout";

          return (
            <Link
              key={item.path}
              to={isLogout ? "#" : `/admin/${item.path}`}
              className="w-full"
              onClick={isLogout ? handleLogout : undefined} // Intercepta se for logout
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start rounded-none h-14 px-6 border-b last:border-0 text-base font-normal",
                  activeItem === item.path
                    ? "bg-gray-100 font-bold text-black border-r-4 border-r-black"
                    : "text-gray-500 hover:bg-gray-50",
                  isLogout && "text-red-500 hover:text-red-600 hover:bg-red-50", // Estilo visual para logout
                )}
              >
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </Card>
  );
};

export default SidebarNav;
