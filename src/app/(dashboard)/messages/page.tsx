"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AvatarIlus } from "@/components/shared/avatar-ilus";

interface Msg {
    from: "in" | "out";
    text: string;
    time: string;
}

const THREADS = [
    {
        seed: 0,
        n: "Dra. Ana Lima",
        r: "Fonoaudióloga",
        p: "Que ótima notícia!...",
        t: "09:30",
        unread: 0,
    },
    {
        seed: 1,
        n: "Profa. Cíntia",
        r: "Terapeuta Ocup.",
        p: "Confirmar presença na quinta.",
        t: "Ontem",
        unread: 1,
    },
    {
        seed: 2,
        n: "Dr. Rafael Cunha",
        r: "Neuropsicólogo",
        p: "Reavaliação marcada para 15/05.",
        t: "Sex",
        unread: 1,
    },
];

export default function MessagesView() {
    const [active, setActive] = useState(0);
    const [msg, setMsg] = useState("");
    const [msgs, setMsgs] = useState<Msg[]>([
        {
            from: "in",
            text: "Bom dia! Queria perguntar sobre a atividade de casa. O Lucas tentou mas ficou agitado no meio.",
            time: "08:42",
        },
        {
            from: "out",
            text: "Bom dia! Normal ele ficar agitado nas primeiras vezes. Se sair, espere 2 minutos e chame de volta com calma.",
            time: "09:15",
        },
        {
            from: "in",
            text: "Entendido! Ele tá bem melhor na nomeação — ontem nomeou 5 brinquedos sem eu apontar.",
            time: "09:22",
        },
        {
            from: "out",
            text: "Que ótima notícia! Isso é exatamente o que estávamos trabalhando. Continua com a rotina de 10 min por dia.",
            time: "09:30",
        },
    ]);

    const send = () => {
        if (!msg.trim()) return;
        setMsgs((m) => [...m, { from: "in", text: msg.trim(), time: "agora" }]);
        setMsg("");
    };

    return (
        <>
            <div>
                <div className="text-[22px] font-extrabold tracking-tight">Mensagens</div>
                <div className="text-[13px] text-(--color-muted) mt-1">
                    Comunicação direta com a equipe
                </div>
            </div>
            <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] h-[480px]">
                    <div className="border-r border-(--color-border-soft) overflow-y-auto hidden md:block">
                        {THREADS.map((t, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`w-full text-left px-4 py-3 cursor-pointer border-b border-(--color-border-soft) hover:bg-(--color-g50) ${
                                    active === i ? "bg-(--color-g50)" : ""
                                }`}
                            >
                                <div className="flex justify-between items-center mb-0.5">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[13px] font-semibold">{t.n}</span>
                                        {t.unread > 0 && (
                                            <span className="bg-(--color-g500) text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                                {t.unread}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[11px] text-(--color-muted)">{t.t}</span>
                                </div>
                                <div className="text-xs text-(--color-muted) truncate">
                                    {t.r} · {t.p}
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <div className="px-4 py-3.5 border-b border-(--color-border-soft) flex items-center gap-2.5">
                            <AvatarIlus seed={THREADS[active].seed} size={34} />
                            <div>
                                <div className="text-sm font-bold">{THREADS[active].n}</div>
                                <div className="text-[11px] text-(--color-muted)">
                                    {THREADS[active].r}
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4 py-3.5 flex flex-col gap-2.5 max-h-[340px]">
                            {msgs.map((m, i) => (
                                <div
                                    key={i}
                                    style={{
                                        alignSelf: m.from === "out" ? "flex-end" : "flex-start",
                                        maxWidth: "70%",
                                    }}
                                >
                                    <div
                                        className={`px-3.5 py-2 rounded-xl text-[13px] leading-relaxed ${
                                            m.from === "in"
                                                ? "bg-(--color-bg) border border-(--color-border-soft) rounded-bl-[4px]"
                                                : "bg-(--color-g500) text-white rounded-br-[4px]"
                                        }`}
                                    >
                                        {m.text}
                                    </div>
                                    <div
                                        className={`text-[10px] mt-0.5 ${m.from === "out" ? "text-(--color-muted) text-right" : "text-(--color-muted)"}`}
                                    >
                                        {m.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-3.5 py-2.5 border-t border-(--color-border-soft) flex gap-2">
                            <input
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && send()}
                                placeholder="Escreva uma mensagem..."
                                className="flex-1 px-3 py-2 border border-(--color-border-soft) rounded-lg text-[13px] outline-none focus:border-(--color-g500)"
                            />
                            <Button onClick={send} size="sm">
                                <Send size={14} />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
}
