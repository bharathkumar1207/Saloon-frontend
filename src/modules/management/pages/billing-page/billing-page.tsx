import { useEffect, useMemo, useState } from "react";
import * as servicesApi from "../../../../apis/services-api";
import * as employeesApi from "../../../../apis/employees-api";
import * as billsApi from "../../../../apis/bills-api";
import { ApiError, resolveImageUrl } from "../../../../apis/api-client";
import { Modal } from "../../../../shared/components/modal/modal";
import { BillReceipt, type BillReceiptProps } from "../../components/bill-receipt/bill-receipt";

type CartItem = {
  key: string;
  serviceId: string;
  serviceName: string;
  employeeId: string;
  price: number;
  quantity: number;
};

const inputClasses =
  "mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

export function BillingPage() {
  const [services, setServices] = useState<servicesApi.Service[]>([]);
  const [employees, setEmployees] = useState<employeesApi.Employee[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<billsApi.PaymentMethod>("cash");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedBill, setCompletedBill] = useState<BillReceiptProps | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    Promise.all([servicesApi.listServices(), employeesApi.listEmployees()])
      .then(([servicesRes, employeesRes]) => {
        setServices(servicesRes);
        setEmployees(employeesRes);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const categories = useMemo(() => {
    const grouped = new Map<string, servicesApi.Service[]>();
    for (const service of services) {
      const list = grouped.get(service.category) ?? [];
      list.push(service);
      grouped.set(service.category, list);
    }
    return Array.from(grouped.entries());
  }, [services]);

  function addToCart(service: servicesApi.Service) {
    setCompletedBill(null);
    setCart((prev) => [
      ...prev,
      {
        key: `${service.id}-${Date.now()}-${Math.random()}`,
        serviceId: service.id,
        serviceName: service.name,
        employeeId: "",
        price: Number(service.price),
        quantity: 1,
      },
    ]);
  }

  function updateCartItem(key: string, patch: Partial<CartItem>) {
    setCart((prev) => prev.map((item) => (item.key === key ? { ...item, ...patch } : item)));
  }

  function removeCartItem(key: string) {
    setCart((prev) => prev.filter((item) => item.key !== key));
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discount + tax);

  function resetCart() {
    setCart([]);
    setDiscount(0);
    setTax(0);
    setPaymentMethod("cash");
  }

  function employeeName(employeeId: string): string {
    return employees.find((employee) => employee.id === employeeId)?.name ?? "Unknown";
  }

  async function handleCheckout() {
    setError(null);
    setCompletedBill(null);

    if (cart.length === 0) {
      setError("Add at least one service to the bill.");
      return;
    }
    const missingEmployee = cart.some((item) => !item.employeeId);
    if (missingEmployee) {
      setError("Assign an employee to every line item before checkout.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await billsApi.createBill({
        discount,
        tax,
        paymentMethod,
        items: cart.map((item) => ({
          serviceId: item.serviceId,
          employeeId: item.employeeId,
          description: item.serviceName,
          price: item.price,
          quantity: item.quantity,
        })),
      });
      setCompletedBill({
        billNumber: result.bill.bill_number,
        createdAt: result.bill.created_at,
        items: cart.map((item) => ({
          description: item.serviceName,
          employeeName: employeeName(item.employeeId),
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal,
        discount,
        tax,
        total,
        paymentMethod,
      });
      resetCart();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create bill. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <p className="text-muted">Loading…</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">New Bill</h1>
        <p className="mt-1 text-sm text-muted">Tap a service to add it to the bill.</p>

        <div className="mt-6 flex flex-col gap-8">
          {categories.map(([category, items]) => (
            <div key={category}>
              <h2 className="text-sm font-semibold text-muted uppercase">{category}</h2>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {items.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => addToCart(service)}
                    className="flex items-center gap-3 rounded-md border border-border bg-surface p-3 text-left transition hover:border-primary hover:bg-primary-50"
                  >
                    {service.image_url ? (
                      <img
                        src={resolveImageUrl(service.image_url) ?? undefined}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded object-cover"
                      />
                    ) : null}
                    <div>
                      <p className="text-sm font-medium text-foreground">{service.name}</p>
                      <p className="text-sm text-primary-700">
                        ₹{Number(service.price).toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {services.length === 0 ? (
            <p className="text-muted">No services yet — add some on the Services page.</p>
          ) : null}
        </div>
      </div>

      <div className="h-fit rounded-lg border border-border bg-surface p-5">
        <h2 className="font-semibold text-foreground">Current Bill</h2>

        <div className="mt-4 flex flex-col gap-3">
          {cart.length === 0 ? (
            <p className="text-sm text-muted">No items yet.</p>
          ) : (
            cart.map((item) => (
              <div key={item.key} className="rounded-md border border-border p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{item.serviceName}</p>
                  <button
                    type="button"
                    onClick={() => removeCartItem(item.key)}
                    className="text-xs text-muted hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <select
                    value={item.employeeId}
                    onChange={(event) => updateCartItem(item.key, { employeeId: event.target.value })}
                    className="flex-1 rounded-md border border-border bg-surface px-2 py-1 text-xs text-foreground outline-none focus:border-primary"
                  >
                    <option value="">Select employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) =>
                      updateCartItem(item.key, { quantity: Number(event.target.value) || 1 })
                    }
                    className="w-14 rounded-md border border-border bg-surface px-2 py-1 text-xs text-foreground outline-none focus:border-primary"
                  />
                  <span className="w-20 text-right text-sm font-medium text-foreground">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
          <div className="grid grid-cols-2 gap-2">
            <label className="text-sm font-medium text-foreground">
              Discount
              <input
                type="number"
                min={0}
                value={discount}
                onChange={(event) => setDiscount(Number(event.target.value) || 0)}
                className={inputClasses}
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Tax
              <input
                type="number"
                min={0}
                value={tax}
                onChange={(event) => setTax(Number(event.target.value) || 0)}
                className={inputClasses}
              />
            </label>
          </div>

          <label className="text-sm font-medium text-foreground">
            Payment Method
            <select
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value as billsApi.PaymentMethod)}
              className={inputClasses}
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-1 border-t border-border pt-4 text-sm">
          <div className="flex justify-between text-muted">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-foreground">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        {completedBill ? (
          <div className="mt-3 rounded-md border border-green-200 bg-green-50 p-3">
            <p className="text-sm font-medium text-green-700">
              Bill {completedBill.billNumber} created successfully.
            </p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-background"
              >
                Preview Bill
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-surface transition hover:bg-primary-600"
              >
                Print Bill
              </button>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleCheckout}
          disabled={isSubmitting}
          className="mt-4 w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-surface transition hover:bg-primary-600 disabled:opacity-60"
        >
          {isSubmitting ? "Processing…" : "Complete Bill"}
        </button>
      </div>

      {completedBill ? (
        <>
          <Modal isOpen={showPreview} onClose={() => setShowPreview(false)}>
            <BillReceipt {...completedBill} />
          </Modal>
          <div className="print-receipt pointer-events-none absolute top-0 left-[-9999px]">
            <BillReceipt {...completedBill} />
          </div>
        </>
      ) : null}
    </div>
  );
}
