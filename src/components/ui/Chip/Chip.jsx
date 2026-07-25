import { cn } from "../../../utils/cn";

export default function Chip({ active, children, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center h-9 px-4 rounded-full border text-sm font-medium transition-colors",
        active ? "bg-primary text-white border-primary" : "bg-surface text-text border-border-1 hover:border-primary/50",
        className
      )}
    >{children}</button>
  );
}
