import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar, Chip, EmptyState, SearchIcon } from "../components/ui";
import { PropertyCard } from "../components/property";

const ALL = [
  { id: "1", title: "Bright 2BR near the port",   city: "Casablanca", price: 850,  bedrooms: 2, bathrooms: 1, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800" },
  { id: "2", title: "Modern studio downtown",     city: "Rabat",      price: 500,  bedrooms: 1, bathrooms: 1, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800" },
  { id: "3", title: "Riad-style 3BR",             city: "Marrakech",  price: 1200, bedrooms: 3, bathrooms: 2, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800" },
  { id: "4", title: "Sea-view apartment",         city: "Tanger",     price: 950,  bedrooms: 2, bathrooms: 2, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800" },
];
const FILTERS = ["All", "Studio", "1BR", "2BR", "3BR+"];

export default function SearchResults() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [filter, setFilter] = useState("All");
  const city = params.get("city") ?? "All";

  const results = useMemo(() => {
    let r = ALL;
    if (city !== "All") r = r.filter((p) => p.city === city);
    if (q) r = r.filter((p) => (p.title + p.city).toLowerCase().includes(q.toLowerCase()));
    if (filter === "Studio") r = r.filter((p) => p.bedrooms === 1);
    else if (filter === "1BR") r = r.filter((p) => p.bedrooms === 1);
    else if (filter === "2BR") r = r.filter((p) => p.bedrooms === 2);
    else if (filter === "3BR+") r = r.filter((p) => p.bedrooms >= 3);
    return r;
  }, [q, city, filter]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SearchBar value={q} onChange={setQ} onSubmit={(v) => setParams({ q: v ?? q, city })} />
      <div className="flex flex-wrap gap-2 my-5">
        {FILTERS.map((f) => <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Chip>)}
      </div>
      <p className="text-sm text-muted mb-4">{results.length} rentals {city !== "All" && `in ${city}`}</p>
      {results.length === 0 ? (
        <EmptyState icon={<SearchIcon />} title="No results" description="Try a different city or clear the filters." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      )}
    </div>
  );
}
