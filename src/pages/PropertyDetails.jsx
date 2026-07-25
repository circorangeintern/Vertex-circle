import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Badge } from "../components/ui";
import { PropertyGallery, PropertyTags, ContactBottomSheet } from "../components/property";
import { ArrowLeft, BedIcon, BathIcon, MapPinIcon, HomeIcon } from "../components/ui/icons";

const DEMO = {
  title: "Bright 2BR near the port", city: "Casablanca, MA", price: 850,
  bedrooms: 2, bathrooms: 1, area: 78,
  images: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
    "https://images.unsplash.com/photo-1505692794403-34d4982f88aa?w=1200",
  ],
  tags: ["Furnished", "Balcony", "Wifi", "Parking", "Elevator"],
  description: "A sunlit two-bedroom on the fifth floor, walking distance from the port. Recently renovated with an open kitchen, a small balcony overlooking the courtyard, and secure parking.",
  landlord: { name: "Yasmine", phone: "+212 6 12 34 56 78" },
};

export default function PropertyDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(false);
  const p = DEMO;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Link to="/listings" className="inline-flex items-center gap-1 text-sm text-muted hover:text-text mb-4"><ArrowLeft width={16} height={16} />Back</Link>
      <PropertyGallery images={p.images} />
      <div className="mt-6 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl">{p.title}</h1>
              <p className="text-muted flex items-center gap-1 mt-1"><MapPinIcon width={16} height={16} />{p.city}</p>
            </div>
            <Badge tone="primary">#{id}</Badge>
          </div>
          <div className="flex flex-wrap gap-6 mt-5 text-text">
            <span className="inline-flex items-center gap-2"><BedIcon />{p.bedrooms} bedrooms</span>
            <span className="inline-flex items-center gap-2"><BathIcon />{p.bathrooms} bathrooms</span>
            <span className="inline-flex items-center gap-2"><HomeIcon />{p.area} m²</span>
          </div>
          <hr className="my-6 border-border-1" />
          <h2 className="font-display text-xl mb-2">About this place</h2>
          <p className="text-text/90 leading-relaxed">{p.description}</p>
          <h2 className="font-display text-xl mt-6 mb-3">Amenities</h2>
          <PropertyTags tags={p.tags} />
        </div>

        <aside className="lg:sticky lg:top-24 h-fit bg-surface border border-border-1 rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-semibold text-primary">${p.price}</span>
            <span className="text-sm text-muted">/month</span>
          </div>
          <Button fullWidth variant="cta" onClick={() => setContact(true)}>Contact landlord</Button>
          <Button fullWidth variant="outline" className="mt-2">Save to favorites</Button>
          <p className="text-xs text-muted mt-3 text-center">You won't be charged yet.</p>
        </aside>
      </div>

      <ContactBottomSheet open={contact} onClose={() => setContact(false)} landlord={p.landlord} />
    </div>
  );
}
