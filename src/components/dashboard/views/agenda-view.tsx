"use client";
import { useState, Fragment } from "react";
import { Plus, X, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea, FormField } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { AvatarIlus } from "@/components/shared/avatar-ilus";
import { useAuth } from "@/stores/auth";

const DAYS = [
  { d: "Seg", dt: "27", today: false },
  { d: "Ter", dt: "28", today: false },
  { d: "Qua", dt: "29", today: true },
  { d: "Qui", dt: "30", today: false },
  { d: "Sex", dt: "01", today: false },
];
const TIMES = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

type EvCls = "ev-green" | "ev-blue" | "ev-purple" | "ev-yellow";
const EV_BG: Record<EvCls, string> = {
  "ev-green": "bg-(--color-g100) text-(--color-g700)",
  "ev-blue": "bg-blue-100 text-blue-900",
  "ev-purple": "bg-violet-100 text-violet-900",
  "ev-yellow": "bg-yellow-100 text-yellow-900",
};

interface Ev {
  col: number; row: number; label: string; cls: EvCls;
  spec: string;
  pac: { seed: number; name: string };
  prof: { seed: number; name: string; id: string };
  status: "Confirmada" | "Pendente";
  sala: string; familia: string;
}

const ALL: Ev[] = [
  { col: 0, row: 1, label: "Fono · Lucas Costa", cls: "ev-green", spec: "Fonoaudiologia", pac: { seed: 0, name: "Lucas Costa" }, prof: { seed: 1, name: "Dra. Renata Lima", id: "renata" }, status: "Confirmada", sala: "Sala 3", familia: "costa" },
  { col: 1, row: 3, label: "TO · Maria Oliveira", cls: "ev-blue", spec: "Terapia Ocupacional", pac: { seed: 2, name: "Maria Oliveira" }, prof: { seed: 2, name: "Profa. Cíntia Rocha", id: "cintia" }, status: "Confirmada", sala: "Sala 1", familia: "oliveira" },
  { col: 2, row: 0, label: "Psico · Pedro Santos", cls: "ev-purple", spec: "Psicologia", pac: { seed: 3, name: "Pedro Santos" }, prof: { seed: 3, name: "Dra. Mariana Souza", id: "mariana" }, status: "Confirmada", sala: "Sala 2", familia: "santos" },
  { col: 3, row: 5, label: "Neuro · Ana Lima", cls: "ev-yellow", spec: "Neuropsicologia", pac: { seed: 4, name: "Ana Lima" }, prof: { seed: 1, name: "Dr. Rafael Cunha", id: "rafael" }, status: "Pendente", sala: "Sala 4", familia: "lima" },
  { col: 4, row: 2, label: "Fono · Carlos Rocha", cls: "ev-green", spec: "Fonoaudiologia", pac: { seed: 5, name: "Carlos Rocha" }, prof: { seed: 0, name: "Dra. Renata Lima", id: "renata" }, status: "Confirmada", sala: "Sala 3", familia: "rocha" },
  { col: 0, row: 6, label: "Fono · Beatriz A.", cls: "ev-green", spec: "Fonoaudiologia", pac: { seed: 1, name: "Beatriz Alves" }, prof: { seed: 0, name: "Dra. Renata Lima", id: "renata" }, status: "Confirmada", sala: "Sala 3", familia: "alves" },
  { col: 2, row: 4, label: "Psico · Maria O.", cls: "ev-purple", spec: "Psicologia", pac: { seed: 2, name: "Maria Oliveira" }, prof: { seed: 3, name: "Dra. Mariana Souza", id: "mariana" }, status: "Confirmada", sala: "Sala 2", familia: "oliveira" },
  { col: 3, row: 1, label: "Fono · Lucas C.", cls: "ev-green", spec: "Fonoaudiologia", pac: { seed: 0, name: "Lucas Costa" }, prof: { seed: 0, name: "Dra. Renata Lima", id: "renata" }, status: "Confirmada", sala: "Sala 3", familia: "costa" },
];

