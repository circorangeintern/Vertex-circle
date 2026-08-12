import { SearchIcon } from "../icons";
import { cn } from "../../../utils/cn";

export default function SearchBar({ value, onChange, onSubmit, placeholder = "Search by city, neighborhood…", className }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(value); }}
      className={cn("flex items-center gap-2 bg-surface border border-border-1 rounded-[var(--radius-xl)] px-4 h-14 shadow-[var(--shadow-card)]", className)}
    >
      <SearchIcon className="text-muted" width={20} height={20} />
      <input
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-text placeholder:text-muted"
      />
      <button type="submit" className="h-10 px-4 rounded-full bg-primary text-white text-sm font-medium">Search</button>
    </form>
  );
}
