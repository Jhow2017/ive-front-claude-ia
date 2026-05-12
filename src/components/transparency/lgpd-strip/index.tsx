export function LgpdStrip() {
    return (
        <section className="bg-(--color-text) text-white py-12">
            <div className="wrap">
                <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                    <div>
                        <h3 className="text-[22px] font-extrabold tracking-[-.5px] mb-2">
                            Proteção de dados (LGPD)
                        </h3>
                        <p className="text-sm text-white/70 leading-[1.65] max-w-[680px]">
                            Tratamos dados de famílias, beneficiários e doadores com base legal
                            definida (consentimento, execução de contrato, obrigação legal e
                            legítimo interesse, conforme o caso). Encarregada de dados nomeada
                            conforme art. 41 da <strong>Lei 13.709/2018</strong>. Você pode
                            solicitar acesso, correção ou exclusão dos seus dados pelo canal da{" "}
                            <a
                                href="#ouvidoria"
                                className="text-(--color-g200) underline underline-offset-2"
                            >
                                ouvidoria
                            </a>
                            .
                        </p>
                    </div>
                    <div className="flex gap-2.5 flex-wrap">
                        <a
                            href="#"
                            className="inline-flex items-center gap-1.5 bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30 text-sm font-semibold px-[18px] py-2.5 rounded-lg transition-colors no-underline"
                        >
                            Política de privacidade
                        </a>
                        <a
                            href="#ouvidoria"
                            className="inline-flex items-center gap-1.5 bg-(--color-g500) hover:bg-(--color-g600) text-white text-sm font-semibold px-[18px] py-2.5 rounded-lg transition-colors no-underline"
                        >
                            Solicitar meus dados
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
