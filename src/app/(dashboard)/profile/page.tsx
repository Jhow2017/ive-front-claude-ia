"use client";
import { useState } from "react";
import { Upload, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, FormField } from "@/components/ui/input";
import { useAuth, type Role } from "@/shared/stores/auth";

const PROFILE: Record<
    Role,
    { name: string; email: string; phone: string; role: string; since: string; init: string }
> = {
    admin: {
        name: "Administrador",
        email: "admin@iverde.com.br",
        phone: "(11) 4002-8922",
        role: "Administrador",
        since: "Jan/2023",
        init: "AD",
    },
    profissional: {
        name: "Dra. Renata Lima",
        email: "renata@iverde.com.br",
        phone: "(11) 98877-6655",
        role: "Fonoaudióloga · CRFa 4-12345",
        since: "Mar/2022",
        init: "RL",
    },
    usuario: {
        name: "Usuário Costa",
        email: "costa@email.com",
        phone: "(11) 99966-3344",
        role: "Responsável · Lucas Costa",
        since: "Set/2023",
        init: "FC",
    },
};

export default function ProfileView() {
    const role = useAuth((s) => s.role);
    const p = PROFILE[role];
    const [edit, setEdit] = useState(false);
    const fields: [string, string][] = [
        ["Nome completo", p.name],
        ["E-mail", p.email],
        ["Telefone", p.phone],
        ["Função", p.role],
    ];

    return (
        <>
            <div>
                <div className="text-[22px] font-extrabold tracking-tight">Meu Perfil</div>
                <div className="text-[13px] text-(--color-muted) mt-0.5">
                    Suas informações pessoais e dados de contato
                </div>
            </div>
            <div className="grid lg:grid-cols-[320px_1fr] gap-3.5">
                <Card>
                    <CardContent className="text-center">
                        <div className="w-30 h-30 rounded-full bg-gradient-to-br from-(--color-g500) to-(--color-g600) text-white font-extrabold text-[42px] flex items-center justify-center mx-auto mt-2 mb-3.5">
                            {p.init}
                        </div>
                        <div className="text-[17px] font-extrabold">{p.name}</div>
                        <div className="text-xs text-(--color-muted) mt-1">{p.role}</div>
                        <Button variant="outline" size="sm" className="mt-3.5">
                            <Upload size={12} />
                            Trocar foto
                        </Button>
                        <div className="mt-4.5 py-3 border-t border-(--color-border-soft) text-xs text-(--color-muted)">
                            Membro desde <strong className="text-(--color-text)">{p.since}</strong>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <CardHeader>
                            <CardTitle>Informações pessoais</CardTitle>
                            <Button variant="outline" size="sm" onClick={() => setEdit(!edit)}>
                                <Pencil size={12} />
                                {edit ? "Cancelar" : "Editar"}
                            </Button>
                        </CardHeader>
                        <div className="grid sm:grid-cols-2 gap-3.5">
                            {fields.map(([k, v]) => (
                                <FormField key={k} label={k}>
                                    {edit ? (
                                        <Input defaultValue={v} />
                                    ) : (
                                        <div className="px-3.5 py-2.5 bg-(--color-bg) rounded-lg text-[13px] font-semibold">
                                            {v}
                                        </div>
                                    )}
                                </FormField>
                            ))}
                        </div>
                        {edit && (
                            <div className="mt-4 flex gap-2 justify-end">
                                <Button variant="outline" onClick={() => setEdit(false)}>
                                    Cancelar
                                </Button>
                                <Button onClick={() => setEdit(false)}>Salvar alterações</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
