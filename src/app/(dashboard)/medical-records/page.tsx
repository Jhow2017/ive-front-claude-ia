import { Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DADOS: [string, string][] = [
    ["Nome completo", "Lucas Costa"],
    ["Data de nascimento", "12/03/2020 · 6 anos"],
    ["Responsável", "Família Costa"],
    ["Escola", "E.M. Prof. João Pinheiro"],
    ["Plano de saúde", "Não (particular)"],
    ["Início do atendimento", "Janeiro de 2025"],
];
const DIAGS = [
    "F84.0 — Autismo Infantil",
    "F90.0 — Hiperatividade",
    "F80.1 — Transtorno Expressivo da Linguagem",
];
const PLANO: [string, string][] = [
    ["Período", "Jan 2025 – Jun 2025"],
    ["Fonoaudiologia", "2× / semana"],
    ["Terapia Ocupacional", "2× / semana"],
    ["Psicologia", "1× / semana"],
    ["Neuropsicologia", "Avaliação a cada 3 meses"],
];

export default function MedicalRecordsView() {
    return (
        <>
            <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                    <div className="text-[22px] font-extrabold tracking-tight">Prontuários</div>
                    <div className="text-[13px] text-(--color-muted) mt-1">
                        Lucas Costa · CID F84.0
                    </div>
                </div>
                <Button variant="outline" size="sm">
                    <Upload size={13} /> Exportar PDF
                </Button>
            </div>
            <div className="grid lg:grid-cols-2 gap-3.5">
                <Card>
                    <CardContent>
                        <CardHeader>
                            <CardTitle>Dados do paciente</CardTitle>
                        </CardHeader>
                        {DADOS.map(([k, v], i) => (
                            <div
                                key={i}
                                className={`flex justify-between py-2.5 text-[13px] ${
                                    i < DADOS.length - 1
                                        ? "border-b border-(--color-border-soft)"
                                        : ""
                                }`}
                            >
                                <span className="text-(--color-muted) font-medium">{k}</span>
                                <span className="font-semibold text-right">{v}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <div className="flex flex-col gap-3.5">
                    <Card>
                        <CardContent>
                            <CardHeader>
                                <CardTitle>Diagnósticos</CardTitle>
                            </CardHeader>
                            <div className="flex flex-wrap gap-1.5">
                                {DIAGS.map((d, i) => (
                                    <div
                                        key={i}
                                        className="inline-flex items-center gap-1.5 bg-(--color-g50) border border-(--color-g100) text-(--color-g700) text-xs font-semibold px-3 py-1.5 rounded-full"
                                    >
                                        <Check size={11} color="var(--color-g600)" /> {d}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <CardHeader>
                                <CardTitle>Plano terapêutico atual</CardTitle>
                                <Badge>Ativo</Badge>
                            </CardHeader>
                            {PLANO.map(([k, v], i) => (
                                <div
                                    key={i}
                                    className={`flex justify-between py-2.5 text-[13px] ${
                                        i < PLANO.length - 1
                                            ? "border-b border-(--color-border-soft)"
                                            : ""
                                    }`}
                                >
                                    <span className="text-(--color-muted)">{k}</span>
                                    <span className="font-semibold">{v}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
