"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input, FormField } from "@/components/ui/input";
import { useAuth, type Role } from "@/shared/stores/auth";

const TABS: { k: Role; l: string; placeholder: string }[] = [
    { k: "admin", l: "Admin", placeholder: "admin@iverde.com.br" },
    {
        k: "profissional",
        l: "Profissional",
        placeholder: "profissional@iverde.com.br",
    },
    { k: "familia", l: "Família", placeholder: "responsavel@email.com" },
];

const schema = z.object({
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(4, "Senha muito curta"),
});

export default function LoginPage() {
    const router = useRouter();
    const login = useAuth((s) => s.login);
    const [tab, setTab] = useState<Role>("admin");
    const cur = TABS.find((t) => t.k === tab)!;

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { email: "", senha: "" },
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
        login(tab, data.email);
        router.push("/home");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-(--color-bg) p-5 overflow-auto">
            <div className="bg-white border border-(--color-border-soft) rounded-2xl p-10 w-full max-w-105 shadow-md">
                <div className="flex items-center gap-2.5 mb-7 justify-center">
                    <LogoMark size={36} />
                    <div className="text-[15px] font-extrabold">
                        Instituto <em className="text-(--color-g500) not-italic">Verde</em>{" "}
                        Esperança
                    </div>
                </div>
                <h1 className="text-[22px] font-extrabold tracking-tight mb-1">
                    Acessar plataforma
                </h1>
                <p className="text-sm text-(--color-muted) mb-6">
                    Entre com sua conta para continuar.
                </p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
                    <FormField label="E-mail">
                        <Input
                            type="email"
                            placeholder={cur.placeholder}
                            {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                            <span className="text-[11px] text-(--color-danger) mt-1">
                                {form.formState.errors.email.message}
                            </span>
                        )}
                    </FormField>
                    <FormField label="Senha">
                        <Input type="password" placeholder="••••••••" {...form.register("senha")} />
                        {form.formState.errors.senha && (
                            <span className="text-[11px] text-(--color-danger) mt-1">
                                {form.formState.errors.senha.message}
                            </span>
                        )}
                    </FormField>
                    <Button type="submit" size="lg" className="w-full mt-1.5">
                        Entrar <ArrowRight size={15} />
                    </Button>
                </form>
                <div className="text-center mt-3.5 text-[13px] text-(--color-muted)">
                    <button className="text-(--color-g500) font-semibold hover:underline">
                        Esqueci minha senha
                    </button>
                    {" · "}
                    <Link
                        href="/"
                        className="text-(--color-g500) font-semibold no-underline hover:underline"
                    >
                        Voltar ao site
                    </Link>
                </div>
            </div>
        </div>
    );
}
