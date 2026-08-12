import { Link } from "react-router-dom";
import { BedIcon, BathIcon, MapPinIcon, HeartIcon } from "../../ui/icons";
import { Badge } from "../../ui";

export default function PropertyCard({ property }) {
  const { id, title, city, price, bedrooms, bathrooms, image, tag } = property;
  return (
    <Link to={`/listing/${id}`} className="block bg-surface border border-border-1 rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-card)] hover:-translate-y-0.5 transition-transform">
      <div className="relative aspect-[4/3] bg-background">
        <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
        {tag && <div className="absolute top-3 left-3"><Badge tone="cta">{tag}</Badge></div>}
        <button type="button" onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-text grid place-items-center" aria-label="Save">
          <HeartIcon width={18} height={18} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg text-text truncate">{title}</h3>
          <span className="font-semibold text-primary whitespace-nowrap">${price}<span className="text-xs text-muted">/mo</span></span>
        </div>
        <p className="text-sm text-muted flex items-center gap-1 mt-0.5"><MapPinIcon width={14} height={14} />{city}</p>
        <div className="flex items-center gap-4 mt-3 text-sm text-text">
          <span className="inline-flex items-center gap-1"><BedIcon width={16} height={16} />{bedrooms} bd</span>
          <span className="inline-flex items-center gap-1"><BathIcon width={16} height={16} />{bathrooms} ba</span>
        </div>
      </div>
    </Link>
  );
}
