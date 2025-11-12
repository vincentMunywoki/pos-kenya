import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  Store, 
  Truck,
  Gift,
  Settings
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/sales", icon: ShoppingCart, label: "Sales" },
  { to: "/customers", icon: Users, label: "Customers" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/stores", icon: Store, label: "Stores" },
  { to: "/suppliers", icon: Truck, label: "Suppliers" },
  { to: "/loyalty", icon: Gift, label: "Loyalty" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-sidebar-foreground">POS System</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            activeClassName="bg-sidebar-primary text-sidebar-primary-foreground"
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
