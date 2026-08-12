import Button from "../Button/Button";
export default function ErrorState({ title = "Something went wrong", description, onRetry }) {
  return (
    <div className="text-center py-16 px-6">
      <div className="mx-auto w-14 h-14 rounded-full bg-error/10 text-error grid place-items-center mb-4 text-2xl">!</div>
      <h3 className="font-display text-xl text-text mb-1">{title}</h3>
      {description && <p className="text-muted mb-4">{description}</p>}
      {onRetry && <Button variant="outline" onClick={onRetry}>Try again</Button>}
    </div>
  );
}
