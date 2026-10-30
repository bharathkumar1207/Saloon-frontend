import { useEffect, useState, type FormEvent } from "react";
import * as usersApi from "../../../../apis/users-api";
import { ApiError } from "../../../../apis/api-client";

const inputClasses =
  "mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "employee" as usersApi.UserRole,
};

export function PortalUsersPage() {
  const [users, setUsers] = useState<usersApi.SafeUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function refresh() {
    return usersApi.listUsers().then(setUsers);
  }

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, []);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Name, email, and password are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await usersApi.createUser({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        password: form.password,
        role: form.role,
      });
      setForm(emptyForm);
      await refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function toggleActive(user: usersApi.SafeUser) {
    await usersApi.updateUser(user.id, { isActive: !user.is_active });
    await refresh();
  }

  async function changeRole(user: usersApi.SafeUser, role: usersApi.UserRole) {
    await usersApi.updateUser(user.id, { role });
    await refresh();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Portal Users</h1>
        <p className="mt-1 text-sm text-muted">
          Who can log into this management portal. For the full staff roster (salary, Aadhar,
          address, etc.), see the Employees page.
        </p>

        <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="px-4 py-4 text-muted" colSpan={4}>
                    Loading…
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-foreground">{user.name}</td>
                    <td className="px-4 py-3 text-muted">{user.email}</td>
                    <td className="px-4 py-3">
                      <select
                        value={user.role}
                        onChange={(event) =>
                          changeRole(user, event.target.value as usersApi.UserRole)
                        }
                        className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-foreground outline-none focus:border-primary"
                      >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleActive(user)}
                        className={user.is_active ? "text-green-700" : "text-muted"}
                      >
                        {user.is_active ? "Active" : "Inactive"}
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
        <h2 className="font-semibold text-foreground">Add Portal User</h2>
        <form onSubmit={handleCreate} className="mt-4 flex flex-col gap-3">
          <label className="text-sm font-medium text-foreground">
            Name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Phone (optional)
            <input
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Temporary Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className={inputClasses}
            />
          </label>
          <label className="text-sm font-medium text-foreground">
            Role
            <select
              value={form.role}
              onChange={(event) =>
                setForm({ ...form, role: event.target.value as usersApi.UserRole })
              }
              className={inputClasses}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface transition hover:bg-primary-600 disabled:opacity-60"
          >
            {isSubmitting ? "Adding…" : "Add Portal User"}
          </button>
        </form>
      </div>
    </div>
  );
}
