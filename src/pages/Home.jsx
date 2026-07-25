import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SearchBar, Chip, Button } from "../components/ui";
import { PropertyCard } from "../components/property";

const CITIES = ["All", "Casablanca", "Rabat", "Marrakech", "Tanger"];
const FEATURED = [
  { id: "1", title: "Bright 2BR near the port", city: "Casablanca", price: 850, bedrooms: 2, bathrooms: 1, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", tag: "New" },
  { id: "2", title: "Modern studio downtown",   city: "Rabat",       price: 500, bedrooms: 1, bathrooms: 1, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800" },
  { id: "3", title: "Riad-style 3BR",           city: "Marrakech",   price: 1200, bedrooms: 3, bathrooms: 2, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800", tag: "Featured" },
];

export default function Home() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("All");

  const submit = (value) => nav(`/search?q=${encodeURIComponent(value ?? q)}&city=${encodeURIComponent(city)}`);

  return (
    <div>
      <section className="bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="font-display text-4xl sm:text-6xl leading-tight mb-4">Find a place that feels like home.</h1>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Browse verified rentals across Morocco, or list your property in minutes.</p>
          <div className="max-w-2xl mx-auto"><SearchBar value={q} onChange={setQ} onSubmit={submit} /></div>
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            {CITIES.map((c) => <Chip key={c} active={city === c} onClick={() => setCity(c)}>{c}</Chip>)}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-2xl sm:text-3xl">Featured rentals</h2>
          <Button variant="ghost" onClick={() => nav("/listings")}>View all →</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      </section>
    </div>
  );
}
