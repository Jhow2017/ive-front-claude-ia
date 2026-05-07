"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, MessageSquare, Settings } from "lucide-react";

const ITEMS = [
    { href: "/home", Ic: Home, label: "Início" },
    { href: "/pacientes", Ic: Users, label: "Pacientes" },
    { href: "/agenda", Ic: Calendar, label: "Agenda" },
    { href: "/mensagens", Ic: MessageSquare, label: "Mensagens" },
    { href: "/configuracoes", Ic: Settings, label: "Config" },
];

export function BottomNav() {
    const pathname = usePathname();
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-(--color-border-soft) z-[98] flex justify-around py-2">
            {ITEMS.map((i) => {
                const active = pathname.startsWith(i.href);
                return (
                    <Link
                        key={i.href}
                        href={i.href}
                        className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium no-underline ${
                            active ? "text-(--color-g500)" : "text-(--color-muted)"
                        }`}
                    >
                        <i.Ic size={20} />
                        {i.label}
                    </Link>
                );
            })}
        </nav>
    );
}
