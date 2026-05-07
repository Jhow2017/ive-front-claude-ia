import { Brain, Mic, Hand, User, BookOpen, Activity } from "lucide-react";

const AREAS = [
    {
        Ic: Brain,
        n: "Neuropsicologia",
        d: "Avaliação cognitiva, atenção, memória e diagnóstico individualizado.",
        bg: "#f0faf3",
        c: "#259a43",
    },
    {
        Ic: Mic,
        n: "Fonoaudiologia",
        d: "Comunicação verbal e não-verbal, linguagem, alimentação e processamento auditivo.",
        bg: "#eef2ff",
        c: "#6366f1",
    },
    {
        Ic: Hand,
        n: "Terapia Ocupacional",
        d: "Integração sensorial, coordenação motora e habilidades de vida diária.",
        bg: "#fff7ed",
        c: "#f59e0b",
    },
    {
        Ic: User,
        n: "Psicologia",
        d: "Desenvolvimento emocional e comportamental. Intervenção baseada em ABA.",
        bg: "#fdf2f8",
        c: "#ec4899",
    },
    {
        Ic: BookOpen,
        n: "Psicopedagogia",
        d: "Dificuldades de aprendizagem, letramento e suporte ao desenvolvimento escolar.",
        bg: "#eff6ff",
        c: "#3b82f6",
    },
    {
        Ic: Activity,
        n: "Psicomotricidade",
        d: "Integração cognitivo-motora, trabalho corporal e proprioceptivo.",
        bg: "#f0fdfa",
        c: "#10b981",
    },
];

export function Especialidades() {
    return (
        <section className="py-24 bg-(--color-g50)" id="especialidades">
            <div className="wrap">
                <div className="max-w-lg">
                    <div className="text-[11px] font-bold text-(--color-g500) tracking-[1.2px] uppercase mb-2.5">
                        Especialidades
                    </div>
                    <h2 className="text-[38px] font-extrabold tracking-tight leading-[1.18] mb-4">
                        Equipe multidisciplinar, foco definido
                    </h2>
                    <p className="text-base text-(--color-muted) leading-relaxed">
                        Todas as áreas compartilham prontuário e participam de reuniões mensais de
                        equipe por paciente.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
                    {AREAS.map((a, i) => (
                        <div
                            key={i}
                            className="bg-white border border-(--color-border-soft) rounded-2xl p-7 transition-all hover:border-(--color-g200) hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <div
                                className="w-13 h-13 rounded-xl flex items-center justify-center mb-3.5 p-3"
                                style={{ background: a.bg }}
                            >
                                <a.Ic size={22} color={a.c} />
                            </div>
                            <div className="text-[15px] font-bold mb-1.5">{a.n}</div>
                            <div className="text-[13px] text-(--color-muted) leading-relaxed">
                                {a.d}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
