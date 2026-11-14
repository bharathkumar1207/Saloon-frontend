import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-surface hover:bg-primary-600"
      : "bg-surface text-foreground border border-foreground hover:bg-background";

  return <button className={`btn-premium ${variantClasses} ${className}`} {...props} />;
}
