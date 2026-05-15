"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, User, Settings, LifeBuoy, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth, profileForRole } from "@/shared/stores/auth";

const ITEMS: { label: string; icon: LucideIcon; href: string }[] = [
    { label: "Meu perfil", icon: User, href: "/profile" },
    { label: "Trocar senha", icon: Settings, href: "/change-password" },
    { label: "Ajuda e suporte", icon: LifeBuoy, href: "/help" },
];

export function UserMenu() {
    const router = useRouter();
    const role = useAuth((s) => s.role);
    const logout = useAuth((s) => s.logout);
    const p = profileForRole[role];
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    const tag = role === "admin" ? "Admin" : role === "profissional" ? "Profissional" : "Usuário";

    const onLogout = () => {
        setOpen(false);
        logout();
        router.push("/login");
    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 bg-white border border-(--color-border-soft) rounded-full cursor-pointer hover:border-(--color-g500) transition-colors"
            >
                <span className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-(--color-g500) to-(--color-g600) text-white font-extrabold text-xs flex items-center justify-center">
                    {p.init}
                </span>
                <span className="text-xs font-semibold hidden sm:inline">{tag}</span>
                <ChevronDown size={12} className="text-(--color-muted)" />
            </button>
            {open && (
                <div className="absolute top-[42px] right-0 w-62 bg-white border border-(--color-border-soft) rounded-xl shadow-2xl overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-3.5 bg-(--color-g50) border-b border-(--color-border-soft) flex items-center gap-2.5">
                        <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-(--color-g500) to-(--color-g600) text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                            {p.init}
                        </span>
                        <div className="min-w-0">
                            <div className="text-[13px] font-bold truncate">{p.name}</div>
                            <div className="text-[11px] text-(--color-muted) truncate">{p.sub}</div>
                        </div>
                    </div>
                    {ITEMS.map((it) => {
                        const Icon = it.icon;
                        return (
                            <Link
                                key={it.href}
                                href={it.href}
                                onClick={() => setOpen(false)}
                                className="w-full px-4 py-2.5 flex items-center gap-2.5 text-[13px] font-medium text-(--color-text) no-underline hover:bg-(--color-bg) transition-colors"
                            >
                                <Icon size={14} className="text-(--color-muted)" />
                                {it.label}
                            </Link>
                        );
                    })}
                    <div className="border-t border-(--color-border-soft)">
                        <button
                            onClick={onLogout}
                            className="w-full px-4 py-2.5 flex items-center gap-2.5 text-[13px] font-medium text-(--color-danger) text-left hover:bg-[#fef2f2] transition-colors"
                        >
                            <LogOut size={14} />
                            Sair
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
