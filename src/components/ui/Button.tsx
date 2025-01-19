import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/libs/utils";
import { useConfig } from "@/libs/hooks/config";
import { THEMES } from "@/constants/themes";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: "sm" | "md";
}

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
  const [config] = useConfig();
  const theme = THEMES[config.theme];

  const variantStyles: Record<ButtonVariant, string> = {
    primary: `${theme.colors.primary.base} text-white ${theme.colors.primary.hover} ${theme.colors.primary.active}`,
    secondary: `border ${theme.colors.primary.border} ${theme.colors.primary.text} hover:text-purple-800 ${theme.colors.primary.bg.light}`,
    danger: "text-red-500 hover:text-red-600 hover:bg-red-50",
    ghost: `${theme.colors.primary.text} hover:bg-gray-100`,
  };

  return (
    <button
      className={cn(
        "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2",
        variant === "primary" && theme.colors.primary.ring,
        variant === "secondary" && theme.colors.primary.ring,
        variant === "danger" && "focus:ring-red-500",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}
