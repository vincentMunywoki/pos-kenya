import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, AlertTriangle } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
  onAddToCart: (id: string) => void;
}

export const ProductCard = ({ id, name, price, stock, image, onAddToCart }: ProductCardProps) => {
  const isLowStock = stock < 10;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-muted relative">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        {isLowStock && (
          <Badge variant="destructive" className="absolute top-2 right-2 gap-1">
            <AlertTriangle className="w-3 h-3" />
            Low Stock
          </Badge>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-card-foreground line-clamp-1">{name}</h3>
          <p className="text-sm text-muted-foreground">Stock: {stock}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
          <Button 
            size="sm" 
            onClick={() => onAddToCart(id)}
            disabled={stock === 0}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};
