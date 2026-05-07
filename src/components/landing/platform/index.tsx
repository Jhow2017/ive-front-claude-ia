import {
    BarChart3,
    Calendar,
    MessageSquare,
    FileText,
    ArrowRight,
    Bell,
    Settings,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FEATURES = [
    {
        Ic: BarChart3,
        t: "Evolução por área",
        d: "Relatórios mensais com metas e progressos por especialidade.",
    },
    { Ic: Calendar, t: "Agenda integrada", d: "Sessões, confirmações e histórico centralizados." },
    {
        Ic: MessageSquare,
        t: "Canal com a equipe",
        d: "Fale diretamente com os profissionais, sem intermediários.",
    },
    {
        Ic: FileText,
        t: "Prontuário acessível",
        d: "Diagnósticos, plano terapêutico e observações de sessão.",
    },
];

const NAV = [
    ["Principal", "Início", "Agenda", "Evolução"],
    ["Paciente", "Prontuário", "Mensagens"],
];

const BARS = [30, 42, 35, 55, 48, 65, 58, 72, 62, 80, 70, 88];

export function PlatformSection() {
    const W = 280,
        H = 56,
        P = 4;
    const pts = BARS.map((b, i) => ({
        x: P + (i * (W - 2 * P)) / 11,
        y: H - P - (b / 100) * (H - 2 * P),
    }));
    const line = "M " + pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ");
    const area = `${line} L ${pts[11].x.toFixed(1)},${H} L ${pts[0].x.toFixed(1)},${H} Z`;

    return (
        <section className="bg-[#0e1810] py-24" id="plataforma">
            <div className="wrap">
                <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-center">
                    <div>
                        <div className="text-[11px] font-bold text-(--color-g500) tracking-[1.2px] uppercase mb-2.5">
                            A plataforma
                        </div>
                        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Tudo sobre o tratamento do seu filho, acessível e organizado.
                        </h2>
                        <p className="text-[15px] text-white/50 leading-relaxed mb-9">
                            Uma área exclusiva para pais e responsáveis — onde o processo é visível,
                            não apenas relatado uma vez por mês.
                        </p>
                        <div className="flex flex-col gap-4 mb-8">
                            {FEATURES.map((f, i) => (
                                <div key={i} className="flex gap-3.5 items-start">
                                    <div className="w-8 h-8 rounded-lg bg-(--color-g500)/15 flex items-center justify-center shrink-0">
                                        <f.Ic size={15} color="var(--color-g500)" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-white mb-0.5">
                                            {f.t}
                                        </h4>
                                        <p className="text-[13px] text-white/45 leading-snug">
                                            {f.d}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href="/login">
                            <Button size="lg">
                                Acessar a plataforma <ArrowRight size={15} />
                            </Button>
                        </Link>
                    </div>

                    {/* Dashboard preview */}
                    <div className="bg-[#131f14] rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl">
                        <div className="bg-[#0b130c] px-4 py-3.5 flex items-center justify-between border-b border-white/[0.06]">
                            <span className="text-[11px] text-white/35 font-medium">
                                Área da família › <b className="text-white/70">Visão geral</b>
                            </span>
                            <div className="flex gap-1.5">
                                <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center">
                                    <Bell size={11} color="rgba(255,255,255,.35)" />
                                </div>
                                <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center">
                                    <Settings size={11} color="rgba(255,255,255,.35)" />
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[168px] bg-[#0b130c] py-3.5 px-3 border-r border-white/5 shrink-0">
                                {NAV.map((g, gi) => (
                                    <div key={gi}>
                                        <div className="text-[9px] font-bold text-white/25 tracking-widest uppercase px-2 mb-1 mt-3 first:mt-0">
                                            {g[0]}
                                        </div>
                                        {g.slice(1).map((item, ii) => (
                                            <div
                                                key={item}
                                                className={`flex items-center gap-2 px-2 py-1.5 rounded-md mb-px ${
                                                    gi === 0 && ii === 0
                                                        ? "bg-(--color-g500)/15"
                                                        : ""
                                                }`}
                                            >
                                                <div
                                                    className={`w-1 h-1 rounded-full shrink-0 ${
                                                        gi === 0 && ii === 0
                                                            ? "bg-(--color-g500)"
                                                            : "bg-white/20"
                                                    }`}
                                                />
                                                <span
                                                    className={`text-[11px] ${
                                                        gi === 0 && ii === 0
                                                            ? "text-white/85 font-medium"
                                                            : "text-white/30"
                                                    }`}
                                                >
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="flex-1 p-4 overflow-hidden min-w-0">
                                <div className="text-xs font-bold text-white/80 mb-3">
                                    Lucas Costa · 6 anos
                                </div>
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    {[
                                        { l: "Próxima sessão", v: "Ter 29/04", d: "Confirmada" },
                                        { l: "Sessões/mês", v: "8", d: "+2 vs. anterior" },
                                        { l: "Áreas ativas", v: "3", d: "Atualizado" },
                                    ].map((m, i) => (
                                        <div
                                            key={i}
                                            className="bg-[#1a2419] border border-white/5 rounded-lg p-3"
                                        >
                                            <div className="text-[9px] text-white/35 uppercase tracking-wide mb-0.5">
                                                {m.l}
                                            </div>
                                            <div className="text-[15px] font-bold text-white">
                                                {m.v}
                                            </div>
                                            <div className="text-[9px] text-(--color-g500) mt-px font-medium">
                                                {m.d}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-[#1a2419] border border-white/5 rounded-lg p-3 mb-3">
                                    <div className="text-[9px] text-white/35 uppercase tracking-wide mb-2.5">
                                        Frequência · 12 meses
                                    </div>
                                    <svg
                                        viewBox={`0 0 ${W} ${H}`}
                                        className="w-full block"
                                        style={{ height: H }}
                                    >
                                        <defs>
                                            <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
                                                <stop
                                                    offset="0%"
                                                    stopColor="#259a43"
                                                    stopOpacity=".25"
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#259a43"
                                                    stopOpacity="0"
                                                />
                                            </linearGradient>
                                        </defs>
                                        <path d={area} fill="url(#cg2)" />
                                        <path
                                            d={line}
                                            fill="none"
                                            stroke="#259a43"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <circle
                                            cx={pts[11].x}
                                            cy={pts[11].y}
                                            r="3"
                                            fill="#259a43"
                                        />
                                    </svg>
                                </div>
                                <div className="bg-[#1a2419] border border-white/5 rounded-lg p-3">
                                    <div className="text-[9px] text-white/30 uppercase tracking-wide mb-2">
                                        Próximas sessões
                                    </div>
                                    {[
                                        {
                                            n: "Fonoaudiologia",
                                            t: "Ter 29/04 · 14h00",
                                            b: "Confirmada",
                                        },
                                        {
                                            n: "Terapia Ocup.",
                                            t: "Qui 01/05 · 10h30",
                                            b: "Pendente",
                                        },
                                    ].map((r, i) => (
                                        <div
                                            key={i}
                                            className={`flex justify-between items-center py-2 ${i < 1 ? "border-b border-white/5" : ""}`}
                                        >
                                            <div>
                                                <div className="text-[11px] font-medium text-white/70">
                                                    {r.n}
                                                </div>
                                                <div className="text-[9px] text-white/25">
                                                    {r.t}
                                                </div>
                                            </div>
                                            <div className="bg-(--color-g500)/20 text-(--color-g500) text-[9px] font-semibold px-2 py-0.5 rounded-full">
                                                {r.b}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
