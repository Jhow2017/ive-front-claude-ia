"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import { Section, SectionHead } from "../section";

const YEARS: { year: string; label: string; rec: string; desp: string; draft?: boolean }[] = [
    { year: "2025", label: "2025", rec: "R$ 4.823.490", desp: "R$ 4.601.218" },
    { year: "2024", label: "2024", rec: "R$ 4.091.700", desp: "R$ 3.948.214" },
    { year: "2023", label: "2023", rec: "R$ 2.784.300", desp: "R$ 2.701.180" },
    { year: "2022", label: "2022", rec: "R$ 1.902.040", desp: "R$ 1.781.502" },
    {
        year: "2026",
        label: "2026 (parcial)",
        rec: "R$ 1.412.310",
        desp: "R$ 1.298.044",
        draft: true,
    },
];

const ORIGIN = [
    { lbl: "Doações pessoa física", pct: 42, color: "#259a43" },
    { lbl: "Doações pessoa jurídica", pct: 28, color: "#1e7d37" },
    { lbl: "Convênios públicos", pct: 18, color: "#0284c7" },
    { lbl: "Eventos e captação", pct: 8, color: "#f59e0b" },
    { lbl: "Rendimentos e outros", pct: 4, color: "#a78bfa" },
];

const APPLICATION = [
    { name: "Atendimento clínico", pct: 62, val: "R$ 2,85M · 62%", color: "#259a43" },
    { name: "Programa social", pct: 15, val: "R$ 690k · 15%", color: "#1e7d37" },
    { name: "Formação & pesquisa", pct: 10, val: "R$ 460k · 10%", color: "#0284c7" },
    { name: "Tecnologia (plataforma)", pct: 5, val: "R$ 230k · 5%", color: "#7c3aed" },
    { name: "Administração", pct: 6, val: "R$ 276k · 6%", color: "#94a3b8" },
    { name: "Captação de recursos", pct: 2, val: "R$ 95k · 2%", color: "#cbd5e1" },
];

const EVOLUTION = [
    { year: "2022", rec: 1.9, desp: 1.78, label: "1,90" },
    { year: "2023", rec: 2.78, desp: 2.7, label: "2,78" },
    { year: "2024", rec: 4.09, desp: 3.95, label: "4,09" },
    { year: "2025", rec: 4.82, desp: 4.6, label: "4,82" },
];

const R = 44;
const C = 2 * Math.PI * R;

function Donut() {
    let offset = 0;
    return (
        <svg viewBox="0 0 120 120" className="w-[180px] h-[180px]">
            <circle cx="60" cy="60" r={R} fill="none" stroke="#f6f8f6" strokeWidth="18" />
            {ORIGIN.map((s) => {
                const len = (s.pct / 100) * C;
                const el = (
                    <circle
                        key={s.lbl}
                        cx="60"
                        cy="60"
                        r={R}
                        fill="none"
                        stroke={s.color}
                        strokeWidth="18"
                        strokeDasharray={`${len} ${C - len}`}
                        strokeDashoffset={-offset}
                        transform="rotate(-90 60 60)"
                    />
                );
                offset += len;
                return el;
            })}
            <text
                x="60"
                y="55"
                textAnchor="middle"
                className="text-[11px] font-semibold uppercase tracking-[1px] fill-(--color-muted)"
            >
                Total
            </text>
            <text
                x="60"
                y="74"
                textAnchor="middle"
                className="text-[24px] font-extrabold tracking-[-.5px] fill-(--color-text)"
            >
                R$ 4,82M
            </text>
        </svg>
    );
}

