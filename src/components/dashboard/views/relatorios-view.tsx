import { FileText, Activity, BarChart3, Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const REPORTS = [
  { Ic: FileText, title: "Relatório Semestral · Fonoaudiologia", meta: "Dra. Ana Lima · Abr 2026", badge: "Novo", v: "green" as const },
  { Ic: Activity, title: "Avaliação Neuropsicológica", meta: "Dr. Rafael Cunha · Abr 2026", badge: "Novo", v: "green" as const },
  { Ic: FileText, title: "Evolução — Terapia Ocupacional", meta: "Profa. Cíntia · Mar 2026", badge: "Lido", v: "gray" as const },
  { Ic: BarChart3, title: "Relatório de Progresso Geral", meta: "Equipe · Fev 2026", badge: "Lido", v: "gray" as const },
  { Ic: FileText, title: "Plano Terapêutico 2025", meta: "Equipe · Jan 2025", badge: "Lido", v: "gray" as const },
  { Ic: Eye, title: "Relatório de Avaliação Inicial", meta: "Equipe · Dez 2024", badge: "Lido", v: "gray" as const },
];

export function RelatoriosView() {
  return (
    <>
      <div>
        <div className="text-[22px] font-extrabold tracking-tight">Relatórios</div>
        <div className="text-[13px] text-(--color-muted) mt-1">Documentos clínicos e avaliações</div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {REPORTS.map((r, i) => (
          <div
            key={i}
            className="bg-white border border-(--color-border-soft) rounded-xl p-5 cursor-pointer hover:border-(--color-g500) transition-colors"
          >
            <div className="w-10 h-10 rounded-[10px] bg-(--color-g50) flex items-center justify-center mb-3">
              <r.Ic size={20} color="var(--color-g500)" />
            </div>
            <div className="flex justify-between items-start gap-2 mb-1">
              <div className="text-[13px] font-bold">{r.title}</div>
              <Badge variant={r.v} className="shrink-0">
                {r.badge}
              </Badge>
            </div>
            <div className="text-[11px] text-(--color-muted) mb-3">{r.meta}</div>
            <Button variant="outline" size="xs">
              <Upload size={12} /> Baixar
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
