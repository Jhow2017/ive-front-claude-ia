"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { AvatarIlus } from "@/components/shared/avatar-ilus";

interface Consulta {
    day: string;
    mon: string;
    time: string;
    title: string;
    type: string;
    paciente: { seed: number; name: string };
    prof: { seed: number; name: string };
    status: "Concluída" | "Confirmada" | "Cancelada" | "Faltou";
    obs: string;
}

const CONSULTAS: Consulta[] = [
    {
        day: "29",
        mon: "ABR",
        time: "14:00",
        title: "Sessão de Fonoaudiologia",
        type: "Rotina",
        paciente: { seed: 0, name: "Lucas Costa" },
        prof: { seed: 1, name: "Dra. Ana Lima" },
        status: "Confirmada",
        obs: "Boas respostas ao protocolo de nomeação. Exercício para casa enviado.",
    },
    {
        day: "28",
        mon: "ABR",
        time: "10:30",
        title: "Terapia Ocupacional",
        type: "Rotina",
        paciente: { seed: 2, name: "Maria Oliveira" },
        prof: { seed: 2, name: "Profa. Cíntia" },
        status: "Concluída",
        obs: "Trabalho de integração sensorial. Boa tolerância ao toque.",
    },
    {
        day: "25",
        mon: "ABR",
        time: "09:00",
        title: "Avaliação Neuropsicológica",
        type: "Avaliação",
        paciente: { seed: 3, name: "Pedro Santos" },
        prof: { seed: 3, name: "Dr. Rafael Cunha" },
        status: "Concluída",
        obs: "Reavaliação cognitiva — relatório gerado.",
    },
    {
        day: "22",
        mon: "ABR",
        time: "15:00",
        title: "Sessão de Psicologia",
        type: "Retorno",
        paciente: { seed: 4, name: "Ana Costa Lima" },
        prof: { seed: 4, name: "Dra. Mariana Souza" },
        status: "Faltou",
        obs: "Paciente não compareceu. Contato realizado pela equipe.",
    },
    {
        day: "20",
        mon: "ABR",
        time: "11:00",
        title: "Terapia Ocupacional",
        type: "Rotina",
        paciente: { seed: 0, name: "Lucas Costa" },
        prof: { seed: 2, name: "Profa. Cíntia" },
        status: "Cancelada",
        obs: "Cancelado pela família. Reagendamento realizado.",
    },
];

const STATUS_VAR: Record<Consulta["status"], "green" | "blue" | "red" | "yellow"> = {
    Concluída: "green",
    Confirmada: "blue",
    Cancelada: "red",
    Faltou: "yellow",
};

