import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Minus, Plus, Trash2, Printer } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartPanelProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onPrintReceipt: () => void;
}

export const CartPanel = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  onPrintReceipt 
}: CartPanelProps) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  
  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold text-card-foreground">Cart</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {items.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Cart is empty
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-card-foreground">{item.name}</h4>
                  <p className="text-sm text-primary font-semibold">Ksh.{item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button 
                    size="icon" 
                    variant="outline"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="destructive"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      
      {items.length > 0 && (
        <>
          <Separator />
          <div className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">Ksh.{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (10%)</span>
              <span className="font-medium">Ksh.{tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">Ksh.{total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="p-4 pt-0 space-y-2">
            <Button className="w-full" size="lg" onClick={onCheckout}>
              Checkout
            </Button>
            <Button 
              className="w-full" 
              size="lg" 
              variant="outline"
              onClick={onPrintReceipt}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Receipt
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};
