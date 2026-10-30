import { useEffect, useState, type FormEvent } from "react";
import * as employeesApi from "../../../../apis/employees-api";
import { ApiError } from "../../../../apis/api-client";

const inputClasses =
  "mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

const emptyForm = {
  name: "",
  mobile: "",
  designation: "",
  salary: "",
  joinedDate: "",
  aadharNumber: "",
  address: "",
  email: "",
  dateOfBirth: "",
  gender: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  bankAccountNumber: "",
  bankIfsc: "",
};

export function EmployeesPage() {
  const [employees, setEmployees] = useState<employeesApi.Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function refresh() {
    return employeesApi.listEmployees(true).then(setEmployees);
  }

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, []);

  function updateField(field: keyof typeof emptyForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.mobile.trim()) {
      setError("Name and mobile are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await employeesApi.createEmployee({
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        designation: form.designation.trim() || null,
        salary: form.salary ? Number(form.salary) : null,
        joinedDate: form.joinedDate || null,
        aadharNumber: form.aadharNumber.trim() || null,
        address: form.address.trim() || null,
        email: form.email.trim() || null,
        dateOfBirth: form.dateOfBirth || null,
        gender: form.gender || null,
        emergencyContactName: form.emergencyContactName.trim() || null,
        emergencyContactPhone: form.emergencyContactPhone.trim() || null,
        bankAccountNumber: form.bankAccountNumber.trim() || null,
        bankIfsc: form.bankIfsc.trim() || null,
      });
      setForm(emptyForm);
      setShowAddForm(false);
      await refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to add employee.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function toggleActive(employee: employeesApi.Employee) {
    await employeesApi.updateEmployee(employee.id, { isActive: !employee.is_active });
    await refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Employees</h1>
          <p className="mt-1 text-sm text-muted">Staff roster — salary, contact, and HR details.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddForm((prev) => !prev)}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface transition hover:bg-primary-600"
        >
          {showAddForm ? "Cancel" : "+ Add Employee"}
        </button>
      </div>

      {showAddForm ? (
        <form
          onSubmit={handleCreate}
          className="mt-6 rounded-lg border border-border bg-surface p-5"
        >
          <h2 className="font-semibold text-foreground">New Employee</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm font-medium text-foreground">
              Name
              <input
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className={inputClasses}
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Mobile
              <input
                value={form.mobile}
                onChange={(event) => updateField("mobile", event.target.value)}
                className={inputClasses}
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Designation
              <input
                value={form.designation}
                onChange={(event) => updateField("designation", event.target.value)}
                placeholder="e.g. Senior Stylist"
                className={inputClasses}
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Salary (monthly)
              <input
                type="number"
                min={0}
                value={form.salary}
                onChange={(event) => updateField("salary", event.target.value)}
                className={inputClasses}
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Joined Date
              <input
                type="date"
                value={form.joinedDate}
                onChange={(event) => updateField("joinedDate", event.target.value)}
                className={inputClasses}
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Date of Birth
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(event) => updateField("dateOfBirth", event.target.value)}
                className={inputClasses}
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Gender
              <select
                value={form.gender}
                onChange={(event) => updateField("gender", event.target.value)}
                className={inputClasses}
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="text-sm font-medium text-foreground">
              Aadhar Number
              <input
                value={form.aadharNumber}
                onChange={(event) => updateField("aadharNumber", event.target.value)}
                className={inputClasses}
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Email (optional)
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className={inputClasses}
              />
            </label>
            <label className="text-sm font-medium text-foreground sm:col-span-2 lg:col-span-3">
              Address
              <input
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
                className={inputClasses}
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Emergency Contact Name
              <input
                value={form.emergencyContactName}
                onChange={(event) => updateField("emergencyContactName", event.target.value)}
                className={inputClasses}
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Emergency Contact Phone
              <input
                value={form.emergencyContactPhone}
                onChange={(event) => updateField("emergencyContactPhone", event.target.value)}
                className={inputClasses}
              />
            </label>
            <div />
            <label className="text-sm font-medium text-foreground">
              Bank Account Number
              <input
                value={form.bankAccountNumber}
                onChange={(event) => updateField("bankAccountNumber", event.target.value)}
                className={inputClasses}
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Bank IFSC
              <input
                value={form.bankIfsc}
                onChange={(event) => updateField("bankIfsc", event.target.value)}
                className={inputClasses}
              />
            </label>
          </div>

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface transition hover:bg-primary-600 disabled:opacity-60"
          >
            {isSubmitting ? "Adding…" : "Add Employee"}
          </button>
        </form>
      ) : null}

      <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Designation</th>
              <th className="px-4 py-3 font-medium">Mobile</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 text-right font-medium">Salary</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="px-4 py-4 text-muted" colSpan={6}>
                  Loading…
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-muted" colSpan={6}>
                  No employees yet.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-foreground">{employee.name}</td>
                  <td className="px-4 py-3 text-muted">{employee.designation ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">{employee.mobile}</td>
                  <td className="px-4 py-3 text-muted">
                    {employee.joined_date
                      ? new Date(employee.joined_date).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-foreground">
                    {employee.salary ? `₹${Number(employee.salary).toFixed(2)}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(employee)}
                      className={employee.is_active ? "text-green-700" : "text-muted"}
                    >
                      {employee.is_active ? "Active" : "Deactivated"}
                    </button>
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
