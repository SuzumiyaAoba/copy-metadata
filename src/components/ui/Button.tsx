import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/libs/utils";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: "sm" | "md";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
  secondary: "border text-gray-600 hover:text-gray-800 hover:bg-gray-50",
  danger: "text-red-500 hover:text-red-600 hover:bg-red-50",
  ghost: "hover:bg-gray-100",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2",
        variant === "primary" && "focus:ring-blue-500",
        variant === "secondary" && "focus:ring-gray-300",
        variant === "danger" && "focus:ring-red-500",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
} 