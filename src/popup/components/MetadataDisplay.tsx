import type { Env } from "@/types";
import { cn } from "@/libs/utils";
import type { THEMES } from "@/constants/themes";

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export type MetadataDisplayProps = {
  env: Env;
  theme: Theme;
};

export function MetadataDisplay({
  env,
  theme,
}: MetadataDisplayProps): JSX.Element {
  return (
    <div
      className={cn(
        "space-y-2.5 rounded-lg p-3.5 border bg-white/80",
        theme.colors.primary.bg.light,
        theme.colors.primary.border,
      )}
    >
      {Object.entries(env).map(([key, value]) => (
        <div key={key} className="flex">
          <span
            className={cn(
              "text-xs font-medium w-12 text-right pr-2.5 pt-0.5 text-gray-500",
            )}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-sm font-medium leading-relaxed text-gray-900",
                key === "url" ? "font-mono break-all" : "break-words",
              )}
            >
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
