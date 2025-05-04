import { cn } from "@/libs/utils";
import type { ComponentPropsWithoutRef } from "react";

interface LabeledCheckboxProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  labelClassName?: string;
  containerClassName?: string;
}

export function LabeledCheckbox({
  label,
  labelClassName,
  containerClassName,
  className,
  ...props
}: LabeledCheckboxProps) {
  return (
    <div className={cn("flex items-center space-x-3", containerClassName)}>
      <input
        type="checkbox"
        className={cn("h-4 w-4 rounded border focus:ring-2", className)}
        {...props}
      />
      <label className={cn(labelClassName)}>{label}</label>
    </div>
  );
}
