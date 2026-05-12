"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {
    ChevronDown,
    Plus,
    X,
    Check,
    Trash2,
    User,
    Users,
    Upload,
    FileText,
    Phone,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, FormField } from "@/components/ui/input";

const ESTADOS = ["SP", "RJ", "MG", "RS", "PR", "SC", "BA", "CE", "GO", "DF"];
const DOCS = [
    "RG (frente)",
    "CPF (frente)",
    "Comprovante de Nascimento",
    "Cartão SUS",
    "Histórico Médico",
    "Laudo (se houver)",
];

function DocUpload({ label }: { label: string }) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const handle = (f?: File) => {
        if (!f) return;
        const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
        if (!["pdf", "jpg", "jpeg", "png", "heic"].includes(ext)) {
            setError("Tipo inválido. Aceitos: PDF, JPG, PNG, HEIC");
            return;
        }
        if (f.size > 10 * 1024 * 1024) {
            setError("Arquivo muito grande. Máximo: 10MB");
            return;
        }
        setError("");
        setFile(f);
    };
    if (file) {
        return (
            <div className="border border-(--color-g200) bg-(--color-g50) rounded-[10px] px-3 py-2.5 flex items-center gap-2.5 w-full min-w-0">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-(--color-g500) shrink-0">
                    <FileText size={18} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{file.name}</div>
                    <div className="text-[10px] text-(--color-muted)">
                        {label} · {(file.size / 1024).toFixed(0)} KB
                    </div>
                </div>
                <button
                    onClick={() => {
                        setFile(null);
                        setError("");
                        if (inputRef.current) inputRef.current.value = "";
                    }}
                    className="w-8 h-8 rounded-lg hover:bg-red-50 hover:text-(--color-danger) text-(--color-muted) flex items-center justify-center shrink-0 transition-all"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        );
    }
    return (
        <div>
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="border-2 border-dashed border-(--color-border-soft) rounded-[10px] p-5 flex flex-col items-center justify-center cursor-pointer hover:border-(--color-g500) hover:bg-(--color-g50) text-center min-h-[88px] w-full transition-colors"
            >
                <Upload size={22} color="var(--color-muted)" />
                <div className="text-xs font-semibold text-(--color-muted) mt-2">{label}</div>
                <div className="text-[11px] text-(--color-muted2) mt-0.5">
                    PDF, JPG, PNG · até 10MB
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.heic"
                    className="hidden"
                    onChange={(e) => handle(e.target.files?.[0])}
                />
            </button>
            {error && (
                <div className="mt-1.5 text-[11px] text-(--color-danger) flex items-center gap-1">
                    <AlertCircle size={11} /> {error}
                </div>
            )}
        </div>
    );
}

function SectionLabel({ Ic, children }: { Ic: any; children: React.ReactNode }) {
    return (
        <div className="text-[11px] font-bold text-(--color-g500) uppercase tracking-wide mb-3 mt-1 flex items-center gap-2">
            <Ic size={13} color="var(--color-g500)" />
            {children}
        </div>
    );
}

function PessoaBlock({ includeParentesco = false }: { includeParentesco?: boolean }) {
    return (
        <>
            {includeParentesco && (
                <div className="grid grid-cols-1 gap-3 mb-3">
                    <FormField label="Grau de Parentesco *">
                        <Select>
                            <option value="">Selecione</option>
                            <option>Filho(a)</option>
                            <option>Cônjuge</option>
                            <option>Pai/Mãe</option>
                            <option>Irmão(ã)</option>
                            <option>Avô/Avó</option>
                            <option>Neto(a)</option>
                            <option>Outro</option>
                        </Select>
                    </FormField>
                </div>
            )}
            <SectionLabel Ic={User}>Dados Pessoais</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <FormField label="Nome Completo *" className="sm:col-span-2">
                    <Input placeholder="Digite o nome completo" />
                </FormField>
                <FormField label="Data de Nascimento *">
                    <Input type="date" />
                </FormField>
                <FormField label="Sexo *">
                    <Select>
                        <option value="">Selecione</option>
                        <option>Masculino</option>
                        <option>Feminino</option>
                        <option>Outro</option>
                    </Select>
                </FormField>
                <FormField label="CPF *">
                    <Input placeholder="000.000.000-00" />
                </FormField>
                <FormField label="RG">
                    <Input placeholder="00.000.000-0" />
                </FormField>
                <FormField label="Cartão SUS">
                    <Input placeholder="000 0000 0000 0000" />
                </FormField>
                <FormField label="NIS (Bolsa Família)">
                    <Input placeholder="000.00000.00-0" />
                </FormField>
            </div>
            <SectionLabel Ic={Phone}>Contato</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <FormField label="Telefone *">
                    <Input placeholder="(000) 00000-0000" />
                </FormField>
                <FormField label="Email">
                    <Input type="email" placeholder="email@exemplo.com" />
                </FormField>
                <FormField label="Contato de Emergência">
                    <Input placeholder="Nome do contato" />
                </FormField>
                <FormField label="Telefone de Emergência">
                    <Input placeholder="(011) 00000-0000" />
                </FormField>
            </div>
            <SectionLabel Ic={FileText}>Endereço</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3">
                <FormField label="CEP">
                    <Input placeholder="00000-000" />
                </FormField>
                <FormField label="Logradouro" className="sm:col-span-2">
                    <Input placeholder="Rua, Avenida..." />
                </FormField>
                <FormField label="Número">
                    <Input placeholder="Nº" />
                </FormField>
                <FormField label="Complemento">
                    <Input placeholder="Apto, Bloco..." />
                </FormField>
                <FormField label="Bairro">
                    <Input />
                </FormField>
                <FormField label="Cidade">
                    <Input />
                </FormField>
                <FormField label="Estado">
                    <Select>
                        <option value="">UF</option>
                        {ESTADOS.map((s) => (
                            <option key={s}>{s}</option>
                        ))}
                    </Select>
                </FormField>
            </div>
            <SectionLabel Ic={FileText}>Documentos</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {DOCS.map((d, i) => (
                    <DocUpload key={i} label={d} />
                ))}
            </div>
        </>
    );
}

