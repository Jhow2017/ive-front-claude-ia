"use client";
import { useState } from "react";
import { MessageSquare, Mail, Phone, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CHANNELS: { ic: LucideIcon; t: string; s: string; color: string }[] = [
    { ic: MessageSquare, t: "Chat ao vivo", s: "Resposta em ~2 min", color: "#259a43" },
    { ic: Mail, t: "E-mail", s: "suporte@iverde.com.br", color: "#3b82f6" },
    { ic: Phone, t: "Telefone", s: "(11) 4002-8922", color: "#7c3aed" },
];

const FAQS = [
    {
        q: "Como agendar uma sessão?",
        a: 'No menu lateral acesse Consultas > Agenda e clique em "Nova consulta". Selecione o paciente, profissional, data e horário.',
    },
    {
        q: "Como cadastrar um novo paciente?",
        a: 'Em Pacientes > Lista de Pacientes, clique em "Novo paciente". Preencha as informações em cada seção (Pessoais, Endereço, Contato, Plano).',
    },
    {
        q: "Como funciona o Painel da TV?",
        a: 'O Painel exibe em tempo real os pacientes em atendimento. O Admin confirma a chegada em Triagem; o Profissional chama o paciente em "Meu Atendimento" — o nome aparece no painel com bipe sonoro.',
    },
    {
        q: "Como configurar mensagens automáticas?",
        a: "Em Configurações > Mensagens automáticas você pode ativar/desativar WhatsApp e E-mail, escolher quando enviar e personalizar o template com variáveis.",
    },
    {
        q: "Como gerar relatórios?",
        a: 'Acesse Relatórios no menu lateral. Escolha o tipo de relatório, período e clique em "Exportar PDF" ou "Exportar Excel".',
    },
    {
        q: "Esqueci minha senha, e agora?",
        a: 'Na tela de login, clique em "Esqueci minha senha". Você receberá um e-mail com instruções para criar uma nova senha.',
    },
];

export function HelpView() {
    const [open, setOpen] = useState(0);
    const [search, setSearch] = useState("");
    const q = search.toLowerCase();
    const filtered = FAQS.filter(
        (f) => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );

    return (
        <>
            <div>
                <div className="text-[22px] font-extrabold tracking-tight">Ajuda e Suporte</div>
                <div className="text-[13px] text-(--color-muted) mt-0.5">
                    Encontre respostas ou fale com nossa equipe
                </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3.5">
                {CHANNELS.map((c) => {
                    const Icon = c.ic;
                    return (
                        <Card
                            key={c.t}
                            className="cursor-pointer transition-transform hover:-translate-y-0.5"
                        >
                            <CardContent>
                                <div
                                    className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-2.5"
                                    style={{ background: `${c.color}1a` }}
                                >
                                    <Icon size={20} style={{ color: c.color }} />
                                </div>
                                <div className="text-sm font-bold">{c.t}</div>
                                <div className="text-xs text-(--color-muted) mt-0.5">{c.s}</div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Card>
                <CardContent>
                    <CardHeader>
                        <CardTitle>Perguntas frequentes</CardTitle>
                    </CardHeader>
                    <div className="mb-3.5">
                        <Input
                            placeholder="Buscar na ajuda..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        {filtered.map((f) => {
                            const i = FAQS.indexOf(f);
                            const isOpen = open === i;
                            return (
                                <div
                                    key={f.q}
                                    className="border border-(--color-border-soft) rounded-[10px] overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpen(isOpen ? -1 : i)}
                                        className="w-full px-4 py-3.5 flex justify-between items-center cursor-pointer text-[13px] font-semibold text-left"
                                    >
                                        {f.q}
                                        <ChevronDown
                                            size={14}
                                            className={`text-(--color-muted) transition-transform ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-4 pb-3.5 text-[13px] text-(--color-muted) leading-relaxed">
                                            {f.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {filtered.length === 0 && (
                            <div className="text-center py-6 text-(--color-muted) text-[13px]">
                                Nenhum resultado encontrado para &ldquo;{search}&rdquo;.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
