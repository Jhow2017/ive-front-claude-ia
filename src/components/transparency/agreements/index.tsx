import { Section, SectionHead } from "../section";

type Status = "active" | "renov" | "encerrado";

const STATUS: Record<Status, { label: string; cls: string }> = {
    active: { label: "● Vigente", cls: "bg-(--color-g50) text-(--color-g600)" },
    renov: { label: "● Em renovação", cls: "bg-[#fef3e2] text-[#b45309]" },
    encerrado: { label: "● Encerrado", cls: "bg-(--color-bg) text-(--color-muted)" },
};

const ROWS: {
    org: string;
    ug: string;
    num: string;
    instr: string;
    obj: string;
    start: string;
    end: string;
    val: string;
    status: Status;
}[] = [
    {
        org: "Ministério da Saúde",
        ug: "UG 250105",
        num: "TF nº 894782/2024",
        instr: "Termo de Fomento",
        obj: "Ampliação do atendimento neuropsicológico a crianças do SUS com TEA em Curitiba e RMC.",
        start: "01/06/2024",
        end: "→ 31/05/2027",
        val: "1.480.000,00",
        status: "active",
    },
    {
        org: "Secretaria Estadual da Saúde / PR",
        ug: "SESA-PR",
        num: "TC nº 124/2024",
        instr: "Termo de Colaboração",
        obj: "Linha de cuidado integrada do espectro autista — referência regional sul.",
        start: "15/03/2024",
        end: "→ 14/03/2026",
        val: "628.500,00",
        status: "renov",
    },
    {
        org: "Fundação Municipal de Assistência Social",
        ug: "FAS Curitiba",
        num: "TF nº 089/2025",
        instr: "Termo de Fomento",
        obj: "Bolsas para 40 crianças em vulnerabilidade socioeconômica · ciclo terapêutico anual.",
        start: "10/01/2025",
        end: "→ 31/12/2025",
        val: "312.000,00",
        status: "active",
    },
    {
        org: "Ministério da Educação · FNDE",
        ug: "UG 153173",
        num: "TC nº 41/2023",
        instr: "Termo de Colaboração",
        obj: "Formação de 180 professores da rede pública para inclusão de alunos com TEA.",
        start: "05/05/2023",
        end: "→ 04/05/2025",
        val: "485.700,00",
        status: "encerrado",
    },
    {
        org: "Secretaria Estadual de Educação / PR",
        ug: "SEED-PR",
        num: "TCT nº 12/2025",
        instr: "Cooperação Técnica",
        obj: "Atendimento educacional especializado em parceria com 12 escolas estaduais.",
        start: "01/04/2025",
        end: "→ 31/03/2027",
        val: "218.400,00",
        status: "active",
    },
    {
        org: "Ministério dos Direitos Humanos e Cidadania",
        ug: "UG 810001",
        num: "TF nº 023/2022",
        instr: "Termo de Fomento",
        obj: "Estruturação inicial da sala sensorial e equipamentos de terapia ocupacional.",
        start: "12/08/2022",
        end: "→ 11/02/2024",
        val: "196.300,00",
        status: "encerrado",
    },
];

const TH =
    "text-left px-[18px] py-3.5 text-[11px] font-bold text-(--color-muted) tracking-[1px] uppercase border-b border-(--color-border-soft)";

export function Agreements() {
    return (
        <Section id="convenios">
            <SectionHead
                eyebrow="04 · Parcerias governamentais"
                title="Convênios públicos vigentes e encerrados"
            >
                Termos de Fomento, Colaboração e Cooperação celebrados com órgãos públicos federais,
                estaduais e municipais. Detalhes completos e prestações de contas individuais
                disponíveis em cada linha.
            </SectionHead>
            <div className="bg-white border border-(--color-border-soft) rounded-[14px] overflow-x-auto">
                <table className="w-full border-collapse text-[13px] min-w-[920px]">
                    <thead className="bg-(--color-bg)">
                        <tr>
                            <th className={TH}>Órgão concedente</th>
                            <th className={TH}>Nº & instrumento</th>
                            <th className={TH}>Objeto</th>
                            <th className={TH}>Vigência</th>
                            <th className={TH}>Valor (R$)</th>
                            <th className={TH}>Status</th>
                            <th className={TH} />
                        </tr>
                    </thead>
                    <tbody>
                        {ROWS.map((r) => (
                            <tr
                                key={r.num}
                                className="hover:bg-(--color-g50) [&>td]:p-[18px] [&>td]:border-b [&>td]:border-(--color-border-soft) [&>td]:align-top last:[&>td]:border-b-0"
                            >
                                <td>
                                    <div className="font-bold text-[13.5px]">{r.org}</div>
                                    <div className="font-mono text-xs text-(--color-muted)">
                                        {r.ug}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-mono text-xs text-(--color-muted)">
                                        {r.num}
                                    </div>
                                    <div className="font-mono text-xs text-(--color-muted)">
                                        {r.instr}
                                    </div>
                                </td>
                                <td className="text-(--color-muted) text-[12.5px] leading-[1.55] max-w-[380px]">
                                    {r.obj}
                                </td>
                                <td>
                                    <div className="font-mono text-xs text-(--color-muted)">
                                        {r.start}
                                    </div>
                                    <div className="font-mono text-xs text-(--color-muted)">
                                        {r.end}
                                    </div>
                                </td>
                                <td className="font-bold font-mono text-[13px] text-(--color-text) whitespace-nowrap">
                                    {r.val}
                                </td>
                                <td>
                                    <span
                                        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS[r.status].cls}`}
                                    >
                                        {STATUS[r.status].label}
                                    </span>
                                </td>
                                <td>
                                    <a
                                        href="#"
                                        className="text-(--color-g600) font-bold whitespace-nowrap no-underline hover:underline"
                                    >
                                        PDF →
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Section>
    );
}
