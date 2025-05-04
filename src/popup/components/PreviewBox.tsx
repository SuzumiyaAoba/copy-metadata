import { cn } from "@/libs/utils";
import type { THEMES } from "@/constants/themes";

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export type PreviewBoxProps = {
  content: string;
  theme: Theme;
};

export function PreviewBox({ content, theme }: PreviewBoxProps): JSX.Element {
  return (
    <div className="relative">
      <div className="absolute -top-2.5 left-3 px-1.5 bg-white">
        <span className={cn("text-xs font-medium", theme.colors.primary.text)}>
          Preview
        </span>
      </div>
      <div
        className={cn(
          "px-3.5 py-2.5 text-sm font-medium border rounded-lg overflow-x-auto whitespace-nowrap font-mono shadow-sm bg-white/90",
          theme.colors.primary.border,
          "text-gray-900",
          theme.colors.primary.bg.fade,
        )}
      >
        {content}
      </div>
    </div>
  );
}
