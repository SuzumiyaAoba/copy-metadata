import { cn } from "@/libs/utils";
import type { ComponentPropsWithoutRef } from "react";

interface LabeledInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  labelClassName?: string;
  containerClassName?: string;
}

export function LabeledInput({
  label,
  labelClassName,
  containerClassName,
  className,
  ...props
}: LabeledInputProps) {
  return (
    <div
      className={cn("flex items-center space-x-3 w-full", containerClassName)}
    >
      <label className={cn("font-medium text-gray-200", labelClassName)}>
        {label}
      </label>
      <input
        className={cn(
          "px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-gray-500 transition-shadow",
          className,
        )}
        {...props}
      />
    </div>
  );
}
