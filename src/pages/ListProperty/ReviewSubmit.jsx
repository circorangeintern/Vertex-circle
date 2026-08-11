import { useNavigate } from "react-router-dom";
import { Button, Badge } from "../../components/ui";
import { useListingForm } from "../../context/ListingFormContext";

const Row = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-border-1 last:border-0"><span className="text-muted">{label}</span><span className="font-medium text-text text-right">{value || "—"}</span></div>
);

export default function ReviewSubmit() {
  const nav = useNavigate();
  const { data } = useListingForm();
  const submit = () => nav("/list-property/success");
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Review your listing</h1>
      <div className="bg-surface border border-border-1 rounded-[var(--radius-lg)] p-5">
        <Row label="Title" value={data.title} />
        <Row label="Type" value={data.propertyType} />
        <Row label="Price" value={data.price && `$${data.price}/mo`} />
        <Row label="Address" value={[data.address, data.city, data.country].filter(Boolean).join(", ")} />
        <Row label="Layout" value={`${data.bedrooms} bd · ${data.bathrooms} ba · ${data.area || "?"} m²`} />
        <Row label="Amenities" value={<span className="inline-flex flex-wrap gap-1 justify-end">{data.amenities.map((a) => <Badge key={a} tone="primary">{a}</Badge>)}</span>} />
        <Row label="Photos" value={`${data.photos.length} uploaded`} />
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => nav(-1)}>Back</Button>
        <Button variant="cta" onClick={submit}>Publish listing</Button>
      </div>
    </div>
  );
}