interface SectionProps {
    id: string;
    Ic: any;
    title: string;
    sub: string;
    children: React.ReactNode;
    dependente?: boolean;
    onRemove?: () => void;
    open: boolean;
    onToggle: () => void;
}

function Section({ Ic, title, sub, children, dependente, onRemove, open, onToggle }: SectionProps) {
    return (
        <div
            className={`bg-white border rounded-xl overflow-hidden mb-3 ${
                dependente ? "border-(--color-g200)" : "border-(--color-border-soft)"
            }`}
        >
            <button
                type="button"
                onClick={onToggle}
                className="flex items-center justify-between px-5 py-4 cursor-pointer select-none gap-3 hover:bg-(--color-g50) w-full text-left"
            >
                <div className="flex items-center gap-3">
                    <div
                        className={`w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0 ${
                            dependente ? "bg-violet-100 text-(--color-purple)" : "bg-(--color-g50)"
                        }`}
                    >
                        <Ic
                            size={18}
                            color={dependente ? "var(--color-purple)" : "var(--color-g500)"}
                        />
                    </div>
                    <div>
                        <div className="text-sm font-bold">{title}</div>
                        <div className="text-xs text-(--color-muted)">{sub}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {onRemove && (
                        <span
                            role="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove();
                            }}
                            className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center cursor-pointer"
                            title="Remover dependente"
                        >
                            <Trash2 size={14} color="var(--color-danger)" />
                        </span>
                    )}
                    <ChevronDown
                        size={16}
                        color="var(--color-muted)"
                        className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    />
                </div>
            </button>
            <div
                className="grid transition-[grid-template-rows] duration-[350ms] ease-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
                <div className="overflow-hidden">
                    <div className="px-5 py-5 border-t border-(--color-border-soft)">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RegisterPatientView() {
    const router = useRouter();
    const [open, setOpen] = useState<Record<string, boolean>>({ principal: true });
    const [deps, setDeps] = useState<string[]>([]);

    const tog = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));
    const addDep = () => {
        const id = `dep-${Date.now()}`;
        setDeps((d) => [...d, id]);
        setOpen((o) => ({ ...o, [id]: true }));
    };
    const removeDep = (id: string) => setDeps((d) => d.filter((x) => x !== id));

    return (
        <>
            <div className="flex justify-between items-start flex-wrap gap-3">
                <div>
                    <div className="text-[22px] font-extrabold tracking-tight">Novo Paciente</div>
                    <div className="text-[13px] text-(--color-muted) mt-1">
                        Preencha os dados para cadastrar um{" "}
                        <span className="text-(--color-g500) font-semibold">novo paciente</span>
                    </div>
                </div>
            </div>

            <Section
                id="principal"
                Ic={User}
                title="Paciente Principal"
                sub="Dados pessoais, contato, endereço e documentos"
                open={open.principal}
                onToggle={() => tog("principal")}
            >
                <PessoaBlock />
            </Section>

            {deps.map((id, i) => (
                <Section
                    key={id}
                    id={id}
                    Ic={Users}
                    title={`Dependente ${i + 1}`}
                    sub="Dados completos do dependente"
                    dependente
                    open={!!open[id]}
                    onToggle={() => tog(id)}
                    onRemove={() => removeDep(id)}
                >
                    <PessoaBlock includeParentesco />
                </Section>
            ))}

            <div className="flex justify-between items-center flex-wrap gap-2">
                <Button
                    variant="outline"
                    className="border-(--color-purple) !text-(--color-purple)"
                    onClick={addDep}
                >
                    <Plus size={14} color="var(--color-purple)" /> Adicionar Dependente
                </Button>
                <div className="flex gap-2">
                    <Link href="/patients">
                        <Button variant="outline">
                            <X size={14} /> Cancelar
                        </Button>
                    </Link>
                    <Button onClick={() => router.push("/patients")}>
                        <Check size={14} /> Salvar Paciente
                    </Button>
                </div>
            </div>
        </>
    );
}
