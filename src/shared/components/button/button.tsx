import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-surface hover:bg-primary-600"
      : "bg-surface text-foreground border border-border hover:bg-background";

  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-medium transition ${variantClasses} ${className}`}
      {...props}
    />
  );
}
