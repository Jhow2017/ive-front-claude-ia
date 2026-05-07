import type { Role } from "@/stores/auth";

export interface NavChild {
    id: string;
    label: string;
    href: string;
}
export interface NavItem {
    id: string;
    label: string;
    icon: string;
    href?: string;
    badge?: number;
    children?: NavChild[];
}
export interface NavGroup {
    grp: string;
    items: NavItem[];
}

const NAV_ADMIN: NavGroup[] = [
    {
        grp: "Principal",
        items: [
            { id: "home", label: "Início", icon: "home", href: "/home" },
            {
                id: "pacientes",
                label: "Pacientes",
                icon: "users",
                children: [
                    { id: "pacientes-lista", label: "Lista de Pacientes", href: "/pacientes" },
                    { id: "pacientes-novo", label: "Novo Paciente", href: "/pacientes/novo" },
                ],
            },
            {
                id: "profissionais",
                label: "Profissionais",
                icon: "stethoscope",
                children: [
                    { id: "profissionais-lista", label: "Lista", href: "/profissionais" },
                    { id: "profissionais-escalas", label: "Escalas", href: "/escalas" },
                ],
            },
        ],
    },
    {
        grp: "Clínico",
        items: [
            {
                id: "consultas",
                label: "Consultas",
                icon: "calendar",
                children: [
                    { id: "consultas-agenda", label: "Agenda", href: "/agenda" },
                    { id: "consultas-historico", label: "Histórico", href: "/historico" },
                ],
            },
            { id: "diagnosticos", label: "Diagnósticos", icon: "activity", href: "/diagnosticos" },
            { id: "prontuarios", label: "Prontuários", icon: "file", href: "/prontuarios" },
            { id: "relatorios", label: "Relatórios", icon: "bar", href: "/relatorios" },
            { id: "mensagens", label: "Mensagens", icon: "msg", href: "/mensagens", badge: 3 },
        ],
    },
    {
        grp: "Operação",
        items: [
            { id: "triagem", label: "Triagem / Recepção", icon: "check", href: "/triagem" },
            { id: "painel", label: "Painel da TV", icon: "monitor", href: "/painel" },
        ],
    },
    {
        grp: "Conta",
        items: [
            {
                id: "configuracoes",
                label: "Configurações",
                icon: "settings",
                href: "/configuracoes",
            },
        ],
    },
];

const NAV_PROF: NavGroup[] = [
    {
        grp: "Principal",
        items: [
            { id: "home", label: "Início", icon: "home", href: "/home" },
            {
                id: "pacientes",
                label: "Meus Pacientes",
                icon: "users",
                children: [
                    { id: "pacientes-lista", label: "Lista de Pacientes", href: "/pacientes" },
                ],
            },
        ],
    },
    {
        grp: "Clínico",
        items: [
            {
                id: "consultas",
                label: "Consultas",
                icon: "calendar",
                children: [
                    { id: "consultas-agenda", label: "Agenda", href: "/agenda" },
                    { id: "consultas-historico", label: "Histórico", href: "/historico" },
                ],
            },
            { id: "diagnosticos", label: "Diagnósticos", icon: "activity", href: "/diagnosticos" },
            { id: "prontuarios", label: "Prontuários", icon: "file", href: "/prontuarios" },
            { id: "relatorios", label: "Relatórios", icon: "bar", href: "/relatorios" },
            { id: "mensagens", label: "Mensagens", icon: "msg", href: "/mensagens", badge: 2 },
        ],
    },
    {
        grp: "Operação",
        items: [
            { id: "atendimento", label: "Meu Atendimento", icon: "check", href: "/atendimento" },
        ],
    },
    {
        grp: "Conta",
        items: [
            {
                id: "configuracoes",
                label: "Configurações",
                icon: "settings",
                href: "/configuracoes",
            },
        ],
    },
];

const NAV_FAMILIA: NavGroup[] = [
    {
        grp: "Principal",
        items: [
            { id: "home", label: "Início", icon: "home", href: "/home" },
            { id: "consultas-agenda", label: "Agenda", icon: "calendar", href: "/agenda" },
            { id: "prontuarios", label: "Prontuário", icon: "file", href: "/prontuarios" },
        ],
    },
    {
        grp: "Comunicação",
        items: [
            { id: "mensagens", label: "Mensagens", icon: "msg", href: "/mensagens", badge: 2 },
            { id: "relatorios", label: "Relatórios", icon: "bar", href: "/relatorios" },
        ],
    },
    {
        grp: "Conta",
        items: [
            {
                id: "configuracoes",
                label: "Configurações",
                icon: "settings",
                href: "/configuracoes",
            },
        ],
    },
];

export function getNav(role: Role): NavGroup[] {
    if (role === "admin") return NAV_ADMIN;
    if (role === "profissional") return NAV_PROF;
    return NAV_FAMILIA;
}

export const PAGE_TITLES: Record<string, string> = {
    "/home": "Início",
    "/pacientes": "Lista de Pacientes",
    "/pacientes/novo": "Novo Paciente",
    "/profissionais": "Profissionais",
    "/escalas": "Escalas de Atendimento",
    "/agenda": "Agenda",
    "/historico": "Histórico de Consultas",
    "/diagnosticos": "Diagnósticos",
    "/prontuarios": "Prontuários",
    "/relatorios": "Relatórios",
    "/mensagens": "Mensagens",
    "/configuracoes": "Configurações",
    "/triagem": "Triagem / Recepção",
    "/painel": "Painel da TV",
    "/atendimento": "Meu Atendimento",
};
