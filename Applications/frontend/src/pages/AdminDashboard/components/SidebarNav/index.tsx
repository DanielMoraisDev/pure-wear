import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigationAdminDashboardStore } from "../../../../stores/useNavigationAdminDashboardStore";

const menuItems = [
  { label: "Dashboard", path: "dashboard" },
  { label: "Categories", path: "categories" },
  { label: "Brands", path: "brands" },
  { label: "Products", path: "products" },
  { label: "Orders", path: "orders" },
  { label: "Users", path: "users" },
  { label: "Shipping", path: "shipping" },
  { label: "Change Password", path: "change-password" },
  { label: "Logout", path: "logout" },
];

const SidebarNav = () => {
  const { activeItem } = useNavigationAdminDashboardStore();

  return (
    <Card className="md:min-w-[260px] md:max-w-[260px] w-full h-fit overflow-hidden shadow-sm border-gray-200">
      <nav className="flex flex-col">
        {menuItems.map((item) => (
          <Link key={item.path} to={`/admin/${item.path}`} className="w-full">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start rounded-none h-14 px-6 border-b last:border-0 text-base font-normal",
                activeItem === item.path
                  ? "bg-gray-100 font-bold text-black border-r-4 border-r-black"
                  : "text-gray-500 hover:bg-gray-50",
              )}
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </Card>
  );
};

export default SidebarNav;
