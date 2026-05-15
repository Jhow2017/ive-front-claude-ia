import type { Role } from "@/shared/stores/auth";

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
                label: "Usuários",
                icon: "users",
                children: [
                    { id: "pacientes-lista", label: "Lista de Usuários", href: "/patients" },
                    { id: "pacientes-novo", label: "Novo Usuário", href: "/patients/new" },
                ],
            },
            {
                id: "profissionais",
                label: "Profissionais",
                icon: "stethoscope",
                children: [
                    { id: "profissionais-lista", label: "Lista", href: "/professionals" },
                    { id: "profissionais-escalas", label: "Escalas", href: "/schedules" },
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
                    { id: "consultas-historico", label: "Histórico", href: "/history" },
                ],
            },
            { id: "diagnosticos", label: "Diagnósticos", icon: "activity", href: "/diagnoses" },
            { id: "prontuarios", label: "Prontuários", icon: "file", href: "/medical-records" },
            { id: "relatorios", label: "Relatórios", icon: "bar", href: "/reports" },
            { id: "mensagens", label: "Mensagens", icon: "msg", href: "/messages", badge: 3 },
        ],
    },
    {
        grp: "Operação",
        items: [
            { id: "triagem", label: "Triagem / Recepção", icon: "check", href: "/triage" },
            { id: "painel", label: "Painel da TV", icon: "monitor", href: "/panel" },
        ],
    },
    {
        grp: "Conta",
        items: [
            {
                id: "configuracoes",
                label: "Configurações",
                icon: "settings",
                href: "/settings",
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
                label: "Meus Usuários",
                icon: "users",
                children: [
                    { id: "pacientes-lista", label: "Lista de Usuários", href: "/patients" },
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
                    { id: "consultas-historico", label: "Histórico", href: "/history" },
                ],
            },
            { id: "diagnosticos", label: "Diagnósticos", icon: "activity", href: "/diagnoses" },
            { id: "prontuarios", label: "Prontuários", icon: "file", href: "/medical-records" },
            { id: "relatorios", label: "Relatórios", icon: "bar", href: "/reports" },
            { id: "mensagens", label: "Mensagens", icon: "msg", href: "/messages", badge: 2 },
        ],
    },
    {
        grp: "Operação",
        items: [
            { id: "atendimento", label: "Meu Atendimento", icon: "check", href: "/appointments" },
        ],
    },
    {
        grp: "Conta",
        items: [
            {
                id: "configuracoes",
                label: "Configurações",
                icon: "settings",
                href: "/settings",
            },
        ],
    },
];

const NAV_USUARIO: NavGroup[] = [
    {
        grp: "Principal",
        items: [
            { id: "home", label: "Início", icon: "home", href: "/home" },
            { id: "consultas-agenda", label: "Agenda", icon: "calendar", href: "/agenda" },
            { id: "prontuarios", label: "Prontuário", icon: "file", href: "/medical-records" },
        ],
    },
    {
        grp: "Comunicação",
        items: [
            { id: "mensagens", label: "Mensagens", icon: "msg", href: "/messages", badge: 2 },
            { id: "relatorios", label: "Relatórios", icon: "bar", href: "/reports" },
        ],
    },
    {
        grp: "Conta",
        items: [
            {
                id: "configuracoes",
                label: "Configurações",
                icon: "settings",
                href: "/settings",
            },
        ],
    },
];

export function getNav(role: Role): NavGroup[] {
    if (role === "admin") return NAV_ADMIN;
    if (role === "profissional") return NAV_PROF;
    return NAV_USUARIO;
}

export const PAGE_TITLES: Record<string, string> = {
    "/home": "Início",
    "/patients": "Lista de Usuários",
    "/patients/new": "Novo Usuário",
    "/professionals": "Profissionais",
    "/schedules": "Escalas de Atendimento",
    "/agenda": "Agenda",
    "/history": "Histórico de Consultas",
    "/diagnoses": "Diagnósticos",
    "/medical-records": "Prontuários",
    "/reports": "Relatórios",
    "/messages": "Mensagens",
    "/settings": "Configurações",
    "/triage": "Triagem / Recepção",
    "/panel": "Painel da TV",
    "/appointments": "Meu Atendimento",
    "/profile": "Meu Perfil",
    "/change-password": "Trocar Senha",
    "/help": "Ajuda e Suporte",
};
