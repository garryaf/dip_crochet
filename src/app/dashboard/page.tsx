import { auth } from "@/lib/auth";
import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";

/**
 * Dashboard Home — Overview page for admin/artisan.
 */
export default async function DashboardPage() {
  const session = await auth();

  const stats = [
    { label: "Products", value: "3", icon: Package, color: "text-primary" },
    { label: "Orders (This Month)", value: "12", icon: ShoppingBag, color: "text-secondary" },
    { label: "Customers", value: "48", icon: Users, color: "text-blue-500" },
    { label: "Revenue (IDR)", value: "1.140.000", icon: TrendingUp, color: "text-green-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-[#4a3a35]">
          Selamat datang, {session?.user?.name?.split(" ")[0]}! 👋
        </h2>
        <p className="text-muted-foreground font-medium mt-2">
          Berikut ringkasan toko kamu hari ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-2xl border border-border shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-3xl font-black text-[#4a3a35]">{stat.value}</p>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
        <h3 className="text-lg font-black text-[#4a3a35] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="p-4 bg-primary/5 border border-primary/10 rounded-xl text-left hover:bg-primary/10 transition-colors">
            <Package className="w-5 h-5 text-primary mb-2" />
            <p className="font-bold text-sm">Add Product</p>
            <p className="text-xs text-muted-foreground">Create new character</p>
          </button>
          <button className="p-4 bg-secondary/5 border border-secondary/10 rounded-xl text-left hover:bg-secondary/10 transition-colors">
            <ShoppingBag className="w-5 h-5 text-secondary mb-2" />
            <p className="font-bold text-sm">View Orders</p>
            <p className="text-xs text-muted-foreground">Manage pending orders</p>
          </button>
          <button className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-left hover:bg-blue-100 transition-colors">
            <TrendingUp className="w-5 h-5 text-blue-500 mb-2" />
            <p className="font-bold text-sm">Analytics</p>
            <p className="text-xs text-muted-foreground">View performance</p>
          </button>
        </div>
      </div>
    </div>
  );
}
