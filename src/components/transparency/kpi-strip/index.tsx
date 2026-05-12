const KPIS = [
    {
        lbl: "Receita 2025",
        val: "R$ 4,82",
        unit: "M",
        foot: (
            <>
                <span className="text-(--color-g500) font-bold">↑ 18%</span> vs. 2024
            </>
        ),
        bar: 78,
    },
    {
        lbl: "Aplicado na missão",
        val: "87,4",
        unit: "%",
        foot: "12,6% em estrutura e administração",
        bar: 87,
    },
    {
        lbl: "Doadores ativos",
        val: "1.247",
        unit: "",
        foot: (
            <>
                <span className="text-(--color-g500) font-bold">↑ 312</span> novos em 2025
            </>
        ),
        bar: 64,
    },
    {
        lbl: "Convênios públicos",
        val: "6",
        unit: "",
        foot: "3 federais · 2 estaduais · 1 municipal",
        bar: 50,
    },
];

export function KpiStrip() {
    return (
        <section className="bg-white border-b border-(--color-border-soft)">
            <div className="wrap">
                <div className="grid grid-cols-2 lg:grid-cols-4">
                    {KPIS.map((k, i) => (
                        <div
                            key={k.lbl}
                            className={`px-7 py-8 ${i < 3 ? "lg:border-r border-(--color-border-soft)" : ""} ${i < 2 ? "border-b lg:border-b-0 border-(--color-border-soft)" : ""}`}
                        >
                            <div className="text-[11px] font-bold text-(--color-muted) tracking-[1.2px] uppercase mb-2.5">
                                {k.lbl}
                            </div>
                            <div className="text-[34px] font-extrabold tracking-[-1.2px] leading-none">
                                {k.val}
                                {k.unit ? (
                                    <small className="text-[18px] font-semibold text-(--color-muted) ml-[3px]">
                                        {k.unit}
                                    </small>
                                ) : null}
                            </div>
                            <div className="text-xs text-(--color-muted) mt-2 flex items-center gap-1.5">
                                {k.foot}
                            </div>
                            <div className="h-1 bg-(--color-g50) rounded-full mt-3.5 overflow-hidden">
                                <div
                                    className="h-full bg-(--color-g500) rounded-full"
                                    style={{ width: `${k.bar}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
