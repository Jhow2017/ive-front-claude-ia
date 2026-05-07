import { AvatarInitials } from "@/components/shared/avatar-ilus";

const cards = [
  { l: "Próxima sessão", v: "Ter, 29 abr", s: "14h · Fonoaudiologia" },
  { l: "Última avaliação", v: "18 abr 2026", s: "Relatório disponível" },
  { l: "Sessões este mês", v: "8 sessões", s: "+2 vs. mês anterior" },
  { l: "Mensagens", v: "2 não lidas", s: "Dra. Ana Lima" },
];
const team = [
  { i: "AL", n: "Dra. Ana Lima", r: "Fonoaudióloga", b: true },
  { i: "RC", n: "Dr. Rafael Cunha", r: "Neuropsicólogo", b: false },
  { i: "CO", n: "Profa. Cíntia", r: "Terapeuta Ocup.", b: true },
];

export function HeroMockup() {
  return (
    <div className="bg-white rounded-2xl border border-(--color-border-soft) shadow-2xl overflow-hidden">
      <div className="bg-(--color-g500) py-3.5 px-4 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-white/35" />
        ))}
        <span className="text-white text-xs font-semibold ml-1.5">
          Área da família · Instituto Verde Esperança
        </span>
      </div>
      <div className="p-5">
        <div className="text-sm font-bold mb-0.5">Olá, família Costa 👋</div>
        <div className="text-xs text-(--color-muted) mb-4">
          Lucas · 6 anos · Atendimento ativo desde jan/2025
        </div>
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {cards.map((c, i) => (
            <div
              key={i}
              className="bg-(--color-g50) border border-(--color-g100) rounded-[10px] p-3"
            >
              <div className="text-[10px] text-(--color-muted) font-medium uppercase tracking-wider mb-1">
                {c.l}
              </div>
              <div className="text-[13px] font-bold">{c.v}</div>
              <div className="text-[10px] text-(--color-g500) mt-0.5 font-medium">{c.s}</div>
            </div>
          ))}
        </div>
        <div className="text-[10px] font-semibold text-(--color-muted) tracking-wider uppercase mb-2">
          Equipe do Lucas
        </div>
        {team.map((p, j) => (
          <div
            key={j}
            className={`flex items-center gap-2.5 py-2 ${
              j < team.length - 1 ? "border-b border-(--color-border-soft)" : ""
            }`}
          >
            <AvatarInitials init={p.i} size={30} />
            <div>
              <div className="text-xs font-semibold">{p.n}</div>
              <div className="text-[10px] text-(--color-muted)">{p.r}</div>
            </div>
            {p.b && (
              <div className="ml-auto bg-(--color-g50) border border-(--color-g100) text-(--color-g500) text-[9px] font-semibold px-2 py-0.5 rounded-full">
                1 msg
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
