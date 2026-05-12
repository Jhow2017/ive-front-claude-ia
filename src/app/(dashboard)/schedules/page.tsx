"use client";
import { useState } from "react";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Calendar,
    Clock,
    Users,
    Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarIlus } from "@/components/shared/avatar-ilus";

const DAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

const PROFS = [
    {
        seed: 0,
        name: "Dra. Ana Lima",
        spec: "Fonoaudiologia",
        schedule: [
            ["08:00-12:00", "14:00-18:00"],
            ["08:00-12:00", "14:00-18:00"],
            ["08:00-12:00"],
            [null, "14:00-18:00"],
            ["08:00-12:00", "14:00-18:00"],
            [null],
        ],
        turnos: 9,
        dias: 5,
    },
    {
        seed: 1,
        name: "Dr. Rafael Cunha",
        spec: "Neuropsicologia",
        schedule: [
            ["09:00-13:00"],
            ["09:00-13:00"],
            ["09:00-13:00", "15:00-19:00"],
            ["09:00-13:00"],
            ["09:00-13:00"],
            [null],
        ],
        turnos: 6,
        dias: 5,
    },
    {
        seed: 2,
        name: "Profa. Cíntia",
        spec: "Terapia Ocupacional",
        schedule: [
            ["08:00-17:00"],
            [null],
            ["08:00-17:00"],
            [null],
            ["08:00-17:00"],
            ["08:00-12:00"],
        ],
        turnos: 4,
        dias: 4,
    },
];

export default function SchedulesView() {
    const [weekOffset, setWeekOffset] = useState(0);
    const [period, setPeriod] = useState<"hoje" | "semana" | "mes">("semana");
    const [periodOpen, setPeriodOpen] = useState(false);
    const startDate = new Date(2026, 3, 27 + weekOffset * 7);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 5);
    const fmt = (d: Date) => d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

    return (
        <>
            <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                    <div className="text-[22px] font-extrabold tracking-tight">
                        Escalas de Atendimento
                    </div>
                    <div className="text-[13px] text-(--color-muted) mt-1">
                        Horários e disponibilidade da equipe
                    </div>
                </div>
                <Button>
                    <Plus size={15} /> Nova Escala
                </Button>
            </div>
            <Card>
                <CardContent className="px-5 py-3">
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2.5 flex-1">
                            <Calendar size={18} color="var(--color-g500)" />
                            <div>
                                <div className="text-sm font-bold">
                                    Semana de {fmt(startDate)} a {fmt(endDate)}
                                </div>
                                <div className="text-xs text-(--color-muted)">
                                    Escalas e horários de atendimento
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center relative">
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() => setWeekOffset((w) => w - 1)}
                            >
                                <ChevronLeft size={14} />
                            </Button>
                            <div className="relative">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPeriodOpen((o) => !o)}
                                >
                                    {period === "hoje"
                                        ? "Hoje"
                                        : period === "mes"
                                          ? "Este Mês"
                                          : "Esta Semana"}
                                    <ChevronDown size={12} />
                                </Button>
                                {periodOpen && (
                                    <div
                                        onMouseLeave={() => setPeriodOpen(false)}
                                        className="absolute top-full mt-1.5 right-0 bg-white border border-(--color-border-soft) rounded-xl shadow-lg min-w-[180px] z-[200] p-1.5"
                                    >
                                        {[
                                            ["hoje", "Hoje"],
                                            ["semana", "Esta Semana"],
                                            ["mes", "Este Mês"],
                                        ].map(([k, l]) => (
                                            <button
                                                key={k}
                                                onClick={() => {
                                                    setPeriod(k as any);
                                                    setWeekOffset(0);
                                                    setPeriodOpen(false);
                                                }}
                                                className={`flex items-center justify-between w-full px-2.5 py-2 rounded-md text-[13px] font-medium hover:bg-(--color-g50) ${
                                                    period === k
                                                        ? "bg-(--color-g50) text-(--color-g600) font-semibold"
                                                        : ""
                                                }`}
                                            >
                                                {l}
                                                {period === k && (
                                                    <Check size={13} color="var(--color-g500)" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() => setWeekOffset((w) => w + 1)}
                            >
                                <ChevronRight size={14} />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {PROFS.map((p, pi) => (
                <div
                    key={pi}
                    className="bg-white border border-(--color-border-soft) rounded-xl mb-3.5 overflow-hidden"
                >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-(--color-border-soft) gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
                            <AvatarIlus seed={p.seed} size={40} />
                            <div className="min-w-0">
                                <div className="text-sm font-bold truncate">{p.name}</div>
                                <div className="text-xs text-(--color-muted) truncate">
                                    {p.spec}
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            Editar Escala
                        </Button>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 px-5 py-4">
                        {DAYS.map((day, di) => (
                            <div key={di}>
                                <div className="text-[11px] font-semibold text-(--color-muted) uppercase tracking-wide mb-2">
                                    {day}
                                </div>
                                {p.schedule[di]?.filter(Boolean).length ? (
                                    p.schedule[di].filter(Boolean).map((shift, si) => (
                                        <div
                                            key={si}
                                            className="bg-(--color-g50) border border-(--color-g100) rounded-md px-2.5 py-1.5 text-[11px] font-semibold text-(--color-g600) flex items-center gap-1.5 mb-1"
                                        >
                                            <Clock size={11} color="var(--color-g500)" />
                                            {shift}
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-(--color-bg) border border-dashed border-(--color-border-soft) rounded-md px-2.5 py-1.5 text-[11px] text-(--color-muted) text-center">
                                        Folga
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="px-5 py-2.5 border-t border-(--color-border-soft) flex gap-5 text-xs text-(--color-muted)">
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} /> Total: {p.turnos} turnos
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Users size={12} /> Disponível em {p.dias} dias
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
