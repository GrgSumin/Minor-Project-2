# InstrumentMania

A full-stack e-commerce platform built for musical instruments — guitars, keyboards, drums, amplifiers, microphones, and the studio gear that goes with them. The goal was a clean, focused shopping experience that doesn't try to be everything: just browse, filter, save what you like, and place an order.

The project is split into three apps that share a single MongoDB database:

- **Storefront** — where customers browse the catalog, search and filter, read reviews, manage their cart and wishlist, and check out. Orders don't go through a payment gateway; instead, placing one sends an email to the owner with the customer's details so the order can be handled manually.
- **Admin panel** — a separate React app for managing the catalog and fulfilling orders. The admin can add or edit products with image uploads, manage categories and brands, update order statuses through a simple workflow (pending → confirmed → shipped → delivered), and see basic KPIs like revenue and order counts on the dashboard.
- **API** — an Express server with JWT-based authentication, role-based access control (customer vs admin), bcrypt password hashing, multer for image uploads, and nodemailer for order notifications. Cart state lives client-side in Zustand with localStorage persistence; wishlist and reviews are stored server-side.

The catalog supports filtering by category, brand, and price range, plus text search across product titles and descriptions. Each product page shows a star-rated review section (one review per user, auto-aggregated into the product's overall rating) and a **"You may also like"** section that recommends similar items from the same category and brand — a simple content-based recommender that doesn't need any ML to feel useful.

The design is intentionally minimal: white background, single accent colour, Inter typography, no gradients. Layouts are fully responsive — mobile gets a collapsible nav, a slide-out cart drawer, and a filter panel that slides in from the side on the shop page.

## Tech stack

React 18 · Vite · Zustand · React Router · Axios · Node.js · Express · MongoDB (Mongoose) · JWT · bcrypt · Multer · Nodemailer

## Running it

```bash
# Backend (port 4000)
cd backend
cp .env.example .env       # fill in DB_URL, JWT_SECRET, SMTP creds
yarn install
yarn seed                  # populates ~150 demo products (first run only)
yarn dev

# Storefront (port 5173)
cd frontend && yarn install && yarn dev

# Admin panel (port 5174)
cd admin && yarn install && yarn dev
```

The first time the backend starts, an admin user is seeded from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` in your `.env`. Sign into the admin panel with those credentials.

`yarn seed` adds brands, categories, and products without touching existing data. `yarn seed:wipe` clears the catalog first and reseeds from scratch.
