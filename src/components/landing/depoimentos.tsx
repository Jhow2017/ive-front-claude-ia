"use client";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { AvatarIlus } from "@/components/shared/avatar-ilus";

const DEPOS = [
  { seed: 0, n: "Ana Paula Oliveira", r: "Mãe do Miguel, 7 anos", q: "Depois de passar por vários lugares, finalmente encontramos um espaço onde o Miguel é verdadeiramente acolhido. Os profissionais respeitam o tempo dele, celebram cada conquista e nos orientam com paciência e carinho." },
  { seed: 1, n: "Renata Mendes", r: "Mãe da Sofia, 6 anos", q: "Antes de chegar aqui, a gente ia de clínica em clínica. O diferencial foi ter tudo no mesmo lugar e conseguir falar com os profissionais pelo sistema. A Sofia evoluiu muito em 8 meses." },
  { seed: 2, n: "Carlos e Amanda Costa", r: "Pais do Thiago, 4 anos", q: "O processo de avaliação foi sério, o plano foi explicado direitinho. A plataforma ajuda demais a gente a não perder o fio do tratamento. Sinto que somos parceiros da equipe." },
  { seed: 3, n: "Fernanda Lima", r: "Mãe do Enzo, 7 anos", q: "O canal de mensagens com a fonoaudióloga mudou tudo. Não precisei esperar a consulta do mês seguinte pra tirar dúvidas sobre o que fazer em casa com meu filho." },
  { seed: 4, n: "Paulo Rodrigues", r: "Pai da Isabela, 5 anos", q: "A Isabela chegou aqui muito fechada, sem contato visual. Hoje ela brinca, se comunica e nos surpreende todo dia. A equipe do Instituto fez um trabalho que a gente não acreditava ser possível." },
];

export function Depoimentos() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % DEPOS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const d = DEPOS[idx];
  return (
    <section className="py-24 bg-(--color-g50)" id="depoimentos">
      <div className="wrap">
        <div className="text-center max-w-lg mx-auto">
          <div className="text-[11px] font-bold text-(--color-g500) tracking-[1.2px] uppercase mb-2.5">
            O Que Dizem as Famílias
          </div>
          <h2 className="text-[38px] font-extrabold tracking-tight leading-[1.18]">
            Depoimentos reais de pais e responsáveis
          </h2>
        </div>
        <div className="max-w-3xl mx-auto mt-14">
          <div
            key={idx}
            className="bg-white border border-(--color-border-soft) rounded-3xl p-12 shadow-md relative animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="absolute top-7 right-9 text-[80px] text-(--color-g100) font-serif leading-none pointer-events-none select-none">
              "
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full border-[3px] border-(--color-g500) overflow-hidden bg-(--color-g50) flex items-center justify-center">
                  <AvatarIlus seed={d.seed} size={60} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-(--color-g500) border-2 border-white flex items-center justify-center">
                  <Check size={10} color="white" />
                </div>
              </div>
              <div>
                <div className="text-base font-bold">{d.n}</div>
                <div className="text-[13px] text-(--color-muted) mt-0.5">{d.r}</div>
              </div>
            </div>
            <p className="text-base text-(--color-text) leading-[1.85] italic">"{d.q}"</p>
          </div>
          <div className="flex gap-2 justify-center mt-7">
            {DEPOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-7 bg-(--color-g500)" : "w-2 bg-(--color-g500)/20"
                }`}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
          <div className="text-center mt-6 text-sm text-(--color-muted)">
            Mais de <strong className="text-(--color-g600)">200 famílias</strong> já confiaram no nosso trabalho
          </div>
        </div>
      </div>
    </section>
  );
}
