import { cn } from "../../../utils/cn";

const tones = {
  neutral: "bg-background text-text border-border-1",
  primary: "bg-primary/10 text-primary border-primary/20",
  cta:     "bg-cta/10 text-cta border-cta/20",
  error:   "bg-error/10 text-error border-error/20",
};

export default function Badge({ tone = "neutral", children, className }) {
  return <span className={cn("inline-flex items-center h-6 px-2 rounded-full text-xs font-medium border", tones[tone], className)}>{children}</span>;
}
