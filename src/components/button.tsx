import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & { variant?: "primary" | "secondary" };
type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: "primary" | "secondary" };

export function Button({ variant = "primary", className = "", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={`button button--${variant} ${className}`} {...props} />;
}

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`button button--${variant} ${className}`} {...props} />;
}
