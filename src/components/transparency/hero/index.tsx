import Link from "next/link";
import { Shield } from "lucide-react";

const META = [
    { lbl: "CNPJ", val: "42.918.554/0001-08", mono: true },
    { lbl: "Natureza jurídica", val: "Associação · OSC" },
    { lbl: "Última atualização", val: "30 abr 2026", live: true },
    { lbl: "Auditoria externa", val: "Moreira & Sá · 2025" },
];

export function Hero() {
    return (
        <header className="relative overflow-hidden border-b border-(--color-border-soft) bg-gradient-to-b from-white to-(--color-bg) pt-16 pb-14">
            <div
                aria-hidden
                className="pointer-events-none absolute -top-10 -right-20 w-[380px] h-[380px] rounded-full opacity-50 bg-[radial-gradient(circle,var(--color-g100)_0%,transparent_70%)]"
            />
            <div className="wrap relative z-[1]">
                <nav className="flex items-center gap-2 text-[13px] text-(--color-muted) mb-5">
                    <Link href="/" className="no-underline hover:text-(--color-g600)">
                        Início
                    </Link>
                    <span className="opacity-50">›</span>
                    <span>Transparência</span>
                </nav>
                <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-end">
                    <div>
                        <div className="inline-flex items-center gap-1.5 bg-(--color-g50) border border-(--color-g100) text-(--color-g600) text-xs font-semibold px-3 py-[5px] rounded-full tracking-[.2px] mb-[18px]">
                            <Shield size={13} strokeWidth={2.2} />
                            Conforme Lei 13.019/2014 (MROSC) e LAI
                        </div>
                        <h1 className="text-[clamp(38px,5vw,54px)] font-extrabold tracking-[-2px] leading-[1.05] mb-[18px]">
                            Tudo o que entra, tudo o que sai — à vista de todos.
                        </h1>
                        <p className="text-[17px] text-(--color-muted) leading-[1.65] max-w-[560px]">
                            Esta página reúne demonstrações financeiras, convênios públicos,
                            documentos institucionais, governança e canais de ouvidoria do Instituto
                            Verde Esperança. Atualizada trimestralmente e auditada anualmente por
                            contabilidade independente.
                        </p>
                    </div>
                    <aside className="bg-white border border-(--color-border-soft) rounded-[14px] px-6 py-[22px] flex flex-col gap-3.5 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
                        {META.map((m, i) => (
                            <div
                                key={m.lbl}
                                className={`flex justify-between items-start gap-[18px] text-[13px] ${i > 0 ? "border-t border-(--color-border-soft) pt-3.5" : ""}`}
                            >
                                <span className="text-(--color-muted) font-medium shrink-0">
                                    {m.lbl}
                                </span>
                                <span
                                    className={`font-bold text-right ${m.mono ? "font-mono text-[12.5px]" : ""} ${m.live ? "inline-flex items-center gap-1.5 text-(--color-g600)" : ""}`}
                                >
                                    {m.live ? (
                                        <span className="w-[7px] h-[7px] rounded-full bg-(--color-g500) shadow-[0_0_0_3px_rgba(37,154,67,0.2)] animate-[painel-pulse_2s_ease-in-out_infinite]" />
                                    ) : null}
                                    {m.val}
                                </span>
                            </div>
                        ))}
                    </aside>
                </div>
            </div>
        </header>
    );
}
