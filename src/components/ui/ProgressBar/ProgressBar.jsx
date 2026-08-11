export default function ProgressBar({ value = 0, max = 100, label }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full">
      {label && <div className="flex justify-between text-xs text-muted mb-1"><span>{label}</span><span>{Math.round(pct)}%</span></div>}
      <div className="w-full h-2 bg-border-1/50 rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
