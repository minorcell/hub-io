import * as React from "react";
import { cn } from "@/lib/cn";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-[#d7ccbc] bg-[#fffdf8] px-4 py-3 text-sm text-[#171410] shadow-none outline-none transition placeholder:text-[#8c8378] focus-visible:border-[#d7744d] focus-visible:ring-4 focus-visible:ring-[#d7744d]/12",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
