import { IllusTherapy } from "../illus";

const FEATS = [
    {
        ico: "💚",
        bg: "#f0faf3",
        title: "Abordagem Humanizada",
        desc: "Cada atendimento é pensado com carinho, respeitando as necessidades e o tempo de cada criança.",
    },
    {
        ico: "👥",
        bg: "#eff6ff",
        title: "Equipe Multidisciplinar",
        desc: "Profissionais especializados trabalhando juntos para o desenvolvimento integral da criança.",
    },
    {
        ico: "🎓",
        bg: "#f5f3ff",
        title: "Metodologia Científica",
        desc: "Baseamos nossos atendimentos em evidências científicas e melhores práticas consolidadas.",
    },
    {
        ico: "🏠",
        bg: "#fff7ed",
        title: "Espaço Sensorial",
        desc: "Ambiente especialmente preparado para proporcionar conforto e estímulos adequados a cada criança.",
    },
];

export function WhoWeAre() {
    return (
        <section className="py-24 bg-white" id="quem-somos">
            <div className="wrap">
                <div className="text-center max-w-xl mx-auto mb-14">
                    <div className="text-[11px] font-bold text-(--color-g500) tracking-[1.2px] uppercase mb-2.5">
                        Sobre o Instituto Verde Esperança
                    </div>
                    <h2 className="text-[38px] font-extrabold tracking-tight leading-[1.18]">
                        Um lugar onde cada criança é acolhida com amor, respeito e dedicação
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
                    <div>
                        <div className="text-base font-bold mb-4">Quem Somos</div>
                        <div className="flex flex-col gap-4 text-[15px] text-(--color-muted) leading-[1.85]">
                            <p>
                                O Instituto Verde Esperança nasceu do sonho de criar um espaço
                                verdadeiramente acolhedor e especializado para crianças autistas e
                                suas famílias. Fundado em 2021, somos uma instituição que combina
                                excelência técnica com profundo respeito pela individualidade de
                                cada criança.
                            </p>
                            <p>
                                Acreditamos que cada criança tem seu próprio ritmo, seus talentos
                                únicos e um potencial infinito. Nossa missão é proporcionar um
                                ambiente seguro, estimulante e acolhedor.
                            </p>
                            <p>
                                Com uma equipe multidisciplinar altamente qualificada e apaixonada
                                pelo que faz, oferecemos atendimento integrado em parceria com as
                                famílias.
                            </p>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-64 h-64 rounded-full bg-(--color-g100) opacity-50 -right-5 -bottom-5" />
                        <div className="relative z-[1] bg-white rounded-2xl border border-(--color-border-soft) shadow-xl overflow-hidden w-full p-6">
                            <IllusTherapy />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {FEATS.map((f, i) => (
                        <div
                            key={i}
                            className="border border-(--color-border-soft) rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                            style={{ background: f.bg }}
                        >
                            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-white text-2xl">
                                {f.ico}
                            </div>
                            <div className="text-sm font-bold mb-2">{f.title}</div>
                            <div className="text-xs text-(--color-muted) leading-relaxed">
                                {f.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
