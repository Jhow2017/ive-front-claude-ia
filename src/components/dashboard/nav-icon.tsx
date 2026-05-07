import {
  Home,
  Users,
  Stethoscope,
  Calendar,
  Activity,
  FileText,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Monitor,
  Settings,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  home: Home,
  users: Users,
  stethoscope: Stethoscope,
  calendar: Calendar,
  activity: Activity,
  file: FileText,
  bar: BarChart3,
  msg: MessageSquare,
  check: CheckCircle,
  monitor: Monitor,
  settings: Settings,
};

export function NavIcon({ name, size = 16, color }: { name: string; size?: number; color?: string }) {
  const Ic = MAP[name] ?? Home;
  return <Ic size={size} color={color} />;
}