export function AgendaView() {
  const role = useAuth((s) => s.role);
  const isProf = role === "profissional";
  const isFam = role === "familia";
  const [view, setView] = useState<"hoje" | "semana" | "mes">("semana");
  const [modalOpen, setModalOpen] = useState(false);
  const [sel, setSel] = useState<(Ev & { day: any; time: string }) | null>(null);
  const [filterProf, setFilterProf] = useState("todos");

  const events = isProf
    ? ALL.filter((e) => e.prof.id === "renata")
    : isFam
    ? ALL.filter((e) => e.familia === "costa")
    : filterProf === "todos"
    ? ALL
    : ALL.filter((e) => e.prof.id === filterProf);

  return (
    <>
      <div className="flex justify-between items-start flex-wrap gap-3">
        <div>
          <div className="text-[22px] font-extrabold tracking-tight">Agenda</div>
          <div className="text-[13px] text-(--color-muted) mt-1">
            Abr 2026 · Semana de 27 abr – 01 mai
          </div>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex gap-0.5 bg-(--color-bg) rounded-[9px] p-1">
            {(["hoje", "semana", "mes"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setView(k)}
                className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                  view === k ? "bg-white text-(--color-text) font-semibold shadow-sm" : "text-(--color-muted)"
                }`}
              >
                {k === "hoje" ? "Hoje" : k === "semana" ? "Semanal" : "Mensal"}
              </button>
            ))}
          </div>
          {!isProf && !isFam && (
            <Select value={filterProf} onChange={(e) => setFilterProf(e.target.value)} className="!w-auto !py-2">
              <option value="todos">Todos os profissionais</option>
              <option value="renata">Dra. Renata Lima</option>
              <option value="cintia">Profa. Cíntia Rocha</option>
              <option value="mariana">Dra. Mariana Souza</option>
              <option value="rafael">Dr. Rafael Cunha</option>
            </Select>
          )}
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Nova Consulta
          </Button>
        </div>
      </div>

      {view === "semana" && (
        <div className="grid grid-cols-[52px_repeat(5,1fr)] rounded-xl overflow-hidden border border-(--color-border-soft) bg-white">
          <div className="bg-(--color-bg) py-2.5 border-b border-(--color-border-soft) border-r" />
          {DAYS.map((d, i) => (
            <div key={i} className="bg-(--color-bg) py-2.5 text-center border-b border-(--color-border-soft)">
              <div className="text-[10px] font-semibold text-(--color-muted) uppercase tracking-wide">{d.d}</div>
              <div
                className={`text-base font-extrabold mt-0.5 ${d.today ? "text-(--color-g500)" : ""}`}
              >
                {d.dt}
              </div>
            </div>
          ))}
          {TIMES.map((t, ti) => (
            <Fragment key={ti}>
              <div className="h-13 flex items-center justify-center text-[10px] text-(--color-muted2) border-t border-(--color-border-soft) border-r">
                {t}
              </div>
              {DAYS.map((_, di) => {
                const ev = events.find((e) => e.col === di && e.row === ti);
                return (
                  <div
                    key={di}
                    className="border-l border-t border-(--color-border-soft) h-13 relative cursor-pointer overflow-hidden hover:bg-(--color-g50)"
                  >
                    {ev && (
                      <div
                        className={`absolute inset-1 rounded-md p-1 text-[10px] font-semibold leading-snug overflow-hidden cursor-pointer flex flex-col justify-center ${
                          EV_BG[ev.cls]
                        }`}
                        onClick={() => setSel({ ...ev, day: DAYS[di], time: TIMES[ti] })}
                      >
                        {isProf ? (
                          <>
                            <div className="font-bold text-[11px] truncate">{ev.pac.name}</div>
                            <div className="text-[9px] opacity-75 mt-px">{ev.sala}</div>
                          </>
                        ) : (
                          ev.label
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      )}

      {view === "hoje" && (
        <Card>
          <div className="px-5 py-3.5 border-b border-(--color-border-soft) flex justify-between items-center">
            <div>
              <div className="text-sm font-bold">Quarta-feira, 29 de Abril</div>
              <div className="text-xs text-(--color-muted)">
                {events.filter((e) => e.col === 2).length} consultas agendadas
              </div>
            </div>
            <Badge>Hoje</Badge>
          </div>
          <div className="grid grid-cols-[64px_1fr]">
            {TIMES.map((t, ti) => {
              const dayEvents = events.filter((e) => e.col === 2 && e.row === ti);
              return (
                <Fragment key={ti}>
                  <div className="px-2 py-3.5 text-right text-[11px] text-(--color-muted) font-semibold border-t border-(--color-border-soft) border-r">
                    {t}
                  </div>
                  <div className="border-t border-(--color-border-soft) min-h-16 px-3 py-1.5 flex flex-col gap-1 hover:bg-(--color-g50)">
                    {dayEvents.length === 0 && <div className="text-[11px] text-(--color-muted2) italic">Disponível</div>}
                    {dayEvents.map((ev, ei) => (
                      <div
                        key={ei}
                        onClick={() => setSel({ ...ev, day: { d: "Qua", dt: "29" }, time: t })}
                        className={`px-3 py-2 rounded-lg text-[13px] font-semibold cursor-pointer flex items-center gap-2 transition-transform hover:translate-x-1 ${EV_BG[ev.cls]}`}
                      >
                        <span className="text-[11px] font-bold opacity-75">{t}</span>
                        <span className="flex-1">{isProf ? ev.pac.name : `${ev.spec} · ${ev.pac.name}`}</span>
                        <span className="text-[11px] opacity-75">{ev.sala}</span>
                      </div>
                    ))}
                  </div>
                </Fragment>
              );
            })}
          </div>
        </Card>
      )}

      {view === "mes" && <MonthView events={events} setSel={setSel} />}

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogHeader title="Nova Consulta" sub="Agendar nova sessão de atendimento" onClose={() => setModalOpen(false)} />
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Paciente *" className="col-span-2">
            <Select>
              <option>Selecionar paciente...</option>
              <option>Lucas Costa</option><option>Maria Oliveira</option><option>Pedro Santos</option>
            </Select>
          </FormField>
          <FormField label="Profissional *">
            <Select>
              <option>Selecionar profissional...</option>
              <option>Dra. Ana Lima</option><option>Dr. Rafael Cunha</option><option>Profa. Cíntia</option>
            </Select>
          </FormField>
          <FormField label="Especialidade">
            <Select>
              <option>Fonoaudiologia</option><option>Neuropsicologia</option>
              <option>Terapia Ocupacional</option><option>Psicologia</option>
            </Select>
          </FormField>
          <FormField label="Data *"><Input type="date" /></FormField>
          <FormField label="Horário *">
            <Select>
              <option>08:00</option><option>09:00</option><option>10:00</option>
              <option>14:00</option><option>15:00</option>
            </Select>
          </FormField>
          <FormField label="Observações" className="col-span-2">
            <Textarea placeholder="Observações para a sessão..." />
          </FormField>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button onClick={() => setModalOpen(false)}>Agendar consulta</Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={!!sel} onClose={() => setSel(null)}>
        {sel && (
          <>
            <DialogHeader
              title={sel.spec}
              sub={`${sel.day.d}, ${sel.day.dt} abr · ${sel.time}`}
              onClose={() => setSel(null)}
            />
            <div className="flex flex-col gap-3.5">
              <div className="flex gap-3 items-center p-3 bg-(--color-bg) rounded-[10px]">
                <AvatarIlus seed={sel.pac.seed} size={42} />
                <div className="flex-1">
                  <div className="text-[11px] text-(--color-muted)">Paciente</div>
                  <div className="text-sm font-bold">{sel.pac.name}</div>
                </div>
              </div>
              <div className="flex gap-3 items-center p-3 bg-(--color-bg) rounded-[10px]">
                <AvatarIlus seed={sel.prof.seed} size={42} />
                <div className="flex-1">
                  <div className="text-[11px] text-(--color-muted)">Profissional</div>
                  <div className="text-sm font-bold">{sel.prof.name}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white border border-(--color-border-soft) rounded-xl p-4">
                  <div className="text-[11px] text-(--color-muted) uppercase font-semibold">Status</div>
                  <div
                    className={`text-sm font-bold ${
                      sel.status === "Confirmada" ? "text-(--color-g500)" : "text-(--color-warn)"
                    }`}
                  >
                    {sel.status}
                  </div>
                </div>
                <div className="bg-white border border-(--color-border-soft) rounded-xl p-4">
                  <div className="text-[11px] text-(--color-muted) uppercase font-semibold">Local</div>
                  <div className="text-sm font-bold">{sel.sala}</div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSel(null)}>
                <X size={13} /> Cancelar consulta
              </Button>
              <Button onClick={() => setSel(null)}>
                <Edit size={13} /> Editar
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </>
  );
}

function MonthView({ events, setSel }: { events: Ev[]; setSel: (e: any) => void }) {
  const mDays = Array.from({ length: 35 }, (_, i) => {
    const num = i - 2;
    const inMonth = num >= 1 && num <= 30;
    const evs = inMonth ? events.filter((e) => (e.col + e.row) % 12 === num % 12).slice(0, 3) : [];
    return {
      num: inMonth ? num : num < 1 ? 31 + num : num - 30,
      inMonth,
      today: num === 29,
      evs,
    };
  });
  return (
    <div className="grid grid-cols-7 gap-px bg-(--color-border-soft) rounded-xl overflow-hidden border border-(--color-border-soft)">
      {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
        <div
          key={d}
          className="bg-(--color-bg) py-2.5 text-center text-[10px] font-bold text-(--color-muted) uppercase tracking-wide"
        >
          {d}
        </div>
      ))}
      {mDays.map((d, i) => (
        <div
          key={i}
          className={`bg-white min-h-[96px] p-1.5 flex flex-col gap-1 cursor-pointer hover:bg-(--color-g50) ${
            !d.inMonth ? "bg-neutral-50 text-(--color-muted2)" : ""
          }`}
        >
          <div
            className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
              d.today ? "bg-(--color-g500) text-white" : ""
            }`}
          >
            {d.num}
          </div>
          {d.evs.map((ev, ei) => (
            <div
              key={ei}
              onClick={() => setSel({ ...ev, day: { d: "Qua", dt: String(d.num).padStart(2, "0") }, time: TIMES[ev.row] })}
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded leading-snug truncate cursor-pointer ${EV_BG[ev.cls]}`}
            >
              {TIMES[ev.row]} {ev.spec.slice(0, 8)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
