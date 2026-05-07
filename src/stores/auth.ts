"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "admin" | "profissional" | "familia";

export interface AuthState {
    role: Role;
    isAuthenticated: boolean;
    email: string | null;
    setRole: (role: Role) => void;
    login: (role: Role, email?: string) => void;
    logout: () => void;
    cycleRole: () => void;
}

export const profileForRole: Record<
    Role,
    { init: string; name: string; role: string; sub: string }
> = {
    admin: {
        init: "AD",
        name: "Administrador",
        role: "Admin",
        sub: "admin@iverde.com.br",
    },
    profissional: {
        init: "RL",
        name: "Dra. Renata Lima",
        role: "Fonoaudióloga",
        sub: "renata@iverde.com.br",
    },
    familia: {
        init: "FC",
        name: "Família Costa",
        role: "Responsável",
        sub: "costa@email.com",
    },
};

export const useAuth = create<AuthState>()(
    persist(
        (set, get) => ({
            role: "admin",
            isAuthenticated: false,
            email: null,
            setRole: (role) => set({ role }),
            login: (role, email) =>
                set({ role, isAuthenticated: true, email: email ?? profileForRole[role].sub }),
            logout: () => set({ isAuthenticated: false, email: null }),
            cycleRole: () => {
                const r = get().role;
                const next: Role =
                    r === "admin" ? "profissional" : r === "profissional" ? "familia" : "admin";
                set({ role: next });
            },
        }),
        { name: "ive-auth" }
    )
);
