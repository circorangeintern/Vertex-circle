import { createContext, useContext, useState } from "react";

const initial = {
  title: "", propertyType: "apartment", price: "",
  address: "", city: "", country: "",
  bedrooms: 1, bathrooms: 1, area: "", description: "", amenities: [],
  photos: [],
};

const Ctx = createContext(null);

export function ListingFormProvider({ children }) {
  const [data, setData] = useState(initial);
  const update = (patch) => setData((d) => ({ ...d, ...patch }));
  const reset = () => setData(initial);
  return <Ctx.Provider value={{ data, update, reset }}>{children}</Ctx.Provider>;
}

export function useListingForm() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useListingForm must be used inside ListingFormProvider");
  return ctx;
}
