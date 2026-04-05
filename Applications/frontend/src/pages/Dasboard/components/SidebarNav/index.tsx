import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  "Dashboard",
  "Categories",
  "Brands",
  "Products",
  "Orders",
  "Users",
  "Shipping",
  "Change Password",
  "Logout",
];

export const SidebarNav = () => {
  return (
    <div className="w-64 border rounded-lg bg-card text-card-foreground shadow-sm">
      <nav className="flex flex-col p-2">
        {menuItems.map((item) => (
          <Button
            key={item}
            variant="ghost"
            className={cn(
              "justify-start font-normal border-b last:border-0 rounded-none h-12",
              item === "Dashboard" && "font-bold bg-accent",
            )}
          >
            {item}
          </Button>
        ))}
      </nav>
    </div>
  );
};
