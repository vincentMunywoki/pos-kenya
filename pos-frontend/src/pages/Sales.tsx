import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockSales = [
  { 
    id: "1", 
    date: "2025-01-12", 
    customer: "John Doe", 
    store: "Main Store", 
    total: 249.97, 
    items: 3,
    status: "completed" 
  },
  { 
    id: "2", 
    date: "2025-01-12", 
    customer: "Jane Smith", 
    store: "Main Store", 
    total: 89.99, 
    items: 1,
    status: "completed" 
  },
  { 
    id: "3", 
    date: "2025-01-11", 
    customer: "Bob Johnson", 
    store: "Branch Store", 
    total: 159.98, 
    items: 2,
    status: "completed" 
  },
];

const Sales = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSales = mockSales.filter(sale =>
    sale.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.id.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Sales History</h1>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search by customer or sale ID..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sale ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">#{sale.id}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.store}</TableCell>
                <TableCell>{sale.items}</TableCell>
                <TableCell className="font-semibold text-primary">
                  ${sale.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{sale.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Sales;
