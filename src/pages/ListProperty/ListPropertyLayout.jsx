import { Outlet, useLocation } from "react-router-dom";
import { ProgressBar } from "../../components/ui";
import { ListingFormProvider } from "../../context/ListingFormContext";

const STEPS = [
  { path: "/list-property",          label: "Basics" },
  { path: "/list-property/location", label: "Location" },
  { path: "/list-property/details",  label: "Details" },
  { path: "/list-property/photos",   label: "Photos" },
  { path: "/list-property/review",   label: "Review" },
];

export default function ListPropertyLayout() {
  const { pathname } = useLocation();
  const idx = Math.max(0, STEPS.findIndex((s) => s.path === pathname));
  const step = idx + 1;
  return (
    <ListingFormProvider>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-sm text-muted mb-2">Step {step} of {STEPS.length} — {STEPS[idx]?.label}</p>
          <ProgressBar value={step} max={STEPS.length} />
        </div>
        <Outlet />
      </div>
    </ListingFormProvider>
  );
}
