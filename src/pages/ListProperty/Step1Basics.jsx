import { useNavigate } from "react-router-dom";
import { Input, Button, Chip } from "../../components/ui";
import { useListingForm } from "../../context/ListingFormContext";

const TYPES = ["apartment", "house", "studio", "riad"];

export default function Step1Basics() {
  const nav = useNavigate();
  const { data, update } = useListingForm();
  const submit = (e) => { e.preventDefault(); nav("/list-property/location"); };
  return (
    <form onSubmit={submit} className="space-y-5">
      <h1 className="font-display text-3xl">Tell us about your property</h1>
      <Input label="Title" placeholder="Bright 2BR near the port" value={data.title} onChange={(e) => update({ title: e.target.value })} required />
      <div>
        <p className="text-sm font-medium mb-2">Property type</p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => <Chip key={t} active={data.propertyType === t} onClick={() => update({ propertyType: t })}>{t}</Chip>)}
        </div>
      </div>
      <Input label="Monthly price (USD)" type="number" min="0" value={data.price} onChange={(e) => update({ price: e.target.value })} required />
      <div className="flex justify-end pt-2"><Button type="submit">Continue</Button></div>
    </form>
  );
}
