import { LogoMark } from "@/components/shared/logo";

const COLS = [
    { h: "Instituto", ls: ["Sobre", "Especialidades", "Como Funciona", "Nossa equipe"] },
    {
        h: "Plataforma",
        ls: ["Área da família", "Área do profissional", "Fazer login", "Criar conta"],
    },
    { h: "Social", ls: ["Programa de doações", "Relatório de impacto", "Parcerias", "Contato"] },
];

export function Footer() {
    return (
        <footer className="bg-(--color-g700) py-16 pb-8">
            <div className="wrap">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2.5 mb-2.5">
                            <LogoMark size={32} />
                            <div className="text-[15px] font-extrabold text-white">
                                Instituto <em className="text-(--color-g200) not-italic">Verde</em>{" "}
                                Esperança
                            </div>
                        </div>
                        <div className="text-[13px] text-white/40 leading-relaxed max-w-md">
                            Atendimento multidisciplinar especializado em crianças autistas, com
                            plataforma integrada para famílias e profissionais.
                        </div>
                    </div>
                    {COLS.map((col) => (
                        <div key={col.h}>
                            <h4 className="text-xs font-semibold text-white mb-3.5">{col.h}</h4>
                            <ul className="list-none flex flex-col gap-2.5">
                                {col.ls.map((l) => (
                                    <li key={l}>
                                        <a
                                            href="#"
                                            className="text-[13px] text-white/40 hover:text-white transition-colors no-underline"
                                        >
                                            {l}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-white/10 pt-5 flex flex-wrap gap-2 justify-between text-xs text-white/25">
                    <div>© 2026 Instituto Verde Esperança. Todos os direitos reservados.</div>
                    <div>CFM · CRP · CRFa · CREFITO</div>
                </div>
            </div>
        </footer>
    );
}
