"use client";
import { useState } from "react";
import Image from "next/image";
import { CheckCircle, Volume2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueue } from "@/stores/queue";

export function AtendimentoView() {
    const items = useQueue((s) => s.items);
    const chamar = useQueue((s) => s.chamar);
    const finalizar = useQueue((s) => s.finalizar);
    const [autoNext, setAutoNext] = useState(true);

    const meus = items.filter((i) => i.prof === "Dra. Renata Lima");
    const aguardando = meus.filter((i) => i.status === "aguardando");
    const emAtend = meus.find((i) => i.status === "em_atendimento");
    const concluidos = meus.filter((i) => i.status === "concluido");

    const chamarProx = () => aguardando[0] && chamar(aguardando[0].id);

    return (
        <>
            <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                    <div className="text-[22px] font-extrabold tracking-tight">Meu Atendimento</div>
                    <div className="text-[13px] text-(--color-muted) mt-1">
                        Controle da fila de pacientes que chegaram para sessão
                    </div>
                </div>
                <label className="flex items-center gap-2 bg-white border border-(--color-border-soft) px-3 py-2 rounded-lg cursor-pointer text-[13px] font-semibold">
                    <input
                        type="checkbox"
                        checked={autoNext}
                        onChange={(e) => setAutoNext(e.target.checked)}
                    />
                    Chamar próximo automaticamente ao finalizar
                </label>
            </div>

            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-3.5">
                <Card
                    style={{
                        background: emAtend
                            ? "linear-gradient(135deg, var(--color-g50), #fff)"
                            : "#fff",
                        borderColor: emAtend ? "var(--color-g200)" : "var(--color-border-soft)",
                    }}
                >
                    <CardContent>
                        <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-(--color-g700) mb-3">
                            Em atendimento
                        </div>
                        {emAtend ? (
                            <div>
                                <div className="flex items-center gap-3.5 mb-5">
                                    <Image
                                        src={`https://i.pravatar.cc/64?img=${emAtend.seed + 10}`}
                                        width={64}
                                        height={64}
                                        alt=""
                                        className="rounded-full"
                                    />
                                    <div>
                                        <div className="text-[22px] font-extrabold">
                                            {emAtend.name}
                                        </div>
                                        <div className="text-[13px] text-(--color-muted) mt-0.5">
                                            {emAtend.sala} · Sessão de {emAtend.spec}
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    className="w-full py-3.5 text-[15px]"
                                    onClick={() => finalizar(autoNext)}
                                >
                                    <CheckCircle size={16} />
                                    Finalizar sessão
                                    {autoNext &&
                                        aguardando.length > 0 &&
                                        ` e chamar ${aguardando[0].name.split(" ")[0]}`}
                                </Button>
                            </div>
                        ) : (
                            <div className="py-6 text-center text-(--color-muted)">
                                <div className="text-sm mb-3.5">Nenhum paciente em atendimento</div>
                                <Button disabled={aguardando.length === 0} onClick={chamarProx}>
                                    <Play size={14} /> Chamar próximo
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div className="text-[11px] font-bold uppercase tracking-[1.5px] text-(--color-muted) mb-3">
                            Resumo do dia
                        </div>
                        <div className="grid gap-2.5">
                            <div className="flex justify-between text-sm">
                                <span className="text-(--color-muted)">Concluídos</span>
                                <span className="font-bold">{concluidos.length}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-(--color-muted)">Aguardando</span>
                                <span className="font-bold">{aguardando.length}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-(--color-muted)">Total agendado</span>
                                <span className="font-bold">{meus.length}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent>
                    <CardHeader>
                        <CardTitle>Fila de pacientes (ordem de chegada)</CardTitle>
                    </CardHeader>
                    <div className="grid gap-2">
                        {aguardando.map((p, i) => (
                            <div
                                key={p.id}
                                className={`flex items-center gap-3.5 px-3.5 py-3 border border-(--color-border-soft) rounded-[10px] ${
                                    i === 0 ? "bg-(--color-g50)" : ""
                                }`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[13px] ${
                                        i === 0 ? "bg-(--color-g500) text-white" : "bg-(--color-bg)"
                                    }`}
                                >
                                    {i + 1}
                                </div>
                                <Image
                                    src={`https://i.pravatar.cc/40?img=${p.seed + 10}`}
                                    width={40}
                                    height={40}
                                    alt=""
                                    className="rounded-full"
                                />
                                <div className="flex-1">
                                    <div className="text-sm font-bold">{p.name}</div>
                                    <div className="text-xs text-(--color-muted)">
                                        Hora marcada {p.hora} · Chegou {p.chegada}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => chamar(p.id)}
                                    disabled={!!emAtend}
                                >
                                    <Volume2 size={13} /> Chamar
                                </Button>
                            </div>
                        ))}
                        {aguardando.length === 0 && (
                            <div className="text-center text-(--color-muted) py-6 text-[13px]">
                                Sem pacientes aguardando.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
