"use client";
import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/shared/logo";
import { useQueue } from "@/stores/queue";

export function PainelView() {
    const items = useQueue((s) => s.items);
    const chamando = useQueue((s) => s.chamando);
    const [time, setTime] = useState<Date | null>(null);
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {
        setTime(new Date());
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const aguardando = items.filter((i) => i.status === "aguardando");
    const ema = items.filter((i) => i.status === "em_atendimento");

    const enterFs = () => {
        setFullscreen(true);
        const el = document.getElementById("painel-tv-frame");
        if (el?.requestFullscreen) el.requestFullscreen().catch(() => {});
    };
    const exitFs = () => {
        setFullscreen(false);
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    };

    const tt = time
        ? time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
        : "--:--";
    const dd = time
        ? time.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })
        : "";

    return (
        <>
            {!fullscreen && (
                <div className="flex justify-between items-start flex-wrap gap-3">
                    <div>
                        <div className="text-[22px] font-extrabold tracking-tight">
                            Painel da TV
                        </div>
                        <div className="text-[13px] text-(--color-muted) mt-1">
                            Visualização em tempo real do painel exibido na recepção
                        </div>
                    </div>
                    <Button onClick={enterFs}>
                        <Monitor size={14} /> Abrir em tela cheia
                    </Button>
                </div>
            )}
            <div
                id="painel-tv-frame"
                className={`bg-[#0a1f12] text-white relative overflow-hidden ${
                    fullscreen ? "rounded-none p-12 min-h-screen" : "rounded-2xl p-8 min-h-[600px]"
                }`}
            >
                <div className="absolute -top-52 -right-52 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(37,154,67,.18),transparent_70%)] pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(37,154,67,.12),transparent_70%)] pointer-events-none" />

                <div className="flex justify-between items-center mb-8 relative">
                    <div className="flex items-center gap-3.5">
                        <LogoMark size={48} />
                        <div>
                            <div className="text-[22px] font-extrabold tracking-tight">
                                Instituto Verde Esperança
                            </div>
                            <div className="text-[13px] text-[#9fc4ad] capitalize">{dd}</div>
                        </div>
                    </div>
                    <div className="text-5xl font-extrabold tabular-nums text-(--color-g200)">
                        {tt}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-(--color-g600) to-(--color-g500) rounded-3xl px-12 py-10 mb-6 relative shadow-2xl">
                    <div className="text-sm font-bold tracking-[2px] uppercase text-white/85 mb-2">
                        Chamando agora
                    </div>
                    {chamando ? (
                        <>
                            <div
                                className={`font-extrabold leading-none tracking-tight mb-4 ${
                                    fullscreen ? "text-[96px]" : "text-7xl"
                                }`}
                            >
                                {chamando.name}
                            </div>
                            <div className="flex gap-8 text-xl font-semibold text-white/95 flex-wrap">
                                <div>
                                    <span className="opacity-70 text-sm uppercase tracking-widest block">
                                        Sala
                                    </span>
                                    {chamando.sala}
                                </div>
                                <div>
                                    <span className="opacity-70 text-sm uppercase tracking-widest block">
                                        Profissional
                                    </span>
                                    {chamando.prof}
                                </div>
                                <div>
                                    <span className="opacity-70 text-sm uppercase tracking-widest block">
                                        Especialidade
                                    </span>
                                    {chamando.spec}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-5xl font-bold opacity-60 py-5">
                            Aguardando próxima chamada…
                        </div>
                    )}
                </div>

                <div className="grid sm:grid-cols-[2fr_1fr] gap-6 relative">
                    <div>
                        <div className="text-[13px] font-bold text-(--color-g200) uppercase tracking-[2px] mb-3.5">
                            Próximos na fila
                        </div>
                        <div className="grid gap-2.5">
                            {aguardando.slice(0, 5).map((p, i) => (
                                <div
                                    key={p.id}
                                    className="flex items-center gap-4 bg-white/5 border border-white/[0.08] px-5 py-3.5 rounded-xl"
                                >
                                    <div className="w-9 h-9 rounded-[10px] bg-(--color-g500) flex items-center justify-center font-extrabold text-base">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 text-xl font-bold">{p.name}</div>
                                    <div className="text-sm text-[#9fc4ad]">
                                        {p.sala} · {p.prof}
                                    </div>
                                </div>
                            ))}
                            {aguardando.length === 0 && (
                                <div className="text-[#9fc4ad] py-6 text-center">
                                    Sem pacientes aguardando
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="text-[13px] font-bold text-(--color-g200) uppercase tracking-[2px] mb-3.5">
                            Em atendimento
                        </div>
                        <div className="grid gap-2.5">
                            {ema.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-white/5 border border-white/[0.08] px-4 py-3 rounded-xl"
                                >
                                    <div className="text-base font-bold">{p.name}</div>
                                    <div className="text-xs text-[#9fc4ad] mt-0.5">
                                        {p.sala} · {p.prof}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {fullscreen && (
                    <button
                        onClick={exitFs}
                        className="absolute top-5 right-5 bg-white/10 text-white border border-white/20 px-3.5 py-2 rounded-lg text-[13px] font-semibold cursor-pointer"
                    >
                        Sair da tela cheia
                    </button>
                )}
            </div>
        </>
    );
}