function EvolutionChart() {
    // value scale: 0 at y=165, 5M at y=30 → 27px per 1M
    const y0 = 165;
    const k = 27;
    return (
        <svg viewBox="0 0 720 200" preserveAspectRatio="none" className="w-full h-[200px] block">
            <g stroke="#e3eae4" strokeWidth="1">
                {[30, 75, 120, 165].map((y) => (
                    <line key={y} x1="40" y1={y} x2="700" y2={y} />
                ))}
            </g>
            <g className="text-[10px] fill-(--color-muted) font-mono">
                <text x="34" y="34" textAnchor="end">
                    5M
                </text>
                <text x="34" y="79" textAnchor="end">
                    3M
                </text>
                <text x="34" y="124" textAnchor="end">
                    1,5M
                </text>
                <text x="34" y="169" textAnchor="end">
                    0
                </text>
            </g>
            {EVOLUTION.map((d, i) => {
                const xr = 80 + i * 160;
                const hr = d.rec * k;
                const hd = d.desp * k;
                return (
                    <g key={d.year}>
                        <rect x={xr} y={y0 - hr} width="40" height={hr} fill="#259a43" rx="3" />
                        <rect
                            x={xr + 44}
                            y={y0 - hd}
                            width="40"
                            height={hd}
                            fill="#0f1a10"
                            rx="3"
                        />
                        <text
                            x={xr + 20}
                            y={y0 - hr - 6}
                            textAnchor="middle"
                            className="font-mono"
                            fontSize="10"
                            fill="#0f1a10"
                            fontWeight="600"
                        >
                            {d.label}
                        </text>
                        <text
                            x={xr + 42}
                            y="185"
                            textAnchor="middle"
                            className="text-[10px] fill-(--color-muted) font-mono"
                        >
                            {d.year}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

export function Financials() {
    const [year, setYear] = useState(YEARS[0]);
    return (
        <Section id="financeiro" alt>
            <SectionHead
                eyebrow="03 · Demonstrações financeiras"
                title="Origem e aplicação dos recursos"
            >
                Valores auditados conforme NBC TG 1000 e ITG 2002. Os exercícios anteriores ficam
                disponíveis para consulta — selecione o ano abaixo.
            </SectionHead>

            <div className="flex justify-between items-center mb-7 flex-wrap gap-3.5">
                <div className="flex bg-white border border-(--color-border-soft) rounded-[10px] p-1 gap-0.5 flex-wrap">
                    {YEARS.map((y) => (
                        <button
                            key={y.year}
                            onClick={() => setYear(y)}
                            className={`px-3.5 py-2 text-[13px] font-bold rounded-[7px] transition-colors ${
                                year.year === y.year
                                    ? "bg-(--color-text) text-white"
                                    : y.draft
                                      ? "text-(--color-amber) hover:bg-(--color-bg)"
                                      : "text-(--color-muted) hover:bg-(--color-bg)"
                            }`}
                        >
                            {y.label}
                            {y.draft ? " •" : ""}
                        </button>
                    ))}
                </div>
                <button className="inline-flex items-center gap-1.5 bg-white border border-(--color-border-soft) text-(--color-text) hover:border-(--color-g500) hover:text-(--color-g500) text-[12.5px] font-semibold px-3 py-[7px] rounded-[7px] transition-colors">
                    <Download size={14} />
                    Baixar balanço completo · {year.year}
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-[18px]">
                <div className="bg-white border border-(--color-border-soft) rounded-[14px] p-[26px]">
                    <div className="flex justify-between items-start mb-[18px] gap-3.5">
                        <div>
                            <div className="text-[15px] font-bold">Origem dos recursos</div>
                            <div className="text-xs text-(--color-muted) mt-[3px]">
                                De onde veio cada real
                            </div>
                        </div>
                        <div className="text-[28px] font-extrabold tracking-[-.8px] leading-none">
                            {year.rec}
                            <small className="text-sm font-semibold text-(--color-muted) ml-1">
                                ,00
                            </small>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-7 items-center justify-items-center sm:justify-items-stretch">
                        <Donut />
                        <div className="flex flex-col gap-[11px] w-full">
                            {ORIGIN.map((s) => (
                                <div key={s.lbl} className="flex items-center gap-2.5 text-[13px]">
                                    <span
                                        className="w-[11px] h-[11px] rounded-[3px] shrink-0"
                                        style={{ background: s.color }}
                                    />
                                    <span className="flex-1 font-medium">{s.lbl}</span>
                                    <span className="font-mono font-bold text-[12.5px] text-(--color-muted) tabular-nums">
                                        {s.pct.toLocaleString("pt-BR")},0%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-(--color-border-soft) rounded-[14px] p-[26px]">
                    <div className="flex justify-between items-start mb-[18px] gap-3.5">
                        <div>
                            <div className="text-[15px] font-bold">Aplicação dos recursos</div>
                            <div className="text-xs text-(--color-muted) mt-[3px]">
                                Para onde foi cada real
                            </div>
                        </div>
                        <div className="text-[28px] font-extrabold tracking-[-.8px] leading-none">
                            {year.desp}
                            <small className="text-sm font-semibold text-(--color-muted) ml-1">
                                ,00
                            </small>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3.5">
                        {APPLICATION.map((b) => (
                            <div
                                key={b.name}
                                className="grid grid-cols-[110px_1fr_110px] sm:grid-cols-[140px_1fr_110px] gap-3 items-center"
                            >
                                <span className="text-[13px] font-semibold">{b.name}</span>
                                <div className="h-2.5 bg-(--color-bg) rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-[width] duration-500"
                                        style={{ width: `${b.pct}%`, background: b.color }}
                                    />
                                </div>
                                <span className="text-[12.5px] font-bold text-(--color-muted) text-right font-mono">
                                    {b.val}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-(--color-border-soft) rounded-[14px] p-[26px] lg:col-span-2">
                    <div className="flex justify-between items-start mb-[18px] gap-3.5 flex-wrap">
                        <div>
                            <div className="text-[15px] font-bold">
                                Evolução receita × despesa · 2022–2025
                            </div>
                            <div className="text-xs text-(--color-muted) mt-[3px]">
                                Valores em R$ milhões. Superávit sempre reinvestido na missão.
                            </div>
                        </div>
                        <div className="flex gap-[18px] text-xs text-(--color-muted)">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-[2px] bg-(--color-g500)" />
                                Receita
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-[2px] bg-(--color-text)" />
                                Despesa
                            </div>
                        </div>
                    </div>
                    <EvolutionChart />
                </div>
            </div>
        </Section>
    );
}
