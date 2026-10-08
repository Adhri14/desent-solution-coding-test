# 🪑 Desent Solution — Design Your Workspace

**Desent Solution** is an interactive workspace configurator web app that lets users build and visualize their ideal home office or workstation setup — and rent it all in one go.

Users can pick their desk, chair, accessories (monitor, keyboard, trackpad), and lifestyle add-ons (microwave, treadmill), and see a **real-time room preview** that reflects every selection visually.

---

## ✨ Features

- **Interactive Room Preview** — A live 2D room visualization that updates instantly as you configure your workspace. Items like the desk, chair, keyboard, monitor, trackpad, microwave, and treadmill are placed in spatially meaningful positions.
- **Desk & Chair Selector** — Choose from multiple desk and chair variants; each is displayed as an actual product image.
- **Accessories Panel** — Toggle accessories (monitor, ultrawide monitor, keyboard, trackpad) from the right panel.
- **Lifestyle Add-ons** — Add extra items like a Microwave or Treadmill from the bottom section.
- **Dynamic Pricing** — Total monthly rental cost is calculated in real-time based on selected items.
- **Order Summary Modal** — Review your full configuration before confirming the rental.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.4.0 | React framework (App Router) |
| [React](https://react.dev/) | 19.3.0 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | ^4 | Utility-first styling |
| [Lucide React](https://lucide.dev/) | ^1.53.0 | Icon library |
| [Geist Font](https://vercel.com/font) | — | Typography (via `next/font/google`) |

---

## 📁 Folder Structure

```
desent-solution/
├── app/
│   ├── favicon.ico              # App favicon
│   ├── globals.css              # Global styles & Tailwind base
│   ├── layout.tsx               # Root layout (font, metadata)
│   ├── page.tsx                 # Main page — all UI logic & components
│   └── types/
│       └── product.type.ts      # TypeScript types (ProductType, ProductResponseType)
│
├── public/
│   └── assets/                  # Product images used in the room preview
│       ├── keyboard-apple.png
│       ├── mesh-chair-with-footrest.png
│       ├── mesh-slad-chair.png
│       ├── microwave.png
│       ├── minimalist-desk-adjustable.png
│       ├── modern-black-desk-adjustable.png
│       ├── modern-treadmil.png
│       ├── modern-wallnut-desk-adjustable.png
│       ├── monitor-24-inch.png
│       ├── monitor-ultrawide.png
│       └── trackpad-apple.png
│
├── next.config.ts               # Next.js config (Turbopack, partial prefetching)
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
├── package.json                 # Project dependencies & scripts
└── README.md                    # You are here
```

---

## 🧩 Component Overview

All components live in [`app/page.tsx`](./app/page.tsx):

### `RoomPreview`
The main visual component. Renders a top-down-perspective 2D room scene with:
- **Desk** — center of the room, shown as a product image based on the selected desk
- **Chair** — positioned in front of the desk, shown as a product image based on the selected chair
- **Monitor / Keyboard / Trackpad** — overlaid on top of the desk surface when toggled
- **Microwave** — placed to the right of the desk
- **Treadmill** — placed further to the right of the desk

### `CheckoutModal`
A full-screen overlay modal that displays the complete order summary (desk, chair, accessories, lifestyle add-ons) with the total monthly rental price and a confirm button.

### `App` (Default Export)
The root page component managing all state:
- `selectedDesk` / `selectedChair` — single-select from inventory
- `selectedAccessories` — multi-select (monitors are mutually exclusive)
- `selectedLifestyle` — multi-select lifestyle add-ons
- `total` — computed via `useMemo`

---

## 📦 Inventory (`INVENTORY`)

The product catalog is defined as a static constant in `page.tsx`:

```
INVENTORY
├── chairs[]       → Chair Basic, Ergo Chair
├── desks[]        → Modern Walnut Desk, Modern Black Desk, Minimalis Desk
├── accessories[]  → 24" Monitor, Ultrawide Monitor, Keyboard, Trackpad
└── lifestyle
    ├── coffee[]   → Microwave Machine
    └── relax[]    → Treadmill
```

Each item has: `id`, `name`, `price` (monthly), `type`, and `icon` (static image import).

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd desent-solution

# Install dependencies
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

---

## 🗂️ Type Definitions

Defined in [`app/types/product.type.ts`](./app/types/product.type.ts):

```ts
type ProductType = {
  id: string;
  name: string;
  price: number;
  type?: 'chair' | 'desk' | 'acc';
  icon: StaticImageData;
}

type ProductResponseType = {
  chairs: ProductType[];
  desks: ProductType[];
  accessories: ProductType[];
  lifestyle: {
    coffee: Omit<ProductType, 'type'>[];
    relax: Omit<ProductType, 'type'>[];
  }
}
```

---

## 📄 License

This project is private. All rights reserved.
