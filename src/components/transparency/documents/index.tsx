import {
    FileText,
    CalendarDays,
    BarChart3,
    Activity,
    ClipboardCheck,
    Users,
    Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section, SectionHead } from "../section";

const DOCS: { icon: LucideIcon; ext: string; title: string; desc: string; meta: string }[] = [
    {
        icon: FileText,
        ext: "PDF · 412 KB",
        title: "Estatuto social consolidado",
        desc: "Versão consolidada pós-AGE de 22/02/2024. Inclui alterações no objeto social.",
        meta: "Atualizado 22 fev 2024",
    },
    {
        icon: FileText,
        ext: "PDF · 286 KB",
        title: "Ata de fundação",
        desc: "Ata da assembleia constitutiva realizada em 14 de março de 2021, com lista de fundadores.",
        meta: "Arquivado 14 mar 2021",
    },
    {
        icon: FileText,
        ext: "PDF · 198 KB",
        title: "Ata de eleição da diretoria 2024–2027",
        desc: "Assembleia geral ordinária de 09/12/2023. Lista de candidaturas, apuração e posse.",
        meta: "Atualizado 12 dez 2023",
    },
    {
        icon: CalendarDays,
        ext: "PDF · 1,2 MB",
        title: "Relatório de atividades 2025",
        desc: "Resultados, indicadores de impacto, depoimentos e fotos do ano. Aprovado em AGE.",
        meta: "Publicado 28 abr 2026",
    },
    {
        icon: BarChart3,
        ext: "PDF · 940 KB",
        title: "Demonstrações contábeis 2025",
        desc: "Balanço patrimonial, DRE, DMPL, DFC e notas explicativas. Auditado por Moreira & Sá.",
        meta: "Aprovado 22 abr 2026",
    },
    {
        icon: Activity,
        ext: "PDF · 320 KB",
        title: "Parecer da auditoria independente",
        desc: "Opinião sem ressalvas emitida pela Moreira & Sá Auditores Independentes, CRC 2PR 5482-O.",
        meta: "Emitido 18 abr 2026",
    },
    {
        icon: ClipboardCheck,
        ext: "PDF · 184 KB",
        title: "Regimento interno",
        desc: "Normas de funcionamento dos órgãos, eleições, conflitos de interesse e código de conduta.",
        meta: "Atualizado 10 jun 2024",
    },
    {
        icon: Users,
        ext: "PDF · 226 KB",
        title: "Plano de trabalho 2026",
        desc: "Metas, ações, indicadores e orçamento aprovados em AGO de fevereiro de 2026.",
        meta: "Aprovado 15 fev 2026",
    },
    {
        icon: Shield,
        ext: "PDF · 156 KB",
        title: "Política de privacidade & LGPD",
        desc: "Como tratamos dados de famílias, doadores e equipe. Encarregada nomeada formalmente.",
        meta: "Atualizada 02 jan 2026",
    },
];

export function Documents() {
    return (
        <Section id="documentos" alt>
            <SectionHead
                eyebrow="05 · Documentos institucionais"
                title="Tudo que sustenta o Instituto, por escrito"
            >
                Estatuto, atas, regimentos, planos de trabalho e relatórios anuais. Os arquivos
                estão disponíveis em PDF e ficam arquivados por 5 anos no mínimo.
            </SectionHead>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DOCS.map((d) => {
                    const Icon = d.icon;
                    return (
                        <a
                            key={d.title}
                            href="#"
                            className="bg-white border border-(--color-border-soft) rounded-[14px] p-[22px] flex flex-col gap-3.5 no-underline text-inherit transition-all hover:border-(--color-g200) hover:shadow-[0_6px_24px_rgba(37,154,67,0.08)] hover:-translate-y-px"
                        >
                            <div className="flex justify-between items-start gap-3">
                                <div className="w-11 h-11 rounded-[10px] bg-(--color-g50) flex items-center justify-center text-(--color-g600) shrink-0">
                                    <Icon size={22} strokeWidth={1.8} />
                                </div>
                                <span className="text-[10px] font-bold text-(--color-muted) bg-(--color-bg) px-[7px] py-[3px] rounded-[5px] tracking-[.5px]">
                                    {d.ext}
                                </span>
                            </div>
                            <div className="text-[14.5px] font-bold leading-[1.35]">{d.title}</div>
                            <div className="text-[12.5px] text-(--color-muted) leading-[1.55] flex-1">
                                {d.desc}
                            </div>
                            <div className="flex justify-between items-center text-[11px] text-(--color-muted) pt-3 border-t border-(--color-border-soft) font-mono">
                                <span>{d.meta}</span>
                                <span className="text-(--color-g600) font-bold">Baixar →</span>
                            </div>
                        </a>
                    );
                })}
            </div>
        </Section>
    );
}
