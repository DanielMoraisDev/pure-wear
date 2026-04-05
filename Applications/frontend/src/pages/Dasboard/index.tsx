import { SidebarNav } from "./components/SidebarNav";
import { StatCard } from "./components/StatCard";

const Dashboard = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Lado Esquerdo: Menu */}
        <aside>
          <SidebarNav />
        </aside>

        {/* Lado Direito: Grid de Cards */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 h-fit">
          <StatCard title="Users" value="1" linkText="View Users" />
          <StatCard title="Orders" value="1" linkText="View Orders" />
          <StatCard title="Products" value="1" linkText="View Products" />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
