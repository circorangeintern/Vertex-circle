import { cn } from "../../../utils/cn";

export default function Input({ label, error, hint, id, className, leftIcon, ...rest }) {
  const inputId = id || rest.name;
  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="block text-sm font-medium mb-1.5 text-text">{label}</label>}
      <div className="relative">
        {leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">{leftIcon}</span>}
        <input
          id={inputId}
          className={cn(
            "w-full h-11 rounded-[var(--radius-md)] border bg-surface px-4 text-text placeholder:text-muted",
            "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/30 focus:border-primary",
            leftIcon && "pl-10",
            error ? "border-error" : "border-border-1",
            className
          )}
          {...rest}
        />
      </div>
      {error   && <p className="mt-1 text-sm text-error">{error}</p>}
      {!error && hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
    </div>
  );
}
