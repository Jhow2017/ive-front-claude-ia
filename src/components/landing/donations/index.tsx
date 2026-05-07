"use client";
import { Users, Zap, Activity, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUI } from "@/stores/ui";

const STATS = [
    { Ic: Users, v: "47", l: "crianças atendidas via programa social em 2024" },
    { Ic: Zap, v: "R$ 84k", l: "investidos em atendimentos gratuitos no último ano" },
    { Ic: Activity, v: "3", l: "parcerias com escolas da rede pública municipal" },
];

export function Donations() {
    const setOpen = useUI((s) => s.setDonationOpen);
    return (
        <section className="py-24 bg-(--color-g700)" id="doacoes">
            <div className="wrap">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    <div>
                        <div className="text-[11px] font-bold text-(--color-g200) tracking-[1.2px] uppercase mb-2.5">
                            Doações
                        </div>
                        <h2 className="text-[38px] font-extrabold text-white tracking-tight leading-[1.18] mb-4">
                            Seu apoio financia atendimento gratuito
                        </h2>
                        <div className="flex flex-col gap-4 text-[15px] text-white/75 leading-[1.85]">
                            <p>
                                Os recursos de doação são destinados integralmente ao{" "}
                                <strong className="text-white">Programa de Acesso Social</strong> —
                                que oferece atendimento gratuito ou subsidiado para famílias em
                                vulnerabilidade socioeconômica.
                            </p>
                            <p>
                                Toda doação é registrada e auditável. Publicamos um{" "}
                                <strong className="text-white">
                                    relatório de impacto semestral
                                </strong>{" "}
                                com valores recebidos, crianças atendidas e resultados observados.
                            </p>
                            <p>
                                Em 2024, o programa atendeu{" "}
                                <strong className="text-white">47 crianças</strong> que não teriam
                                acesso ao tratamento de outra forma.
                            </p>
                        </div>
                        <Button
                            size="xl"
                            className="bg-white text-(--color-g600) hover:bg-white/90 mt-6 font-bold"
                            onClick={() => setOpen(true)}
                        >
                            Fazer uma doação <Heart size={16} color="var(--color-g500)" />
                        </Button>
                    </div>
                    <div className="flex flex-col gap-3.5">
                        {STATS.map((s, i) => (
                            <div
                                key={i}
                                className="flex gap-4 items-center bg-white/10 border border-white/15 rounded-xl p-5"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                                    <s.Ic size={22} color="var(--color-g200)" />
                                </div>
                                <div>
                                    <div className="text-[22px] font-extrabold text-white tracking-tight">
                                        {s.v}
                                    </div>
                                    <div className="text-xs text-white/60 mt-0.5 leading-snug">
                                        {s.l}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
