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
import { Search, PackagePlus, Edit, Trash2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockProducts = [
  { id: "1", name: "Wireless Mouse", sku: "WM001", price: 290.99, stock: 45, category: "Electronics" },
  { id: "2", name: "USB-C Cable", sku: "UC002", price: 120.99, stock: 8, category: "Accessories" },
  { id: "3", name: "Keyboard", sku: "KB003", price: 790.99, stock: 23, category: "Electronics" },
  { id: "4", name: "Headphones", sku: "HP004", price: 1490.99, stock: 15, category: "Electronics" },
  { id: "5", name: "Webcam", sku: "WC005", price: 890.99, stock: 3, category: "Electronics" },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "Product creation form would open here.",
    });
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Edit Product",
      description: `Editing product ${id}`,
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Delete Product",
      description: `Product ${id} deleted`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
        <Button onClick={handleAddProduct}>
          <PackagePlus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground mb-1">Total Products</h3>
          <p className="text-2xl font-bold text-foreground">{mockProducts.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground mb-1">Total Stock</h3>
          <p className="text-2xl font-bold text-foreground">
            {mockProducts.reduce((sum, p) => sum + p.stock, 0)}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground mb-1">Low Stock Items</h3>
          <p className="text-2xl font-bold text-warning">
            {mockProducts.filter(p => p.stock < 10).length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-muted-foreground mb-1">Total Value</h3>
          <p className="text-2xl font-bold text-success">
            Ksh. {mockProducts.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="font-semibold text-primary">
                  Ksh. {product.price.toFixed(2)}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  {product.stock < 10 ? (
                    <Badge variant="destructive" className="gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Low Stock
                    </Badge>
                  ) : (
                    <Badge variant="secondary">In Stock</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(product.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
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

export default Products;
