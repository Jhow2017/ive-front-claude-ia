const HIGHS = [
  {
    t: "Por que o foco em autismo?",
    d: "O atendimento eficaz exige integração real entre especialidades — algo que clínicas generalistas raramente oferecem de forma estruturada. Nosso foco permite especialização profunda e protocolos específicos.",
  },
  {
    t: "Metodologia baseada em evidências",
    d: "Utilizamos abordagens com suporte científico: ABA, PECS, integração sensorial e intervenção precoce. Sem modismos ou promessas sem respaldo.",
  },
  {
    t: "A família como parte do processo",
    d: "Pais participam ativamente — com acesso ao plano terapêutico, às metas por especialidade e à comunicação direta com a equipe. O tratamento não termina na porta da clínica.",
  },
];

export function Sobre() {
  return (
    <section className="py-24 bg-white" id="sobre">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="text-[11px] font-bold text-(--color-g500) tracking-[1.2px] uppercase mb-2.5">
              Sobre o Instituto
            </div>
            <h2 className="text-[38px] font-extrabold tracking-tight leading-[1.18] mb-4">
              Por que existimos e o que nos diferencia
            </h2>
            <div className="flex flex-col gap-4 text-[15px] text-(--color-muted) leading-[1.85]">
              <p>
                Fundado em 2021, o Instituto Verde Esperança surgiu de uma constatação prática: famílias com
                crianças autistas enfrentavam processos longos de diagnóstico, atendimento fragmentado entre
                clínicas e dificuldade para entender o que estava acontecendo no tratamento do filho.
              </p>
              <p>
                Nossa resposta foi centralizar especialidades complementares em um único espaço — e desenvolver
                uma plataforma para que pais acompanhem o processo com clareza, não apenas recebam relatórios mensais.
              </p>
              <p>
                Não somos uma clínica genérica. Somos um instituto com foco definido, protocolo próprio e um
                sistema que conecta equipe clínica e família de forma contínua.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            {HIGHS.map((h, i) => (
              <div
                key={i}
                className="px-6 py-5 bg-(--color-g50) rounded-xl border border-(--color-g100)"
              >
                <h4 className="text-sm font-bold text-(--color-g700) mb-1.5">{h.t}</h4>
                <p className="text-[13px] text-(--color-muted) leading-relaxed">{h.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
