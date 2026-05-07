"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, FormField } from "@/components/ui/input";

const ITEMS = [
    { Ic: Phone, h: "WhatsApp / Telefone", p: "(11) 99xxx-xxxx" },
    { Ic: Mail, h: "E-mail", p: "contato@iverde.com.br" },
    { Ic: MapPin, h: "Endereço", p: "R. das Esperanças, 120 · São Paulo, SP" },
    { Ic: Clock, h: "Horário", p: "Seg–Sex 8h–18h · Sáb 8h–12h" },
];

const schema = z.object({
    nome: z.string().min(2, "Informe seu nome"),
    telefone: z.string().optional(),
    email: z.string().email("E-mail inválido"),
    assunto: z.string(),
    mensagem: z.string().optional(),
});

export function Contato() {
    const [sent, setSent] = useState(false);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            nome: "",
            telefone: "",
            email: "",
            assunto: "Agendamento de consulta",
            mensagem: "",
        },
    });

    return (
        <section className="py-24 bg-white" id="contato">
            <div className="wrap">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                        <div className="text-[11px] font-bold text-(--color-g500) tracking-[1.2px] uppercase mb-2.5">
                            Contato
                        </div>
                        <h2 className="text-[38px] font-extrabold tracking-tight leading-[1.18] mb-4">
                            Fale com a gente
                        </h2>
                        <p className="text-(--color-muted) text-[15px] leading-relaxed mb-8">
                            Para agendamentos, dúvidas sobre o processo ou informações sobre
                            doações. Respondemos em até 1 dia útil.
                        </p>
                        <div className="flex flex-col gap-5">
                            {ITEMS.map((c, i) => (
                                <div key={i} className="flex gap-3.5 items-start">
                                    <div className="w-10 h-10 rounded-[10px] bg-(--color-g50) flex items-center justify-center shrink-0">
                                        <c.Ic size={18} color="var(--color-g500)" />
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-semibold mb-0.5">{c.h}</h4>
                                        <p className="text-sm text-(--color-muted)">{c.p}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        {sent ? (
                            <div className="bg-(--color-g50) border border-(--color-g100) rounded-2xl p-10 text-center">
                                <div className="w-13 h-13 rounded-full bg-(--color-g500) flex items-center justify-center mx-auto mb-3.5 p-3">
                                    <Check size={24} color="white" />
                                </div>
                                <div className="font-bold text-[17px] mb-1.5">Mensagem enviada</div>
                                <div className="text-(--color-muted) text-sm">
                                    Retornaremos em até 1 dia útil.
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white border border-(--color-border-soft) rounded-2xl p-7">
                                <form
                                    onSubmit={form.handleSubmit(() => setSent(true))}
                                    className="flex flex-col gap-3.5"
                                >
                                    <div className="grid grid-cols-2 gap-3.5">
                                        <FormField label="Nome">
                                            <Input
                                                placeholder="Seu nome"
                                                {...form.register("nome")}
                                            />
                                            {form.formState.errors.nome && (
                                                <span className="text-[11px] text-(--color-danger) mt-1">
                                                    {form.formState.errors.nome.message}
                                                </span>
                                            )}
                                        </FormField>
                                        <FormField label="Telefone">
                                            <Input
                                                placeholder="(11) 9xxxx-xxxx"
                                                {...form.register("telefone")}
                                            />
                                        </FormField>
                                    </div>
                                    <FormField label="E-mail">
                                        <Input
                                            type="email"
                                            placeholder="seu@email.com"
                                            {...form.register("email")}
                                        />
                                        {form.formState.errors.email && (
                                            <span className="text-[11px] text-(--color-danger) mt-1">
                                                {form.formState.errors.email.message}
                                            </span>
                                        )}
                                    </FormField>
                                    <FormField label="Assunto">
                                        <Select {...form.register("assunto")}>
                                            <option>Agendamento de consulta</option>
                                            <option>Dúvidas sobre o processo</option>
                                            <option>Planos e convênios</option>
                                            <option>Programa de doações</option>
                                            <option>Outro</option>
                                        </Select>
                                    </FormField>
                                    <FormField label="Mensagem">
                                        <Textarea
                                            placeholder="Descreva brevemente o que precisa..."
                                            {...form.register("mensagem")}
                                        />
                                    </FormField>
                                    <Button size="lg" type="submit" className="w-full">
                                        Enviar mensagem
                                    </Button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
