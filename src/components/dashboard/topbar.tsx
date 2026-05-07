"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell, MessageSquare, FileText, AlertCircle, Calendar, CheckCircle } from "lucide-react";
import { PAGE_TITLES } from "@/lib/nav";
import { useUI } from "@/stores/ui";

const NOTIFS = [
  { ic: Calendar, title: "Consulta confirmada", msg: "Lucas Costa confirmou a sessão de Fonoaudiologia para amanhã às 14h.", time: "há 12 min", unread: true },
  { ic: MessageSquare, title: "Nova mensagem", msg: "Família Oliveira enviou uma mensagem sobre o relatório de progresso.", time: "há 1h", unread: true },
  { ic: FileText, title: "Relatório aprovado", msg: "Plano terapêutico do Pedro Santos foi aprovado pela coordenação.", time: "há 3h", unread: true },
  { ic: AlertCircle, title: "Sessão cancelada", msg: "A sessão das 09h com Maria Oliveira foi cancelada pela família.", time: "ontem", unread: false },
  { ic: CheckCircle, title: "Avaliação concluída", msg: "Avaliação neuropsicológica de Ana Lima finalizada.", time: "ontem", unread: false },
];

export function Topbar() {
  const setMobileOpen = useUI((s) => s.setMobileSidebarOpen);
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = NOTIFS.filter((n) => n.unread).length;

  useEffect(() => {
    if (!notifOpen) return;
    const close = (e: MouseEvent) => {
      const t = e.target as Element;
      if (!t.closest(".notif-wrap")) setNotifOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [notifOpen]);

  const title = PAGE_TITLES[pathname] || "Plataforma";

  return (
    <div className="bg-white border-b border-(--color-border-soft) px-6 h-[57px] flex items-center justify-between shrink-0 gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="md:hidden w-9 h-9 rounded-lg border border-(--color-border-soft) bg-white flex items-center justify-center text-(--color-muted) shrink-0"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={18} />
        </button>
        <div className="text-base font-bold tracking-tight truncate">{title}</div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden md:flex items-center gap-2 bg-(--color-bg) border border-(--color-border-soft) rounded-lg px-3 py-1.5 min-w-[200px]">
          <Search size={14} color="var(--color-muted)" />
          <input
            placeholder="Buscar..."
            className="bg-transparent border-none outline-none text-[13px] w-full"
          />
        </div>
        <div className="relative notif-wrap">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="w-9 h-9 rounded-lg border border-(--color-border-soft) bg-white flex items-center justify-center text-(--color-muted) hover:text-(--color-g500) hover:border-(--color-g500) transition-colors"
          >
            <Bell size={16} />
          </button>
          {unread > 0 && (
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-(--color-g500) border-2 border-white" />
          )}
          {notifOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-full mt-2 right-0 w-[340px] bg-white border border-(--color-border-soft) rounded-xl shadow-2xl z-[300] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-3.5 py-3 border-b border-(--color-border-soft) flex justify-between items-center">
                <div>
                  <div className="text-sm font-bold">Notificações</div>
                  <div className="text-[11px] text-(--color-muted)">{unread} não lidas</div>
                </div>
                <button className="text-[11px] font-semibold text-(--color-g500) hover:underline">
                  Marcar todas
                </button>
              </div>
              <div className="max-h-[380px] overflow-y-auto">
                {NOTIFS.map((n, i) => (
                  <div
                    key={i}
                    className={`px-3.5 py-3 border-b border-(--color-border-soft) flex gap-2.5 cursor-pointer transition-colors hover:bg-(--color-g50) ${
                      n.unread ? "bg-[#f0f9f3]" : ""
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-(--color-g50) text-(--color-g500) flex items-center justify-center shrink-0">
                      <n.ic size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold">{n.title}</div>
                      <div className="text-xs text-(--color-muted) leading-snug">{n.msg}</div>
                      <div className="text-[10px] text-(--color-muted2) mt-1">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-3.5 py-2.5 text-center border-t border-(--color-border-soft) text-xs text-(--color-g500) font-semibold cursor-pointer bg-(--color-bg)">
                Ver todas as notificações
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
