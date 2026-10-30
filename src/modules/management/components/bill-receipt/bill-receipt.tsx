export type BillReceiptItem = {
  description: string;
  employeeName: string;
  quantity: number;
  price: number;
};

export type BillReceiptProps = {
  billNumber: string;
  createdAt: string;
  items: BillReceiptItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
};

export function BillReceipt({
  billNumber,
  createdAt,
  items,
  subtotal,
  discount,
  tax,
  total,
  paymentMethod,
}: BillReceiptProps) {
  return (
    <div className="w-80 bg-white p-4 font-mono text-xs text-black">
      <div className="text-center">
        <p className="text-sm font-bold">Vismaya Unisex Salon</p>
        <p>123 Beach Road, Visakhapatnam</p>
        <p>Andhra Pradesh 530001</p>
        <p>96408 93477</p>
      </div>

      <div className="mt-3 border-t border-dashed border-black pt-2">
        <p>Bill #: {billNumber}</p>
        <p>Date: {new Date(createdAt).toLocaleString()}</p>
      </div>

      <table className="mt-3 w-full border-t border-dashed border-black pt-2">
        <thead>
          <tr className="border-b border-dashed border-black text-left">
            <th className="py-1 font-normal">Item</th>
            <th className="py-1 text-right font-normal">Qty</th>
            <th className="py-1 text-right font-normal">Amt</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="py-1">
                {item.description}
                <div className="text-[10px] text-gray-600">by {item.employeeName}</div>
              </td>
              <td className="py-1 text-right align-top">{item.quantity}</td>
              <td className="py-1 text-right align-top">
                {(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-2 flex flex-col gap-0.5 border-t border-dashed border-black pt-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₹{discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-dashed border-black pt-1 text-sm font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="mt-1 flex justify-between capitalize">
          <span>Payment</span>
          <span>{paymentMethod}</span>
        </div>
      </div>

      <p className="mt-3 border-t border-dashed border-black pt-2 text-center">
        Thank you! Visit again.
      </p>
    </div>
  );
}
