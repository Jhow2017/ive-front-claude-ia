import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap",
  {
    variants: {
      variant: {
        green: "bg-(--color-g50) text-(--color-g600)",
        yellow: "bg-yellow-50 text-yellow-700",
        red: "bg-red-50 text-(--color-danger)",
        gray: "bg-(--color-bg) text-(--color-muted)",
        blue: "bg-blue-50 text-blue-700",
        purple: "bg-violet-50 text-(--color-purple)",
      },
    },
    defaultVariants: { variant: "green" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
