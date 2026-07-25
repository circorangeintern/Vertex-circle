import { useNavigate } from "react-router-dom";
import { Button, UploadBox } from "../../components/ui";
import { useListingForm } from "../../context/ListingFormContext";

export default function Step4Photos() {
  const nav = useNavigate();
  const { data, update } = useListingForm();
  return (
    <div className="space-y-5">
      <h1 className="font-display text-3xl">Add photos</h1>
      <p className="text-muted">Bright, wide-angle photos get 2× more inquiries.</p>
      <UploadBox files={data.photos} onChange={(photos) => update({ photos })} max={10} />
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={() => nav(-1)}>Back</Button>
        <Button onClick={() => nav("/list-property/review")} disabled={data.photos.length === 0}>Continue</Button>
      </div>
    </div>
  );
}
