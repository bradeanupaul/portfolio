# ÉLAN SKIN

Premium skincare storefront demo for a portfolio. The shop, formulas, prices, and orders are fictional. All interface copy is in Romanian. Nothing here is medical advice, and checkout never asks for card numbers.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4
- Zustand for the cart, wishlist, and local profile
- Zod and React Hook Form for checkout and contact
- Prisma 6 with SQLite for demo orders
- Vitest for catalog, routine, pricing, and checkout schema tests

## Scripts

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Other commands:

```bash
npm test
npm run lint
npm run build
```

The SQLite file is created at `prisma/dev.db`. `DATABASE_URL` in `.env` is `file:./dev.db` for the Prisma CLI, which resolves that path beside the schema. The app client points at the same file with an absolute path.

## Routes

Home, shop, collections, product pages, about, ingredients, routine builder, journal, wishlist, cart, checkout, order confirmation, account, contact, FAQ, delivery and returns, privacy, terms, cookies, and a custom not found page.

## Orders

Checkout accepts name, email, phone, address, and a payment choice of cash on delivery or bank transfer. Prices are recalculated on the server. Card fields are not part of the schema. A successful order redirects to `/comanda/confirmare?cod=...`.

## Images

All campaign and product photographs were AI generated for this demo, then organized under `public/assets/`. Packshots were cut out with `rembg` to transparent PNG (`packshot.png`) plus a pearl-backed JPG. Brand marks are hand-authored SVG in `public/assets/brand/` (correct spelling, not AI text). Inventory lives in `src/data/asset-manifest.ts`. To reprocess packshots after regenerating sources:

```bash
python3 scripts/process_assets.py
```

## Note

This is a fictional portfolio demo. Orders stay on the machine running the app and are not fulfilled.
