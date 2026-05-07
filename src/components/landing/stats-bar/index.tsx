const STATS = [
    { n: "312", u: "+", d: "crianças atendidas desde 2021" },
    { n: "94", u: "%", d: "famílias relatam evolução em 6 meses" },
    { n: "47", u: "", d: "crianças no programa social em 2024" },
    { n: "8", u: "", d: "especialidades integradas" },
];

export function StatsBar() {
    return (
        <div className="bg-(--color-g500) py-12">
            <div className="wrap">
                <div className="grid grid-cols-2 md:grid-cols-4">
                    {STATS.map((s, i) => (
                        <div
                            key={i}
                            className={`text-center px-5 ${
                                i > 0 ? "md:border-l border-white/20" : ""
                            }`}
                        >
                            <div className="text-[38px] font-extrabold text-white tracking-tight">
                                {s.n}
                                <span className="text-white/55">{s.u}</span>
                            </div>
                            <div className="text-[13px] text-white/65 mt-1.5 leading-snug">
                                {s.d}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
