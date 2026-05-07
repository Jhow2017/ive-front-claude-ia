"use client";
import { Activity, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardSub } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AvatarIlus } from "@/components/shared/avatar-ilus";
import { ConsultasBarChart, ReceitaAreaChart, FreqLineChart } from "@/components/dashboard/charts";
import { useAuth } from "@/stores/auth";

const FAM_METRICS = [
  { l: "Próxima sessão", v: "29 abr", d: "Ter · 14h00", cls: "up", delta: "Confirmada" },
  { l: "Sessões este mês", v: "8", d: "vs. 6 no mês ant.", cls: "up", delta: "+2" },
  { l: "Áreas em atendimento", v: "3", d: "Fono, TO, Psicologia", cls: "neutral", delta: "Ativo" },
  { l: "Mensagens", v: "2", d: "não lidas", cls: "up", delta: "Novas" },
];
const ADMIN_METRICS = [
  { l: "Pacientes ativos", v: "84", d: "vs. 76 mês ant.", cls: "up", delta: "+8" },
  { l: "Consultas hoje", v: "18", d: "de 22 agendadas", cls: "neutral", delta: "Hoje" },
  { l: "Profissionais ativos", v: "12", d: "8 especialidades", cls: "neutral", delta: "Equipe" },
  { l: "Diagnósticos pendentes", v: "7", d: "prazo em aberto", cls: "down", delta: "Atenção" },
];
const PROF_METRICS = [
  { l: "Meus pacientes", v: "24", d: "vs. 21 mês ant.", cls: "up", delta: "+3" },
  { l: "Sessões esta semana", v: "12", d: "de 14 agendadas", cls: "neutral", delta: "Semana" },
  { l: "Relatórios pendentes", v: "4", d: "prazo: 30 abr", cls: "down", delta: "Atenção" },
  { l: "Mensagens", v: "2", d: "não respondidas", cls: "up", delta: "Novas" },
];

const SETORES = [
  { n: "Cardiologia", p: 45, pct: 25 },
  { n: "Psicologia", p: 38, pct: 21 },
  { n: "Clínica Geral", p: 32, pct: 18 },
  { n: "Pediatria", p: 28, pct: 16 },
  { n: "Ortopedia", p: 22, pct: 12 },
  { n: "Outros", p: 15, pct: 8 },
];

const PROX = [
  { p: "Lucas Costa", e: "Fonoaudiologia", h: "14h00", s: "Confirmada", v: "green" as const },
  { p: "Maria Oliveira", e: "Terapia Ocup.", h: "15h30", s: "Confirmada", v: "green" as const },
  { p: "Pedro Santos", e: "Psicologia", h: "17h00", s: "Pendente", v: "yellow" as const },
];

const OBS = [
  { av: 0, n: "Dra. Ana Lima", r: "Fonoaudióloga", m: "Sessão de 24/04: boa resposta ao protocolo de nomeação.", t: "há 2 dias" },
  { av: 1, n: "Profa. Cíntia", r: "Terapeuta Ocup.", m: "Integração sensorial — boa tolerância ao toque hoje.", t: "há 4 dias" },
  { av: 2, n: "Dr. Rafael Cunha", r: "Neuropsicólogo", m: "Reavaliação cognitiva marcada para 15/05.", t: "há 1 sem" },
];

const CONSULTAS = [
  { m: "Nov", v: 148 }, { m: "Dez", v: 164 }, { m: "Jan", v: 192 },
  { m: "Fev", v: 178 }, { m: "Mar", v: 208 }, { m: "Abr", v: 188 },
];
const RECEITA = [
  { m: "Nov", v: 42000 }, { m: "Dez", v: 48000 }, { m: "Jan", v: 55000 },
  { m: "Fev", v: 51000 }, { m: "Mar", v: 62000 }, { m: "Abr", v: 58900 },
];
const FREQ = [
  { m: "Mai", v: 32 }, { m: "Jun", v: 38 }, { m: "Jul", v: 42 },
  { m: "Ago", v: 39 }, { m: "Set", v: 48 }, { m: "Out", v: 51 },
  { m: "Nov", v: 55 }, { m: "Dez", v: 58 }, { m: "Jan", v: 54 },
  { m: "Fev", v: 62 }, { m: "Mar", v: 67 }, { m: "Abr", v: 72 },
];

