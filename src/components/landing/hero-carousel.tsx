"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroMockup } from "./hero-mockup";
import { IllusTherapy, IllusBlocks } from "./illus";

interface Slide {
    cls: "s1" | "s2" | "s3";
    chip: string;
    h1: string;
    sub: string;
    cta: string;
    right: "mockup" | "therapy" | "blocks";
}

const SLIDES: Slide[] = [
    {
        cls: "s1",
        chip: "Atendimento multidisciplinar",
        h1: "Especialistas em autismo, processo integrado.",
        sub: "Psicologia, fonoaudiologia, terapia ocupacional e neuropsicologia em um só lugar — com plataforma digital para acompanhar cada etapa do tratamento.",
        cta: "Agendar avaliação inicial",
        right: "mockup",
    },
    {
        cls: "s2",
        chip: "Cada conquista merece ser celebrada",
        h1: "Seu filho se desenvolve. Você acompanha tudo.",
        sub: "O Instituto Verde Esperança conecta atendimento clínico especializado com uma plataforma para que pais acompanhem evolução, agenda e equipe em tempo real.",
        cta: "Conhecer a plataforma",
        right: "therapy",
    },
    {
        cls: "s3",
        chip: "Cuidado que vai além da clínica",
        h1: "Cuidado especializado. Resultados acompanháveis.",
        sub: "Um instituto com foco em crianças autistas — equipe especializada, metodologia baseada em evidências e sistema digital que conecta família e profissionais.",
        cta: "Iniciar cadastro",
        right: "blocks",
    },
];

const STAGE_BG = {
    s1: "bg-white",
    s2: "bg-(--color-g500)",
    s3: "bg-[#fef3e2]",
} as const;

const STATS = [
    { v: "312+", l: "crianças atendidas" },
    { v: "8", l: "especialidades" },
    { v: "94%", l: "melhora em 6 meses" },
];

export function HeroCarousel() {
    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);
    const stageRef = useRef<HTMLDivElement>(null);
    const [w, setW] = useState(0);

    useEffect(() => {
        const upd = () => setW(stageRef.current?.offsetWidth ?? 0);
        upd();
        const ro = new ResizeObserver(upd);
        if (stageRef.current) ro.observe(stageRef.current);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        if (paused) return;
        const t = setInterval(() => setIdx((s) => (s + 1) % SLIDES.length), 5800);
        return () => clearInterval(t);
    }, [paused]);

    const go = (n: number) => setIdx((n + SLIDES.length) % SLIDES.length);
    const cur = SLIDES[idx];
    const isDark = cur.cls === "s2";

    const right = (r: Slide["right"]) => {
        if (r === "mockup") return <HeroMockup />;
        if (r === "therapy")
            return (
                <div className="flex justify-center items-end">
                    <IllusTherapy />
                </div>
            );
        return (
            <div className="flex justify-center items-end">
                <IllusBlocks />
            </div>
        );
    };

    return (
        <div
            ref={stageRef}
            className="relative overflow-hidden mt-[68px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)]"
                style={{ transform: `translateX(-${idx * w}px)` }}
            >
                {SLIDES.map((sl, i) => (
                    <div
                        key={i}
                        className={`shrink-0 min-h-[calc(100vh-68px)] flex items-center py-14 relative overflow-hidden ${STAGE_BG[sl.cls]}`}
                        style={{ width: w || "100%" }}
                    >
                        <div className="wrap w-full">
                            <div className="grid md:grid-cols-2 gap-16 items-center relative z-[2] w-full">
                                <div>
                                    <div
                                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide ${
                                            isDark
                                                ? "bg-white/20 border border-white/35 text-white"
                                                : "bg-(--color-g50) border border-(--color-g100) text-(--color-g600)"
                                        }`}
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{
                                                background: isDark
                                                    ? "rgba(255,255,255,.7)"
                                                    : "var(--color-g500)",
                                            }}
                                        />
                                        {sl.chip}
                                    </div>
                                    <h1
                                        className={`text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4 ${
                                            isDark ? "text-white" : "text-(--color-text)"
                                        }`}
                                    >
                                        {sl.h1}
                                    </h1>
                                    <p
                                        className={`text-base leading-relaxed mb-7 max-w-[490px] ${
                                            isDark ? "text-white/85" : "text-(--color-muted)"
                                        }`}
                                    >
                                        {sl.sub}
                                    </p>
                                    <div className="flex gap-3 flex-wrap">
                                        <Button size="xl">
                                            {sl.cta} <ArrowRight size={16} />
                                        </Button>
                                        <Button
                                            size="xl"
                                            variant="outline"
                                            className={
                                                isDark
                                                    ? "bg-transparent !text-white !border-white/40"
                                                    : ""
                                            }
                                        >
                                            Ver como funciona
                                        </Button>
                                    </div>
                                    <div
                                        className={`flex gap-8 mt-9 pt-9 border-t ${
                                            isDark
                                                ? "border-white/20"
                                                : "border-(--color-border-soft)"
                                        }`}
                                    >
                                        {STATS.map((st, j) => (
                                            <div key={j}>
                                                <div
                                                    className={`text-[22px] font-extrabold tracking-tight ${
                                                        isDark
                                                            ? "text-white"
                                                            : "text-(--color-text)"
                                                    }`}
                                                >
                                                    {st.v}
                                                </div>
                                                <div
                                                    className={`text-[11px] mt-0.5 ${
                                                        isDark
                                                            ? "text-white/65"
                                                            : "text-(--color-muted)"
                                                    }`}
                                                >
                                                    {st.l}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {right(sl.right)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* dots */}
            <div className="flex gap-2 justify-center py-6 relative z-[3]">
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => go(i)}
                        className={`h-2 rounded-full transition-all ${
                            idx === i
                                ? `w-7 ${isDark ? "bg-white" : "bg-(--color-g500)"}`
                                : `w-2 ${isDark ? "bg-white/30" : "bg-(--color-g500)/20"}`
                        }`}
                        aria-label={`Slide ${i + 1}`}
                    />
                ))}
            </div>

            <button
                onClick={() => go(idx - 1)}
                className={`absolute top-1/2 -translate-y-1/2 left-6 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shadow-md z-10 hidden md:flex ${
                    isDark
                        ? "bg-white/15 border border-white/25 text-white"
                        : "bg-white border border-(--color-border-soft) text-(--color-muted) hover:text-(--color-g500)"
                }`}
                aria-label="Anterior"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={() => go(idx + 1)}
                className={`absolute top-1/2 -translate-y-1/2 right-6 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shadow-md z-10 hidden md:flex ${
                    isDark
                        ? "bg-white/15 border border-white/25 text-white"
                        : "bg-white border border-(--color-border-soft) text-(--color-muted) hover:text-(--color-g500)"
                }`}
                aria-label="Próximo"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}
