"use client";
import { useEffect, useRef, useState } from "react";
import { Eye, Settings, User, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth, type Role } from "@/shared/stores/auth";

const ROLES: { k: Role; label: string; icon: LucideIcon }[] = [
    { k: "admin", label: "Admin", icon: Settings },
    { k: "profissional", label: "Profissional", icon: User },
    { k: "familia", label: "Família", icon: Users },
];

const POS_KEY = "ive_role_fab_pos";

export function FloatingRoleSwitcher() {
    const role = useAuth((s) => s.role);
    const setRole = useAuth((s) => s.setRole);
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    const [open, setOpen] = useState(false);
    const drag = useRef({ on: false, dx: 0, dy: 0, moved: false });

    useEffect(() => {
        const stored = (() => {
            try {
                return JSON.parse(localStorage.getItem(POS_KEY) || "null");
            } catch {
                return null;
            }
        })();
        setPos(stored ?? { x: window.innerWidth - 88, y: window.innerHeight - 96 });
    }, []);

    useEffect(() => {
        if (!pos) return;
        const move = (e: MouseEvent | TouchEvent) => {
            if (!drag.current.on) return;
            const t = "touches" in e ? e.touches[0] : e;
            const nx = Math.min(Math.max(8, t.clientX - drag.current.dx), window.innerWidth - 64);
            const ny = Math.min(Math.max(8, t.clientY - drag.current.dy), window.innerHeight - 64);
            if (
                Math.abs(t.clientX - drag.current.dx - pos.x) > 3 ||
                Math.abs(t.clientY - drag.current.dy - pos.y) > 3
            )
                drag.current.moved = true;
            setPos({ x: nx, y: ny });
        };
        const up = () => {
            if (!drag.current.on) return;
            drag.current.on = false;
            localStorage.setItem(POS_KEY, JSON.stringify(pos));
        };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
        window.addEventListener("touchmove", move);
        window.addEventListener("touchend", up);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
            window.removeEventListener("touchmove", move);
            window.removeEventListener("touchend", up);
        };
    }, [pos]);

    if (!pos) return null;

    const onDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        const t = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
        drag.current = { on: true, dx: t.clientX - pos.x, dy: t.clientY - pos.y, moved: false };
    };
    const handleClick = () => {
        if (!drag.current.moved) setOpen((o) => !o);
    };

    const cur = ROLES.find((r) => r.k === role) ?? ROLES[0];
    const openLeft = pos.x > window.innerWidth / 2;
    const openTop = pos.y > window.innerHeight / 2;

    return (
        <div className="fixed z-[9000]" style={{ left: pos.x, top: pos.y }}>
            <button
                onMouseDown={onDown}
                onTouchStart={onDown}
                onClick={handleClick}
                title="Modo de visualização (demo) — arraste para mover"
                className="relative w-13 h-13 rounded-[14px] border-none bg-[#1e293b] text-white cursor-grab active:cursor-grabbing shadow-[0_8px_24px_rgba(15,23,42,0.35)] flex flex-col items-center justify-center gap-0.5"
            >
                <Eye size={18} />
                <span className="text-[9px] font-bold leading-none opacity-85">DEMO</span>
                <span className="absolute -bottom-[3px] -right-[3px] w-3 h-3 rounded-full bg-(--color-g500) border-2 border-[#1e293b]" />
            </button>
            {open && (
                <div
                    className="absolute w-60 bg-white border border-(--color-border-soft) rounded-[14px] shadow-[0_14px_36px_rgba(0,0,0,0.16)] overflow-hidden"
                    style={{ [openLeft ? "right" : "left"]: 0, [openTop ? "bottom" : "top"]: 60 }}
                >
                    <div className="px-3.5 py-3 bg-[#0f172a] text-white">
                        <div className="text-[11px] font-bold tracking-[1px] uppercase opacity-70 mb-0.5">
                            Modo de visualização
                        </div>
                        <div className="text-[13px] font-bold flex items-center gap-1.5">
                            <span className="w-[7px] h-[7px] rounded-full bg-(--color-g500)" />
                            Visão de {cur.label}
                        </div>
                    </div>
                    <div className="p-2.5 grid grid-cols-3 gap-1.5">
                        {ROLES.map((r) => {
                            const Icon = r.icon;
                            const on = role === r.k;
                            return (
                                <button
                                    key={r.k}
                                    onClick={() => {
                                        setRole(r.k);
                                        setOpen(false);
                                    }}
                                    className={`flex flex-col items-center gap-1 px-1 py-2.5 rounded-[10px] border text-[11px] font-semibold cursor-pointer ${
                                        on
                                            ? "bg-(--color-g50) border-(--color-g500) text-(--color-g700)"
                                            : "bg-white border-(--color-border-soft) text-(--color-text)"
                                    }`}
                                >
                                    <Icon
                                        size={16}
                                        color={on ? "var(--color-g600)" : "var(--color-muted)"}
                                    />
                                    {r.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="px-3.5 py-2 border-t border-(--color-border-soft) text-[10px] text-(--color-muted)">
                        Atalho apenas para demonstração.
                    </div>
                </div>
            )}
        </div>
    );
}
