"use client";
import { useEffect, useState } from "react";

const TABS = [
    { id: "ident", label: "Identificação" },
    { id: "governanca", label: "Governança" },
    { id: "financeiro", label: "Demonstrações financeiras" },
    { id: "convenios", label: "Convênios públicos" },
    { id: "documentos", label: "Documentos" },
    { id: "certidoes", label: "Certidões" },
    { id: "ouvidoria", label: "Ouvidoria & LAI" },
];

export function PageTabs() {
    const [active, setActive] = useState(TABS[0].id);

    useEffect(() => {
        const onScroll = () => {
            const sp = window.scrollY + 180;
            let current = TABS[0].id;
            for (const t of TABS) {
                const el = document.getElementById(t.id);
                if (el && el.offsetTop <= sp) current = t.id;
            }
            setActive(current);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const go = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - 130,
            behavior: "smooth",
        });
    };

    return (
        <nav className="sticky top-[68px] z-[200] bg-white/90 backdrop-blur-md border-b border-(--color-border-soft)">
            <div className="wrap">
                <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {TABS.map((t, i) => {
                        const on = active === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => go(t.id)}
                                className={`px-[18px] py-4 text-[13.5px] font-semibold whitespace-nowrap border-b-2 transition-colors inline-flex items-center gap-[7px] ${
                                    on
                                        ? "text-(--color-g600) border-(--color-g500)"
                                        : "text-(--color-muted) border-transparent hover:text-(--color-text)"
                                }`}
                            >
                                <span
                                    className={`inline-flex items-center justify-center w-[18px] h-[18px] rounded-full text-[10px] font-bold ${
                                        on
                                            ? "bg-(--color-g500) text-white"
                                            : "bg-(--color-bg) text-(--color-muted)"
                                    }`}
                                >
                                    {i + 1}
                                </span>
                                {t.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
