import { useState } from "react";
import { cn } from "../../../utils/cn";

export default function PropertyGallery({ images = [] }) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;
  return (
    <div>
      <div className="aspect-[16/10] rounded-[var(--radius-lg)] overflow-hidden bg-background">
        <img src={images[active]} alt="" className="w-full h-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button key={i} onClick={() => setActive(i)} className={cn("aspect-square rounded-[var(--radius-sm)] overflow-hidden border", i === active ? "border-primary" : "border-border-1")}>
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
