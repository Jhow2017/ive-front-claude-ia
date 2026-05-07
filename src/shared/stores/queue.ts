"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type QueueStatus = "agendado" | "aguardando" | "em_atendimento" | "concluido";

export interface QueueItem {
    id: string;
    name: string;
    sala: string;
    prof: string;
    spec: string;
    hora: string;
    chegada: string | null;
    status: QueueStatus;
    seed: number;
}

interface QueueState {
    items: QueueItem[];
    chamando: QueueItem | null;
    confirmarChegada: (id: string) => void;
    desfazer: (id: string) => void;
    chamar: (id: string) => void;
    finalizar: (autoNext: boolean) => void;
}

const seedItems: QueueItem[] = [
    {
        id: "q1",
        name: "Lucas Costa",
        sala: "Sala 3",
        prof: "Dra. Renata Lima",
        spec: "Fonoaudiologia",
        hora: "09:00",
        chegada: "08:52",
        status: "aguardando",
        seed: 0,
    },
    {
        id: "q2",
        name: "Beatriz Alves",
        sala: "Sala 3",
        prof: "Dra. Renata Lima",
        spec: "Fonoaudiologia",
        hora: "10:00",
        chegada: "09:48",
        status: "aguardando",
        seed: 1,
    },
    {
        id: "q3",
        name: "Maria Oliveira",
        sala: "Sala 1",
        prof: "Profa. Cíntia Rocha",
        spec: "Terapia Ocup.",
        hora: "09:30",
        chegada: "09:20",
        status: "em_atendimento",
        seed: 2,
    },
    {
        id: "q4",
        name: "Pedro Santos",
        sala: "Sala 2",
        prof: "Dra. Mariana Souza",
        spec: "Psicologia",
        hora: "10:30",
        chegada: "10:21",
        status: "aguardando",
        seed: 3,
    },
    {
        id: "q5",
        name: "Ana Lima",
        sala: "Sala 4",
        prof: "Dr. Rafael Cunha",
        spec: "Neuropsicologia",
        hora: "11:00",
        chegada: null,
        status: "agendado",
        seed: 4,
    },
    {
        id: "q6",
        name: "Carlos Rocha",
        sala: "Sala 3",
        prof: "Dra. Renata Lima",
        spec: "Fonoaudiologia",
        hora: "11:30",
        chegada: null,
        status: "agendado",
        seed: 5,
    },
];

function speakAndBeep(name: string, sala: string) {
    if (typeof window === "undefined") return;
    try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        [880, 660, 880].forEach((f, i) => {
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.connect(g);
            g.connect(ctx.destination);
            o.frequency.value = f;
            o.type = "sine";
            const t0 = ctx.currentTime + i * 0.18;
            g.gain.setValueAtTime(0, t0);
            g.gain.linearRampToValueAtTime(0.3, t0 + 0.02);
            g.gain.linearRampToValueAtTime(0, t0 + 0.15);
            o.start(t0);
            o.stop(t0 + 0.16);
        });
    } catch {}
    setTimeout(() => {
        try {
            const u = new SpeechSynthesisUtterance(`${name}, dirija-se à ${sala}`);
            u.lang = "pt-BR";
            u.rate = 0.95;
            speechSynthesis.cancel();
            speechSynthesis.speak(u);
        } catch {}
    }, 600);
}

export const useQueue = create<QueueState>()(
    persist(
        (set, get) => ({
            items: seedItems,
            chamando: null,
            confirmarChegada: (id) => {
                const now = new Date();
                const hh = String(now.getHours()).padStart(2, "0");
                const mm = String(now.getMinutes()).padStart(2, "0");
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, status: "aguardando", chegada: `${hh}:${mm}` } : i
                    ),
                });
            },
            desfazer: (id) =>
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, status: "agendado", chegada: null } : i
                    ),
                }),
            chamar: (id) => {
                const p = get().items.find((i) => i.id === id);
                if (!p) return;
                speakAndBeep(p.name, p.sala);
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, status: "em_atendimento" } : i
                    ),
                    chamando: p,
                });
            },
            finalizar: (autoNext) => {
                const items = get().items.slice();
                const cur = items.find((i) => i.status === "em_atendimento");
                if (!cur) return;
                const idx = items.findIndex((i) => i.id === cur.id);
                items[idx] = { ...items[idx], status: "concluido" };
                let chamando: QueueItem | null = null;
                if (autoNext) {
                    const next = items.find((i) => i.status === "aguardando");
                    if (next) {
                        const ni = items.findIndex((i) => i.id === next.id);
                        items[ni] = { ...items[ni], status: "em_atendimento" };
                        chamando = next;
                        speakAndBeep(next.name, next.sala);
                    }
                }
                set({ items, chamando });
            },
        }),
        { name: "ive-queue-v1" }
    )
);
