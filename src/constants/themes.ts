export const THEMES = {
  purple: {
    id: "purple",
    name: "Purple",
    primary: "purple",
    colors: {
      primary: {
        base: "bg-purple-600",
        hover: "hover:bg-purple-700",
        active: "active:bg-purple-800",
        text: "text-purple-600",
        border: "border-purple-200",
        ring: "focus:ring-purple-500",
        bg: {
          light: "bg-purple-50",
          fade: "bg-purple-50/50",
        },
      },
    },
  },
  blue: {
    id: "blue",
    name: "Blue",
    primary: "blue",
    colors: {
      primary: {
        base: "bg-blue-600",
        hover: "hover:bg-blue-700",
        active: "active:bg-blue-800",
        text: "text-blue-600",
        border: "border-blue-200",
        ring: "focus:ring-blue-500",
        bg: {
          light: "bg-blue-50",
          fade: "bg-blue-50/50",
        },
      },
    },
  },
  emerald: {
    id: "emerald",
    name: "Emerald",
    primary: "emerald",
    colors: {
      primary: {
        base: "bg-emerald-600",
        hover: "hover:bg-emerald-700",
        active: "active:bg-emerald-800",
        text: "text-emerald-600",
        border: "border-emerald-200",
        ring: "focus:ring-emerald-500",
        bg: {
          light: "bg-emerald-50",
          fade: "bg-emerald-50/50",
        },
      },
    },
  },
} as const;

export type ThemeId = keyof typeof THEMES;
