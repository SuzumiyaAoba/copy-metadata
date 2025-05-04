import { cn } from "@/libs/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn(className)}>
      <h2 className={cn("text-xl font-bold text-white", titleClassName)}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-1 text-sm text-gray-300", descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
}
