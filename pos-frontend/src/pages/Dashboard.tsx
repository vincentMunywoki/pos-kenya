import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ProductCard } from "@/components/ProductCard";
import { CartPanel } from "@/components/CartPanel";
import { CustomerInfoCard } from "@/components/CustomerInfoCard";
import { Receipt } from "@/components/Receipt";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext"; // <-- import auth

// Mock products
const mockProducts = [
  { id: "1", name: "Wireless Mouse", price: 29.99, stock: 45, image: "" },
  { id: "2", name: "USB-C Cable", price: 12.99, stock: 8, image: "" },
  { id: "3", name: "Keyboard", price: 79.99, stock: 23, image: "" },
  { id: "4", name: "Headphones", price: 149.99, stock: 15, image: "" },
  { id: "5", name: "Webcam", price: 89.99, stock: 3, image: "" },
  { id: "6", name: "Monitor Stand", price: 39.99, stock: 30, image: "" },
];

const Dashboard = () => {
  const { user } = useAuth(); // <-- get current user
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<
    Array<{ id: string; name: string; price: number; quantity: number }>
  >([]);
  
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: `Receipt-${new Date().toLocaleDateString()}`,
    onAfterPrint: () => {
      toast({
        title: "Receipt printed",
        description: "Receipt has been sent to the printer.",
      });
    },
  });

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }]);
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
      variant: "destructive",
    });
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    toast({
      title: "Checkout successful",
      description: `Total: $${total.toFixed(2)}`,
    });
    setTimeout(() => {
      handlePrint();
      setCartItems([]);
    }, 500);
  };

  const handlePrintReceipt = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add items to cart before printing receipt.",
        variant: "destructive",
      });
      return;
    }
    handlePrint();
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2 space-y-6">
          {/* Display logged-in user's name */}
          <CustomerInfoCard
            name={user?.name || "Guest"}
            email={user?.email || ""}
            loyaltyPoints={0} // You can fetch real points later
          />

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search products or scan barcode..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <CartPanel
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            onPrintReceipt={handlePrintReceipt}
          />
        </div>
      </div>

      <div className="hidden">
        <Receipt
          ref={receiptRef}
          items={cartItems}
          storeName="Main Store"
          storeAddress="123 Main St, City, State 12345"
          customerName={user?.name || "Guest"} // use actual logged-in name
          date={new Date()}
        />
      </div>
    </>
  );
};

export default Dashboard;
