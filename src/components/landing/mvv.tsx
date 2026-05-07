import { Check } from "lucide-react";

const VALORES = [
  "Evidência acima de achismo",
  "Clareza no processo para família e equipe",
  "Respeito ao tempo de cada família",
  "Integração real entre especialidades",
  "Transparência nos resultados e nos limites",
];

export function MVV() {
  return (
    <section className="py-24 bg-(--color-g500)">
      <div className="wrap">
        <div className="text-center max-w-md mx-auto">
          <div className="text-[11px] font-bold text-(--color-g200) tracking-[1.2px] uppercase mb-2.5">
            Missão, visão e valores
          </div>
          <h2 className="text-[38px] font-extrabold text-white tracking-tight leading-[1.18]">
            O que nos orienta
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 mt-14">
          <Card title="Missão" emoji="🎯">
            <p className="text-sm text-white/72 leading-relaxed">
              Oferecer atendimento especializado em autismo com processo clínico integrado — onde a família faz parte
              do tratamento, não apenas assiste.
            </p>
          </Card>
          <Card title="Visão" emoji="🔭">
            <p className="text-sm text-white/72 leading-relaxed">
              Ser referência em atendimento multidisciplinar para crianças autistas no Brasil, com modelo replicável
              que combina qualidade clínica e tecnologia acessível.
            </p>
          </Card>
          <Card title="Valores" emoji="⚖️">
            <ul className="list-none flex flex-col gap-2.5">
              {VALORES.map((v) => (
                <li key={v} className="text-[13px] text-white/70 flex items-start gap-2 leading-snug">
                  <Check size={12} color="var(--color-g200)" className="mt-1 shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/10 border border-white/15 rounded-2xl p-7">
      <div className="text-base font-bold text-white mb-3 flex items-center gap-2.5">
        <span className="text-xl">{emoji}</span>
        {title}
      </div>
      {children}
    </div>
  );
}
