import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout & Auth
import { Layout } from "./components/Layout";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Stores from "./pages/Stores";
import Suppliers from "./pages/Suppliers";
import Loyalty from "./pages/Loyalty";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Query Client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="sales" element={<Sales />} />
                <Route path="customers" element={<Customers />} />
                <Route path="products" element={<Products />} />
                <Route path="stores" element={<Stores />} />
                <Route path="suppliers" element={<Suppliers />} />
                <Route path="loyalty" element={<Loyalty />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Catch-all 404 */}
            <Route
              path="*"
              element={
                <div className="p-10 text-center text-red-600 font-bold">
                  Page Not Found
                </div>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
