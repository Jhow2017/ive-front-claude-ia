import { Check, AlertCircle } from "lucide-react";
import { Section, SectionHead } from "../section";

type CertState = "ok" | "warn";

const CERTS: { name: string; meta: { lbl: string; val: string }[]; state: CertState }[] = [
    {
        name: "CND — Receita Federal & PGFN",
        state: "ok",
        meta: [
            { lbl: "Emitida", val: "14/04/2026" },
            { lbl: "Validade", val: "11/10/2026" },
            { lbl: "Código", val: "A1B2.C3D4" },
        ],
    },
    {
        name: "CRF — FGTS · Caixa",
        state: "ok",
        meta: [
            { lbl: "Emitida", val: "22/04/2026" },
            { lbl: "Validade", val: "22/06/2026" },
        ],
    },
    {
        name: "CNDT — Débitos Trabalhistas · TST",
        state: "ok",
        meta: [
            { lbl: "Emitida", val: "09/04/2026" },
            { lbl: "Validade", val: "05/10/2026" },
        ],
    },
    {
        name: "Certidão Estadual · SEFA-PR",
        state: "ok",
        meta: [
            { lbl: "Emitida", val: "30/03/2026" },
            { lbl: "Validade", val: "26/09/2026" },
        ],
    },
    {
        name: "Certidão Municipal · SMF Curitiba",
        state: "ok",
        meta: [
            { lbl: "Emitida", val: "02/04/2026" },
            { lbl: "Validade", val: "01/10/2026" },
        ],
    },
    {
        name: "CEBAS — Saúde",
        state: "warn",
        meta: [
            { lbl: "Vigente até", val: "30/06/2026" },
            { lbl: "Renovação", val: "protocolada 12/03/2026" },
        ],
    },
];

export function Certifications() {
    return (
        <Section id="certidoes">
            <SectionHead eyebrow="06 · Regularidade fiscal e trabalhista" title="Certidões em dia">
                Estado atual das principais certidões exigidas para celebração de parcerias e
                recebimento de recursos públicos. Atualizadas automaticamente pela área
                administrativa.
            </SectionHead>
            <div className="grid md:grid-cols-2 gap-3.5">
                {CERTS.map((c) => (
                    <div
                        key={c.name}
                        className="bg-white border border-(--color-border-soft) rounded-[14px] px-[22px] py-5 flex gap-4 items-start"
                    >
                        <div
                            className={`w-[42px] h-[42px] rounded-[10px] flex items-center justify-center shrink-0 ${c.state === "ok" ? "bg-(--color-g50) text-(--color-g600)" : "bg-[#fef3e2] text-[#b45309]"}`}
                        >
                            {c.state === "ok" ? (
                                <Check size={22} strokeWidth={2.2} />
                            ) : (
                                <AlertCircle size={22} strokeWidth={2.2} />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold mb-[3px]">{c.name}</div>
                            <div className="text-xs text-(--color-muted) flex flex-wrap gap-x-3.5 gap-y-1 mt-1.5">
                                {c.meta.map((m) => (
                                    <span key={m.lbl}>
                                        {m.lbl}{" "}
                                        <b className="text-(--color-text) font-semibold">{m.val}</b>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                            <span
                                className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap border ${c.state === "ok" ? "bg-(--color-g50) text-(--color-g600) border-(--color-g100)" : "bg-[#fef3e2] text-[#b45309] border-[#fcd9a3]"}`}
                            >
                                {c.state === "ok" ? "● Regular" : "● Em renovação"}
                            </span>
                            <a
                                href="#"
                                className="text-(--color-g600) font-bold text-[11px] no-underline hover:underline"
                            >
                                Ver →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
