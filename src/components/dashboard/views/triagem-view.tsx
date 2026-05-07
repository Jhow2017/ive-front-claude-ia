"use client";
import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQueue } from "@/stores/queue";

export function TriagemView() {
  const items = useQueue((s) => s.items);
  const confirmar = useQueue((s) => s.confirmarChegada);
  const desfazer = useQueue((s) => s.desfazer);
  const [search, setSearch] = useState("");

  const aguardando = items.filter((i) => i.status === "aguardando");
  const ema = items.filter((i) => i.status === "em_atendimento");
  const agendados = items
    .filter((i) => i.status === "agendado")
    .filter((i) => !search || i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div>
        <div className="text-[22px] font-extrabold tracking-tight">Triagem / Recepção</div>
        <div className="text-[13px] text-(--color-muted) mt-1">
          Confirme a chegada dos pacientes para entrarem na fila de atendimento
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <div className="text-[11px] font-bold uppercase tracking-wide text-yellow-700">Em atendimento</div>
          <div className="text-3xl font-extrabold mt-1">{ema.length}</div>
        </div>
        <div className="bg-(--color-g50) border border-(--color-g200) rounded-xl p-5">
          <div className="text-[11px] font-bold uppercase tracking-wide text-(--color-g700)">
            Aguardando chamada
          </div>
          <div className="text-3xl font-extrabold mt-1">{aguardando.length}</div>
        </div>
        <Card>
          <CardContent>
            <div className="text-[11px] font-bold uppercase tracking-wide text-(--color-muted)">
              Agendados (ainda não chegaram)
            </div>
            <div className="text-3xl font-extrabold mt-1">{agendados.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <CardHeader>
            <CardTitle>Confirmar chegada</CardTitle>
          </CardHeader>
          <div className="mb-3.5">
            <Input
              placeholder="Buscar paciente por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            {agendados.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between px-3.5 py-3 border border-(--color-border-soft) rounded-[10px] flex-wrap gap-2"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={`https://i.pravatar.cc/40?img=${p.seed + 10}`}
                    width={40}
                    height={40}
                    alt=""
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-sm font-bold">{p.name}</div>
                    <div className="text-xs text-(--color-muted)">
                      {p.hora} · {p.spec} · {p.prof} · {p.sala}
                    </div>
                  </div>
                </div>
                <Button size="sm" onClick={() => confirmar(p.id)}>
                  <Check size={13} /> Confirmar chegada
                </Button>
              </div>
            ))}
            {agendados.length === 0 && (
              <div className="text-center text-(--color-muted) py-6 text-[13px]">Nenhum paciente pendente.</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <CardHeader>
            <CardTitle>Já na fila ({aguardando.length})</CardTitle>
          </CardHeader>
          <div className="grid gap-2">
            {aguardando.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center justify-between px-3.5 py-2.5 bg-(--color-g50) rounded-[10px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-(--color-g500) text-white flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold">{p.name}</div>
                    <div className="text-[11px] text-(--color-muted)">
                      Chegou {p.chegada} · {p.prof} · {p.sala}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="xs" onClick={() => desfazer(p.id)}>
                  Desfazer
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
