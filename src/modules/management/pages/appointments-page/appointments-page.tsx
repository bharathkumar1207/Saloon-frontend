import { useEffect, useState, type FormEvent } from "react";
import * as appointmentsApi from "../../../../apis/appointments-api";
import * as servicesApi from "../../../../apis/services-api";
import * as employeesApi from "../../../../apis/employees-api";
import { ApiError } from "../../../../apis/api-client";

const inputClasses =
  "mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

const statusOptions: appointmentsApi.AppointmentStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
];

const emptyForm = {
  customerName: "",
  customerPhone: "",
  serviceId: "",
  employeeId: "",
  appointmentDate: "",
  notes: "",
};

export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<appointmentsApi.Appointment[]>([]);
  const [services, setServices] = useState<servicesApi.Service[]>([]);
  const [employees, setEmployees] = useState<employeesApi.Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function refresh() {
    return appointmentsApi.listAppointments().then(setAppointments);
  }

  useEffect(() => {
    Promise.all([
      refresh(),
      servicesApi.listServices().then(setServices),
      employeesApi.listEmployees().then(setEmployees),
    ]).finally(() => setIsLoading(false));
  }, []);

  function serviceName(serviceId: string): string {
    return services.find((service) => service.id === serviceId)?.name ?? "Unknown service";
  }

  function employeeName(employeeId: string | null): string {
    if (!employeeId) return "Unassigned";
    return employees.find((employee) => employee.id === employeeId)?.name ?? "Unknown";
  }

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!form.customerName.trim() || !form.customerPhone.trim() || !form.serviceId || !form.appointmentDate) {
      setError("Customer name, phone, service, and date/time are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await appointmentsApi.createAppointment({
        customerName: form.customerName.trim(),
        customerPhone: form.customerPhone.trim(),
        serviceId: form.serviceId,
        employeeId: form.employeeId || null,
        appointmentDate: new Date(form.appointmentDate).toISOString(),
        notes: form.notes.trim() || null,
      });
      setForm(emptyForm);
      await refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create appointment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function updateStatus(id: string, status: appointmentsApi.AppointmentStatus) {
    await appointmentsApi.updateAppointment(id, { status });
    await refresh();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Appointments</h1>

        <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Employee</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="px-4 py-4 text-muted" colSpan={5}>
                    Loading…
                  </td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-muted" colSpan={5}>
                    No appointments yet.
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-foreground">
                      {appointment.customer_name}
                      <div className="text-xs text-muted">{appointment.customer_phone}</div>
                    </td>
                    <td className="px-4 py-3 text-muted">{serviceName(appointment.service_id)}</td>
                    <td className="px-4 py-3 text-muted">{employeeName(appointment.employee_id)}</td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(appointment.appointment_date).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={appointment.status}
                        onChange={(event) =>
                          updateStatus(
                            appointment.id,
                            event.target.value as appointmentsApi.AppointmentStatus,
                          )
                        }
                        className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-foreground outline-none focus:border-primary"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="h-fit rounded-lg border border-border bg-surface p-5">
        <h2 className="font-semibold text-foreground">New Appointment</h2>
        <form onSubmit={handleCreate} className="mt-4 flex flex-col gap-3">
          <label className="text-sm font-medium text-foreground">
            Customer Name
            <input
              value={form.customerName}
              onChange={(event) => setForm({ ...form, customerName: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Customer Phone
            <input
              value={form.customerPhone}
              onChange={(event) => setForm({ ...form, customerPhone: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Service
            <select
              value={form.serviceId}
              onChange={(event) => setForm({ ...form, serviceId: event.target.value })}
              className={inputClasses}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-foreground">
            Employee (optional)
            <select
              value={form.employeeId}
              onChange={(event) => setForm({ ...form, employeeId: event.target.value })}
              className={inputClasses}
            >
              <option value="">Unassigned</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-foreground">
            Date &amp; Time
            <input
              type="datetime-local"
              value={form.appointmentDate}
              onChange={(event) => setForm({ ...form, appointmentDate: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Notes (optional)
            <input
              value={form.notes}
              onChange={(event) => setForm({ ...form, notes: event.target.value })}
              className={inputClasses}
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface transition hover:bg-primary-600 disabled:opacity-60"
          >
            {isSubmitting ? "Creating…" : "Create Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
