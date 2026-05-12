import { Section, SectionHead } from "../section";

const CARDS = [
    {
        full: true,
        h: "Razão social",
        v: "Instituto Verde Esperança — Associação de Apoio à Criança Autista",
        vs: "Pessoa jurídica de direito privado, sem fins lucrativos, regida pelos arts. 53 a 61 do Código Civil e pela Lei 13.019/2014.",
    },
    {
        h: "CNPJ",
        v: "42.918.554/0001-08",
        mono: true,
        vs: "Ativo desde 14/03/2021 · Receita Federal",
    },
    {
        h: "Inscrições",
        v: "CEBAS 71000.038.291/2023-44",
        mono: true,
        vs: "OSCIP em análise · UPF / CMDCA Curitiba ativo",
    },
    {
        full: true,
        h: "Endereço da sede",
        v: "Rua das Acácias, 482 — Bairro Jardim Botânico",
        vs: "Curitiba/PR · CEP 80210-340 · Telefone (41) 3262-4810 · contato@institutoverde.org.br",
    },
    {
        h: "Data de fundação",
        v: "14 de março de 2021",
        vs: "Ata registrada no 3º Ofício de Registro Civil PJ de Curitiba",
    },
    {
        h: "Finalidade estatutária",
        v: "Atendimento multidisciplinar a crianças com TEA",
        small: true,
        vs: "e suporte às respectivas famílias, com gratuidade integral ou subsidiada conforme avaliação socioeconômica.",
    },
];

export function Identification() {
    return (
        <Section id="ident" alt>
            <SectionHead eyebrow="01 · Identificação institucional" title="Quem somos, formalmente">
                Dados cadastrais públicos do Instituto, em conformidade com o art. 11 da Lei
                13.019/2014.
            </SectionHead>
            <div className="grid md:grid-cols-2 gap-[18px]">
                {CARDS.map((c) => (
                    <div
                        key={c.h}
                        className={`bg-white border border-(--color-border-soft) rounded-[14px] px-[26px] py-6 ${c.full ? "md:col-span-2" : ""}`}
                    >
                        <h4 className="text-[11px] font-bold text-(--color-muted) tracking-[1.2px] uppercase mb-2">
                            {c.h}
                        </h4>
                        <div
                            className={`font-bold text-(--color-text) ${c.mono ? "font-mono tracking-[-.3px] text-base" : c.small ? "text-sm font-semibold" : "text-base"}`}
                        >
                            {c.v}
                        </div>
                        <div className="text-[13.5px] text-(--color-muted) mt-1.5 leading-[1.65]">
                            {c.vs}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
