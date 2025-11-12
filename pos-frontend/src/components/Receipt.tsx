import React, { forwardRef } from "react";

interface ReceiptItem {
  name: string;
  quantity: number;
  total: number;
  price?: number;
}

interface Sale {
  id: number;
  total_amount: number;
  items: ReceiptItem[];
}

interface Customer {
  name: string;
  loyalty_points: number;
}

interface ReceiptProps {
  sale: Sale | null;
  customer?: Customer | null;
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(({ sale, customer }, ref) => {
  return (
    <div
      ref={ref}
      className="w-80 mx-auto p-4 border border-gray-400 rounded text-sm font-mono bg-white"
    >
      {/* Store Header */}
      <div className="text-center mb-2">
        <h2 className="text-lg font-bold">QuickPOS Hardware</h2>
        <p>Downtown Nairobi, Kenya</p>
        <p>Tel: +254 700 000 000</p>
      </div>

      <hr className="my-2" />

      {/* Sale Info */}
      {sale ? (
        <>
          <div className="flex justify-between text-xs">
            <span>Sale ID: {sale.id}</span>
            <span>{new Date().toLocaleString()}</span>
          </div>

          {/* Customer Info */}
          {customer && (
            <div className="mt-1 text-xs">
              <p>Customer: {customer.name}</p>
              <p>Loyalty Points: {customer.loyalty_points}</p>
            </div>
          )}

          <hr className="my-2" />

          {/* Item List */}
          {sale.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>KES {item.total.toFixed(2)}</span>
            </div>
          ))}

          <hr className="my-2" />

          {/* Totals */}
          <div className="flex justify-between font-bold text-sm">
            <span>Total</span>
            <span>KES {sale.total_amount.toFixed(2)}</span>
          </div>

          <p className="text-center text-xs mt-2">
            VAT Inclusive | No refunds after 7 days
          </p>

          <hr className="my-2" />

          {/* Footer */}
          <p className="text-center text-sm font-semibold">
            Thank you for shopping with us!
          </p>
          <p className="text-center text-xs mt-1">Powered by POS Kenya</p>
        </>
      ) : (
        <p className="text-center text-gray-500">No sale selected</p>
      )}
    </div>
  );
});

export default Receipt;
