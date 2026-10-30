import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as billsApi from "../../../../apis/bills-api";
import { managementRoutes } from "../../../../setup/routes";

const paymentStatusColor: Record<billsApi.PaymentStatus, string> = {
  paid: "text-green-700",
  pending: "text-red-600",
  partial: "text-primary-700",
};

export function BillsPage() {
  const [bills, setBills] = useState<billsApi.Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    billsApi
      .listBills()
      .then(setBills)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Bills</h1>
        <Link
          to={managementRoutes.billing}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface transition hover:bg-primary-600"
        >
          + New Bill
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="px-4 py-3 font-medium">Bill #</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="px-4 py-4 text-muted" colSpan={5}>
                  Loading…
                </td>
              </tr>
            ) : bills.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-muted" colSpan={5}>
                  No bills yet.
                </td>
              </tr>
            ) : (
              bills.map((bill) => (
                <tr key={bill.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <Link
                      to={managementRoutes.billDetail(bill.id)}
                      className="font-medium text-primary-700 hover:underline"
                    >
                      {bill.bill_number}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted capitalize">{bill.payment_method}</td>
                  <td className={`px-4 py-3 capitalize ${paymentStatusColor[bill.payment_status]}`}>
                    {bill.payment_status}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">
                    ₹{Number(bill.total).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(bill.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
