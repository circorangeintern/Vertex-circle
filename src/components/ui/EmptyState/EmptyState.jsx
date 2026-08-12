export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="text-center py-16 px-6">
      {icon && <div className="mx-auto w-14 h-14 rounded-full bg-surface border border-border-1 grid place-items-center text-muted mb-4">{icon}</div>}
      <h3 className="font-display text-xl text-text mb-1">{title}</h3>
      {description && <p className="text-muted mb-4">{description}</p>}
      {action}
    </div>
  );
}
