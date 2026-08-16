# RentDirect — Direct Landlord-Tenant Rental Platform

RentDirect is a modern web application designed to connect tenants directly with verified landlords in Nigeria, eliminating agent fees and middleman commissions.

---

## 🔑 Admin Portal Credentials & Handoff Info

- **Admin URL Route**: `/admin` (accessible via top desktop header link or bottom mobile navbar)
- **Admin Passcode**: `password123`
- **Backend API Base URL**: `https://vertex-circle.onrender.com/api`

### Admin Workflow
1. Navigate to `/admin` and enter passcode `password123`.
2. View real-time metric cards for **Pending Verification**, **Approved & Published**, and **Rejected** listings.
3. Inspect pending property submissions: landlord contact details (phone/WhatsApp), property address, pricing, description, and room photos.
4. Mark items in the interactive **Verification Checklist**:
   - [x] Landlord phone number & identity verified
   - [x] Property address & availability verified
   - [x] Room photos authentic
5. Click **✓ Approve & Publish to Home** to assign the **VERIFIED** badge and automatically publish the property to the Home page (`/home`) with toast notification feedback.

---

## 🚀 Key Features & User Flows

- **Welcome / Landing Page (`/`)**:
  - Consistent **RentDirect** brand logo (`"R"` mark + typography).
  - Responsive hero pitch and quick-action navigation cards.
- **Home Page (`/home`)**:
  - Live verified listing feed.
  - Search filter bar by area (e.g. *Yaba*, *Lekki*, *Ikeja*).
  - Quick filter chips (*Verified only*, *Under ₦500k*, *Self-contained*).
  - Multi-device responsive grid (1 column mobile, 2 columns tablet, 3-4 columns desktop).
- **Listing Detail Page (`/listing/:id`)**:
  - Room photo carousel with prev/next navigation overlay.
  - Desktop 2-column split-view layout (Gallery & details on left, sticky pricing & contact card on right).
  - Full-screen photo gallery modal.
  - Landlord contact reveal modal (`/contact-reveal`).
- **Landlord Property Creation Wizard (`/list/step-1` to `step-5`)**:
  - Step 1: Property Location & Address
  - Step 2: Property Type & Bedrooms
  - Step 3: Amenities & Rent Pricing
  - Step 4: Room Photos Upload
  - Step 5: Review & Submit to Admin Queue
- **How It Works Page (`/how-it-works`)**:
  - Clear step-by-step guidance for both home seekers and property owners.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, React Router 7, Vite 8
- **Styling**: Vanilla CSS Design Tokens (`global.css`, `welcome.css`, `home.css`, `ListDetail.css`, `admin.css`)
- **Backend API**: Deployed Hono / Drizzle TypeScript service at `https://vertex-circle.onrender.com/api`
- **Responsiveness**: Mobile-first design scaling fluidly across mobile phones (<768px), tablets (768px-1023px), laptops (1024px+), and wide desktop screens (1280px+).

---

## 💻 Development & Build Setup

### Prerequisites
- Node.js (v18+)
- npm or bun

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
RentDirect/
├── public/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── BrandLogo.jsx     # Reusable consistent brand logo
│   │       ├── Header.jsx        # Responsive top header & nav
│   │       ├── Layout.jsx        # SPA Route Layout wrapper
│   │       └── Navbar.jsx        # Mobile bottom navigation bar
│   ├── data/
│   │   └── listings.js       # Fallback local property dataset
│   ├── pages/
│   │   ├── Admin.jsx         # Admin verification dashboard
│   │   ├── Landing.jsx       # Welcome landing screen
│   │   ├── Home.jsx          # Home feed & area search
│   │   ├── ListDetail.jsx    # Split-view property detail
│   │   ├── Search.jsx        # Filter bottom sheet modal
│   │   ├── SearchListing.jsx # Search results detail view
│   │   ├── ContactReveal.jsx # Landlord phone/WhatsApp reveal
│   │   ├── HowItWorks.jsx    # Platform guide
│   │   ├── listing/          # Multi-step creation wizard (Steps 1-5)
│   │   └── states/           # Feedback pages (Success, Loading, Empty, Error)
│   ├── services/
│   │   └── api.js            # Live backend client & fallback sync
│   └── styles/               # Component & page stylesheets
├── package.json
└── vite.config.js
```
