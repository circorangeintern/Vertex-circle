const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export const SearchIcon   = (p) => <svg {...base} {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
export const ArrowLeft    = (p) => <svg {...base} {...p}><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>;
export const ArrowRight   = (p) => <svg {...base} {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
export const CloseIcon    = (p) => <svg {...base} {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
export const UploadIcon   = (p) => <svg {...base} {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
export const CameraIcon   = (p) => <svg {...base} {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
export const CheckIcon    = (p) => <svg {...base} {...p}><polyline points="20 6 9 17 4 12"/></svg>;
export const HomeIcon     = (p) => <svg {...base} {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
export const BedIcon      = (p) => <svg {...base} {...p}><path d="M2 20V8"/><path d="M2 14h20v6"/><path d="M22 14V9a2 2 0 0 0-2-2H10v7"/><circle cx="6" cy="12" r="2"/></svg>;
export const BathIcon     = (p) => <svg {...base} {...p}><path d="M4 12V6a2 2 0 0 1 2-2h1"/><path d="M2 12h20v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z"/><path d="M6 19v2"/><path d="M18 19v2"/></svg>;
export const MapPinIcon   = (p) => <svg {...base} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
export const ChevronRight = (p) => <svg {...base} {...p}><polyline points="9 18 15 12 9 6"/></svg>;
export const PhoneIcon    = (p) => <svg {...base} {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
export const HeartIcon    = (p) => <svg {...base} {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