export function HistoricoView() {
    const [period, setPeriod] = useState<"hoje" | "semana" | "mes">("semana");
    const [search, setSearch] = useState("");
    const [sel, setSel] = useState<Consulta | null>(null);

    const stats = {
        total: CONSULTAS.length,
        concluidas: CONSULTAS.filter((c) => c.status === "Concluída").length,
        canceladas: CONSULTAS.filter((c) => c.status === "Cancelada").length,
        faltaram: CONSULTAS.filter((c) => c.status === "Faltou").length,
    };

    return (
        <>
            <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                    <div className="text-[22px] font-extrabold tracking-tight">
                        Histórico de Consultas
                    </div>
                    <div className="text-[13px] text-(--color-muted) mt-1">
                        Consultas realizadas, canceladas e faltas
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <div className="flex gap-0.5 bg-(--color-bg) rounded-[9px] p-1">
                        {(["hoje", "semana", "mes"] as const).map((k) => (
                            <button
                                key={k}
                                onClick={() => setPeriod(k)}
                                className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                                    period === k
                                        ? "bg-white text-(--color-text) font-semibold shadow-sm"
                                        : "text-(--color-muted)"
                                }`}
                            >
                                {k === "hoje" ? "Hoje" : k === "semana" ? "Semana" : "Mês"}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 bg-(--color-bg) border border-(--color-border-soft) rounded-lg px-3 py-1.5">
                        <Search size={13} color="var(--color-muted)" />
                        <input
                            placeholder="Buscar paciente ou profissional..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent outline-none text-[13px] w-44"
                        />
                    </div>
                </div>
            </div>

            <Card>
                <CardContent className="px-5 py-3">
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2 flex-1">
                            <Calendar size={18} color="var(--color-g500)" />
                            <div>
                                <div className="text-[13px] font-bold">Período: Esta Semana</div>
                                <div className="text-xs text-(--color-muted)">
                                    {stats.total} consultas encontradas
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { l: "Total", v: stats.total, c: "" },
                    { l: "Concluídas", v: stats.concluidas, c: "text-(--color-g500)" },
                    { l: "Canceladas", v: stats.canceladas, c: "text-(--color-danger)" },
                    { l: "Faltaram", v: stats.faltaram, c: "text-(--color-warn)" },
                ].map((m, i) => (
                    <div
                        key={i}
                        className="bg-white border border-(--color-border-soft) rounded-xl p-4"
                    >
                        <div className="text-[11px] font-semibold text-(--color-muted) uppercase tracking-wide mb-1.5">
                            {m.l}
                        </div>
                        <div className={`text-[26px] font-extrabold tracking-tight ${m.c}`}>
                            {m.v}
                        </div>
                    </div>
                ))}
            </div>

            {CONSULTAS.map((c, i) => (
                <div
                    key={i}
                    className="bg-white border border-(--color-border-soft) rounded-xl mb-2.5 overflow-hidden hover:shadow-md transition-shadow"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-[72px_1fr] gap-4 p-5">
                        <div className="bg-(--color-g50) rounded-[10px] p-2.5 text-center shrink-0 w-fit">
                            <div className="text-[22px] font-extrabold text-(--color-g600) leading-none">
                                {c.day}
                            </div>
                            <div className="text-[10px] font-semibold text-(--color-muted) uppercase mt-0.5 tracking-wide">
                                {c.mon}
                            </div>
                            <div className="text-xs text-(--color-muted) mt-1">{c.time}</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <div className="text-sm font-bold">{c.title}</div>
                                <Badge variant="gray">{c.type}</Badge>
                                <Badge variant={STATUS_VAR[c.status]}>{c.status}</Badge>
                            </div>
                            <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                                <div className="flex items-center gap-1.5 text-xs text-(--color-muted)">
                                    <AvatarIlus seed={c.paciente.seed} size={22} />
                                    {c.paciente.name}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-(--color-g500)">
                                    <AvatarIlus seed={c.prof.seed} size={22} />
                                    {c.prof.name}
                                </div>
                            </div>
                            {c.obs && (
                                <div>
                                    <div className="text-[10px] font-semibold text-(--color-muted) uppercase tracking-wide mb-1">
                                        Observações
                                    </div>
                                    <div className="text-[13px] text-(--color-muted) bg-(--color-bg) rounded-md px-3 py-2">
                                        {c.obs}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="border-t border-(--color-border-soft) px-5 py-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSel(c)}>
                            Ver Detalhes
                        </Button>
                        <Link href="/prontuarios">
                            <Button size="sm">
                                <FileText size={13} /> Ver Prontuário
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}

            <Dialog open={!!sel} onClose={() => setSel(null)}>
                {sel && (
                    <>
                        <DialogHeader
                            title={sel.title}
                            sub={`${sel.day} ${sel.mon} · ${sel.time}`}
                            onClose={() => setSel(null)}
                        />
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center p-3 bg-(--color-bg) rounded-[10px]">
                                <AvatarIlus seed={sel.paciente.seed} size={42} />
                                <div>
                                    <div className="text-[11px] text-(--color-muted)">Paciente</div>
                                    <div className="text-sm font-bold">{sel.paciente.name}</div>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center p-3 bg-(--color-bg) rounded-[10px]">
                                <AvatarIlus seed={sel.prof.seed} size={42} />
                                <div>
                                    <div className="text-[11px] text-(--color-muted)">
                                        Profissional
                                    </div>
                                    <div className="text-sm font-bold">{sel.prof.name}</div>
                                </div>
                            </div>
                            <div>
                                <div className="text-[11px] text-(--color-muted) mb-1.5 font-semibold">
                                    OBSERVAÇÕES
                                </div>
                                <div className="text-[13px] bg-(--color-bg) rounded-lg p-3 leading-relaxed">
                                    {sel.obs}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setSel(null)}>
                                Fechar
                            </Button>
                            <Link href="/prontuarios">
                                <Button onClick={() => setSel(null)}>
                                    <FileText size={13} /> Ver Prontuário
                                </Button>
                            </Link>
                        </DialogFooter>
                    </>
                )}
            </Dialog>
        </>
    );
}
