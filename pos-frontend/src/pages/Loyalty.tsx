import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Gift, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockLoyaltyCustomers = [
  { id: "1", name: "John Doe", points: 450, tier: "Gold", totalSpent: 1250.50 },
  { id: "2", name: "Jane Smith", points: 320, tier: "Silver", totalSpent: 890.30 },
  { id: "3", name: "Bob Johnson", points: 150, tier: "Bronze", totalSpent: 450.00 },
];

const Loyalty = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Loyalty Program</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Gift className="w-8 h-8 text-primary" />
            <h3 className="text-lg font-semibold">Total Members</h3>
          </div>
          <p className="text-3xl font-bold text-foreground">{mockLoyaltyCustomers.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-success" />
            <h3 className="text-lg font-semibold">Points Issued</h3>
          </div>
          <p className="text-3xl font-bold text-foreground">
            {mockLoyaltyCustomers.reduce((sum, c) => sum + c.points, 0)}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Gift className="w-8 h-8 text-warning" />
            <h3 className="text-lg font-semibold">Average Points</h3>
          </div>
          <p className="text-3xl font-bold text-foreground">
            {Math.round(mockLoyaltyCustomers.reduce((sum, c) => sum + c.points, 0) / mockLoyaltyCustomers.length)}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Member Overview</h2>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Total Spent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLoyaltyCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{customer.points} pts</Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      customer.tier === "Gold" ? "default" :
                      customer.tier === "Silver" ? "secondary" :
                      "outline"
                    }
                  >
                    {customer.tier}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-success">
                  Ksh. {customer.totalSpent.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Loyalty;
