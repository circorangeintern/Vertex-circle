import { useEffect } from "react";
import { CloseIcon, PhoneIcon } from "../../ui/icons";
import { Button } from "../../ui";

export default function ContactBottomSheet({ open, onClose, landlord }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 inset-x-0 bg-surface rounded-t-[var(--radius-xl)] p-6 max-w-lg mx-auto shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl">Contact landlord</h3>
          <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-background grid place-items-center"><CloseIcon /></button>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary grid place-items-center font-semibold">{landlord?.name?.[0] ?? "L"}</div>
          <div>
            <p className="font-medium">{landlord?.name ?? "Landlord"}</p>
            <p className="text-sm text-muted">Usually replies within 1 hour</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button leftIcon={<PhoneIcon width={18} height={18} />} fullWidth>Call {landlord?.phone ?? ""}</Button>
          <Button variant="outline" fullWidth>Send message</Button>
        </div>
      </div>
    </div>
  );
}
