import { forwardRef } from "react";
import { Separator } from "./ui/separator";

interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ReceiptProps {
  items: ReceiptItem[];
  storeName?: string;
  storeAddress?: string;
  customerName?: string;
  saleId?: string;
  date?: Date;
}

export const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(
  ({ items, storeName = "POS System", storeAddress = "123 Main St, City", customerName, saleId, date = new Date() }, ref) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return (
      <div ref={ref} className="bg-white text-black p-8 max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-teal-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">P</span>
          </div>
          <h1 className="text-2xl font-bold mb-1">{storeName}</h1>
          <p className="text-sm text-gray-600">{storeAddress}</p>
          <p className="text-sm text-gray-600">Tel: +1 (555) 123-4567</p>
        </div>

        <Separator className="my-4 bg-gray-300" />

        {/* Receipt Info */}
        <div className="text-sm mb-4 space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">Receipt #:</span>
            <span className="font-medium">{saleId || Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{date.toLocaleDateString()} {date.toLocaleTimeString()}</span>
          </div>
          {customerName && (
            <div className="flex justify-between">
              <span className="text-gray-600">Customer:</span>
              <span className="font-medium">{customerName}</span>
            </div>
          )}
        </div>

        <Separator className="my-4 bg-gray-300" />

        {/* Items */}
        <div className="mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left pb-2 font-semibold">Item</th>
                <th className="text-center pb-2 font-semibold">Qty</th>
                <th className="text-right pb-2 font-semibold">Price</th>
                <th className="text-right pb-2 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-2">{item.name}</td>
                  <td className="text-center py-2">{item.quantity}</td>
                  <td className="text-right py-2">${item.price.toFixed(2)}</td>
                  <td className="text-right py-2">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Separator className="my-4 bg-gray-300" />

        {/* Totals */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (10%):</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2 bg-gray-300" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Separator className="my-4 bg-gray-300" />

        {/* Footer */}
        <div className="text-center text-xs text-gray-600 space-y-1">
          <p className="font-semibold">Thank you for your purchase!</p>
          <p>Please visit us again</p>
          <p className="mt-3">For support: support@possystem.com</p>
          <p className="mt-4">Powered by POS System</p>
        </div>
      </div>
    );
  }
);

Receipt.displayName = "Receipt";
