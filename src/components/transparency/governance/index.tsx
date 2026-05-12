"use client";
import { useState } from "react";
import { Section, SectionHead } from "../section";

type Person = { initials: string; color: string; name: string; role: string; bio: string };

const GROUPS: { key: string; label: string; people: Person[] }[] = [
    {
        key: "dir",
        label: "Diretoria executiva",
        people: [
            {
                initials: "MR",
                color: "#259a43",
                name: "Marina Ribeiro Camargo",
                role: "Presidenta · mandato 2024–2027",
                bio: "Psicóloga, CRP 08/24871. Sócia-fundadora. Atua em desenvolvimento infantil há 18 anos.",
            },
            {
                initials: "RT",
                color: "#1e7d37",
                name: "Rafael Tomé Albuquerque",
                role: "Vice-presidente · mandato 2024–2027",
                bio: "Pediatra, CRM-PR 32985. Coordena articulação com a rede pública de saúde.",
            },
            {
                initials: "CL",
                color: "#0284c7",
                name: "Camila Lemos Pacheco",
                role: "Diretora administrativo-financeira",
                bio: "Administradora, CRA-PR 28-91044. Responsável legal pela prestação de contas.",
            },
            {
                initials: "FN",
                color: "#7c3aed",
                name: "Fernando Nakashima",
                role: "Diretor técnico-clínico",
                bio: "Fonoaudiólogo, CRFa 4ª/8821. Coordena protocolo terapêutico multidisciplinar.",
            },
            {
                initials: "AS",
                color: "#e11d48",
                name: "Aline Souto Vasques",
                role: "Diretora de programas sociais",
                bio: "Assistente social, CRESS 11/PR 7129. Gere bolsas e atendimento subsidiado.",
            },
            {
                initials: "JM",
                color: "#f59e0b",
                name: "Júlia Moura de Lima",
                role: "Diretora de relações institucionais",
                bio: "Capta recursos, faz interlocução com parceiros e órgãos públicos.",
            },
        ],
    },
    {
        key: "cons",
        label: "Conselho fiscal",
        people: [
            {
                initials: "ED",
                color: "#1e7d37",
                name: "Eduardo Drumond Velasco",
                role: "Presidente do conselho fiscal · independente",
                bio: "Contador, CRC-PR 1SP 218.991. Sem vínculo familiar ou econômico com diretoria.",
            },
            {
                initials: "TC",
                color: "#0284c7",
                name: "Tatiana Costa Mendonça",
                role: "Membro · independente",
                bio: "Auditora pública aposentada, ex-TCE/PR. Pro bono desde 2022.",
            },
            {
                initials: "LB",
                color: "#7c3aed",
                name: "Luís Bertoldo Pinheiro",
                role: "Membro · representante das famílias",
                bio: "Pai atendido na instituição. Eleito em assembleia das famílias 2024.",
            },
        ],
    },
    {
        key: "tec",
        label: "Equipe técnica responsável",
        people: [
            {
                initials: "RC",
                color: "#259a43",
                name: "Renata Caldas — Resp. Técnica",
                role: "CRP 08/19204 · Psicologia",
                bio: "Responde tecnicamente pelos atendimentos psicológicos perante o CRP.",
            },
            {
                initials: "PM",
                color: "#1e7d37",
                name: "Patrícia Maciel Cordeiro",
                role: "CREFITO-8/12-984 · Terapia ocupacional",
                bio: "Coordena a equipe de TO e o setor de integração sensorial.",
            },
            {
                initials: "HG",
                color: "#0284c7",
                name: "Henrique Galvão Setti",
                role: "CRM-PR 41027 · Neuropediatria",
                bio: "Supervisão clínica e protocolo de avaliação inicial.",
            },
        ],
    },
];

export function Governance() {
    const [tab, setTab] = useState(GROUPS[0].key);
    const group = GROUPS.find((g) => g.key === tab)!;
    return (
        <Section id="governanca">
            <SectionHead eyebrow="02 · Governança" title="Quem decide e quem fiscaliza">
                A diretoria executiva é eleita em assembleia geral a cada 3 anos. O conselho fiscal
                é composto por membros independentes e se reúne trimestralmente.
            </SectionHead>
            <div className="flex gap-1.5 mb-6 bg-white border border-(--color-border-soft) rounded-[10px] p-1 w-fit flex-wrap">
                {GROUPS.map((g) => (
                    <button
                        key={g.key}
                        onClick={() => setTab(g.key)}
                        className={`px-4 py-2 text-[13px] font-semibold rounded-[7px] transition-colors ${
                            tab === g.key
                                ? "bg-(--color-g500) text-white"
                                : "text-(--color-muted) hover:text-(--color-text)"
                        }`}
                    >
                        {g.label}
                    </button>
                ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
                {group.people.map((p) => (
                    <div
                        key={p.name}
                        className="bg-white border border-(--color-border-soft) rounded-[14px] p-[22px] transition-shadow hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
                    >
                        <div className="flex gap-3.5 items-center mb-3.5">
                            <div
                                className="w-[54px] h-[54px] rounded-full flex items-center justify-center font-bold text-[18px] text-white shrink-0 tracking-[-.5px]"
                                style={{ background: p.color }}
                            >
                                {p.initials}
                            </div>
                            <div>
                                <div className="text-[15px] font-bold leading-[1.2]">{p.name}</div>
                                <div className="text-xs text-(--color-muted) mt-[3px] leading-[1.4]">
                                    {p.role}
                                </div>
                            </div>
                        </div>
                        <div className="text-[12.5px] text-(--color-muted) leading-[1.6] border-t border-(--color-border-soft) pt-3">
                            {p.bio}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
