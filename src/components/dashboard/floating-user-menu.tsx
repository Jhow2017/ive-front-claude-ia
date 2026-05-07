"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Settings, Bell, ArrowRight, LogOut } from "lucide-react";
import { useAuth, profileForRole } from "@/stores/auth";

export function FloatingUserMenu() {
    const router = useRouter();
    const role = useAuth((s) => s.role);
    const cycle = useAuth((s) => s.cycleRole);
    const logout = useAuth((s) => s.logout);
    const profile = profileForRole[role];
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    const [open, setOpen] = useState(false);
    const drag = useRef({ on: false, dx: 0, dy: 0, moved: false });

    useEffect(() => {
        const stored = (() => {
            try {
                return JSON.parse(localStorage.getItem("ive_fab_pos") || "null");
            } catch {
                return null;
            }
        })();
        setPos(stored ?? { x: window.innerWidth - 80, y: window.innerHeight - 96 });
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
            localStorage.setItem("ive_fab_pos", JSON.stringify(pos));
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
        const t = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
        drag.current = { on: true, dx: t.clientX - pos.x, dy: t.clientY - pos.y, moved: false };
    };

    const handleClick = () => {
        if (!drag.current.moved) setOpen((o) => !o);
    };

    const goConfig = () => {
        setOpen(false);
        router.push("/configuracoes");
    };

    const handleLogout = () => {
        setOpen(false);
        logout();
        router.push("/login");
    };

    const items = [
        { label: "Meu perfil", Ic: User, fn: goConfig },
        { label: "Preferências", Ic: Settings, fn: goConfig },
        { label: "Notificações", Ic: Bell, fn: goConfig },
        {
            label: "Trocar papel (demo)",
            Ic: ArrowRight,
            fn: () => {
                setOpen(false);
                cycle();
            },
        },
        { label: "Sair", Ic: LogOut, fn: handleLogout },
    ];

    const openLeft = pos.x > (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
    const openTop = pos.y > (typeof window !== "undefined" ? window.innerHeight / 2 : 0);

    return (
        <div className="fixed z-[9000]" style={{ left: pos.x, top: pos.y }}>
            <button
                onMouseDown={onDown}
                onTouchStart={onDown}
                onClick={handleClick}
                className="w-14 h-14 rounded-full border-none bg-gradient-to-br from-(--color-g500) to-(--color-g600) text-white font-extrabold text-lg cursor-grab active:cursor-grabbing shadow-2xl flex items-center justify-center"
                title={`${profile.name} — arraste para mover`}
            >
                {profile.init}
            </button>
            {open && (
                <div
                    className="absolute w-60 bg-white border border-(--color-border-soft) rounded-xl shadow-2xl overflow-hidden"
                    style={{
                        [openLeft ? "right" : "left"]: 0,
                        [openTop ? "bottom" : "top"]: 64,
                    }}
                >
                    <div className="px-4 py-3.5 bg-(--color-g50) border-b border-(--color-border-soft)">
                        <div className="text-sm font-bold">{profile.name}</div>
                        <div className="text-xs text-(--color-muted)">{profile.sub}</div>
                    </div>
                    {items.map((it, i) => (
                        <button
                            key={i}
                            onClick={it.fn}
                            className="w-full px-4 py-2.5 flex items-center gap-2.5 bg-transparent border-none cursor-pointer text-[13px] font-medium text-(--color-text) text-left hover:bg-(--color-bg)"
                        >
                            <it.Ic size={14} color="var(--color-muted)" />
                            {it.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
