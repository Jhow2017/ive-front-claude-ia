import * as React from "react";
import { cn } from "@/shared/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("bg-white border border-(--color-border-soft) rounded-xl", className)}
            {...props}
        />
    );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-5", className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("flex items-center justify-between gap-3 flex-wrap mb-4", className)}
            {...props}
        />
    );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("text-sm font-bold", className)} {...props} />;
}

export function CardSub({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("text-xs text-(--color-muted) mt-0.5", className)} {...props} />;
}
