import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/libs/utils";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: "sm" | "md";
}

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800 border border-gray-600",
    secondary:
      "border border-gray-600 text-gray-200 bg-gray-700 hover:bg-gray-600",
    danger:
      "text-red-400 hover:text-red-300 hover:bg-gray-800 border border-gray-700",
    ghost: "text-gray-200 hover:bg-gray-800",
  };

  return (
    <button
      className={cn(
        "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}
