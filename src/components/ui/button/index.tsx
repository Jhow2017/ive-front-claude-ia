import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 cursor-pointer leading-none",
    {
        variants: {
            variant: {
                primary: "bg-(--color-g500) text-white hover:bg-(--color-g600)",
                outline:
                    "bg-white text-(--color-text) border border-(--color-border-soft) hover:border-(--color-g500) hover:text-(--color-g500)",
                ghost: "bg-transparent text-(--color-muted) hover:bg-(--color-g50) hover:text-(--color-text)",
                danger: "bg-[#fef2f2] text-(--color-danger) border border-[#fecaca] hover:bg-[#fee2e2]",
                link: "text-(--color-g500) underline-offset-4 hover:underline bg-transparent",
            },
            size: {
                default: "h-9 px-4 text-[13px]",
                sm: "h-8 px-3 text-xs rounded-md",
                xs: "h-7 px-2.5 text-[11px] rounded-md",
                lg: "h-11 px-5 text-[15px] rounded-[10px]",
                xl: "h-12 px-6 text-base rounded-[10px]",
                icon: "h-8 w-8 p-0 rounded-lg",
            },
        },
        defaultVariants: { variant: "primary", size: "default" },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => (
        <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    )
);
Button.displayName = "Button";

export { buttonVariants };
