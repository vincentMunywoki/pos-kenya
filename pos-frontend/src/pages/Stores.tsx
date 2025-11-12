import { Card } from "@/components/ui/card";
import { Store } from "lucide-react";

// Mock data
const mockStores = [
  { 
    id: "1", 
    name: "Main Store", 
    address: "123 Main St, City", 
    totalSales: 15420.50,
    salesCount: 234
  },
  { 
    id: "2", 
    name: "Branch Store", 
    address: "456 Branch Ave, Town", 
    totalSales: 8930.25,
    salesCount: 142
  },
];

const Stores = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Stores</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockStores.map((store) => (
          <Card key={store.id} className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Store className="w-6 h-6 text-primary" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-card-foreground mb-1">{store.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{store.address}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                    <p className="text-lg font-bold text-success">${store.totalSales.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <p className="text-lg font-bold text-foreground">{store.salesCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Stores;
