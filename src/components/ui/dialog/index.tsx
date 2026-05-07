"use client";
import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";

export function Dialog({
    open,
    onClose,
    children,
    className,
    size = "md",
}: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg";
}) {
    React.useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    const sizes = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl" };

    return (
        <div
            className="fixed inset-0 bg-black/45 z-[600] flex items-center justify-center p-5 backdrop-blur-sm animate-in fade-in"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className={cn(
                    "bg-white rounded-2xl p-7 w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95",
                    sizes[size],
                    className
                )}
            >
                {children}
            </div>
        </div>
    );
}

export function DialogHeader({
    title,
    sub,
    onClose,
}: {
    title: React.ReactNode;
    sub?: React.ReactNode;
    onClose?: () => void;
}) {
    return (
        <div className="flex justify-between items-start mb-5">
            <div>
                <div className="text-lg font-extrabold tracking-tight">{title}</div>
                {sub && <div className="text-[13px] text-(--color-muted) mt-1">{sub}</div>}
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="bg-(--color-bg) hover:bg-(--color-border-soft) w-8 h-8 rounded-full flex items-center justify-center text-(--color-muted) shrink-0"
                    aria-label="Fechar"
                >
                    <X size={15} />
                </button>
            )}
        </div>
    );
}

export function DialogFooter({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex gap-2 justify-end mt-5 pt-4 border-t border-(--color-border-soft)",
                className
            )}
        >
            {children}
        </div>
    );
}
