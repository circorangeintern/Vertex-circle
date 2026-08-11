import { cn } from "../../../utils/cn";
export default function Skeleton({ className }) {
  return <div className={cn("animate-pulse bg-border-1/50 rounded-[var(--radius-md)]", className)} />;
}
