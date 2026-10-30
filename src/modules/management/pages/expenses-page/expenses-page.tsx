import { useEffect, useState, type FormEvent } from "react";
import * as expensesApi from "../../../../apis/expenses-api";
import { ApiError } from "../../../../apis/api-client";

const inputClasses =
  "mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

const categories: expensesApi.ExpenseCategory[] = [
  "rent",
  "utilities",
  "supplies",
  "salary",
  "maintenance",
  "marketing",
  "other",
];

const emptyForm = {
  category: "other" as expensesApi.ExpenseCategory,
  description: "",
  amount: "",
  paidTo: "",
  paymentMethod: "cash" as expensesApi.Expense["payment_method"],
};

export function ExpensesPage() {
  const [expenses, setExpenses] = useState<expensesApi.Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function refresh() {
    return expensesApi.listExpenses().then(setExpenses);
  }

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, []);

  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!form.description.trim() || !form.amount) {
      setError("Description and amount are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await expensesApi.createExpense({
        category: form.category,
        description: form.description.trim(),
        amount: Number(form.amount),
        paidTo: form.paidTo.trim() || null,
        paymentMethod: form.paymentMethod,
      });
      setForm(emptyForm);
      await refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to record expense.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(expense: expensesApi.Expense) {
    if (!confirm(`Delete this expense ("${expense.description}")?`)) return;
    await expensesApi.deleteExpense(expense.id);
    await refresh();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Expenses</h1>
          <p className="text-sm text-muted">
            Total: <span className="font-semibold text-foreground">₹{totalExpenses.toFixed(2)}</span>
          </p>
        </div>

        <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Paid To</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="px-4 py-4 text-muted" colSpan={6}>
                    Loading…
                  </td>
                </tr>
              ) : expenses.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-muted" colSpan={6}>
                    No expenses recorded yet.
                  </td>
                </tr>
              ) : (
                expenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-muted">
                      {new Date(expense.expense_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-muted capitalize">{expense.category}</td>
                    <td className="px-4 py-3 text-foreground">{expense.description}</td>
                    <td className="px-4 py-3 text-muted">{expense.paid_to ?? "—"}</td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      ₹{Number(expense.amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(expense)}
                        className="text-xs text-muted hover:text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="h-fit rounded-lg border border-border bg-surface p-5">
        <h2 className="font-semibold text-foreground">Add Expense</h2>
        <form onSubmit={handleCreate} className="mt-4 flex flex-col gap-3">
          <label className="text-sm font-medium text-foreground">
            Category
            <select
              value={form.category}
              onChange={(event) =>
                setForm({ ...form, category: event.target.value as expensesApi.ExpenseCategory })
              }
              className={inputClasses}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-foreground">
            Description
            <input
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Amount
            <input
              type="number"
              min={0}
              value={form.amount}
              onChange={(event) => setForm({ ...form, amount: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Paid To (optional)
            <input
              value={form.paidTo}
              onChange={(event) => setForm({ ...form, paidTo: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Payment Method
            <select
              value={form.paymentMethod}
              onChange={(event) =>
                setForm({
                  ...form,
                  paymentMethod: event.target.value as expensesApi.Expense["payment_method"],
                })
              }
              className={inputClasses}
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="other">Other</option>
            </select>
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface transition hover:bg-primary-600 disabled:opacity-60"
          >
            {isSubmitting ? "Saving…" : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
}
