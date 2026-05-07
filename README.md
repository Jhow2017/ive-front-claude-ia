# Instituto Verde Esperança

Plataforma completa portada do protótipo Claude Artifacts para Next.js 15.

## Stack

- Next.js 15.1 (App Router) + React 19 (Compiler ativado)
- Tailwind CSS v4 (CSS-first com `@theme inline`)
- shadcn/ui style primitives (Button, Input, Card, Dialog, Badge)
- Zustand (auth, UI, fila de atendimento — persistido em localStorage)
- React Hook Form + Zod (login, cadastro, contato, doação)
- Recharts (gráficos do dashboard)
- lucide-react (ícones)

## Rodar

```bash
cd ive-app
npm install
npm run dev
```

Abrir http://localhost:3000.

## Estrutura

- `src/app/page.tsx` — landing pública (server components com ilhas client onde necessário)
- `src/app/login/` — entrada com 3 papéis (admin / profissional / família)
- `src/app/(dashboard)/` — área autenticada com 15 views
- `src/components/landing/` — seções da landing
- `src/components/dashboard/` — sidebar, topbar, charts, views
- `src/components/ui/` — primitives shadcn-style
- `src/components/shared/` — Logo, AvatarIlus
- `src/stores/` — Zustand stores
- `src/lib/nav.ts` — navegação por papel + títulos das páginas

## Papéis (demo)

Use o FAB arrastável (canto inferior direito) → "Trocar papel (demo)" para alternar entre Admin, Profissional e Família. A navegação lateral, métricas do início e o filtro da agenda mudam conforme o papel.

## Fila de atendimento

Recepção → Triagem confirma chegada · Profissional → Meu Atendimento chama paciente (com beep + voz via SpeechSynthesis) · Painel da TV exibe em tempo real (com modo tela cheia). Tudo sincronizado pela store `useQueue` persistida em `localStorage`.
