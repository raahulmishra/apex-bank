"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ inline = false }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`glass-surface z-50 flex h-9 w-9 items-center justify-center rounded-full border-[#d6b36a] text-[#29261f] shadow-md transition-all duration-300 hover:scale-105 dark:border-[#d6b36a] dark:text-[#f5e6c8] ${
        inline
          ? "relative shrink-0"
          : "fixed right-4 bottom-4 sm:top-5 sm:right-35 sm:bottom-auto"
      }`}
    >
      {isDark ? (
        <Sun size={19} weight="bold" />
      ) : (
        <Moon size={19} weight="bold" />
      )}
    </button>
  );
}