export function HomeView() {
  const role = useAuth((s) => s.role);
  const isAdmin = role === "admin";
  const isFam = role === "familia";
  const metrics = isFam ? FAM_METRICS : isAdmin ? ADMIN_METRICS : PROF_METRICS;
  const title = isFam ? "Bem-vinda, família Costa" : isAdmin ? "Painel administrativo" : "Bem-vinda, Dra. Renata";
  const sub = isFam ? "Lucas Costa · 6 anos · Atendimento ativo" : "Sábado, 26 de abril de 2026";

  return (
    <>
      <div>
        <div className="text-[22px] font-extrabold tracking-tight">{title}</div>
        <div className="text-[13px] text-(--color-muted) mt-1">{sub}</div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white border border-(--color-border-soft) rounded-xl p-4">
            <div className="text-[11px] font-semibold text-(--color-muted) uppercase tracking-wide mb-1.5">
              {m.l}
            </div>
            <div className="text-[26px] font-extrabold tracking-tight leading-none">{m.v}</div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span
                className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
                  m.cls === "up" ? "bg-(--color-g50) text-(--color-g600)" :
                  m.cls === "down" ? "bg-red-50 text-(--color-danger)" :
                  "bg-(--color-bg) text-(--color-muted)"
                }`}
              >
                {m.delta}
              </span>
              <span className="text-[11px] text-(--color-muted)">{m.d}</span>
            </div>
          </div>
        ))}
      </div>

      {isAdmin ? (
        <div className="grid lg:grid-cols-2 gap-3.5">
          <Card>
            <CardContent>
              <CardHeader>
                <div>
                  <CardTitle>Consultas Mensais</CardTitle>
                  <CardSub>Últimos 6 meses</CardSub>
                </div>
              </CardHeader>
              <ConsultasBarChart data={CONSULTAS} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeader>
                <div>
                  <CardTitle>Receita Mensal</CardTitle>
                  <CardSub>Evolução financeira</CardSub>
                </div>
              </CardHeader>
              <ReceitaAreaChart data={RECEITA} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent>
            <CardHeader>
              <CardTitle>{isFam ? "Frequência de sessões" : "Consultas realizadas · últimos 12 meses"}</CardTitle>
            </CardHeader>
            <FreqLineChart data={FREQ} />
          </CardContent>
        </Card>
      )}

      {isAdmin && (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-3.5">
          <Card>
            <CardContent>
              <CardHeader>
                <div>
                  <CardTitle>Setores Mais Ativos</CardTitle>
                  <CardSub>Distribuição por especialidade</CardSub>
                </div>
              </CardHeader>
              <div className="flex flex-col gap-3.5">
                {SETORES.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-(--color-g50) flex items-center justify-center shrink-0">
                      <Activity size={16} color="var(--color-g500)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <div>
                          <span className="text-[13px] font-semibold">{s.n}</span>
                          <span className="text-[11px] text-(--color-muted) ml-2">{s.p} pacientes</span>
                        </div>
                        <span className="text-[13px] font-bold text-(--color-g600)">{s.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-(--color-bg) rounded-full overflow-hidden">
                        <div
                          className="h-full bg-(--color-g500) rounded-full transition-all"
                          style={{ width: `${s.pct * 4}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeader>
                <div>
                  <CardTitle>Pendências de Cadastro</CardTitle>
                  <CardSub>Profissionais aguardando</CardSub>
                </div>
              </CardHeader>
              <div className="flex flex-col gap-2.5">
                {[
                  { n: "Dr. Roberto Lima", e: "Neurologia", t: "Há 2 dias" },
                  { n: "Dra. Fernanda Costa", e: "Dermatologia", t: "Há 5 dias" },
                ].map((p, i) => (
                  <div key={i} className="bg-(--color-g50) border border-(--color-g100) rounded-[10px] px-3.5 py-3 flex gap-2.5 items-center">
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 text-(--color-g600)">
                      <User size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold truncate">{p.n}</div>
                      <div className="text-[11px] text-(--color-muted)">{p.e}</div>
                      <div className="text-[11px] text-(--color-g600) mt-0.5 font-semibold">{p.t}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-3.5">
        <Card>
          <CardContent>
            <CardHeader>
              <div>
                <CardTitle>Próximas consultas</CardTitle>
                <CardSub>Esta semana</CardSub>
              </div>
            </CardHeader>
            <table className="w-full">
              <thead>
                <tr>
                  {["Paciente", "Especialidade", "Hora", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-[11px] font-semibold text-(--color-muted) uppercase tracking-wide pb-2.5 text-left"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROX.map((r, i) => (
                  <tr key={i} className="hover:bg-(--color-g50)">
                    <td className="py-3 text-[13px] font-semibold border-t border-(--color-border-soft)">{r.p}</td>
                    <td className="py-3 text-[13px] text-(--color-muted) border-t border-(--color-border-soft)">{r.e}</td>
                    <td className="py-3 text-[13px] text-(--color-muted) border-t border-(--color-border-soft)">{r.h}</td>
                    <td className="py-3 border-t border-(--color-border-soft)">
                      <Badge variant={r.v}>{r.s}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardHeader>
              <CardTitle>{isFam ? "Equipe do Lucas" : isAdmin ? "Atividade recente" : "Últimas observações"}</CardTitle>
            </CardHeader>
            <div className="flex flex-col">
              {OBS.map((u, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 py-2.5 ${
                    i < OBS.length - 1 ? "border-b border-(--color-border-soft)" : ""
                  }`}
                >
                  <AvatarIlus seed={u.av} size={32} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-semibold">{u.n}</span>
                      <span className="text-[11px] text-(--color-muted) shrink-0">{u.t}</span>
                    </div>
                    <div className="text-[11px] text-(--color-muted)">{u.r}</div>
                    <div className="text-xs mt-1 leading-snug">{u.m}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
