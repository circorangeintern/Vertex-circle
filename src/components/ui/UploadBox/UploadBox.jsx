import { useRef } from "react";
import { UploadIcon, CloseIcon } from "../icons";

export default function UploadBox({ files = [], onChange, max = 10 }) {
  const inputRef = useRef(null);
  const handleFiles = (list) => {
    const arr = Array.from(list).slice(0, max - files.length);
    const mapped = arr.map((f) => ({ file: f, url: URL.createObjectURL(f), name: f.name }));
    onChange?.([...files, ...mapped]);
  };
  const removeAt = (i) => onChange?.(files.filter((_, idx) => idx !== i));

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        className="w-full min-h-[160px] rounded-[var(--radius-lg)] border-2 border-dashed border-border-1 bg-surface flex flex-col items-center justify-center gap-2 text-muted hover:border-primary hover:text-primary transition-colors"
      >
        <UploadIcon width={28} height={28} />
        <span className="text-sm font-medium">Drop photos here or click to upload</span>
        <span className="text-xs">Up to {max} images, JPG/PNG</span>
      </button>
      <input ref={inputRef} type="file" multiple accept="image/*" hidden onChange={(e) => handleFiles(e.target.files)} />

      {files.length > 0 && (
        <ul className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
          {files.map((f, i) => (
            <li key={i} className="relative aspect-square rounded-[var(--radius-md)] overflow-hidden border border-border-1">
              <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
              <button
                type="button" onClick={() => removeAt(i)}
                className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 text-white grid place-items-center"
                aria-label="Remove"
              ><CloseIcon width={14} height={14} /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
