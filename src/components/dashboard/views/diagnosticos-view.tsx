"use client";
import { useState } from "react";
import { Filter, AlertCircle, User, Calendar, Clock, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarIlus } from "@/components/shared/avatar-ilus";

const PENDENTES = [
  { prio: "Alta", paciente: { seed: 0, name: "Lucas Costa" }, tipo: "Neurológico", prof: "Dr. Rafael Cunha", data: "24/04/2026", espera: "2 dias", sintomas: "Dificuldade de concentração, hiperatividade intensa" },
  { prio: "Média", paciente: { seed: 2, name: "Pedro Santos" }, tipo: "Comportamental", prof: "Dra. Mariana Souza", data: "22/04/2026", espera: "4 dias", sintomas: "Resistência a mudanças de rotina, irritabilidade" },
  { prio: "Baixa", paciente: { seed: 3, name: "Ana Costa Lima" }, tipo: "Fonoaudiológico", prof: "Dra. Ana Lima", data: "20/04/2026", espera: "6 dias", sintomas: "Atraso no desenvolvimento da linguagem" },
];
const CONCLUIDOS = [
  { paciente: { seed: 1, name: "Maria Oliveira" }, tipo: "Ocupacional", prof: "Profa. Cíntia", data: "15/04/2026", cid: "F84.0", desc: "Autismo Infantil — Integração sensorial prejudicada" },
  { paciente: { seed: 4, name: "Beatriz Almeida" }, tipo: "Neurológico", prof: "Dr. Rafael Cunha", data: "10/04/2026", cid: "F90.0", desc: "Hiperatividade — Plano de intervenção definido" },
];

const PRIO_COLOR = {
  Alta: { border: "#fecaca", left: "var(--color-danger)", text: "var(--color-danger)" },
  Média: { border: "#fed7aa", left: "var(--color-warn)", text: "var(--color-warn)" },
  Baixa: { border: "var(--color-g100)", left: "var(--color-g500)", text: "var(--color-g500)" },
};

export function DiagnosticosView() {
  const [tab, setTab] = useState<"pendentes" | "concluidos">("pendentes");
  return (
    <>
      <div>
        <div className="text-[22px] font-extrabold tracking-tight">Diagnósticos</div>
        <div className="text-[13px] text-(--color-muted) mt-1">Avaliações clínicas e laudos</div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l: "Total Pendente", v: PENDENTES.length, c: "" },
          { l: "Prioridade Alta", v: PENDENTES.filter((p) => p.prio === "Alta").length, c: "text-(--color-danger)" },
          { l: "Prioridade Média", v: PENDENTES.filter((p) => p.prio === "Média").length, c: "text-(--color-warn)" },
          { l: "Prioridade Baixa", v: PENDENTES.filter((p) => p.prio === "Baixa").length, c: "text-(--color-g500)" },
        ].map((m, i) => (
          <div key={i} className="bg-white border border-(--color-border-soft) rounded-xl p-4">
            <div className="text-[11px] font-semibold text-(--color-muted) uppercase tracking-wide mb-1.5">
              {m.l}
            </div>
            <div className={`text-[26px] font-extrabold tracking-tight ${m.c}`}>{m.v}</div>
          </div>
        ))}
      </div>

      <Card>
        <div className="px-5 py-3.5 border-b border-(--color-border-soft) flex items-center justify-between gap-3 flex-wrap">
          <div className="flex gap-0.5 bg-(--color-bg) rounded-[9px] p-1">
            {(["pendentes", "concluidos"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-all whitespace-nowrap ${
                  tab === k ? "bg-white text-(--color-text) font-semibold shadow-sm" : "text-(--color-muted)"
                }`}
              >
                {k === "pendentes" ? `Pendentes (${PENDENTES.length})` : `Concluídos (${CONCLUIDOS.length})`}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Filter size={13} /> Filtrar
          </Button>
        </div>
        <CardContent className="p-3.5">
          {tab === "pendentes" &&
            PENDENTES.map((d, i) => {
              const c = PRIO_COLOR[d.prio as keyof typeof PRIO_COLOR];
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl mb-2.5 overflow-hidden hover:shadow-md transition-shadow border-l-4"
                  style={{ borderColor: c.border, borderLeftColor: c.left }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[64px_1fr] gap-4 p-5">
                    <div
                      className="w-13 h-13 rounded-[10px] flex flex-col items-center justify-center shrink-0 text-[10px] font-bold gap-0.5"
                      style={{
                        background:
                          d.prio === "Alta"
                            ? "#fef2f2"
                            : d.prio === "Média"
                            ? "#fff7ed"
                            : "var(--color-g50)",
                        color: c.text,
                        border: `1px solid ${c.border}`,
                      }}
                    >
                      <AlertCircle size={16} color={c.text} />
                      <span>{d.prio}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                        <div className="flex items-center gap-2">
                          <AvatarIlus seed={d.paciente.seed} size={32} />
                          <div className="text-[15px] font-bold">{d.paciente.name}</div>
                        </div>
                        <Badge variant="blue">{d.tipo}</Badge>
                      </div>
                      <div className="flex gap-4 flex-wrap text-xs text-(--color-muted) mb-2">
                        <div className="flex items-center gap-1"><User size={11} /> {d.prof}</div>
                        <div className="flex items-center gap-1"><Calendar size={11} /> Solicitado em {d.data}</div>
                        <div className="flex items-center gap-1 text-(--color-danger)">
                          <Clock size={11} color="var(--color-danger)" /> {d.espera} aguardando
                        </div>
                      </div>
                      <div className="bg-(--color-bg) rounded-lg px-3 py-2.5 mt-2.5">
                        <div className="text-[10px] font-semibold text-(--color-muted) uppercase tracking-wide mb-1 flex items-center gap-1.5">
                          <FileText size={11} /> Sintomas Relatados:
                        </div>
                        <div className="text-[13px]">{d.sintomas}</div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-(--color-border-soft) px-5 py-3 flex justify-end gap-2">
                    <Button variant="outline" size="sm">Ver Prontuário</Button>
                    <Button size="sm">
                      <CheckCircle size={13} /> Concluir Diagnóstico
                    </Button>
                  </div>
                </div>
              );
            })}
          {tab === "concluidos" &&
            CONCLUIDOS.map((d, i) => (
              <div
                key={i}
                className="bg-white rounded-xl mb-2.5 overflow-hidden hover:shadow-md transition-shadow border border-(--color-g100) border-l-4 border-l-(--color-g500)"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 p-5">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                      <div className="flex items-center gap-2">
                        <AvatarIlus seed={d.paciente.seed} size={32} />
                        <div className="text-[15px] font-bold">{d.paciente.name}</div>
                      </div>
                      <Badge variant="blue">{d.tipo}</Badge>
                      <Badge variant="green">{d.cid}</Badge>
                    </div>
                    <div className="flex gap-4 flex-wrap text-xs text-(--color-muted) mb-2">
                      <div className="flex items-center gap-1"><User size={11} /> {d.prof}</div>
                      <div className="flex items-center gap-1"><Calendar size={11} /> Concluído em {d.data}</div>
                    </div>
                    <div className="bg-(--color-bg) rounded-lg px-3 py-2.5 mt-2.5 text-[13px]">{d.desc}</div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Button variant="outline" size="sm">Ver Laudo</Button>
                    <Button variant="ghost" size="sm">Prontuário</Button>
                  </div>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </>
  );
}
