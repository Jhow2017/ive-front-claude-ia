"use client";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface MV {
  m: string;
  v: number;
}

function TipBox({ active, payload, label, fmt }: any) {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  return (
    <div className="bg-white border border-(--color-border-soft) rounded-lg px-3 py-2 shadow-md font-sans">
      <div className="text-[11px] text-(--color-muted) font-semibold mb-0.5">{label}</div>
      <div className="text-sm font-bold text-(--color-text)">{fmt ? fmt(v) : v}</div>
    </div>
  );
}

export function ConsultasBarChart({ data }: { data: MV[] }) {
  return (
    <ResponsiveContainer width="100%" height={210}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="2 4" stroke="#e3eae4" vertical={false} />
        <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8fa392" }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8fa392" }} width={36} />
        <Tooltip cursor={{ fill: "rgba(37,154,67,.06)" }} content={<TipBox fmt={(v: number) => `${v} consultas`} />} />
        <Bar dataKey="v" fill="#259a43" radius={[6, 6, 0, 0]} maxBarSize={36} animationDuration={900} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ReceitaAreaChart({ data }: { data: MV[] }) {
  return (
    <ResponsiveContainer width="100%" height={210}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="recAr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#259a43" stopOpacity=".24" />
            <stop offset="100%" stopColor="#259a43" stopOpacity="0" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke="#e3eae4" vertical={false} />
        <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#8fa392" }} />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "#8fa392" }}
          width={48}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<TipBox fmt={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />} />
        <Area
          type="monotone"
          dataKey="v"
          stroke="#259a43"
          strokeWidth={2.4}
          fill="url(#recAr)"
          dot={{ r: 4, fill: "#259a43", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6 }}
          animationDuration={900}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function FreqLineChart({ data }: { data: MV[] }) {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="freqAr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#259a43" stopOpacity=".22" />
            <stop offset="100%" stopColor="#259a43" stopOpacity="0" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke="#e3eae4" vertical={false} />
        <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#8fa392" }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#8fa392" }} width={28} />
        <Tooltip content={<TipBox fmt={(v: number) => `${v} sessões`} />} />
        <Area
          type="monotone"
          dataKey="v"
          stroke="#259a43"
          strokeWidth={2.2}
          fill="url(#freqAr)"
          dot={false}
          activeDot={{ r: 5 }}
          animationDuration={900}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
