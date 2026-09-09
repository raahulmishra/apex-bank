"use client";

import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";

export function PasswordInput({ className, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={`pr-11 ${className || ""}`}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-(--bank-muted) hover:bg-(--bank-soft) hover:text-(--bank-text)"
      >
        {visible ? <EyeSlash size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
