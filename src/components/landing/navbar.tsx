'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogoFull } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';

const LINKS = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Especialidades', href: '#especialidades' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Doações', href: '#doacoes' },
    { label: 'Contato', href: '#contato' },
];

export function Navbar() {
    const [solid, setSolid] = useState(false);
    useEffect(() => {
        const onScroll = () => setSolid(window.scrollY > 48);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[300] transition-[background,box-shadow] ${
                solid
                    ? 'bg-white shadow-[0_1px_0_var(--color-border-soft)'
                    : ''
            }`}
        >
            <div className="wrap">
                <div className="flex items-center h-[68px] gap-9">
                    <LogoFull dark />
                    <ul className="hidden md:flex gap-7 list-none flex-1">
                        {LINKS.map((l) => (
                            <li key={l.label}>
                                <a
                                    href={l.href}
                                    className="text-sm font-medium text-(--color-muted) hover:text-(--color-text) transition-colors no-underline"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex gap-2 items-center ml-auto">
                        <Link href="/login">
                            <Button variant="ghost">Entrar</Button>
                        </Link>
                        <Link href="/login" className="hidden sm:block">
                            <Button variant="outline">Criar conta</Button>
                        </Link>
                        <Button>Agendar consulta</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
