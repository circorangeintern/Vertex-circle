import { cn } from "../../../utils/cn";

const variants = {
  primary: "bg-primary text-white hover:bg-[color:var(--color-primary-600)]",
  cta:     "bg-cta text-white hover:bg-[color:var(--color-cta-600)]",
  outline: "bg-transparent border border-border-1 text-text hover:bg-surface",
  ghost:   "bg-transparent text-text hover:bg-surface",
};
const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-14 px-6 text-lg",
};

export default function Button({
  variant = "primary", size = "md", className, children, leftIcon, rightIcon, fullWidth, ...rest
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant], sizes[size], fullWidth && "w-full", className
      )}
      {...rest}
    >
      {leftIcon}{children}{rightIcon}
    </button>
  );
}
