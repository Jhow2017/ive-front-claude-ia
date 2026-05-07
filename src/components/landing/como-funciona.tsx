const STEPS = [
    {
        n: "01",
        t: "Cadastro",
        d: "Crie conta e preencha o questionário inicial — histórico, diagnósticos e rotina.",
    },
    {
        n: "02",
        t: "Avaliação",
        d: "Avaliação multidisciplinar presencial para mapear as necessidades da criança.",
    },
    {
        n: "03",
        t: "Plano",
        d: "Plano individual com especialidades, frequência e metas por período.",
    },
    {
        n: "04",
        t: "Atendimento",
        d: "Sessões começam. Cada profissional registra evolução no prontuário compartilhado.",
    },
    {
        n: "05",
        t: "Acompanhamento",
        d: "Acesso à plataforma com relatórios, agenda e progresso em tempo real.",
    },
];

export function ComoFunciona() {
    return (
        <section className="py-24 bg-(--color-g500)" id="como-funciona">
            <div className="wrap">
                <div className="max-w-xl">
                    <div className="text-[11px] font-bold text-(--color-g200) tracking-[1.2px] uppercase mb-2.5">
                        Como funciona
                    </div>
                    <h2 className="text-[38px] font-extrabold text-white tracking-tight leading-[1.18] mb-4">
                        Do primeiro contato ao acompanhamento contínuo
                    </h2>
                    <p className="text-base text-white/70 leading-relaxed">
                        Um processo estruturado, sem etapas perdidas.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-7 mt-16">
                    {STEPS.map((s) => (
                        <div key={s.n}>
                            <div className="text-[11px] font-bold text-white/50 tracking-widest mb-2.5">
                                PASSO {s.n}
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/15 text-white text-sm font-extrabold flex items-center justify-center mb-3.5 border-2 border-white/25">
                                {s.n}
                            </div>
                            <div className="text-[15px] font-bold text-white mb-1.5">{s.t}</div>
                            <div className="text-[13px] text-white/65 leading-relaxed">{s.d}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
