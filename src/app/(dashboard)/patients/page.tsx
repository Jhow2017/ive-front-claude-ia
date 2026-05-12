"use client";
import { useState } from "react";
import Link from "next/link";
import {
    Plus,
    Search,
    Filter,
    FileText,
    Edit,
    Trash2,
    MoreHorizontal,
    Phone,
    Mail,
    Calendar as CalIco,
    X,
    Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, FormField } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { AvatarIlus } from "@/components/shared/avatar-ilus";

interface Paciente {
    id: number;
    seed: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    lastVisit: string;
    status: "Ativo" | "Inativo";
}

const PACIENTES: Paciente[] = [
    {
        id: 1,
        seed: 0,
        name: "Lucas Costa",
        email: "lucas@email.com",
        cpf: "123.456.789-00",
        phone: "(11) 98765-4321",
        lastVisit: "29 Abr 2026",
        status: "Ativo",
    },
    {
        id: 2,
        seed: 1,
        name: "Maria Oliveira",
        email: "maria.oliveira@email.com",
        cpf: "234.567.890-11",
        phone: "(11) 98765-1234",
        lastVisit: "25 Abr 2026",
        status: "Ativo",
    },
    {
        id: 3,
        seed: 2,
        name: "Pedro Santos",
        email: "pedro.santos@email.com",
        cpf: "345.678.901-22",
        phone: "(11) 98765-5678",
        lastVisit: "22 Abr 2026",
        status: "Ativo",
    },
    {
        id: 4,
        seed: 3,
        name: "Ana Costa Lima",
        email: "ana.lima@email.com",
        cpf: "456.789.012-33",
        phone: "(11) 98765-9012",
        lastVisit: "18 Abr 2026",
        status: "Ativo",
    },
    {
        id: 5,
        seed: 4,
        name: "Beatriz Almeida",
        email: "beatriz@email.com",
        cpf: "567.890.123-44",
        phone: "(11) 98765-3456",
        lastVisit: "10 Abr 2026",
        status: "Inativo",
    },
];

