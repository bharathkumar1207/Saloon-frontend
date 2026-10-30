import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as billsApi from "../../../../apis/bills-api";
import * as employeesApi from "../../../../apis/employees-api";
import { Modal } from "../../../../shared/components/modal/modal";
import { BillReceipt } from "../../components/bill-receipt/bill-receipt";

export function BillDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [bill, setBill] = useState<(billsApi.Bill & { items: billsApi.BillItem[] }) | null>(null);
  const [employees, setEmployees] = useState<employeesApi.Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([billsApi.getBill(id), employeesApi.listEmployees(true)])
      .then(([billRes, employeesRes]) => {
        setBill(billRes);
        setEmployees(employeesRes);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <p className="text-muted">Loading…</p>;
  if (!bill) return <p className="text-muted">Bill not found.</p>;

  function employeeName(employeeId: string): string {
    return employees.find((employee) => employee.id === employeeId)?.name ?? "Unknown";
  }

  const receiptItems = bill.items.map((item) => ({
    description: item.description,
    employeeName: employeeName(item.employee_id),
    quantity: item.quantity,
    price: Number(item.price),
  }));

  return (
    <div className="max-w-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{bill.bill_number}</h1>
          <p className="mt-1 text-sm text-muted">{new Date(bill.created_at).toLocaleString()}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-background"
          >
            Preview Bill
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface transition hover:bg-primary-600"
          >
            Print Bill
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Employee</th>
              <th className="px-4 py-3 text-right font-medium">Qty</th>
              <th className="px-4 py-3 text-right font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {bill.items.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-foreground">{item.description}</td>
                <td className="px-4 py-3 text-muted">{employeeName(item.employee_id)}</td>
                <td className="px-4 py-3 text-right text-muted">{item.quantity}</td>
                <td className="px-4 py-3 text-right font-medium text-foreground">
                  ₹{Number(item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col gap-1 border-t border-border p-4 text-sm">
          <div className="flex justify-between text-muted">
            <span>Subtotal</span>
            <span>₹{Number(bill.subtotal).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Discount</span>
            <span>-₹{Number(bill.discount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Tax</span>
            <span>₹{Number(bill.tax).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-foreground">
            <span>Total</span>
            <span>₹{Number(bill.total).toFixed(2)}</span>
          </div>
          <div className="mt-2 flex justify-between text-muted capitalize">
            <span>Payment</span>
            <span>
              {bill.payment_method} · {bill.payment_status}
            </span>
          </div>
        </div>
      </div>

      <Modal isOpen={showPreview} onClose={() => setShowPreview(false)}>
        <BillReceipt
          billNumber={bill.bill_number}
          createdAt={bill.created_at}
          items={receiptItems}
          subtotal={Number(bill.subtotal)}
          discount={Number(bill.discount)}
          tax={Number(bill.tax)}
          total={Number(bill.total)}
          paymentMethod={bill.payment_method}
        />
      </Modal>

      {/* Always-mounted, off-screen copy that only becomes visible for the
          print job itself (see .print-receipt rules in index.css), so
          "Print Bill" works without needing the preview modal open. */}
      <div className="print-receipt pointer-events-none absolute top-0 left-[-9999px]">
        <BillReceipt
          billNumber={bill.bill_number}
          createdAt={bill.created_at}
          items={receiptItems}
          subtotal={Number(bill.subtotal)}
          discount={Number(bill.discount)}
          tax={Number(bill.tax)}
          total={Number(bill.total)}
          paymentMethod={bill.payment_method}
        />
      </div>
    </div>
  );
}
