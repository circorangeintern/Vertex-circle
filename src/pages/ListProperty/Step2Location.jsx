import { useNavigate } from "react-router-dom";
import { Input, Button } from "../../components/ui";
import { useListingForm } from "../../context/ListingFormContext";

export default function Step2Location() {
  const nav = useNavigate();
  const { data, update } = useListingForm();
  const submit = (e) => { e.preventDefault(); nav("/list-property/details"); };
  return (
    <form onSubmit={submit} className="space-y-5">
      <h1 className="font-display text-3xl">Where is it?</h1>
      <Input label="Street address" value={data.address} onChange={(e) => update({ address: e.target.value })} required />
      <div className="grid grid-cols-2 gap-4">
        <Input label="City" value={data.city} onChange={(e) => update({ city: e.target.value })} required />
        <Input label="Country" value={data.country} onChange={(e) => update({ country: e.target.value })} required />
      </div>
      <div className="flex justify-between pt-2">
        <Button variant="outline" type="button" onClick={() => nav(-1)}>Back</Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
