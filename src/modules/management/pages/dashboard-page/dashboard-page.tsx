import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as billsApi from "../../../../apis/bills-api";
import * as appointmentsApi from "../../../../apis/appointments-api";
import { managementRoutes } from "../../../../setup/routes";
import { useAuth } from "../../auth/auth-context";

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function DashboardPage() {
  const { user } = useAuth();
  const [bills, setBills] = useState<billsApi.Bill[]>([]);
  const [appointments, setAppointments] = useState<appointmentsApi.Appointment[]>([]);
  const [revenue, setRevenue] = useState<billsApi.EmployeeRevenue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([billsApi.listBills(), appointmentsApi.listAppointments(), billsApi.getRevenueByEmployee()])
      .then(([billsRes, appointmentsRes, revenueRes]) => {
        setBills(billsRes);
        setAppointments(appointmentsRes);
        setRevenue(revenueRes);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const today = startOfToday();
  const todaysBills = bills.filter((bill) => new Date(bill.created_at) >= today);
  const todaysRevenue = todaysBills.reduce((sum, bill) => sum + Number(bill.total), 0);
  const todaysAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointment_date) >= today,
  );

  if (isLoading) {
    return <p className="text-muted">Loading dashboard…</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-sm text-muted">Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface p-5">
          <p className="text-sm text-muted">Today's Revenue</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            ₹{todaysRevenue.toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-5">
          <p className="text-sm text-muted">Today's Bills</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{todaysBills.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-5">
          <p className="text-sm text-muted">Today's Appointments</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {todaysAppointments.length}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          to={managementRoutes.billing}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface transition hover:bg-primary-600"
        >
          + New Bill
        </Link>
        <Link
          to={managementRoutes.appointments}
          className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-background"
        >
          + New Appointment
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-5">
          <h2 className="font-semibold text-foreground">Revenue by Employee</h2>
          <table className="mt-3 w-full text-sm">
            <tbody>
              {revenue.map((row) => (
                <tr key={row.employee_id} className="border-t border-border">
                  <td className="py-2 text-foreground">{row.employee_name}</td>
                  <td className="py-2 text-right text-muted">{row.services_count} services</td>
                  <td className="py-2 text-right font-medium text-primary-700">
                    ₹{Number(row.total_revenue).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-border bg-surface p-5">
          <h2 className="font-semibold text-foreground">Recent Bills</h2>
          <table className="mt-3 w-full text-sm">
            <tbody>
              {bills.slice(0, 8).map((bill) => (
                <tr key={bill.id} className="border-t border-border">
                  <td className="py-2 text-foreground">{bill.bill_number}</td>
                  <td className="py-2 text-muted">
                    {new Date(bill.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-2 text-right font-medium text-primary-700">
                    ₹{Number(bill.total).toFixed(2)}
                  </td>
                </tr>
              ))}
              {bills.length === 0 ? (
                <tr>
                  <td className="py-2 text-muted">No bills yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
