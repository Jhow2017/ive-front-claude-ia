import { Button } from "@/components/ui/button";

const PARTNERS = [
    { name: "Clínica Vida", color: "#259a43" },
    { name: "SaúdePlus", color: "#3b82f6" },
    { name: "NeuroCare", color: "#7c3aed" },
    { name: "FonoBrasil", color: "#ea580c" },
    { name: "E.M. Prof. Pinheiro", color: "#0891b2" },
    { name: "Instituto Avançar", color: "#059669" },
    { name: "Unimed SP", color: "#16a34a" },
    { name: "ABAutismo", color: "#dc2626" },
    { name: "Hapvida", color: "#2563eb" },
    { name: "Prefeitura SP", color: "#374151" },
];

function Logo({ name, color }: { name: string; color: string }) {
    return (
        <svg width="130" height="52" viewBox="0 0 130 52">
            <text
                x="65"
                y="24"
                fontSize="11"
                fontWeight="600"
                fill={color}
                textAnchor="middle"
                opacity=".6"
                fontFamily="Plus Jakarta Sans, sans-serif"
            >
                PARCEIRO
            </text>
            <text
                x="65"
                y="38"
                fontSize="15"
                fontWeight="800"
                fill={color}
                textAnchor="middle"
                fontFamily="Plus Jakarta Sans, sans-serif"
            >
                {name}
            </text>
        </svg>
    );
}

export function Parceiros() {
    const items = [...PARTNERS, ...PARTNERS];
    return (
        <section className="py-24 bg-white" id="parceiros">
            <div className="wrap">
                <div className="text-center max-w-md mx-auto">
                    <div className="text-[11px] font-bold text-(--color-g500) tracking-[1.2px] uppercase mb-2.5">
                        Parceiros
                    </div>
                    <h2 className="text-[38px] font-extrabold tracking-tight leading-[1.18] mb-4">
                        Quem caminha com a gente
                    </h2>
                    <p className="text-base text-(--color-muted) leading-relaxed">
                        Clínicas, escolas, planos de saúde e organizações que compartilham o
                        compromisso com o desenvolvimento de crianças autistas.
                    </p>
                </div>
            </div>
            <div className="overflow-hidden relative mt-14 [mask-image:linear-gradient(to_right,transparent,black_120px,black_calc(100%-120px),transparent)]">
                <div className="flex animate-marquee w-max">
                    {items.map((p, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-center px-10 shrink-0 h-[88px]"
                        >
                            <div className="opacity-55 hover:opacity-100 grayscale-[40%] hover:grayscale-0 transition-all">
                                <Logo {...p} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="wrap">
                <div className="text-center mt-10 px-8 py-7 bg-(--color-g50) border border-(--color-g100) rounded-2xl">
                    <div className="text-sm font-semibold text-(--color-g700) mb-1">
                        Quer ser parceiro do Instituto?
                    </div>
                    <div className="text-[13px] text-(--color-muted) mb-4">
                        Trabalhamos com clínicas, escolas e organizações que compartilham nossos
                        valores.
                    </div>
                    <Button variant="outline" className="border-(--color-g500) text-(--color-g500)">
                        Entrar em contato
                    </Button>
                </div>
            </div>
        </section>
    );
}
