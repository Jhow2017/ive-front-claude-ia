"use client";
import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, User, Edit, Trash2, Phone, Mail, Activity, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, FormField } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { AvatarIlus } from "@/components/shared/avatar-ilus";

interface Prof {
  seed: number; name: string; spec: string; reg: string;
  patients: number; phone: string; email: string;
}

const PROFS: Prof[] = [
  { seed: 0, name: "Dra. Ana Lima", spec: "Fonoaudiologia", reg: "CRFa 12345/SP", patients: 28, phone: "(11) 98765-4321", email: "ana.lima@iverde.com.br" },
  { seed: 1, name: "Dr. Rafael Cunha", spec: "Neuropsicologia", reg: "CRP 54321/SP", patients: 22, phone: "(11) 98765-1234", email: "rafael.cunha@iverde.com.br" },
  { seed: 2, name: "Profa. Cíntia Rocha", spec: "Terapia Ocupacional", reg: "CREFITO 67890/SP", patients: 31, phone: "(11) 98765-5678", email: "cintia.rocha@iverde.com.br" },
  { seed: 3, name: "Dra. Mariana Souza", spec: "Psicologia", reg: "CRP 99001/SP", patients: 19, phone: "(11) 98765-9012", email: "mariana.souza@iverde.com.br" },
  { seed: 4, name: "Dr. Carlos Melo", spec: "Psicopedagogia", reg: "ABPp 11223/SP", patients: 15, phone: "(11) 98765-3456", email: "carlos.melo@iverde.com.br" },
  { seed: 5, name: "Profa. Letícia Nunes", spec: "Psicomotricidade", reg: "ABPsim 44556/SP", patients: 18, phone: "(11) 98765-7890", email: "leticia.nunes@iverde.com.br" },
];

export function ProfissionaisView() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<Prof | null>(null);
  const [edit, setEdit] = useState<Prof | null>(null);
  const filtered = PROFS.filter(
    (p) => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.spec.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-start flex-wrap gap-3">
        <div>
          <div className="text-[22px] font-extrabold tracking-tight">Profissionais</div>
          <div className="text-[13px] text-(--color-muted) mt-1">Equipe clínica do Instituto</div>
        </div>
        <Button>
          <Plus size={15} /> Novo Profissional
        </Button>
      </div>
      <Card>
        <CardContent className="py-3.5 px-5">
          <div className="flex gap-2.5 flex-wrap">
            <div className="flex items-center gap-2 bg-(--color-bg) border border-(--color-border-soft) rounded-lg px-3 py-1.5 flex-1 min-w-[220px]">
              <Search size={14} color="var(--color-muted)" />
              <input
                placeholder="Buscar por nome, especialidade ou registro..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-[13px] w-full"
              />
            </div>
            <Button variant="outline">
              <Filter size={14} /> Filtros
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <div
            key={i}
            className="bg-white border border-(--color-border-soft) rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2 mb-3.5 min-w-0">
              <div className="flex gap-3 items-start min-w-0">
                <AvatarIlus seed={p.seed} size={48} />
                <div className="min-w-0">
                  <div className="text-[15px] font-bold truncate">{p.name}</div>
                  <div className="text-xs text-(--color-muted) flex items-center gap-1.5 mt-0.5 truncate">
                    <Activity size={11} color="var(--color-g500)" /> {p.spec}
                  </div>
                  <div className="text-[11px] text-(--color-muted2) mt-0.5 truncate">{p.reg}</div>
                </div>
              </div>
              <Button size="icon" variant="ghost"><MoreHorizontal size={14} /></Button>
            </div>
            <div className="bg-(--color-g50) rounded-[9px] px-3.5 py-2.5 mb-3.5">
              <div className="text-[10px] text-(--color-muted) font-medium uppercase tracking-wide mb-1">
                Pacientes Ativos
              </div>
              <div className="text-2xl font-extrabold text-(--color-g500) tracking-tight">{p.patients}</div>
            </div>
            <div className="flex flex-col gap-1.5 mb-3.5">
              <div className="text-xs text-(--color-muted) flex items-center gap-1.5">
                <Phone size={12} color="var(--color-g500)" /> {p.phone}
              </div>
              <div className="text-xs text-(--color-muted) flex items-center gap-1.5">
                <Mail size={12} color="var(--color-g500)" /> {p.email}
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-2 border-t border-(--color-border-soft) pt-3.5">
              <Button variant="outline" onClick={() => setView(p)}>
                <User size={13} /> Ver Perfil
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setEdit(p)} title="Editar">
                <Edit size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!view} onClose={() => setView(null)}>
        {view && (
          <>
            <DialogHeader
              title={
                <div className="flex gap-3.5 items-center">
                  <AvatarIlus seed={view.seed} size={56} />
                  <div>
                    <div>{view.name}</div>
                    <div className="text-[13px] text-(--color-muted) font-medium">
                      {view.spec} · {view.reg}
                    </div>
                  </div>
                </div>
              }
              onClose={() => setView(null)}
            />
            <div className="grid grid-cols-2 gap-3 mb-3.5">
              <div className="bg-white border border-(--color-border-soft) rounded-xl p-4">
                <div className="text-[11px] font-semibold text-(--color-muted) uppercase mb-1.5">Pacientes</div>
                <div className="text-2xl font-extrabold">{view.patients}</div>
              </div>
              <div className="bg-white border border-(--color-border-soft) rounded-xl p-4">
                <div className="text-[11px] font-semibold text-(--color-muted) uppercase mb-1.5">Avaliação</div>
                <div className="text-2xl font-extrabold text-(--color-g500)">4.9</div>
              </div>
            </div>
            <div className="text-[13px] mb-2"><b>Contato</b></div>
            <div className="text-[13px] text-(--color-muted) mb-1.5 flex items-center gap-1.5">
              <Phone size={12} color="var(--color-g500)" /> {view.phone}
            </div>
            <div className="text-[13px] text-(--color-muted) flex items-center gap-1.5">
              <Mail size={12} color="var(--color-g500)" /> {view.email}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setView(null)}>Fechar</Button>
              <Button onClick={() => { setEdit(view); setView(null); }}>
                <Edit size={13} /> Editar
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>

      <Dialog open={!!edit} onClose={() => setEdit(null)}>
        {edit && (
          <>
            <DialogHeader title="Editar profissional" sub={edit.name} onClose={() => setEdit(null)} />
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Nome completo" className="col-span-2"><Input defaultValue={edit.name} /></FormField>
              <FormField label="Especialidade"><Input defaultValue={edit.spec} /></FormField>
              <FormField label="Registro"><Input defaultValue={edit.reg} /></FormField>
              <FormField label="Telefone"><Input defaultValue={edit.phone} /></FormField>
              <FormField label="E-mail"><Input defaultValue={edit.email} /></FormField>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEdit(null)}>Cancelar</Button>
              <Button onClick={() => setEdit(null)}>
                <Check size={13} /> Salvar
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </>
  );
}
