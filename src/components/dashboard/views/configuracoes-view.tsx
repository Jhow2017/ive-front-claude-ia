"use client";
import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth, profileForRole } from "@/stores/auth";

const VARS = ["{nome_paciente}", "{data}", "{hora}", "{profissional}", "{especialidade}", "{sala}"];

interface NotifState {
  on: boolean;
  when: string[];
  tpl: string;
}

function Toggle({ on, onChange, accent = "var(--color-g500)" }: { on: boolean; onChange: () => void; accent?: string }) {
  return (
    <button
      onClick={onChange}
      className="w-11 h-6 rounded-full relative cursor-pointer transition-colors"
      style={{ background: on ? accent : "var(--color-border-soft)" }}
    >
      <div
        className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-all"
        style={{ left: on ? "calc(100% - 21px)" : "3px" }}
      />
    </button>
  );
}

function NotifChannel({
  label, Ic, accent, st, set,
}: {
  label: string; Ic: any; accent: string;
  st: NotifState; set: (s: NotifState) => void;
}) {
  return (
    <Card style={{ borderColor: st.on ? accent : "var(--color-border-soft)", borderWidth: st.on ? 2 : 1 }}>
      <CardContent>
        <div className="flex justify-between items-center mb-3.5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: accent + "1a" }}
            >
              <Ic size={18} color={accent} />
            </div>
            <div>
              <div className="text-[15px] font-bold">{label}</div>
              <div className="text-xs text-(--color-muted)">Confirmação automática de agendamento</div>
            </div>
          </div>
          <Toggle on={st.on} onChange={() => set({ ...st, on: !st.on })} accent={accent} />
        </div>
        {st.on && (
          <>
            <div className="text-xs font-semibold text-(--color-muted) mb-2">QUANDO ENVIAR</div>
            <div className="flex gap-2 flex-wrap mb-3.5">
              {[
                ["agendar", "Ao agendar"],
                ["24h", "24h antes"],
                ["1h", "1h antes"],
              ].map(([k, l]) => (
                <label
                  key={k}
                  className="flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs font-semibold cursor-pointer"
                  style={{
                    background: st.when.includes(k) ? "var(--color-g50)" : "white",
                    borderColor: st.when.includes(k) ? "var(--color-g500)" : "var(--color-border-soft)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={st.when.includes(k)}
                    onChange={() =>
                      set({
                        ...st,
                        when: st.when.includes(k) ? st.when.filter((x) => x !== k) : [...st.when, k],
                      })
                    }
                  />
                  {l}
                </label>
              ))}
            </div>
            <div className="text-xs font-semibold text-(--color-muted) mb-2">TEMPLATE DA MENSAGEM</div>
            <textarea
              value={st.tpl}
              onChange={(e) => set({ ...st, tpl: e.target.value })}
              className="w-full min-h-28 p-2.5 border border-(--color-border-soft) rounded-lg font-sans text-[13px] resize-y"
            />
            <div className="text-[11px] text-(--color-muted) mt-2">Variáveis disponíveis:</div>
            <div className="flex gap-1.5 flex-wrap mt-1.5">
              {VARS.map((v) => (
                <button
                  key={v}
                  onClick={() => set({ ...st, tpl: st.tpl + " " + v })}
                  className="text-[11px] px-2 py-1 bg-(--color-g50) text-(--color-g700) rounded font-mono cursor-pointer"
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="mt-3.5 p-3.5 bg-(--color-bg) rounded-[10px]">
              <div className="text-[11px] font-bold text-(--color-muted) mb-2">PRÉ-VISUALIZAÇÃO</div>
              <div className="text-[13px] whitespace-pre-wrap leading-relaxed">
                {st.tpl
                  .replace("{nome_paciente}", "Lucas Costa")
                  .replace("{data}", "29/04")
                  .replace("{hora}", "14:00")
                  .replace("{profissional}", "Dra. Renata Lima")
                  .replace("{especialidade}", "Fonoaudiologia")
                  .replace("{sala}", "Sala 3")}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

const NOTIF_ITEMS = [
  { l: "Lembrete de sessão (24h antes)", on: true },
  { l: "Mensagens da equipe", on: true },
  { l: "Novos relatórios", on: true },
  { l: "Atualizações do plano", on: false },
];

export function ConfiguracoesView() {
  const role = useAuth((s) => s.role);
  const profile = profileForRole[role];
  const isAdmin = role === "admin";
  const [tab, setTab] = useState<"conta" | "notif">("conta");
  const [wpp, setWpp] = useState<NotifState>({
    on: true,
    when: ["24h", "1h"],
    tpl: "Olá {nome_paciente}! Lembrete da sua sessão de {especialidade} dia {data} às {hora} com {profissional} ({sala}). Confirme respondendo SIM. — IVE",
  });
  const [eml, setEml] = useState<NotifState>({
    on: true,
    when: ["24h"],
    tpl:
      "Olá {nome_paciente},\n\nEste é um lembrete da sua sessão de {especialidade} agendada para {data} às {hora}.\n\nProfissional: {profissional}\nLocal: {sala}\n\nQualquer alteração, entre em contato.\n\n— Equipe IVE",
  });

  return (
    <>
      <div>
        <div className="text-[22px] font-extrabold tracking-tight">Configurações</div>
        <div className="text-[13px] text-(--color-muted) mt-1">Preferências da sua conta</div>
      </div>
      {isAdmin && (
        <div className="flex gap-0.5 bg-(--color-bg) rounded-[9px] p-1 self-start">
          {[
            ["conta", "Conta"],
            ["notif", "Mensagens automáticas"],
          ].map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k as any)}
              className={`px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-all whitespace-nowrap ${
                tab === k ? "bg-white text-(--color-text) font-semibold shadow-sm" : "text-(--color-muted)"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      {tab === "conta" && (
        <div className="grid lg:grid-cols-2 gap-3.5">
          <Card>
            <CardContent>
              <CardHeader>
                <CardTitle>Dados da conta</CardTitle>
              </CardHeader>
              {[
                ["Nome", profile.name],
                ["E-mail", profile.sub],
                ["Tipo de conta", profile.role],
              ].map(([k, v], i) => (
                <div
                  key={i}
                  className={`flex justify-between py-2.5 text-[13px] ${
                    i < 2 ? "border-b border-(--color-border-soft)" : ""
                  }`}
                >
                  <span className="text-(--color-muted)">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
              <Button variant="outline" size="sm" className="mt-3.5">
                Editar dados
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
              </CardHeader>
              {NOTIF_ITEMS.map((n, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center py-2.5 text-[13px] ${
                    i < NOTIF_ITEMS.length - 1 ? "border-b border-(--color-border-soft)" : ""
                  }`}
                >
                  <span>{n.l}</span>
                  <NotifToggle defaultOn={n.on} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "notif" && (
        <div className="grid lg:grid-cols-2 gap-3.5">
          <NotifChannel label="WhatsApp" Ic={MessageCircle} accent="#25d366" st={wpp} set={setWpp} />
          <NotifChannel label="E-mail" Ic={Mail} accent="#3b82f6" st={eml} set={setEml} />
        </div>
      )}
    </>
  );
}

function NotifToggle({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return <Toggle on={on} onChange={() => setOn(!on)} />;
}
