"use client";
import { useState } from "react";
import { Check, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField, Label } from "@/components/ui/input";

const STRENGTH_LABELS = ["Muito fraca", "Fraca", "Razoável", "Boa", "Forte"];
const STRENGTH_COLORS = ["#ef4444", "#f59e0b", "#f59e0b", "#3b82f6", "#259a43"];
const TIPS = [
    "Use pelo menos 8 caracteres",
    "Combine letras maiúsculas e minúsculas",
    "Inclua números e símbolos",
    "Evite informações pessoais",
    "Não reutilize senhas de outros sites",
];

function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            type="password"
            {...props}
            className="w-full px-3.5 py-2.5 border border-(--color-border-soft) rounded-lg bg-white text-sm text-(--color-text) outline-none transition-colors focus:border-(--color-g500) focus:ring-2 focus:ring-(--color-g500)/10 placeholder:text-(--color-muted2)"
        />
    );
}

export function ChangePasswordView() {
    const [cur, setCur] = useState("");
    const [nw, setNw] = useState("");
    const [cf, setCf] = useState("");
    const [done, setDone] = useState(false);

    const strength = [
        nw.length >= 8,
        /[A-Z]/.test(nw),
        /[0-9]/.test(nw),
        /[^a-zA-Z0-9]/.test(nw),
    ].filter(Boolean).length;
    const match = !!cf && nw === cf;
    const canSubmit = !!cur && !!nw && match && strength >= 2;

    const reset = () => {
        setDone(false);
        setCur("");
        setNw("");
        setCf("");
    };

    return (
        <>
            <div>
                <div className="text-[22px] font-extrabold tracking-tight">Trocar Senha</div>
                <div className="text-[13px] text-(--color-muted) mt-0.5">
                    Mantenha sua conta segura com uma senha forte
                </div>
            </div>
            <div className="grid lg:grid-cols-[1fr_320px] gap-3.5">
                <Card>
                    <CardContent>
                        {done ? (
                            <div className="py-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-(--color-g50) text-(--color-g500) flex items-center justify-center mx-auto mb-3.5">
                                    <CheckCircle size={32} />
                                </div>
                                <div className="text-[17px] font-bold">
                                    Senha alterada com sucesso!
                                </div>
                                <div className="text-[13px] text-(--color-muted) mt-1.5">
                                    Sua nova senha já está ativa.
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-4"
                                    onClick={reset}
                                >
                                    Alterar novamente
                                </Button>
                            </div>
                        ) : (
                            <>
                                <CardHeader>
                                    <CardTitle>Atualizar senha</CardTitle>
                                </CardHeader>
                                <FormField label="Senha atual" className="mb-3.5">
                                    <PasswordInput
                                        value={cur}
                                        onChange={(e) => setCur(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </FormField>
                                <div className="mb-3.5">
                                    <Label>Nova senha</Label>
                                    <PasswordInput
                                        value={nw}
                                        onChange={(e) => setNw(e.target.value)}
                                        placeholder="Mínimo 8 caracteres"
                                    />
                                    {nw && (
                                        <div className="mt-2">
                                            <div className="flex gap-1 mb-1">
                                                {[0, 1, 2, 3].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="flex-1 h-1 rounded-sm"
                                                        style={{
                                                            background:
                                                                i < strength
                                                                    ? STRENGTH_COLORS[strength - 1]
                                                                    : "var(--color-border-soft)",
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <div
                                                className="text-[11px] font-semibold"
                                                style={{
                                                    color: STRENGTH_COLORS[
                                                        Math.max(0, strength - 1)
                                                    ],
                                                }}
                                            >
                                                {STRENGTH_LABELS[strength] || STRENGTH_LABELS[0]}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="mb-2">
                                    <Label>Confirmar nova senha</Label>
                                    <PasswordInput
                                        value={cf}
                                        onChange={(e) => setCf(e.target.value)}
                                        placeholder="Digite novamente"
                                    />
                                    {cf && (
                                        <div
                                            className={`text-[11px] mt-1 font-semibold ${match ? "text-(--color-g500)" : "text-(--color-danger)"}`}
                                        >
                                            {match ? "✓ Senhas conferem" : "✗ Senhas não conferem"}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 justify-end mt-2">
                                    <Button variant="outline">Cancelar</Button>
                                    <Button disabled={!canSubmit} onClick={() => setDone(true)}>
                                        Atualizar senha
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card className="bg-(--color-g50) border-(--color-g200)">
                    <CardContent>
                        <div className="text-[13px] font-bold mb-2.5">Dicas de segurança</div>
                        <ul className="list-none p-0 grid gap-2 text-xs text-(--color-text)">
                            {TIPS.map((t) => (
                                <li key={t} className="flex gap-2 items-start">
                                    <Check
                                        size={13}
                                        className="text-(--color-g500) shrink-0 mt-0.5"
                                    />
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
