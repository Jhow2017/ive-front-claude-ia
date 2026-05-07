"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { LogoMark } from "@/components/shared/logo";
import { NavIcon } from "../nav-icon";
import { getNav, type NavGroup } from "@/shared/lib/nav";
import { useAuth, profileForRole } from "@/shared/stores/auth";
import { useUI } from "@/shared/stores/ui";
import { cn } from "@/shared/lib/utils";

export function Sidebar() {
    const role = useAuth((s) => s.role);
    const collapsed = useUI((s) => s.sidebarCollapsed);
    const setCollapsed = useUI((s) => s.setSidebarCollapsed);
    const mobileOpen = useUI((s) => s.mobileSidebarOpen);
    const setMobileOpen = useUI((s) => s.setMobileSidebarOpen);
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
        pacientes: true,
        consultas: true,
        profissionais: true,
    });
    const nav: NavGroup[] = getNav(role);
    const profile = profileForRole[role];

    const toggle = (id: string) => setOpenMenus((o) => ({ ...o, [id]: !o[id] }));
    const isParentActive = (item: any) => item.children?.some((c: any) => pathname === c.href);

    return (
        <>
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[99] backdrop-blur-sm md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}
            <aside
                className={cn(
                    "bg-white border-r border-(--color-border-soft) flex flex-col shrink-0 overflow-hidden transition-[width] duration-300 ease-out relative z-[100]",
                    collapsed ? "w-(--sb-closed)" : "w-(--sb-open)",
                    "md:relative fixed top-0 left-0 bottom-0 md:translate-x-0",
                    mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
                )}
            >
                <div className="px-3.5 py-3.5 flex items-center gap-2.5 border-b border-(--color-border-soft) shrink-0 h-[57px]">
                    <LogoMark size={28} />
                    {!collapsed && (
                        <div className="overflow-hidden whitespace-nowrap">
                            <div className="text-xs font-extrabold leading-tight">
                                Instituto <em className="text-(--color-g500) not-italic">Verde</em>
                            </div>
                            <div className="text-[10px] text-(--color-muted) leading-tight">
                                Esperança
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
                    {nav.map((grp, gi) => (
                        <div key={gi}>
                            {!collapsed && (
                                <div className="text-[9px] font-bold text-(--color-muted2) tracking-widest uppercase px-4 pt-2.5 pb-1">
                                    {grp.grp}
                                </div>
                            )}
                            {grp.items.map((item) => {
                                const hasChildren = (item.children?.length ?? 0) > 0;
                                const isOpen = openMenus[item.id];
                                const isActive = item.href === pathname || isParentActive(item);
                                const content = (
                                    <div
                                        className={cn(
                                            "flex items-center gap-2.5 px-2.5 mx-1.5 my-px rounded-lg cursor-pointer transition-colors min-h-[36px] relative",
                                            isActive ? "bg-(--color-g50)" : "hover:bg-(--color-g50)"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-7 h-7 rounded-[7px] flex items-center justify-center shrink-0 transition-colors",
                                                isActive
                                                    ? "bg-(--color-g500) text-white"
                                                    : "text-(--color-muted)"
                                            )}
                                        >
                                            <NavIcon
                                                name={item.icon}
                                                size={15}
                                                color={isActive ? "#fff" : undefined}
                                            />
                                        </div>
                                        {!collapsed && (
                                            <>
                                                <span
                                                    className={cn(
                                                        "text-[13px] flex-1 whitespace-nowrap overflow-hidden",
                                                        isActive
                                                            ? "text-(--color-text) font-semibold"
                                                            : "text-(--color-muted) font-medium"
                                                    )}
                                                >
                                                    {item.label}
                                                </span>
                                                {item.badge && (
                                                    <span className="bg-(--color-g500) text-white text-[10px] font-bold px-1.5 py-px rounded-full shrink-0">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                {hasChildren && (
                                                    <ChevronDown
                                                        size={13}
                                                        className={cn(
                                                            "shrink-0 text-(--color-muted2) transition-transform",
                                                            isOpen && "rotate-180"
                                                        )}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                                return (
                                    <div key={item.id}>
                                        {hasChildren ? (
                                            <button
                                                onClick={() => toggle(item.id)}
                                                className="w-full text-left"
                                            >
                                                {content}
                                            </button>
                                        ) : (
                                            <Link
                                                href={item.href ?? "#"}
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {content}
                                            </Link>
                                        )}
                                        {hasChildren && !collapsed && (
                                            <div
                                                className="overflow-hidden transition-[max-height] duration-300"
                                                style={{ maxHeight: isOpen ? 200 : 0 }}
                                            >
                                                {item.children!.map((c) => {
                                                    const subActive = pathname === c.href;
                                                    return (
                                                        <Link
                                                            key={c.id}
                                                            href={c.href}
                                                            onClick={() => setMobileOpen(false)}
                                                            className={cn(
                                                                "flex items-center gap-2 pl-12 pr-2.5 mx-1.5 my-px rounded-lg cursor-pointer min-h-[31px] transition-colors no-underline",
                                                                subActive
                                                                    ? "bg-(--color-g50)"
                                                                    : "hover:bg-(--color-g50)"
                                                            )}
                                                        >
                                                            <div
                                                                className={cn(
                                                                    "w-1.5 h-1.5 rounded-full shrink-0",
                                                                    subActive
                                                                        ? "bg-(--color-g500)"
                                                                        : "bg-(--color-border-soft)"
                                                                )}
                                                            />
                                                            <span
                                                                className={cn(
                                                                    "text-xs",
                                                                    subActive
                                                                        ? "text-(--color-text) font-semibold"
                                                                        : "text-(--color-muted) font-medium"
                                                                )}
                                                            >
                                                                {c.label}
                                                            </span>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <hr className="border-t border-(--color-border-soft) mx-3" />
                <div className="px-3 py-2.5 flex items-center gap-2.5 border-t border-(--color-border-soft) shrink-0">
                    <div className="w-8 h-8 rounded-full bg-(--color-g100) text-(--color-g700) text-[11px] font-bold flex items-center justify-center shrink-0">
                        {profile.init}
                    </div>
                    {!collapsed && (
                        <div className="overflow-hidden whitespace-nowrap flex-1">
                            <div className="text-xs font-semibold truncate">{profile.name}</div>
                            <div className="text-[10px] text-(--color-muted)">{profile.role}</div>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={cn(
                            "w-7 h-7 rounded-[7px] bg-(--color-bg) hover:bg-(--color-border-soft) flex items-center justify-center text-(--color-muted) shrink-0 transition-transform",
                            collapsed && "rotate-180"
                        )}
                        title="Recolher"
                    >
                        <ChevronLeft size={14} />
                    </button>
                </div>
            </aside>
        </>
    );
}
