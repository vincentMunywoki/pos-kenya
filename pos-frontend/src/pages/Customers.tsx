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
import { Search, UserPlus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockCustomers = [
  { 
    id: "1", 
    name: "John Doe", 
    email: "john@example.com", 
    phone: "+1234567890",
    loyaltyPoints: 4500,
    totalPurchases: 12500.50
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane@example.com", 
    phone: "+1234567891",
    loyaltyPoints: 3200,
    totalPurchases: 8900.30
  },
  { 
    id: "3", 
    name: "Bob Johnson", 
    email: "bob@example.com", 
    phone: "+1234567892",
    loyaltyPoints: 1500,
    totalPurchases: 4500.00
  },
];

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomer = () => {
    toast({
      title: "Add Customer",
      description: "Customer creation form would open here.",
    });
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Edit Customer",
      description: `Editing customer ${id}`,
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Delete Customer",
      description: `Customer ${id} deleted`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Customers</h1>
        <Button onClick={handleAddCustomer}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Card className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search customers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Loyalty Points</TableHead>
              <TableHead>Total Purchases</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{customer.loyaltyPoints} pts</Badge>
                </TableCell>
                <TableCell className="font-semibold text-primary">
                  Ksh. {customer.totalPurchases.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(customer.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDelete(customer.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Customers;
