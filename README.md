# Seven Stars Solar Energy Company Limited

A modern Next.js website for Seven Stars Solar Energy Company Limited, featuring solar water heaters, panels, batteries, and lighting solutions.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Material UI (MUI)** - React component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## Features

- Modern, responsive design
- Dynamic content from JSON data files
- Product catalog with filtering and search
- Smooth animations and transitions
- Mobile-friendly navigation
- SEO-optimized with Next.js App Router

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
sevenss/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── catalog/           # Product catalog
│   ├── products/          # Products page
│   ├── prices/            # Pricing page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── layout/           # Layout components
│       ├── Navbar.tsx    # Navigation bar
│       └── Footer.tsx    # Footer
├── lib/                  # Utility files
│   └── data/            # JSON data files
│       ├── company.json  # Company information
│       ├── products.json # Product data
│       ├── catalog.json # Catalog data
│       └── navigation.json # Navigation structure
├── public/              # Static assets
│   └── assets/         # Images and static files
└── images/             # Original images (to be moved to assets)
```

## Pages

- **Home** - Hero section, image carousel, featured products, certifications
- **About** - Company information, mission, certifications
- **Catalog** - Browseable product catalog with category filtering and search
- **Products** - Featured products showcase
- **Prices** - Pricing information

## Customization

### Updating Content

Edit the JSON files in `lib/data/`:
- `company.json` - Company information, certifications, about text
- `products.json` - Featured products data
- `catalog.json` - Complete product catalog with categories
- `navigation.json` - Navigation menu structure

### Styling

- Tailwind CSS configuration: `tailwind.config.ts`
- MUI theme: Customized in `app/layout.tsx`
- Global styles: `app/globals.css`

### Images

Place images in the `public/assets/` directory and update the image paths in the JSON data files.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is licensed under ISC License.
