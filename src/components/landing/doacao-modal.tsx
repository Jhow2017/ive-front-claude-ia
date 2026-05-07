"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { QrCode, CreditCard, Receipt, Heart } from "lucide-react";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, FormField } from "@/components/ui/input";
import { useUI } from "@/stores/ui";

const PIX_KEY = "pix@institutoverde-esperanca.org.br";
const PRESETS = [30, 50, 100, 200];

const ccSchema = z.object({
    num: z.string().min(13, "Número inválido"),
    nome: z.string().min(2, "Informe o nome"),
    exp: z.string().regex(/^\d{2}\/\d{2}$/, "MM/AA"),
    cvv: z.string().min(3).max(4),
});
type CCForm = z.infer<typeof ccSchema>;

export function DoacaoModal() {
    const open = useUI((s) => s.donationOpen);
    const setOpen = useUI((s) => s.setDonationOpen);
    const [tab, setTab] = useState<"pix" | "cc" | "boleto">("pix");
    const [valor, setValor] = useState("");
    const [preset, setPreset] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);
    const [done, setDone] = useState(false);

    const cc = useForm<CCForm>({
        resolver: zodResolver(ccSchema),
        defaultValues: { num: "", nome: "", exp: "", cvv: "" },
    });

    const close = () => {
        setOpen(false);
        setTimeout(() => {
            setDone(false);
            setValor("");
            setPreset(null);
            setTab("pix");
        }, 200);
    };

    const handlePreset = (v: number) => {
        setPreset(v);
        setValor(v.toString());
    };

    const onCc = () => setDone(true);

    if (!open) return null;

    if (done) {
        return (
            <Dialog open onClose={close} size="sm">
                <div className="text-center py-5">
                    <div className="w-16 h-16 rounded-full bg-(--color-g50) flex items-center justify-center mx-auto mb-4">
                        <Heart size={28} color="var(--color-g500)" />
                    </div>
                    <div className="text-2xl font-extrabold mb-2">Obrigado!</div>
                    <div className="text-[15px] text-(--color-muted) leading-relaxed mb-6">
                        Sua doação foi registrada. Você receberá uma confirmação por e-mail em
                        breve. Cada contribuição ajuda uma criança a ter acesso ao tratamento que
                        precisa.
                    </div>
                    <Button size="lg" className="w-full" onClick={close}>
                        Fechar
                    </Button>
                </div>
            </Dialog>
        );
    }

    return (
        <Dialog open onClose={close} size="sm">
            <DialogHeader
                title="Fazer uma doação"
                sub="100% destinado ao Programa de Acesso Social"
                onClose={close}
            />
            <label className="text-xs font-semibold text-(--color-text) mb-1.5 block">
                Valor da doação
            </label>
            <div className="relative mb-3">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-(--color-muted) pointer-events-none">
                    R$
                </span>
                <input
                    type="number"
                    min={1}
                    placeholder="0"
                    value={valor}
                    onChange={(e) => {
                        setValor(e.target.value);
                        setPreset(null);
                    }}
                    className="w-full pl-13 pr-4 py-3.5 border-2 border-(--color-border-soft) rounded-[10px] text-[28px] font-bold outline-none focus:border-(--color-g500) focus:ring-2 focus:ring-(--color-g500)/10"
                    style={{ paddingLeft: 52 }}
                />
            </div>
            <div className="flex gap-1.5 mb-5 flex-wrap">
                {PRESETS.map((v) => (
                    <button
                        key={v}
                        type="button"
                        onClick={() => handlePreset(v)}
                        className={`px-3.5 py-1.5 border-[1.5px] rounded-lg text-[13px] font-bold transition-colors ${
                            preset === v
                                ? "bg-(--color-g500) text-white border-(--color-g500)"
                                : "bg-(--color-g50) text-(--color-g600) border-(--color-g100) hover:bg-(--color-g500) hover:text-white hover:border-(--color-g500)"
                        }`}
                    >
                        R$ {v}
                    </button>
                ))}
            </div>
            <div className="flex bg-(--color-bg) rounded-[10px] p-0.5 mb-6">
                {[
                    { k: "pix", l: "PIX", Ic: QrCode },
                    { k: "cc", l: "Cartão", Ic: CreditCard },
                    { k: "boleto", l: "Boleto", Ic: Receipt },
                ].map(({ k, l, Ic }) => (
                    <button
                        key={k}
                        type="button"
                        onClick={() => setTab(k as any)}
                        className={`flex-1 py-2 text-[13px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                            tab === k
                                ? "bg-white text-(--color-text) shadow-sm"
                                : "text-(--color-muted)"
                        }`}
                    >
                        <Ic size={14} /> {l}
                    </button>
                ))}
            </div>

            {tab === "pix" && (
                <div className="text-center">
                    <div className="w-36 h-36 rounded-2xl bg-(--color-bg) border-2 border-dashed border-(--color-border-soft) flex flex-col items-center justify-center mx-auto mb-4 gap-2">
                        <QrCode size={48} color="var(--color-g500)" />
                        <span className="text-[10px] text-(--color-muted) font-semibold">
                            QR Code PIX
                        </span>
                    </div>
                    <p className="text-xs text-(--color-muted) mb-2">Ou copie a chave PIX:</p>
                    <div className="bg-(--color-bg) border border-(--color-border-soft) rounded-lg px-3.5 py-2.5 flex justify-between items-center mb-5">
                        <span className="text-xs text-(--color-muted) font-mono break-all leading-snug">
                            {PIX_KEY}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                navigator.clipboard?.writeText(PIX_KEY).catch(() => {});
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }}
                            className="text-xs font-bold text-(--color-g500) ml-3 shrink-0"
                        >
                            {copied ? "Copiado!" : "Copiar"}
                        </button>
                    </div>
                    <p className="text-[11px] text-(--color-muted) leading-relaxed mb-4">
                        Após o pagamento, envie o comprovante para{" "}
                        <strong>doacoes@iverde.org.br</strong>.
                    </p>
                    <Button size="lg" className="w-full" onClick={() => setDone(true)}>
                        Confirmar doação
                    </Button>
                </div>
            )}

            {tab === "cc" && (
                <form onSubmit={cc.handleSubmit(onCc)} className="grid grid-cols-2 gap-3">
                    <FormField label="Número do cartão" className="col-span-2">
                        <Input
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            {...cc.register("num")}
                        />
                        {cc.formState.errors.num && (
                            <span className="text-[11px] text-(--color-danger) mt-1">
                                {cc.formState.errors.num.message}
                            </span>
                        )}
                    </FormField>
                    <FormField label="Nome no cartão" className="col-span-2">
                        <Input placeholder="NOME SOBRENOME" {...cc.register("nome")} />
                    </FormField>
                    <FormField label="Validade">
                        <Input placeholder="MM/AA" maxLength={5} {...cc.register("exp")} />
                    </FormField>
                    <FormField label="CVV">
                        <Input placeholder="000" maxLength={4} {...cc.register("cvv")} />
                    </FormField>
                    <Button type="submit" size="lg" className="col-span-2 w-full">
                        Doar R$ {valor || "—"} <Heart size={15} />
                    </Button>
                </form>
            )}

            {tab === "boleto" && (
                <div>
                    <div className="bg-(--color-bg) border border-(--color-border-soft) rounded-[10px] p-5 mb-4">
                        <div className="text-[13px] font-semibold mb-1">Boleto bancário</div>
                        <div className="text-xs text-(--color-muted)">
                            Vencimento:{" "}
                            {new Date(Date.now() + 3 * 86400000).toLocaleDateString("pt-BR")}
                        </div>
                        <div className="text-[11px] text-(--color-muted) font-mono tracking-wide leading-relaxed my-2.5 break-all">
                            00190.00009 02600.360320 00001.100006 2 10260000000
                            {(parseFloat(valor) || 0).toFixed(2).replace(".", "")}
                        </div>
                    </div>
                    <Button size="lg" className="w-full" onClick={() => setDone(true)}>
                        Gerar boleto <Receipt size={15} />
                    </Button>
                </div>
            )}
        </Dialog>
    );
}