export default function PatientsView() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"todos" | "ativos" | "inativos">("todos");
    const [view, setView] = useState<Paciente | null>(null);
    const [edit, setEdit] = useState<Paciente | null>(null);
    const [del, setDel] = useState<Paciente | null>(null);

    const filtered = PACIENTES.filter((p) => {
        const fm =
            filter === "todos" ||
            (filter === "ativos" && p.status === "Ativo") ||
            (filter === "inativos" && p.status === "Inativo");
        const sm =
            !search ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.cpf.includes(search) ||
            p.email.includes(search);
        return fm && sm;
    });

    const counts = {
        todos: PACIENTES.length,
        ativos: PACIENTES.filter((p) => p.status === "Ativo").length,
        inativos: PACIENTES.filter((p) => p.status === "Inativo").length,
    };

    return (
        <>
            <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                    <div className="text-[22px] font-extrabold tracking-tight">Pacientes</div>
                    <div className="text-[13px] text-(--color-muted) mt-1">
                        Gerenciar cadastros e atendimentos
                    </div>
                </div>
                <Link href="/patients/new">
                    <Button>
                        <Plus size={15} /> Novo Paciente
                    </Button>
                </Link>
            </div>
            <Card>
                <CardContent>
                    <div className="flex gap-2.5 mb-4 flex-wrap">
                        <div className="flex items-center gap-2 bg-(--color-bg) border border-(--color-border-soft) rounded-lg px-3 py-1.5 flex-1 min-w-[220px]">
                            <Search size={14} color="var(--color-muted)" />
                            <input
                                placeholder="Buscar por nome, CPF ou email..."
                                className="bg-transparent outline-none text-[13px] w-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button variant="outline">
                            <Filter size={14} /> Filtros
                        </Button>
                    </div>
                    <div className="flex gap-1.5 mb-4 flex-wrap">
                        {(["todos", "ativos", "inativos"] as const).map((k) => (
                            <button
                                key={k}
                                onClick={() => setFilter(k)}
                                className={`px-3.5 py-1 text-[13px] font-semibold rounded-full border-[1.5px] transition-all whitespace-nowrap ${
                                    filter === k
                                        ? "bg-(--color-g500) text-white border-(--color-g500)"
                                        : "bg-white text-(--color-muted) border-(--color-border-soft)"
                                }`}
                            >
                                {k === "todos" ? "Todos" : k === "ativos" ? "Ativos" : "Inativos"} (
                                {counts[k]})
                            </button>
                        ))}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    {[
                                        "Paciente",
                                        "CPF",
                                        "Contato",
                                        "Última Visita",
                                        "Status",
                                        "",
                                    ].map((h, i) => (
                                        <th
                                            key={i}
                                            className={`text-[11px] font-semibold text-(--color-muted) uppercase tracking-wide pb-2.5 px-3.5 ${
                                                i === 5 ? "text-right" : "text-left"
                                            }`}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((p) => (
                                    <tr key={p.id} className="hover:bg-(--color-g50)">
                                        <td className="py-3 px-3.5 border-t border-(--color-border-soft)">
                                            <div className="flex items-center gap-2.5">
                                                <AvatarIlus seed={p.seed} size={36} />
                                                <div>
                                                    <div className="text-[13px] font-semibold">
                                                        {p.name}
                                                    </div>
                                                    <div className="text-[11px] text-(--color-muted)">
                                                        {p.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-3.5 text-[13px] text-(--color-muted) border-t border-(--color-border-soft)">
                                            {p.cpf}
                                        </td>
                                        <td className="py-3 px-3.5 border-t border-(--color-border-soft)">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="text-xs flex items-center gap-1.5 text-(--color-muted)">
                                                    <Phone size={11} color="var(--color-g500)" />{" "}
                                                    {p.phone}
                                                </div>
                                                <div className="text-xs flex items-center gap-1.5 text-(--color-g500)">
                                                    <Mail size={11} /> {p.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-3.5 border-t border-(--color-border-soft)">
                                            <div className="text-xs flex items-center gap-1.5 text-(--color-muted)">
                                                <CalIco size={11} /> {p.lastVisit}
                                            </div>
                                        </td>
                                        <td className="py-3 px-3.5 border-t border-(--color-border-soft)">
                                            <Badge
                                                variant={p.status === "Ativo" ? "green" : "gray"}
                                            >
                                                {p.status}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-3.5 border-t border-(--color-border-soft)">
                                            <div className="flex gap-1 items-center justify-end">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    title="Ver"
                                                    onClick={() => setView(p)}
                                                >
                                                    <FileText size={14} />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    title="Editar"
                                                    onClick={() => setEdit(p)}
                                                >
                                                    <Edit size={14} />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="danger"
                                                    title="Excluir"
                                                    onClick={() => setDel(p)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                                <Button size="icon" variant="ghost" title="Mais">
                                                    <MoreHorizontal size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-(--color-border-soft) text-[13px] text-(--color-muted)">
                        <span>
                            Mostrando {filtered.length} de {PACIENTES.length} pacientes
                        </span>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                Anterior
                            </Button>
                            <Button variant="outline" size="sm">
                                Próximo
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={!!view} onClose={() => setView(null)}>
                {view && (
                    <>
                        <DialogHeader
                            title={
                                <div className="flex gap-3.5 items-center">
                                    <AvatarIlus seed={view.seed} size={56} />
                                    <div>
                                        <div>{view.name}</div>
                                        <div className="text-[13px] text-(--color-muted) font-medium">
                                            CPF {view.cpf} · {view.status}
                                        </div>
                                    </div>
                                </div>
                            }
                            onClose={() => setView(null)}
                        />
                        <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                            <div className="bg-white border border-(--color-border-soft) rounded-xl p-4">
                                <div className="text-[11px] font-semibold text-(--color-muted) uppercase mb-1.5">
                                    Última visita
                                </div>
                                <div className="text-sm font-bold">{view.lastVisit}</div>
                            </div>
                            <div className="bg-white border border-(--color-border-soft) rounded-xl p-4">
                                <div className="text-[11px] font-semibold text-(--color-muted) uppercase mb-1.5">
                                    Status
                                </div>
                                <div className="text-sm font-bold text-(--color-g500)">
                                    {view.status}
                                </div>
                            </div>
                        </div>
                        <div className="text-[13px] mb-2">
                            <b>Contato</b>
                        </div>
                        <div className="text-[13px] text-(--color-muted) mb-1.5 flex items-center gap-1.5">
                            <Phone size={12} color="var(--color-g500)" /> {view.phone}
                        </div>
                        <div className="text-[13px] text-(--color-muted) flex items-center gap-1.5">
                            <Mail size={12} color="var(--color-g500)" /> {view.email}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setView(null)}>
                                Fechar
                            </Button>
                            <Button
                                onClick={() => {
                                    setEdit(view);
                                    setView(null);
                                }}
                            >
                                <Edit size={13} /> Editar
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </Dialog>

            <Dialog open={!!edit} onClose={() => setEdit(null)}>
                {edit && (
                    <>
                        <DialogHeader
                            title="Editar paciente"
                            sub={edit.name}
                            onClose={() => setEdit(null)}
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <FormField label="Nome completo" className="col-span-2">
                                <Input defaultValue={edit.name} />
                            </FormField>
                            <FormField label="CPF">
                                <Input defaultValue={edit.cpf} />
                            </FormField>
                            <FormField label="Telefone">
                                <Input defaultValue={edit.phone} />
                            </FormField>
                            <FormField label="E-mail" className="col-span-2">
                                <Input defaultValue={edit.email} />
                            </FormField>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEdit(null)}>
                                Cancelar
                            </Button>
                            <Button onClick={() => setEdit(null)}>
                                <Check size={13} /> Salvar
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </Dialog>

            <Dialog open={!!del} onClose={() => setDel(null)} size="sm">
                {del && (
                    <>
                        <DialogHeader
                            title="Excluir paciente"
                            sub="Esta ação não pode ser desfeita"
                            onClose={() => setDel(null)}
                        />
                        <div className="text-sm py-1">
                            Tem certeza que deseja excluir <b>{del.name}</b>? Os dados clínicos
                            serão arquivados conforme a LGPD.
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDel(null)}>
                                Cancelar
                            </Button>
                            <Button
                                className="bg-(--color-danger) hover:bg-red-600"
                                onClick={() => setDel(null)}
                            >
                                <Trash2 size={13} /> Excluir
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </Dialog>
        </>
    );
}
