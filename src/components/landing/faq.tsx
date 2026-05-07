"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "Atendem pelo plano de saúde?", a: "Alguns convênios são aceitos. O atendimento particular também está disponível. Entre em contato informando seu plano para verificarmos a cobertura." },
  { q: "Qual é a faixa etária atendida?", a: "Crianças de 2 a 16 anos. Para adolescentes acima de 12 anos, o plano terapêutico é adaptado para a faixa etária e contexto escolar." },
  { q: "Precisa ter diagnóstico fechado para começar?", a: "Não. Realizamos a avaliação diagnóstica quando necessário. Muitas famílias chegam com suspeita e finalizamos o processo diagnóstico internamente." },
  { q: "Como funciona a plataforma para os pais?", a: "Após o cadastro, você recebe acesso a uma área exclusiva com agenda de sessões, relatórios por especialidade, histórico de evolução e canal direto com os profissionais." },
  { q: "Os profissionais trabalham juntos ou são independentes?", a: "Todos fazem parte da equipe fixa do Instituto. Há reuniões mensais de equipe sobre cada paciente ativo, onde os profissionais alinham metas de forma integrada." },
  { q: "Qual o prazo até a primeira consulta?", a: "Atualmente entre 2 e 4 semanas após o primeiro contato, dependendo da disponibilidade de agenda e da especialidade prioritária identificada." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 bg-white" id="faq">
      <div className="wrap">
        <div className="text-center max-w-md mx-auto">
          <div className="text-[11px] font-bold text-(--color-g500) tracking-[1.2px] uppercase mb-2.5">FAQ</div>
          <h2 className="text-[38px] font-extrabold tracking-tight leading-[1.18]">Perguntas frequentes</h2>
        </div>
        <div className="max-w-2xl mx-auto mt-14">
          {FAQS.map((item, i) => (
            <div key={i} className="border-b border-(--color-border-soft)">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex justify-between items-center py-5 cursor-pointer w-full text-left gap-4"
              >
                <span className="text-[15px] font-semibold">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-(--color-muted) transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="text-sm text-(--color-muted) leading-relaxed pb-5">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
