"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Section, SectionHead } from "../section";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, FormField } from "@/components/ui/input";

const CHANNELS = [
    { icon: Mail, lbl: "E-mail", val: "ouvidoria@institutoverde.org.br" },
    { icon: Phone, lbl: "Telefone", val: "(41) 3262-4810 · ramal 9" },
    { icon: MapPin, lbl: "Presencial", val: "Seg–Sex, 9h–17h · Sede do Instituto" },
    {
        icon: Clock,
        lbl: "Encarregada de Dados (LGPD)",
        val: "Camila Lemos · dpo@institutoverde.org.br",
    },
];

const KINDS = [
    "Pedido de informação (LAI)",
    "Sugestão",
    "Elogio",
    "Reclamação",
    "Denúncia",
] as const;

const schema = z.object({
    kind: z.enum(KINDS),
    identification: z.string().optional(),
    email: z.union([z.string().email("E-mail inválido"), z.literal("")]).optional(),
    description: z.string().min(10, "Descreva sua manifestação com mais detalhes"),
});

export function Ombudsman() {
    const [protocol, setProtocol] = useState<string | null>(null);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { kind: KINDS[0], identification: "", email: "", description: "" },
    });

    const onSubmit = () => {
        setProtocol(`2026-04-${Math.floor(1000 + Math.random() * 9000)}`);
    };

    return (
        <Section id="ouvidoria" alt>
            <SectionHead
                eyebrow="07 · Ouvidoria & Lei de Acesso à Informação"
                title="Faltou algo aqui? Pergunte."
            >
                A ouvidoria do Instituto recebe pedidos de informação, sugestões, elogios e
                denúncias — anônimos ou identificados. Toda manifestação é registrada com protocolo
                e respondida em até 20 dias úteis, prorrogáveis por mais 10 (art. 11 da Lei
                12.527/2011).
            </SectionHead>
            <div className="grid lg:grid-cols-2 gap-8 bg-white border border-(--color-border-soft) rounded-[18px] p-9 items-start">
                <div>
                    <h3 className="text-[22px] font-extrabold tracking-[-.5px] mb-3">
                        Canais oficiais
                    </h3>
                    <p className="text-sm text-(--color-muted) leading-[1.7] mb-3.5">
                        Para pedidos baseados na <strong>Lei de Acesso à Informação</strong>{" "}
                        aplicável a entidades que recebem recursos públicos, registre por qualquer
                        canal abaixo informando o número do convênio ou o assunto.
                    </p>
                    <div className="flex flex-col gap-2.5 mt-4.5">
                        {CHANNELS.map((c) => {
                            const Icon = c.icon;
                            return (
                                <div
                                    key={c.lbl}
                                    className="flex gap-3 items-center p-3.5 bg-(--color-bg) rounded-[10px] border border-(--color-border-soft)"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-(--color-g50) text-(--color-g600) flex items-center justify-center shrink-0">
                                        <Icon size={18} strokeWidth={1.8} />
                                    </div>
                                    <div>
                                        <div className="text-[11px] text-(--color-muted) font-semibold uppercase tracking-[.8px]">
                                            {c.lbl}
                                        </div>
                                        <div className="text-[13.5px] font-bold text-(--color-text) mt-0.5">
                                            {c.val}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
                    <FormField label="Tipo de manifestação">
                        <Select {...form.register("kind")}>
                            {KINDS.map((k) => (
                                <option key={k} value={k}>
                                    {k}
                                </option>
                            ))}
                        </Select>
                    </FormField>
                    <FormField label="Identificação (opcional para denúncias)">
                        <Input
                            placeholder="Nome ou pseudônimo"
                            {...form.register("identification")}
                        />
                    </FormField>
                    <FormField label="E-mail para resposta (opcional)">
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
                    <FormField label="Descrição">
                        <Textarea
                            placeholder="Descreva sua manifestação. Se for sobre um convênio público, informe o número."
                            {...form.register("description")}
                        />
                        {form.formState.errors.description && (
                            <span className="text-[11px] text-(--color-danger) mt-1">
                                {form.formState.errors.description.message}
                            </span>
                        )}
                    </FormField>
                    <div className="text-xs text-(--color-muted) bg-(--color-g50) border-l-[3px] border-(--color-g500) px-3.5 py-2.5 rounded-md leading-[1.6]">
                        Denúncias anônimas são aceitas e tratadas com sigilo pelo Conselho Fiscal.
                        Nenhum dado de localização ou navegação é vinculado ao envio anônimo.
                    </div>
                    <Button type="submit" disabled={!!protocol} className="self-start">
                        {protocol ? `Protocolo nº ${protocol} registrado ✓` : "Enviar manifestação"}
                    </Button>
                </form>
            </div>
        </Section>
    );
}
