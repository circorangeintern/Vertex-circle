import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui";
import { CheckIcon } from "../../components/ui/icons";

export default function SubmissionSuccess() {
  const nav = useNavigate();
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-16 h-16 rounded-full bg-primary text-white grid place-items-center mb-4"><CheckIcon width={32} height={32} /></div>
      <h1 className="font-display text-3xl mb-2">Your listing is live</h1>
      <p className="text-muted mb-6">We'll notify you as soon as tenants show interest.</p>
      <div className="flex gap-3 justify-center">
        <Button onClick={() => nav("/listings")}>Browse rentals</Button>
        <Button variant="outline" onClick={() => nav("/list-property")}>List another</Button>
      </div>
    </div>
  );
}
