import { useNavigate } from "react-router-dom";
import { Input, Button, Chip } from "../../components/ui";
import { useListingForm } from "../../context/ListingFormContext";

const AMENITIES = ["Wifi", "Parking", "Furnished", "Balcony", "Elevator", "Pool", "AC", "Heating"];

export default function Step3Details() {
  const nav = useNavigate();
  const { data, update } = useListingForm();
  const toggle = (a) => update({ amenities: data.amenities.includes(a) ? data.amenities.filter((x) => x !== a) : [...data.amenities, a] });
  const submit = (e) => { e.preventDefault(); nav("/list-property/photos"); };
  return (
    <form onSubmit={submit} className="space-y-5">
      <h1 className="font-display text-3xl">Details</h1>
      <div className="grid grid-cols-3 gap-4">
        <Input label="Bedrooms" type="number" min="0" value={data.bedrooms} onChange={(e) => update({ bedrooms: +e.target.value })} />
        <Input label="Bathrooms" type="number" min="0" value={data.bathrooms} onChange={(e) => update({ bathrooms: +e.target.value })} />
        <Input label="Area (m²)" type="number" min="0" value={data.area} onChange={(e) => update({ area: e.target.value })} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Description</label>
        <textarea rows={5} value={data.description} onChange={(e) => update({ description: e.target.value })}
          className="w-full rounded-[var(--radius-md)] border border-border-1 bg-surface p-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/30 focus:border-primary" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Amenities</p>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((a) => <Chip key={a} active={data.amenities.includes(a)} onClick={() => toggle(a)}>{a}</Chip>)}
        </div>
      </div>
      <div className="flex justify-between pt-2">
        <Button variant="outline" type="button" onClick={() => nav(-1)}>Back</Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
