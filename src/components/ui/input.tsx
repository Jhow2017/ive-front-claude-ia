import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full px-3 py-2.5 border border-(--color-border-soft) rounded-lg bg-white text-sm text-(--color-text) outline-none transition-colors",
        "focus:border-(--color-g500) focus:ring-2 focus:ring-(--color-g500)/10",
        "placeholder:text-(--color-muted2)",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full px-3 py-2.5 border border-(--color-border-soft) rounded-lg bg-white text-sm text-(--color-text) outline-none transition-colors min-h-20 resize-y",
        "focus:border-(--color-g500) focus:ring-2 focus:ring-(--color-g500)/10",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "w-full px-3 py-2.5 border border-(--color-border-soft) rounded-lg bg-white text-sm text-(--color-text) outline-none transition-colors",
        "focus:border-(--color-g500) focus:ring-2 focus:ring-(--color-g500)/10",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "block text-xs font-semibold text-(--color-text) mb-1.5",
        className
      )}
      {...props}
    />
  );
}

export function FormField({
  label,
  children,
  className,
}: {
  label?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {label && <Label>{label}</Label>}
      {children}
    </div>
  );
}
