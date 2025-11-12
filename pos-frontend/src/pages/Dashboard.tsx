import { useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import CartItem from "../components/CartPanel";
import CustomerInfo from "../components/CustomerInfo";
import Receipt from "../components/Receipt";
import Sidebar from "../components/Sidebar";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface Customer {
  name: string;
  loyalty_points: number;
}

const dummyProducts: Product[] = [
  { id: 1, name: "Hammer", price: 1200, stock: 10 },
  { id: 2, name: "Screwdriver", price: 800, stock: 15 },
];

const Dashboard = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [customer] = useState<Customer | null>({
    name: "John Doe",
    loyalty_points: 120,
  });

  const receiptRef = useRef<HTMLDivElement>(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1, total: (i.quantity + 1) * i.price }
            : i
        );
      } else {
        return [...prev, { ...product, quantity: 1, total: product.price }];
      }
    });
  };

 
  const total = cart.reduce((a, b) => a + b.total, 0);

  return (
    <div className="flex h-screen">
      <aside className="w-64">
        <Sidebar />
      </aside>
      <main className="flex-1 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="flex flex-1 gap-4">
          <div className="grid grid-cols-2 gap-4 flex-1">
            {dummyProducts.map((p) => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </div>
          <div className="w-80">
            <CustomerInfo customer={customer} />
            <div className="border rounded mb-4 p-2">
              <h3 className="font-bold mb-2">Cart</h3>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <p className="mt-2 font-bold">Total: KES {total}</p>
            </div>
          </div>
        </div>

        {/* Receipt preview */}
        <Receipt ref={receiptRef} sale={{ id: 1, total_amount: total, items: cart }} customer={customer} />
      </main>
    </div>
  );
};

export default Dashboard;
